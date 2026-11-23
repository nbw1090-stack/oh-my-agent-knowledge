---
title: Agent 支付协议
tags: [protocols, commerce, payments]
status: active
last-reviewed: 2026-11-23
---

<FreshnessBadge />

# Agent 支付协议（AP2 / ACP / x402 / 卡组织方案）

## 一句话理解

Agent 替人付款需要一套新的信任基础设施——2025-2026 年密集立项的支付协议各管一段：**AP2 管授权留痕，ACP 管结账流程，x402/MPP 管资金搬运，Visa TAP/Mastercard Agent Pay 走卡组织轨道**。

## 为什么需要

现有支付体系假设「付款的是持有凭证的人」。agent 付款带来全新问题：授权如何证明（用户真的同意了吗）、身份如何锚定（agent 没有卡也没有指纹）、责任如何划分（agent 买错了算谁的）。没有这些，商家不敢收、用户不敢用。

## 协议对比

| 协议 | 发起方 | 管哪一段 | 机制要点 |
| ---- | ------ | -------- | -------- |
| **AP2**（Agent Payments Protocol） | Google Cloud + 支付公司（2025-09） | 授权与问责 | 记录用户对 agent 交易的同意，加密留痕可审计 |
| **ACP**（Agentic Commerce Protocol） | OpenAI + Stripe | 结账流程 | 标准化 agent 与商家的下单/支付会话，动态支付凭证 |
| **x402** | 加密社区 | 资金搬运 | HTTP 402 状态码复活：机器间稳定币微支付，agent 互付场景 |
| **Visa TAP / Mastercard Agent Pay** | 卡组织 | 卡轨道 | 把 agent 交易映射进现有清算网络，凭证代管 |

分工记忆法：**AP2 记同意，ACP 跑结账，x402 搬小钱，卡组织走大轨道。**

## 采用与走势

Salesforce、Shopify、Etsy 等已支持；2026-01 Google 发布零售商侧工具，11 月 PayPal 全面接入。判断：短期多协议并存（商家多签几个），长期看卡组织方案凭借存量网络优势和加密轨道的微支付场景各占生态位。

## 站内关联

- [Agentic Commerce 方向](/frontier/directions/agentic-commerce)
- [安全](/learn/engineering/security)：授权凭证是支付安全的密码学核心

## 参考资料

- [AP2 协议官网](https://ap2-protocol.org/)
- [Google Cloud 发布公告](https://cloud.google.com/blog/products/ai-machine-learning/announcing-agents-to-payments-ap2-protocol)
