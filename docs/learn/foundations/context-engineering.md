---
title: 上下文工程
tags: [foundations, context-engineering]
difficulty: 进阶
last-reviewed: 2026-11-23
---

<FreshnessBadge />

# 上下文工程

## 一句话理解

上下文工程 = 为每一次 LLM 调用**精心准备「此刻窗口里该有什么」**的学科——它是 prompt 工程的超集，也是当下 agent 质量的第一决定因素。

## 为什么需要

Agent 的循环会不断往窗口里塞东西：系统提示、工具定义、历史消息、工具结果、检索文档……窗口很快爆炸。而模型注意力有限：无关内容稀释关键信息（lost in the middle）、过期信息误导决策、成本随 token 线性上涨。**模型能力越强，瓶颈越从「会不会想」转移到「看到的是什么」。**

## 窗口内容的四象限

| | 常驻（每次调用都在） | 按需（动态注入） |
| --- | --- | --- |
| **指令类** | 系统提示、角色定义、全局规则 | 任务特定指令、few-shot 示例 |
| **数据类** | 关键长期状态摘要 | 检索结果、工具输出、子任务结果 |

上下文工程的全部工作就是管理这四个格子的进与出。

## 五个核心手法

（综合 Anthropic《Effective Context Engineering》与社区实践）

1. **Compaction（压缩）**：历史过长时，把旧消息摘要化替换原文。Claude Code 的 `/compact`、各家框架的 summarization 节点都是这个。
2. **Just-in-Time Retrieval（即时检索）**：不预塞资料，等模型需要时自己通过工具拉取——「拉」比「推」省 token 且更相关。
3. **Sub-agent 隔离**：把大任务的一个分支交给 sub-agent 在**独立窗口**里处理，只把结论带回主窗口（Anthropic 多 agent 研究系统就是这么省上下文的）。
4. **结构化笔记（Note-taking）**：长任务中让 agent 维护一份运行笔记文件（已完成的、待办的、关键决策），每轮以笔记而非全量历史作为锚。
5. **工具结果治理**：工具返回值做裁剪/分页；大结果落盘后只传引用和摘要。

## 一个实用的分层配方

```text
[系统层]   角色与硬规则（护栏）—— 常驻，尽量 <1k token
[状态层]   任务笔记 / 长期记忆摘要 —— 常驻，定期重写
[工作层]   最近 N 轮对话原文 —— 滑动窗口
[注入层]   本轮检索/工具结果 —— 用完即弃（下轮压缩进状态层）
```

## 我的实践笔记

- 排查 agent「变笨」先 dump 完整上下文看一眼——十次有八次是窗口里堆了过期/无关内容，而不是模型问题。
- 上下文工程和[记忆机制](/learn/foundations/memory)是同一枚硬币两面：前者管「此刻窗口」，后者管「跨会话存取」。

## 参考资料

- [Anthropic: Effective Context Engineering](https://www.anthropic.com/engineering/effective-context-engineering)
- [Anthropic: 多 agent 研究系统](https://www.anthropic.com/engineering/built-multi-agent-research-system)
- 站内：[记忆机制](/learn/foundations/memory)、[护栏与人机协同](/learn/patterns/guardrails)
