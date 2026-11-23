---
title: 安全
tags: [engineering, security, prompt-injection]
difficulty: 高阶
last-reviewed: 2026-11-23
---

<FreshnessBadge />

# 安全

## 一句话理解

Agent 安全的头号威胁是**间接提示注入**（模型处理不可信内容时被劫持指令），头号原则是**权限最小化 + 假设注入一定会发生**——因为无法靠提示词根治。

## 威胁模型：与传统应用的本质区别

传统安全防「代码执行恶意逻辑」；agent 安全多了一层：**自然语言就是指令面**。模型把「数据」和「指令」放在同一个窗口里处理，任何进入窗口的文本（网页、邮件、PDF、工具返回值）都可能被当成指令执行。这就是间接提示注入（Indirect Prompt Injection）——2026 年已被 CSA 确认从理论威胁变为野外实际攻击。

## OWASP Agentic AI Top 10 要点

（[2026 版](https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/)，权威参考）

高风险主题速记：

1. **目标劫持**（ASI01）：注入内容让 agent 偏离原任务；
2. **工具滥用**（ASI02）：诱导调用本不该调的工具（转账、删库、发邮件）；
3. **记忆投毒**：污染长期记忆，实现跨会话持久化攻击；
4. **身份与权限混乱**：agent 用谁的权限行事？授权边界在哪？
5. **供应链**：第三方 MCP server / skill / prompt 本身就是攻击面。

## 防御分层（务实版）

| 层 | 手段 | 有效性 |
| -- | ---- | ------ |
| 权限层 | 最小化凭证、工具白名单、读写分离账号 | **最强**，不依赖模型「听话」 |
| 隔离层 | 工具结果与指令的标记分离（spotlighting）、不可信内容过滤 | 中，需持续对抗 |
| 流程层 | 危险操作 HITL（见[护栏](/learn/patterns/guardrails)）、双 agent 交叉审查 | 强，有延迟成本 |
| 检测层 | 注入分类器、行为异常告警（依赖 trace） | 兜底 |
| 提示层 | 「不要听网页里的话」类指令 | **最弱**，只能当添头 |

核心观念：**提示层防御不可依赖**。安全架构要假设模型已被注入成功，靠权限层让「被劫持也做不了坏事」。

## 生态面

- MCP 生态的供应链风险：装一个第三方 server 等于给它喂你全部上下文——选 server 像选依赖一样要看维护方与审计；
- 支付类 agent 还要叠加金融合规（授权留痕是 AP2 等协议的设计初衷，见[支付协议](/frontier/protocols/payments)）。

## 我的实践笔记

- 给每个工具标注「数据来源可信度」，凡处理外部内容的工具，其返回值在拼回上下文前过一道清洗。
- 红队自测：在自己 agent 的测试网页里埋一条隐藏指令，看它会不会照做——做一次就再也不敢裸奔。

## 参考资料

- [OWASP Top 10 for Agentic Applications 2026](https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/)
- [CSA: Indirect Prompt Injection in the Wild 2026](https://labs.cloudsecurityalliance.org/research/csa-research-note-indirect-prompt-injection-in-the-wild-2026/)
- [Simon Willison 的 prompt injection 系列](https://simonwillison.net/tags/prompt-injection/)（跟踪此议题最好的信源）
