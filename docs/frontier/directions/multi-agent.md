---
title: 多智能体系统
status: active
last-reviewed: 2026-11-23
---

<FreshnessBadge />

# 多智能体系统（Multi-Agent Systems）

> **维护约定**：「现状速览」每季度重写一次；新事件只往「时间线」和 `data/events.yml` 里追加。

## 现状速览

2025-2026 是多智能体从「实验架构」走向「企业级基础设施」的两年，标志是**标准化完成**：A2A（agent 间通信）与 AGNTCY（发现/信任/编排）先后进入 Linux 基金会中立治理，跨厂商 agent 协作有了公共语言。框架侧格局也收敛：OpenAI Swarm（教学）→ Agents SDK（生产），AutoGen → Microsoft Agent Framework，外加 LangGraph/CrewAI/Google ADK 鼎立。但工程共识同样清晰：**多 agent 不是银弹**——它的真实价值是上下文隔离与并行，而非「多个角色讨论出智能」；Anthropic、OpenAI 的公开经验都强调从单 agent 起步、按需拆分。未来 6 个月看：A2A 在企业采购场景的实际落地（agent 跨组织互调）、AGNTCY 目录服务（75+ 组织参与）能否成为「agent 的 DNS」。

## 关键玩家

框架与编排（详见[生态-框架](/ecosystem/frameworks)）：

<ResourceGrid source="frameworks" />

标准与互操作：

<ResourceGrid source="extensions" kind="mcp" />

## 核心技术挑战

1. **通信开销与成本**：agent 间自然语言消息 token 成本高，结构化协议（A2A 的任务模型）在省，但语义压缩损失难评估。
2. **调试与归因**：三个 agent 的失败链条比单 agent 难一个数量级——没有全链路 trace 寸步难行（见[可观测性](/learn/engineering/observability)）。
3. **信任与授权传递**：A 把任务委托给 B，B 的权限是多少？A2A/AGNTCY 的能力验证就是为此设计。
4. **涌现行为的可控性**：去中心化拓扑下的死锁、震荡、目标漂移仍缺工程解。

## 时间线

<Timeline tag="multi-agent" />

## 站内深度解读

- [编排模式](/learn/patterns/orchestration-patterns)：supervisor/去中心化/流水线三种拓扑的选型
- [A2A 协议](/frontier/protocols/a2a) ｜ [AGNTCY](/frontier/protocols/agntcy)

## 外部资源

- [Anthropic: 多 agent 研究系统复盘](https://www.anthropic.com/engineering/built-multi-agent-research-system)
- [15 个 swarm 框架对比（2026-11）](https://aimultiple.com/agent-swarm)
