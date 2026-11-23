# Oh My Agent Knowledge 🤖

> Agent 技术知识库：**基础理论 · 前沿方向 · 生态版图 · 企业实践 · 每周动态**
> 把「收藏链接」变成「沉淀理解」。

[![Deploy Docs](https://github.com/nbw1090-stack/oh-my-agent-knowledge/actions/workflows/deploy.yml/badge.svg)](https://github.com/nbw1090-stack/oh-my-agent-knowledge/actions/workflows/deploy.yml)

## 这是什么

不是又一个 awesome list。本库同时做三件事：

1. **沉淀理解**——手写深度笔记（基础理论/设计模式/生产工程/论文解读），带模板与新鲜度管理；
2. **维护版图**——框架、产品、Skills/Plugins/Prompts、企业发文源全部收进 `data/*.yml`，前端自动渲染成可筛选表格；
3. **追踪动态**——每周 RSS 自动聚合收件箱 + 人工筛选周报 + 行业大事时间线。

## 站点结构

| 板块 | 回答的问题 | 更新频率 |
| ---- | ---------- | -------- |
| `learn/` 学习 | 原理是什么 | 低（手写笔记） |
| `frontier/` 前沿 | 最近在发生什么（Personal Agents / 多智能体 / Coding Agents / Computer Use / Agentic Commerce / 协议 / 论文） | 高（活文档） |
| `ecosystem/` 生态 | 有哪些框架 / 产品 / skills / 信源 | 持续（改 yml 即可） |
| `practice/` 实践 | 别人怎么落地 | 中（案例笔记） |
| `digest/` 动态 | 本周一句话速览 | 每周 |

## 快速开始

```bash
npm install
npm run docs:dev        # 本地预览 http://localhost:5173
npm run docs:build      # 构建静态站点
```

**发布上线**（一次性设置）：

1. 仓库 Settings → Pages → Source 选 **GitHub Actions**；
2. 推送到 `main`，`deploy.yml` 自动发布。

## 日常维护

| 动作 | 做法 |
| ---- | ---- |
| 加一条资源 | 改 `data/*.yml` 加一个条目（前端自动渲染，不碰 markdown） |
| 写一篇笔记 | 复制 `templates/` 模板 → 填内容 → sidebar 注册 |
| 每周保鲜 | merge `auto/weekly-refresh` PR（star 同步 + RSS 收件箱 + 死链报告，全自动生成） |
| 手动跑脚本 | `npm run sync:stars` / `npm run fetch:feeds` / `npm run check:links` |

详见[收录标准与贡献指南](docs/guide/contributing.md)。

## 目录速览

```
docs/            # VitePress 文档源（全部内容）
data/            # 生态版图唯一事实来源（6 个 yml）
templates/       # 四套文档模板（knowledge/frontier/paper/case）
scripts/         # star 同步 / RSS 聚合 / 死链校验
.github/         # deploy（push 即发布）+ refresh（每周自动 PR）
```

## License

MIT
