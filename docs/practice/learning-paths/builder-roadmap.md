---
title: 构建者进阶路线
tags: [learning-path, builder]
last-reviewed: 2026-11-23
---

<FreshnessBadge />

# 构建者进阶路线

目标：从「会跑 demo」到「能上生产」。按四个阶段推进，每阶段有明确的毕业标准。

## 阶段一：模式熟练（1-2 周）

- 精读 [编排模式](/learn/patterns/orchestration-patterns)，用框架实现链式/路由/并行三种 workflow
- **毕业标准**：给定需求能 10 分钟内说出该用哪种模式及理由

## 阶段二：生产化改造（2-4 周）

- [护栏与人机协同](/learn/patterns/guardrails)：给写操作加 HITL 确认
- [可观测性](/learn/engineering/observability)：接入 Langfuse（或 LangSmith），全链路 trace
- **毕业标准**：任何一次失败任务，你能在 trace 里 5 分钟定位到出错步骤

## 阶段三：评测驱动（持续）

- [评测](/learn/engineering/evaluation)：从真实失败攒 case 库，搭回归看板（成功率×步数×成本×介入率）
- **毕业标准**：每次改 prompt/换模型都有前后对比数据，不再凭感觉

## 阶段四：扩展视野（持续）

- 跟踪 [前沿方向](/frontier/_overview)，按需深入：做企业集成学 MCP/A2A，做电商关注支付协议，做工具产品研究 Skills 生态
- 每周 10 分钟 [周报](/digest/)，值得深读的转成站内笔记

## 推荐项目练手（由易到难）

1. 个人知识库问答 agent（RAG + 引用溯源）
2. 客服分流 + 退款处理 workflow（路由 + HITL + 审计）
3. 多 agent 研究助理（supervisor + 检索 sub-agents，体会上下文隔离的收益）
4. 给上面的系统接 MCP server 并发布 skill——加入扩展生态
