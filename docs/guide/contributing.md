# 收录标准与贡献指南

## 收录判断

一个资源值不值得进 `data/`，看三点：

1. **可复现**：有稳定入口（官网/仓库/论文页），不是营销软文。
2. **有信息量**：读它能改变你对某个问题的判断，而不是重复常识。
3. **点评必须自己写**：每条 `comment` 是个人判断，一句话说清「它是什么、什么时候选它」。抄官网宣传语不如不收录。

## 如何新增内容

### 场景一：加一条资源（框架/产品/skill/发文源/论文）

编辑对应的 `data/*.yml`，加一个条目即可，前端页面自动渲染，**不需要碰任何 markdown**：

```yaml
- name: 资源名
  url: https://...
  tags: [从既有标签里复用]   # 新标签要慎重，标签是筛选维度
  comment: 一句话个人点评    # 必填，这是本库区别于 awesome list 的地方
  added: 2026-11-23
```

字段规范：

| 文件 | 专有字段 | 说明 |
| ---- | -------- | ---- |
| `frameworks.yml` | `category` `lang` | category：编排/应用/轻量/研究/领域框架 |
| `products.yml` | `kind` | `coding-agent` / `platform` / `personal` / `browser` |
| `extensions.yml` | `kind` `platform` | kind：`skill`/`plugin`/`mcp`/`prompt`/`rule`/`template` |
| `sources.yml` | `region` `quality` `has-rss` `must-read` | quality：A 必读 / B 精选 / C 跟踪 |
| `papers.yml` | `year` | 已写解读笔记的，在 comment 里注明「站内已有解读笔记」 |
| `events.yml` | `tags` | tag 与前沿方向对应（protocols/commerce/coding…） |

通用约定：`stars` 由脚本自动更新，手填 `0`；`status: superseded/archived` 标记被替代项目。

### 场景二：写一篇知识/论文/案例笔记

1. 复制 `templates/` 下对应模板到目标目录，重命名。
2. 在 `docs/.vitepress/config.mts` 的 sidebar 里加一行链接。
3. 填内容。frontmatter 里 `last-reviewed` 必填。

### 场景三：追踪一个新前沿方向

1. 复制 `templates/frontier.md` 到 `docs/frontier/directions/`。
2. 在 `frontier/_overview.md` 状态表里登记，状态设 `active`。
3. 把该方向的关键资源录进 data，事件录进 `data/events.yml`（带方向 tag）。
4. sidebar 注册。

## 自动化流水线

| 命令 / 定时任务 | 作用 |
| --------------- | ---- |
| `npm run sync:stars`（每周） | 拉取 data 中 GitHub 仓库的最新 star 数 |
| `npm run check:links`（每周） | 校验 data 中所有链接，死链标进报告 |
| `npm run fetch:feeds`（每周） | 拉取 `sources.yml` 中 `has-rss: true` 的源，生成周报草稿到 `docs/digest/inbox/` |
| `deploy.yml`（push 即触发） | 构建并发布到 GitHub Pages |

每周的 `refresh.yml` 会以上述结果开一个自动 PR，merge 即完成一次「保鲜」。

## 周报写法（低门槛坚持）

每周一篇 `docs/digest/YYYY-WW.md`（WW 为周号）：

```markdown
# 周报 2026-W48
- **[方向] 一句话动态** [来源链接]
- …3~5 条即可
```

值得留档的大事同步进 `data/events.yml`。**坚持比完美重要。**
