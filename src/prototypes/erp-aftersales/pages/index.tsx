import React, { useState } from 'react';
import {
  Search,
  Download,
  RefreshCw,
  ArrowLeft,
  Eye,
  Star,
  Users,
  UserPlus,
  Repeat,
  Package,
  Clock,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  FileText,
  CreditCard,
  TrendingUp,
  ChevronRight,
  Truck,
  RotateCcw,
  Shield,
  MessageSquare,
  Send,
  Save,
} from 'lucide-react';

type Customer = {
  id: string;
  name: string;
  email: string;
  phone: string;
  platform: string;
  totalOrders: number;
  totalSpent: string;
  level: string;
  lastOrderTime: string;
};

type AftersaleTicket = {
  id: string;
  orderId: string;
  platform: string;
  type: string;
  quantity: string;
  status: string;
  applyTime: string;
};

const mockCustomers: Customer[] = [
  { id: 'C-001', name: 'John Smith', email: 'john.smith@email.com', phone: '+1 555-123-4567', platform: '亚马逊', totalOrders: 28, totalSpent: '$4,580.00', level: 'VIP', lastOrderTime: '2026-09-13 14:30' },
  { id: 'C-002', name: 'Mike Johnson', email: 'mike.j@email.com', phone: '+1 555-234-5678', platform: 'TEMU', totalOrders: 15, totalSpent: '$2,150.00', level: 'VIP', lastOrderTime: '2026-09-12 10:20' },
  { id: 'C-003', name: 'Nguyen Van A', email: 'nguyenvana@email.vn', phone: '+84 901-234-567', platform: 'Shopee', totalOrders: 8, totalSpent: '₫8,450,000', level: '普通', lastOrderTime: '2026-09-11 16:45' },
  { id: 'C-004', name: 'Hans Mueller', email: 'hans.m@email.de', phone: '+49 170-1234567', platform: '速卖通', totalOrders: 5, totalSpent: '€320.50', level: '普通', lastOrderTime: '2026-09-10 09:15' },
  { id: 'C-005', name: 'Sarah Davis', email: 'sarah.d@email.com', phone: '+44 7700-123456', platform: 'eBay', totalOrders: 22, totalSpent: '$3,890.00', level: 'VIP', lastOrderTime: '2026-09-09 11:00' },
];

const mockTickets: AftersaleTicket[] = [
  { id: 'AS-20260913001', orderId: 'ORD-20260913001', platform: '亚马逊', type: '退货', quantity: '1件 / $128.50', status: '待处理', applyTime: '2026-09-13 15:00' },
  { id: 'AS-20260912002', orderId: 'ORD-20260912003', platform: 'TEMU', type: '退款', quantity: '1件 / $67.20', status: '处理中', applyTime: '2026-09-12 14:20' },
  { id: 'AS-20260911003', orderId: 'ORD-20260911005', platform: 'Shopee', type: '换货', quantity: '2件 / ₫2,450,000', status: '已完成', applyTime: '2026-09-11 10:30' },
  { id: 'AS-20260910004', orderId: 'ORD-20260910002', platform: '速卖通', type: '退货', quantity: '1件 / €89.90', status: '已关闭', applyTime: '2026-09-10 08:15' },
];

const platformColors: Record<string, string> = {
  '亚马逊': 'bg-orange-100 text-orange-700',
  'TEMU': 'bg-purple-100 text-purple-700',
  'Shopee': 'bg-red-100 text-red-700',
  '速卖通': 'bg-blue-100 text-blue-700',
  'eBay': 'bg-yellow-100 text-yellow-700',
};

const levelColors: Record<string, string> = {
  'VIP': 'bg-amber-100 text-amber-700',
  '普通': 'bg-gray-100 text-gray-600',
};

const ticketStatusColors: Record<string, string> = {
  '待处理': 'bg-red-100 text-red-700',
  '处理中': 'bg-yellow-100 text-yellow-700',
  '已完成': 'bg-green-100 text-green-700',
  '已关闭': 'bg-gray-100 text-gray-500',
};

const ticketTypeColors: Record<string, string> = {
  '退货': 'bg-orange-100 text-orange-700',
  '退款': 'bg-blue-100 text-blue-700',
  '换货': 'bg-purple-100 text-purple-700',
};

export function CustomerListPage({ onNavigate }: { onNavigate: (page: string) => void }) {
  const [searchText, setSearchText] = useState('');

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">客户列表</h2>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 text-sm rounded-md hover:bg-gray-50 text-gray-600">
            <Download size={14} /> 导出
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-sm transition-shadow">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
              <Users size={20} className="text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">客户总数</p>
              <p className="text-xl font-semibold text-gray-900">{mockCustomers.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-sm transition-shadow">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center">
              <UserPlus size={20} className="text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">新增客户</p>
              <p className="text-xl font-semibold text-gray-900">12</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-sm transition-shadow">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center">
              <Repeat size={20} className="text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">复购率</p>
              <p className="text-xl font-semibold text-gray-900">68.5%</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="grid grid-cols-5 gap-3">
          <input
            type="text"
            placeholder="姓名/邮箱/电话"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="px-3 py-1.5 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <select className="px-3 py-1.5 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-600">
            <option value="">全部平台</option>
            <option>亚马逊</option>
            <option>TEMU</option>
            <option>Shopee</option>
            <option>速卖通</option>
            <option>eBay</option>
          </select>
          <select className="px-3 py-1.5 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-600">
            <option value="">全部等级</option>
            <option>VIP</option>
            <option>普通</option>
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
              <th className="px-4 py-3 font-medium text-gray-600">客户编号</th>
              <th className="px-4 py-3 font-medium text-gray-600">姓名</th>
              <th className="px-4 py-3 font-medium text-gray-600">邮箱</th>
              <th className="px-4 py-3 font-medium text-gray-600">电话</th>
              <th className="px-4 py-3 font-medium text-gray-600">平台</th>
              <th className="px-4 py-3 font-medium text-gray-600">累计订单数</th>
              <th className="px-4 py-3 font-medium text-gray-600">累计消费</th>
              <th className="px-4 py-3 font-medium text-gray-600">等级</th>
              <th className="px-4 py-3 font-medium text-gray-600">最近下单时间</th>
              <th className="px-4 py-3 font-medium text-gray-600">操作</th>
            </tr>
          </thead>
          <tbody>
            {mockCustomers.map((customer) => (
              <tr
                key={customer.id}
                className={`border-b border-gray-50 hover:bg-gray-50 cursor-pointer ${customer.level === 'VIP' ? 'bg-amber-50/30' : ''}`}
                onClick={() => onNavigate('customer-detail')}
              >
                <td className="px-4 py-3 font-mono text-xs text-gray-900">{customer.id}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-900">{customer.name}</span>
                    {customer.level === 'VIP' && <Star size={14} className="text-amber-500 fill-amber-500" />}
                  </div>
                </td>
                <td className="px-4 py-3 text-gray-500 text-xs">{customer.email}</td>
                <td className="px-4 py-3 text-gray-500 text-xs">{customer.phone}</td>
                <td className="px-4 py-3">
                  <span className={`px-1.5 py-0.5 text-[10px] rounded ${platformColors[customer.platform] || ''}`}>{customer.platform}</span>
                </td>
                <td className="px-4 py-3 font-medium text-gray-900">{customer.totalOrders}</td>
                <td className="px-4 py-3 font-medium text-gray-900">{customer.totalSpent}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-0.5 text-xs rounded ${levelColors[customer.level] || ''}`}>{customer.level}</span>
                </td>
                <td className="px-4 py-3 text-gray-500 text-xs">{customer.lastOrderTime}</td>
                <td className="px-4 py-3">
                  <button className="p-1 rounded hover:bg-gray-100 text-gray-400 hover:text-blue-600" title="查看详情">
                    <Eye size={14} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100">
          <span className="text-sm text-gray-500">共 {mockCustomers.length} 条</span>
          <div className="flex items-center gap-1">
            <button className="px-3 py-1 text-sm border border-gray-200 rounded hover:bg-gray-50 text-gray-400" disabled>上一页</button>
            <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded">1</button>
            <button className="px-3 py-1 text-sm border border-gray-200 rounded hover:bg-gray-50 text-gray-400" disabled>下一页</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function CustomerDetailPage({ onNavigate }: { onNavigate: (page: string) => void }) {
  const customer = mockCustomers[0];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <button onClick={() => onNavigate('customer-list')} className="p-1 rounded hover:bg-gray-100">
          <ArrowLeft size={18} className="text-gray-600" />
        </button>
        <h2 className="text-lg font-semibold text-gray-900">客户详情</h2>
        <span className="ml-2 font-mono text-sm text-gray-500">{customer.id}</span>
        <span className={`px-2 py-0.5 text-xs rounded ${levelColors[customer.level]}`}>{customer.level}</span>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-5">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
              <span className="text-xl font-semibold text-blue-700">{customer.name.charAt(0)}</span>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900">{customer.name}</h3>
              <p className="text-sm text-gray-500">{customer.platform} · {customer.id}</p>
            </div>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-gray-500">邮箱：</span><span className="text-gray-900">{customer.email}</span></div>
            <div className="flex justify-between"><span className="text-gray-500">电话：</span><span className="text-gray-900">{customer.phone}</span></div>
            <div className="flex justify-between"><span className="text-gray-500">平台：</span><span className={`px-1.5 py-0.5 text-[10px] rounded ${platformColors[customer.platform]}`}>{customer.platform}</span></div>
            <div className="flex justify-between"><span className="text-gray-500">等级：</span><span className={`px-1.5 py-0.5 text-[10px] rounded ${levelColors[customer.level]}`}>{customer.level}</span></div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-5">
          <h3 className="text-sm font-medium text-gray-900 mb-4 flex items-center gap-1.5">
            <TrendingUp size={16} className="text-gray-400" /> 消费统计
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">累计订单数</span>
              <span className="text-lg font-semibold text-gray-900">{customer.totalOrders}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">累计消费</span>
              <span className="text-lg font-semibold text-gray-900">{customer.totalSpent}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">最近下单</span>
              <span className="text-sm text-gray-900">{customer.lastOrderTime}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">退货率</span>
              <span className="text-sm text-orange-600">3.2%</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-5">
          <h3 className="text-sm font-medium text-gray-900 mb-4 flex items-center gap-1.5">
            <MessageSquare size={16} className="text-gray-400" /> 售后记录
          </h3>
          <div className="space-y-3">
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-gray-900">退货申请</span>
                <span className="px-1.5 py-0.5 text-[10px] rounded bg-red-100 text-red-700">待处理</span>
              </div>
              <p className="text-xs text-gray-500">AS-20260913001 · 蓝牙耳机 TWS Pro Max</p>
              <p className="text-xs text-gray-400 mt-1">2026-09-13 15:00</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-gray-900">换货完成</span>
                <span className="px-1.5 py-0.5 text-[10px] rounded bg-green-100 text-green-700">已完成</span>
              </div>
              <p className="text-xs text-gray-500">AS-20260908005 · 硅胶手机壳 iPhone15</p>
              <p className="text-xs text-gray-400 mt-1">2026-09-08 11:20</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <h3 className="text-sm font-medium text-gray-900 mb-3 flex items-center gap-1.5">
          <Package size={16} className="text-gray-400" /> 订单历史
        </h3>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 text-left">
              <th className="px-3 py-2 font-medium text-gray-600">订单号</th>
              <th className="px-3 py-2 font-medium text-gray-600">商品</th>
              <th className="px-3 py-2 font-medium text-gray-600">金额</th>
              <th className="px-3 py-2 font-medium text-gray-600">状态</th>
              <th className="px-3 py-2 font-medium text-gray-600">下单时间</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-gray-50">
              <td className="px-3 py-2 font-mono text-xs">ORD-20260913001</td>
              <td className="px-3 py-2">蓝牙耳机 TWS Pro Max</td>
              <td className="px-3 py-2 font-medium">$128.50</td>
              <td className="px-3 py-2"><span className="px-1.5 py-0.5 text-[10px] rounded bg-orange-100 text-orange-700">待发货</span></td>
              <td className="px-3 py-2 text-gray-500 text-xs">2026-09-13 14:30</td>
            </tr>
            <tr className="border-b border-gray-50">
              <td className="px-3 py-2 font-mono text-xs">ORD-20260910008</td>
              <td className="px-3 py-2">蓝牙耳机 TWS Pro Max</td>
              <td className="px-3 py-2 font-medium">$128.50</td>
              <td className="px-3 py-2"><span className="px-1.5 py-0.5 text-[10px] rounded bg-green-100 text-green-700">已完成</span></td>
              <td className="px-3 py-2 text-gray-500 text-xs">2026-09-10 09:15</td>
            </tr>
            <tr className="border-b border-gray-50">
              <td className="px-3 py-2 font-mono text-xs">ORD-20260905003</td>
              <td className="px-3 py-2">硅胶手机壳 iPhone15系列</td>
              <td className="px-3 py-2 font-medium">$67.20</td>
              <td className="px-3 py-2"><span className="px-1.5 py-0.5 text-[10px] rounded bg-green-100 text-green-700">已完成</span></td>
              <td className="px-3 py-2 text-gray-500 text-xs">2026-09-05 16:45</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function AftersaleListPage({ onNavigate }: { onNavigate: (page: string) => void }) {
  const [searchText, setSearchText] = useState('');

  return (
    <div data-annotation-id="platform-sync" className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">售后工单</h2>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 text-sm rounded-md hover:bg-gray-50 text-gray-600">
            <Download size={14} /> 导出
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="grid grid-cols-5 gap-3">
          <input
            type="text"
            placeholder="工单号/订单号"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="px-3 py-1.5 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <select className="px-3 py-1.5 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-600">
            <option value="">全部平台</option>
            <option>亚马逊</option>
            <option>TEMU</option>
            <option>Shopee</option>
            <option>速卖通</option>
          </select>
          <select className="px-3 py-1.5 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-600">
            <option value="">全部类型</option>
            <option>退货</option>
            <option>退款</option>
            <option>换货</option>
          </select>
          <select className="px-3 py-1.5 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-600">
            <option value="">全部状态</option>
            <option>待处理</option>
            <option>处理中</option>
            <option>已完成</option>
            <option>已关闭</option>
          </select>
          <div className="flex gap-2">
            <button className="px-4 py-1.5 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 flex items-center gap-1">
              <Search size={14} /> 查询
            </button>
            <button className="px-3 py-1.5 border border-gray-200 text-sm rounded-md hover:bg-gray-50 text-gray-600">重置</button>
          </div>
        </div>
        <div className="grid grid-cols-5 gap-3 mt-3">
          <input type="date" className="px-3 py-1.5 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500" />
          <input type="date" className="px-3 py-1.5 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500" />
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 text-left">
              <th className="px-4 py-3 font-medium text-gray-600">工单号</th>
              <th className="px-4 py-3 font-medium text-gray-600">关联订单</th>
              <th className="px-4 py-3 font-medium text-gray-600">平台</th>
              <th className="px-4 py-3 font-medium text-gray-600">类型</th>
              <th className="px-4 py-3 font-medium text-gray-600">数量/金额</th>
              <th className="px-4 py-3 font-medium text-gray-600">状态</th>
              <th className="px-4 py-3 font-medium text-gray-600">申请时间</th>
              <th className="px-4 py-3 font-medium text-gray-600">操作</th>
            </tr>
          </thead>
          <tbody>
            {mockTickets.map((ticket) => (
              <tr key={ticket.id} className="border-b border-gray-50 hover:bg-gray-50">
                <td className="px-4 py-3 font-mono text-xs text-gray-900">{ticket.id}</td>
                <td className="px-4 py-3 font-mono text-xs text-gray-900">{ticket.orderId}</td>
                <td className="px-4 py-3">
                  <span className={`px-1.5 py-0.5 text-[10px] rounded ${platformColors[ticket.platform] || ''}`}>{ticket.platform}</span>
                </td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-0.5 text-xs rounded ${ticketTypeColors[ticket.type] || ''}`}>{ticket.type}</span>
                </td>
                <td className="px-4 py-3 text-gray-700 text-xs">{ticket.quantity}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-0.5 text-xs rounded ${ticketStatusColors[ticket.status] || 'bg-gray-100 text-gray-600'}`}>
                    {ticket.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-500 text-xs">{ticket.applyTime}</td>
                <td className="px-4 py-3">
                  <button onClick={() => onNavigate('aftersale-detail')} className="p-1 rounded hover:bg-gray-100 text-gray-400 hover:text-blue-600" title="查看详情">
                    <Eye size={14} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100">
          <span className="text-sm text-gray-500">共 {mockTickets.length} 条</span>
          <div className="flex items-center gap-1">
            <button className="px-3 py-1 text-sm border border-gray-200 rounded hover:bg-gray-50 text-gray-400" disabled>上一页</button>
            <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded">1</button>
            <button className="px-3 py-1 text-sm border border-gray-200 rounded hover:bg-gray-50 text-gray-400" disabled>下一页</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function AftersaleDetailPage({ onNavigate }: { onNavigate: (page: string) => void }) {
  const ticket = mockTickets[0];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <button onClick={() => onNavigate('aftersale-list')} className="p-1 rounded hover:bg-gray-100">
          <ArrowLeft size={18} className="text-gray-600" />
        </button>
        <h2 className="text-lg font-semibold text-gray-900">工单详情</h2>
        <span className="ml-2 font-mono text-sm text-gray-500">{ticket.id}</span>
        <span className={`px-2 py-0.5 text-xs rounded ${ticketStatusColors[ticket.status]}`}>{ticket.status}</span>
        <span className={`px-2 py-0.5 text-xs rounded ${ticketTypeColors[ticket.type]}`}>{ticket.type}</span>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2 space-y-4">
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h3 className="text-sm font-medium text-gray-900 mb-3 flex items-center gap-1.5">
              <FileText size={16} className="text-gray-400" /> 基本信息
            </h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div><span className="text-gray-500">工单号：</span><span className="font-mono text-gray-900">{ticket.id}</span></div>
              <div><span className="text-gray-500">关联订单：</span><span className="font-mono text-gray-900">{ticket.orderId}</span></div>
              <div><span className="text-gray-500">平台：</span><span className={`px-1.5 py-0.5 text-[10px] rounded ${platformColors[ticket.platform]}`}>{ticket.platform}</span></div>
              <div><span className="text-gray-500">类型：</span><span className={`px-2 py-0.5 text-xs rounded ${ticketTypeColors[ticket.type]}`}>{ticket.type}</span></div>
              <div><span className="text-gray-500">申请时间：</span><span className="text-gray-900">{ticket.applyTime}</span></div>
              <div><span className="text-gray-500">处理状态：</span><span className={`px-2 py-0.5 text-xs rounded ${ticketStatusColors[ticket.status]}`}>{ticket.status}</span></div>
            </div>
          </div>

          <div data-annotation-id="exchange-flow" className="bg-white rounded-lg border border-gray-200 p-4">
            <h3 className="text-sm font-medium text-gray-900 mb-3 flex items-center gap-1.5">
              <Package size={16} className="text-gray-400" /> 退货商品
            </h3>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 text-left">
                  <th className="px-3 py-2 font-medium text-gray-600">商品名称</th>
                  <th className="px-3 py-2 font-medium text-gray-600">SKU</th>
                  <th className="px-3 py-2 font-medium text-gray-600">数量</th>
                  <th className="px-3 py-2 font-medium text-gray-600">单价</th>
                  <th className="px-3 py-2 font-medium text-gray-600">小计</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-50">
                  <td className="px-3 py-2">蓝牙耳机 TWS Pro Max</td>
                  <td className="px-3 py-2 font-mono text-xs text-gray-600">SKU-A001-01</td>
                  <td className="px-3 py-2">1</td>
                  <td className="px-3 py-2">$128.50</td>
                  <td className="px-3 py-2 font-medium">$128.50</td>
                </tr>
              </tbody>
            </table>
            <div className="flex justify-end mt-3 pt-3 border-t border-gray-100">
              <div className="text-sm space-y-1">
                <div className="flex gap-8"><span className="text-gray-500">商品金额：</span><span className="text-gray-900">$128.50</span></div>
                <div className="flex gap-8"><span className="text-gray-500">运费：</span><span className="text-gray-900">$8.00</span></div>
                <div className="flex gap-8 font-medium"><span className="text-gray-700">订单总额：</span><span className="text-gray-900">$136.50</span></div>
              </div>
            </div>
          </div>

          <div data-annotation-id="quality-check" className="bg-white rounded-lg border border-gray-200 p-4">
            <h3 className="text-sm font-medium text-gray-900 mb-3 flex items-center gap-1.5">
              <Shield size={16} className="text-gray-400" /> 质检表单
            </h3>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">质检结果 <span className="text-red-500">*</span></label>
                  <select className="w-full px-3 py-1.5 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500">
                    <option>合格-可二次销售</option>
                    <option>不合格-已损坏</option>
                    <option>不合格-影响二次销售</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">质检员</label>
                  <input type="text" defaultValue="张质检" className="w-full px-3 py-1.5 text-sm border border-gray-200 rounded-md" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">质检备注</label>
                <textarea rows={3} placeholder="请输入质检备注..." className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500" />
              </div>
            </div>
          </div>

          <div data-annotation-id="refund-approval" className="bg-white rounded-lg border border-gray-200 p-4">
            <h3 className="text-sm font-medium text-gray-900 mb-3 flex items-center gap-1.5">
              <CreditCard size={16} className="text-gray-400" /> 退款金额
            </h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-500">商品退款：</span>
                <span className="text-gray-900 font-medium ml-2">$128.50</span>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-500">运费退款：</span>
                <span className="text-gray-900 font-medium ml-2">$8.00</span>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg col-span-2">
                <span className="text-blue-700">实际退款：</span>
                <span className="text-blue-700 font-semibold text-lg ml-2">$136.50</span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h3 className="text-sm font-medium text-gray-900 mb-3">状态时间线</h3>
            <div className="space-y-3">
              {[
                { time: '2026-09-13 15:00', event: '申请提交', detail: '客户提交退货申请', icon: FileText, color: 'text-blue-500' },
                { time: '2026-09-13 15:10', event: '系统审核', detail: '自动审核通过', icon: CheckCircle2, color: 'text-green-500' },
                { time: '2026-09-13 15:15', event: '等待质检', detail: '等待仓库质检', icon: Clock, color: 'text-yellow-500' },
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className={`w-7 h-7 rounded-full bg-gray-50 flex items-center justify-center flex-shrink-0 ${item.color}`}>
                        <Icon size={14} />
                      </div>
                      {idx < 2 && <div className="w-px h-full bg-gray-200 mt-1" />}
                    </div>
                    <div className="pb-3">
                      <p className="text-sm font-medium text-gray-900">{item.event}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{item.detail}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{item.time}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h3 className="text-sm font-medium text-gray-900 mb-3">操作</h3>
            <div className="space-y-2">
              <button className="w-full px-3 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 flex items-center justify-center gap-1.5">
                <Send size={14} /> 提交质检结果
              </button>
              <button className="w-full px-3 py-2 bg-green-600 text-white text-sm rounded-md hover:bg-green-700 flex items-center justify-center gap-1.5">
                <CheckCircle2 size={14} /> 确认退款
              </button>
              <button className="w-full px-3 py-2 border border-gray-200 text-sm rounded-md hover:bg-gray-50 text-gray-600 flex items-center justify-center gap-1.5">
                <MessageSquare size={14} /> 联系客户
              </button>
              <button className="w-full px-3 py-2 border border-red-200 text-sm rounded-md hover:bg-red-50 text-red-600 flex items-center justify-center gap-1.5">
                <XCircle size={14} /> 关闭工单
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
