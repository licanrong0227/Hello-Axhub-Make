import React, { useState } from 'react';
import {
  Search,
  Plus,
  Edit3,
  Trash2,
  ArrowLeft,
  ChevronDown,
  ChevronRight,
  Check,
  X,
  GripVertical,
  Eye,
  FileText,
  AlertTriangle,
  Bell,
  Shield,
  Users,
  Store,
  Settings,
  RefreshCw,
  Clock,
  MessageSquare,
  ClipboardList,
  Key,
  Link,
  Unlink,
} from 'lucide-react';

/* ───────────── Mock Data ───────────── */

interface User {
  id: string;
  username: string;
  realName: string;
  phone: string;
  email: string;
  role: string;
  status: string;
}

const mockUsers: User[] = [
  { id: '1', username: 'admin', realName: '张伟', phone: '13800001111', email: 'zhangwei@example.com', role: '超级管理员', status: '启用' },
  { id: '2', username: 'wangfang', realName: '王芳', phone: '13800002222', email: 'wangfang@example.com', role: '运营主管', status: '启用' },
  { id: '3', username: 'liuyang', realName: '刘洋', phone: '13800003333', email: 'liuyang@example.com', role: '仓库管理员', status: '启用' },
  { id: '4', username: 'chenxi', realName: '陈曦', phone: '13800004444', email: 'chenxi@example.com', role: '客服专员', status: '停用' },
  { id: '5', username: 'zhaolei', realName: '赵磊', phone: '13800005555', email: 'zhaolei@example.com', role: '运营主管', status: '启用' },
];

interface Role {
  id: string;
  name: string;
  description: string;
  userCount: number;
  status: string;
}

const mockRoles: Role[] = [
  { id: '1', name: '超级管理员', description: '拥有系统所有权限', userCount: 1, status: '启用' },
  { id: '2', name: '运营主管', description: '管理商品、订单、刊登等运营功能', userCount: 2, status: '启用' },
  { id: '3', name: '仓库管理员', description: '管理库存、出入库、盘点等仓储功能', userCount: 1, status: '启用' },
];

interface ShopAuth {
  id: string;
  platform: string;
  shopName: string;
  status: string;
  expiryDate: string;
  daysLeft: number;
}

const mockShopAuths: ShopAuth[] = [
  { id: '1', platform: '亚马逊', shopName: 'Amazon US Store', status: '已授权', expiryDate: '2026-10-01', daysLeft: 18 },
  { id: '2', platform: 'Shopee', shopName: 'Shopee MY Store', status: '已授权', expiryDate: '2026-09-19', daysLeft: 6 },
  { id: '3', platform: 'TEMU', shopName: 'TEMU 官方店', status: '已授权', expiryDate: '2026-09-15', daysLeft: 2 },
  { id: '4', platform: '速卖通', shopName: 'AliExpress Store', status: '已过期', expiryDate: '2026-09-10', daysLeft: 0 },
  { id: '5', platform: 'Lazada', shopName: 'Lazada TH Store', status: '已授权', expiryDate: '2026-12-31', daysLeft: 109 },
];

interface Message {
  id: string;
  type: string;
  title: string;
  time: string;
  read: boolean;
}

const mockMessages: Message[] = [
  { id: '1', type: '审批待办', title: '采购单 PO-20260913001 待您审批', time: '2026-09-13 10:30', read: false },
  { id: '2', type: '库存预警', title: 'SKU-A001-01 当前库存低于安全库存', time: '2026-09-13 09:15', read: false },
  { id: '3', type: '异常订单', title: '订单 ORD-88901 物流异常，已超过5天未更新', time: '2026-09-12 16:00', read: true },
  { id: '4', type: '刊登失败', title: '商品 SPU-20260912002 刊登至 Shopee 失败', time: '2026-09-12 14:30', read: true },
  { id: '5', type: '同步失败', title: '亚马逊库存同步失败，共 3 个 SKU', time: '2026-09-12 11:00', read: false },
];

interface AuditLog {
  id: string;
  operator: string;
  module: string;
  type: string;
  content: string;
  ip: string;
  time: string;
}

const mockAuditLogs: AuditLog[] = [
  { id: '1', operator: '张伟', module: '用户管理', type: '新增', content: '新增用户 zhaolei（赵磊）', ip: '192.168.1.100', time: '2026-09-13 10:00' },
  { id: '2', operator: '张伟', module: '角色管理', type: '编辑', content: '修改角色"运营主管"权限配置', ip: '192.168.1.100', time: '2026-09-13 09:45' },
  { id: '3', operator: '王芳', module: '店铺授权', type: '新增', content: '新增 Shopee MY Store 授权', ip: '192.168.1.101', time: '2026-09-12 16:30' },
  { id: '4', operator: '王芳', module: '平台映射', type: '编辑', content: '修改亚马逊 SPU 映射关系', ip: '192.168.1.101', time: '2026-09-12 15:00' },
  { id: '5', operator: '刘洋', module: '审批流程', type: '新增', content: '新建采购审批流程 v2', ip: '192.168.1.102', time: '2026-09-12 14:00' },
  { id: '6', operator: '张伟', module: '编码规则', type: '编辑', content: '修改订单号编码规则前缀为 ORD', ip: '192.168.1.100', time: '2026-09-12 11:30' },
  { id: '7', operator: '赵磊', module: '用户管理', type: '编辑', content: '修改用户 chenxi 状态为停用', ip: '192.168.1.103', time: '2026-09-11 17:00' },
  { id: '8', operator: '张伟', module: '店铺授权', type: '删除', content: '删除过期的速卖通授权', ip: '192.168.1.100', time: '2026-09-11 16:00' },
  { id: '9', operator: '王芳', module: '审批流程', type: '编辑', content: '调整库存盘点审批节点顺序', ip: '192.168.1.101', time: '2026-09-11 14:30' },
  { id: '10', operator: '张伟', module: '编码规则', type: '新增', content: '新增 SKU 编码规则', ip: '192.168.1.100', time: '2026-09-10 10:00' },
];

/* ───────────── UserListPage ───────────── */

export function UserListPage({ onNavigate }: { onNavigate: (page: string) => void }) {
  const [searchText, setSearchText] = useState('');

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">用户列表</h2>
        <button className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700">
          <Plus size={16} /> 新增用户
        </button>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="grid grid-cols-4 gap-3">
          <input
            type="text"
            placeholder="用户名/姓名/手机号"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="px-3 py-1.5 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <select className="px-3 py-1.5 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-600">
            <option value="">全部角色</option>
            <option>超级管理员</option>
            <option>运营主管</option>
            <option>仓库管理员</option>
            <option>客服专员</option>
          </select>
          <select className="px-3 py-1.5 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-600">
            <option value="">全部状态</option>
            <option>启用</option>
            <option>停用</option>
          </select>
          <div className="flex gap-2">
            <button className="px-4 py-1.5 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 flex items-center gap-1">
              <Search size={14} /> 查询
            </button>
            <button className="px-3 py-1.5 border border-gray-200 text-sm rounded-md hover:bg-gray-50 text-gray-600">重置</button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 text-left">
              <th className="px-4 py-3 font-medium text-gray-600">用户名</th>
              <th className="px-4 py-3 font-medium text-gray-600">姓名</th>
              <th className="px-4 py-3 font-medium text-gray-600">手机号</th>
              <th className="px-4 py-3 font-medium text-gray-600">邮箱</th>
              <th className="px-4 py-3 font-medium text-gray-600">角色</th>
              <th className="px-4 py-3 font-medium text-gray-600">状态</th>
              <th className="px-4 py-3 font-medium text-gray-600">操作</th>
            </tr>
          </thead>
          <tbody>
            {mockUsers.map((u) => (
              <tr key={u.id} className="border-b border-gray-50 hover:bg-gray-50">
                <td className="px-4 py-3 font-medium text-gray-900">{u.username}</td>
                <td className="px-4 py-3 text-gray-600">{u.realName}</td>
                <td className="px-4 py-3 text-gray-600">{u.phone}</td>
                <td className="px-4 py-3 text-gray-500 text-xs">{u.email}</td>
                <td className="px-4 py-3">
                  <span className="px-2 py-0.5 text-xs rounded bg-blue-50 text-blue-700">{u.role}</span>
                </td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-0.5 text-xs rounded ${u.status === '启用' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                    {u.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1">
                    <button className="p-1 rounded hover:bg-gray-100 text-gray-400 hover:text-blue-600">
                      <Edit3 size={14} />
                    </button>
                    <button className="p-1 rounded hover:bg-gray-100 text-gray-400 hover:text-red-600">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100">
          <span className="text-sm text-gray-500">共 {mockUsers.length} 条</span>
          <div className="flex items-center gap-1">
            <button className="px-3 py-1 text-sm border border-gray-200 rounded hover:bg-gray-50 text-gray-400" disabled>上一页</button>
            <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded">1</button>
            <button className="px-3 py-1 text-sm border border-gray-200 rounded hover:bg-gray-50 text-gray-600">下一页</button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ───────────── RoleManagePage ───────────── */

export function RoleManagePage({ onNavigate }: { onNavigate: (page: string) => void }) {
  const [selectedRole, setSelectedRole] = useState('1');

  const permissionTree = [
    { module: '商品管理', perms: ['商品列表', '新增商品', '编辑商品', '删除商品', '商品采集', '商品刊登'] },
    { module: '订单管理', perms: ['订单列表', '订单详情', '订单审核', '批量发货'] },
    { module: '库存管理', perms: ['库存列表', '出入库管理', '库存盘点', '库存预警'] },
    { module: '系统管理', perms: ['用户管理', '角色管理', '权限配置', '店铺授权', '操作日志'] },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">角色管理</h2>
        <button className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700">
          <Plus size={16} /> 新增角色
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-1 bg-white rounded-lg border border-gray-200">
          <div className="px-4 py-3 border-b border-gray-100">
            <h3 className="text-sm font-medium text-gray-900">角色列表</h3>
          </div>
          <div className="divide-y divide-gray-50">
            {mockRoles.map((role) => (
              <button
                key={role.id}
                onClick={() => setSelectedRole(role.id)}
                className={`w-full text-left px-4 py-3 transition-colors ${
                  selectedRole === role.id ? 'bg-blue-50 border-l-2 border-blue-500' : 'hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-900">{role.name}</span>
                  <span className="text-xs text-gray-400">{role.userCount}人</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">{role.description}</p>
              </button>
            ))}
          </div>
        </div>

        <div className="col-span-2 bg-white rounded-lg border border-gray-200">
          <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-900">权限配置 - {mockRoles.find((r) => r.id === selectedRole)?.name}</h3>
            <button className="px-3 py-1.5 bg-blue-600 text-white text-xs rounded-md hover:bg-blue-700">保存</button>
          </div>
          <div className="p-4 space-y-4">
            {permissionTree.map((group) => (
              <div key={group.module}>
                <div className="flex items-center gap-2 mb-2">
                  <input type="checkbox" className="rounded" defaultChecked />
                  <span className="text-sm font-medium text-gray-900">{group.module}</span>
                </div>
                <div className="ml-6 grid grid-cols-4 gap-2">
                  {group.perms.map((perm) => (
                    <label key={perm} className="flex items-center gap-1.5 text-sm text-gray-600">
                      <input type="checkbox" className="rounded" defaultChecked />
                      {perm}
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ───────────── PermissionConfigPage ───────────── */

export function PermissionConfigPage({ onNavigate }: { onNavigate: (page: string) => void }) {
  const modules = [
    { name: '商品管理', ops: ['查看', '编辑', '删除', '审核'] },
    { name: '订单管理', ops: ['查看', '编辑', '删除', '审核'] },
    { name: '库存管理', ops: ['查看', '编辑', '删除', '审核'] },
    { name: '采购管理', ops: ['查看', '编辑', '删除', '审核'] },
    { name: '物流管理', ops: ['查看', '编辑', '删除', '审核'] },
    { name: '售后管理', ops: ['查看', '编辑', '删除', '审核'] },
  ];

  const dataScopes = ['平台', '站点', '店铺', '仓库'];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">权限配置</h2>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <h3 className="text-sm font-medium text-gray-900 mb-3">选择角色</h3>
        <select className="w-64 px-3 py-1.5 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500">
          {mockRoles.map((r) => (
            <option key={r.id} value={r.id}>{r.name}</option>
          ))}
        </select>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <h3 className="text-sm font-medium text-gray-900 mb-3">操作权限</h3>
        <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left font-medium text-gray-600">模块</th>
              {modules[0].ops.map((op) => (
                <th key={op} className="px-4 py-2 text-center font-medium text-gray-600">{op}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {modules.map((mod) => (
              <tr key={mod.name} className="border-t border-gray-100">
                <td className="px-4 py-2 font-medium text-gray-900">{mod.name}</td>
                {mod.ops.map((op) => (
                  <td key={op} className="px-4 py-2 text-center">
                    <input type="checkbox" className="rounded" defaultChecked={op !== '删除'} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <h3 className="text-sm font-medium text-gray-900 mb-3">数据权限范围</h3>
        <div className="grid grid-cols-4 gap-4">
          {dataScopes.map((scope) => (
            <label key={scope} className="flex items-center gap-2 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
              <input type="radio" name="scope" defaultChecked={scope === '平台'} />
              <span className="text-sm text-gray-700">{scope}</span>
            </label>
          ))}
        </div>
        <p className="text-xs text-gray-400 mt-2">数据范围决定该角色可操作的数据边界：平台 = 全部数据，站点 = 指定站点，店铺 = 指定店铺，仓库 = 指定仓库</p>
      </div>

      <div className="flex justify-end gap-3">
        <button className="px-4 py-2 text-sm border border-gray-200 rounded-md hover:bg-gray-50 text-gray-600">取消</button>
        <button className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700">保存配置</button>
      </div>
    </div>
  );
}

/* ───────────── ShopAuthListPage ───────────── */

export function ShopAuthListPage({ onNavigate }: { onNavigate: (page: string) => void }) {
  const getExpiryColor = (daysLeft: number) => {
    if (daysLeft <= 0) return 'text-red-600 font-medium';
    if (daysLeft < 3) return 'text-red-600 font-medium';
    if (daysLeft < 7) return 'text-orange-500 font-medium';
    return 'text-gray-600';
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">店铺授权列表</h2>
        <button
          onClick={() => onNavigate('shop-auth-add')}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700"
        >
          <Plus size={16} /> 新增授权
        </button>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="grid grid-cols-4 gap-3">
          <select className="px-3 py-1.5 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-600">
            <option value="">全部平台</option>
            <option>亚马逊</option>
            <option>Shopee</option>
            <option>TEMU</option>
            <option>速卖通</option>
            <option>Lazada</option>
          </select>
          <select className="px-3 py-1.5 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-600">
            <option value="">全部状态</option>
            <option>已授权</option>
            <option>已过期</option>
          </select>
          <input type="text" placeholder="店铺名称" className="px-3 py-1.5 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500" />
          <div className="flex gap-2">
            <button className="px-4 py-1.5 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 flex items-center gap-1">
              <Search size={14} /> 查询
            </button>
            <button className="px-3 py-1.5 border border-gray-200 text-sm rounded-md hover:bg-gray-50 text-gray-600">重置</button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 text-left">
              <th className="px-4 py-3 font-medium text-gray-600">平台</th>
              <th className="px-4 py-3 font-medium text-gray-600">店铺名称</th>
              <th className="px-4 py-3 font-medium text-gray-600">授权状态</th>
              <th className="px-4 py-3 font-medium text-gray-600">到期日期</th>
              <th className="px-4 py-3 font-medium text-gray-600">剩余天数</th>
              <th className="px-4 py-3 font-medium text-gray-600">操作</th>
            </tr>
          </thead>
          <tbody>
            {mockShopAuths.map((auth) => (
              <tr key={auth.id} className="border-b border-gray-50 hover:bg-gray-50">
                <td className="px-4 py-3 font-medium text-gray-900">{auth.platform}</td>
                <td className="px-4 py-3 text-gray-600">{auth.shopName}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-0.5 text-xs rounded ${auth.status === '已授权' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {auth.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-600">{auth.expiryDate}</td>
                <td className={`px-4 py-3 ${getExpiryColor(auth.daysLeft)}`}>
                  {auth.daysLeft > 0 ? `${auth.daysLeft}天` : '已过期'}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1">
                    <button className="p-1 rounded hover:bg-gray-100 text-gray-400 hover:text-blue-600">
                      <RefreshCw size={14} />
                    </button>
                    <button className="p-1 rounded hover:bg-gray-100 text-gray-400 hover:text-red-600">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ───────────── ShopAuthAddPage ───────────── */

export function ShopAuthAddPage({ onNavigate }: { onNavigate: (page: string) => void }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <button onClick={() => onNavigate('shop-auth-list')} className="p-1 rounded hover:bg-gray-100">
          <ArrowLeft size={18} className="text-gray-600" />
        </button>
        <h2 className="text-lg font-semibold text-gray-900">新增店铺授权</h2>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6 max-w-2xl space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">电商平台 <span className="text-red-500">*</span></label>
          <select className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500">
            <option value="">请选择平台</option>
            <option>亚马逊</option>
            <option>Shopee</option>
            <option>TEMU</option>
            <option>速卖通</option>
            <option>Lazada</option>
            <option>eBay</option>
            <option>TikTok Shop</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">店铺名称 <span className="text-red-500">*</span></label>
          <input type="text" placeholder="请输入店铺名称" className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Seller ID / 店铺ID <span className="text-red-500">*</span></label>
          <input type="text" placeholder="请输入平台分配的店铺ID" className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">API Key <span className="text-red-500">*</span></label>
          <input type="text" placeholder="请输入API Key" className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">API Secret <span className="text-red-500">*</span></label>
          <input type="password" placeholder="请输入API Secret" className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">授权到期日</label>
          <input type="date" className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">备注</label>
          <textarea rows={3} placeholder="可选备注信息" className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500" />
        </div>
        <div className="flex justify-end gap-3 pt-2">
          <button onClick={() => onNavigate('shop-auth-list')} className="px-4 py-2 text-sm border border-gray-200 rounded-md hover:bg-gray-50 text-gray-600">取消</button>
          <button className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700">保存授权</button>
        </div>
      </div>
    </div>
  );
}

/* ───────────── PlatformMappingListPage ───────────── */

export function PlatformMappingListPage({ onNavigate }: { onNavigate: (page: string) => void }) {
  const mappings = [
    { id: '1', platformType: '亚马逊', platformName: 'Amazon.com', fieldCount: 24, status: '已启用' },
    { id: '2', platformType: 'Shopee', platformName: 'Shopee Mall', fieldCount: 18, status: '已启用' },
    { id: '3', platformType: 'TEMU', platformName: 'TEMU 平台', fieldCount: 15, status: '已启用' },
    { id: '4', platformType: '速卖通', platformName: 'AliExpress', fieldCount: 20, status: '已停用' },
    { id: '5', platformType: 'Lazada', platformName: 'Lazada Mall', fieldCount: 16, status: '已启用' },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">平台字典映射</h2>
        <button
          onClick={() => onNavigate('platform-mapping-config')}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700"
        >
          <Plus size={16} /> 新增映射
        </button>
      </div>

      <div className="bg-white rounded-lg border border-gray-200">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 text-left">
              <th className="px-4 py-3 font-medium text-gray-600">平台类型</th>
              <th className="px-4 py-3 font-medium text-gray-600">平台名称</th>
              <th className="px-4 py-3 font-medium text-gray-600">映射字段数</th>
              <th className="px-4 py-3 font-medium text-gray-600">状态</th>
              <th className="px-4 py-3 font-medium text-gray-600">操作</th>
            </tr>
          </thead>
          <tbody>
            {mappings.map((m) => (
              <tr key={m.id} className="border-b border-gray-50 hover:bg-gray-50">
                <td className="px-4 py-3 font-medium text-gray-900">{m.platformType}</td>
                <td className="px-4 py-3 text-gray-600">{m.platformName}</td>
                <td className="px-4 py-3 text-gray-600">{m.fieldCount}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-0.5 text-xs rounded ${m.status === '已启用' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                    {m.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => onNavigate('platform-mapping-config')}
                    className="text-blue-600 text-xs hover:underline mr-2"
                  >
                    配置
                  </button>
                  <button className="text-red-500 text-xs hover:underline">停用</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ───────────── PlatformMappingConfigPage ───────────── */

export function PlatformMappingConfigPage({ onNavigate }: { onNavigate: (page: string) => void }) {
  const [activeTab, setActiveTab] = useState('spu');

  const tabs = [
    { key: 'spu', label: '商品SPU' },
    { key: 'sku', label: 'SKU' },
    { key: 'category', label: '类目' },
    { key: 'order', label: '订单' },
    { key: 'logistics', label: '物流' },
    { key: 'aftersale', label: '售后' },
  ];

  const spuFields = [
    { erp: '商品名称', platform: 'title', mapped: true },
    { erp: '商品描述', platform: 'description', mapped: true },
    { erp: '商品图片', platform: 'main_image', mapped: true },
    { erp: '商品价格', platform: 'price', mapped: true },
    { erp: '商品重量', platform: 'weight', mapped: true },
    { erp: '品牌', platform: 'brand', mapped: false },
    { erp: '商品编码', platform: 'item_id', mapped: true },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <button onClick={() => onNavigate('platform-mapping-list')} className="p-1 rounded hover:bg-gray-100">
          <ArrowLeft size={18} className="text-gray-600" />
        </button>
        <h2 className="text-lg font-semibold text-gray-900">映射配置 - 亚马逊</h2>
      </div>

      <div className="bg-white rounded-lg border border-gray-200">
        <div className="flex border-b border-gray-100">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab.key
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="p-4">
          <div className="grid grid-cols-[1fr_auto_1fr] gap-4 items-start">
            <div className="border border-gray-200 rounded-lg">
              <div className="px-3 py-2 bg-gray-50 border-b border-gray-200 rounded-t-lg">
                <h4 className="text-sm font-medium text-gray-700">ERP 字段</h4>
              </div>
              <div className="divide-y divide-gray-100">
                {spuFields.map((f) => (
                  <div key={f.erp} className={`px-3 py-2.5 text-sm ${f.mapped ? 'bg-blue-50/50' : ''}`}>
                    {f.erp}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col items-center gap-2 pt-8">
              {spuFields.map((f) => (
                <div key={f.erp} className="flex items-center">
                  {f.mapped ? (
                    <Link size={16} className="text-blue-500" />
                  ) : (
                    <Unlink size={16} className="text-gray-300" />
                  )}
                </div>
              ))}
            </div>

            <div className="border border-gray-200 rounded-lg">
              <div className="px-3 py-2 bg-gray-50 border-b border-gray-200 rounded-t-lg">
                <h4 className="text-sm font-medium text-gray-700">亚马逊字段</h4>
              </div>
              <div className="divide-y divide-gray-100">
                {spuFields.map((f) => (
                  <div key={f.platform} className="px-3 py-2.5 text-sm font-mono text-gray-600">
                    {f.platform}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-3">
        <button onClick={() => onNavigate('platform-mapping-list')} className="px-4 py-2 text-sm border border-gray-200 rounded-md hover:bg-gray-50 text-gray-600">取消</button>
        <button className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700">保存映射</button>
      </div>
    </div>
  );
}

/* ───────────── ApprovalFlowListPage ───────────── */

export function ApprovalFlowListPage({ onNavigate }: { onNavigate: (page: string) => void }) {
  const flows = [
    { id: '1', name: '采购审批流程', nodeCount: 3, status: '启用', updatedAt: '2026-09-12' },
    { id: '2', name: '库存盘点审批', nodeCount: 2, status: '启用', updatedAt: '2026-09-11' },
    { id: '3', name: '退款审批流程', nodeCount: 4, status: '停用', updatedAt: '2026-09-10' },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">审批工作流</h2>
        <button
          onClick={() => onNavigate('approval-flow-config')}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700"
        >
          <Plus size={16} /> 新建流程
        </button>
      </div>

      <div className="bg-white rounded-lg border border-gray-200">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 text-left">
              <th className="px-4 py-3 font-medium text-gray-600">流程名称</th>
              <th className="px-4 py-3 font-medium text-gray-600">节点数</th>
              <th className="px-4 py-3 font-medium text-gray-600">状态</th>
              <th className="px-4 py-3 font-medium text-gray-600">更新时间</th>
              <th className="px-4 py-3 font-medium text-gray-600">操作</th>
            </tr>
          </thead>
          <tbody>
            {flows.map((f) => (
              <tr key={f.id} className="border-b border-gray-50 hover:bg-gray-50">
                <td className="px-4 py-3 font-medium text-gray-900">{f.name}</td>
                <td className="px-4 py-3 text-gray-600">{f.nodeCount}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-0.5 text-xs rounded ${f.status === '启用' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                    {f.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-500 text-xs">{f.updatedAt}</td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => onNavigate('approval-flow-config')}
                    className="text-blue-600 text-xs hover:underline mr-2"
                  >
                    配置
                  </button>
                  <button className="text-red-500 text-xs hover:underline">停用</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ───────────── ApprovalFlowConfigPage ───────────── */

export function ApprovalFlowConfigPage({ onNavigate }: { onNavigate: (page: string) => void }) {
  const [nodes, setNodes] = useState([
    { id: '1', name: '部门主管审批', approver: '王芳', signMode: '或签', required: true },
    { id: '2', name: '财务审批', approver: '张伟', signMode: '会签', required: true },
    { id: '3', name: '总经理审批', approver: '张伟', signMode: '或签', required: false },
  ]);

  const moveNode = (index: number, direction: -1 | 1) => {
    setNodes((prev) => {
      const next = [...prev];
      const target = index + direction;
      if (target < 0 || target >= next.length) return prev;
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <button onClick={() => onNavigate('approval-flow-list')} className="p-1 rounded hover:bg-gray-100">
          <ArrowLeft size={18} className="text-gray-600" />
        </button>
        <h2 className="text-lg font-semibold text-gray-900">流程配置 - 采购审批流程</h2>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">流程名称</label>
            <input type="text" defaultValue="采购审批流程" className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">适用场景</label>
            <select className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500">
              <option>采购单审批</option>
              <option>库存盘点审批</option>
              <option>退款审批</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-gray-900">审批节点</h3>
          <button className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 text-white text-xs rounded-md hover:bg-blue-700">
            <Plus size={14} /> 添加节点
          </button>
        </div>

        <div className="space-y-3">
          {nodes.map((node, idx) => (
            <div key={node.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-medium">
                    {idx + 1}
                  </span>
                  <span className="text-sm font-medium text-gray-900">{node.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => moveNode(idx, -1)}
                    disabled={idx === 0}
                    className="p-1 rounded hover:bg-gray-100 text-gray-400 disabled:opacity-30"
                  >
                    <ChevronDown size={14} className="rotate-90" />
                  </button>
                  <button
                    onClick={() => moveNode(idx, 1)}
                    disabled={idx === nodes.length - 1}
                    className="p-1 rounded hover:bg-gray-100 text-gray-400 disabled:opacity-30"
                  >
                    <ChevronRight size={14} className="rotate-90" />
                  </button>
                  <button className="p-1 rounded hover:bg-gray-100 text-gray-400 hover:text-red-600">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3 ml-10">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">审批人</label>
                  <select defaultValue={node.approver} className="w-full px-2 py-1.5 text-sm border border-gray-200 rounded-md">
                    <option>张伟</option>
                    <option>王芳</option>
                    <option>刘洋</option>
                    <option>赵磊</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">签审模式</label>
                  <select defaultValue={node.signMode} className="w-full px-2 py-1.5 text-sm border border-gray-200 rounded-md">
                    <option>或签</option>
                    <option>会签</option>
                  </select>
                </div>
                <div className="flex items-end">
                  <label className="flex items-center gap-2 text-sm">
                    <input type="checkbox" className="rounded" defaultChecked={node.required} />
                    <span className="text-gray-600">必须审批</span>
                  </label>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end gap-3">
        <button onClick={() => onNavigate('approval-flow-list')} className="px-4 py-2 text-sm border border-gray-200 rounded-md hover:bg-gray-50 text-gray-600">取消</button>
        <button className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700">保存流程</button>
      </div>
    </div>
  );
}

/* ───────────── CodeRulePage ───────────── */

export function CodeRulePage({ onNavigate }: { onNavigate: (page: string) => void }) {
  const [selectedObject, setSelectedObject] = useState('order');
  const [prefix, setPrefix] = useState('ORD');
  const [dateFormat, setDateFormat] = useState('yyyyMMdd');
  const [serialLength, setSerialLength] = useState('4');
  const [serial, setSerial] = useState('0001');

  const objects = [
    { key: 'order', label: '订单号' },
    { key: 'purchase', label: '采购单号' },
    { key: 'sku', label: 'SKU编码' },
    { key: 'spu', label: 'SPU编码' },
    { key: 'inbound', label: '入库单号' },
    { key: 'outbound', label: '出库单号' },
    { key: 'return', label: '退货单号' },
  ];

  const dateFormats = [
    { key: 'yyyyMMdd', label: 'YYYYMMDD' },
    { key: 'yyMMdd', label: 'YYMMDD' },
    { key: 'yyyy-MM-dd', label: 'YYYY-MM-DD' },
  ];

  const preview = `${prefix}-${dateFormat === 'yyyyMMdd' ? '20260913' : dateFormat === 'yyMMdd' ? '260913' : '2026-09-13'}-${serial.padStart(Number(serialLength), '0')}`;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">编码规则配置</h2>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="px-4 py-3 border-b border-gray-100">
            <h3 className="text-sm font-medium text-gray-900">选择编码对象</h3>
          </div>
          <div className="divide-y divide-gray-50">
            {objects.map((obj) => (
              <button
                key={obj.key}
                onClick={() => setSelectedObject(obj.key)}
                className={`w-full text-left px-4 py-3 text-sm transition-colors ${
                  selectedObject === obj.key
                    ? 'bg-blue-50 text-blue-700 font-medium border-l-2 border-blue-500'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {obj.label}
              </button>
            ))}
          </div>
        </div>

        <div className="col-span-2 space-y-4">
          <div className="bg-white rounded-lg border border-gray-200 p-4 space-y-4">
            <h3 className="text-sm font-medium text-gray-900">规则配置 - {objects.find((o) => o.key === selectedObject)?.label}</h3>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">前缀</label>
              <input
                type="text"
                value={prefix}
                onChange={(e) => setPrefix(e.target.value)}
                className="w-48 px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <p className="text-xs text-gray-400 mt-1">建议2-4位大写字母</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">日期格式</label>
              <div className="flex gap-3">
                {dateFormats.map((df) => (
                  <label key={df.key} className="flex items-center gap-2 text-sm">
                    <input
                      type="radio"
                      name="dateFormat"
                      checked={dateFormat === df.key}
                      onChange={() => setDateFormat(df.key)}
                    />
                    {df.label}
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">流水号位数</label>
              <select
                value={serialLength}
                onChange={(e) => setSerialLength(e.target.value)}
                className="w-32 px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="3">3位</option>
                <option value="4">4位</option>
                <option value="5">5位</option>
                <option value="6">6位</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">当前流水号</label>
              <input
                type="number"
                value={serial}
                onChange={(e) => setSerial(e.target.value)}
                className="w-32 px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h3 className="text-sm font-medium text-gray-900 mb-2">实时预览</h3>
            <div className="bg-gray-50 border border-dashed border-gray-300 rounded-lg p-4 text-center">
              <span className="text-lg font-mono font-semibold text-blue-700">{preview}</span>
            </div>
            <p className="text-xs text-gray-400 mt-2 text-center">格式: 前缀 - 日期 - 流水号</p>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-3">
        <button className="px-4 py-2 text-sm border border-gray-200 rounded-md hover:bg-gray-50 text-gray-600">重置</button>
        <button className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700">保存规则</button>
      </div>
    </div>
  );
}

/* ───────────── MessageCenterPage ───────────── */

export function MessageCenterPage({ onNavigate }: { onNavigate: (page: string) => void }) {
  const [activeFilter, setActiveFilter] = useState('all');
  const [messages, setMessages] = useState(mockMessages);

  const filters = [
    { key: 'all', label: '全部', count: messages.length },
    { key: '审批待办', label: '审批待办', count: messages.filter((m) => m.type === '审批待办').length },
    { key: '库存预警', label: '库存预警', count: messages.filter((m) => m.type === '库存预警').length },
    { key: '异常订单', label: '异常订单', count: messages.filter((m) => m.type === '异常订单').length },
    { key: '刊登失败', label: '刊登失败', count: messages.filter((m) => m.type === '刊登失败').length },
    { key: '同步失败', label: '同步失败', count: messages.filter((m) => m.type === '同步失败').length },
    { key: '授权到期', label: '授权到期', count: 0 },
  ];

  const typeColors: Record<string, string> = {
    '审批待办': 'bg-blue-100 text-blue-700',
    '库存预警': 'bg-orange-100 text-orange-700',
    '异常订单': 'bg-red-100 text-red-700',
    '刊登失败': 'bg-purple-100 text-purple-700',
    '同步失败': 'bg-yellow-100 text-yellow-700',
    '授权到期': 'bg-cyan-100 text-cyan-700',
  };

  const toggleRead = (id: string) => {
    setMessages((prev) => prev.map((m) => m.id === id ? { ...m, read: !m.read } : m));
  };

  const filteredMessages = activeFilter === 'all' ? messages : messages.filter((m) => m.type === activeFilter);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">消息中心</h2>
        <button className="text-sm text-blue-600 hover:underline">全部标为已读</button>
      </div>

      <div className="flex gap-2 flex-wrap">
        {filters.map((f) => (
          <button
            key={f.key}
            onClick={() => setActiveFilter(f.key)}
            className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
              activeFilter === f.key
                ? 'bg-blue-600 text-white'
                : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
            }`}
          >
            {f.label}
            <span className="ml-1 text-xs opacity-70">({f.count})</span>
          </button>
        ))}
      </div>

      <div className="bg-white rounded-lg border border-gray-200 divide-y divide-gray-50">
        {filteredMessages.map((msg) => (
          <div
            key={msg.id}
            className={`px-4 py-3 flex items-start gap-3 cursor-pointer hover:bg-gray-50 transition-colors ${
              !msg.read ? 'bg-blue-50/30' : ''
            }`}
            onClick={() => toggleRead(msg.id)}
          >
            <div className="mt-0.5">
              {!msg.read ? (
                <div className="w-2 h-2 rounded-full bg-blue-500" />
              ) : (
                <div className="w-2 h-2 rounded-full bg-transparent" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className={`px-1.5 py-0.5 text-[10px] rounded ${typeColors[msg.type] || 'bg-gray-100 text-gray-600'}`}>
                  {msg.type}
                </span>
                <span className="text-xs text-gray-400">{msg.time}</span>
              </div>
              <p className={`text-sm ${!msg.read ? 'font-medium text-gray-900' : 'text-gray-600'}`}>
                {msg.title}
              </p>
            </div>
            <button className="p-1 rounded hover:bg-gray-100 text-gray-400 flex-shrink-0">
              <Eye size={14} />
            </button>
          </div>
        ))}
        {filteredMessages.length === 0 && (
          <div className="px-4 py-12 text-center text-sm text-gray-400">暂无消息</div>
        )}
      </div>
    </div>
  );
}

/* ───────────── AuditLogPage ───────────── */

export function AuditLogPage({ onNavigate }: { onNavigate: (page: string) => void }) {
  const [searchOperator, setSearchOperator] = useState('');
  const [searchModule, setSearchModule] = useState('');

  const modules = ['全部', '用户管理', '角色管理', '店铺授权', '平台映射', '审批流程', '编码规则'];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">操作日志</h2>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="grid grid-cols-4 gap-3">
          <input
            type="text"
            placeholder="操作人"
            value={searchOperator}
            onChange={(e) => setSearchOperator(e.target.value)}
            className="px-3 py-1.5 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <select
            value={searchModule}
            onChange={(e) => setSearchModule(e.target.value)}
            className="px-3 py-1.5 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-600"
          >
            {modules.map((m) => (
              <option key={m} value={m === '全部' ? '' : m}>{m}</option>
            ))}
          </select>
          <input type="date" className="px-3 py-1.5 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500" />
          <div className="flex gap-2">
            <button className="px-4 py-1.5 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 flex items-center gap-1">
              <Search size={14} /> 查询
            </button>
            <button className="px-3 py-1.5 border border-gray-200 text-sm rounded-md hover:bg-gray-50 text-gray-600">重置</button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 text-left">
              <th className="px-4 py-3 font-medium text-gray-600">操作人</th>
              <th className="px-4 py-3 font-medium text-gray-600">操作模块</th>
              <th className="px-4 py-3 font-medium text-gray-600">操作类型</th>
              <th className="px-4 py-3 font-medium text-gray-600">操作内容</th>
              <th className="px-4 py-3 font-medium text-gray-600">IP地址</th>
              <th className="px-4 py-3 font-medium text-gray-600">操作时间</th>
            </tr>
          </thead>
          <tbody>
            {mockAuditLogs.map((log) => (
              <tr key={log.id} className="border-b border-gray-50 hover:bg-gray-50">
                <td className="px-4 py-3 font-medium text-gray-900">{log.operator}</td>
                <td className="px-4 py-3 text-gray-600">{log.module}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-0.5 text-xs rounded ${
                    log.type === '新增' ? 'bg-green-100 text-green-700' :
                    log.type === '编辑' ? 'bg-blue-100 text-blue-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {log.type}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-600 text-xs max-w-[280px] truncate">{log.content}</td>
                <td className="px-4 py-3 text-gray-500 text-xs font-mono">{log.ip}</td>
                <td className="px-4 py-3 text-gray-500 text-xs">{log.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100">
          <span className="text-sm text-gray-500">共 {mockAuditLogs.length} 条</span>
          <div className="flex items-center gap-1">
            <button className="px-3 py-1 text-sm border border-gray-200 rounded hover:bg-gray-50 text-gray-400" disabled>上一页</button>
            <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded">1</button>
            <button className="px-3 py-1 text-sm border border-gray-200 rounded hover:bg-gray-50 text-gray-600">下一页</button>
          </div>
        </div>
      </div>
    </div>
  );
}
