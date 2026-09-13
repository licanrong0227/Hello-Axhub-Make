# 跨境ERP系统 - 采购管理 PRD

## 文档目录与关联文档

| 文档 | 职责 |
|------|------|
| 本文档 | 采购管理模块的产品需求定义 |
| `prd-01-portal.md` | 系统门户（采购管理入口） |
| `prd-02-dashboard.md` | 工作台首页（采购相关待办） |
| `prd-03-products.md` | 商品中心（引用商品与SKU数据） |
| `prd-04-orders.md` | 订单管理（引用订单数据） |
| `prd-05-inventory.md` | 库存管理（入库操作、安全库存） |

## 背景与问题

采购管理是跨境ERP的供应链核心模块，涵盖供应商管理、采购建议生成、采购订单、采购退货等业务。当前问题：采购建议依赖人工判断，容易遗漏或重复；供应商报价管理混乱，缺乏有效期控制；入库差异处理流程不规范。

## 目标与成功标准

1. 实现采购建议自动生成，基于安全库存公式计算
2. 建立供应商信息管理，支持报价有效期校验
3. 实现采购订单全流程管理，从创建到入库
4. 支持采购退货流程管理
5. 实现入库差异自动检测与处理

## 用户、角色与场景

| 角色 | 场景 |
|------|------|
| 采购人员 | 查看采购建议、创建采购订单、管理供应商 |
| 仓库人员 | 采购入库、处理入库差异 |
| 财务人员 | 采购对账、退货退款 |
| 管理员 | 管理供应商信息、配置采购规则 |

## 范围

### 本次包含

- 供应商列表页（供应商信息管理、报价管理）
- 采购建议列表页（自动生成的采购建议）
- 采购订单列表页（采购记录、订单状态）
- 新建采购订单页（选择商品、供应商、数量）
- 采购退货单列表页（退货记录、退货状态）
- 新建采购退货单页（选择订单、退货商品、原因）
- 采购建议自动生成逻辑
- 供应商报价有效期校验
- 入库差异处理

### 不在本次范围

- 采购合同管理
- 采购付款审批
- 供应商评估体系
- 跨境采购关税计算

## 用户故事

1. 作为采购人员，我希望系统自动根据安全库存生成采购建议，从而避免缺货
2. 作为采购人员，我希望管理供应商信息和报价，从而快速选择供应商下单
3. 作为采购人员，我希望创建采购订单并跟踪状态，从而掌握采购进度
4. 作为仓库人员，我希望在入库时检测差异，从而及时处理问题
5. 作为采购人员，我希望创建退货单处理不良品，从而减少库存损失
6. 作为采购人员，我希望校验供应商报价有效期，从而避免使用过期报价

## 数据模型

### Supplier（供应商）

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| id | string | 是 | 供应商ID |
| code | string | 是 | 供应商编码 |
| name | string | 是 | 供应商名称 |
| contactPerson | string | 是 | 联系人 |
| contactPhone | string | 是 | 联系电话 |
| contactEmail | string | 否 | 联系邮箱 |
| address | string | 是 | 供应商地址 |
| paymentTerms | string | 否 | 付款条款 |
| deliveryTerms | string | 否 | 交货条款 |
| rating | number | 否 | 供应商评分（1-5） |
| status | enum | 是 | 状态：active/inactive |
| createdAt | datetime | 是 | 创建时间 |
| updatedAt | datetime | 是 | 更新时间 |

### PurchaseSuggestion（采购建议）

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| id | string | 是 | 建议ID |
| suggestionCode | string | 是 | 建议编号 |
| skuId | string | 是 | SKU ID |
| skuCode | string | 是 | SKU编码 |
| productName | string | 是 | 商品名称 |
| currentStock | number | 是 | 当前可售库存 |
| safetyStock | number | 是 | 安全库存 |
| suggestedQuantity | number | 是 | 建议采购数量 |
| reason | string | 是 | 生成原因 |
| status | enum | 是 | 状态：pending/approved/rejected/ordered |
| createdAt | datetime | 是 | 创建时间 |
| approvedAt | datetime | 否 | 审批时间 |
| approvedBy | string | 否 | 审批人 |

### PurchaseOrder（采购订单）

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| id | string | 是 | 订单ID |
| orderCode | string | 是 | 采购订单号 |
| supplierId | string | 是 | 供应商ID |
| supplierName | string | 是 | 供应商名称 |
| status | enum | 是 | 订单状态 |
| items | PurchaseOrderItem[] | 是 | 采购明细 |
| totalAmount | number | 是 | 订单总金额 |
| currency | string | 是 | 币种 |
| expectedDeliveryDate | datetime | 是 | 预计交货日期 |
| actualDeliveryDate | datetime | 否 | 实际交货日期 |
| shippingMethod | string | 否 | 物流方式 |
| trackingNo | string | 否 | 物流单号 |
| warehouseId | string | 是 | 收货仓库ID |
| remark | string | 否 | 备注 |
| createdBy | string | 是 | 创建人 |
| createdAt | datetime | 是 | 创建时间 |
| updatedAt | datetime | 是 | 更新时间 |

### PurchaseOrderItem（采购明细）

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| id | string | 是 | 明细ID |
| orderId | string | 是 | 关联采购订单ID |
| skuId | string | 是 | SKU ID |
| skuCode | string | 是 | SKU编码 |
| productName | string | 是 | 商品名称 |
| quantity | number | 是 | 采购数量 |
| unitPrice | number | 是 | 单价 |
| totalPrice | number | 是 | 小计金额 |
| receivedQuantity | number | 否 | 已收货数量 |
| qualifiedQuantity | number | 否 | 合格数量 |
| defectiveQuantity | number | 否 | 不合格数量 |
| quoteId | string | 否 | 关联报价ID |
| quoteExpiryDate | datetime | 否 | 报价有效期 |

### PurchaseReturn（采购退货单）

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| id | string | 是 | 退货单ID |
| returnCode | string | 是 | 退货单号 |
| purchaseOrderId | string | 是 | 关联采购订单ID |
| supplierId | string | 是 | 供应商ID |
| supplierName | string | 是 | 供应商名称 |
| status | enum | 是 | 退货状态 |
| items | PurchaseReturnItem[] | 是 | 退货明细 |
| totalAmount | number | 是 | 退货总金额 |
| reason | string | 是 | 退货原因 |
| returnMethod | string | 否 | 退货方式 |
| createdAt | datetime | 是 | 创建时间 |
| completedAt | datetime | 否 | 完成时间 |

### PurchaseReturnItem（退货明细）

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| id | string | 是 | 明细ID |
| returnId | string | 是 | 关联退货单ID |
| skuId | string | 是 | SKU ID |
| skuCode | string | 是 | SKU编码 |
| productName | string | 是 | 商品名称 |
| quantity | number | 是 | 退货数量 |
| unitPrice | number | 是 | 单价 |
| totalPrice | number | 是 | 小计金额 |
| defectType | string | 否 | 缺陷类型 |
| defectDescription | string | 否 | 缺陷描述 |

## 业务规则

| 编号 | 条件 | 动作 | 结果 |
|------|------|------|------|
| BR-01 | 当前可售库存<安全库存 | 自动生成采购建议 | 建议采购数量=安全库存-当前可售库存 |
| BR-02 | 供应商报价已过期 | 阻止使用该报价 | 提示「报价已过期，请获取新报价」 |
| BR-03 | 入库时实际数量≠采购数量 | 生成入库差异记录 | 记录差异并通知相关人员 |
| BR-04 | 采购订单确认 | 锁定采购金额 | 更新供应商账期 |
| BR-05 | 采购退货单确认 | 扣减库存 | 库存中对应SKU数量减少 |
| BR-06 | 采购建议被批准 | 生成采购订单 | 采购建议状态变为「已下单」 |
| BR-07 | 供应商评分<2分 | 限制合作 | 提示「供应商评分过低，建议更换」 |
| BR-08 | 入库合格数量=0 | 全额退货 | 自动生成退货单 |
| BR-09 | 采购订单超期未到货 | 触发预警 | 通知采购人员跟进 |
| BR-10 | 退货单完成 | 更新供应商账务 | 扣减应付账款 |

## 状态、异常与边界

### 采购建议状态流转

```
待审批(pending) → [审批] → 已批准(approved) → [下单] → 已下单(ordered)
待审批(pending) → [审批] → 已拒绝(rejected)
```

### 采购订单状态流转

```
待确认(pending) → [确认] → 已确认(confirmed) → [发货] → 已发货(shipped) → [入库] → 已入库(received) → [完成] → 已完成(completed)
待确认(pending) → [取消] → 已取消(cancelled)
已确认(confirmed) → [取消] → 已取消(cancelled)
```

### 采购退货单状态流转

```
待处理(pending) → [确认] → 已确认(confirmed) → [退货] → 已退货(returned) → [完成] → 已完成(completed)
待处理(pending) → [取消] → 已取消(cancelled)
```

### 异常处理

- 采购建议生成失败：记录失败原因，支持手动生成
- 入库差异过大：需人工审批后处理
- 退货物流异常：记录异常信息，支持手动更新状态
- 供应商报价失效：提示获取新报价

### 边界情况

- 采购数量为0：阻止创建采购订单
- 退货数量超过已入库数量：阻止退货，提示数量不足
- 同一商品多个报价：使用最近有效报价
- 供应商被禁用：阻止创建新采购订单

## 字段、内容与交互要求

### 供应商列表页

- 顶部：搜索框（供应商名称/编码）、筛选条件（状态/评分）
- 列表：供应商名称、联系人、电话、评分、状态、操作（编辑/查看/删除）
- 操作区：新增供应商
- 分页：支持每页10/20/50条

### 采购建议列表页

- 顶部：筛选条件（状态/商品/时间范围）
- 列表：建议编号、商品名称、当前库存、安全库存、建议数量、状态、操作
- 操作区：批量审批、生成采购订单
- 汇总：总建议数量、待审批数量

### 采购订单列表页

- 顶部：搜索框（订单号/供应商）、筛选条件（状态/时间范围）
- 列表：订单号、供应商、商品数量、金额、状态、创建时间、操作
- 操作区：新增采购订单、导出

### 新建采购订单页

- 供应商选择：下拉选择供应商（显示报价有效期）
- 商品选择：从采购建议选择或手动添加
- 数量与单价：输入采购数量，自动带出单价
- 交货日期：日期选择器
- 收货仓库：下拉选择仓库
- 按钮：保存草稿、提交订单

### 采购退货单列表页

- 顶部：筛选条件（状态/供应商/时间范围）
- 列表：退货单号、供应商、退货金额、状态、创建时间、操作
- 操作区：新增退货单

### 新建采购退货单页

- 采购订单选择：下拉选择关联订单
- 退货商品：从订单商品中选择
- 退货数量：输入每个商品的退货数量
- 退货原因：选择或输入原因
- 退货方式：物流退货/现场退货
- 按钮：提交退货单

## 验收标准与来源追溯

- 产品验收：采购建议自动生成正确，采购订单流程完整，退货流程正常
- 设计验收：界面布局合理，操作流程清晰
- 实现验收：报价有效期校验生效，入库差异处理逻辑正确
- 来源追溯：PRD文档 §3.4 采购管理

## 开放问题

- 采购建议自动生成的触发频率待确认
- 入库差异审批的阈值待确认
- 供应商评分的计算方式待确认
- 退货物流对接的具体平台待确认
