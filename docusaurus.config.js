const path = require("path");
const math = require("remark-math");
const katex = require("rehype-katex");

module.exports = {
  title: "潜心专研的小张同学", // 网站标签名称
  // tagline:
  //   "帮助你提升前端开发技能，分享 HTML、CSS、JavaScript、React 和 Vue 等开发实战经验",
  titleDelimiter: "-",
  // url: "https://zxuqian.cn",
  url: "https://zhangqiang.vercel.app",
  baseUrl: "/",
  favicon: "https://avatars.githubusercontent.com/u/44993003?s=400&u=02570a73330dd7eeae310b302962c034b2833988&v=4", // 网站图标
  organizationName: "zhangqiang", // Usually your GitHub org/user name.
  projectName: "zhangqiang.vercel.app", // Usually your repo name.
  themeConfig: {
    // announcementBar: {
    //   id: "feature_release", // Any value that will identify this message.
    //   content: `更新<a href='/docs/videos/vue/vue-echarts-doughnut-chart'>《Vue 3.0 + ECharts 实现电影票房自定义环形图教程》配套文本</a>；上线小工具栏目，添加<a href='/docs/tools/glassmorphism-generator'>玻璃特效生成器小工具，点击查看</a>`,
    //   backgroundColor: "#fafbfc", // Defaults to `#fff`.
    //   textColor: "#091E42", // Defaults to `#000`.
    // },
    hideableSidebar: true,
    navbar: {
      title: "潜心专研的小张同学",
      logo: {
        alt: "潜心专研的小张同学",
        src: "https://avatars.githubusercontent.com/u/44993003?s=400&u=02570a73330dd7eeae310b302962c034b2833988&v=4",
        srcDark: "https://avatars.githubusercontent.com/u/44993003?s=400&u=02570a73330dd7eeae310b302962c034b2833988&v=4",
      },
      items: [
        {
          type: "localeDropdown",
          position: "left",
        },
        {
          to: "/",
          label: "首页",
          position: "right",
        },
        {
          label: "专属学习文档",
          position: "right",
          items: [
            {
              label: "CSS 教程",
              to: "docs/css/css-intro",
            },
            {
              label: "JavaScript 教程",
              // to: "/",
            },
            {
              label: "react 教程",
              // to: "/",
            },
            // {
            //   label: "B 站配套文本",
            //   to: "docs/videos/videos-intro",
            // },
            // {
            //   label: "CSS 教程",
            //   to: "docs/css/box-model/box-model",
            // },
            // {
            //   label: "资源导航",
            //   // position: "right",
            //   to: "docs/resources/resources-intro",
            // },
          ],
        },

        // {
        //   label: "课程",
        //   position: "right",
        //   items: [
        //     {
        //       label: "React 即时通信 UI 开发实战",
        //       to: "docs/course/react-chat-ui/react-chat-ui",
        //     },
        //   ],
        // },

        // {
        //   label: "小工具",
        //   position: "right",
        //   to: "docs/tools/tools-intro",
        // },

        // {
        //   href: "https://www.itnanls.cn",
        //   label: "IT楠老师",
        //   position: "right",
        // },
        {
          href: "https://github.com/JACK-ZHANG-coming/zxuqian.cn",
          label: "本站源码",
          position: "right",
        },
        // {
        //   href: "https://github.com/zxuqian/frontend-questions/issues",
        //   label: "提问",
        //   position: "right",
        // },
      ],
    },
    algolia: {
      apiKey: "fabfb0e9997e101154ed85d64b7b6a3c",
      indexName: "ZXUQIANCN",
      appId: "LIJMO3C9C4",
      contextualSearch: true,
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "学习",
          items: [
            {
              label: "w3school 在线教程",
              to: "https://www.w3school.com.cn/index.html",
            },
            {
              label: "JavaScript | MDN",
              to: "https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/random",
            },
            {
              label: "前端学习路线",
              to: "https://objtube.gitee.io/front-end-roadmap/#/",
            },
            {
              label: "使用 State Hook – React",
              to: "https://zh-hans.reactjs.org/docs/hooks-state.html#gatsby-focus-wrapper",
            },
            // {
            //   label: "CSS 教程",
            //   to: "docs/css/box-model/box-model",
            // },
            // {
            //   label: "资源导航",
            //   to: "docs/resources/resources-intro",
            // },
          ],
        },
        {
          title: "社交媒体",
          items: [
            // {
            //   label: "首页",
            //   to: "/",
            // },
            {
              label: "GitHub",
              href: "https://github.com/JACK-ZHANG-coming/zxuqian.cn",
            },
            {
              label: "Bilibili 哔哩哔哩",
              href: "https://space.bilibili.com/299974236",
            },
          ],
        },
        {
          title: "友情链接",
          items: [
            {
              label: "yuqing521のblog",
              to: "https://yuqing521.github.io/",
            },
            {
              label: "lookroot的个人空间",
              to: "https://www.lookroot.cn/",
            },
            {
              label: "峰华前端工程师",
              to: "https://zxuqian.cn",
            },
          ],
        },
      ],
      copyright: `<p>Copyright © ${new Date().getFullYear()} 111峰华 (张旭乾) Built with Docusaurus.</p>
      <p><a href="http://beian.miit.gov.cn/" style="color: hsl(210deg, 100%, 80%)">冀ICP备14007097号-3</a></p>
      <a rel="license" href="http://creativecommons.org/licenses/by-nc/4.0/">
      <img alt="Creative Commons License" style="border-width:0" src="/img/creative-commons-license-icon.png" /></a>
      <br />本站所有内容遵循 <a rel="license" href="https://creativecommons.org/licenses/by-nc/4.0/deed.zh-Hans" 
      style="color: hsl(210deg, 100%, 80%)">CC BY-NC 4.0 协议</a>，转载须注明署名和出处，且不可用于商业用途。
      若与其他同步平台协议冲突，以本网站为准。`,
    },
    prism: {
      theme: require("prism-react-renderer/themes/github"),
      darkTheme: require("prism-react-renderer/themes/oceanicNext"),
      defaultLanguage: "javascript",
    },
    // googleAnalytics: {
    //   trackingID: "UA-118572241-1",
    //   anonymizeIP: true, // Should IPs be anonymized?
    // },
    gtag: {
      trackingID: "G-6PSESJX0BM",
      // Optional fields.
      anonymizeIP: true, // Should IPs be anonymized?
    },
  },
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          editUrl: "https://github.com/JACK-ZHANG-coming/zxuqian.cn",
          remarkPlugins: [math],
          rehypePlugins: [katex],
          showLastUpdateTime: true,
        },
        blog: {
          path: "./blog",
          routeBasePath: "/",
          blogSidebarTitle: "近期文章",
          remarkPlugins: [math],
          rehypePlugins: [katex],
          feedOptions: {
            type: "all",
            title: "峰华前端工程师1111",
            copyright: `Copyright © ${new Date().getFullYear()} 2222峰华 (张旭乾) Built with Docusaurus.<p><a href="http://beian.miit.gov.cn/">冀ICP备14007097号-3</a></p>`,
          },
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
        sitemap: {
          changefreq: "daily",
          priority: 0.5,
        },
      },
    ],
  ],
  // themes: ["@docusaurus/theme-live-codeblock"],
  plugins: [
    path.resolve(__dirname, "./src/plugin/plugin-baidu-analytics"),
    path.resolve(__dirname, "./src/plugin/plugin-baidu-push"),
    // "@docusaurus/plugin-ideal-image",
    path.resolve(__dirname, "./src/plugin/plugin-google-adsense"),
    path.resolve(__dirname, "./src/plugin/plugin-onesignal-push"),
    "docusaurus2-dotenv",
    [
      "@docusaurus/plugin-content-blog",
      {
        id: "lifestyle-blog",
        routeBasePath: "lifestyle",
        path: "./lifestyle",
        feedOptions: {
          type: "all",
          title: "峰华前端工程师2222",
          copyright: `Copyright © ${new Date().getFullYear()} 3333峰华 (张旭乾) Built with Docusaurus.<p><a href="http://beian.miit.gov.cn/">冀ICP备14007097号-3</a></p>`,
        },
      },
    ],
    // [
    //   "@easyops-cn/docusaurus-search-local",
    //   {
    //     hashed: true,
    //     // indexPages: true,
    //     blogRouteBasePath: "/",
    //     language: ["en", "zh"],
    //   },
    // ],
  ],
  stylesheets: [
    {
      rel: "preconnect",
      href: "https://fonts.gstatic.com",
      type: "text/css",
    },
    {
      href: "/katex/katex.min.css",
      type: "text/css",
      integrity:
        "sha384-AfEj0r4/OFrOo5t7NnNe46zW/tFgW6x/bCJG8FqQCEo3+Aro6EYUG4+cU+KJWu/X",
      crossorigin: "anonymous",
    },
    {
      href: "https://fonts.font.im/css?family=Raleway:500,700&display=swap",
      type: "text/css",
      rel: "stylesheet",
    },
    // {
    //   href: "https://fonts.googleapis.com/css2?family=Fira+Code&display=swap",
    //   type: "text/css",
    //   rel: "stylesheet",
    // },
  ],
  i18n: {
    defaultLocale: "zh-CN",
    locales: ["zh-CN", "en"],
    localeConfigs: {
      "zh-CN": {
        label: "中文",
      },
      en: {
        label: "English",
      },
    },
  },
};
