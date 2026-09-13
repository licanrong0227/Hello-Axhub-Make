# 跨境ERP系统 - 库存管理 PRD

## 文档目录与关联文档

| 文档 | 职责 |
|------|------|
| 本文档 | 库存管理模块的产品需求定义 |
| `prd-01-portal.md` | 系统门户（库存管理入口） |
| `prd-02-dashboard.md` | 工作台首页（库存预警） |
| `prd-03-products.md` | 商品中心（引用SKU数据） |
| `prd-04-orders.md` | 订单管理（预占库存释放） |
| `prd-06-procurement.md` | 采购管理（入库操作） |

## 背景与问题

库存管理是跨境ERP的核心数据模块，管理多仓库、多库位的库存数据，支持盘点、调拨等业务操作。当前问题：库存数据不准确，导致超卖或断货；盘点流程依赖手工记录，效率低；调拨流程缺乏系统支持，物流跟踪困难。

## 目标与成功标准

1. 建立准确的库存计算模型，支持可售=实体-预占公式
2. 实现静态/动态盘点功能，支持库存锁定机制
3. 实现调拨流程管理，支持多仓库间库存调配
4. 建立仓库/库区/库位三级管理结构
5. 支持库存总览看板，实时展示库存状态

## 用户、角色与场景

| 角色 | 场景 |
|------|------|
| 仓库人员 | 盘点作业、调拨操作、库存查询 |
| 运营人员 | 查看库存状态、处理库存预警 |
| 采购人员 | 查看库存数据，参考采购建议 |
| 管理员 | 管理仓库配置、库区库位设置 |

## 范围

### 本次包含

- 库存总览看板页（各仓库库存概览、预警统计）
- 库存列表页（SKU维度库存查询、筛选）
- 盘点单列表页（盘点记录、盘点状态）
- 新建盘点单页（选择仓库/库区、盘点方式）
- 调拨单列表页（调拨记录、调拨状态）
- 新建调拨单页（选择源仓库/目标仓库、商品数量）
- 仓库管理页（仓库/库区/库位配置）
- 静态/动态盘点锁定规则
- 库存计算公式（可售=实体-预占）
- 虚拟仓不计入可售

### 不在本次范围

- 库存成本核算（属于财务模块）
- 批次管理
- 序列号管理
- 库存预测分析

## 用户故事

1. 作为仓库人员，我希望在总览看板查看各仓库库存状态，从而快速了解库存概况
2. 作为仓库人员，我希望创建盘点单进行库存盘点，从而确保库存数据准确
3. 作为仓库人员，我希望在盘点时锁定库存，从而避免盘点期间库存变动
4. 作为仓库人员，我希望创建调拨单进行仓库间调拨，从而平衡各仓库库存
5. 作为运营人员，我希望查看SKU维度的库存详情，从而了解可售库存情况
6. 作为管理员，我希望管理仓库/库区/库位配置，从而建立完整的仓储结构

## 数据模型

### Inventory（库存）

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| id | string | 是 | 库存ID |
| skuId | string | 是 | SKU ID |
| skuCode | string | 是 | SKU编码 |
| warehouseId | string | 是 | 仓库ID |
| zoneId | string | 否 | 库区ID |
| locationId | string | 否 | 库位ID |
| totalQuantity | number | 是 | 实体库存数量 |
| lockedQuantity | number | 是 | 预占库存数量 |
| availableQuantity | number | 是 | 可售库存数量（实体-预占） |
| safetyStock | number | 是 | 安全库存 |
| status | enum | 是 | 状态：normal/low/empty |
| lastUpdatedAt | datetime | 是 | 最后更新时间 |

### Warehouse（仓库）

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| id | string | 是 | 仓库ID |
| code | string | 是 | 仓库编码 |
| name | string | 是 | 仓库名称 |
| type | enum | 是 | 仓库类型：physical/virtual |
| address | string | 是 | 仓库地址 |
| contactPerson | string | 否 | 联系人 |
| contactPhone | string | 否 | 联系电话 |
| status | enum | 是 | 状态：active/inactive |
| createdAt | datetime | 是 | 创建时间 |
| updatedAt | datetime | 是 | 更新时间 |

### WarehouseZone（库区）

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| id | string | 是 | 库区ID |
| warehouseId | string | 是 | 关联仓库ID |
| code | string | 是 | 库区编码 |
| name | string | 是 | 库区名称 |
| description | string | 否 | 库区描述 |
| status | enum | 是 | 状态：active/inactive |

### WarehouseLocation（库位）

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| id | string | 是 | 库位ID |
| zoneId | string | 是 | 关联库区ID |
| code | string | 是 | 库位编码 |
| name | string | 是 | 库位名称 |
| capacity | number | 是 | 库位容量 |
| currentQuantity | number | 是 | 当前存放数量 |
| status | enum | 是 | 状态：available/full/disabled |

### Stocktake（盘点单）

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| id | string | 是 | 盘点单ID |
| stocktakeCode | string | 是 | 盘点单编号 |
| warehouseId | string | 是 | 仓库ID |
| zoneId | string | 否 | 库区ID |
| stocktakeType | enum | 是 | 盘点类型：static/dynamic |
| status | enum | 是 | 状态：pending/in_progress/completed |
| lockedAt | datetime | 否 | 锁定时间 |
| completedAt | datetime | 否 | 完成时间 |
| items | StocktakeItem[] | 否 | 盘点明细 |
| createdBy | string | 是 | 创建人 |
| createdAt | datetime | 是 | 创建时间 |

### StocktakeItem（盘点明细）

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| id | string | 是 | 明细ID |
| stocktakeId | string | 是 | 关联盘点单ID |
| skuId | string | 是 | SKU ID |
| skuCode | string | 是 | SKU编码 |
| systemQuantity | number | 是 | 系统库存数量 |
| actualQuantity | number | 否 | 实际盘点数量 |
| difference | number | 否 | 差异数量 |
| status | enum | 是 | 状态：pending/counted/adjusted |
| countedAt | datetime | 否 | 盘点时间 |
| countedBy | string | 否 | 盘点人 |

### Transfer（调拨单）

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| id | string | 是 | 调拨单ID |
| transferCode | string | 是 | 调拨单编号 |
| fromWarehouseId | string | 是 | 源仓库ID |
| toWarehouseId | string | 是 | 目标仓库ID |
| status | enum | 是 | 状态：pending/transiting/completed |
| items | TransferItem[] | 否 | 调拨明细 |
| shippingMethod | string | 否 | 物流方式 |
| trackingNo | string | 否 | 物流单号 |
| expectedArrival | datetime | 否 | 预计到达时间 |
| actualArrival | datetime | 否 | 实际到达时间 |
| createdBy | string | 是 | 创建人 |
| createdAt | datetime | 是 | 创建时间 |

### TransferItem（调拨明细）

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| id | string | 是 | 明细ID |
| transferId | string | 是 | 关联调拨单ID |
| skuId | string | 是 | SKU ID |
| skuCode | string | 是 | SKU编码 |
| requestQuantity | number | 是 | 申请调拨数量 |
| actualQuantity | number | 否 | 实际调拨数量 |
| status | enum | 是 | 状态：pending/shipped/received |

## 业务规则

| 编号 | 条件 | 动作 | 结果 |
|------|------|------|------|
| BR-01 | 计算可售库存 | 可售=实体-预占 | 更新可售库存数量 |
| BR-02 | 创建静态盘点单 | 锁定盘点范围库存 | 盘点期间库存不可变动 |
| BR-03 | 创建动态盘点单 | 不锁定库存 | 盘点期间允许库存变动 |
| BR-04 | 盘点完成且有差异 | 自动生成库存调整单 | 调整库存至盘点结果 |
| BR-05 | 虚拟仓库存 | 不计入可售 | 虚拟仓库存不参与可售计算 |
| BR-06 | 可售库存<安全库存 | 触发库存预警 | 通知相关人员补货 |
| BR-07 | 调拨单确认 | 锁定源仓库库存 | 源仓库库存预占 |
| BR-08 | 调拨单签收 | 扣减源仓库库存，增加目标仓库库存 | 库存转移完成 |
| BR-09 | 盘点差异超过阈值 | 需人工审批 | 审批通过后执行调整 |
| BR-10 | 库存锁定期间 | 禁止出库操作 | 提示「库存已锁定，暂不可操作」 |

## 状态、异常与边界

### 盘点单状态流转

```
待盘点(pending) → [开始盘点] → 盘点中(in_progress) → [完成] → 已完成(completed)
盘点中(in_progress) → [取消] → 已取消(cancelled)
```

### 调拨单状态流转

```
待调拨(pending) → [确认] → 调拨中(transiting) → [签收] → 已完成(completed)
调拨中(transiting) → [取消] → 已取消(cancelled)
```

### 异常处理

- 盘点差异过大：需人工审批后才能调整
- 调拨物流异常：记录异常信息，支持手动更新状态
- 库存锁定失败：记录失败原因，支持重试
- 调拨数量超过可用库存：阻止调拨，提示库存不足

### 边界情况

- 库存为0时仍可创建盘点单
- 调拨数量为0：阻止调拨
- 同一仓库内调拨：不允许，提示「源仓库与目标仓库不能相同」
- 虚拟仓调拨：不允许调入虚拟仓

## 字段、内容与交互要求

### 库存总览看板页

- 仓库卡片：仓库名称、库存总量、预警数量、可售数量
- 预警列表：低库存SKU列表、预警等级
- 快捷操作：查看库存详情、创建盘点单、创建调拨单

### 库存列表页

- 顶部：搜索框（SKU编码/商品名称）、筛选条件（仓库/状态/预警等级）
- 列表：SKU编码、商品名称、仓库、实体库存、预占库存、可售库存、安全库存、状态
- 操作：查看详情、调整库存、创建盘点单

### 盘点单列表页

- 顶部：筛选条件（状态/仓库/时间范围）
- 列表：盘点单号、仓库、盘点类型、状态、盘点人、创建时间
- 操作：查看详情、开始盘点、完成盘点

### 新建盘点单页

- 仓库选择：下拉选择仓库
- 库区选择：下拉选择库区（可选）
- 盘点类型：静态盘点/动态盘点
- 盘点范围：全部/按SKU筛选
- 按钮：创建盘点单

### 调拨单列表页

- 顶部：筛选条件（状态/仓库/时间范围）
- 列表：调拨单号、源仓库、目标仓库、商品数量、状态、创建时间
- 操作：查看详情、确认调拨、签收

### 新建调拨单页

- 源仓库：下拉选择
- 目标仓库：下拉选择
- 商品选择：从库存列表选择调拨商品
- 调拨数量：输入每个商品的调拨数量
- 物流信息：物流方式、物流单号
- 按钮：创建调拨单

### 仓库管理页

- 仓库列表：仓库名称、类型、地址、状态
- 库区管理：选中仓库后展示库区列表
- 库位管理：选中库区后展示库位列表
- 操作：新增/编辑/删除仓库、库区、库位

## 验收标准与来源追溯

- 产品验收：库存计算公式正确，盘点流程完整，调拨流程正常
- 设计验收：界面布局合理，操作流程清晰
- 实现验收：静态盘点锁定机制生效，虚拟仓不计入可售
- 来源追溯：PRD文档 §3.3 库存管理

## 开放问题

- 静态盘点的最大锁定时长待确认
- 盘点差异审批的阈值待确认
- 调拨物流对接的具体平台待确认
- 虚拟仓的定义和使用场景待确认
