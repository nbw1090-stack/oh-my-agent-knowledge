---
title: 记忆前沿
status: stable
last-reviewed: 2026-11-23
---

<FreshnessBadge />

# 记忆前沿（Memory Frontier）

> **维护约定**：「现状速览」每季度重写一次；新事件只往「时间线」和 `data/events.yml` 里追加。

## 现状速览

基础理论见[记忆机制](/learn/foundations/memory)，本页只追前沿。2025-2026 的主旋律是**「上下文工程 vs 外挂记忆」的路线之争**：一派认为随着上下文窗口和模型原生记忆能力增长，复杂记忆架构终将被「大窗口 + 智能压缩」取代；另一派（Letta/Mem0 等）认为跨会话的持久记忆、用户级个性化是独立基础设施。中间路线事实上胜出：Claude Code 的记忆文件（CLAUUDE.md 类）、各 coding agent 的项目记忆，都是「文件即记忆」的朴素形态。2026 年研究侧，记忆综述（机制/评测）相继出现，MemoryAgentBench 等基准让「记忆能力」第一次可量化比较。未来 6 个月看：模型原生记忆 API（厂商把记忆做进模型层）对外挂方案的价格压制、agent 记忆的隐私合规立法、以及多 agent 共享记忆的权限模型。

## 关键玩家

记忆方向的主要方案（框架侧收录见[生态-框架](/ecosystem/frameworks)）：

<ResourceGrid source="papers" />

（上表按标签筛选 `memory` 可见记忆相关论文。）

## 核心技术挑战

1. **写入质量**：错误记忆被反复检索放大——写入前校验/反思是共识但无标准方案。
2. **检索相关性**：向量相似 ≠ 此刻该想——时间/重要性/语义多因子加权仍在探索。
3. **遗忘与更新**：过期信息淘汰、矛盾消解（新旧事实冲突取谁）。
4. **隔离与合规**：用户级记忆的权限隔离、导出与被遗忘权。

## 时间线

（记忆方向事件暂未单独收录，重要进展会录入 `data/events.yml`。）

## 站内深度解读

- [记忆机制综述（2026）解读](/frontier/research/memory-survey-2026)
- [上下文工程](/learn/foundations/context-engineering)：路线之争的另一极

## 外部资源

- [Letta（MemGPT 团队）博客](https://www.letta.com/blog)
- [Mem0 文档](https://docs.mem0.ai/)
