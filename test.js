/**
 * QQ 库存机器人 v6.5 - 库存判断增强版
 */

const WebSocket = require('ws');
const fs = require('fs');
const path = require('path');
const XLSX = require('xlsx');
const https = require('https');  // ← 新增：用于 Server酱 HTTP 请求

// ============================================================
// 配置
// ============================================================
const CONFIG = {
  wsPort: 6199,
  productsFile: path.join(__dirname, 'products.xlsx'),

  // ========== 新增：Server酱配置 ==========
  serverChan: {
    sendKey: 'SCT327413TdhTQm9Gt7PFZWdArXHco58M3',  // ← 在这里填入你的 SendKey（从 sct.ftqq.com 获取）
    enabled: true,             // 是否启用推送
  },

  // ========== 新增：定时推送配置 ==========
  pushTimes: [
    { hour: 11, minute: 0, label: '上午' },
    { hour: 15, minute: 0, label: '下午' },
    { hour: 18, minute: 0, label: '傍晚' },
  ],

  scripts: {
    askMaterial: `请问你想找什么物料？多少数量？`,
    askQuantity: `请问多少数量？`,
    askReal: `请问是实单吗？`,
    reply: (p) => `${p.型号}，${p.价格}未税，DC：${p.DC}，${p.货期 || ''}${p.地址 ? '，' + p.地址 : ''}，要不要下单`,
  }
};

// ============================================================
// 产品库
// ============================================================
let productDB = new Map();

function normalize(s) {
  return s.toLowerCase().replace(/[\s\-]/g, '');
}

function similarity(a, b) {
  let dp = Array(a.length + 1).fill(0).map(() => Array(b.length + 1).fill(0));
  let max = 0;
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      if (a[i - 1] === b[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
        max = Math.max(max, dp[i][j]);
      }
    }
  }
  return max / Math.max(a.length, b.length);
}

function loadProducts() {
  if (!fs.existsSync(CONFIG.productsFile)) return;

  const wb = XLSX.readFile(CONFIG.productsFile);
  const sheet = wb.Sheets[wb.SheetNames[0]];
  const rows = XLSX.utils.sheet_to_json(sheet, { defval: '' });

  productDB.clear();

  rows.forEach(r => {
    const model = String(r['型号'] || '').trim();
    if (!model) return;

    productDB.set(normalize(model), {
      型号: model,
      价格: r['价格'],
      DC: r['DC'],
      货期: r['货期'],
      地址: r['地址'],
      库存数量: r['库存数量'], // ✅ 已有
    });
  });

  console.log(`[数据] 已加载 ${productDB.size} 个型号`);
}

function findProduct(text, rate) {
  const msg = normalize(text);

  let best = null, scoreMax = 0;

  for (const [k, p] of productDB) {
    if (msg.includes(k) || k.includes(msg)) return p;

    const score = similarity(msg, k);
    if (score > scoreMax) {
      scoreMax = score;
      best = p;
    }
  }

  return scoreMax >= rate ? best : null;
}

// ============================================================
// 询价记录（内存 + 本地文件）
// ============================================================
let todayInquiries = [];

// 保存目录：bot.js 同级的 records 文件夹
const RECORDS_DIR = path.join(__dirname, 'records');

// 确保目录存在
if (!fs.existsSync(RECORDS_DIR)) {
  fs.mkdirSync(RECORDS_DIR, { recursive: true });
  console.log(`[记录] 已创建目录: ${RECORDS_DIR}`);
}

// 获取今天的 Excel 文件路径，格式：records/2026-04-01.xlsx
function getTodayFilePath() {
  const today = new Date();
  const dateStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
  return path.join(RECORDS_DIR, `${dateStr}.xlsx`);
}

// 写入询价记录到 Excel（追加模式）
function saveInquiryToFile(record) {
  const filePath = getTodayFilePath();

  let wb, ws;
  const headers = ['时间', 'QQ号', '型号', '价格', 'DC', '货期', '是否实单'];

  if (fs.existsSync(filePath)) {
    // 文件已存在，读取后追加
    wb = XLSX.readFile(filePath);
    ws = wb.Sheets[wb.SheetNames[0]];
  } else {
    // 新建文件，写入表头
    wb = XLSX.utils.book_new();
    ws = XLSX.utils.aoa_to_sheet([headers]);
    XLSX.utils.book_append_sheet(wb, ws, '询价记录');
  }

  // 追加一行数据
  const newRow = [
    record.time,
    record.qqId,
    record.model,
    record.price,
    record.dc,
    record.leadTime,
    record.isReal,
  ];

  XLSX.utils.sheet_add_aoa(ws, [newRow], { origin: -1 }); // origin: -1 表示追加到末尾
  XLSX.writeFile(wb, filePath);
  console.log(`[记录] 💾 已保存到: ${path.basename(filePath)}`);
}

function addInquiry(uid, model, price, dc, leadTime, isReal) {
  const record = {
    time: new Date().toLocaleString('zh-CN'),
    qqId: uid,
    model: model,
    price: price,
    dc: dc || '',
    leadTime: leadTime || '',
    isReal: isReal || '待确认',
  };

  // 1. 存入内存（用于当天推送统计）
  todayInquiries.push(record);

  // 2. 实时写入本地 Excel 文件
  saveInquiryToFile(record);

  console.log(`[询价] 记录: ${model} - ${price}`);
}

// ============================================================
// 新增：Server酱推送
// ============================================================
function pushToServerChan(title, content) {
  const key = CONFIG.serverChan.sendKey;

  if (!key || key === 'SCTxxxxxxxxx') {
    console.log('[推送] ⚠️  未配置 SendKey，跳过推送');
    return;
  }

  if (!CONFIG.serverChan.enabled) {
    console.log('[推送] 已禁用，跳过');
    return;
  }

  const postData = JSON.stringify({ title, desp: content });

  const options = {
    hostname: 'sctapi.ftqq.com',
    path: `/${key}.send`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(postData),
    },
  };

  const req = https.request(options, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      if (res.statusCode === 200) {
        console.log(`[推送] ✅ 成功: ${title}`);
      } else {
        console.log(`[推送] ❌ 失败: ${res.statusCode} - ${data}`);
      }
    });
  });

  req.on('error', (e) => {
    console.log(`[推送] ❌ 错误: ${e.message}`);
  });

  req.write(postData);
  req.end();
}

// ============================================================
// 从 Excel 读取当天询价记录
// ============================================================
function readTodayInquiriesFromExcel() {
  const filePath = getTodayFilePath();
  const inquiries = [];

  if (!fs.existsSync(filePath)) {
    console.log(`[记录] 文件不存在: ${filePath}`);
    return inquiries;
  }

  try {
    const wb = XLSX.readFile(filePath);
    const ws = wb.Sheets[wb.SheetNames[0]];
    const rows = XLSX.utils.sheet_to_json(ws, { defval: '' });

    // 跳过表头，从第一行数据开始
    for (let i = 1; i < rows.length; i++) {
      const r = rows[i];
      if (r['QQ号']) {
        inquiries.push({
          time: r['时间'] || '',
          qqId: r['QQ号'] || '',
          model: r['型号'] || '',
          price: r['价格'] || '',
          dc: r['DC'] || '',
          leadTime: r['货期'] || '',
          isReal: r['是否实单'] || '待确认',
        });
      }
    }

    console.log(`[记录] 从 Excel 读取到 ${inquiries.length} 条记录`);
  } catch (e) {
    console.log(`[记录] 读取失败: ${e.message}`);
  }

  return inquiries;
}

// ============================================================
// 新增：生成推送内容
// ============================================================
function buildPushText(label) {
  const today = new Date().toLocaleDateString('zh-CN');

  // ✅ 从当天的 Excel 文件读取数据
  const inquiries = readTodayInquiriesFromExcel();
  const count = inquiries.length;

  if (count === 0) {
    return {
      title: `📊 ${today} ${label}询价汇总`,
      content: `本时段暂无询价记录。`
    };
  }

  // 统计热门型号
  const modelCount = {};
  const customerSet = new Set();
  const realOrderCount = { '是': 0, '否': 0, '待确认': 0 };

  inquiries.forEach(r => {
    modelCount[r.model] = (modelCount[r.model] || 0) + 1;
    customerSet.add(r.qqId);
    realOrderCount[r.isReal] = (realOrderCount[r.isReal] || 0) + 1;
  });

  const topModels = Object.entries(modelCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([m, c]) => `- ${m}：${c}次`)
    .join('\n');

  // ✅ 新增：详细记录表格
  const detailLines = inquiries.map(r => {
    const timeStr = r.time.split(' ')[1] || r.time; // 只显示时间部分
    return `${timeStr} | ${r.qqId} | ${r.model} | ¥${r.price}`;
  });

  const content = [
    `**今日累计询价：${count} 条**`,
    `**询价客户数：${customerSet.size} 人**`,
    `**实单确认：✅是${realOrderCount['是'] || 0} | ❌否${realOrderCount['否'] || 0} | ⏳待确认${realOrderCount['待确认'] || 0}**`,
    ``,
    `**热门型号 TOP10：**`,
    topModels,
    ``,
    `**📋 详细记录：**`,
    `时间 | QQ号 | 型号 | 价格`,
    `--- | --- | --- | ---`,
    ...detailLines,
  ].join('\n');

  return {
    title: `📊 ${today} ${label}询价汇总（共${count}条）`,
    content
  };
}

// ============================================================
// 新增：测试 Server酱推送
// ============================================================
function testServerChan() {
  const { title, content } = buildPushText('测试');
  pushToServerChan(title, content);
}

// ============================================================
// 新增：定时推送调度
// ============================================================
function schedulePushes() {
  CONFIG.pushTimes.forEach(({ hour, minute, label }) => {
    scheduleDaily(hour, minute, () => {
      console.log(`\n[定时] ⏰ 触发 ${label} 推送...`);
      const { title, content } = buildPushText(label);
      pushToServerChan(title, content);
    });
    console.log(`[定时] ✅ 已注册: ${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')} ${label}推送`);
  });

  // 每天 23:55 清空记录
  scheduleDaily(23, 55, () => {
    console.log('[定时] 🌙 清空今日询价记录');
    todayInquiries = [];
  });
}

function scheduleDaily(hour, minute, callback) {
  function getNextDelay() {
    const now = new Date();
    const next = new Date();
    next.setHours(hour, minute, 0, 0);
    if (next <= now) next.setDate(next.getDate() + 1);
    return next - now;
  }

  function loop() {
    const delay = getNextDelay();
    setTimeout(() => {
      callback();
      loop();
    }, delay);
  }

  loop();
}

// ============================================================
// 数量识别
// ============================================================
function extractQty(text) {
  if (!text || typeof text !== 'string') return null;

  const parts = text.trim().split(/\s+/).reverse(); // 倒序查找

  for (let part of parts) {
    const match = part.match(/(\d+)\s*(k|K|pcs|PCS|个|只|片|盘|包|盒|卷|Kpcs|kpcs|KPCS|kPCS)/);
    if (match) {
      let num = parseInt(match[1]);
      if (/k/i.test(match[2])) num *= 1000;
      console.log('提取到数量:', num, '来自:', part);
      return num;
    }
  }

  return null;
}

// ============================================================
// 状态机
// ============================================================
const sessions = new Map();

function getSession(uid) {
  if (!sessions.has(uid)) {
    sessions.set(uid, {
      state: 'init',
      model: '',
      qty: null,
      locked: false, // 成交锁
      unlockAt: 0,
    });
  }
  return sessions.get(uid);
}

// ============================================================
// 核心逻辑
// ============================================================

async function handle(uid, text) {
  const s = getSession(uid);
  text = text.trim();
  const product = findProduct(text, 1) || findProduct(text, 0.9) || findProduct(text, 0.7) || findProduct(text, 0.5);
  // ====================================================
  // ✅ 解锁机制（必须放最前）
  // ====================================================
  // 1️⃣ 新型号触发解锁（最优先）
  if (s.locked && product) {
    s.locked = false;
    s.state = 'wait_qty';
    s.model = product.型号;
    s.qty = extractQty(text);
    send(uid, '请问多少数量？');
    return;
  }
  // 2️⃣ 超时自动解锁
  if (s.locked && Date.now() > s.unlockAt) {
    s.locked = false;
  }
  // 3️⃣ 仍然锁死 → 直接不处理
  if (s.locked) return;
  // 👉 成交后完全不回复
  if (s.locked) return;
  // 👉 特例问题（允许回答）
  if (text.includes('原包') || text.includes('原装')) {
    send(uid, '是');
    return;
  }

  const qty = extractQty(text);

  if (s.state == 'init' && product) {
    console.log(`----[新型号]---- ${product.型号}`);
    s.state = 'wait_model';
  }

  switch (s.state) {

    case 'init':
      send(uid, CONFIG.scripts.askMaterial);
      s.state = 'wait_model';
      break;

    case 'wait_model':
      if (product) {
        s.model = product.型号;

        if (!qty) {
          // ✅ 没数量，必须卡住
          s.state = 'wait_qty';
          send(uid, CONFIG.scripts.askQuantity);
          return;
        }

        // ✅ 有数量才继续
        s.qty = qty;
        s.state = 'wait_real';
        send(uid, CONFIG.scripts.askReal);
      }
      break;

    case 'wait_qty':
      if (qty) {
        s.qty = qty;
        s.state = 'wait_real';
        send(uid, CONFIG.scripts.askReal);
      }
      break;

    case 'wait_real':
      // ❗ 如果还没数量，禁止报价
      if (!s.qty) {
        s.state = 'wait_qty';
        send(uid, CONFIG.scripts.askQuantity);
        return;
      }

      const p = findProduct(s.model, 1) || findProduct(s.model, 0.9) || findProduct(s.model, 0.7) || findProduct(s.model, 0.5);
      if (!p) return;

      // ================================
      // ✅ 核心新增：库存判断
      // ================================
      let stockMsg = '';
      const stock = Number(p.库存数量) || 0;

      if (stock >= s.qty) {
        stockMsg = '，数量充足';
      } else {
        stockMsg = `，当前库存${stock}`;
      }

      send(uid, CONFIG.scripts.reply(p) + stockMsg);

      s.state = 'done';

      // ========== 新增：记录询价 ==========
      const isReal = text.includes('是') || text.includes('实单') ? '是' :
        text.includes('不') || text.includes('询价') ? '否' : '待确认';
      console.log(`[询价] ${uid}: ${p.型号} ${p.价格} ${p.DC} ${p.货期} ${isReal}`);
      addInquiry(uid, p.型号, p.价格, p.DC, p.货期, isReal);
      break;

    case 'done':
      // 👉 客户说“可以” → 锁死
      if (text.includes('可以') || text.includes('下单')) {
        s.locked = true;
        s.unlockAt = Date.now() + 2 * 60 * 60 * 1000; // ✅ 2小时后自动解锁
      }

      // 👉 新型号继续
      if (product) {
        s.model = product.型号;
        s.qty = null;
        s.state = 'wait_qty';
        send(uid, CONFIG.scripts.askQuantity);
      }
      break;
  }
}

// ============================================================
// WS
// ============================================================
let ws = null;

function send(uid, msg) {
  if (!ws) return;
  ws.send(JSON.stringify({
    action: 'send_private_msg',
    params: { user_id: uid, message: msg }
  }));
  console.log(`[发送] ${uid}: ${msg}`);
}

function start() {
  const wss = new WebSocket.Server({ port: CONFIG.wsPort });

  console.log(`WS启动: ${CONFIG.wsPort}`);

  wss.on('connection', socket => {
    ws = socket;
    console.log('NapCat已连接');

    ws.on('message', data => {
      const m = JSON.parse(data.toString());

      // 👉 新增：处理好友通过事件
      if (m.post_type === 'notice' && m.notice_type === 'friend_add') {
        const uid = m.user_id;
        console.log(`[事件] 新增好友: ${uid}`);
        send(uid, '你好，请问你是哪家公司？请提供联系方式，方便我们后续合作沟通。');
        return;
      }

      if (m.post_type === 'message' && m.message_type === 'private') {
        const text = typeof m.message === 'string'
          ? m.message
          : m.message.map(i => i.data?.text || '').join('');

        handle(m.user_id, text);
      }
    });
  });
}

// ============================================================
// 启动
// ============================================================
loadProducts();
schedulePushes();  // ← 新增：启动定时推送

// ========== 新增：23:32 测试推送 ==========
// scheduleDaily(23, 32, () => {
//   console.log('\n[测试] ⏰ 触发 23:32 测试推送...');
//   testServerChan();
// });
// console.log('[测试] ✅ 已注册: 23:32 测试推送');

start();