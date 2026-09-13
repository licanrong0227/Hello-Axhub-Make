# 跨境ERP系统 - 财务管理 PRD

## 文档目录与关联文档

| 文档 | 职责 |
|------|------|
| 本文档 | 财务管理模块的产品需求定义 |
| `prd-01-portal.md` | 系统门户（财务管理入口） |
| `prd-02-dashboard.md` | 工作台首页（财务相关待办） |
| `prd-04-orders.md` | 订单管理（引用订单数据生成应收） |
| `prd-06-procurement.md` | 采购管理（引用采购数据生成应付） |
| `prd-07-logistics.md` | 仓储与物流（物流费用数据） |

## 背景与问题

财务管理是跨境ERP的资金核心模块，涵盖应收管理、应付管理、费用管理、汇率管理、成本核算配置、平台对账等业务。当前问题：应收按发货生成导致与结算不匹配；核销规则不统一，优先级混乱；成本计价方式切换缺乏系统支持；平台对账依赖手工核对，效率低。

## 目标与成功标准

1. 实现应收按结算单生成，确保与实际结算一致
2. 建立核销优先级规则，自动优先核销最早应收
3. 支持成本计价方式切换（先进先出/加权平均/个别计价）
4. 实现汇率自动更新与历史汇率查询
5. 建立平台对账流程，支持自动对账与差异处理

## 用户、角色与场景

| 角色 | 场景 |
|------|------|
| 财务人员 | 应收管理、应付管理、费用管理、成本核算 |
| 运营人员 | 查看平台对账、处理对账差异 |
| 管理员 | 配置汇率、成本计价方式、费用规则 |
| 管理层 | 查看财务报表、成本分析 |

## 范围

### 本次包含

- 应收管理页（应收记录、核销、账龄分析）
- 应付管理页（应付记录、付款、账龄分析）
- 费用管理页（费用记录、费用规则配置）
- 汇率管理页（汇率设置、历史汇率查询）
- 成本核算配置页（计价方式配置、成本计算）
- 平台对账页（平台账单导入、自动对账、差异处理）
- 应收按结算单生成逻辑
- 核销优先级逻辑（最早应收优先）
- 成本计价方式切换逻辑

### 不在本次范围

- 财务报表自动生成（属于BI模块）
- 税务计算与申报
- 银行对账
- 预算管理

## 用户故事

1. 作为财务人员，我希望应收按结算单自动生成，从而确保与平台结算一致
2. 作为财务人员，我希望核销时系统自动优先核销最早应收，从而加快资金回笼
3. 作为财务人员，我希望配置成本计价方式，从而适应不同会计准则
4. 作为财务人员，我希望自动更新汇率，从而准确计算多币种交易
5. 作为运营人员，我希望导入平台账单自动对账，从而减少手工核对工作
6. 作为管理员，我希望配置费用规则，从而自动计算各类费用

## 数据模型

### AccountReceivable（应收单）

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| id | string | 是 | 应收单ID |
| arCode | string | 是 | 应收单编号 |
| settlementId | string | 是 | 关联结算单ID |
| settlementCode | string | 是 | 结算单编号 |
| customerId | string | 是 | 客户/平台ID |
| customerName | string | 是 | 客户/平台名称 |
| salesOrderId | string | 否 | 关联销售订单ID |
| salesOrderCode | string | 否 | 关联销售订单号 |
| totalAmount | number | 是 | 应收总金额 |
| currency | string | 是 | 币种 |
| exchangeRate | number | 是 | 汇率 |
| rmbAmount | number | 是 | 人民币金额 |
| paidAmount | number | 是 | 已收金额 |
| unpaidAmount | number | 是 | 未收金额 |
| dueDate | datetime | 是 | 到期日期 |
| status | enum | 是 | 状态：pending/partial/paid/overdue/void |
| agingDays | number | 是 | 账龄天数 |
| items | AccountReceivableItem[] | 是 | 应收明细 |
| remark | string | 否 | 备注 |
| createdBy | string | 是 | 创建人 |
| createdAt | datetime | 是 | 创建时间 |
| updatedAt | datetime | 是 | 更新时间 |

### AccountReceivableItem（应收明细）

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| id | string | 是 | 明细ID |
| arId | string | 是 | 关联应收单ID |
| skuId | string | 否 | SKU ID |
| skuCode | string | 否 | SKU编码 |
| productName | string | 否 | 商品名称 |
| quantity | number | 是 | 数量 |
| unitPrice | number | 是 | 单价 |
| amount | number | 是 | 金额 |

### AccountPayable（应付单）

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| id | string | 是 | 应付单ID |
| apCode | string | 是 | 应付单编号 |
| supplierId | string | 是 | 供应商ID |
| supplierName | string | 是 | 供应商名称 |
| purchaseOrderId | string | 否 | 关联采购订单ID |
| purchaseOrderCode | string | 否 | 关联采购订单号 |
| totalAmount | number | 是 | 应付总金额 |
| currency | string | 是 | 币种 |
| exchangeRate | number | 是 | 汇率 |
| rmbAmount | number | 是 | 人民币金额 |
| paidAmount | number | 是 | 已付金额 |
| unpaidAmount | number | 是 | 未付金额 |
| dueDate | datetime | 是 | 到期日期 |
| status | enum | 是 | 状态：pending/partial/paid/overdue/void |
| agingDays | number | 是 | 账龄天数 |
| items | AccountPayableItem[] | 是 | 应付明细 |
| remark | string | 否 | 备注 |
| createdBy | string | 是 | 创建人 |
| createdAt | datetime | 是 | 创建时间 |
| updatedAt | datetime | 是 | 更新时间 |

### AccountPayableItem（应付明细）

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| id | string | 是 | 明细ID |
| apId | string | 是 | 关联应付单ID |
| skuId | string | 否 | SKU ID |
| skuCode | string | 否 | SKU编码 |
| productName | string | 否 | 商品名称 |
| quantity | number | 是 | 数量 |
| unitPrice | number | 是 | 单价 |
| amount | number | 是 | 金额 |

### Expense（费用单）

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| id | string | 是 | 费用单ID |
| expenseCode | string | 是 | 费用单编号 |
| expenseType | enum | 是 | 费用类型：shipping/platform/operation/customs/other |
| relatedOrderId | string | 否 | 关联订单ID |
| relatedOrderCode | string | 否 | 关联订单号 |
| amount | number | 是 | 费用金额 |
| currency | string | 是 | 币种 |
| exchangeRate | number | 是 | 汇率 |
| rmbAmount | number | 是 | 人民币金额 |
| status | enum | 是 | 状态：pending/approved/paid/void |
| ruleId | string | 否 | 关联费用规则ID |
| approvedAt | datetime | 否 | 审批时间 |
| approvedBy | string | 否 | 审批人 |
| remark | string | 否 | 备注 |
| createdBy | string | 是 | 创建人 |
| createdAt | datetime | 是 | 创建时间 |
| updatedAt | datetime | 是 | 更新时间 |

### ExpenseRule（费用规则）

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| id | string | 是 | 规则ID |
| ruleName | string | 是 | 规则名称 |
| expenseType | enum | 是 | 费用类型 |
| calculationMethod | enum | 是 | 计算方式：fixed/percentage/formula |
| fixedAmount | number | 否 | 固定金额 |
| percentage | number | 否 | 百分比 |
| formula | string | 否 | 计算公式 |
| applicableScope | string | 是 | 适用范围 |
| minAmount | number | 否 | 最小金额 |
| maxAmount | number | 否 | 最大金额 |
| status | enum | 是 | 状态：active/inactive |
| createdAt | datetime | 是 | 创建时间 |
| updatedAt | datetime | 是 | 更新时间 |

### ExchangeRate（汇率）

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| id | string | 是 | 汇率ID |
| fromCurrency | string | 是 | 源币种 |
| toCurrency | string | 是 | 目标币种 |
| rate | number | 是 | 汇率 |
| rateDate | datetime | 是 | 汇率日期 |
| source | string | 否 | 数据来源 |
| isDefault | boolean | 是否 | 是否为默认汇率 |
| createdAt | datetime | 是 | 创建时间 |

### CostCalculation（成本核算配置）

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| id | string | 是 | 配置ID |
| skuId | string | 是 | SKU ID |
| skuCode | string | 是 | SKU编码 |
| costingMethod | enum | 是 | 计价方式：fifo/weighted_average/individual |
| currentCost | number | 是 | 当前成本价 |
| lastPurchasePrice | number | 否 | 最近采购价 |
| weightedAvgPrice | number | 否 | 加权平均价 |
| effectiveDate | datetime | 是 | 生效日期 |
| status | enum | 是 | 状态：active/inactive |
| createdAt | datetime | 是 | 创建时间 |
| updatedAt | datetime | 是 | 更新时间 |

### Reconciliation（对账单）

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| id | string | 是 | 对账单ID |
| reconciliationCode | string | 是 | 对账单编号 |
| platform | string | 是 | 平台名称 |
| period | string | 是 | 对账周期 |
| totalOrders | number | 是 | 订单总数 |
| totalAmount | number | 是 | 平台账单总金额 |
| systemAmount | number | 是 | 系统账单总金额 |
| differenceAmount | number | 是 | 差异金额 |
| status | enum | 是 | 状态：pending/matching/matched/disputed/resolved |
| items | ReconciliationItem[] | 是 | 对账明细 |
| uploadedBy | string | 是 | 上传人 |
| uploadedAt | datetime | 是 | 上传时间 |
| resolvedAt | datetime | 否 | 解决时间 |
| resolvedBy | string | 否 | 解决人 |
| createdAt | datetime | 是 | 创建时间 |

### ReconciliationItem（对账明细）

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| id | string | 是 | 明细ID |
| reconciliationId | string | 是 | 关联对账单ID |
| orderId | string | 是 | 订单ID |
| orderCode | string | 是 | 订单号 |
| platformAmount | number | 是 | 平台金额 |
| systemAmount | number | 是 | 系统金额 |
| difference | number | 是 | 差异金额 |
| status | enum | 是 | 状态：match/unmatch/disputed |
| remark | string | 否 | 备注 |

## 业务规则

| 编号 | 条件 | 动作 | 结果 |
|------|------|------|------|
| BR-01 | 平台结算单同步 | 自动生成应收单 | 应收金额=结算单金额 |
| BR-02 | 核销收款 | 优先核销最早应收 | 按账龄天数降序核销 |
| BR-03 | 成本计价方式切换 | 重新计算库存成本 | 按新计价方式重新计算 |
| BR-04 | 汇率更新 | 重新计算人民币金额 | 使用最新汇率计算 |
| BR-05 | 平台账单导入 | 自动匹配系统订单 | 按订单号匹配，标记差异 |
| BR-06 | 费用规则触发 | 自动计算费用 | 按规则计算费用金额 |
| BR-07 | 应收单超过到期日 | 标记为逾期 | 自动更新账龄天数 |
| BR-08 | 应付单超过到期日 | 标记为逾期 | 自动更新账龄天数 |
| BR-09 | 对账差异超过阈值 | 需人工处理 | 标记为争议，等待处理 |
| BR-10 | 成本价为0 | 使用最近采购价 | 回退到最近采购价作为成本 |

## 状态、异常与边界

### 应收单状态流转

```
待收(pending) → [部分收款] → 部分收(partial) → [全额收款] → 已收(paid)
待收(pending) → [全额收款] → 已收(paid)
待收(pending)/部分收(partial) → [超期] → 逾期(overdue)
待收(pending)/部分收(partial) → [核销] → 作废(void)
```

### 应付单状态流转

```
待付(pending) → [部分付款] → 部分付(partial) → [全额付款] → 已付(paid)
待付(pending) → [全额付款] → 已付(paid)
待付(pending)/部分付(partial) → [超期] → 逾期(overdue)
待付(pending)/部分付(partial) → [核销] → 作废(void)
```

### 对账单状态流转

```
待对账(pending) → [自动匹配] → 匹配中(matching) → [匹配完成] → 已匹配(matched)
待对账(pending)/匹配中(matching) → [有差异] → 争议(disputed) → [解决] → 已解决(resolved)
```

### 异常处理

- 汇率获取失败：使用上一次汇率，记录失败日志
- 对账匹配失败：标记为差异，等待人工处理
- 成本计算异常：使用默认成本价，记录异常日志
- 费用规则计算异常：使用固定金额，记录异常日志

### 边界情况

- 应收金额为0：不允许创建应收单
- 核销金额超过应收金额：阻止核销，提示金额不足
- 汇率为0：阻止计算，提示「汇率设置异常」
- 成本价为负数：阻止计算，提示「成本价不能为负数」
- 同一订单多个币种：按币种分别计算应收

## 字段、内容与交互要求

### 应收管理页

- 顶部：筛选条件（状态/客户/时间范围/账龄）
- 列表：应收单号、客户、应收金额、已收金额、未收金额、到期日、账龄、状态、操作
- 操作区：核销、导出、批量操作
- 汇总：总应收、已收、未收、逾期金额
- 账龄分析：0-30天/31-60天/61-90天/90天以上分布

### 应付管理页

- 顶部：筛选条件（状态/供应商/时间范围/账龄）
- 列表：应付单号、供应商、应付金额、已付金额、未付金额、到期日、账龄、状态、操作
- 操作区：付款、导出、批量操作
- 汇总：总应付、已付、未付、逾期金额
- 账龄分析：0-30天/31-60天/61-90天/90天以上分布

### 费用管理页

- 顶部：筛选条件（费用类型/状态/时间范围）
- 列表：费用单号、费用类型、金额、状态、创建时间、操作
- 操作区：新增费用单、配置费用规则、导出
- 规则配置：费用类型、计算方式、适用范围

### 汇率管理页

- 当前汇率：展示各币种对人民币的当前汇率
- 历史汇率：按日期查询历史汇率
- 操作：更新汇率、设置默认汇率

### 成本核算配置页

- SKU列表：SKU编码、商品名称、当前成本价、计价方式
- 操作：修改计价方式、查看成本历史
- 批量操作：批量切换计价方式

### 平台对账页

- 平台选择：下拉选择平台
- 账单上传：导入平台账单文件
- 对账结果：匹配/差异/争议明细
- 操作：自动对账、手动调整、导出差异

## 验收标准与来源追溯

- 产品验收：应收按结算单生成正确，核销优先级正确，成本计价方式切换正确
- 设计验收：界面布局合理，操作流程清晰
- 实现验收：汇率自动更新生效，平台对账匹配逻辑正确
- 来源追溯：PRD文档 §3.6 财务管理

## 开放问题

- 平台对账的匹配规则精度待确认
- 成本计价方式切换的历史数据处理方式待确认
- 汇率数据源的具体API待确认
- 费用规则的计算公式复杂度待确认
