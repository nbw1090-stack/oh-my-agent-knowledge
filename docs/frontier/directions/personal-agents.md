---
title: Personal Agents
status: active
last-reviewed: 2026-11-23
---

<FreshnessBadge />

# Personal Agents（个人智能体）

> **维护约定**：「现状速览」每季度重写一次；新事件只往「时间线」和 `data/events.yml` 里追加。

## 现状速览

2026 年的 personal agent 竞赛核心词是 **ambient（常伴）与 proactive（主动）**：不再等用户提问，而是持续感知用户上下文（屏幕、日程、位置、对话历史），在合适时机主动出手。Google 以 [Project Astra](https://deepmind.google/models/project-astra) 确立「通用 agent」研究愿景（实时多模态、主动响应、零延迟交互），OpenAI 以常驻式助理（每个 agent 实例配备专属云计算机）跟进，Meta、xAI 均有同位产品。真正的分水岭在于**信任与隐私**：持续感知意味着把数字生活交给厂商，谁先解决本地优先/数据主权，谁拿到大众市场。未来 6 个月看三件事：厂商如何处理记忆的跨设备同步与可迁移性、主动建议的「打扰感」调优、以及 agentic commerce 支付能力（见[支付协议](/frontier/protocols/payments)）的接入。

## 关键玩家

<ResourceGrid source="products" kind="personal" />

<ResourceGrid source="products" kind="browser" />

## 核心技术挑战

1. **主动时机的判断**：什么时候开口不打扰——需要用户状态建模，做错直接被卸载。
2. **长期记忆的隐私架构**：个人全量记忆存云端还是端侧，跨设备如何同步。
3. **跨应用行动能力**：个人 agent 要操作几十个彼此封闭的 app——MCP/computer-use 是两条路线。
4. **身份与授权**：agent 代你行动时，服务方如何验证「真的是你授权的」（OAuth for agents 尚无标准答案）。

## 时间线

<Timeline tag="product" />

## 站内深度解读

- [Computer Use 方向](/frontier/directions/computer-use)：personal agent 的「手」
- [记忆前沿](/frontier/directions/memory-frontier)：personal agent 的「脑」

## 外部资源

- [Project Astra 官方页](https://deepmind.google/models/project-astra/)
- [Anthropic: Building Effective Agents](https://www.anthropic.com/research/building-effective-agents)（个人 agent 的模式基础）
