# 跨境ERP系统 - 客户与售后 PRD

## 文档目录与关联文档

| 文档 | 职责 |
|------|------|
| 本文档 | 客户与售后模块的产品需求定义 |
| `prd-01-portal.md` | 系统门户（客户与售后入口） |
| `prd-02-dashboard.md` | 工作台首页（售后相关待办） |
| `prd-03-products.md` | 商品中心（引用商品与SKU数据） |
| `prd-04-orders.md` | 订单管理（引用销售订单数据） |
| `prd-05-inventory.md` | 库存管理（售后库存流转） |

## 背景与问题

客户与售后是跨境ERP的服务核心模块，涵盖客户管理、售后工单管理等业务。当前问题：售后工单仅依赖平台同步，缺乏统一管理；售后商品质检后库存流转不规范，合格品与不合格品处理混乱；客户信息分散，缺乏统一视图。

## 目标与成功标准

1. 建立客户信息统一管理，支持多平台客户数据整合
2. 实现售后工单平台同步，确保工单数据及时准确
3. 规范售后商品质检后库存流转（合格→实体仓/不合格→物损仓）
4. 建立售后工单全流程管理，从接收到处理完成

## 用户、角色与场景

| 角色 | 场景 |
|------|------|
| 客服人员 | 查看客户信息、处理售后工单 |
| 仓库人员 | 售后商品质检、库存流转 |
| 运营人员 | 查看售后数据、分析售后原因 |
| 管理员 | 配置售后规则、管理客户分组 |

## 范围

### 本次包含

- 客户列表页（客户信息管理、客户分组）
- 售后工单列表页（工单记录、工单状态）
- 售后工单详情页（工单详情、处理操作）
- 售后工单平台同步逻辑
- 售后商品质检后库存流转逻辑

### 不在本次范围

- 售后工单手工创建（仅支持平台同步）
- 退货物流管理（属于物流模块）
- 售后退款审批（属于财务模块）
- 客户投诉升级流程

## 用户故事

1. 作为客服人员，我希望查看客户完整信息，从而快速了解客户历史
2. 作为客服人员，我希望处理售后工单，从而及时解决客户问题
3. 作为仓库人员，我希望对售后商品进行质检，从而区分合格品与不合格品
4. 作为仓库人员，我希望质检后库存自动流转，从而确保库存数据准确
5. 作为运营人员，我希望查看售后数据统计，从而分析售后原因并改进

## 数据模型

### Customer（客户）

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| id | string | 是 | 客户ID |
| customerCode | string | 是 | 客户编码 |
| platform | string | 是 | 来源平台 |
| platformCustomerId | string | 是 | 平台客户ID |
| customerName | string | 是 | 客户名称 |
| email | string | 否 | 邮箱 |
| phone | string | 否 | 电话 |
| address | string | 否 | 地址 |
| country | string | 否 | 国家 |
| customerGroup | string | 否 | 客户分组 |
| totalOrders | number | 是 | 累计订单数 |
| totalAmount | number | 是 | 累计消费金额 |
| firstOrderDate | datetime | 否 | 首次下单时间 |
| lastOrderDate | datetime | 否 | 最近下单时间 |
| status | enum | 是 | 状态：active/inactive |
| createdAt | datetime | 是 | 创建时间 |
| updatedAt | datetime | 是 | 更新时间 |

### AfterSaleTicket（售后工单）

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| id | string | 是 | 工单ID |
| ticketCode | string | 是 | 工单编号 |
| platform | string | 是 | 来源平台 |
| platformTicketId | string | 是 | 平台工单ID |
| orderId | string | 是 | 关联订单ID |
| orderCode | string | 是 | 关联订单号 |
| customerId | string | 是 | 客户ID |
| customerName | string | 是 | 客户名称 |
| ticketType | enum | 是 | 工单类型：refund/exchange/return/repair/complaint |
| reason | string | 是 | 售后原因 |
| description | string | 否 | 问题描述 |
| status | enum | 是 | 状态：pending/processing/inspecting/completed/closed |
| priority | enum | 是 | 优先级：low/medium/high/urgent |
| items | AfterSaleItem[] | 是 | 售后商品明细 |
| resolution | string | 否 | 处理方案 |
| resolvedAt | datetime | 否 | 解决时间 |
| resolvedBy | string | 否 | 解决人 |
| syncStatus | enum | 是 | 同步状态：synced/failed/pending |
| lastSyncAt | datetime | 否 | 最后同步时间 |
| createdAt | datetime | 是 | 创建时间 |
| updatedAt | datetime | 是 | 更新时间 |

### AfterSaleItem（售后商品明细）

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| id | string | 是 | 明细ID |
| ticketId | string | 是 | 关联工单ID |
| skuId | string | 是 | SKU ID |
| skuCode | string | 是 | SKU编码 |
| productName | string | 是 | 商品名称 |
| quantity | number | 是 | 数量 |
| unitPrice | number | 是 | 单价 |
| amount | number | 是 | 金额 |
| inspectStatus | enum | 否 | 质检状态：pending/passed/failed |
| inspectResult | string | 否 | 质检结果 |
| inspectAt | datetime | 否 | 质检时间 |
| inspectedBy | string | 否 | 质检人 |
| inventoryFlow | enum | 否 | 库存流转：pending/to_warehouse/to_scrap |
| targetWarehouseId | string | 否 | 目标仓库ID（合格品） |
| scrapWarehouseId | string | 否 | 物损仓ID（不合格品） |

## 业务规则

| 编号 | 条件 | 动作 | 结果 |
|------|------|------|------|
| BR-01 | 平台售后工单同步 | 自动创建售后工单 | 工单状态为待处理 |
| BR-02 | 售后工单仅支持平台同步 | 阻止手工创建 | 提示「售后工单仅支持平台同步」 |
| BR-03 | 售后商品质检完成 | 触发库存流转 | 合格品→实体仓，不合格品→物损仓 |
| BR-04 | 质检状态为合格 | 入库到实体仓 | 库存增加，工单状态更新 |
| BR-05 | 质检状态为不合格 | 入库到物损仓 | 库存增加（物损仓），工单状态更新 |
| BR-06 | 工单类型为退货 | 需要质检 | 质检后决定库存流转 |
| BR-07 | 工单类型为换货 | 需要质检+重新发货 | 质检旧品+发出新品 |
| BR-08 | 工单优先级为紧急 | 优先处理 | 排队优先级提升 |
| BR-09 | 工单超过处理时限 | 触发预警 | 通知相关人员处理 |
| BR-10 | 平台同步失败 | 标记同步异常 | 记录失败原因，支持重试 |

## 状态、异常与边界

### 售后工单状态流转

```
待处理(pending) → [开始处理] → 处理中(processing) → [安排质检] → 质检中(inspecting) → [质检完成] → 已完成(completed) → [关闭] → 已关闭(closed)
待处理(pending) → [关闭] → 已关闭(closed)
处理中(processing) → [关闭] → 已关闭(closed)
```

### 库存流转状态

```
待流转(pending) → [质检完成] → 已流转(completed)
待流转(pending) → [质检完成] → 流转失败(failed) → [重试] → 已流转(completed)
```

### 异常处理

- 平台同步失败：记录失败原因，支持手动重试
- 质检结果异常：记录异常信息，支持人工复核
- 库存流转失败：记录失败原因，支持手动调整
- 工单处理超时：触发预警通知

### 边界情况

- 售后数量超过订单数量：阻止售后，提示数量不足
- 同一订单多个售后工单：允许，但需标记关联关系
- 质检结果为空：阻止库存流转，提示「请填写质检结果」
- 物损仓不存在：阻止流转，提示「请配置物损仓」
- 客户信息缺失：使用平台默认信息，标记待补充

## 字段、内容与交互要求

### 客户列表页

- 顶部：搜索框（客户名称/编码/平台客户ID）、筛选条件（平台/分组/状态）
- 列表：客户编码、客户名称、来源平台、累计订单数、累计消费金额、最近下单时间、状态、操作
- 操作区：新增客户、导入、导出
- 分页：支持每页10/20/50条

### 售后工单列表页

- 顶部：筛选条件（状态/工单类型/优先级/时间范围）
- 列表：工单编号、订单号、客户、工单类型、状态、优先级、创建时间、操作
- 操作区：导出、批量操作
- 汇总：总工单数、待处理数量、处理中数量

### 售后工单详情页

- 工单信息：工单编号、来源平台、关联订单、客户信息
- 售后商品：商品列表、数量、金额、质检状态
- 处理记录：处理时间线、处理人、处理结果
- 操作区：安排质检、填写处理方案、关闭工单

## 验收标准与来源追溯

- 产品验收：客户信息管理完整，售后工单同步正确，质检后库存流转正确
- 设计验收：界面布局合理，操作流程清晰
- 实现验收：平台同步逻辑正确，库存流转规则生效
- 来源追溯：PRD文档 §3.7 客户与售后

## 开放问题

- 平台售后工单同步的频率待确认
- 质检结果的分类标准待确认
- 物损仓的定义和使用场景待确认
- 售后工单处理时限的具体规则待确认
