---
title: AGNTCY
tags: [protocols, multi-agent, infrastructure]
status: active
last-reviewed: 2026-11-23
---

<FreshnessBadge />

# AGNTCY（Internet of Agents 基础设施）

## 一句话理解

AGNTCY 是 Cisco 2025-03 开源、后捐给 Linux 基金会的开源集合，目标是给多 agent 互联网补上**发现、信任与跨平台编排**三层基础设施——「agent 世界的 DNS + 公证处 + 调度器」。

## 解决什么问题

A2A 让两个 agent 「能对话」，但互联网级协作还缺：我怎么**找到**合适的外部 agent（发现）？怎么知道它声称的能力是真的（信任验证）？怎么把多个组织的 agent 编排成跨域工作流（编排）？AGNTCY 补的就是这些。

## 组件地图

| 组件 | 职责 | 类比 |
| ---- | ---- | ---- |
| Agent Directory | agent 注册/发现/能力检索 | DNS + 服务目录 |
| Agent Identity / Trust Fabric | 身份与能力验证 | 公钥基础设施 |
| Workflow Orchestration SDK | 跨平台 agent 工作流编排 | 分布式调度器 |
| Observability | 跨 agent 追踪标准 | 全链路 trace |

采用：Cisco、Google Cloud、Red Hat、Oracle、Dell 等为创始成员，2026 年已 75+ 组织参与。

## 与 A2A/MCP 的关系

三者互补成栈：**MCP**（agent↔工具）→ **A2A**（agent↔agent 通信）→ **AGNTCY**（agent 群的发现/信任/编排）。选型时把 AGNTCY 视为「企业级多 agent 互联的可选基础设施层」，小规模内部多 agent 用框架自带编排即可。

## 时间线

<Timeline tag="protocols" />

## 站内关联

- [多智能体系统方向](/frontier/directions/multi-agent) ｜ [A2A](/frontier/protocols/a2a)

## 参考资料

- [AGNTCY GitHub](https://github.com/agntcy)
- [Linux 基金会公告](https://www.linuxfoundation.org/press/linux-foundation-welcomes-the-agntcy-project-to-standardize-open-multi-agent-system-infrastructure-and-break-down-ai-agent-silos/)
