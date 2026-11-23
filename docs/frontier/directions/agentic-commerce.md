---
title: Agentic Commerce
status: active
last-reviewed: 2026-11-23
---

<FreshnessBadge />

# Agentic Commerce（智能体商务）

> **维护约定**：「现状速览」每季度重写一次；新事件只往「时间线」和 `data/events.yml` 里追加。

## 现状速览

当 agent 开始替用户购物和付款，商务的基础设施被重写。2025-2026 协议层经历爆发式立项，目前分工渐明：**AP2 记录授权与同意，ACP 跑结账流程，x402/MPP 负责搬钱，Visa TAP / Mastercard Agent Pay 走卡组织轨道**。生态位上，Google（AP2，2025-09 联合支付公司发布）、OpenAI+Stripe（ACP）各拉一票阵营，Salesforce/Shopify/Etsy 已表态支持，2026-01 Google 推出零售商侧工具、11 月 PayPal 全面接入——从协议到商用只用了 14 个月。竞争的本质是**信任中介之争**：用户敢让 agent 代付，靠的是授权留痕与问责框架。未来 6 个月看：协议收敛还是继续碎片化、agent 专属支付身份（设备/密钥绑定）标准、以及「agent 比价 → 直接下单」对电商 SEO/广告模式的二次冲击。

## 关键玩家

<ResourceGrid source="products" kind="personal" />

（支付基础设施方多为金融机构，暂无公开产品页的先不收录；协议细节见[支付协议页](/frontier/protocols/payments)。）

## 核心技术挑战

1. **授权与问责**：一笔交易是「用户授权的」还是「agent 被劫持后干的」——密码学留痕是刚需。
2. **身份认证**：agent 没有指纹没有卡——设备密钥/委托凭证体系待成熟。
3. **争议处理**：agent 买错了，退款责任在用户、商家还是 agent 提供方？
4. **微小额结算**：agent 间高频微交易需要极低费率轨道（x402 的稳定币路线瞄准此处）。

## 时间线

<Timeline tag="commerce" />

## 站内深度解读

- [Agent 支付协议](/frontier/protocols/payments)：AP2 / ACP / x402 / 卡组织方案对比
- [安全](/learn/engineering/security)：支付是安全要求最严的 agent 场景

## 外部资源

- [AP2 协议官网](https://ap2-protocol.org/)
- [Google Cloud: Announcing AP2](https://cloud.google.com/blog/products/ai-machine-learning/announcing-agents-to-payments-ap2-protocol)
- [Google: Agentic commerce 工具发布](https://blog.google/products/ads-commerce/agentic-commerce-ai-tools-protocol-retailers-platforms/)
