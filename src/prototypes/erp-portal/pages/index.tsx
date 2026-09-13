import React from 'react';
import {
  Package,
  ShoppingCart,
  Warehouse,
  Truck,
  DollarSign,
  Users,
  BarChart3,
  Settings,
  TrendingUp,
  Clock,
  AlertTriangle,
  FileText,
  type LucideIcon,
} from 'lucide-react';

type ModuleCard = {
  key: string;
  label: string;
  desc: string;
  icon: LucideIcon;
  color: string;
  bg: string;
  link: string;
};

const modules: ModuleCard[] = [
  { key: 'dashboard', label: '首页工作台', desc: '待办事项、业务提醒、快捷入口', icon: BarChart3, color: 'text-blue-600', bg: 'bg-blue-50', link: '/prototypes/erp-dashboard/' },
  { key: 'products', label: '商品中心', desc: '商品管理、采集、刊登、定价', icon: Package, color: 'text-indigo-600', bg: 'bg-indigo-50', link: '/prototypes/erp-products/' },
  { key: 'orders', label: '订单管理', desc: '订单列表、异常处理、合单拆单、波次拣货', icon: ShoppingCart, color: 'text-green-600', bg: 'bg-green-50', link: '/prototypes/erp-orders/' },
  { key: 'inventory', label: '库存管理', desc: '库存总览、盘点、调拨、仓库管理', icon: Warehouse, color: 'text-orange-600', bg: 'bg-orange-50', link: '/prototypes/erp-inventory/' },
  { key: 'procurement', label: '采购管理', desc: '供应商、采购建议、采购订单、退货', icon: Truck, color: 'text-purple-600', bg: 'bg-purple-50', link: '/prototypes/erp-procurement/' },
  { key: 'logistics', label: '仓储与物流', desc: '出入库、物流商、报关管理', icon: Truck, color: 'text-cyan-600', bg: 'bg-cyan-50', link: '/prototypes/erp-logistics/' },
  { key: 'finance', label: '财务管理', desc: '应收应付、费用、汇率、成本、对账', icon: DollarSign, color: 'text-pink-600', bg: 'bg-pink-50', link: '/prototypes/erp-finance/' },
  { key: 'aftersales', label: '客户与售后', desc: '客户管理、售后工单处理', icon: Users, color: 'text-teal-600', bg: 'bg-teal-50', link: '/prototypes/erp-aftersales/' },
  { key: 'reports', label: '数据看板', desc: '经营概览、销售/库存/物流报表', icon: BarChart3, color: 'text-amber-600', bg: 'bg-amber-50', link: '/prototypes/erp-reports/' },
  { key: 'system', label: '系统管理', desc: '权限、授权、审批、编码、日志', icon: Settings, color: 'text-gray-600', bg: 'bg-gray-100', link: '/prototypes/erp-system/' },
];

const stats = [
  { label: '总商品数', value: '1,286', icon: Package, color: 'text-blue-600 bg-blue-50' },
  { label: '今日订单', value: '128', icon: ShoppingCart, color: 'text-green-600 bg-green-50' },
  { label: '库存预警', value: '8', icon: AlertTriangle, color: 'text-red-600 bg-red-50' },
  { label: '待处理工单', value: '3', icon: FileText, color: 'text-orange-600 bg-orange-50' },
];

const recentActions = [
  { time: '14:30', action: '新建采购单', detail: 'PO-20260913-001', module: '采购管理' },
  { time: '13:15', action: '订单发货', detail: 'ORD-20260913002', module: '订单管理' },
  { time: '12:00', action: '库存调拨完成', detail: 'TR-20260912001', module: '库存管理' },
  { time: '11:30', action: '商品刊登成功', detail: 'SPU-20260913001', module: '商品中心' },
  { time: '10:45', action: '售后工单处理', detail: 'AS-20260913001', module: '客户与售后' },
  { time: '10:00', action: '供应商报价更新', detail: 'SUP-001', module: '采购管理' },
];

export default function PortalOverview() {
  return (
    <div className="space-y-6">
      {/* 核心指标 */}
      <div className="grid grid-cols-4 gap-4">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-sm transition-shadow">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${s.color}`}>
                  <Icon size={20} />
                </div>
                <div>
                  <p className="text-sm text-gray-500">{s.label}</p>
                  <p className="text-xl font-semibold text-gray-900">{s.value}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 模块快捷入口 */}
      <div className="bg-white rounded-lg border border-gray-200 p-5">
        <h3 className="text-sm font-medium text-gray-900 mb-4">系统模块</h3>
        <div className="grid grid-cols-5 gap-3">
          {modules.map((m) => {
            const Icon = m.icon;
            return (
              <a
                key={m.key}
                href={m.link}
                className="group flex flex-col items-center gap-2 p-4 rounded-lg border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all cursor-pointer"
              >
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${m.bg} group-hover:scale-105 transition-transform`}>
                  <Icon size={22} className={m.color} />
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-800 group-hover:text-blue-600 transition-colors">{m.label}</p>
                  <p className="text-[11px] text-gray-400 mt-0.5 leading-tight">{m.desc}</p>
                </div>
              </a>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* 最近操作 */}
        <div className="bg-white rounded-lg border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-900">最近操作</h3>
            <button className="text-xs text-blue-600 hover:text-blue-700">查看全部</button>
          </div>
          <div className="space-y-3">
            {recentActions.map((a, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-10 text-center flex-shrink-0">
                  <span className="text-xs text-gray-400">{a.time}</span>
                </div>
                <div className="w-px h-8 bg-gray-200 relative flex-shrink-0">
                  <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-blue-400 rounded-full" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-800">{a.action}</p>
                  <p className="text-xs text-gray-400">{a.detail} · {a.module}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 系统信息 */}
        <div className="bg-white rounded-lg border border-gray-200 p-5">
          <h3 className="text-sm font-medium text-gray-900 mb-4">系统信息</h3>
          <div className="space-y-3">
            {[
              { label: '系统版本', value: 'V1.0' },
              { label: '已授权店铺', value: '5 家' },
              { label: '已配置物流商', value: '3 家' },
              { label: '供应商数量', value: '3 家' },
              { label: '仓库数量', value: '4 实体仓 + 4 虚拟仓' },
              { label: '用户数量', value: '5 人' },
              { label: '角色数量', value: '3 个' },
              { label: '审批流程', value: '3 条' },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between py-1.5 border-b border-gray-50 last:border-0">
                <span className="text-sm text-gray-500">{item.label}</span>
                <span className="text-sm text-gray-800 font-medium">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
