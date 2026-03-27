/**
 * QQ 库存机器人 v6.4 - 成交流程控制版
 */

const WebSocket = require('ws');
const fs = require('fs');
const path = require('path');
const XLSX = require('xlsx');

// ============================================================
// 配置
// ============================================================
const CONFIG = {
  wsPort: 6199,
  productsFile: path.join(__dirname, 'products.xlsx'),

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
    });
  });

  console.log(`[数据] 已加载 ${productDB.size} 个型号`);
}

function findProduct(text) {
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

  return scoreMax > 0.6 ? best : null;
}

// ============================================================
// 数量识别
// ============================================================
function extractQty(text) {
  // 必须带单位才认数量
  const match = text.match(/(\d+)\s*(k|K|pcs|PCS|个|只|片)/);
  if (!match) return null;

  let num = parseInt(match[1]);
  if (/k/i.test(match[2])) num *= 1000;

  return num;
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
  const product = findProduct(text);
  // ====================================================
  // ✅ 解锁机制（必须放最前）
  // ====================================================
  // 1️⃣ 新型号触发解锁（最优先）
  if (s.locked && product) {
    s.locked = false;
    s.state = 'wait_qty';
    s.model = product.型号;
    s.qty = null;

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
      const p = findProduct(s.model);
      if (!p) return;
      send(uid, CONFIG.scripts.reply(p));
      s.state = 'done';
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

      if (m.post_type === 'message') {
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
start();