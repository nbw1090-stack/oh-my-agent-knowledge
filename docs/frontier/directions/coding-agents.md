---
title: Coding Agents
status: active
last-reviewed: 2026-11-23
---

<FreshnessBadge />

# Coding Agents（编码智能体）

> **维护约定**：「现状速览」每季度重写一次；新事件只往「时间线」和 `data/events.yml` 里追加。

## 现状速览

Coding agent 是 agent 技术第一个完成生产验证的领域，也是**架构思想的输出源**——上下文工程、sub-agent、skills 扩展体系都从这里成熟再外溢。2026 年格局：终端三强 Claude Code / Codex / Gemini CLI 确立「CLI 优先 + MCP 扩展」范式，IDE 侧 Cursor 以 Agent 模式+Rules 体系领跑，开源侧 OpenCode/Aider/Goose 提供模型中立选项。竞争焦点已从「会不会改代码」转移到**扩展生态**：Anthropic 的 Agent Skills（SKILL.md）成为跨工具共享能力的开放格式，1000+ skills 的合集与插件市集意味着「agent 的能力」第一次可以像 npm 包一样分发。未来 6 个月看：skills/plugins 的跨宿主兼容（同一 skill 在 Claude Code/Codex/Cursor 通用）、异步云端 agent（Devin 模式）能否进入主流团队工作流、以及 SWE-bench 之外的评测如何抗污染。

## 关键玩家

<ResourceGrid source="products" kind="coding-agent" />

扩展生态（详见[生态-扩展](/ecosystem/extensions)）：

<ResourceGrid source="extensions" kind="skill" />

## 核心技术挑战

1. **上下文预算**：大仓库远超窗口——检索增强、repo map、按需读文件是标配（见[上下文工程](/learn/foundations/context-engineering)）。
2. **沙箱与权限**：agent 执行任意代码的风险——Docker/虚拟机隔离 + 命令白名单是底线（见[安全](/learn/engineering/security)）。
3. **长任务的可靠性**：多文件修改的中间态管理、测试反馈循环、失败恢复。
4. **评测真实性**：SWE-bench 类基准的污染与 gaming 问题（见[评测](/learn/engineering/evaluation)）。

## 时间线

<Timeline tag="coding" />

## 站内深度解读

- [Skills / Plugins / Prompts 生态](/ecosystem/extensions)
- [工具使用](/learn/foundations/tool-use)：MCP 如何进入编码工具链

## 外部资源

- [Claude Code 最佳实践](https://www.anthropic.com/engineering/claude-code-best-practices)
- [28+ 编码工具真实 system prompt 合集](https://github.com/x1xhlol/system-prompts-and-models-of-ai-tools)（研究生产级编码 agent 设计的第一素材）
