---
title: 工具使用
tags: [foundations, tool-use]
difficulty: 入门
last-reviewed: 2026-11-23
---

<FreshnessBadge />

# 工具使用

## 一句话理解

工具使用 = 给 LLM 一份「带说明书的 API 清单」，模型输出结构化调用请求，由运行时代替执行并把结果喂回来——这是 agent 一切行动能力的接口层。

## 为什么需要

LLM 本体只能生成文本：不知道当前时间、不能查库、不能发邮件。函数调用（Function Calling）机制让模型可以「请求」执行外部函数，把语言能力嫁接到真实系统上。而 2024 年后 MCP 把「模型 ↔ 工具」的连接标准化，工具从「每个应用自己写一遍」进化为「即插即用」。

## 机制拆解

```python
# 1. 声明工具（模型只看得见这份 schema）
tools = [{
    "name": "get_weather",
    "description": "查询指定城市当前天气",
    "parameters": {
        "type": "object",
        "properties": {"city": {"type": "string", "description": "城市名，如「上海」"}},
        "required": ["city"],
    },
}]

# 2. 模型决定调用（输出的是结构化请求，不是文本）
#    → {"name": "get_weather", "arguments": {"city": "上海"}}

# 3. 你的代码执行真正的函数，把结果作为 tool 角色消息回传
# 4. 模型基于结果继续（生成答案或发起下一次调用）
```

关键认知：**模型从不执行任何东西，它只是「点名」**。执行、鉴权、沙箱全在你的运行时里——这也是 agent 安全设计的根基。

## 工具设计五原则

1. **描述写给模型看**：说明「什么时候该用我、什么时候不该」，比给人看的 API 文档更啰嗦一点反而好。
2. **参数用受控词表**：enum 优于自由字符串，能枚举就枚举。
3. **返回要省 token 且信息完整**：给 `id` 而非全量对象；报错信息要能让模型自我纠正（「city 参数应为拼音」比「参数错误」好得多）。
4. **控制工具数量**：单 agent 挂 20+ 工具选择准确率显著下降；工具多用分组路由或 sub-agent 分管。
5. **幂等与确认分离**：读操作幂等随便调；写/删操作要求模型先调用 `plan` 类工具或走 human-in-the-loop。

## 从 Function Calling 到 MCP

| 阶段 | 方式 | 问题 |
| ---- | ---- | ---- |
| 手写时代 | 每个应用为每个模型写一遍工具胶水 | N×M 重复劳动 |
| Function Calling | 模型 API 原生支持结构化调用 | 仍是应用私有工具 |
| **MCP** | 工具做成独立 server，任何宿主（Claude Code/Cursor/Codex…）即插即用 | 标准化了「工具分发」 |

MCP 的协议细节见 [MCP 协议页](/frontier/protocols/mcp)；精选 server 目录见[生态-扩展](/ecosystem/extensions)。

## 我的实践笔记

- 工具描述是 prompt 工程里 ROI 最高的部分，改一句话可能直接决定 agent 走不走弯路。
- 永远给工具调用加超时和重试上限，模型会陷入「反复调用失败工具」的循环。

## 参考资料

- [OpenAI Function Calling 文档](https://platform.openai.com/docs/guides/function-calling)
- [Anthropic: Tool Use](https://docs.claude.com/en/docs/agents-and-tools/tool-use/overview)
- 站内：[MCP 协议](/frontier/protocols/mcp)
