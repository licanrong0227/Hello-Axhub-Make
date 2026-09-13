# 跨境ERP系统 - 商品中心 PRD

## 文档目录与关联文档

| 文档 | 职责 |
|------|------|
| 本文档 | 商品中心模块的产品需求定义 |
| `prd-01-portal.md` | 系统门户（商品中心入口） |
| `prd-02-dashboard.md` | 工作台首页（商品相关待办） |
| `prd-04-orders.md` | 订单管理（引用商品与SKU数据） |
| `prd-05-inventory.md` | 库存管理（引用商品与SKU数据） |
| `prd-06-procurement.md` | 采购管理（引用商品与SKU数据） |

## 背景与问题

商品中心是跨境ERP的核心基础数据模块，管理SPU/SKU信息、多平台采集与刊登任务、定价规则。当前问题：商品数据分散在各平台，缺乏统一管理；采集与刊登流程依赖人工操作，效率低；定价规则不统一，容易出现价格错误。

## 目标与成功标准

1. 建立统一的商品数据模型，支持SPU/SKU多维度管理
2. 实现自动化采集任务，支持多平台商品信息抓取
3. 实现自动化刊登任务，支持多平台商品发布
4. 建立统一的定价规则引擎，支持优先级定价
5. 库存同步支持ERP强覆盖机制，确保库存数据准确

## 用户、角色与场景

| 角色 | 场景 |
|------|------|
| 运营人员 | 管理商品信息、创建采集/刊登任务、配置定价规则 |
| 采购人员 | 查看商品库存，参考采购建议 |
| 仓库人员 | 同步商品库存数据 |
| 管理员 | 管理商品分类、平台配置 |

## 范围

### 本次包含

- 商品列表页（SPU维度，支持搜索/筛选/批量操作）
- 商品新增/编辑页（SPU信息、SKU列表、平台映射）
- 新建采集任务页（选择平台、商品链接、采集规则）
- 新建刊登任务页（选择商品、目标平台、刊登配置）
- 定价规则新增/编辑页（规则条件、价格公式、优先级）
- 库存同步ERP强覆盖机制
- 重新采集差异对比功能

### 不在本次范围

- 商品图片批量编辑工具
- 商品SEO优化建议
- 竞品价格监控
- 商品数据分析报表

## 用户故事

1. 作为运营人员，我希望批量导入商品信息，从而快速建立商品库
2. 作为运营人员，我希望创建采集任务自动抓取平台商品信息，从而减少手工录入
3. 作为运营人员，我希望对比采集前后的商品差异，从而准确更新商品信息
4. 作为运营人员，我希望配置定价规则并设置优先级，从而自动计算商品价格
5. 作为运营人员，我希望创建刊登任务批量发布商品到多平台，从而提高上架效率
6. 作为运营人员，我希望在库存同步时使用ERP强覆盖机制，从而确保库存数据准确

## 数据模型

### Product（SPU商品）

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| id | string | 是 | 商品ID |
| spuCode | string | 是 | SPU编码（唯一） |
| name | string | 是 | 商品名称 |
| category | string | 是 | 商品分类 |
| brand | string | 否 | 品牌 |
| origin | string | 否 | 产地 |
| description | string | 否 | 商品描述 |
| mainImage | string | 否 | 主图URL |
| images | string[] | 否 | 商品图片列表 |
| status | enum | 是 | 状态：draft/published/disabled |
| platformMappings | PlatformMapping[] | 否 | 平台映射列表 |
| skus | SKU[] | 否 | SKU列表 |
| createdAt | datetime | 是 | 创建时间 |
| updatedAt | datetime | 是 | 更新时间 |
| createdBy | string | 是 | 创建人 |

### SKU（库存单位）

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| id | string | 是 | SKU ID |
| productId | string | 是 | 关联SPU ID |
| skuCode | string | 是 | SKU编码（全局唯一） |
| name | string | 是 | SKU名称 |
| specs | object | 是 | 规格属性（如颜色、尺寸） |
| barcode | string | 否 | 条形码 |
| weight | number | 否 | 重量(g) |
| volume | number | 否 | 体积(cm³) |
| costPrice | number | 是 | 成本价 |
| sellingPrice | number | 是 | 售价 |
| platformPrices | object | 否 | 各平台售价 |
| status | enum | 是 | 状态：active/inactive |
| createdAt | datetime | 是 | 创建时间 |
| updatedAt | datetime | 是 | 更新时间 |

### CollectTask（采集任务）

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| id | string | 是 | 任务ID |
| taskCode | string | 是 | 任务编号 |
| platform | enum | 是 | 采集平台：amazon/shopee/lazada/aliexpress |
| targetUrls | string[] | 是 | 采集目标链接 |
| rules | object | 否 | 采集规则配置 |
| status | enum | 是 | 状态：pending/running/completed/failed |
| result | object | 否 | 采集结果 |
| diffResult | object | 否 | 差异对比结果 |
| createdAt | datetime | 是 | 创建时间 |
| completedAt | datetime | 否 | 完成时间 |
| createdBy | string | 是 | 创建人 |

### PublishTask（刊登任务）

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| id | string | 是 | 任务ID |
| taskCode | string | 是 | 任务编号 |
| productIds | string[] | 是 | 待刊登商品ID列表 |
| targetPlatform | enum | 是 | 目标平台 |
| targetShop | string | 否 | 目标店铺 |
| config | object | 否 | 刊登配置 |
| status | enum | 是 | 状态：pending/running/completed/failed |
| result | object | 否 | 刊登结果 |
| createdAt | datetime | 是 | 创建时间 |
| completedAt | datetime | 否 | 完成时间 |
| createdBy | string | 是 | 创建人 |

### PricingRule（定价规则）

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| id | string | 是 | 规则ID |
| name | string | 是 | 规则名称 |
| priority | number | 是 | 优先级（数字越小优先级越高） |
| scope | object | 是 | 适用范围（平台/站点/店铺） |
| formula | object | 是 | 定价公式 |
| conditions | object | 否 | 触发条件 |
| status | enum | 是 | 状态：active/inactive |
| createdAt | datetime | 是 | 创建时间 |
| updatedAt | datetime | 是 | 更新时间 |

### PlatformMapping（平台映射）

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| id | string | 是 | 映射ID |
| productId | string | 是 | 关联商品ID |
| skuId | string | 是 | 关联SKU ID |
| platform | enum | 是 | 平台类型 |
| platformSkuId | string | 否 | 平台SKU ID |
| platformUrl | string | 否 | 平台商品链接 |
| syncStatus | enum | 是 | 同步状态：synced/pending/failed |
| lastSyncAt | datetime | 否 | 最后同步时间 |

## 业务规则

| 编号 | 条件 | 动作 | 结果 |
|------|------|------|------|
| BR-01 | SKU编码已存在 | 阻止创建 | 提示「SKU编码已存在，请使用其他编码」 |
| BR-02 | 库存同步时开启ERP强覆盖 | 以ERP库存为准 | 平台库存被ERP库存覆盖 |
| BR-03 | 重新采集任务完成 | 自动对比差异 | 展示采集前后差异，供用户确认更新 |
| BR-04 | 定价规则冲突 | 按优先级执行 | 店铺级>站点级>平台级 |
| BR-05 | 采集任务目标链接无效 | 标记任务失败 | 提示具体失败原因 |
| BR-06 | 刊登任务商品信息不完整 | 阻止刊登 | 提示缺少必填信息 |
| BR-07 | 商品状态为disabled | 禁止刊登 | 提示「商品已禁用，无法刊登」 |
| BR-08 | 定价公式计算结果≤0 | 阻止保存 | 提示「定价结果无效」 |

## 状态、异常与边界

### 商品状态流转

```
草稿(draft) → [发布] → 已发布(published) → [下架] → 草稿
已发布(published) → [禁用] → 已禁用(disabled) → [启用] → 已发布
```

### 采集任务状态流转

```
待执行(pending) → [开始执行] → 执行中(running) → [完成] → 已完成(completed)
执行中(running) → [失败] → 失败(failed) → [重试] → 执行中
```

### 刊登任务状态流转

```
待执行(pending) → [开始执行] → 执行中(running) → [完成] → 已完成(completed)
执行中(running) → [失败] → 失败(failed) → [重试] → 执行中
```

### 异常处理

- 采集失败：记录失败原因，支持重试
- 刊登失败：记录失败原因，支持重试，已成功的部分保留
- 定价规则异常：使用默认规则或上一级优先级规则
- 库存同步失败：记录失败日志，支持手动触发重试

## 字段、内容与交互要求

### 商品列表页

- 顶部：搜索框（商品名称/SKU编码）、筛选条件（分类/状态/平台）
- 操作区：新增商品、批量导入、批量导出
- 列表：商品主图、名称、SKU数量、平台映射状态、操作（编辑/查看/删除）
- 分页：支持每页10/20/50条

### 商品新增/编辑页

- 基本信息：名称、分类、品牌、产地、描述
- 图片管理：主图上传、多图上传（支持拖拽排序）
- SKU列表：规格属性、成本价、售价、条形码
- 平台映射：各平台SKU对应关系
- 按钮：保存草稿、发布

### 新建采集任务页

- 平台选择：下拉选择采集平台
- 目标链接：多行输入框，支持批量粘贴
- 采集规则：选择采集字段（标题/价格/图片/描述等）
- 按钮：开始采集

### 新建刊登任务页

- 商品选择：从商品列表选择待刊登商品
- 目标平台：选择刊登平台和店铺
- 刊登配置：标题模板、描述模板、价格规则
- 按钮：预览、确认刊登

### 定价规则新增/编辑页

- 规则名称：文本输入
- 优先级：数字输入（1-999）
- 适用范围：平台/站点/店铺多级选择
- 定价公式：成本价倍数、固定加价、百分比加价
- 按钮：保存、启用/停用

## 验收标准与来源追溯

- 产品验收：商品CRUD流程完整，采集/刊登任务可正常执行，定价规则优先级正确
- 设计验收：界面布局合理，操作流程清晰
- 实现验收：SKU编码唯一性校验生效，库存同步强覆盖机制正常
- 来源追溯：PRD文档 §3.1 商品中心

## 开放问题

- 采集任务的最大并发数量限制待确认
- 刊登任务失败后的重试次数上限待确认
- 定价规则的最大嵌套层级待确认
- 库存同步的频率（实时/定时）待确认
