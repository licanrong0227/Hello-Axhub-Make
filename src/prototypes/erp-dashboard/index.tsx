/**
 * @name 跨境ERP - 工作台
 */

import React, { useState } from 'react';
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Warehouse,
  Truck,
  DollarSign,
  Users,
  BarChart3,
  Settings,
  AlertTriangle,
  Clock,
  CheckCircle2,
  XCircle,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  Bell,
  FileText,
  RefreshCw,
  ShoppingCart as OrderIcon,
  Package as ProductIcon,
} from 'lucide-react';
import { useHashPage, defineHashPageRoute } from '../../common/useHashPage';
import ErpShell from '../components/ErpShell';
import './style.css';
import { AnnotationViewer, type AnnotationSourceDocument } from '@axhub/annotation';
import annotationSourceDocument from './annotation-source.json';

const route = defineHashPageRoute(
  [{ id: 'home', title: '工作台' }],
  { defaultPageId: 'home' }
);

const menuItems = [
  { key: 'home', label: '工作台', icon: LayoutDashboard },
];

// 模拟待办数据
const todoItems = [
  { id: 1, type: '审批待办', title: '采购单 PO-20260913-001 待审批', time: '10分钟前', count: 3 },
  { id: 2, type: '异常订单', title: 'ORD-20260912003 收货地址校验失败', time: '30分钟前', count: 2 },
  { id: 3, type: '售后工单', title: 'AS-20260913001 退货质检待处理', time: '1小时前', count: 1 },
  { id: 4, type: '库存预警', title: 'SKU-A001 库存不足，当前库存 5', time: '2小时前', count: 8 },
];

const reminders = [
  { id: 1, type: '库存预警', title: '8个SKU库存低于安全库存', urgent: true },
  { id: 2, type: '授权到期', title: '亚马逊店铺授权将于3天后到期', urgent: true },
  { id: 3, type: '刊登失败', title: 'TEMU平台3个商品刊登失败', urgent: false },
  { id: 4, type: '同步异常', title: 'Shopee订单同步延迟超过5分钟', urgent: false },
];

const quickLinks = [
  { key: 'product-list', label: '商品管理', icon: Package, color: 'bg-blue-500' },
  { key: 'order-list', label: '订单管理', icon: ShoppingCart, color: 'bg-green-500' },
  { key: 'inventory-list', label: '库存查询', icon: Warehouse, color: 'bg-orange-500' },
  { key: 'purchase-list', label: '采购管理', icon: Truck, color: 'bg-purple-500' },
  { key: 'finance', label: '财务管理', icon: DollarSign, color: 'bg-pink-500' },
  { key: 'reports', label: '数据报表', icon: BarChart3, color: 'bg-cyan-500' },
];

// 核心指标卡片
const metrics = [
  { label: '今日订单量', value: '128', change: '+12.5%', up: true, icon: OrderIcon, color: 'text-blue-600 bg-blue-50' },
  { label: '今日销售额', value: '¥45,680', change: '+8.3%', up: true, icon: DollarSign, color: 'text-green-600 bg-green-50' },
  { label: '待发货订单', value: '37', change: '-5.2%', up: false, icon: Truck, color: 'text-orange-600 bg-orange-50' },
  { label: '库存预警数', value: '8', change: '+2', up: false, icon: AlertTriangle, color: 'text-red-600 bg-red-50' },
];

// 最近订单
const recentOrders = [
  { id: 'ORD-20260913001', platform: '亚马逊', amount: '$128.50', status: '待发货', time: '14:30' },
  { id: 'ORD-20260913002', platform: 'TEMU', amount: '$67.20', status: '已发货', time: '13:15' },
  { id: 'ORD-20260913003', platform: 'Shopee', amount: '₫2,450,000', status: '已完成', time: '12:00' },
  { id: 'ORD-20260913004', platform: '速卖通', amount: '€89.90', status: '待审核', time: '11:30' },
  { id: 'ORD-20260913005', platform: 'eBay', amount: '$234.00', status: '异常', time: '10:45' },
];

// 销售趋势数据（模拟）
const salesTrend = [
  { day: '周一', orders: 98, amount: 34500 },
  { day: '周二', orders: 112, amount: 39200 },
  { day: '周三', orders: 87, amount: 31800 },
  { day: '周四', orders: 135, amount: 47600 },
  { day: '周五', orders: 128, amount: 45680 },
  { day: '周六', orders: 145, amount: 51200 },
  { day: '周日', orders: 0, amount: 0 },
];

const maxAmount = Math.max(...salesTrend.map((d) => d.amount));

const statusColors: Record<string, string> = {
  '待发货': 'bg-orange-100 text-orange-700',
  '已发货': 'bg-blue-100 text-blue-700',
  '已完成': 'bg-green-100 text-green-700',
  '待审核': 'bg-yellow-100 text-yellow-700',
  '异常': 'bg-red-100 text-red-700',
};

function DashboardPage() {
  const [selectedTab, setSelectedTab] = useState<'todo' | 'reminder'>('todo');

  return (
    <div className="space-y-4">
      {/* 核心指标 */}
      <div className="grid grid-cols-4 gap-4" data-annotation-id="metrics-cards">
        {metrics.map((m) => {
          const Icon = m.icon;
          return (
            <div key={m.label} className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-sm transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">{m.label}</p>
                  <p className="text-2xl font-semibold text-gray-900 mt-1">{m.value}</p>
                  <div className="flex items-center gap-1 mt-1">
                    {m.up ? (
                      <TrendingUp size={14} className="text-green-500" />
                    ) : (
                      <TrendingDown size={14} className="text-red-500" />
                    )}
                    <span className={`text-xs ${m.up ? 'text-green-600' : 'text-red-600'}`}>{m.change}</span>
                    <span className="text-xs text-gray-400">较昨日</span>
                  </div>
                </div>
                <div className={`w-11 h-11 rounded-lg flex items-center justify-center ${m.color}`}>
                  <Icon size={22} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-3 gap-4">
        {/* 销售趋势 */}
        <div className="col-span-2 bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-900">本周销售趋势</h3>
            <span className="text-xs text-gray-400">单位：元</span>
          </div>
          <div className="flex items-end gap-3 h-40">
            {salesTrend.map((d) => (
              <div key={d.day} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-[10px] text-gray-500">{d.amount > 0 ? `¥${(d.amount / 1000).toFixed(1)}k` : '-'}</span>
                <div className="w-full flex justify-center">
                  <div
                    className="w-8 bg-blue-500 rounded-t transition-all duration-300"
                    style={{ height: d.amount > 0 ? `${(d.amount / maxAmount) * 120}px` : '4px', opacity: d.amount > 0 ? 1 : 0.2 }}
                  />
                </div>
                <span className="text-xs text-gray-500">{d.day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 快捷入口 */}
        <div className="bg-white rounded-lg border border-gray-200 p-4" data-annotation-id="quick-entry">
          <h3 className="text-sm font-medium text-gray-900 mb-3">快捷入口</h3>
          <div className="grid grid-cols-3 gap-2">
            {quickLinks.map((link) => {
              const Icon = link.icon;
              return (
                <button
                  key={link.key}
                  className="flex flex-col items-center gap-1.5 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${link.color}`}>
                    <Icon size={18} className="text-white" />
                  </div>
                  <span className="text-xs text-gray-600">{link.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {/* 待办事项 & 提醒 */}
        <div className="col-span-2 bg-white rounded-lg border border-gray-200" data-annotation-id="todo-section">
          <div className="flex border-b border-gray-100">
            <button
              onClick={() => setSelectedTab('todo')}
              className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                selectedTab === 'todo'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              待办事项
              <span className="ml-1.5 px-1.5 py-0.5 text-xs bg-red-100 text-red-600 rounded-full">4</span>
            </button>
            <button
              onClick={() => setSelectedTab('reminder')}
              className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                selectedTab === 'reminder'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              提醒通知
              <span className="ml-1.5 px-1.5 py-0.5 text-xs bg-orange-100 text-orange-600 rounded-full">4</span>
            </button>
          </div>
          <div className="p-3" data-annotation-id="reminder-section">
            {selectedTab === 'todo' ? (
              <div className="space-y-2">
                {todoItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                    <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
                      <FileText size={16} className="text-blue-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-800 truncate">{item.title}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{item.type} · {item.time}</p>
                    </div>
                    <span className="px-2 py-0.5 text-xs bg-gray-100 text-gray-600 rounded-full flex-shrink-0">{item.count}条</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-2">
                {reminders.map((item) => (
                  <div key={item.id} className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      item.urgent ? 'bg-red-50' : 'bg-yellow-50'
                    }`}>
                      {item.urgent ? (
                        <AlertTriangle size={16} className="text-red-500" />
                      ) : (
                        <Bell size={16} className="text-yellow-500" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-800 truncate">{item.title}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{item.type}</p>
                    </div>
                    {item.urgent && <span className="w-2 h-2 bg-red-500 rounded-full flex-shrink-0" />}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* 最近订单 */}
        <div className="bg-white rounded-lg border border-gray-200 p-4" data-annotation-id="recent-orders">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-gray-900">最近订单</h3>
            <button className="text-xs text-blue-600 hover:text-blue-700">查看全部</button>
          </div>
          <div className="space-y-2.5">
            {recentOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                <div className="min-w-0">
                  <p className="text-sm text-gray-800 font-medium truncate">{order.id}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{order.platform} · {order.time}</p>
                </div>
                <div className="text-right flex-shrink-0 ml-3">
                  <p className="text-sm text-gray-900">{order.amount}</p>
                  <span className={`inline-block mt-0.5 px-1.5 py-0.5 text-[10px] rounded ${statusColors[order.status] || 'bg-gray-100 text-gray-600'}`}>
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DashboardApp() {
  const { page, setPage } = useHashPage(route);

  return (
    <>
      <ErpShell
        menuItems={menuItems}
        selectedKey={page}
        onMenuSelect={setPage}
      >
        <DashboardPage />
      </ErpShell>
      <AnnotationViewer
        source={annotationSourceDocument as unknown as AnnotationSourceDocument}
        options={{
          currentPageId: page,
          toolbarEdge: 'right',
          showToolbar: true,
          emptyWhenNoData: false,
        }}
      />
    </>
  );
}
