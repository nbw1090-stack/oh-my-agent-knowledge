---
title: 可观测性
tags: [engineering, observability, tracing]
difficulty: 进阶
last-reviewed: 2026-11-23
---

<FreshnessBadge />

# 可观测性

## 一句话理解

Agent 可观测性的核心是**全链路 trace**：把每一次 LLM 调用、工具执行、sub-agent 分支记成树状 span——没有 trace 的 agent 是黑盒，调试和评测都无从谈起。

## 为什么需要

一次任务跑失败，你要回答：它第几步走错的？当时上下文里有什么？为什么选了这个工具？这些答案都在运行轨迹里。另外成本治理（token 花在哪）、回归定位（哪次改动让通过率掉了）都依赖统一 trace。

## Trace 数据模型

```text
trace (一次任务)
├── span: LLM 调用        {prompt token数, 模型, 耗时, 成本}
│   └── attribute: 输入消息 / 输出 / 工具调用请求
├── span: 工具执行         {工具名, 参数, 返回摘要, 耗时, 报错}
├── span: 检索             {query, 命中文档id, 分数}
└── span: sub-agent 任务   ← 嵌套 trace，父 span 指向子 trace
```

三个必须打点的地方：LLM 调用（含完整输入输出）、工具边界（参数与结果摘要）、agent 交接（handoff/sub-agent 进出）。检索若存在，单独打点。

## 工具生态

| 工具 | 定位 | 点评 |
| ---- | ---- | ---- |
| LangSmith | LangChain 官方 | 与 LangGraph 集成最深，评测闭环好 |
| Langfuse | 开源 | 可自托管，厂商中立，社区增长最快 |
| Arize Phoenix | 开源 | eval + trace 双强，OpenTelemetry 原生 |
| OpenTelemetry GenAI 语义约定 | 标准 | trace 数据格式的标准化方向，长期选型要看支持度 |

选型一句话：深度用 LangChain 系 → LangSmith；要自托管/中立 → Langfuse；已有 OTel 体系 → Phoenix。

## 从 trace 到治理

- **成本**：按 trace 聚合 token 成本，定位「最贵的 1% 任务」优先优化（通常是长循环+大上下文）。
- **质量看板**：任务成功率、平均步数、人工介入率、每任务成本——这四个指标基本刻画了 agent 的健康度。
- **在线问题回放**：trace 里的完整输入输出让你能离线复现任何一次失败（注意脱敏）。

## 我的实践笔记

- 打点从第一天就要有，后补的成本是十倍——工具边界处尤其不能省。
- trace 里存「工具结果摘要」而非全量（大结果落盘存引用），否则 trace 本身先把你存储费打爆。

## 参考资料

- [OpenTelemetry GenAI 语义约定](https://opentelemetry.io/docs/specs/semconv/gen-ai/)
- [Langfuse 文档](https://langfuse.com/docs) ｜ [LangSmith](https://docs.smith.langchain.com/)
- 站内：[评测](/learn/engineering/evaluation)（trace 的下游消费者）
