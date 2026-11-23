---
title: Computer Use
status: active
last-reviewed: 2026-11-23
---

<FreshnessBadge />

# Computer Use（计算机操作智能体）

> **维护约定**：「现状速览」每季度重写一次；新事件只往「时间线」和 `data/events.yml` 里追加。

## 现状速览

Computer use agent（CUA）让 AI 直接操作图形界面——截屏看、移动鼠标点、敲键盘输入，分 OS 级（控制整个桌面）与浏览器级（只操作网页）两层。2025 年 OpenAI Operator 与 Anthropic Computer Use 产品化后，2026 年生态快速扩张（20+ 工具、API 普及、多模态视觉定位能力持续提升），OSWorld 成为标准评测。浏览器级（browser-use 等）已足够成熟可用于生产自动化；OS 级仍以「人在旁边看」的半自动为主。核心矛盾：**通用性 vs 安全**——CUA 能操作一切意味着没有 API 级权限边界，间接注入通过屏幕内容直达模型。未来 6 个月看：OSWorld 分数逼近人类水平后的商业化拐点、企业 RPA 替代潮、以及专用 CUA 模型 vs 通用模型+视觉 grounding 的路线胜负。

## 关键玩家

<ResourceGrid source="products" kind="browser" />

框架侧见 [browser-use（生态-框架）](/ecosystem/frameworks)。

## 核心技术挑战

1. **视觉 grounding 精度**：小图标、动态加载、滚动后元素定位的错误率直接决定任务成功率。
2. **速度与成本**：每步一次截屏+推理，长任务慢且贵；元素树（a11y tree）与截屏混合方案是优化方向。
3. **安全边界**：GUI 层没有 API 权限模型——注入攻击面最大（见[安全](/learn/engineering/security)）。
4. **反自动化对抗**：验证码、行为检测、动态 DOM 都是真实部署的日常阻力。

## 时间线

<Timeline tag="computer-use" />

## 站内深度解读

- [Personal Agents](/frontier/directions/personal-agents)：CUA 是个人助理的「手」
- [工具使用](/learn/foundations/tool-use)：API 路线 vs GUI 路线的对比

## 外部资源

- [OpenAI: Introducing Operator](https://openai.com/index/introducing-operator/)
- [Claude Computer Use 文档](https://docs.claude.com/en/docs/agents-and-tools/computer-use-tool)
- [Computer-Use AI Agents in 2026（Turing Post）](https://www.turingpost.com/p/computer-use-ai-agents)
