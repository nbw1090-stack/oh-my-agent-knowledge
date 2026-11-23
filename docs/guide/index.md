# 这个库怎么用

这是一个**个人维护、公开分享**的 Agent 技术知识库。与传统的 awesome list（纯链接堆积）不同，它同时做三件事：**沉淀理解**（手写笔记）、**维护版图**（数据驱动的资源目录）、**追踪动态**（周报与时间线）。

## 全站结构

按「读者意图」分为五个板块 + 根级指南，顶级结构永不增加：

| 板块 | 回答的问题 | 更新频率 | 维护方式 |
| ---- | ---------- | -------- | -------- |
| **学习 Learn** | 原理是什么？ | 低 | 手写深度笔记（`templates/knowledge.md`） |
| **前沿 Frontier** | 最近在发生什么？ | 高 | 活文档（`templates/frontier.md`），每季度重写速览 |
| **生态 Ecosystem** | 有哪些东西可用？ | 持续 | 改 `data/*.yml` 即自动渲染，脚本维护 |
| **实践 Practice** | 别人怎么落地的？ | 中 | 案例笔记（`templates/case-study.md`） |
| **动态 Digest** | 本周一句话速览 | 每周 | RSS 自动聚合草稿 + 人工筛选 |

## 三条使用建议

1. **新手上路**：走 [七天入门路径](/practice/learning-paths/beginner-7-days)，按顺序读 learn 板块。
2. **选型查资料**：直接进 [生态版图](/ecosystem/frameworks)，按标签筛选、对比点评。
3. **每周十分钟**：看一眼 [最新周报](/digest/)，把值得深读的内容转成笔记。

## 本地运行

```bash
git clone https://github.com/nbw1090-stack/oh-my-agent-knowledge.git
cd oh-my-agent-knowledge
npm install
npm run docs:dev      # http://localhost:5173
```

推送到 `main` 分支后 GitHub Actions 自动构建并发布到 GitHub Pages。

## 新鲜度约定

- 所有知识页带 `last-reviewed` frontmatter，超过 180 天未审校会自动显示 ⚠️ 过时标记（`<FreshnessBadge />`）。
- 前沿方向带 `status`：`active`（活跃追踪）/ `stable`（趋稳）/ `archived`（已过气，保留作历史档案）。

下一步：阅读[收录标准与贡献指南](/guide/contributing)了解怎么往里加内容。
