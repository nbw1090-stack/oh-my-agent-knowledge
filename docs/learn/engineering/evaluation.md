---
title: 评测
tags: [engineering, evaluation, benchmark]
difficulty: 进阶
last-reviewed: 2026-11-23
---

<FreshnessBadge />

# 评测

## 一句话理解

Agent 评测 = 判断「它有没有把任务做成」，核心难题是答案不唯一、过程多步、环境有状态——所以从「对答案」进化到「查轨迹」和「让 agent 当裁判」。

## 为什么需要

Agent 是循环系统：一个小错误在后续步骤被放大，也可能被自我纠正掩盖。单看最终输出对不对既不充分（蒙对≠会做）也不必要（过程对但格式错）。没有评测的 agent 迭代 = 凭感觉调 prompt。

## 三个评测层次

1. **结果评测（Outcome）**：最终状态对不对。适合有明确交付物的任务（SWE-bench：测试通过了吗）。
2. **轨迹评测（Trajectory）**：中间步骤合不合理——有没有绕路、有没有调用不该调的工具、循环几次。依赖完整 trace（见[可观测性](/learn/engineering/observability)）。
3. **组件评测（Component）**：单测每个工具选择器、每个 sub-agent——上两层出问题时先定位是哪个组件的锅。

## 关键基准速览

| 基准 | 测什么 | 备注 |
| ---- | ------ | ---- |
| [SWE-bench](https://www.swebench.com)（/Verified） | 真实 GitHub issue 修复 | coding agent 标尺；注意刷榜与污染问题 |
| OSWorld | 真实 OS 环境的 GUI 操作 | computer-use 标尺 |
| AgentBench | 8 环境综合 agent 能力 | 综合面广 |
| MemoryAgentBench | 记忆四能力 | 记忆系统专用 |
| τ-bench / GAIA | 工具使用对话 / 通用助理 | 前者对真实业务 API，后者考常识性任务分解 |

**对公开榜单的正确态度**：看趋势别看绝对值。SWE-bench 已被证明可被 gaming（污染、过度拟合测试），自建领域评测集（哪怕只有 50 条真实 case）价值远高于刷公开榜。

## Agent-as-a-Judge

用 LLM/agent 给产出打分：给评委 rubric（评分维度+示例），让它像代码 reviewer 一样输出结构化评审。要点：评委与被评 agent 用不同模型、rubric 越具体越稳、抽样人工复核防止评委漂移。2026 年已有专门综述（见 `data/papers.yml`）。

## 自建评测的最小实践

```text
1. 从真实失败案例攒 case 库（每个 bug 修复后回填一条）
2. 每 case 定义：初始状态 / 任务 / 通过条件（可程序化判定的优先）
3. 跑批 → 记录通过率 + 失败 trace 归档
4. prompt/模型/工具任何改动 → 重跑 → 对比
```

## 我的实践笔记

- 通过条件能写成断言（测试通过、文件存在、API 返回码）就绝不让人工或 LLM 判断。
- 评测集是资产：它的版本要和代码一起管理，case 数量增长曲线比榜单分数更值得关注。

## 参考资料

- [A Survey on Evaluation of LLM-based Agents](https://arxiv.org/abs/2503.16416)（站内[解读笔记](/frontier/research/agent-eval-survey)）
- 站内：[可观测性](/learn/engineering/observability)（轨迹数据从哪来）
