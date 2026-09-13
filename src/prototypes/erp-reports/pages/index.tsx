import React, { useState } from 'react';
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  ShoppingCart,
  Package,
  BarChart3,
  ArrowUpRight,
  ArrowDownRight,
  RefreshCw,
  Download,
  Calendar,
  Filter,
  ChevronDown,
  Search,
  FileText,
  Truck,
  Clock,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Warehouse,
  Target,
  Activity,
} from 'lucide-react';

// ─── Mock Data ───────────────────────────────────────────────────────────────

const platforms = ['亚马逊', 'TEMU', 'Shopee', '速卖通', 'eBay'];
const platformColors: Record<string, string> = {
  '亚马逊': 'bg-orange-500',
  'TEMU': 'bg-red-500',
  'Shopee': 'bg-orange-400',
  '速卖通': 'bg-blue-500',
  'eBay': 'bg-blue-600',
};

const salesTrendData = [
  { day: '09/07', amount: 34500, orders: 98 },
  { day: '09/08', amount: 39200, orders: 112 },
  { day: '09/09', amount: 31800, orders: 87 },
  { day: '09/10', amount: 47600, orders: 135 },
  { day: '09/11', amount: 45680, orders: 128 },
  { day: '09/12', amount: 51200, orders: 145 },
  { day: '09/13', amount: 42800, orders: 118 },
];

const platformSales = [
  { name: '亚马逊', value: 42, amount: 182000 },
  { name: 'TEMU', value: 23, amount: 99000 },
  { name: 'Shopee', value: 18, amount: 77500 },
  { name: '速卖通', value: 11, amount: 47300 },
  { name: 'eBay', value: 6, amount: 25800 },
];

const hotProducts = [
  { rank: 1, name: '无线蓝牙耳机 TWS Pro', sku: 'SKU-BT001', platform: '亚马逊', sales: 2340, amount: '$23,400' },
  { rank: 2, name: '智能手表 Sport Max', sku: 'SKU-SW002', platform: 'TEMU', sales: 1890, amount: '$18,900' },
  { rank: 3, name: '便携式充电宝 20000mAh', sku: 'SKU-PB003', platform: '亚马逊', sales: 1560, amount: '$12,480' },
  { rank: 4, name: '儿童益智积木套装', sku: 'SKU-TY004', platform: 'Shopee', sales: 1420, amount: '$8,520' },
  { rank: 5, name: '防水运动腰包', sku: 'SKU-BG005', platform: '速卖通', sales: 1280, amount: '$6,400' },
  { rank: 6, name: 'LED台灯护眼款', sku: 'SKU-LD006', platform: '亚马逊', sales: 1150, amount: '$9,200' },
  { rank: 7, name: '车载手机支架', sku: 'SKU-CM007', platform: 'eBay', sales: 980, amount: '$4,900' },
  { rank: 8, name: '迷你便携风扇', sku: 'SKU-FN008', platform: 'TEMU', sales: 920, amount: '$4,600' },
  { rank: 9, name: '瑜伽弹力带套装', sku: 'SKU-YG009', platform: 'Shopee', sales: 870, amount: '$5,220' },
  { rank: 10, name: 'USB-C数据线3合1', sku: 'SKU-UC010', platform: '速卖通', sales: 830, amount: '$2,490' },
];

const salesReportData = [
  { platform: '亚马逊', site: '美国站', store: '旗舰店', category: '电子产品', spu: 'TWS Pro', sku: 'SKU-BT001-BLK', sales: 23400, orders: 234, avgPrice: 100, refundAmount: 468, refundRate: 2.0 },
  { platform: '亚马逊', site: '欧洲站', store: '旗舰店', category: '电子产品', spu: 'Sport Max', sku: 'SKU-SW002-BLU', sales: 18900, orders: 189, avgPrice: 100, refundAmount: 378, refundRate: 2.0 },
  { platform: 'TEMU', site: '美国站', store: '直营店', category: '家居', spu: '充电宝20000', sku: 'SKU-PB003-WHT', sales: 12480, orders: 312, avgPrice: 40, refundAmount: 624, refundRate: 5.0 },
  { platform: 'Shopee', site: '马来西亚', store: '专营店', category: '玩具', spu: '积木套装', sku: 'SKU-TY004-MIX', sales: 8520, orders: 284, avgPrice: 30, refundAmount: 426, refundRate: 5.0 },
  { platform: '速卖通', site: '俄罗斯', store: '旗舰店', category: '运动户外', spu: '运动腰包', sku: 'SKU-BG005-BLK', sales: 6400, orders: 160, avgPrice: 40, refundAmount: 192, refundRate: 3.0 },
  { platform: 'eBay', site: '美国站', store: '专卖店', category: '汽车配件', spu: '车载支架', sku: 'SKU-CM007-GRY', sales: 4900, orders: 98, avgPrice: 50, refundAmount: 147, refundRate: 3.0 },
  { platform: '亚马逊', site: '日本站', store: '旗舰店', category: '家居', spu: 'LED台灯', sku: 'SKU-LD006-WHT', sales: 9200, orders: 115, avgPrice: 80, refundAmount: 184, refundRate: 2.0 },
  { platform: 'TEMU', site: '欧洲站', store: '直营店', category: '小家电', spu: '迷你风扇', sku: 'SKU-FN008-GRN', sales: 4600, orders: 230, avgPrice: 20, refundAmount: 230, refundRate: 5.0 },
];

const inventorySummary = [
  { warehouse: '深圳主仓', category: '电子产品', totalSku: 156, totalQty: 28400, totalValue: 1420000, safetyStock: 3200, belowSafety: 12 },
  { warehouse: '深圳主仓', category: '家居', totalSku: 89, totalQty: 15600, totalValue: 468000, safetyStock: 1800, belowSafety: 5 },
  { warehouse: '深圳主仓', category: '运动户外', totalSku: 67, totalQty: 9800, totalValue: 294000, safetyStock: 1200, belowSafety: 3 },
  { warehouse: '海外仓-美西', category: '电子产品', totalSku: 45, totalQty: 6200, totalValue: 310000, safetyStock: 800, belowSafety: 2 },
  { warehouse: '海外仓-美西', category: '玩具', totalSku: 32, totalQty: 4500, totalValue: 135000, safetyStock: 600, belowSafety: 1 },
  { warehouse: '海外仓-欧洲', category: '电子产品', totalSku: 38, totalQty: 5100, totalValue: 255000, safetyStock: 700, belowSafety: 4 },
  { warehouse: '海外仓-日本', category: '家居', totalSku: 28, totalQty: 3200, totalValue: 96000, safetyStock: 400, belowSafety: 0 },
];

const turnoverData = [
  { warehouse: '深圳主仓', avgTurnover: 32, target: 30, status: 'normal' as const },
  { warehouse: '海外仓-美西', avgTurnover: 28, target: 25, status: 'normal' as const },
  { warehouse: '海外仓-欧洲', avgTurnover: 35, target: 30, status: 'warning' as const },
  { warehouse: '海外仓-日本', avgTurnover: 45, target: 30, status: 'danger' as const },
];

const slowMovingItems = [
  { sku: 'SKU-BT001-SLV', name: '蓝牙耳机 银色', warehouse: '深圳主仓', qty: 320, days: 95, occupiedCapital: 16000 },
  { sku: 'SKU-SW002-PNK', name: '智能手表 粉色', warehouse: '深圳主仓', qty: 180, days: 82, occupiedCapital: 18000 },
  { sku: 'SKU-TY004-RED', name: '积木套装 红色', warehouse: '海外仓-美西', qty: 250, days: 78, occupiedCapital: 7500 },
  { sku: 'SKU-LD006-BLK', name: 'LED台灯 黑色', warehouse: '海外仓-欧洲', qty: 150, days: 72, occupiedCapital: 6000 },
  { sku: 'SKU-FN008-WHT', name: '迷你风扇 白色', warehouse: '深圳主仓', qty: 420, days: 68, occupiedCapital: 4200 },
  { sku: 'SKU-YG009-GRN', name: '瑜伽弹力带 绿色', warehouse: '海外仓-日本', qty: 200, days: 65, occupiedCapital: 3000 },
];

const logisticsData = [
  { carrier: '云途物流', shipments: 1280, onTime: 1216, avgDays: 8.2, cost: 45600, rating: 4.8 },
  { carrier: '燕文物流', shipments: 860, onTime: 801, avgDays: 9.5, cost: 30100, rating: 4.5 },
  { carrier: '递四方', shipments: 650, onTime: 618, avgDays: 7.8, cost: 26000, rating: 4.7 },
  { carrier: '纵腾集团', shipments: 520, onTime: 489, avgDays: 10.2, cost: 18200, rating: 4.3 },
  { carrier: '4PX', shipments: 430, onTime: 400, avgDays: 8.8, cost: 17200, rating: 4.6 },
];

const deliveryTimeAnalysis = [
  { range: '3天内', count: 120, pct: 5.2 },
  { range: '4-7天', count: 580, pct: 25.2 },
  { range: '8-12天', count: 1050, pct: 45.6 },
  { range: '13-18天', count: 420, pct: 18.3 },
  { range: '18天以上', count: 130, pct: 5.7 },
];

const maxSalesAmount = Math.max(...salesTrendData.map((d) => d.amount));

// ─── Stat Card ───────────────────────────────────────────────────────────────

function StatCard({
  label,
  value,
  change,
  up,
  icon: Icon,
  color,
}: {
  label: string;
  value: string;
  change: string;
  up: boolean;
  icon: React.ElementType;
  color: string;
}) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-sm transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{label}</p>
          <p className="text-2xl font-semibold text-gray-900 mt-1">{value}</p>
          <div className="flex items-center gap-1 mt-1">
            {up ? (
              <TrendingUp size={14} className="text-green-500" />
            ) : (
              <TrendingDown size={14} className="text-red-500" />
            )}
            <span className={`text-xs ${up ? 'text-green-600' : 'text-red-600'}`}>{change}</span>
            <span className="text-xs text-gray-400">较上周</span>
          </div>
        </div>
        <div className={`w-11 h-11 rounded-lg flex items-center justify-center ${color}`}>
          <Icon size={22} />
        </div>
      </div>
    </div>
  );
}

// ─── Bar Chart ───────────────────────────────────────────────────────────────

function BarChart({ data, maxVal }: { data: typeof salesTrendData; maxVal: number }) {
  return (
    <div className="flex items-end gap-2 h-44">
      {data.map((d) => (
        <div key={d.day} className="flex-1 flex flex-col items-center gap-1">
          <span className="text-[10px] text-gray-500">¥{(d.amount / 1000).toFixed(1)}k</span>
          <div className="w-full flex justify-center">
            <div
              className="w-8 bg-blue-500 rounded-t transition-all duration-300 hover:bg-blue-600"
              style={{ height: `${(d.amount / maxVal) * 130}px` }}
            />
          </div>
          <span className="text-xs text-gray-500">{d.day}</span>
        </div>
      ))}
    </div>
  );
}

// ─── Pie Chart (div-based) ───────────────────────────────────────────────────

function PieChart({ data }: { data: typeof platformSales }) {
  const total = data.reduce((s, d) => s + d.value, 0);
  let cum = 0;
  const colors = ['bg-orange-500', 'bg-red-500', 'bg-orange-400', 'bg-blue-500', 'bg-blue-600'];

  return (
    <div className="flex items-center gap-6">
      <div className="relative w-36 h-36 flex-shrink-0">
        <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
          {data.map((d, i) => {
            const pct = (d.value / total) * 100;
            const dasharray = `${pct} ${100 - pct}`;
            const strokeDashoffset = -cum;
            cum += pct;
            const strokeColors = ['#f97316', '#ef4444', '#fb923c', '#3b82f6', '#2563eb'];
            return (
              <circle
                key={d.name}
                cx="18"
                cy="18"
                r="15.915"
                fill="none"
                stroke={strokeColors[i]}
                strokeWidth="3.5"
                strokeDasharray={dasharray}
                strokeDashoffset={strokeDashoffset}
              />
            );
          })}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-lg font-semibold text-gray-900">{total}%</span>
          <span className="text-[10px] text-gray-400">占比</span>
        </div>
      </div>
      <div className="flex-1 space-y-2">
        {data.map((d, i) => (
          <div key={d.name} className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-sm ${colors[i]}`} />
            <span className="text-sm text-gray-600 flex-1">{d.name}</span>
            <span className="text-sm font-medium text-gray-900">{d.value}%</span>
            <span className="text-xs text-gray-400">¥{(d.amount / 10000).toFixed(1)}万</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Business Overview Page ──────────────────────────────────────────────────

function BusinessOverviewPage() {
  return (
    <div className="space-y-4">
      <div data-annotation-id="data-scope" className="grid grid-cols-5 gap-4">
        <div data-annotation-id="yoy-mom" className="contents">
          <StatCard label="销售额" value="¥30.2万" change="+12.5%" up icon={DollarSign} color="text-green-600 bg-green-50" />
          <StatCard label="订单量" value="823" change="+8.3%" up icon={ShoppingCart} color="text-blue-600 bg-blue-50" />
          <StatCard label="客单价" value="¥367" change="+3.8%" up icon={Target} color="text-purple-600 bg-purple-50" />
          <StatCard label="退款率" value="3.2%" change="-0.5%" up icon={RefreshCw} color="text-orange-600 bg-orange-50" />
          <StatCard label="库存周转率" value="4.2次" change="+0.3" up icon={Activity} color="text-cyan-600 bg-cyan-50" />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {/* Sales Trend */}
        <div className="col-span-2 bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-900">近7日销售趋势</h3>
            <div className="flex items-center gap-3 text-xs text-gray-400">
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-500" />销售额</span>
              <span>单位：元</span>
            </div>
          </div>
          <BarChart data={salesTrendData} maxVal={maxSalesAmount} />
        </div>

        {/* Platform Sales Pie */}
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <h3 className="text-sm font-medium text-gray-900 mb-4">平台销售占比</h3>
          <PieChart data={platformSales} />
        </div>
      </div>

      {/* Top 10 Hot Products */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
          <h3 className="text-sm font-medium text-gray-900">热销商品 TOP 10</h3>
          <button data-annotation-id="export" className="text-xs text-blue-600 hover:text-blue-700">导出</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500 bg-gray-50">
                <th className="px-4 py-2.5 font-medium">排名</th>
                <th className="px-4 py-2.5 font-medium">商品名称</th>
                <th className="px-4 py-2.5 font-medium">SKU</th>
                <th className="px-4 py-2.5 font-medium">平台</th>
                <th className="px-4 py-2.5 font-medium text-right">销量</th>
                <th className="px-4 py-2.5 font-medium text-right">销售额</th>
              </tr>
            </thead>
            <tbody>
              {hotProducts.map((p) => (
                <tr key={p.rank} className="border-t border-gray-50 hover:bg-gray-50">
                  <td className="px-4 py-2.5">
                    <span className={`inline-flex items-center justify-center w-5 h-5 rounded text-xs font-medium ${
                      p.rank <= 3 ? 'bg-orange-100 text-orange-700' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {p.rank}
                    </span>
                  </td>
                  <td className="px-4 py-2.5 text-gray-900 font-medium">{p.name}</td>
                  <td className="px-4 py-2.5 text-gray-500">{p.sku}</td>
                  <td className="px-4 py-2.5">
                    <span className="px-2 py-0.5 rounded text-xs bg-gray-100 text-gray-600">{p.platform}</span>
                  </td>
                  <td className="px-4 py-2.5 text-right text-gray-900">{p.sales.toLocaleString()}</td>
                  <td className="px-4 py-2.5 text-right text-gray-900 font-medium">{p.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ─── Sales Report Page ───────────────────────────────────────────────────────

function SalesReportPage() {
  const [dateRange, setDateRange] = useState('2026-09-07 ~ 2026-09-13');
  const [dimensions, setDimensions] = useState({ platform: '全部', site: '全部', store: '全部', category: '全部', spu: '全部', sku: '全部' });

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div data-annotation-id="data-scope" className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <Calendar size={16} className="text-gray-400" />
            <input
              type="text"
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="text-sm border border-gray-200 rounded-md px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          {Object.entries(dimensions).map(([key, val]) => (
            <div key={key} className="relative">
              <select
                value={val}
                onChange={(e) => setDimensions((prev) => ({ ...prev, [key]: e.target.value }))}
                className="text-sm border border-gray-200 rounded-md px-3 py-1.5 pr-7 appearance-none focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
              >
                <option>全部</option>
                {key === 'platform' && platforms.map((p) => <option key={p}>{p}</option>)}
                {key === 'site' && ['美国站', '欧洲站', '日本站', '马来西亚', '俄罗斯'].map((s) => <option key={s}>{s}</option>)}
                {key === 'store' && ['旗舰店', '直营店', '专营店', '专卖店'].map((s) => <option key={s}>{s}</option>)}
                {key === 'category' && ['电子产品', '家居', '玩具', '运动户外', '汽车配件', '小家电'].map((c) => <option key={c}>{c}</option>)}
              </select>
              <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          ))}
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700">
            <Search size={14} />查询
          </button>
           <button data-annotation-id="export" className="flex items-center gap-1.5 px-3 py-1.5 text-sm border border-gray-200 rounded-md hover:bg-gray-50">
            <Download size={14} />导出
          </button>
        </div>
      </div>

      {/* Summary Stats */}
      <div data-annotation-id="yoy-mom" className="grid grid-cols-5 gap-4">
        <StatCard label="总销售额" value="¥88,400" change="+15.2%" up icon={DollarSign} color="text-green-600 bg-green-50" />
        <StatCard label="总订单量" value="1,622" change="+10.8%" up icon={ShoppingCart} color="text-blue-600 bg-blue-50" />
        <StatCard label="平均客单价" value="¥54.5" change="-2.1%" up={false} icon={Target} color="text-purple-600 bg-purple-50" />
        <StatCard label="退款金额" value="¥2,649" change="+1.2%" up={false} icon={RefreshCw} color="text-orange-600 bg-orange-50" />
        <StatCard label="平均退款率" value="3.3%" change="-0.2%" up icon={Activity} color="text-cyan-600 bg-cyan-50" />
      </div>

      {/* Trend Chart */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-gray-900">销售额趋势</h3>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1 text-xs rounded-md bg-blue-50 text-blue-700 font-medium">日</button>
            <button className="px-3 py-1 text-xs rounded-md text-gray-500 hover:bg-gray-50">周</button>
            <button className="px-3 py-1 text-xs rounded-md text-gray-500 hover:bg-gray-50">月</button>
          </div>
        </div>
        <BarChart data={salesTrendData} maxVal={maxSalesAmount} />
      </div>

      {/* Data Table */}
      <div data-annotation-id="drill-down" className="bg-white rounded-lg border border-gray-200">
        <div className="px-4 py-3 border-b border-gray-100">
          <h3 className="text-sm font-medium text-gray-900">销售明细</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500 bg-gray-50">
                <th className="px-4 py-2.5 font-medium">平台</th>
                <th className="px-4 py-2.5 font-medium">站点</th>
                <th className="px-4 py-2.5 font-medium">店铺</th>
                <th className="px-4 py-2.5 font-medium">类目</th>
                <th className="px-4 py-2.5 font-medium">SPU</th>
                <th className="px-4 py-2.5 font-medium">SKU</th>
                <th className="px-4 py-2.5 font-medium text-right">销售额</th>
                <th className="px-4 py-2.5 font-medium text-right">订单量</th>
                <th className="px-4 py-2.5 font-medium text-right">客单价</th>
                <th className="px-4 py-2.5 font-medium text-right">退款金额</th>
                <th className="px-4 py-2.5 font-medium text-right">退款率</th>
              </tr>
            </thead>
            <tbody>
              {salesReportData.map((row, i) => (
                <tr key={i} className="border-t border-gray-50 hover:bg-gray-50">
                  <td className="px-4 py-2.5">
                    <span className="px-2 py-0.5 rounded text-xs bg-gray-100 text-gray-600">{row.platform}</span>
                  </td>
                  <td className="px-4 py-2.5 text-gray-600">{row.site}</td>
                  <td className="px-4 py-2.5 text-gray-600">{row.store}</td>
                  <td className="px-4 py-2.5 text-gray-600">{row.category}</td>
                  <td className="px-4 py-2.5 text-gray-900">{row.spu}</td>
                  <td className="px-4 py-2.5 text-gray-500">{row.sku}</td>
                  <td className="px-4 py-2.5 text-right text-gray-900 font-medium">¥{row.sales.toLocaleString()}</td>
                  <td className="px-4 py-2.5 text-right text-gray-900">{row.orders}</td>
                  <td className="px-4 py-2.5 text-right text-gray-600">¥{row.avgPrice}</td>
                  <td className="px-4 py-2.5 text-right text-red-600">¥{row.refundAmount}</td>
                  <td className="px-4 py-2.5 text-right">
                    <span className={`px-1.5 py-0.5 rounded text-xs ${
                      row.refundRate <= 2 ? 'bg-green-50 text-green-700' :
                      row.refundRate <= 3 ? 'bg-yellow-50 text-yellow-700' :
                      'bg-red-50 text-red-700'
                    }`}>
                      {row.refundRate}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100">
          <span className="text-xs text-gray-400">共 {salesReportData.length} 条记录</span>
          <div className="flex items-center gap-1">
            <button className="px-2.5 py-1 text-xs border border-gray-200 rounded hover:bg-gray-50">上一页</button>
            <button className="px-2.5 py-1 text-xs bg-blue-600 text-white rounded">1</button>
            <button className="px-2.5 py-1 text-xs border border-gray-200 rounded hover:bg-gray-50">2</button>
            <button className="px-2.5 py-1 text-xs border border-gray-200 rounded hover:bg-gray-50">下一页</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Inventory Report Page ───────────────────────────────────────────────────

function InventoryReportPage() {
  return (
    <div className="space-y-4">
      {/* Summary */}
      <div data-annotation-id="data-scope" className="grid grid-cols-4 gap-4">
        <StatCard label="总SKU数" value="455" change="+18" up icon={Package} color="text-blue-600 bg-blue-50" />
        <StatCard label="总库存量" value="72,800" change="-2,100" up={false} icon={Warehouse} color="text-green-600 bg-green-50" />
        <StatCard label="库存总值" value="¥297.8万" change="+5.2%" up icon={DollarSign} color="text-purple-600 bg-purple-50" />
        <StatCard label="低于安全库存" value="27" change="+4" up={false} icon={AlertTriangle} color="text-red-600 bg-red-50" />
      </div>

      {/* Inventory Summary Table */}
      <div data-annotation-id="drill-down" className="bg-white rounded-lg border border-gray-200">
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
          <h3 className="text-sm font-medium text-gray-900">库存汇总</h3>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm border border-gray-200 rounded-md hover:bg-gray-50">
              <Filter size={14} />筛选
            </button>
            <button data-annotation-id="export" className="flex items-center gap-1.5 px-3 py-1.5 text-sm border border-gray-200 rounded-md hover:bg-gray-50">
              <Download size={14} />导出
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500 bg-gray-50">
                <th className="px-4 py-2.5 font-medium">仓库</th>
                <th className="px-4 py-2.5 font-medium">类目</th>
                <th className="px-4 py-2.5 font-medium text-right">SKU数</th>
                <th className="px-4 py-2.5 font-medium text-right">库存总量</th>
                <th className="px-4 py-2.5 font-medium text-right">库存总值</th>
                <th className="px-4 py-2.5 font-medium text-right">安全库存</th>
                <th className="px-4 py-2.5 font-medium text-right">低于安全库存</th>
              </tr>
            </thead>
            <tbody>
              {inventorySummary.map((row, i) => (
                <tr key={i} className="border-t border-gray-50 hover:bg-gray-50">
                  <td className="px-4 py-2.5 text-gray-900 font-medium">{row.warehouse}</td>
                  <td className="px-4 py-2.5 text-gray-600">{row.category}</td>
                  <td className="px-4 py-2.5 text-right text-gray-900">{row.totalSku}</td>
                  <td className="px-4 py-2.5 text-right text-gray-900">{row.totalQty.toLocaleString()}</td>
                  <td className="px-4 py-2.5 text-right text-gray-900 font-medium">¥{row.totalValue.toLocaleString()}</td>
                  <td className="px-4 py-2.5 text-right text-gray-600">{row.safetyStock.toLocaleString()}</td>
                  <td className="px-4 py-2.5 text-right">
                    {row.belowSafety > 0 ? (
                      <span className="text-red-600 font-medium">{row.belowSafety}</span>
                    ) : (
                      <span className="text-green-600">0</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Turnover Analysis */}
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="px-4 py-3 border-b border-gray-100">
            <h3 className="text-sm font-medium text-gray-900">库存周转分析</h3>
          </div>
          <div className="p-4 space-y-3">
            {turnoverData.map((item) => {
              const pct = Math.min((item.avgTurnover / 60) * 100, 100);
              return (
                <div key={item.warehouse}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-gray-700">{item.warehouse}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-900">{item.avgTurnover}天</span>
                      <span className="text-xs text-gray-400">目标{item.target}天</span>
                      {item.status === 'warning' && <Clock size={14} className="text-yellow-500" />}
                      {item.status === 'danger' && <AlertTriangle size={14} className="text-red-500" />}
                    </div>
                  </div>
                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        item.status === 'danger' ? 'bg-red-500' :
                        item.status === 'warning' ? 'bg-yellow-500' : 'bg-green-500'
                      }`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Slow-Moving Items */}
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="px-4 py-3 border-b border-gray-100">
            <h3 className="text-sm font-medium text-gray-900">滞销商品</h3>
            <p className="text-xs text-gray-400 mt-0.5">超过60天未动销</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500 bg-gray-50">
                  <th className="px-3 py-2 font-medium">SKU</th>
                  <th className="px-3 py-2 font-medium">商品名称</th>
                  <th className="px-3 py-2 font-medium">仓库</th>
                  <th className="px-3 py-2 font-medium text-right">库存</th>
                  <th className="px-3 py-2 font-medium text-right">滞销天数</th>
                  <th className="px-3 py-2 font-medium text-right">占用资金</th>
                </tr>
              </thead>
              <tbody>
                {slowMovingItems.map((item) => (
                  <tr key={item.sku} className="border-t border-gray-50 hover:bg-gray-50">
                    <td className="px-3 py-2 text-gray-500">{item.sku}</td>
                    <td className="px-3 py-2 text-gray-900">{item.name}</td>
                    <td className="px-3 py-2 text-gray-600">{item.warehouse}</td>
                    <td className="px-3 py-2 text-right text-gray-900">{item.qty}</td>
                    <td className="px-3 py-2 text-right">
                      <span className={`px-1.5 py-0.5 rounded text-xs ${
                        item.days >= 80 ? 'bg-red-50 text-red-700' :
                        item.days >= 70 ? 'bg-orange-50 text-orange-700' :
                        'bg-yellow-50 text-yellow-700'
                      }`}>
                        {item.days}天
                      </span>
                    </td>
                    <td className="px-3 py-2 text-right text-gray-900 font-medium">¥{item.occupiedCapital.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Logistics Report Page ───────────────────────────────────────────────────

function LogisticsReportPage() {
  return (
    <div className="space-y-4">
      {/* Summary */}
      <div data-annotation-id="data-scope" className="grid grid-cols-4 gap-4">
        <StatCard label="总发货量" value="3,740" change="+8.6%" up icon={Truck} color="text-blue-600 bg-blue-50" />
        <StatCard label="准时率" value="95.1%" change="+1.2%" up icon={CheckCircle2} color="text-green-600 bg-green-50" />
        <StatCard label="平均时效" value="8.9天" change="-0.5天" up icon={Clock} color="text-purple-600 bg-purple-50" />
        <StatCard label="物流成本" value="¥13.7万" change="+3.2%" up={false} icon={DollarSign} color="text-orange-600 bg-orange-50" />
      </div>

      {/* Carrier Comparison Table */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
          <h3 className="text-sm font-medium text-gray-900">物流商对比</h3>
          <button data-annotation-id="export" className="flex items-center gap-1.5 px-3 py-1.5 text-sm border border-gray-200 rounded-md hover:bg-gray-50">
            <Download size={14} />导出
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500 bg-gray-50">
                <th className="px-4 py-2.5 font-medium">物流商</th>
                <th className="px-4 py-2.5 font-medium text-right">发货量</th>
                <th className="px-4 py-2.5 font-medium text-right">准时量</th>
                <th className="px-4 py-2.5 font-medium text-right">准时率</th>
                <th className="px-4 py-2.5 font-medium text-right">平均时效</th>
                <th className="px-4 py-2.5 font-medium text-right">物流成本</th>
                <th className="px-4 py-2.5 font-medium text-right">评分</th>
              </tr>
            </thead>
            <tbody>
              {logisticsData.map((row) => {
                const onTimeRate = ((row.onTime / row.shipments) * 100).toFixed(1);
                return (
                  <tr key={row.carrier} className="border-t border-gray-50 hover:bg-gray-50">
                    <td className="px-4 py-2.5 text-gray-900 font-medium">{row.carrier}</td>
                    <td className="px-4 py-2.5 text-right text-gray-900">{row.shipments.toLocaleString()}</td>
                    <td className="px-4 py-2.5 text-right text-gray-900">{row.onTime.toLocaleString()}</td>
                    <td className="px-4 py-2.5 text-right">
                      <span className={`px-1.5 py-0.5 rounded text-xs ${
                        parseFloat(onTimeRate) >= 95 ? 'bg-green-50 text-green-700' :
                        parseFloat(onTimeRate) >= 90 ? 'bg-yellow-50 text-yellow-700' :
                        'bg-red-50 text-red-700'
                      }`}>
                        {onTimeRate}%
                      </span>
                    </td>
                    <td className="px-4 py-2.5 text-right text-gray-600">{row.avgDays}天</td>
                    <td className="px-4 py-2.5 text-right text-gray-900">¥{row.cost.toLocaleString()}</td>
                    <td className="px-4 py-2.5 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <span className="text-yellow-500 text-xs">★</span>
                        <span className="text-sm font-medium text-gray-900">{row.rating}</span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Delivery Time Analysis */}
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="px-4 py-3 border-b border-gray-100">
            <h3 className="text-sm font-medium text-gray-900">配送时效分布</h3>
          </div>
          <div className="p-4 space-y-3">
            {deliveryTimeAnalysis.map((item) => (
              <div key={item.range}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-gray-700">{item.range}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-900">{item.count}</span>
                    <span className="text-xs text-gray-400">{item.pct}%</span>
                  </div>
                </div>
                <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-500 rounded-full transition-all"
                    style={{ width: `${item.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Shipping Issues */}
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="px-4 py-3 border-b border-gray-100">
            <h3 className="text-sm font-medium text-gray-900">物流异常统计</h3>
          </div>
          <div className="p-4 space-y-3">
            <div className="flex items-center justify-between p-3 rounded-lg bg-red-50">
              <div className="flex items-center gap-3">
                <XCircle size={18} className="text-red-500" />
                <div>
                  <p className="text-sm font-medium text-gray-900">签收异常</p>
                  <p className="text-xs text-gray-500">投递失败 / 地址错误</p>
                </div>
              </div>
              <span className="text-lg font-semibold text-red-600">23</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-yellow-50">
              <div className="flex items-center gap-3">
                <AlertTriangle size={18} className="text-yellow-500" />
                <div>
                  <p className="text-sm font-medium text-gray-900">运输超时</p>
                  <p className="text-xs text-gray-500">超过承诺时效</p>
                </div>
              </div>
              <span className="text-lg font-semibold text-yellow-600">45</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-orange-50">
              <div className="flex items-center gap-3">
                <Package size={18} className="text-orange-500" />
                <div>
                  <p className="text-sm font-medium text-gray-900">包裹破损</p>
                  <p className="text-xs text-gray-500">运输途中损坏</p>
                </div>
              </div>
              <span className="text-lg font-semibold text-orange-600">12</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-blue-50">
              <div className="flex items-center gap-3">
                <RefreshCw size={18} className="text-blue-500" />
                <div>
                  <p className="text-sm font-medium text-gray-900">退回件</p>
                  <p className="text-xs text-gray-500">买家拒收 / 退回</p>
                </div>
              </div>
              <span className="text-lg font-semibold text-blue-600">8</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { BusinessOverviewPage, SalesReportPage, InventoryReportPage, LogisticsReportPage };
