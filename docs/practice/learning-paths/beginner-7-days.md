---
title: 七天入门路径
tags: [learning-path, beginner]
last-reviewed: 2026-11-23
---

<FreshnessBadge />

# 七天入门路径

目标：一周建立 agent 的**完整心智模型**，并能动手跑起第一个 agent。每天 1~2 小时。

| 天 | 主题 | 读什么 / 做什么 | 产出检验 |
| -- | ---- | --------------- | -------- |
| 1 | 概念地基 | [什么是 Agent](/learn/foundations/what-is-agent) + [Anthropic: Building Effective Agents](https://www.anthropic.com/research/building-effective-agents) | 能向别人讲清 agent 和 workflow 的区别 |
| 2 | 循环与推理 | [推理与规划](/learn/foundations/reasoning)（重点 ReAct） | 手写 50 行最小 agent loop（见文中代码） |
| 3 | 工具 | [工具使用](/learn/foundations/tool-use) + 给昨天的 loop 加 2 个工具 | 让 agent 完成一个「查天气再算穿衣建议」任务 |
| 4 | 记忆与上下文 | [记忆机制](/learn/foundations/memory) + [上下文工程](/learn/foundations/context-engineering) | 给 agent 加会话摘要记忆 |
| 5 | 上框架 | 装一个框架（推荐 OpenAI Agents SDK 或 LangGraph）重写第 3 天的 agent | 理解框架帮你做了什么（循环/状态/重试） |
| 6 | 编码智能体体验 | 装 Claude Code 或 Gemini CLI，用 [Skills](/ecosystem/extensions) 完成一个真实小任务 | 体会生产级 agent 的上下文管理 |
| 7 | 建全局观 | [前沿方向总览](/frontier/_overview) + [MCP](/frontier/protocols/mcp) | 写一篇自己的「agent 全景笔记」 |

## 三个忠告

1. **每天都要写代码**，只读不写一周后全忘；
2. 别急着学多智能体——单 agent 循环 + 工具 + 记忆才是地基；
3. 遇到 agent 行为诡异，先 dump 上下文看一眼（第一课：问题多半在窗口里）。

完成后的进阶路线：[构建者进阶路线](/practice/learning-paths/builder-roadmap)。
