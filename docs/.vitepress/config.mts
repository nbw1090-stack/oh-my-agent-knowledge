import { defineConfig } from 'vitepress'

const REPO = 'https://github.com/nbw1090-stack/oh-my-agent-knowledge'
// 站点部署在 GitHub Pages 子路径下，资源引用必须带此前缀
const BASE = '/oh-my-agent-knowledge/'

export default defineConfig({
  lang: 'zh-CN',
  base: BASE,
  title: 'Oh My Agent Knowledge',
  description:
    'Agent 技术知识库：基础理论 · 前沿方向 · 生态版图 · 企业实践 · 每周动态',
  lastUpdated: true,
  cleanUrls: true,

  head: [['link', { rel: 'icon', href: `${BASE}favicon.svg` }]],

  themeConfig: {
    nav: [
      { text: '使用指南', link: '/guide/' },
      { text: '学习', link: '/learn/foundations/what-is-agent' },
      { text: '前沿', link: '/frontier/_overview' },
      { text: '生态', link: '/ecosystem/frameworks' },
      { text: '实践', link: '/practice/learning-paths/beginner-7-days' },
      { text: '周报', link: '/digest/' },
    ],

    sidebar: [
      {
        text: '使用指南',
        collapsed: false,
        items: [
          { text: '这个库怎么用', link: '/guide/' },
          { text: '收录标准与贡献指南', link: '/guide/contributing' },
        ],
      },
      {
        text: '学习 Learn',
        collapsed: true,
        items: [
          {
            text: '基础理论',
            collapsed: false,
            items: [
              { text: '什么是 Agent', link: '/learn/foundations/what-is-agent' },
              { text: '推理与规划', link: '/learn/foundations/reasoning' },
              { text: '记忆机制', link: '/learn/foundations/memory' },
              { text: '工具使用', link: '/learn/foundations/tool-use' },
              { text: '上下文工程', link: '/learn/foundations/context-engineering' },
            ],
          },
          {
            text: '设计模式',
            collapsed: false,
            items: [
              { text: '编排模式', link: '/learn/patterns/orchestration-patterns' },
              { text: '护栏与人机协同', link: '/learn/patterns/guardrails' },
            ],
          },
          {
            text: '生产工程',
            collapsed: false,
            items: [
              { text: '评测', link: '/learn/engineering/evaluation' },
              { text: '可观测性', link: '/learn/engineering/observability' },
              { text: '安全', link: '/learn/engineering/security' },
            ],
          },
        ],
      },
      {
        text: '前沿 Frontier',
        collapsed: true,
        items: [
          { text: '方向总览', link: '/frontier/_overview' },
          {
            text: '前沿方向',
            collapsed: false,
            items: [
              { text: 'Personal Agents', link: '/frontier/directions/personal-agents' },
              { text: '多智能体系统', link: '/frontier/directions/multi-agent' },
              { text: 'Coding Agents', link: '/frontier/directions/coding-agents' },
              { text: 'Computer Use', link: '/frontier/directions/computer-use' },
              { text: 'Agentic Commerce', link: '/frontier/directions/agentic-commerce' },
              { text: '具身智能', link: '/frontier/directions/embodied-agents' },
              { text: '记忆前沿', link: '/frontier/directions/memory-frontier' },
            ],
          },
          {
            text: '协议与标准',
            collapsed: false,
            items: [
              { text: 'MCP', link: '/frontier/protocols/mcp' },
              { text: 'A2A', link: '/frontier/protocols/a2a' },
              { text: 'AGNTCY', link: '/frontier/protocols/agntcy' },
              { text: 'Agent 支付协议', link: '/frontier/protocols/payments' },
            ],
          },
          {
            text: '论文解读',
            collapsed: false,
            items: [
              { text: 'Agent 记忆机制综述', link: '/frontier/research/memory-survey-2026' },
              { text: 'Agent 评测综述', link: '/frontier/research/agent-eval-survey' },
            ],
          },
        ],
      },
      {
        text: '生态 Ecosystem',
        collapsed: true,
        items: [
          { text: '框架全景', link: '/ecosystem/frameworks' },
          { text: '产品全景', link: '/ecosystem/products' },
          { text: 'Skills / Plugins / Prompts', link: '/ecosystem/extensions' },
          { text: '企业技术发文源', link: '/ecosystem/sources' },
        ],
      },
      {
        text: '实践 Practice',
        collapsed: true,
        items: [
          {
            text: '学习路径',
            collapsed: false,
            items: [
              { text: '七天入门', link: '/practice/learning-paths/beginner-7-days' },
              { text: '构建者进阶路线', link: '/practice/learning-paths/builder-roadmap' },
            ],
          },
          {
            text: '企业案例',
            collapsed: false,
            items: [
              { text: '示例：客服 Agent 落地', link: '/practice/cases/example-support-agent' },
            ],
          },
        ],
      },
      {
        text: '动态 Digest',
        collapsed: true,
        items: [{ text: '周报索引', link: '/digest/' }],
      },
    ],

    socialLinks: [{ icon: 'github', link: REPO }],

    search: {
      provider: 'local',
      options: {
        translations: {
          button: { buttonText: '搜索文档', buttonAriaLabel: '搜索文档' },
          modal: {
            noResultsText: '无法找到相关结果',
            resetButtonTitle: '清除查询条件',
            footer: { selectText: '选择', navigateText: '切换', closeText: '关闭' },
          },
        },
      },
    },

    outline: { level: [2, 3], label: '本页目录' },
    docFooter: { prev: '上一篇', next: '下一篇' },
    lastUpdatedText: '最后更新',
    returnToTopLabel: '回到顶部',
    sidebarMenuLabel: '目录',
    darkModeSwitchLabel: '主题',
    lightModeSwitchTitle: '切换到浅色',
    darkModeSwitchTitle: '切换到深色',
  },
})
