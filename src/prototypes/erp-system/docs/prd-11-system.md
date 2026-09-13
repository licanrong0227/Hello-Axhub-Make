# 跨境ERP系统 - 系统管理 PRD

## 文档目录与关联文档

| 文档 | 职责 |
|------|------|
| 本文档 | 系统管理模块的产品需求定义 |
| `prd-01-portal.md` | 系统门户（登录与导航，引用用户认证） |
| `prd-02-dashboard.md` | 工作台首页（待办事项与消息通知） |
| `prd-10-reports.md` | 数据看板（引用数据权限范围控制） |

## 背景与问题

系统管理是跨境ERP的基础设施模块，提供用户管理、角色权限、店铺授权、平台映射、审批流程、消息中心和操作日志等能力。当前问题：权限控制仅模块级，无法按数据范围精细控制；审批流程缺乏统一配置，各模块各自实现；编码流水号无统一规则，重复编码风险高；操作日志不完整，审计追溯困难。

## 目标与成功标准

1. 建立用户全生命周期管理，支持增删改查与状态控制
2. 实现权限模块/数据范围两级控制模型，精确控制数据访问
3. 建立店铺授权管理，统一管理多平台店铺授权状态
4. 实现平台映射配置，统一管理不同平台的字段映射关系
5. 建立审批流程引擎，支持会签审批规则配置
6. 实现消息中心，统一管理系统消息与业务通知
7. 建立操作日志体系，完整记录所有关键操作
8. 实现编码流水号规则，支持日重置

## 用户、角色与场景

| 角色 | 场景 |
|------|------|
| 超级管理员 | 管理用户、角色、权限配置，管理系统参数 |
| 管理员 | 管理店铺授权、平台映射、审批流程配置 |
| 运营人员 | 查看消息通知，处理审批单据 |
| 审计人员 | 查看操作日志，追溯操作记录 |
| 所有用户 | 查看个人消息，处理待审批事项 |

## 范围

### 本次包含

- 用户列表页（用户管理、状态控制、批量操作）
- 角色管理页（角色配置、权限分配、数据范围设置）
- 店铺授权列表页（多平台店铺授权管理、授权状态监控）
- 平台映射列表页（平台字段映射规则配置）
- 审批流程列表页（审批流程配置、会签规则、审批节点管理）
- 消息中心（消息列表、已读/未读、消息分类）
- 操作日志列表页（操作记录查询、审计追溯）
- 权限模块/数据范围两级控制
- 会签审批规则引擎
- 编码流水号日重置

### 不在本次范围

- SSO/OAuth第三方登录集成
- 多因素认证（MFA）
- 组织架构管理（部门/岗位树）
- 审批流程可视化设计器
- 消息推送（短信/邮件/企业微信）

## 用户故事

1. 作为超级管理员，我希望创建和管理用户账号，从而控制系统的访问入口
2. 作为超级管理员，我希望创建角色并分配模块权限和数据范围，从而实现精细权限控制
3. 作为管理员，我希望管理多平台店铺授权状态，从而及时发现授权过期问题
4. 作为管理员，我希望配置平台字段映射规则，从而确保跨平台数据一致性
5. 作为管理员，我希望配置审批流程和会签规则，从而规范业务审批
6. 作为运营人员，我希望在消息中心查看系统通知和审批提醒，从而及时处理待办
7. 作为审计人员，我希望查看完整操作日志，从而追溯问题操作

## 能力与信息架构

```
系统管理
├── 用户列表页
│   ├── 用户列表（搜索/筛选/分页）
│   ├── 新增/编辑用户
│   ├── 启用/禁用/删除用户
│   └── 重置密码
├── 角色管理页
│   ├── 角色列表
│   ├── 新增/编辑角色
│   ├── 模块权限配置（功能权限）
│   └── 数据范围配置（数据权限）
├── 店铺授权列表页
│   ├── 授权列表（平台/店铺/状态/到期时间）
│   ├── 授权状态监控
│   └── 授权到期提醒
├── 平台映射列表页
│   ├── 映射规则列表
│   ├── 新增/编辑映射规则
│   └── 映射规则测试
├── 审批流程列表页
│   ├── 流程列表
│   ├── 新增/编辑流程
│   ├── 审批节点配置
│   └── 会签规则配置
├── 消息中心
│   ├── 消息列表（已读/未读）
│   ├── 消息分类（系统/审批/预警）
│   └── 消息详情
└── 操作日志列表页
    ├── 日志列表（搜索/筛选/分页）
    ├── 操作详情查看
    └── 日志导出
```

## 数据模型

### User（用户）

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| id | string | 是 | 用户ID |
| username | string | 是 | 用户名（唯一） |
| password | string | 是 | 密码（加密存储） |
| displayName | string | 是 | 显示名称 |
| email | string | 否 | 邮箱 |
| phone | string | 否 | 手机号 |
| avatar | string | 否 | 头像URL |
| roleIds | string[] | 是 | 关联角色ID列表 |
| dataScope | enum | 是 | 数据范围：all/organization/area/shop/warehouse/personal |
| dataScopeIds | string[] | 否 | 数据范围关联ID列表（店铺ID/仓库ID等） |
| status | enum | 是 | 状态：active/disabled/locked |
| lastLoginAt | datetime | 否 | 最后登录时间 |
| lastLoginIp | string | 否 | 最后登录IP |
| loginFailCount | number | 是 | 连续登录失败次数 |
| lockedUntil | datetime | 否 | 锁定截止时间 |
| createdBy | string | 是 | 创建人 |
| createdAt | datetime | 是 | 创建时间 |
| updatedAt | datetime | 是 | 更新时间 |

### Role（角色）

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| id | string | 是 | 角色ID |
| roleName | string | 是 | 角色名称（唯一） |
| roleCode | string | 是 | 角色编码（唯一） |
| description | string | 否 | 角色描述 |
| permissions | Permission[] | 是 | 权限列表 |
| dataScopeDefault | enum | 是 | 默认数据范围 |
| isSystem | boolean | 是 | 是否系统内置角色 |
| sortOrder | number | 是 | 排序号 |
| status | enum | 是 | 状态：active/inactive |
| createdBy | string | 是 | 创建人 |
| createdAt | datetime | 是 | 创建时间 |
| updatedAt | datetime | 是 | 更新时间 |

### Permission（权限）

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| id | string | 是 | 权限ID |
| roleId | string | 是 | 关联角色ID |
| moduleCode | string | 是 | 模块编码（portal/orders/products/inventory/procurement/logistics/finance/aftersales/reports/system） |
| permissions | string[] | 是 | 操作权限列表：view/create/edit/delete/export/import/approve |
| dataScope | enum | 是 | 数据范围：all/organization/area/shop/warehouse/personal/custom |
| dataScopeIds | string[] | 否 | 自定义数据范围ID列表 |
| conditions | object | 否 | 附加条件（如时间范围、金额范围等） |

### ShopAuthorization（店铺授权）

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| id | string | 是 | 授权ID |
| shopId | string | 是 | 店铺ID |
| shopName | string | 是 | 店铺名称 |
| platform | enum | 是 | 平台：amazon/ebay/shopee/lazada/aliexpress/wish/joom/walmart |
| platformShopId | string | 是 | 平台店铺ID |
| authorizationToken | string | 是 | 授权Token（加密存储） |
| refreshToken | string | 否 | 刷新Token |
| expiresAt | datetime | 是 | 授权过期时间 |
| refreshExpiresAt | datetime | 否 | 刷新Token过期时间 |
| authorizationStatus | enum | 是 | 授权状态：authorized/expiring/expired/revoked |
| scope | string | 否 | 授权范围 |
| lastSyncAt | datetime | 否 | 最后同步时间 |
| syncStatus | enum | 是 | 同步状态：normal/failed/pending |
| status | enum | 是 | 状态：active/inactive |
| createdBy | string | 是 | 创建人 |
| createdAt | datetime | 是 | 创建时间 |
| updatedAt | datetime | 是 | 更新时间 |

### PlatformMapping（平台映射）

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| id | string | 是 | 映射规则ID |
| ruleName | string | 是 | 规则名称 |
| platform | enum | 是 | 平台 |
| mappingType | enum | 是 | 映射类型：order/product/inventory/after-sale |
| sourceField | string | 是 | 源字段（ERP字段名） |
| targetField | string | 是 | 目标字段（平台字段名） |
| dataType | enum | 是 | 数据类型：string/number/boolean/date/array |
| transformRule | string | 否 | 转换规则（表达式） |
| defaultValue | string | 否 | 默认值 |
| required | boolean | 是 | 是否必填 |
| validationRule | string | 否 | 校验规则（正则表达式） |
| description | string | 否 | 字段说明 |
| status | enum | 是 | 状态：active/inactive |
| createdBy | string | 是 | 创建人 |
| createdAt | datetime | 是 | 创建时间 |
| updatedAt | datetime | 是 | 更新时间 |

### ApprovalFlow（审批流程）

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| id | string | 是 | 流程ID |
| flowName | string | 是 | 流程名称 |
| flowCode | string | 是 | 流程编码（唯一） |
| flowType | enum | 是 | 流程类型：order_adjust/inventory_adjust/price_adjust/refund/procurement/custom |
| description | string | 否 | 流程描述 |
| nodes | ApprovalNode[] | 是 | 审批节点列表 |
| approvalRule | enum | 是 | 审批规则：sequential/parallel/any_one/all_required |
| timeoutHours | number | 否 | 超时时间（小时） |
| timeoutAction | enum | 否 | 超时动作：auto_approve/auto_reject/notify/escalate |
| status | enum | 是 | 状态：active/inactive |
| createdBy | string | 是 | 创建人 |
| createdAt | datetime | 是 | 创建时间 |
| updatedAt | datetime | 是 | 更新时间 |

### ApprovalNode（审批节点）

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| id | string | 是 | 节点ID |
| flowId | string | 是 | 关联流程ID |
| nodeName | string | 是 | 节点名称 |
| nodeType | enum | 是 | 节点类型：approver/counter_sign/condition |
| approverType | enum | 是 | 审批人类型：role/user/department/creator_manager |
| approverIds | string[] | 是 | 审批人ID列表 |
| isCounterSign | boolean | 是 | 是否会签节点 |
| counterSignRule | enum | 否 | 会签规则：majority/all/any（多数通过/全部通过/任一通过） |
| sortOrder | number | 是 | 节点顺序 |
| timeoutHours | number | 否 | 节点超时时间（小时） |
| condition | string | 否 | 条件表达式（节点间条件流转） |

### Message（消息）

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| id | string | 是 | 消息ID |
| messageType | enum | 是 | 消息类型：system/approval/warning/business |
| title | string | 是 | 消息标题 |
| content | string | 是 | 消息内容 |
| targetUserId | string | 是 | 目标用户ID |
| relatedModule | string | 否 | 关联模块 |
| relatedId | string | 否 | 关联业务ID |
| relatedUrl | string | 否 | 关联跳转链接 |
| priority | enum | 是 | 优先级：low/medium/high/urgent |
| isRead | boolean | 是 | 是否已读 |
| readAt | datetime | 否 | 阅读时间 |
| expireAt | datetime | 否 | 过期时间 |
| status | enum | 是 | 状态：active/deleted |
| createdAt | datetime | 是 | 创建时间 |

### AuditLog（操作日志）

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| id | string | 是 | 日志ID |
| userId | string | 是 | 操作用户ID |
| username | string | 是 | 操作用户名 |
| module | string | 是 | 操作模块 |
| action | string | 是 | 操作类型：create/update/delete/export/import/approve/login/logout |
| targetId | string | 否 | 操作目标ID |
| targetType | string | 否 | 操作目标类型 |
| description | string | 是 | 操作描述 |
| beforeData | object | 否 | 操作前数据（JSON） |
| afterData | object | 否 | 操作后数据（JSON） |
| ipAddress | string | 是 | 操作IP地址 |
| userAgent | string | 否 | 浏览器UA |
| result | enum | 是 | 操作结果：success/failed |
| errorMessage | string | 否 | 错误信息 |
| duration | number | 否 | 操作耗时（毫秒） |
| createdAt | datetime | 是 | 创建时间 |

### EncodingRule（编码流水号规则）

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| id | string | 是 | 规则ID |
| ruleName | string | 是 | 规则名称 |
| ruleCode | string | 是 | 规则编码（唯一） |
| module | string | 是 | 适用模块 |
| objectType | string | 是 | 业务对象类型（order/inbound/outbound/stocktake/transfer/expense） |
| prefix | string | 是 | 前缀（如 SO/PO/OUT/ST） |
| separator | string | 否 | 分隔符（如 -） |
| includeDate | boolean | 是 | 是否包含日期 |
| dateFormat | string | 否 | 日期格式（如 yyyyMMdd/yyMM） |
| serialLength | number | 是 | 流水号位数 |
| serialResetRule | enum | 是 | 重置规则：daily/weekly/monthly/yearly/never |
| currentSerial | number | 是 | 当前流水号 |
| lastResetDate | datetime | 否 | 上次重置日期 |
| status | enum | 是 | 状态：active/inactive |
| createdAt | datetime | 是 | 创建时间 |
| updatedAt | datetime | 是 | 更新时间 |

## 业务规则

| 编号 | 条件 | 动作 | 结果 |
|------|------|------|------|
| BR-01 | 用户连续登录失败>=5次 | 锁定账户30分钟 | 提示「账户已锁定，请30分钟后重试」 |
| BR-02 | 用户被禁用 | 阻止登录 | 提示「账户已被禁用，请联系管理员」 |
| BR-03 | 分配角色时存在权限冲突 | 采用最高权限 | 合并多个角色权限，取并集 |
| BR-04 | 删除角色时有用户关联 | 阻止删除 | 提示「该角色下有用户，无法删除」 |
| BR-05 | 店铺授权即将过期（<7天） | 生成预警消息 | 通知管理员续期 |
| BR-06 | 店铺授权已过期 | 标记授权失效 | 阻止该店铺数据同步 |
| BR-07 | 审批流程触发 | 按节点顺序发起审批 | 依次通知各节点审批人 |
| BR-08 | 会签节点审批 | 按会签规则判断 | majority=多数通过，all=全部通过，any=任一通过 |
| BR-09 | 审批超时 | 按超时动作处理 | auto_approve=自动通过，auto_reject=自动拒绝 |
| BR-10 | 编码流水号日重置 | 每日00:00重置 | 流水号从001开始重新计数 |
| BR-11 | 生成编码流水号 | 按规则拼接 | 前缀+日期+流水号（如 SO-20260914-001） |
| BR-12 | 流水号达到最大位数 | 阻止生成 | 提示「编码已达上限，请联系管理员」 |
| BR-13 | 用户查看消息 | 标记已读 | 更新消息状态为已读 |
| BR-14 | 消息超过过期时间 | 自动删除 | 从消息列表中移除 |
| BR-15 | 操作关键业务 | 记录操作日志 | 写入操作日志，包含操作前后数据 |

## 权限与作用范围

### 两级权限控制模型

**第一级：模块权限（功能权限）**

| 模块 | 权限项 | 说明 |
|------|--------|------|
| portal | view | 查看门户首页 |
| orders | view/create/edit/delete/export/approve | 订单模块操作权限 |
| products | view/create/edit/delete/import/export | 商品模块操作权限 |
| inventory | view/create/edit/delete/export | 库存模块操作权限 |
| procurement | view/create/edit/delete/export/approve | 采购模块操作权限 |
| logistics | view/create/edit/delete/export | 物流模块操作权限 |
| finance | view/create/edit/delete/export/approve | 财务模块操作权限 |
| aftersales | view/create/edit/delete/export | 售后模块操作权限 |
| reports | view/export | 报表模块操作权限 |
| system | view/create/edit/delete | 系统管理操作权限 |

**第二级：数据范围（数据权限）**

| 数据范围 | 说明 | 适用角色 |
|----------|------|----------|
| all | 全部数据 | 超级管理员 |
| organization | 所管辖组织数据 | 总部管理层 |
| area | 所管辖区域数据 | 区域经理 |
| shop | 所管辖店铺数据 | 店铺运营 |
| warehouse | 所管辖仓库数据 | 仓库人员 |
| personal | 个人创建数据 | 普通员工 |
| custom | 自定义数据范围 | 特殊角色 |

### 权限校验规则

| 编号 | 条件 | 动作 | 结果 |
|------|------|------|------|
| PR-01 | 用户拥有模块权限+数据范围 | 允许访问 | 返回对应数据 |
| PR-02 | 用户无模块权限 | 拒绝访问 | 提示「无权限访问该模块」 |
| PR-03 | 用户有模块权限但无数据范围 | 返回空数据 | 提示「当前权限范围无数据」 |
| PR-04 | 用户尝试修改他人数据 | 检查数据范围 | 超出范围则拒绝修改 |
| PR-05 | 管理员修改用户数据范围 | 校验范围合法性 | 数据范围ID必须在系统中存在 |

## 状态、异常与边界

### 用户状态流转

```
正常(active) → [禁用] → 已禁用(disabled) → [启用] → 正常(active)
正常(active) → [锁定] → 已锁定(locked) → [等待] → 正常(active)
正常(active) → [删除] → 已删除(deleted)
```

### 店铺授权状态流转

```
已授权(authorized) → [即将过期] → 即将过期(expiring) → [过期] → 已过期(expired)
已授权(authorized) → [撤销] → 已撤销(revoked)
已过期(expired) → [重新授权] → 已授权(authorized)
```

### 审批流程状态流转

```
待审批(pending) → [审批中] → 审批中(approving) → [通过] → 已通过(approved)
待审批(pending) → [审批中] → 审批中(approving) → [拒绝] → 已拒绝(rejected)
待审批(pending) → [超时] → 已超时(timeout)
审批中(approving) → [撤回] → 已撤回(withdrawn)
```

### 异常处理

- 用户登录失败次数过多：自动锁定账户，记录失败日志
- 角色权限配置冲突：采用最高权限策略
- 审批流程节点超时：按超时动作自动处理
- 编码流水号生成失败：记录异常日志，支持手动重置
- 消息发送失败：记录失败原因，支持重试
- 操作日志写入失败：不影响业务操作，记录错误日志

### 边界情况

- 同一用户分配多个角色：权限取并集
- 删除用户时有关联数据：标记删除，保留历史数据
- 审批流程只有1个节点：直接审批，无需会签
- 编码流水号前缀为空：不允许，必须设置前缀
- 消息内容为空：不允许发送
- 操作日志数据量过大：按时间自动归档

## 字段、内容与交互要求

### 用户列表页

- **搜索区**：用户名/显示名称/手机号搜索，角色/状态筛选
- **列表**：用户名、显示名称、角色、状态、最后登录时间、操作
- **操作**：新增用户、编辑、启用/禁用、重置密码、删除
- **批量操作**：批量启用、批量禁用、批量删除
- **分页**：支持每页10/20/50条

### 角色管理页

- **角色列表**：角色名称、角色编码、描述、用户数、状态、操作
- **新增/编辑角色**：角色名称、编码、描述、排序
- **权限配置**：模块权限树形选择（全选/半选/单选），数据范围下拉选择
- **数据范围配置**：数据范围类型选择，自定义范围ID选择

### 店铺授权列表页

- **筛选区**：平台/授权状态/同步状态筛选
- **列表**：店铺名称、平台、授权状态、授权过期时间、同步状态、最后同步时间、操作
- **授权状态标识**：绿色=已授权，黄色=即将过期，红色=已过期，灰色=已撤销
- **操作**：新增授权、重新授权、撤销授权、查看授权详情

### 平台映射列表页

- **筛选区**：平台/映射类型/状态筛选
- **列表**：规则名称、平台、映射类型、源字段、目标字段、状态、操作
- **新增/编辑**：平台选择、映射类型、源字段、目标字段、转换规则、校验规则
- **操作**：测试映射规则（输入测试数据，查看转换结果）

### 审批流程列表页

- **流程列表**：流程名称、流程类型、审批规则、节点数、状态、操作
- **流程配置**：流程名称、类型、审批规则（顺序/并行/会签）、超时设置
- **节点配置**：节点名称、节点类型、审批人选择、会签规则、排序
- **可视化**：流程节点连接线展示（简化版流程图）

### 消息中心

- **消息列表**：消息标题、类型标签、优先级标识、已读状态、时间
- **筛选**：消息类型/已读状态/时间范围
- **操作**：标记已读、批量标记已读、删除
- **消息详情**：标题、内容、关联模块跳转链接
- **未读数**：顶部导航栏显示未读消息数红点

### 操作日志列表页

- **筛选区**：用户/模块/操作类型/时间范围/操作结果筛选
- **列表**：时间、用户、模块、操作、目标、结果、IP地址
- **详情查看**：点击查看操作前后数据对比（JSON格式展示）
- **导出**：支持导出日志文件
- **分页**：支持每页20/50/100条

### 通用交互要求

- 表单提交前进行前端校验
- 删除操作需二次确认
- 状态切换使用开关控件
- 批量操作前勾选确认
- 加载状态显示骨架屏或loading
- 操作成功/失败显示toast提示

## 非功能要求

- 操作日志保留时间不少于3年
- 密码存储使用bcrypt加密
- 用户密码最少8位，包含大小写字母和数字
- 登录失败锁定时间30分钟
- 会话超时时间可配置（默认30分钟）
- 敏感操作（删除、权限变更）需记录操作日志

## 验收标准与来源追溯

- 产品验收：用户管理完整，权限两级控制生效，审批流程配置正确，消息通知正常
- 设计验收：界面布局合理，操作流程清晰，状态标识明确
- 实现验收：编码流水号日重置正确，会签审批规则生效，操作日志记录完整
- 来源追溯：PRD文档 §3.9 系统管理

## 开放问题

- 用户密码复杂度具体规则待确认（大小写+数字+特殊字符？）
- 会签审批的「多数通过」具体比例待确认（>50%？>=50%？）
- 编码流水号最大位数限制待确认
- 操作日志自动归档的触发条件待确认
- 消息过期后的处理方式待确认（自动删除/隐藏？）
- 店铺授权Token的刷新机制待确认
- 审批流程撤回权限的控制规则待确认
- 组织架构管理的范围和深度待确认
