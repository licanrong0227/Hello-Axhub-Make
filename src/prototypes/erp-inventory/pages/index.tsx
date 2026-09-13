import React, { useState } from 'react';
import {
  Search,
  Plus,
  Filter,
  ArrowLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Package,
  Warehouse,
  BarChart3,
  TrendingDown,
  Clock,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Truck,
  RotateCcw,
  Box,
  MapPin,
  TreePine,
  Edit3,
  Trash2,
  Eye,
  RefreshCw,
  Download,
  Upload,
  X,
  Check,
  ArrowRightLeft,
  ScanLine,
  ClipboardList,
} from 'lucide-react';

// ========== Mock Data ==========

const warehouses = [
  { id: 'wh-001', name: '深圳仓', type: 'physical', status: '启用', address: '深圳市宝安区福永街道', skuCount: 328, totalQty: 15200 },
  { id: 'wh-002', name: '广州仓', type: 'physical', status: '启用', address: '广州市白云区太和镇', skuCount: 256, totalQty: 9800 },
  { id: 'wh-003', name: '义乌仓', type: 'physical', status: '启用', address: '义乌市稠江街道', skuCount: 189, totalQty: 7600 },
  { id: 'wh-004', name: '美国海外仓', type: 'physical', status: '启用', address: 'Los Angeles, CA', skuCount: 412, totalQty: 22000 },
  { id: 'wh-005', name: '采购在途仓', type: 'virtual', status: '启用', address: '-', skuCount: 45, totalQty: 3200 },
  { id: 'wh-006', name: '退货仓', type: 'virtual', status: '启用', address: '-', skuCount: 38, totalQty: 560 },
  { id: 'wh-007', name: '调拨在途仓', type: 'virtual', status: '启用', address: '-', skuCount: 12, totalQty: 880 },
  { id: 'wh-008', name: '物损/报损仓', type: 'virtual', status: '启用', address: '-', skuCount: 28, totalQty: 120 },
];

const mockSkuInventory = [
  { id: '1', skuCode: 'SKU-A001-01', name: '蓝牙耳机 TWS Pro Max - 黑色', image: '', category: '电子产品', warehouse: '深圳仓', qty: 520, available: 480, reserved: 40, safetyStock: 100, status: '正常', lastInbound: '2026-09-12' },
  { id: '2', skuCode: 'SKU-A001-02', name: '蓝牙耳机 TWS Pro Max - 白色', image: '', category: '电子产品', warehouse: '深圳仓', qty: 380, available: 350, reserved: 30, safetyStock: 100, status: '正常', lastInbound: '2026-09-12' },
  { id: '3', skuCode: 'SKU-B002-01', name: '硅胶手机壳 iPhone15 - 透明', image: '', category: '手机配件', warehouse: '广州仓', qty: 85, available: 60, reserved: 25, safetyStock: 100, status: '低于安全库存', lastInbound: '2026-09-10' },
  { id: '4', skuCode: 'SKU-B002-02', name: '硅胶手机壳 iPhone15 - 黑色', image: '', category: '手机配件', warehouse: '广州仓', qty: 120, available: 100, reserved: 20, safetyStock: 80, status: '正常', lastInbound: '2026-09-10' },
  { id: '5', skuCode: 'SKU-C003-01', name: '便携式充电宝 20000mAh', image: '', category: '电子产品', warehouse: '义乌仓', qty: 42, available: 42, reserved: 0, safetyStock: 50, status: '低于安全库存', lastInbound: '2026-09-08' },
  { id: '6', skuCode: 'SKU-D004-01', name: '不锈钢保温杯 500ml - 银色', image: '', category: '家居用品', warehouse: '美国海外仓', qty: 320, available: 300, reserved: 20, safetyStock: 80, status: '正常', lastInbound: '2026-09-11' },
  { id: '7', skuCode: 'SKU-D004-02', name: '不锈钢保温杯 500ml - 黑色', image: '', category: '家居用品', warehouse: '美国海外仓', qty: 280, available: 260, reserved: 20, safetyStock: 80, status: '正常', lastInbound: '2026-09-11' },
  { id: '8', skuCode: 'SKU-E005-01', name: 'LED台灯 护眼学习灯', image: '', category: '家居用品', warehouse: '深圳仓', qty: 0, available: 0, reserved: 0, safetyStock: 30, status: '缺货', lastInbound: '2026-08-20' },
  { id: '9', skuCode: 'SKU-F006-01', name: '运动腰包 防水跑步包', image: '', category: '箱包', warehouse: '广州仓', qty: 150, available: 130, reserved: 20, safetyStock: 50, status: '正常', lastInbound: '2026-09-05' },
  { id: '10', skuCode: 'SKU-G007-01', name: '无线充电板 15W', image: '', category: '电子产品', warehouse: '深圳仓', qty: 18, available: 18, reserved: 0, safetyStock: 50, status: '低于安全库存', lastInbound: '2026-09-01' },
];

const stocktakeOrders = [
  { id: 'ST-20260913001', warehouse: '深圳仓', mode: '静态盘点', scope: '全仓', status: '盘点中', totalCount: 328, countedCount: 210, diffCount: 5, createdAt: '2026-09-13 10:00', operator: '张三' },
  { id: 'ST-20260912002', warehouse: '广州仓', mode: '动态盘点', scope: '指定库区-A区', status: '待盘点', totalCount: 86, countedCount: 0, diffCount: 0, createdAt: '2026-09-12 14:00', operator: '李四' },
  { id: 'ST-20260911003', warehouse: '义乌仓', mode: '静态盘点', scope: '指定SKU', status: '已完成', totalCount: 45, countedCount: 45, diffCount: 3, createdAt: '2026-09-11 09:00', operator: '王五' },
  { id: 'ST-20260910004', warehouse: '美国海外仓', mode: '静态盘点', scope: '全仓', status: '已终止', totalCount: 412, countedCount: 180, diffCount: 2, createdAt: '2026-09-10 08:00', operator: '赵六' },
];

const transferOrders = [
  { id: 'TR-20260913001', from: '深圳仓', to: '美国海外仓', skuCount: 5, totalQty: 500, status: '运输中', carrier: '递四方', trackingNo: 'SF1234567890', createdAt: '2026-09-13 08:00', eta: '2026-09-20' },
  { id: 'TR-20260912002', from: '广州仓', to: '深圳仓', skuCount: 3, totalQty: 200, status: '待发货', carrier: '-', trackingNo: '-', createdAt: '2026-09-12 16:00', eta: '-' },
  { id: 'TR-20260911003', from: '义乌仓', to: '广州仓', skuCount: 2, totalQty: 150, status: '已完成', carrier: '顺丰', trackingNo: 'SF9876543210', createdAt: '2026-09-11 10:00', eta: '2026-09-13' },
  { id: 'TR-20260910004', from: '深圳仓', to: '义乌仓', skuCount: 8, totalQty: 800, status: '已取消', carrier: '-', trackingNo: '-', createdAt: '2026-09-10 14:00', eta: '-' },
];

const warehouseZones = [
  { id: 'z1', name: 'A区-电子产品', warehouse: '深圳仓', locationCount: 120, status: '启用' },
  { id: 'z2', name: 'B区-家居用品', warehouse: '深圳仓', locationCount: 80, status: '启用' },
  { id: 'z3', name: 'C区-箱包', warehouse: '深圳仓', locationCount: 50, status: '停用' },
  { id: 'z4', name: 'A区-手机配件', warehouse: '广州仓', locationCount: 90, status: '启用' },
  { id: 'z5', name: 'B区-电子产品', warehouse: '广州仓', locationCount: 70, status: '启用' },
];

const inventoryStats = {
  totalInventory: 54800,
  sellableInventory: 42000,
  reservedInventory: 3200,
  purchasingInTransit: 3200,
  transferInTransit: 880,
  returnInventory: 560,
  damagedInventory: 120,
};

const slowMovingItems = [
  { skuCode: 'SKU-H008-01', name: '手机支架 桌面式', days: 120, qty: 200, value: '¥2,400' },
  { skuCode: 'SKU-I009-01', name: '数据线 Type-C 1m', days: 95, qty: 500, value: '¥1,500' },
  { skuCode: 'SKU-J010-01', name: '屏幕清洁套装', days: 88, qty: 150, value: '¥900' },
  { skuCode: 'SKU-K011-01', name: '耳机收纳包', days: 75, qty: 320, value: '¥2,880' },
  { skuCode: 'SKU-L012-01', name: '手机钢化膜 3片装', days: 60, qty: 800, value: '¥3,200' },
];

const warehouseDistribution = [
  { name: '深圳仓', value: 15200, pct: 27.7 },
  { name: '广州仓', value: 9800, pct: 17.9 },
  { name: '义乌仓', value: 7600, pct: 13.9 },
  { name: '美国海外仓', value: 22000, pct: 40.1 },
];

const statusColors: Record<string, string> = {
  '正常': 'bg-green-100 text-green-700',
  '低于安全库存': 'bg-yellow-100 text-yellow-700',
  '缺货': 'bg-red-100 text-red-700',
  '启用': 'bg-green-100 text-green-700',
  '停用': 'bg-gray-100 text-gray-500',
  '盘点中': 'bg-blue-100 text-blue-700',
  '待盘点': 'bg-yellow-100 text-yellow-700',
  '已完成': 'bg-green-100 text-green-700',
  '已终止': 'bg-gray-100 text-gray-500',
  '运输中': 'bg-blue-100 text-blue-700',
  '待发货': 'bg-yellow-100 text-yellow-700',
  '已取消': 'bg-gray-100 text-gray-500',
  '待收货': 'bg-orange-100 text-orange-700',
};

// ========== Page Components ==========

export function InventoryOverviewPage({ onNavigate }: { onNavigate: (page: string) => void }) {
  const maxVal = Math.max(...warehouseDistribution.map((w) => w.value));

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold text-gray-900">库存总览</h2>

      {/* Stat Cards */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: '总库存', value: inventoryStats.totalInventory.toLocaleString(), icon: Package, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: '可售库存', value: inventoryStats.sellableInventory.toLocaleString(), icon: CheckCircle2, color: 'text-green-600', bg: 'bg-green-50' },
          { label: '预占库存', value: inventoryStats.reservedInventory.toLocaleString(), icon: Clock, color: 'text-yellow-600', bg: 'bg-yellow-50' },
          { label: '采购在途', value: inventoryStats.purchasingInTransit.toLocaleString(), icon: Truck, color: 'text-purple-600', bg: 'bg-purple-50' },
        ].map((stat) => (
          <div key={stat.label} className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
              </div>
              <div className={`w-10 h-10 rounded-lg ${stat.bg} flex items-center justify-center`}>
                <stat.icon size={20} className={stat.color} />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: '调拨在途', value: inventoryStats.transferInTransit.toLocaleString(), icon: ArrowRightLeft, color: 'text-cyan-600', bg: 'bg-cyan-50' },
          { label: '退货库存', value: inventoryStats.returnInventory.toLocaleString(), icon: RotateCcw, color: 'text-orange-600', bg: 'bg-orange-50' },
          { label: '物损库存', value: inventoryStats.damagedInventory.toLocaleString(), icon: AlertTriangle, color: 'text-red-600', bg: 'bg-red-50' },
        ].map((stat) => (
          <div key={stat.label} className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
              </div>
              <div className={`w-10 h-10 rounded-lg ${stat.bg} flex items-center justify-center`}>
                <stat.icon size={20} className={stat.color} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-2 gap-4">
        {/* Warehouse Distribution Bar Chart */}
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <h3 className="text-sm font-medium text-gray-900 mb-4">仓库库存分布</h3>
          <div className="space-y-3">
            {warehouseDistribution.map((wh) => (
              <div key={wh.name} className="flex items-center gap-3">
                <span className="text-sm text-gray-600 w-20 flex-shrink-0 text-right">{wh.name}</span>
                <div className="flex-1 h-6 bg-gray-100 rounded overflow-hidden">
                  <div
                    className="h-full bg-blue-500 rounded transition-all"
                    style={{ width: `${(wh.value / maxVal) * 100}%` }}
                  />
                </div>
                <span className="text-sm text-gray-500 w-16 text-right">{wh.value.toLocaleString()}</span>
                <span className="text-xs text-gray-400 w-10 text-right">{wh.pct}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top 10 Slow-Moving Items */}
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-900">滞销品 TOP 5</h3>
            <button className="text-xs text-blue-600 hover:underline">查看全部</button>
          </div>
          <div className="space-y-2">
            {slowMovingItems.map((item, idx) => (
              <div key={item.skuCode} className="flex items-center gap-3 py-2 border-b border-gray-50 last:border-0">
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-medium ${idx < 3 ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-500'}`}>
                  {idx + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900 truncate">{item.name}</p>
                  <p className="text-xs text-gray-400 font-mono">{item.skuCode}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">{item.days}天</p>
                  <p className="text-xs text-gray-400">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function InventoryListPage({ onNavigate }: { onNavigate: (page: string) => void }) {
  const [searchSku, setSearchSku] = useState('');
  const [searchWarehouse, setSearchWarehouse] = useState('');
  const [searchStatus, setSearchStatus] = useState('');
  const [searchCategory, setSearchCategory] = useState('');

  const filteredData = mockSkuInventory.filter((item) => {
    if (searchSku && !item.skuCode.toLowerCase().includes(searchSku.toLowerCase()) && !item.name.toLowerCase().includes(searchSku.toLowerCase())) return false;
    if (searchWarehouse && item.warehouse !== searchWarehouse) return false;
    if (searchStatus && item.status !== searchStatus) return false;
    if (searchCategory && item.category !== searchCategory) return false;
    return true;
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">库存列表</h2>
        <div className="flex gap-2">
          <button className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 text-sm rounded-md hover:bg-gray-50 text-gray-600">
            <Download size={14} /> 导出
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 text-sm rounded-md hover:bg-gray-50 text-gray-600">
            <RefreshCw size={14} /> 同步库存
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="grid grid-cols-4 gap-3">
          <input
            type="text"
            placeholder="SKU编码/商品名称"
            value={searchSku}
            onChange={(e) => setSearchSku(e.target.value)}
            className="px-3 py-1.5 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <select
            value={searchWarehouse}
            onChange={(e) => setSearchWarehouse(e.target.value)}
            className="px-3 py-1.5 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-600"
          >
            <option value="">全部仓库</option>
            {warehouses.filter((w) => w.type === 'physical').map((w) => (
              <option key={w.id} value={w.name}>{w.name}</option>
            ))}
          </select>
          <select
            value={searchStatus}
            onChange={(e) => setSearchStatus(e.target.value)}
            className="px-3 py-1.5 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-600"
          >
            <option value="">全部状态</option>
            <option>正常</option>
            <option>低于安全库存</option>
            <option>缺货</option>
          </select>
          <select
            value={searchCategory}
            onChange={(e) => setSearchCategory(e.target.value)}
            className="px-3 py-1.5 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-600"
          >
            <option value="">全部类目</option>
            <option>电子产品</option>
            <option>手机配件</option>
            <option>家居用品</option>
            <option>箱包</option>
          </select>
        </div>
        <div className="flex gap-2 mt-3">
          <button className="px-4 py-1.5 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 flex items-center gap-1">
            <Search size={14} /> 查询
          </button>
          <button
            onClick={() => { setSearchSku(''); setSearchWarehouse(''); setSearchStatus(''); setSearchCategory(''); }}
            className="px-3 py-1.5 border border-gray-200 text-sm rounded-md hover:bg-gray-50 text-gray-600"
          >
            重置
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border border-gray-200">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 text-left">
              <th className="px-4 py-3 font-medium text-gray-600">SKU编码</th>
              <th className="px-4 py-3 font-medium text-gray-600">商品名称</th>
              <th className="px-4 py-3 font-medium text-gray-600">图片</th>
              <th className="px-4 py-3 font-medium text-gray-600">仓库</th>
              <th className="px-4 py-3 font-medium text-gray-600">库存数量</th>
              <th className="px-4 py-3 font-medium text-gray-600">可用库存</th>
              <th className="px-4 py-3 font-medium text-gray-600">预占数量</th>
              <th className="px-4 py-3 font-medium text-gray-600">安全库存</th>
              <th className="px-4 py-3 font-medium text-gray-600">状态</th>
              <th className="px-4 py-3 font-medium text-gray-600">最近入库</th>
              <th className="px-4 py-3 font-medium text-gray-600">操作</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item) => (
              <tr key={item.id} className="border-b border-gray-50 hover:bg-gray-50">
                <td className="px-4 py-3 font-mono text-xs text-blue-600">{item.skuCode}</td>
                <td className="px-4 py-3 text-gray-900 max-w-[180px] truncate">{item.name}</td>
                <td className="px-4 py-3">
                  <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center">
                    <Package size={14} className="text-gray-400" />
                  </div>
                </td>
                <td className="px-4 py-3 text-gray-600">{item.warehouse}</td>
                <td className="px-4 py-3 text-gray-900 font-medium">{item.qty}</td>
                <td className="px-4 py-3 text-gray-600">{item.available}</td>
                <td className="px-4 py-3 text-gray-600">{item.reserved}</td>
                <td className="px-4 py-3 text-gray-500">{item.safetyStock}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-0.5 text-xs rounded ${statusColors[item.status] || 'bg-gray-100 text-gray-600'}`}>
                    {item.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-500 text-xs">{item.lastInbound}</td>
                <td className="px-4 py-3">
                  <button onClick={() => onNavigate('inventory-detail')} className="text-blue-600 text-xs hover:underline">明细</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100">
          <span className="text-sm text-gray-500">共 {filteredData.length} 条</span>
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

export function InventoryDetailPage({ onNavigate }: { onNavigate: (page: string) => void }) {
  const item = mockSkuInventory[0];
  const warehouseDistribution = [
    { warehouse: '深圳仓', zone: 'A区-电子产品', location: 'A-01-03', qty: 320, available: 300, reserved: 20 },
    { warehouse: '深圳仓', zone: 'A区-电子产品', location: 'A-02-01', qty: 200, available: 180, reserved: 20 },
    { warehouse: '广州仓', zone: 'B区-电子产品', location: 'B-01-05', qty: 150, available: 140, reserved: 10 },
    { warehouse: '美国海外仓', zone: 'Zone-A', location: 'A-03-02', qty: 80, available: 80, reserved: 0 },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <button onClick={() => onNavigate('inventory-list')} className="p-1 rounded hover:bg-gray-100">
          <ArrowLeft size={18} className="text-gray-600" />
        </button>
        <h2 className="text-lg font-semibold text-gray-900">库存明细</h2>
      </div>

      {/* SKU Info */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <Package size={24} className="text-gray-400" />
          </div>
          <div className="flex-1">
            <h3 className="text-base font-medium text-gray-900">{item.name}</h3>
            <p className="text-sm text-gray-500 font-mono mt-1">{item.skuCode}</p>
            <div className="flex gap-4 mt-2">
              <span className="text-sm text-gray-500">类目：{item.category}</span>
              <span className="text-sm text-gray-500">总库存：{item.qty}</span>
              <span className={`px-2 py-0.5 text-xs rounded ${statusColors[item.status]}`}>{item.status}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: '总库存', value: item.qty },
          { label: '可用库存', value: item.available },
          { label: '预占库存', value: item.reserved },
          { label: '安全库存', value: item.safetyStock },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-lg border border-gray-200 p-4 text-center">
            <p className="text-sm text-gray-500">{s.label}</p>
            <p className="text-xl font-bold text-gray-900 mt-1">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Warehouse Distribution */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="px-4 py-3 border-b border-gray-100">
          <h3 className="text-sm font-medium text-gray-900">仓库/库位分布</h3>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 text-left">
              <th className="px-4 py-3 font-medium text-gray-600">仓库</th>
              <th className="px-4 py-3 font-medium text-gray-600">库区</th>
              <th className="px-4 py-3 font-medium text-gray-600">库位</th>
              <th className="px-4 py-3 font-medium text-gray-600">库存数量</th>
              <th className="px-4 py-3 font-medium text-gray-600">可用库存</th>
              <th className="px-4 py-3 font-medium text-gray-600">预占数量</th>
            </tr>
          </thead>
          <tbody>
            {warehouseDistribution.map((d, idx) => (
              <tr key={idx} className="border-b border-gray-50 hover:bg-gray-50">
                <td className="px-4 py-3 text-gray-900">{d.warehouse}</td>
                <td className="px-4 py-3 text-gray-600">{d.zone}</td>
                <td className="px-4 py-3 font-mono text-xs text-gray-600">{d.location}</td>
                <td className="px-4 py-3 text-gray-900 font-medium">{d.qty}</td>
                <td className="px-4 py-3 text-gray-600">{d.available}</td>
                <td className="px-4 py-3 text-gray-600">{d.reserved}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function StocktakeListPage({ onNavigate }: { onNavigate: (page: string) => void }) {
  const [statusFilter, setStatusFilter] = useState('');

  const filtered = stocktakeOrders.filter((o) => !statusFilter || o.status === statusFilter);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">盘点列表</h2>
        <button
          onClick={() => onNavigate('stocktake-add')}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700"
        >
          <Plus size={16} /> 新建盘点
        </button>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex gap-2">
          {['', '待盘点', '盘点中', '已完成', '已终止'].map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                statusFilter === s
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {s || '全部'}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 text-left">
              <th className="px-4 py-3 font-medium text-gray-600">盘点单号</th>
              <th className="px-4 py-3 font-medium text-gray-600">仓库</th>
              <th className="px-4 py-3 font-medium text-gray-600">盘点模式</th>
              <th className="px-4 py-3 font-medium text-gray-600">盘点范围</th>
              <th className="px-4 py-3 font-medium text-gray-600">状态</th>
              <th className="px-4 py-3 font-medium text-gray-600">盘点进度</th>
              <th className="px-4 py-3 font-medium text-gray-600">差异数</th>
              <th className="px-4 py-3 font-medium text-gray-600">创建时间</th>
              <th className="px-4 py-3 font-medium text-gray-600">操作人</th>
              <th className="px-4 py-3 font-medium text-gray-600">操作</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((order) => (
              <tr key={order.id} className="border-b border-gray-50 hover:bg-gray-50">
                <td className="px-4 py-3 font-mono text-xs text-blue-600">{order.id}</td>
                <td className="px-4 py-3 text-gray-600">{order.warehouse}</td>
                <td className="px-4 py-3 text-gray-600">{order.mode}</td>
                <td className="px-4 py-3 text-gray-500 text-xs">{order.scope}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-0.5 text-xs rounded ${statusColors[order.status]}`}>{order.status}</span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 bg-gray-100 rounded overflow-hidden max-w-[100px]">
                      <div
                        className="h-full bg-blue-500 rounded"
                        style={{ width: `${order.totalCount > 0 ? (order.countedCount / order.totalCount) * 100 : 0}%` }}
                      />
                    </div>
                    <span className="text-xs text-gray-500">{order.countedCount}/{order.totalCount}</span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className={`font-medium ${order.diffCount > 0 ? 'text-red-600' : 'text-gray-500'}`}>
                    {order.diffCount}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-500 text-xs">{order.createdAt}</td>
                <td className="px-4 py-3 text-gray-600">{order.operator}</td>
                <td className="px-4 py-3">
                  <button onClick={() => onNavigate('stocktake-detail')} className="text-blue-600 text-xs hover:underline">查看</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function StocktakeAddPage({ onNavigate }: { onNavigate: (page: string) => void }) {
  const [mode, setMode] = useState('static');
  const [scope, setScope] = useState('all');
  const [showConfirm, setShowConfirm] = useState(false);
  const [warehouse, setWarehouse] = useState('');

  const handleSubmit = () => {
    if (mode === 'static') {
      setShowConfirm(true);
    } else {
      onNavigate('stocktake-list');
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <button onClick={() => onNavigate('stocktake-list')} className="p-1 rounded hover:bg-gray-100">
          <ArrowLeft size={18} className="text-gray-600" />
        </button>
        <h2 className="text-lg font-semibold text-gray-900">新建盘点</h2>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6 max-w-2xl space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">盘点仓库 <span className="text-red-500">*</span></label>
          <select
            value={warehouse}
            onChange={(e) => setWarehouse(e.target.value)}
            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="">请选择仓库</option>
            {warehouses.filter((w) => w.type === 'physical').map((w) => (
              <option key={w.id} value={w.name}>{w.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">盘点模式 <span className="text-red-500">*</span></label>
          <div className="flex gap-4">
            <label
              className={`flex-1 p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                mode === 'static' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <input type="radio" name="mode" checked={mode === 'static'} onChange={() => setMode('static')} className="sr-only" />
              <div className="flex items-center gap-3">
                <ScanLine size={20} className={mode === 'static' ? 'text-blue-600' : 'text-gray-400'} />
                <div>
                  <p className="text-sm font-medium text-gray-900">静态盘点</p>
                  <p className="text-xs text-gray-500 mt-0.5">盘点期间冻结库存操作，适合小批量精准盘点</p>
                </div>
              </div>
            </label>
            <label
              className={`flex-1 p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                mode === 'dynamic' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <input type="radio" name="mode" checked={mode === 'dynamic'} onChange={() => setMode('dynamic')} className="sr-only" />
              <div className="flex items-center gap-3">
                <RefreshCw size={20} className={mode === 'dynamic' ? 'text-blue-600' : 'text-gray-400'} />
                <div>
                  <p className="text-sm font-medium text-gray-900">动态盘点</p>
                  <p className="text-xs text-gray-500 mt-0.5">盘点期间允许正常出入库，适合大批量不停业盘点</p>
                </div>
              </div>
            </label>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">盘点范围 <span className="text-red-500">*</span></label>
          <div className="flex gap-3">
            {[
              { value: 'all', label: '全仓盘点' },
              { value: 'zone', label: '指定库区' },
              { value: 'sku', label: '指定SKU' },
            ].map((opt) => (
              <label key={opt.value} className="flex items-center gap-2 text-sm">
                <input
                  type="radio"
                  name="scope"
                  checked={scope === opt.value}
                  onChange={() => setScope(opt.value)}
                  className="rounded"
                />
                {opt.label}
              </label>
            ))}
          </div>
        </div>

        {scope === 'zone' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">选择库区</label>
            <select className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500">
              <option>A区-电子产品</option>
              <option>B区-家居用品</option>
              <option>C区-箱包</option>
            </select>
          </div>
        )}

        {scope === 'sku' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">选择SKU</label>
            <input type="text" placeholder="请输入SKU编码或名称搜索" className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500" />
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">备注</label>
          <textarea rows={3} placeholder="请输入盘点备注" className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500" />
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <button onClick={() => onNavigate('stocktake-list')} className="px-4 py-2 text-sm border border-gray-200 rounded-md hover:bg-gray-50">取消</button>
          <button onClick={handleSubmit} className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700">提交盘点</button>
        </div>
      </div>

      {/* Static mode confirm dialog */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full mx-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
                <AlertTriangle size={20} className="text-yellow-600" />
              </div>
              <h3 className="text-base font-medium text-gray-900">确认静态盘点？</h3>
            </div>
            <p className="text-sm text-gray-600 mb-6">
              静态盘点期间，该仓库的库存出入库操作将被<strong className="text-gray-900">冻结</strong>。盘点完成后自动恢复。请确认是否继续？
            </p>
            <div className="flex justify-end gap-3">
              <button onClick={() => setShowConfirm(false)} className="px-4 py-2 text-sm border border-gray-200 rounded-md hover:bg-gray-50">取消</button>
              <button onClick={() => { setShowConfirm(false); onNavigate('stocktake-list'); }} className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700">确认提交</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export function StocktakeDetailPage({ onNavigate }: { onNavigate: (page: string) => void }) {
  const order = stocktakeOrders[0];
  const detailItems = [
    { skuCode: 'SKU-A001-01', name: '蓝牙耳机 TWS Pro Max - 黑色', systemQty: 520, actualQty: 518, diff: -2, location: 'A-01-03' },
    { skuCode: 'SKU-A001-02', name: '蓝牙耳机 TWS Pro Max - 白色', systemQty: 380, actualQty: 380, diff: 0, location: 'A-01-05' },
    { skuCode: 'SKU-E005-01', name: 'LED台灯 护眼学习灯', systemQty: 45, actualQty: 42, diff: -3, location: 'B-02-01' },
    { skuCode: 'SKU-G007-01', name: '无线充电板 15W', systemQty: 18, actualQty: 18, diff: 0, location: 'A-03-02' },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <button onClick={() => onNavigate('stocktake-list')} className="p-1 rounded hover:bg-gray-100">
          <ArrowLeft size={18} className="text-gray-600" />
        </button>
        <h2 className="text-lg font-semibold text-gray-900">盘点详情</h2>
        <span className={`px-2 py-0.5 text-xs rounded ${statusColors[order.status]}`}>{order.status}</span>
      </div>

      {/* Order Info */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="grid grid-cols-4 gap-4">
          <div>
            <p className="text-xs text-gray-500">盘点单号</p>
            <p className="text-sm font-mono text-gray-900">{order.id}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">盘点仓库</p>
            <p className="text-sm text-gray-900">{order.warehouse}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">盘点模式</p>
            <p className="text-sm text-gray-900">{order.mode}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">盘点范围</p>
            <p className="text-sm text-gray-900">{order.scope}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">创建时间</p>
            <p className="text-sm text-gray-900">{order.createdAt}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">操作人</p>
            <p className="text-sm text-gray-900">{order.operator}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">盘点进度</p>
            <p className="text-sm text-gray-900">{order.countedCount}/{order.totalCount}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">差异数</p>
            <p className={`text-sm font-medium ${order.diffCount > 0 ? 'text-red-600' : 'text-gray-900'}`}>{order.diffCount}</p>
          </div>
        </div>
      </div>

      {/* Detail Items */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="px-4 py-3 border-b border-gray-100">
          <h3 className="text-sm font-medium text-gray-900">盘点明细</h3>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 text-left">
              <th className="px-4 py-3 font-medium text-gray-600">SKU编码</th>
              <th className="px-4 py-3 font-medium text-gray-600">商品名称</th>
              <th className="px-4 py-3 font-medium text-gray-600">库位</th>
              <th className="px-4 py-3 font-medium text-gray-600">系统数量</th>
              <th className="px-4 py-3 font-medium text-gray-600">实盘数量</th>
              <th className="px-4 py-3 font-medium text-gray-600">差异数量</th>
            </tr>
          </thead>
          <tbody>
            {detailItems.map((item) => (
              <tr key={item.skuCode} className="border-b border-gray-50 hover:bg-gray-50">
                <td className="px-4 py-3 font-mono text-xs text-blue-600">{item.skuCode}</td>
                <td className="px-4 py-3 text-gray-900">{item.name}</td>
                <td className="px-4 py-3 font-mono text-xs text-gray-600">{item.location}</td>
                <td className="px-4 py-3 text-gray-600">{item.systemQty}</td>
                <td className="px-4 py-3 text-gray-900">{item.actualQty}</td>
                <td className="px-4 py-3">
                  <span className={`font-medium ${item.diff > 0 ? 'text-green-600' : item.diff < 0 ? 'text-red-600' : 'text-gray-500'}`}>
                    {item.diff > 0 ? '+' : ''}{item.diff}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function TransferListPage({ onNavigate }: { onNavigate: (page: string) => void }) {
  const [statusFilter, setStatusFilter] = useState('');
  const filtered = transferOrders.filter((o) => !statusFilter || o.status === statusFilter);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">调拨列表</h2>
        <button
          onClick={() => onNavigate('transfer-add')}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700"
        >
          <Plus size={16} /> 新建调拨
        </button>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex gap-2">
          {['', '待发货', '运输中', '待收货', '已完成', '已取消'].map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                statusFilter === s
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {s || '全部'}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 text-left">
              <th className="px-4 py-3 font-medium text-gray-600">调拨单号</th>
              <th className="px-4 py-3 font-medium text-gray-600">调出仓库</th>
              <th className="px-4 py-3 font-medium text-gray-600">调入仓库</th>
              <th className="px-4 py-3 font-medium text-gray-600">SKU数</th>
              <th className="px-4 py-3 font-medium text-gray-600">总数量</th>
              <th className="px-4 py-3 font-medium text-gray-600">状态</th>
              <th className="px-4 py-3 font-medium text-gray-600">承运商</th>
              <th className="px-4 py-3 font-medium text-gray-600">创建时间</th>
              <th className="px-4 py-3 font-medium text-gray-600">预计到达</th>
              <th className="px-4 py-3 font-medium text-gray-600">操作</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((order) => (
              <tr key={order.id} className="border-b border-gray-50 hover:bg-gray-50">
                <td className="px-4 py-3 font-mono text-xs text-blue-600">{order.id}</td>
                <td className="px-4 py-3 text-gray-600">{order.from}</td>
                <td className="px-4 py-3 text-gray-600">{order.to}</td>
                <td className="px-4 py-3 text-gray-600">{order.skuCount}</td>
                <td className="px-4 py-3 text-gray-900 font-medium">{order.totalQty}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-0.5 text-xs rounded ${statusColors[order.status]}`}>{order.status}</span>
                </td>
                <td className="px-4 py-3 text-gray-500">{order.carrier}</td>
                <td className="px-4 py-3 text-gray-500 text-xs">{order.createdAt}</td>
                <td className="px-4 py-3 text-gray-500 text-xs">{order.eta}</td>
                <td className="px-4 py-3">
                  <button onClick={() => onNavigate('transfer-detail')} className="text-blue-600 text-xs hover:underline">查看</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function TransferAddPage({ onNavigate }: { onNavigate: (page: string) => void }) {
  const [fromWarehouse, setFromWarehouse] = useState('');
  const [toWarehouse, setToWarehouse] = useState('');
  const [skuItems, setSkuItems] = useState([
    { skuCode: '', name: '', maxQty: 0, transferQty: 0 },
  ]);

  const addSkuItem = () => {
    setSkuItems([...skuItems, { skuCode: '', name: '', maxQty: 0, transferQty: 0 }]);
  };

  const removeSkuItem = (idx: number) => {
    setSkuItems(skuItems.filter((_, i) => i !== idx));
  };

  const updateTransferQty = (idx: number, qty: number) => {
    const updated = [...skuItems];
    updated[idx].transferQty = qty;
    setSkuItems(updated);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <button onClick={() => onNavigate('transfer-list')} className="p-1 rounded hover:bg-gray-100">
          <ArrowLeft size={18} className="text-gray-600" />
        </button>
        <h2 className="text-lg font-semibold text-gray-900">新建调拨</h2>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">调出仓库 <span className="text-red-500">*</span></label>
            <select
              value={fromWarehouse}
              onChange={(e) => setFromWarehouse(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="">请选择调出仓库</option>
              {warehouses.filter((w) => w.type === 'physical').map((w) => (
                <option key={w.id} value={w.name}>{w.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">调入仓库 <span className="text-red-500">*</span></label>
            <select
              value={toWarehouse}
              onChange={(e) => setToWarehouse(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="">请选择调入仓库</option>
              {warehouses.filter((w) => w.type === 'physical' && w.name !== fromWarehouse).map((w) => (
                <option key={w.id} value={w.name}>{w.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">备注</label>
          <textarea rows={2} placeholder="请输入调拨备注" className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500" />
        </div>
      </div>

      {/* SKU Items */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
          <h3 className="text-sm font-medium text-gray-900">调拨商品</h3>
          <button onClick={addSkuItem} className="flex items-center gap-1 px-2 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700">
            <Plus size={12} /> 添加商品
          </button>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 text-left">
              <th className="px-4 py-3 font-medium text-gray-600">SKU编码</th>
              <th className="px-4 py-3 font-medium text-gray-600">商品名称</th>
              <th className="px-4 py-3 font-medium text-gray-600">可用库存</th>
              <th className="px-4 py-3 font-medium text-gray-600">调拨数量</th>
              <th className="px-4 py-3 font-medium text-gray-600">操作</th>
            </tr>
          </thead>
          <tbody>
            {skuItems.map((item, idx) => (
              <tr key={idx} className="border-b border-gray-50">
                <td className="px-4 py-3">
                  <input type="text" placeholder="SKU编码" className="px-2 py-1 border border-gray-200 rounded text-sm w-32" />
                </td>
                <td className="px-4 py-3 text-gray-500 text-xs">-</td>
                <td className="px-4 py-3 text-gray-500">-</td>
                <td className="px-4 py-3">
                  <input
                    type="number"
                    value={item.transferQty || ''}
                    onChange={(e) => updateTransferQty(idx, Number(e.target.value))}
                    className="px-2 py-1 border border-gray-200 rounded text-sm w-20"
                    min={0}
                  />
                </td>
                <td className="px-4 py-3">
                  {skuItems.length > 1 && (
                    <button onClick={() => removeSkuItem(idx)} className="text-red-500 hover:text-red-700">
                      <Trash2 size={14} />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-end gap-3">
        <button onClick={() => onNavigate('transfer-list')} className="px-4 py-2 text-sm border border-gray-200 rounded-md hover:bg-gray-50">取消</button>
        <button onClick={() => onNavigate('transfer-list')} className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700">提交调拨</button>
      </div>
    </div>
  );
}

export function TransferDetailPage({ onNavigate }: { onNavigate: (page: string) => void }) {
  const order = transferOrders[0];

  const timeline = [
    { time: '2026-09-13 08:00', event: '创建调拨单', status: 'done' },
    { time: '2026-09-13 10:30', event: '仓库拣货完成', status: 'done' },
    { time: '2026-09-13 14:00', event: '已交付承运商（递四方）', status: 'done' },
    { time: '2026-09-14 09:00', event: '运输中 - 已到达广州中转站', status: 'current' },
    { time: '预计 2026-09-20', event: '到达美国海外仓', status: 'pending' },
    { time: '预计 2026-09-21', event: '收货确认入库', status: 'pending' },
  ];

  const skuItems = [
    { skuCode: 'SKU-A001-01', name: '蓝牙耳机 TWS Pro Max - 黑色', qty: 200 },
    { skuCode: 'SKU-A001-02', name: '蓝牙耳机 TWS Pro Max - 白色', qty: 150 },
    { skuCode: 'SKU-D004-01', name: '不锈钢保温杯 500ml - 银色', qty: 100 },
    { skuCode: 'SKU-D004-02', name: '不锈钢保温杯 500ml - 黑色', qty: 30 },
    { skuCode: 'SKU-F006-01', name: '运动腰包 防水跑步包', qty: 20 },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <button onClick={() => onNavigate('transfer-list')} className="p-1 rounded hover:bg-gray-100">
          <ArrowLeft size={18} className="text-gray-600" />
        </button>
        <h2 className="text-lg font-semibold text-gray-900">调拨详情</h2>
        <span className={`px-2 py-0.5 text-xs rounded ${statusColors[order.status]}`}>{order.status}</span>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Order Info */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 space-y-3">
          <h3 className="text-sm font-medium text-gray-900">调拨信息</h3>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <p className="text-xs text-gray-500">调拨单号</p>
              <p className="font-mono text-gray-900">{order.id}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">创建时间</p>
              <p className="text-gray-900">{order.createdAt}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">调出仓库</p>
              <p className="text-gray-900">{order.from}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">调入仓库</p>
              <p className="text-gray-900">{order.to}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">承运商</p>
              <p className="text-gray-900">{order.carrier}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">物流单号</p>
              <p className="font-mono text-xs text-gray-900">{order.trackingNo}</p>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <h3 className="text-sm font-medium text-gray-900 mb-4">物流轨迹</h3>
          <div className="space-y-0">
            {timeline.map((item, idx) => (
              <div key={idx} className="flex gap-3 relative">
                <div className="flex flex-col items-center">
                  <div className={`w-3 h-3 rounded-full flex-shrink-0 mt-0.5 ${
                    item.status === 'done' ? 'bg-green-500' :
                    item.status === 'current' ? 'bg-blue-500 ring-2 ring-blue-200' :
                    'bg-gray-300'
                  }`} />
                  {idx < timeline.length - 1 && (
                    <div className={`w-0.5 flex-1 min-h-[24px] ${
                      item.status === 'done' ? 'bg-green-200' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
                <div className="pb-4">
                  <p className={`text-sm ${item.status === 'pending' ? 'text-gray-400' : 'text-gray-900'}`}>{item.event}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SKU Items */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="px-4 py-3 border-b border-gray-100">
          <h3 className="text-sm font-medium text-gray-900">调拨商品</h3>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 text-left">
              <th className="px-4 py-3 font-medium text-gray-600">SKU编码</th>
              <th className="px-4 py-3 font-medium text-gray-600">商品名称</th>
              <th className="px-4 py-3 font-medium text-gray-600">调拨数量</th>
            </tr>
          </thead>
          <tbody>
            {skuItems.map((item) => (
              <tr key={item.skuCode} className="border-b border-gray-50 hover:bg-gray-50">
                <td className="px-4 py-3 font-mono text-xs text-blue-600">{item.skuCode}</td>
                <td className="px-4 py-3 text-gray-900">{item.name}</td>
                <td className="px-4 py-3 text-gray-900 font-medium">{item.qty}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function WarehouseListPage({ onNavigate }: { onNavigate: (page: string) => void }) {
  const [expandedWh, setExpandedWh] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedWh(expandedWh === id ? null : id);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">仓库列表</h2>
        <button
          onClick={() => onNavigate('warehouse-add')}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700"
        >
          <Plus size={16} /> 新建仓库
        </button>
      </div>

      {/* Physical Warehouses */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="px-4 py-3 border-b border-gray-100">
          <h3 className="text-sm font-medium text-gray-900">实体仓库</h3>
        </div>
        <div className="divide-y divide-gray-50">
          {warehouses.filter((w) => w.type === 'physical').map((wh) => (
            <div key={wh.id}>
              <div className="flex items-center px-4 py-3 hover:bg-gray-50">
                <button onClick={() => toggleExpand(wh.id)} className="mr-2 text-gray-400 hover:text-gray-600">
                  {expandedWh === wh.id ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                </button>
                <Warehouse size={18} className="text-gray-400 mr-3" />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-900">{wh.name}</span>
                    <span className={`px-1.5 py-0.5 text-[10px] rounded ${statusColors[wh.status]}`}>{wh.status}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5">{wh.address}</p>
                </div>
                <div className="flex items-center gap-6 text-sm text-gray-600">
                  <span>SKU: <strong>{wh.skuCount}</strong></span>
                  <span>库存: <strong>{wh.totalQty.toLocaleString()}</strong></span>
                </div>
                <div className="flex items-center gap-1 ml-4">
                  <button onClick={() => onNavigate('warehouse-add')} className="p-1.5 rounded hover:bg-gray-100 text-gray-400 hover:text-blue-600">
                    <Edit3 size={14} />
                  </button>
                  <button onClick={() => onNavigate('location-manage')} className="p-1.5 rounded hover:bg-gray-100 text-gray-400 hover:text-blue-600">
                    <MapPin size={14} />
                  </button>
                </div>
              </div>
              {expandedWh === wh.id && (
                <div className="bg-gray-50 px-8 py-3 border-t border-gray-100">
                  <div className="text-sm text-gray-600 space-y-1">
                    <p>仓库编码：{wh.id.toUpperCase()}</p>
                    <p>仓库类型：实体仓库</p>
                    <p>库区数量：{warehouseZones.filter((z) => z.warehouse === wh.name).length}</p>
                    <div className="flex gap-2 mt-2">
                      <button onClick={() => onNavigate('location-manage')} className="text-xs text-blue-600 hover:underline">库位管理</button>
                      <button onClick={() => onNavigate('warehouse-add')} className="text-xs text-blue-600 hover:underline">编辑仓库</button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Virtual Warehouses */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="px-4 py-3 border-b border-gray-100">
          <h3 className="text-sm font-medium text-gray-900">系统预置虚拟仓</h3>
          <p className="text-xs text-gray-500 mt-0.5">虚拟仓库由系统自动管理，不可直接操作库存</p>
        </div>
        <div className="divide-y divide-gray-50">
          {warehouses.filter((w) => w.type === 'virtual').map((wh) => (
            <div key={wh.id} className="flex items-center px-4 py-3 hover:bg-gray-50">
              <Box size={18} className="text-gray-400 mr-3" />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-900">{wh.name}</span>
                  <span className="px-1.5 py-0.5 text-[10px] rounded bg-blue-100 text-blue-700">虚拟仓</span>
                </div>
              </div>
              <div className="flex items-center gap-6 text-sm text-gray-600">
                <span>SKU: <strong>{wh.skuCount}</strong></span>
                <span>库存: <strong>{wh.totalQty.toLocaleString()}</strong></span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function WarehouseAddPage({ onNavigate }: { onNavigate: (page: string) => void }) {
  const [zones, setZones] = useState([
    { name: '', type: '存储区', locationCount: 0 },
  ]);

  const addZone = () => {
    setZones([...zones, { name: '', type: '存储区', locationCount: 0 }]);
  };

  const removeZone = (idx: number) => {
    setZones(zones.filter((_, i) => i !== idx));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <button onClick={() => onNavigate('warehouse-list')} className="p-1 rounded hover:bg-gray-100">
          <ArrowLeft size={18} className="text-gray-600" />
        </button>
        <h2 className="text-lg font-semibold text-gray-900">新建仓库</h2>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-4">
        <h3 className="text-sm font-medium text-gray-900">基础信息</h3>
        <div className="grid grid-cols-2 gap-4 max-w-2xl">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">仓库名称 <span className="text-red-500">*</span></label>
            <input type="text" placeholder="请输入仓库名称" className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">仓库编码</label>
            <input type="text" placeholder="系统自动生成" disabled className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md bg-gray-50 text-gray-400" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">仓库类型 <span className="text-red-500">*</span></label>
            <select className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500">
              <option>实体仓库</option>
              <option>海外仓</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">仓库状态</label>
            <select className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500">
              <option>启用</option>
              <option>停用</option>
            </select>
          </div>
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">仓库地址 <span className="text-red-500">*</span></label>
            <input type="text" placeholder="请输入仓库详细地址" className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">联系人</label>
            <input type="text" placeholder="请输入仓库联系人" className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">联系电话</label>
            <input type="text" placeholder="请输入联系电话" className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500" />
          </div>
        </div>
      </div>

      {/* Warehouse Zones */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-gray-900">库区设置</h3>
          <button onClick={addZone} className="flex items-center gap-1 px-2 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700">
            <Plus size={12} /> 添加库区
          </button>
        </div>
        <div className="space-y-3">
          {zones.map((zone, idx) => (
            <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-sm text-gray-500 w-6">{idx + 1}.</span>
              <input
                type="text"
                placeholder="库区名称"
                value={zone.name}
                onChange={(e) => {
                  const updated = [...zones];
                  updated[idx].name = e.target.value;
                  setZones(updated);
                }}
                className="flex-1 px-3 py-1.5 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <select
                value={zone.type}
                onChange={(e) => {
                  const updated = [...zones];
                  updated[idx].type = e.target.value;
                  setZones(updated);
                }}
                className="px-3 py-1.5 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option>存储区</option>
                <option>拣货区</option>
                <option>退货区</option>
                <option>待检区</option>
              </select>
              <input
                type="number"
                placeholder="库位数"
                value={zone.locationCount || ''}
                onChange={(e) => {
                  const updated = [...zones];
                  updated[idx].locationCount = Number(e.target.value);
                  setZones(updated);
                }}
                className="w-24 px-3 py-1.5 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              {zones.length > 1 && (
                <button onClick={() => removeZone(idx)} className="p-1.5 rounded hover:bg-gray-200 text-gray-400 hover:text-red-600">
                  <Trash2 size={14} />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end gap-3">
        <button onClick={() => onNavigate('warehouse-list')} className="px-4 py-2 text-sm border border-gray-200 rounded-md hover:bg-gray-50">取消</button>
        <button onClick={() => onNavigate('warehouse-list')} className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700">保存</button>
      </div>
    </div>
  );
}

export function LocationManagePage({ onNavigate }: { onNavigate: (page: string) => void }) {
  const [selectedZone, setSelectedZone] = useState(warehouseZones[0].id);

  const locations = [
    { id: 'A-01-01', zone: 'A区-电子产品', type: '存储位', capacity: 500, used: 320, status: '启用' },
    { id: 'A-01-02', zone: 'A区-电子产品', type: '存储位', capacity: 500, used: 280, status: '启用' },
    { id: 'A-01-03', zone: 'A区-电子产品', type: '存储位', capacity: 500, used: 500, status: '满载' },
    { id: 'A-02-01', zone: 'A区-电子产品', type: '拣货位', capacity: 200, used: 150, status: '启用' },
    { id: 'B-01-01', zone: 'B区-家居用品', type: '存储位', capacity: 300, used: 120, status: '启用' },
    { id: 'B-01-02', zone: 'B区-家居用品', type: '存储位', capacity: 300, used: 0, status: '空闲' },
  ];

  const filteredLocations = locations.filter((l) => l.zone === warehouseZones.find((z) => z.id === selectedZone)?.name);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <button onClick={() => onNavigate('warehouse-list')} className="p-1 rounded hover:bg-gray-100">
          <ArrowLeft size={18} className="text-gray-600" />
        </button>
        <h2 className="text-lg font-semibold text-gray-900">库位管理</h2>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {/* Zone Tree */}
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="px-4 py-3 border-b border-gray-100">
            <h3 className="text-sm font-medium text-gray-900">库区结构</h3>
          </div>
          <div className="p-2">
            <div className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-900">
              <Warehouse size={16} /> 深圳仓
            </div>
            {warehouseZones.filter((z) => z.warehouse === '深圳仓').map((zone) => (
              <div key={zone.id}>
                <button
                  onClick={() => setSelectedZone(zone.id)}
                  className={`w-full flex items-center gap-2 px-6 py-1.5 text-sm rounded transition-colors ${
                    selectedZone === zone.id
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <TreePine size={14} />
                  <span>{zone.name}</span>
                  <span className="ml-auto text-xs text-gray-400">{zone.locationCount}</span>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Location List */}
        <div className="col-span-3 bg-white rounded-lg border border-gray-200">
          <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-900">
              库位列表 - {warehouseZones.find((z) => z.id === selectedZone)?.name}
            </h3>
            <button className="flex items-center gap-1 px-2 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700">
              <Plus size={12} /> 新建库位
            </button>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 text-left">
                <th className="px-4 py-3 font-medium text-gray-600">库位编号</th>
                <th className="px-4 py-3 font-medium text-gray-600">库位类型</th>
                <th className="px-4 py-3 font-medium text-gray-600">容量</th>
                <th className="px-4 py-3 font-medium text-gray-600">已用</th>
                <th className="px-4 py-3 font-medium text-gray-600">使用率</th>
                <th className="px-4 py-3 font-medium text-gray-600">状态</th>
                <th className="px-4 py-3 font-medium text-gray-600">操作</th>
              </tr>
            </thead>
            <tbody>
              {filteredLocations.map((loc) => {
                const usagePct = loc.capacity > 0 ? (loc.used / loc.capacity) * 100 : 0;
                return (
                  <tr key={loc.id} className="border-b border-gray-50 hover:bg-gray-50">
                    <td className="px-4 py-3 font-mono text-xs text-gray-900">{loc.id}</td>
                    <td className="px-4 py-3 text-gray-600">{loc.type}</td>
                    <td className="px-4 py-3 text-gray-600">{loc.capacity}</td>
                    <td className="px-4 py-3 text-gray-900">{loc.used}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-2 bg-gray-100 rounded overflow-hidden">
                          <div
                            className={`h-full rounded ${usagePct >= 100 ? 'bg-red-500' : usagePct >= 80 ? 'bg-yellow-500' : 'bg-green-500'}`}
                            style={{ width: `${Math.min(usagePct, 100)}%` }}
                          />
                        </div>
                        <span className="text-xs text-gray-500">{usagePct.toFixed(0)}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 text-xs rounded ${
                        loc.status === '启用' ? 'bg-green-100 text-green-700' :
                        loc.status === '满载' ? 'bg-red-100 text-red-700' :
                        'bg-gray-100 text-gray-500'
                      }`}>{loc.status}</span>
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
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
