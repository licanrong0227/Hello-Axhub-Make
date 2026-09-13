# 跨境ERP系统 - 仓储与物流 PRD

## 文档目录与关联文档

| 文档 | 职责 |
|------|------|
| 本文档 | 仓储与物流模块的产品需求定义 |
| `prd-01-portal.md` | 系统门户（仓储与物流入口） |
| `prd-02-dashboard.md` | 工作台首页（物流相关待办） |
| `prd-03-products.md` | 商品中心（引用商品与SKU数据、重量信息） |
| `prd-04-orders.md` | 订单管理（引用销售订单生成出库单） |
| `prd-05-inventory.md` | 库存管理（出库扣减、入库增加库存） |
| `prd-06-procurement.md` | 采购管理（采购入库单关联） |

## 背景与问题

仓储与物流是跨境ERP的履约核心模块，涵盖销售出库、采购入库、物流商管理、物流渠道配置、报关单生成等业务。当前问题：运费计算依赖人工查询报价，效率低且易出错；海外仓下发与回传字段不规范，导致信息断层；出库后库存扣减时机不统一，存在超发风险；报关单信息手工录入，合规风险高。

## 目标与成功标准

1. 实现运费自动计算，基于重量×报价公式，减少人工干预
2. 建立物流商与物流渠道管理体系，支持多物流商报价对比
3. 规范海外仓下发/回传字段，确保信息流完整
4. 出库后正式扣减库存，保证库存数据准确性
5. 实现报关单自动生成，降低合规风险

## 用户、角色与场景

| 角色 | 场景 |
|------|------|
| 仓库人员 | 销售出库操作、采购入库操作、查看物流状态 |
| 物流人员 | 管理物流商信息、配置物流渠道、跟踪物流轨迹 |
| 运营人员 | 查看物流费用、对比物流渠道成本 |
| 报关人员 | 生成报关单、查看报关状态 |
| 财务人员 | 核对物流费用、查看物流成本 |

## 范围

### 本次包含

- 销售出库单列表页（出库记录、出库状态、物流信息）
- 采购入库单列表页（入库记录、入库状态、验收情况）
- 物流商列表页（物流商信息管理、报价管理）
- 物流渠道配置页（物流渠道规则、报价配置）
- 报关单生成页（自动填充报关信息、提交报关）
- 运费自动计算逻辑（重量×报价）
- 海外仓下发/回传字段定义
- 出库后正式扣减库存

### 不在本次范围

- 物流轨迹实时追踪（对接第三方物流API）
- 关税计算与缴纳
- 退货物流管理
- 物流保险管理

## 用户故事

1. 作为仓库人员，我希望系统根据订单商品重量自动计算运费，从而快速选择物流渠道
2. 作为仓库人员，我希望在出库后系统自动扣减库存，从而避免超发
3. 作为物流人员，我希望管理物流商信息和报价，从而优化物流成本
4. 作为物流人员，我希望配置不同物流渠道的规则，从而满足不同场景需求
5. 作为报关人员，我希望系统自动生成报关单，从而减少手工录入错误
6. 作为运营人员，我希望对比不同物流渠道的费用，从而选择最优方案

## 数据模型

### OutboundOrder（销售出库单）

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| id | string | 是 | 出库单ID |
| outboundCode | string | 是 | 出库单编号 |
| salesOrderId | string | 是 | 关联销售订单ID |
| salesOrderCode | string | 是 | 关联销售订单号 |
| warehouseId | string | 是 | 出库仓库ID |
| warehouseName | string | 是 | 出库仓库名称 |
| customerName | string | 是 | 客户名称 |
| shippingAddress | string | 是 | 收货地址 |
| country | string | 是 | 目的国家 |
| status | enum | 是 | 状态：pending/picking/packing/shipped/completed/cancelled |
| items | OutboundOrderItem[] | 是 | 出库明细 |
| totalWeight | number | 是 | 总重量（kg） |
| totalVolume | number | 否 | 总体积（m³） |
| logisticsProviderId | string | 否 | 物流商ID |
| logisticsProviderName | string | 否 | 物流商名称 |
| logisticsChannelId | string | 否 | 物流渠道ID |
| logisticsChannelName | string | 否 | 物流渠道名称 |
| shippingFee | number | 否 | 运费 |
| trackingNo | string | 否 | 物流单号 |
| customsDeclarationId | string | 否 | 报关单ID |
| shippedAt | datetime | 否 | 发货时间 |
| completedAt | datetime | 否 | 完成时间 |
| createdBy | string | 是 | 创建人 |
| createdAt | datetime | 是 | 创建时间 |
| updatedAt | datetime | 是 | 更新时间 |

### OutboundOrderItem（出库明细）

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| id | string | 是 | 明细ID |
| outboundOrderId | string | 是 | 关联出库单ID |
| skuId | string | 是 | SKU ID |
| skuCode | string | 是 | SKU编码 |
| productName | string | 是 | 商品名称 |
| quantity | number | 是 | 出库数量 |
| unitWeight | number | 是 | 单件重量（kg） |
| unitVolume | number | 否 | 单件体积（m³） |
| unitPrice | number | 是 | 单价 |
| totalPrice | number | 是 | 小计金额 |
| pickedQuantity | number | 否 | 已拣货数量 |
| packedQuantity | number | 否 | 已打包数量 |

### InboundOrder（采购入库单）

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| id | string | 是 | 入库单ID |
| inboundCode | string | 是 | 入库单编号 |
| purchaseOrderId | string | 是 | 关联采购订单ID |
| purchaseOrderCode | string | 是 | 关联采购订单号 |
| supplierId | string | 是 | 供应商ID |
| supplierName | string | 是 | 供应商名称 |
| warehouseId | string | 是 | 入库仓库ID |
| warehouseName | string | 是 | 入库仓库名称 |
| status | enum | 是 | 状态：pending/receiving/inspection/completed/cancelled |
| items | InboundOrderItem[] | 是 | 入库明细 |
| totalQuantity | number | 是 | 总入库数量 |
| qualifiedQuantity | number | 否 | 合格数量 |
| defectiveQuantity | number | 否 | 不合格数量 |
| inspectionStatus | enum | 否 | 质检状态：pending/passed/failed/partial |
| receivedAt | datetime | 否 | 收货时间 |
| completedAt | datetime | 否 | 完成时间 |
| createdBy | string | 是 | 创建人 |
| createdAt | datetime | 是 | 创建时间 |
| updatedAt | datetime | 是 | 更新时间 |

### InboundOrderItem（入库明细）

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| id | string | 是 | 明细ID |
| inboundOrderId | string | 是 | 关联入库单ID |
| skuId | string | 是 | SKU ID |
| skuCode | string | 是 | SKU编码 |
| productName | string | 是 | 商品名称 |
| expectedQuantity | number | 是 | 预期入库数量 |
| actualQuantity | number | 否 | 实际入库数量 |
| qualifiedQuantity | number | 否 | 合格数量 |
| defectiveQuantity | number | 否 | 不合格数量 |
| unitPrice | number | 是 | 单价 |
| totalPrice | number | 是 | 小计金额 |
| inspectionNote | string | 否 | 质检备注 |

### LogisticsProvider（物流商）

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| id | string | 是 | 物流商ID |
| code | string | 是 | 物流商编码 |
| name | string | 是 | 物流商名称 |
| contactPerson | string | 是 | 联系人 |
| contactPhone | string | 是 | 联系电话 |
| contactEmail | string | 否 | 联系邮箱 |
| apiEndpoint | string | 否 | API接口地址 |
| api_key | string | 否 | API密钥 |
| supportedCountries | string[] | 否 | 支持的国家/地区 |
| supportedChannels | LogisticsChannel[] | 否 | 支持的物流渠道 |
| rating | number | 否 | 服务评分（1-5） |
| status | enum | 是 | 状态：active/inactive |
| createdAt | datetime | 是 | 创建时间 |
| updatedAt | datetime | 是 | 更新时间 |

### LogisticsChannel（物流渠道）

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| id | string | 是 | 物流渠道ID |
| providerId | string | 是 | 关联物流商ID |
| providerName | string | 是 | 物流商名称 |
| channelCode | string | 是 | 渠道编码 |
| channelName | string | 是 | 渠道名称 |
| channelType | enum | 是 | 渠道类型：standard/express/economy/special |
| supportedCountries | string[] | 是 | 支持的国家/地区 |
| minWeight | number | 否 | 最小重量限制（kg） |
| maxWeight | number | 否 | 最大重量限制（kg） |
| pricingMethod | enum | 是 | 计价方式：weight/volume/actual |
| basePrice | number | 是 | 基础报价（元/kg） |
| priceTiers | PriceTier[] | 否 | 阶梯报价 |
| estimatedDays | number | 否 | 预计时效（天） |
| status | enum | 是 | 状态：active/inactive |
| createdAt | datetime | 是 | 创建时间 |
| updatedAt | datetime | 是 | 更新时间 |

### PriceTier（价格阶梯）

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| id | string | 是 | 阶梯ID |
| channelId | string | 是 | 关联渠道ID |
| minWeight | number | 是 | 最小重量（kg） |
| maxWeight | number | 是 | 最大重量（kg） |
| unitPrice | number | 是 | 单价（元/kg） |

### CustomsDeclaration（报关单）

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| id | string | 是 | 报关单ID |
| declarationCode | string | 是 | 报关单编号 |
| outboundOrderId | string | 是 | 关联出库单ID |
| outboundOrderCode | string | 是 | 关联出库单号 |
| declarationType | enum | 是 | 报关类型：export/import |
| country | string | 是 | 目的国家 |
| totalAmount | number | 是 | 报关总金额 |
| currency | string | 是 | 币种 |
| items | CustomsDeclarationItem[] | 是 | 报关明细 |
| declaredAt | datetime | 否 | 申报时间 |
| status | enum | 是 | 状态：draft/submitted/approved/rejected/completed |
| declarationNo | string | 否 | 海关编号 |
| remarks | string | 否 | 备注 |
| createdBy | string | 是 | 创建人 |
| createdAt | datetime | 是 | 创建时间 |
| updatedAt | datetime | 是 | 更新时间 |

### CustomsDeclarationItem（报关明细）

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| id | string | 是 | 明细ID |
| declarationId | string | 是 | 关联报关单ID |
| skuId | string | 是 | SKU ID |
| skuCode | string | 是 | SKU编码 |
| productName | string | 是 | 商品名称 |
| hsCode | string | 否 | 海关编码 |
| quantity | number | 是 | 数量 |
| unitPrice | number | 是 | 单价 |
| totalPrice | number | 是 | 小计金额 |
| weight | number | 是 | 重量（kg） |
| countryOfOrigin | string | 否 | 原产国 |

## 业务规则

| 编号 | 条件 | 动作 | 结果 |
|------|------|------|------|
| BR-01 | 计算运费 | 运费=重量×报价 | 自动填充运费金额 |
| BR-02 | 重量超过渠道最大限制 | 阻止选择该渠道 | 提示「重量超出渠道限制」 |
| BR-03 | 存在阶梯报价 | 按阶梯计算运费 | 使用对应阶梯的单价计算 |
| BR-04 | 出库单状态变为已发货 | 扣减库存 | 正式扣减对应SKU库存 |
| BR-05 | 海外仓下发 | 按规范字段下发 | 包含订单号、商品、数量、重量、收货信息 |
| BR-06 | 海外仓回传 | 按规范字段回传 | 包含物流单号、发货时间、物流状态 |
| BR-07 | 采购入库质检完成 | 更新库存 | 合格品入库增加库存，不合格品进入待处理 |
| BR-08 | 报关单自动生成 | 填充报关信息 | 从出库单提取商品、金额、重量等信息 |
| BR-09 | 同一订单多个物流渠道 | 按渠道分别计算 | 每个渠道独立计算运费 |
| BR-10 | 运费为0或负数 | 阻止提交 | 提示「运费计算异常，请检查报价配置」 |

## 状态、异常与边界

### 销售出库单状态流转

```
待处理(pending) → [开始拣货] → 拣货中(picking) → [拣货完成] → 打包中(packing) → [打包完成] → 已发货(shipped) → [签收] → 已完成(completed)
待处理(pending) → [取消] → 已取消(cancelled)
拣货中(picking) → [取消] → 已取消(cancelled)
打包中(packing) → [取消] → 已取消(cancelled)
```

### 采购入库单状态流转

```
待处理(pending) → [开始收货] → 收货中(receiving) → [收货完成] → 质检中(inspection) → [质检完成] → 已完成(completed)
待处理(pending) → [取消] → 已取消(cancelled)
质检中(inspection) → [取消] → 已取消(cancelled)
```

### 报关单状态流转

```
草稿(draft) → [提交] → 已提交(submitted) → [审核] → 已通过(approved) → [完成] → 已完成(completed)
草稿(draft) → [提交] → 已提交(submitted) → [审核] → 已拒绝(rejected) → [重新提交] → 已提交(submitted)
```

### 异常处理

- 运费计算失败：记录失败原因，支持手动输入运费
- 海外仓下发失败：记录失败原因，支持重试
- 海外仓回传字段缺失：记录缺失字段，标记异常
- 报关单审核拒绝：记录拒绝原因，支持修改后重新提交
- 出库后库存不足：阻止发货，提示库存不足

### 边界情况

- 运费为0：允许免费配送渠道
- 重量为0：阻止计算运费，提示「请填写商品重量」
- 报关金额为0：阻止提交，提示「报关金额不能为0」
- 同一商品多个SKU：按SKU分别计算重量和运费
- 物流商被禁用：阻止选择该物流商

## 字段、内容与交互要求

### 销售出库单列表页

- 顶部：搜索框（出库单号/订单号）、筛选条件（状态/物流商/时间范围）
- 列表：出库单号、订单号、客户、目的国家、物流渠道、运费、状态、发货时间、操作
- 操作区：新增出库单、导出、批量操作
- 汇总：总出库单数、待发货数量、已发货数量

### 采购入库单列表页

- 顶部：搜索框（入库单号/采购订单号）、筛选条件（状态/供应商/时间范围）
- 列表：入库单号、采购订单号、供应商、入库数量、质检状态、状态、操作
- 操作区：新增入库单、导出
- 汇总：总入库单数、待质检数量、已入库数量

### 物流商列表页

- 顶部：搜索框（物流商名称/编码）、筛选条件（状态/评分）
- 列表：物流商名称、联系人、电话、评分、支持渠道数、状态、操作
- 操作区：新增物流商
- 分页：支持每页10/20/50条

### 物流渠道配置页

- 物流商选择：下拉选择物流商
- 渠道列表：渠道名称、渠道类型、支持国家、报价、时效、状态
- 报价配置：基础报价、阶梯报价设置
- 操作：新增渠道、编辑报价、启用/禁用渠道

### 报关单生成页

- 出库单选择：下拉选择出库单
- 报关信息：自动填充商品、金额、重量
- 报关明细：商品名称、HS编码、数量、单价、重量
- 操作：保存草稿、提交报关

## 验收标准与来源追溯

- 产品验收：运费自动计算正确，出库后库存扣减正确，报关单生成完整
- 设计验收：界面布局合理，操作流程清晰
- 实现验收：海外仓下发/回传字段规范，阶梯报价计算正确
- 来源追溯：PRD文档 §3.5 仓储与物流

## 开放问题

- 海外仓API对接的具体平台待确认
- 报关单HS编码的自动匹配规则待确认
- 运费计算的小数精度规则待确认
- 物流渠道报价的更新频率待确认
