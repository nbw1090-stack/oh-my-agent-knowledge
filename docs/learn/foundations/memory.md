---
title: 记忆机制
tags: [foundations, memory]
difficulty: 进阶
last-reviewed: 2026-11-23
---

<FreshnessBadge />

# 记忆机制

## 一句话理解

上下文窗口是 agent 的「工作内存」，记忆系统是它的「硬盘」——把经验持久化、按需取回，突破窗口限制并实现跨会话学习。

## 为什么需要

三个硬约束：① 上下文窗口有限且贵；② 会话结束状态即丢失，下次从零开始；③ 长任务中关键信息会被后续内容稀释（lost in the middle）。记忆机制让 agent 「记得住历史、找得回细节、提炼得出经验」。

## 记忆分类学

（沿 Generative Agents / 记忆综述的通行框架）

| 类型 | 对应人类概念 | 存储内容 | 典型实现 |
| ---- | ------------ | -------- | -------- |
| 工作记忆 | 短时记忆 | 当前上下文窗口内的对话与观察 | 上下文管理 + 压缩 |
| 情景记忆 | 回忆 | 「何时发生过什么」的事件流 | 会话历史库、时间线索引 |
| 语义记忆 | 知识 | 提炼后的事实与知识 | 向量库 RAG、知识图谱 |
| 程序记忆 | 技能 | 「怎么做」的经验 | Skills 文件、沉淀的 prompt/代码 |

## 记忆操作原语

一个完整的记忆系统围绕四个操作构建：

1. **写入（Write）**：什么进记忆？逐条记（流水账）还是定期摘要（压缩）？
2. **管理（Manage）**：冲突消解（新旧信息矛盾取谁？）、遗忘（过期/低价值淘汰）、反思（从多条记忆提炼结论，Generative Agents 的核心创新）。
3. **检索（Retrieve）**：按语义相似度（向量检索）、时间近因、重要性打分加权——单一维度都不够。
4. **利用（Utilize）**：检索结果怎么拼回上下文、何时触发写入。

## 两种代表性架构

**RAG 式（外挂检索）**：记忆 = 向量库，每轮检索 top-k 注入上下文。简单通用，但「检索到的不一定是此刻该想的」。

**OS 式（MemGPT/Letta）**：把上下文窗口当 RAM，把外部存储当磁盘，模型自己决定何时「换页」（把什么调进来、什么存出去）。更接近自主记忆管理，工程复杂度更高。

```python
# RAG 式记忆的极简骨架
history = MemoryStore()                      # 向量库
def on_turn_end(turn):
    history.add(embed(turn.summary))          # 写入（先摘要再存）
def build_context(query, k=5):
    return history.search(embed(query), k)    # 检索注入
```

## 主流方案速览

- **框架内置**：LangGraph checkpointer（线程级状态）、Letta（MemGPT 商业化）、Mem0（记忆中间件，检索+更新管线）。
- **产品级关注点**：记忆的隔离与权限（用户 A 的记忆绝不能漏给用户 B）、可审计（记忆要能导出/删除，合规要求）、评测（MemoryAgentBench 专门测这个）。

## 我的实践笔记

- 90% 的场景只需要「会话摘要 + 向量检索」，别上来就搞分层记忆架构。
- 记忆最大的坑不是技术而是**脏数据**：错误结论一旦被写进长期记忆会被反复检索放大。写入前过一道校验（或 reflection）非常值。

## 参考资料

- [Lilian Weng: Agent 记忆章节](https://lilianweng.github.io/posts/2023-06-23-agent/#memory)
- [MemGPT 论文](https://arxiv.org/abs/2310.08560) ｜ [Generative Agents](https://arxiv.org/abs/2304.03442)
- 站内：[记忆机制综述（2026）解读](/frontier/research/memory-survey-2026)、[记忆前沿方向](/frontier/directions/memory-frontier)
