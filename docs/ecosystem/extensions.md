---
title: Skills / Plugins / Prompts / Rules / MCP
tags: [ecosystem, extensions, skills, plugins]
last-reviewed: 2026-11-23
---

<FreshnessBadge />

# 扩展生态：Skills / Plugins / Prompts / Rules / MCP / 模板

Agent 的「能力件」共享生态——2025 年底 Agent Skills（SKILL.md）规范发布后，**能力第一次像 npm 包一样跨工具分发**（同一 skill 可在 Claude Code / Codex / Gemini CLI / Cursor 使用）。

数据来源：`data/extensions.yml`，按 kind 筛选：

## Skills（技能包）

<ResourceGrid source="extensions" kind="skill" />

## Plugins / 市集

<ResourceGrid source="extensions" kind="plugin" />

## MCP Servers（工具扩展）

<ResourceGrid source="extensions" kind="mcp" />

## Rules / Prompts（规则与提示词）

<ResourceGrid source="extensions" kind="rule" />

<ResourceGrid source="extensions" kind="prompt" />

## 工作流模板

<ResourceGrid source="extensions" kind="template" />

> SKILL.md 规范要点：一个文件夹 + 指令（SKILL.md）+ 可选脚本/资源，宿主在任务相关时才加载——本质是「程序记忆」的文件化（见[记忆机制](/learn/foundations/memory)）。
