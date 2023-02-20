/** @format */
module.exports = {
  chainWebpack(config) {
    config.resolve.alias.set('core-js/library/fn', 'core-js/features');
  },
  locales: {
    // 键名是该语言所属的子路径
    // 作为特例，默认语言可以使用 '/' 作为其路径。
    '/': {
      lang: 'en-US', // 将会被设置为 <html> 的 lang 属性
      title: 'z-element-ui',
      description: 'Based on Vue2 & Element-UI encapsulation, fully data-driven, ready to use out of the box!'
    },
    '/zh/': {
      lang: 'zh-CN',
      title: 'z-element-ui',
      description: '基于element-ui & vue2进行封装,极简风格，开箱即用.'
    }
  },

  themeConfig: {
    logo: '/logo.png',
    smoothScroll: true,
    sidebar: 'auto',
    locales: {
      '/': {
        selectText: 'Languages',
        label: 'English',
        ariaLabel: 'Languages',
        editLinkText: 'Edit this page on GitHub',
        serviceWorker: {
          updatePopup: {
            message: 'New content is available.',
            buttonText: 'Refresh'
          }
        },
        algolia: {},
        nav: [
          {
            text: 'Nested',
            link: '/nested/',
            ariaLabel: 'Nested'
          }
        ],
        sidebar: {
          '/': [
            /* ... */
          ],
          '/nested/': [
            /* ... */
          ]
        }
      },
      '/zh/': {
        // 多语言下拉菜单的标题
        selectText: '选择语言',
        // 该语言在下拉菜单中的标签
        label: '简体中文',
        // 编辑链接文字
        editLinkText: '在 GitHub 上编辑此页',
        // Service Worker 的配置
        serviceWorker: {
          updatePopup: {
            message: '发现新内容可用.',
            buttonText: '刷新'
          }
        },
        // 当前 locale 的 algolia docsearch 选项
        algolia: {},
        nav: [
          {
            text: '文档',
            link: '/zh/guide/start'
          }
        ],
        sidebar: [
          {
            title: '开始', // 必要的
            collapsable: false, // 可选的, 默认值是 true,
            children: ['/zh/guide/start', '/zh/guide/import']
          },
          {
            title: '组件', // 必要的
            collapsable: false, // 可选的, 默认值是 true,
            children: ['/zh/comps/table', '/zh/comps/edit-table', '/zh/comps/form-item']
          }
        ]
      }
    }
  },
  plugins: ['@vuepress/back-to-top', '@xiaopanda/vuepress-plugin-code-copy']
};
