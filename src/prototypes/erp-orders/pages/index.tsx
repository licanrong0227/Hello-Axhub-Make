import React, { useState } from 'react';
import {
  Search,
  Plus,
  Filter,
  Download,
  RefreshCw,
  Edit3,
  Trash2,
  ArrowLeft,
  ChevronRight,
  Eye,
  Package,
  Truck,
  MapPin,
  CreditCard,
  Clock,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  FileText,
  Send,
  ToggleLeft,
  ToggleRight,
  Save,
  Layers,
  GitMerge,
  Hash,
  Timer,
  Globe,
  Tag,
} from 'lucide-react';

type Order = {
  id: string;
  platform: string;
  shop: string;
  orderTime: string;
  productName: string;
  skuCount: number;
  amount: string;
  country: string;
  status: string;
  orderType: string;
  receiver: string;
  logisticsChannel: string;
};

type ExceptionOrder = {
  id: string;
  orderId: string;
  platform: string;
  type: string;
  reason: string;
  status: string;
  createdAt: string;
};

type WavePicking = {
  id: string;
  warehouse: string;
  status: string;
  orderCount: number;
  createdAt: string;
};

const mockOrders: Order[] = [
  { id: 'ORD-20260913001', platform: '亚马逊', shop: 'US亚马逊旗舰店', orderTime: '2026-09-13 14:30', productName: '蓝牙耳机 TWS Pro Max', skuCount: 1, amount: '$128.50', country: '美国', status: '待发货', orderType: '现货订单', receiver: 'John Smith', logisticsChannel: '国际专线-标准' },
  { id: 'ORD-20260913002', platform: 'TEMU', shop: 'TEMU官方店', orderTime: '2026-09-13 13:15', productName: '硅胶手机壳 iPhone15系列', skuCount: 2, amount: '$67.20', country: '美国', status: '已发货', orderType: '现货订单', receiver: 'Mike Johnson', logisticsChannel: 'TEMU物流' },
  { id: 'ORD-20260913003', platform: 'Shopee', shop: 'Shopee越南店', orderTime: '2026-09-13 12:00', productName: '便携式充电宝 20000mAh', skuCount: 1, amount: '₫2,450,000', country: '越南', status: '已完成', orderType: '现货订单', receiver: 'Nguyen Van A', logisticsChannel: 'Shopee物流' },
  { id: 'ORD-20260913004', platform: '速卖通', shop: '速卖通官方店', orderTime: '2026-09-13 11:30', productName: '不锈钢保温杯 500ml', skuCount: 3, amount: '€89.90', country: '德国', status: '待审核', orderType: '预售订单', receiver: 'Hans Mueller', logisticsChannel: '菜鸟专线' },
  { id: 'ORD-20260913005', platform: 'eBay', shop: 'eBay综合店', orderTime: '2026-09-13 10:45', productName: 'LED台灯 护眼学习灯', skuCount: 1, amount: '$234.00', country: '美国', status: '已审核', orderType: '现货订单', receiver: 'Sarah Davis', logisticsChannel: 'USPS' },
  { id: 'ORD-20260913006', platform: '亚马逊', shop: 'JP亚马逊店', orderTime: '2026-09-13 10:20', productName: '运动腰包 防水跑步包', skuCount: 1, amount: '¥12,800', country: '日本', status: '待发货', orderType: '现货订单', receiver: 'Tanaka Yuki', logisticsChannel: '佐川急便' },
  { id: 'ORD-20260913007', platform: 'TEMU', shop: 'TEMU官方店', orderTime: '2026-09-13 09:50', productName: '蓝牙耳机 TWS Pro Max', skuCount: 2, amount: '$55.80', country: '英国', status: '已取消', orderType: '预售订单', receiver: 'James Wilson', logisticsChannel: 'Royal Mail' },
  { id: 'ORD-20260912008', platform: 'Shopee', shop: 'Shopee马来店', orderTime: '2026-09-12 18:30', productName: '硅胶手机壳 iPhone15系列', skuCount: 1, amount: 'RM45.90', country: '马来西亚', status: '已完成', orderType: '现货订单', receiver: 'Ahmad bin Ali', logisticsChannel: 'Shopee物流' },
];

const mockExceptionOrders: ExceptionOrder[] = [
  { id: 'EX-001', orderId: 'ORD-20260913001', platform: '亚马逊', type: '地址异常', reason: '收货地址格式不规范，缺少邮编', status: '待处理', createdAt: '2026-09-13 14:35' },
  { id: 'EX-002', orderId: 'ORD-20260912010', platform: 'TEMU', type: '库存不足', reason: 'SKU-A003 库存为0，无法发货', status: '待处理', createdAt: '2026-09-12 16:20' },
  { id: 'EX-003', orderId: 'ORD-20260912008', platform: 'Shopee', type: '支付异常', reason: '支付回调超时，订单未确认', status: '处理中', createdAt: '2026-09-12 14:00' },
  { id: 'EX-004', orderId: 'ORD-20260911005', platform: '速卖通', type: '物流异常', reason: '物流信息同步失败，接口超时', status: '已解决', createdAt: '2026-09-11 10:30' },
];

const mockWavePickings: WavePicking[] = [
  { id: 'WP-20260913001', warehouse: '深圳仓', status: '拣货中', orderCount: 45, createdAt: '2026-09-13 08:00' },
  { id: 'WP-20260913002', warehouse: '义乌仓', status: '待拣货', orderCount: 32, createdAt: '2026-09-13 08:30' },
  { id: 'WP-20260912003', warehouse: '深圳仓', status: '已完成', orderCount: 58, createdAt: '2026-09-12 07:30' },
  { id: 'WP-20260912004', warehouse: '海外仓-美西', status: '已完成', orderCount: 21, createdAt: '2026-09-12 09:00' },
];

const platformColors: Record<string, string> = {
  '亚马逊': 'bg-orange-100 text-orange-700',
  'TEMU': 'bg-purple-100 text-purple-700',
  'Shopee': 'bg-red-100 text-red-700',
  '速卖通': 'bg-blue-100 text-blue-700',
  'eBay': 'bg-yellow-100 text-yellow-700',
};

const statusColors: Record<string, string> = {
  '待审核': 'bg-yellow-100 text-yellow-700',
  '已审核': 'bg-blue-100 text-blue-700',
  '待发货': 'bg-orange-100 text-orange-700',
  '已发货': 'bg-indigo-100 text-indigo-700',
  '已完成': 'bg-green-100 text-green-700',
  '已取消': 'bg-gray-100 text-gray-500',
  '异常': 'bg-red-100 text-red-700',
};

const exceptionStatusColors: Record<string, string> = {
  '待处理': 'bg-red-100 text-red-700',
  '处理中': 'bg-yellow-100 text-yellow-700',
  '已解决': 'bg-green-100 text-green-700',
};

const waveStatusColors: Record<string, string> = {
  '待拣货': 'bg-gray-100 text-gray-600',
  '拣货中': 'bg-blue-100 text-blue-700',
  '已完成': 'bg-green-100 text-green-700',
};

export function OrderListPage({ onNavigate }: { onNavigate: (page: string) => void }) {
  const [searchText, setSearchText] = useState('');
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const toggleRow = (id: string) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]
    );
  };

  const toggleAll = () => {
    setSelectedRows((prev) =>
      prev.length === mockOrders.length ? [] : mockOrders.map((o) => o.id)
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">订单列表</h2>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 text-sm rounded-md hover:bg-gray-50 text-gray-600">
            <Download size={14} /> 导出
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 text-sm rounded-md hover:bg-gray-50 text-gray-600">
            <RefreshCw size={14} /> 同步订单
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="grid grid-cols-4 gap-3">
          <input
            type="text"
            placeholder="订单号"
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
            <option value="">全部状态</option>
            <option>待审核</option>
            <option>已审核</option>
            <option>待发货</option>
            <option>已发货</option>
            <option>已完成</option>
            <option>已取消</option>
          </select>
          <select className="px-3 py-1.5 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-600">
            <option value="">全部类型</option>
            <option>现货订单</option>
            <option>预售订单</option>
          </select>
        </div>
        <div className="grid grid-cols-4 gap-3 mt-3">
          <select className="px-3 py-1.5 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-600">
            <option value="">全部店铺</option>
            <option>US亚马逊旗舰店</option>
            <option>TEMU官方店</option>
            <option>Shopee越南店</option>
          </select>
          <select className="px-3 py-1.5 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-600">
            <option value="">全部国家</option>
            <option>美国</option>
            <option>日本</option>
            <option>德国</option>
            <option>越南</option>
            <option>英国</option>
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

      {selectedRows.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg px-4 py-2 flex items-center gap-3">
          <span className="text-sm text-blue-700">已选 {selectedRows.length} 项</span>
          <button className="px-3 py-1 bg-white border border-gray-200 text-sm rounded hover:bg-gray-50">批量审核</button>
          <button className="px-3 py-1 bg-white border border-gray-200 text-sm rounded hover:bg-gray-50">批量发货</button>
          <button className="px-3 py-1 bg-white border border-gray-200 text-sm rounded hover:bg-gray-50">打印面单</button>
          <button className="px-3 py-1 bg-white border border-gray-200 text-sm rounded hover:bg-gray-50 text-red-600">取消订单</button>
        </div>
      )}

      <div className="bg-white rounded-lg border border-gray-200">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 text-left">
              <th className="px-4 py-3 w-10">
                <input type="checkbox" checked={selectedRows.length === mockOrders.length} onChange={toggleAll} className="rounded" />
              </th>
              <th className="px-4 py-3 font-medium text-gray-600">订单号</th>
              <th className="px-4 py-3 font-medium text-gray-600">平台/店铺</th>
              <th className="px-4 py-3 font-medium text-gray-600">下单时间</th>
              <th className="px-4 py-3 font-medium text-gray-600">商品信息</th>
              <th className="px-4 py-3 font-medium text-gray-600">金额</th>
              <th className="px-4 py-3 font-medium text-gray-600">收货信息</th>
              <th className="px-4 py-3 font-medium text-gray-600">状态</th>
              <th className="px-4 py-3 font-medium text-gray-600">操作</th>
            </tr>
          </thead>
          <tbody>
            {mockOrders.map((order) => (
              <tr key={order.id} className="border-b border-gray-50 hover:bg-gray-50">
                <td className="px-4 py-3">
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(order.id)}
                    onChange={() => toggleRow(order.id)}
                    className="rounded"
                  />
                </td>
                <td className="px-4 py-3">
                  <div>
                    <p className="font-mono text-xs text-gray-900">{order.id}</p>
                    <span className={`inline-block mt-1 px-1.5 py-0.5 text-[10px] rounded ${order.orderType === '预售订单' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-600'}`}>
                      {order.orderType}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className={`px-1.5 py-0.5 text-[10px] rounded ${platformColors[order.platform] || ''}`}>{order.platform}</span>
                  <p className="text-xs text-gray-500 mt-1 truncate max-w-[120px]">{order.shop}</p>
                </td>
                <td className="px-4 py-3 text-gray-500 text-xs">{order.orderTime}</td>
                <td className="px-4 py-3">
                  <p className="text-gray-900 truncate max-w-[140px]">{order.productName}</p>
                  <p className="text-xs text-gray-400">{order.skuCount}件商品</p>
                </td>
                <td className="px-4 py-3 font-medium text-gray-900">{order.amount}</td>
                <td className="px-4 py-3">
                  <p className="text-gray-900 text-xs">{order.receiver}</p>
                  <p className="text-xs text-gray-400">{order.country}</p>
                </td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-0.5 text-xs rounded ${statusColors[order.status] || 'bg-gray-100 text-gray-600'}`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1">
                    <button onClick={() => onNavigate('order-detail')} className="p-1 rounded hover:bg-gray-100 text-gray-400 hover:text-blue-600" title="查看详情">
                      <Eye size={14} />
                    </button>
                    <button className="p-1 rounded hover:bg-gray-100 text-gray-400 hover:text-blue-600" title="发货">
                      <Send size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100">
          <span className="text-sm text-gray-500">共 {mockOrders.length} 条</span>
          <div className="flex items-center gap-1">
            <button className="px-3 py-1 text-sm border border-gray-200 rounded hover:bg-gray-50 text-gray-400" disabled>上一页</button>
            <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded">1</button>
            <button className="px-3 py-1 text-sm border border-gray-200 rounded hover:bg-gray-50 text-gray-600">2</button>
            <button className="px-3 py-1 text-sm border border-gray-200 rounded hover:bg-gray-50 text-gray-600">3</button>
            <button className="px-3 py-1 text-sm border border-gray-200 rounded hover:bg-gray-50 text-gray-600">下一页</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function OrderDetailPage({ onNavigate }: { onNavigate: (page: string) => void }) {
  const order = mockOrders[0];
  const logisticsTimeline = [
    { time: '2026-09-13 14:35', event: '订单创建', detail: '平台订单同步成功', icon: FileText, color: 'text-blue-500' },
    { time: '2026-09-13 14:40', event: '地址校验通过', detail: '收货地址格式正确', icon: MapPin, color: 'text-green-500' },
    { time: '2026-09-13 15:00', event: '库存分配', detail: 'SKU-A001 分配库存 1件', icon: Package, color: 'text-orange-500' },
    { time: '2026-09-13 15:30', event: '等待审核', detail: '等待人工审核', icon: Clock, color: 'text-yellow-500' },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <button onClick={() => onNavigate('order-list')} className="p-1 rounded hover:bg-gray-100">
          <ArrowLeft size={18} className="text-gray-600" />
        </button>
        <h2 className="text-lg font-semibold text-gray-900">订单详情</h2>
        <span className="ml-2 font-mono text-sm text-gray-500">{order.id}</span>
        <span className={`px-2 py-0.5 text-xs rounded ${statusColors[order.status]}`}>{order.status}</span>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2 space-y-4">
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h3 className="text-sm font-medium text-gray-900 mb-3 flex items-center gap-1.5">
              <FileText size={16} className="text-gray-400" /> 基本信息
            </h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div><span className="text-gray-500">订单号：</span><span className="font-mono text-gray-900">{order.id}</span></div>
              <div><span className="text-gray-500">平台：</span><span className={`px-1.5 py-0.5 text-[10px] rounded ${platformColors[order.platform]}`}>{order.platform}</span></div>
              <div><span className="text-gray-500">店铺：</span><span className="text-gray-900">{order.shop}</span></div>
              <div><span className="text-gray-500">下单时间：</span><span className="text-gray-900">{order.orderTime}</span></div>
              <div><span className="text-gray-500">订单类型：</span><span className="text-gray-900">{order.orderType}</span></div>
              <div><span className="text-gray-500">物流渠道：</span><span className="text-gray-900">{order.logisticsChannel}</span></div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h3 className="text-sm font-medium text-gray-900 mb-3 flex items-center gap-1.5">
              <Package size={16} className="text-gray-400" /> 商品信息
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
                  <td className="px-3 py-2">{order.productName}</td>
                  <td className="px-3 py-2 font-mono text-xs text-gray-600">SKU-A001-01</td>
                  <td className="px-3 py-2">1</td>
                  <td className="px-3 py-2">$128.50</td>
                  <td className="px-3 py-2 font-medium">$128.50</td>
                </tr>
              </tbody>
            </table>
            <div className="flex justify-end mt-3 pt-3 border-t border-gray-100">
              <div className="text-sm space-y-1">
                <div className="flex gap-8"><span className="text-gray-500">商品合计：</span><span className="text-gray-900">$128.50</span></div>
                <div className="flex gap-8"><span className="text-gray-500">运费：</span><span className="text-gray-900">$8.00</span></div>
                <div className="flex gap-8 font-medium"><span className="text-gray-700">订单总额：</span><span className="text-gray-900">$136.50</span></div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h3 className="text-sm font-medium text-gray-900 mb-3 flex items-center gap-1.5">
              <CreditCard size={16} className="text-gray-400" /> 支付信息
            </h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div><span className="text-gray-500">支付方式：</span><span className="text-gray-900">信用卡 (Visa ****1234)</span></div>
              <div><span className="text-gray-500">支付金额：</span><span className="text-gray-900 font-medium">$136.50</span></div>
              <div><span className="text-gray-500">支付时间：</span><span className="text-gray-900">2026-09-13 14:32</span></div>
              <div><span className="text-gray-500">支付状态：</span><span className="text-green-600">已支付</span></div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h3 className="text-sm font-medium text-gray-900 mb-3 flex items-center gap-1.5">
              <MapPin size={16} className="text-gray-400" /> 收货地址
            </h3>
            <div className="text-sm text-gray-700 space-y-1">
              <p className="font-medium">{order.receiver}</p>
              <p>123 Main Street, Apt 4B</p>
              <p>New York, NY 10001</p>
              <p>United States</p>
              <p className="text-gray-500 mt-2">电话：+1 (555) 123-4567</p>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h3 className="text-sm font-medium text-gray-900 mb-3 flex items-center gap-1.5">
              <Truck size={16} className="text-gray-400" /> 物流追踪
            </h3>
            <div className="space-y-3">
              {logisticsTimeline.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className={`w-7 h-7 rounded-full bg-gray-50 flex items-center justify-center flex-shrink-0 ${item.color}`}>
                        <Icon size={14} />
                      </div>
                      {idx < logisticsTimeline.length - 1 && <div className="w-px h-full bg-gray-200 mt-1" />}
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
              <button className="w-full px-3 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700">审核通过</button>
              <button className="w-full px-3 py-2 border border-gray-200 text-sm rounded-md hover:bg-gray-50 text-gray-600">打印面单</button>
              <button className="w-full px-3 py-2 border border-red-200 text-sm rounded-md hover:bg-red-50 text-red-600">取消订单</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ExceptionOrderListPage({ onNavigate }: { onNavigate: (page: string) => void }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">异常订单</h2>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 text-sm rounded-md hover:bg-gray-50 text-gray-600">
            <Download size={14} /> 导出
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="grid grid-cols-4 gap-3">
          <input type="text" placeholder="订单号" className="px-3 py-1.5 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500" />
          <select className="px-3 py-1.5 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-600">
            <option value="">全部类型</option>
            <option>地址异常</option>
            <option>库存不足</option>
            <option>支付异常</option>
            <option>物流异常</option>
          </select>
          <select className="px-3 py-1.5 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-600">
            <option value="">全部状态</option>
            <option>待处理</option>
            <option>处理中</option>
            <option>已解决</option>
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
              <th className="px-4 py-3 font-medium text-gray-600">异常编号</th>
              <th className="px-4 py-3 font-medium text-gray-600">关联订单</th>
              <th className="px-4 py-3 font-medium text-gray-600">平台</th>
              <th className="px-4 py-3 font-medium text-gray-600">异常类型</th>
              <th className="px-4 py-3 font-medium text-gray-600">异常原因</th>
              <th className="px-4 py-3 font-medium text-gray-600">状态</th>
              <th className="px-4 py-3 font-medium text-gray-600">创建时间</th>
              <th className="px-4 py-3 font-medium text-gray-600">操作</th>
            </tr>
          </thead>
          <tbody>
            {mockExceptionOrders.map((ex) => (
              <tr key={ex.id} className="border-b border-gray-50 hover:bg-gray-50">
                <td className="px-4 py-3 font-mono text-xs">{ex.id}</td>
                <td className="px-4 py-3 font-mono text-xs">{ex.orderId}</td>
                <td className="px-4 py-3">
                  <span className={`px-1.5 py-0.5 text-[10px] rounded ${platformColors[ex.platform] || ''}`}>{ex.platform}</span>
                </td>
                <td className="px-4 py-3 text-gray-700">{ex.type}</td>
                <td className="px-4 py-3 text-gray-500 text-xs max-w-[200px] truncate">{ex.reason}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-0.5 text-xs rounded ${exceptionStatusColors[ex.status] || 'bg-gray-100 text-gray-600'}`}>
                    {ex.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-500 text-xs">{ex.createdAt}</td>
                <td className="px-4 py-3">
                  {ex.status === '待处理' && (
                    <button onClick={() => onNavigate('exception-handle')} className="text-blue-600 text-xs hover:underline">处理</button>
                  )}
                  {ex.status !== '待处理' && (
                    <button className="text-blue-600 text-xs hover:underline">查看</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100">
          <span className="text-sm text-gray-500">共 {mockExceptionOrders.length} 条</span>
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

export function ExceptionOrderHandlePage({ onNavigate }: { onNavigate: (page: string) => void }) {
  const [resolution, setResolution] = useState('');

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <button onClick={() => onNavigate('exception-list')} className="p-1 rounded hover:bg-gray-100">
          <ArrowLeft size={18} className="text-gray-600" />
        </button>
        <h2 className="text-lg font-semibold text-gray-900">异常处理</h2>
        <span className="ml-2 text-sm text-gray-500">EX-001</span>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2 space-y-4">
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h3 className="text-sm font-medium text-gray-900 mb-3">异常信息</h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div><span className="text-gray-500">异常编号：</span><span className="font-mono text-gray-900">EX-001</span></div>
              <div><span className="text-gray-500">关联订单：</span><span className="font-mono text-gray-900">ORD-20260913001</span></div>
              <div><span className="text-gray-500">异常类型：</span><span className="text-red-600">地址异常</span></div>
              <div><span className="text-gray-500">平台：</span><span className={`px-1.5 py-0.5 text-[10px] rounded ${platformColors['亚马逊']}`}>亚马逊</span></div>
              <div className="col-span-2"><span className="text-gray-500">异常原因：</span><span className="text-gray-900">收货地址格式不规范，缺少邮编</span></div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h3 className="text-sm font-medium text-gray-900 mb-3">当前收货地址</h3>
            <div className="bg-gray-50 rounded-md p-3 text-sm text-gray-700">
              <p>John Smith</p>
              <p>123 Main Street, Apt 4B</p>
              <p>New York, NY</p>
              <p>United States</p>
              <p className="text-red-500 mt-1 text-xs">缺少邮编信息</p>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h3 className="text-sm font-medium text-gray-900 mb-3">处理方案</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">处理方式 <span className="text-red-500">*</span></label>
                <div className="flex gap-3">
                  <label className="flex items-center gap-2 text-sm">
                    <input type="radio" name="resolution" checked={resolution === 'contact'} onChange={() => setResolution('contact')} /> 联系买家补充地址
                  </label>
                  <label className="flex items-center gap-2 text-sm">
                    <input type="radio" name="resolution" checked={resolution === 'cancel'} onChange={() => setResolution('cancel')} /> 取消订单
                  </label>
                  <label className="flex items-center gap-2 text-sm">
                    <input type="radio" name="resolution" checked={resolution === 'manual'} onChange={() => setResolution('manual')} /> 手动修改地址
                  </label>
                </div>
              </div>
              {resolution === 'manual' && (
                <div className="grid grid-cols-2 gap-3">
                  <input type="text" placeholder="省/州" className="px-3 py-1.5 text-sm border border-gray-200 rounded-md" />
                  <input type="text" placeholder="邮编" className="px-3 py-1.5 text-sm border border-gray-200 rounded-md" />
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">处理备注</label>
                <textarea rows={3} placeholder="请输入处理备注..." className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500" />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h3 className="text-sm font-medium text-gray-900 mb-3">处理记录</h3>
            <div className="space-y-3">
              <div className="flex gap-3">
                <div className="w-7 h-7 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
                  <AlertTriangle size={14} className="text-blue-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-900">系统检测到异常</p>
                  <p className="text-xs text-gray-500">收货地址格式不规范</p>
                  <p className="text-xs text-gray-400">2026-09-13 14:35</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h3 className="text-sm font-medium text-gray-900 mb-3">提交处理</h3>
            <div className="space-y-2">
              <button className="w-full px-3 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700">确认提交</button>
              <button onClick={() => onNavigate('exception-list')} className="w-full px-3 py-2 border border-gray-200 text-sm rounded-md hover:bg-gray-50 text-gray-600">返回列表</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function MergeSplitRulePage({ onNavigate }: { onNavigate: (page: string) => void }) {
  const [rules, setRules] = useState({
    mergeEnabled: true,
    splitEnabled: true,
    mergePlatformSame: true,
    mergeAddressSame: true,
    mergeShopSame: false,
    splitAutoThreshold: 5,
    splitMaxItems: 10,
  });

  const toggleRule = (key: keyof typeof rules) => {
    setRules((prev) => ({ ...prev, [key]: !prev[key] as boolean }));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">合单拆单规则</h2>
        <button className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700">
          <Save size={14} /> 保存配置
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <GitMerge size={18} className="text-blue-500" />
              <h3 className="text-sm font-medium text-gray-900">合单规则</h3>
            </div>
            <button onClick={() => toggleRule('mergeEnabled')} className="text-blue-600">
              {rules.mergeEnabled ? <ToggleRight size={28} /> : <ToggleLeft size={28} className="text-gray-400" />}
            </button>
          </div>
          <div className={`space-y-3 ${!rules.mergeEnabled ? 'opacity-50 pointer-events-none' : ''}`}>
            <label className="flex items-center justify-between text-sm">
              <span className="text-gray-700">相同平台</span>
              <button onClick={() => toggleRule('mergePlatformSame')} className="text-blue-600">
                {rules.mergePlatformSame ? <ToggleRight size={24} /> : <ToggleLeft size={24} className="text-gray-400" />}
              </button>
            </label>
            <label className="flex items-center justify-between text-sm">
              <span className="text-gray-700">相同收货地址</span>
              <button onClick={() => toggleRule('mergeAddressSame')} className="text-blue-600">
                {rules.mergeAddressSame ? <ToggleRight size={24} /> : <ToggleLeft size={24} className="text-gray-400" />}
              </button>
            </label>
            <label className="flex items-center justify-between text-sm">
              <span className="text-gray-700">相同店铺</span>
              <button onClick={() => toggleRule('mergeShopSame')} className="text-blue-600">
                {rules.mergeShopSame ? <ToggleRight size={24} /> : <ToggleLeft size={24} className="text-gray-400" />}
              </button>
            </label>
            <div className="pt-2 border-t border-gray-100">
              <label className="block text-sm text-gray-700 mb-1">合单时间窗口（分钟）</label>
              <input type="number" defaultValue={30} className="w-full px-3 py-1.5 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Layers size={18} className="text-purple-500" />
              <h3 className="text-sm font-medium text-gray-900">拆单规则</h3>
            </div>
            <button onClick={() => toggleRule('splitEnabled')} className="text-blue-600">
              {rules.splitEnabled ? <ToggleRight size={28} /> : <ToggleLeft size={28} className="text-gray-400" />}
            </button>
          </div>
          <div className={`space-y-3 ${!rules.splitEnabled ? 'opacity-50 pointer-events-none' : ''}`}>
            <div>
              <label className="block text-sm text-gray-700 mb-1">自动拆单阈值（商品种类数）</label>
              <input
                type="number"
                value={rules.splitAutoThreshold}
                onChange={(e) => setRules((prev) => ({ ...prev, splitAutoThreshold: Number(e.target.value) }))}
                className="w-full px-3 py-1.5 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <p className="text-xs text-gray-400 mt-1">当订单商品种类超过此阈值时自动拆单</p>
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">单包裹最大商品数</label>
              <input
                type="number"
                value={rules.splitMaxItems}
                onChange={(e) => setRules((prev) => ({ ...prev, splitMaxItems: Number(e.target.value) }))}
                className="w-full px-3 py-1.5 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div className="pt-2 border-t border-gray-100">
              <label className="block text-sm text-gray-700 mb-1">拆单触发条件</label>
              <div className="space-y-1.5 mt-2">
                <label className="flex items-center gap-2 text-sm text-gray-600">
                  <input type="checkbox" className="rounded" defaultChecked /> 超重自动拆单
                </label>
                <label className="flex items-center gap-2 text-sm text-gray-600">
                  <input type="checkbox" className="rounded" defaultChecked /> 跨仓自动拆单
                </label>
                <label className="flex items-center gap-2 text-sm text-gray-600">
                  <input type="checkbox" className="rounded" /> 危险品自动拆单
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-5">
        <h3 className="text-sm font-medium text-gray-900 mb-3">规则优先级</h3>
        <p className="text-xs text-gray-500 mb-3">拖拽调整规则执行优先级（从高到低）</p>
        <div className="space-y-2">
          {['相同店铺 + 相同地址', '相同平台 + 相同地址', '相同地址', '相同平台'].map((rule, idx) => (
            <div key={idx} className="flex items-center gap-3 px-3 py-2.5 bg-gray-50 rounded-lg border border-gray-100">
              <span className="w-5 h-5 rounded bg-blue-100 text-blue-700 text-xs flex items-center justify-center font-medium">{idx + 1}</span>
              <span className="text-sm text-gray-700 flex-1">{rule}</span>
              <span className="text-xs text-gray-400 cursor-grab">⋮⋮</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function WavePickingListPage({ onNavigate }: { onNavigate: (page: string) => void }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">波次拣货列表</h2>
        <button className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700">
          <Plus size={14} /> 新建波次
        </button>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="grid grid-cols-4 gap-3">
          <input type="text" placeholder="波次编号" className="px-3 py-1.5 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500" />
          <select className="px-3 py-1.5 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-600">
            <option value="">全部仓库</option>
            <option>深圳仓</option>
            <option>义乌仓</option>
            <option>海外仓-美西</option>
          </select>
          <select className="px-3 py-1.5 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-600">
            <option value="">全部状态</option>
            <option>待拣货</option>
            <option>拣货中</option>
            <option>已完成</option>
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
              <th className="px-4 py-3 font-medium text-gray-600">波次编号</th>
              <th className="px-4 py-3 font-medium text-gray-600">仓库</th>
              <th className="px-4 py-3 font-medium text-gray-600">订单数</th>
              <th className="px-4 py-3 font-medium text-gray-600">状态</th>
              <th className="px-4 py-3 font-medium text-gray-600">创建时间</th>
              <th className="px-4 py-3 font-medium text-gray-600">操作</th>
            </tr>
          </thead>
          <tbody>
            {mockWavePickings.map((wave) => (
              <tr key={wave.id} className="border-b border-gray-50 hover:bg-gray-50">
                <td className="px-4 py-3 font-mono text-xs">{wave.id}</td>
                <td className="px-4 py-3 text-gray-700">{wave.warehouse}</td>
                <td className="px-4 py-3">
                  <span className="font-medium text-gray-900">{wave.orderCount}</span>
                  <span className="text-gray-400 ml-1">单</span>
                </td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-0.5 text-xs rounded ${waveStatusColors[wave.status] || 'bg-gray-100 text-gray-600'}`}>
                    {wave.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-500 text-xs">{wave.createdAt}</td>
                <td className="px-4 py-3">
                  <button className="text-blue-600 text-xs hover:underline mr-2">查看</button>
                  {wave.status === '待拣货' && (
                    <button className="text-green-600 text-xs hover:underline">开始拣货</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100">
          <span className="text-sm text-gray-500">共 {mockWavePickings.length} 条</span>
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

export function WavePickingRulePage({ onNavigate }: { onNavigate: (page: string) => void }) {
  const [rules, setRules] = useState({
    orderCountEnabled: true,
    timeIntervalEnabled: true,
    logisticsChannelEnabled: false,
    countryEnabled: false,
    orderTypeEnabled: false,
    orderCountThreshold: 20,
    timeIntervalMinutes: 30,
  });

  const toggleRule = (key: keyof typeof rules) => {
    setRules((prev) => ({ ...prev, [key]: !prev[key as keyof typeof rules] as boolean }));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">波次拣货规则配置</h2>
        <button className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700">
          <Save size={14} /> 保存配置
        </button>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-5">
        <h3 className="text-sm font-medium text-gray-900 mb-4">自动波次触发条件</h3>
        <p className="text-xs text-gray-500 mb-4">当满足以下任一条件时，系统自动生成拣货波次</p>

        <div className="space-y-4">
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Hash size={16} className="text-blue-500" />
                <span className="text-sm font-medium text-gray-900">订单数量阈值</span>
              </div>
              <button onClick={() => toggleRule('orderCountEnabled')} className="text-blue-600">
                {rules.orderCountEnabled ? <ToggleRight size={24} /> : <ToggleLeft size={24} className="text-gray-400" />}
              </button>
            </div>
            <div className={`${!rules.orderCountEnabled ? 'opacity-50 pointer-events-none' : ''}`}>
              <label className="block text-sm text-gray-700 mb-1">当待拣货订单数达到</label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={rules.orderCountThreshold}
                  onChange={(e) => setRules((prev) => ({ ...prev, orderCountThreshold: Number(e.target.value) }))}
                  className="w-24 px-3 py-1.5 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-500">单时，自动生成波次</span>
              </div>
            </div>
          </div>

          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Timer size={16} className="text-orange-500" />
                <span className="text-sm font-medium text-gray-900">时间间隔</span>
              </div>
              <button onClick={() => toggleRule('timeIntervalEnabled')} className="text-blue-600">
                {rules.timeIntervalEnabled ? <ToggleRight size={24} /> : <ToggleLeft size={24} className="text-gray-400" />}
              </button>
            </div>
            <div className={`${!rules.timeIntervalEnabled ? 'opacity-50 pointer-events-none' : ''}`}>
              <label className="block text-sm text-gray-700 mb-1">每隔</label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={rules.timeIntervalMinutes}
                  onChange={(e) => setRules((prev) => ({ ...prev, timeIntervalMinutes: Number(e.target.value) }))}
                  className="w-24 px-3 py-1.5 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-500">分钟自动生成波次</span>
              </div>
            </div>
          </div>

          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Truck size={16} className="text-green-500" />
                <span className="text-sm font-medium text-gray-900">物流渠道分组</span>
              </div>
              <button onClick={() => toggleRule('logisticsChannelEnabled')} className="text-blue-600">
                {rules.logisticsChannelEnabled ? <ToggleRight size={24} /> : <ToggleLeft size={24} className="text-gray-400" />}
              </button>
            </div>
            <div className={`${!rules.logisticsChannelEnabled ? 'opacity-50 pointer-events-none' : ''}`}>
              <p className="text-sm text-gray-700 mb-2">按物流渠道自动拆分波次</p>
              <div className="flex flex-wrap gap-2">
                {['国际专线-标准', '国际专线-加急', '海外仓派送', 'TEMU物流', 'Shopee物流'].map((ch) => (
                  <label key={ch} className="flex items-center gap-1.5 text-sm text-gray-600">
                    <input type="checkbox" className="rounded" defaultChecked /> {ch}
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Globe size={16} className="text-purple-500" />
                <span className="text-sm font-medium text-gray-900">国家/地区分组</span>
              </div>
              <button onClick={() => toggleRule('countryEnabled')} className="text-blue-600">
                {rules.countryEnabled ? <ToggleRight size={24} /> : <ToggleLeft size={24} className="text-gray-400" />}
              </button>
            </div>
            <div className={`${!rules.countryEnabled ? 'opacity-50 pointer-events-none' : ''}`}>
              <p className="text-sm text-gray-700 mb-2">按目的国家自动拆分波次</p>
              <div className="flex flex-wrap gap-2">
                {['美国', '日本', '德国', '越南', '英国', '马来西亚'].map((c) => (
                  <label key={c} className="flex items-center gap-1.5 text-sm text-gray-600">
                    <input type="checkbox" className="rounded" defaultChecked /> {c}
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Tag size={16} className="text-pink-500" />
                <span className="text-sm font-medium text-gray-900">订单类型分组</span>
              </div>
              <button onClick={() => toggleRule('orderTypeEnabled')} className="text-blue-600">
                {rules.orderTypeEnabled ? <ToggleRight size={24} /> : <ToggleLeft size={24} className="text-gray-400" />}
              </button>
            </div>
            <div className={`${!rules.orderTypeEnabled ? 'opacity-50 pointer-events-none' : ''}`}>
              <p className="text-sm text-gray-700 mb-2">按订单类型自动拆分波次</p>
              <div className="flex gap-4">
                <label className="flex items-center gap-1.5 text-sm text-gray-600">
                  <input type="checkbox" className="rounded" defaultChecked /> 现货订单
                </label>
                <label className="flex items-center gap-1.5 text-sm text-gray-600">
                  <input type="checkbox" className="rounded" defaultChecked /> 预售订单
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
