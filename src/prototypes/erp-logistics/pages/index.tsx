import React, { useState } from 'react';
import {
  Search,
  Filter,
  ArrowLeft,
  Package,
  Truck,
  Globe,
  FileText,
  CheckCircle2,
  Clock,
  AlertTriangle,
  XCircle,
  Eye,
  Edit3,
  Download,
  Plus,
  ChevronDown,
  MapPin,
  Plane,
  Ship,
  Box,
  DollarSign,
  Hash,
  ArrowUpRight,
  RefreshCw,
  X,
  Check,
  Warehouse,
  Send,
  ClipboardList,
  Building2,
  ScrollText,
} from 'lucide-react';

const statusColors: Record<string, string> = {
  '待出库': 'bg-yellow-100 text-yellow-700',
  '拣货中': 'bg-blue-100 text-blue-700',
  '已打包': 'bg-indigo-100 text-indigo-700',
  '已发货': 'bg-green-100 text-green-700',
  '已签收': 'bg-gray-100 text-gray-600',
  '待入库': 'bg-yellow-100 text-yellow-700',
  '部分入库': 'bg-orange-100 text-orange-700',
  '全部入库': 'bg-green-100 text-green-700',
  '已取消': 'bg-gray-100 text-gray-500',
  '有效': 'bg-green-100 text-green-700',
  '停用': 'bg-gray-100 text-gray-500',
  '草稿': 'bg-gray-100 text-gray-600',
  '已提交': 'bg-blue-100 text-blue-700',
  '已通过': 'bg-green-100 text-green-700',
  '已拒绝': 'bg-red-100 text-red-600',
};

const outboundOrders = [
  { id: 'OB-20260913-001', orderId: 'ORD-20260912003', warehouse: '深圳FBA仓', items: '蓝牙耳机 x50, 手机壳 x120', channel: '云途物流', tracking: 'YT2026091300001', status: '已发货', time: '2026-09-13 14:30' },
  { id: 'OB-20260913-002', orderId: 'ORD-20260912007', warehouse: '广州仓', items: '数据线 x200', channel: '燕文物流', tracking: 'YW2026091300002', status: '拣货中', time: '2026-09-13 10:15' },
  { id: 'OB-20260913-003', orderId: 'ORD-20260911015', warehouse: '深圳FBA仓', items: '智能手表 x30, 充电器 x80', channel: '递四方', tracking: 'SF2026091200003', status: '已签收', time: '2026-09-12 16:00' },
  { id: 'OB-20260913-004', orderId: 'ORD-20260913001', warehouse: '义乌仓', items: '手机支架 x500', channel: '云途物流', tracking: '', status: '待出库', time: '2026-09-13 09:00' },
  { id: 'OB-20260913-005', orderId: 'ORD-20260912020', warehouse: '广州仓', items: '键盘 x60, 鼠标 x60', channel: '燕文物流', tracking: 'YW2026091300005', status: '已打包', time: '2026-09-13 11:45' },
];

const inboundOrders = [
  { id: 'IB-20260913-001', supplier: '深圳电子有限公司', warehouse: '深圳FBA仓', items: '蓝牙耳机 x200, 数据线 x500', expectedQty: 700, receivedQty: 700, status: '全部入库', time: '2026-09-13 08:30' },
  { id: 'IB-20260913-002', supplier: '东莞配件厂', warehouse: '广州仓', items: '手机壳 x1000', expectedQty: 1000, receivedQty: 600, status: '部分入库', time: '2026-09-13 11:00' },
  { id: 'IB-20260913-003', supplier: '义乌日用品公司', warehouse: '义乌仓', items: '手机支架 x3000', expectedQty: 3000, receivedQty: 0, status: '待入库', time: '2026-09-13 14:00' },
  { id: 'IB-20260912-004', supplier: '广州数码科技', warehouse: '深圳FBA仓', items: '智能手表 x100', expectedQty: 100, receivedQty: 0, status: '已取消', time: '2026-09-12 16:00' },
];

const logisticsProviders = [
  { code: 'YT', name: '云途物流', type: '专线小包', coverage: '欧美, 东南亚', status: '有效', contact: '张经理', phone: '138-0000-0001' },
  { code: 'YW', name: '燕文物流', type: '国际快递', coverage: '全球', status: '有效', contact: '李经理', phone: '138-0000-0002' },
  { code: 'SF', name: '递四方', type: '海外仓', coverage: '北美, 欧洲', status: '有效', contact: '王经理', phone: '138-0000-0003' },
];

const channelConfigs = [
  {
    id: 'CH-001',
    provider: '云途物流',
    channelName: '云途标准专线',
    type: '专线小包',
    countries: ['美国', '英国', '德国', '法国'],
    pricing: [
      { maxWeight: 0.3, price: 25 },
      { maxWeight: 0.5, price: 35 },
      { maxWeight: 1.0, price: 55 },
      { maxWeight: 2.0, price: 85 },
    ],
    trackingApi: 'https://api.yuntp.com/track',
    apiKey: 'YT****key',
    status: '有效',
  },
  {
    id: 'CH-002',
    provider: '燕文物流',
    channelName: '燕文国际快递',
    type: '国际快递',
    countries: ['美国', '英国', '日本', '韩国', '澳大利亚'],
    pricing: [
      { maxWeight: 0.5, price: 65 },
      { maxWeight: 1.0, price: 95 },
      { maxWeight: 2.0, price: 150 },
    ],
    trackingApi: 'https://api.yw.com/track',
    apiKey: 'YW****key',
    status: '有效',
  },
];

const customsDeclarations = [
  { id: 'CD-20260913-001', type: '出口报关', orders: ['OB-20260913-001', 'OB-20260913-003'], currency: 'USD', totalAmount: 4560.50, status: '已通过', submitTime: '2026-09-13 15:00' },
  { id: 'CD-20260913-002', type: '目的国清关', orders: ['OB-20260913-002'], currency: 'EUR', totalAmount: 1280.00, status: '已提交', submitTime: '2026-09-13 12:30' },
  { id: 'CD-20260912-003', type: '出口报关', orders: ['OB-20260913-005'], currency: 'USD', totalAmount: 890.00, status: '草稿', submitTime: '2026-09-12 18:00' },
];

type PageProps = { onNavigate: (page: string) => void };

function OutboundListPage({ onNavigate }: PageProps) {
  const [searchField, setSearchField] = useState('出库单号');
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">销售出库</h2>
        <button className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700">
          <Plus size={16} /> 新建出库单
        </button>
      </div>
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex flex-wrap gap-3 items-end">
          <div className="flex flex-col gap-1">
            <label className="text-xs text-gray-500">搜索字段</label>
            <select value={searchField} onChange={(e) => setSearchField(e.target.value)} className="text-sm border border-gray-200 rounded-md px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-500">
              <option>出库单号</option>
              <option>订单号</option>
              <option>仓库</option>
              <option>物流渠道</option>
            </select>
          </div>
          <div className="flex flex-col gap-1 flex-1 min-w-[200px]">
            <label className="text-xs text-gray-500">关键词</label>
            <input placeholder={`输入${searchField}`} className="text-sm border border-gray-200 rounded-md px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-500" />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs text-gray-500">状态</label>
            <select className="text-sm border border-gray-200 rounded-md px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-500">
              <option>全部</option>
              <option>待出库</option>
              <option>拣货中</option>
              <option>已打包</option>
              <option>已发货</option>
              <option>已签收</option>
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs text-gray-500">物流渠道</label>
            <select className="text-sm border border-gray-200 rounded-md px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-500">
              <option>全部</option>
              <option>云途物流</option>
              <option>燕文物流</option>
              <option>递四方</option>
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs text-gray-500">时间</label>
            <input type="date" className="text-sm border border-gray-200 rounded-md px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-500" />
          </div>
          <button className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700">
            <Search size={14} /> 查询
          </button>
        </div>
      </div>
      <div className="bg-white rounded-lg border border-gray-200">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 text-left text-gray-500">
              <th className="px-4 py-3 font-medium">出库单号</th>
              <th className="px-4 py-3 font-medium">关联订单号</th>
              <th className="px-4 py-3 font-medium">仓库</th>
              <th className="px-4 py-3 font-medium">商品明细</th>
              <th className="px-4 py-3 font-medium">物流渠道</th>
              <th className="px-4 py-3 font-medium">物流单号</th>
              <th className="px-4 py-3 font-medium">状态</th>
              <th className="px-4 py-3 font-medium">时间</th>
              <th className="px-4 py-3 font-medium">操作</th>
            </tr>
          </thead>
          <tbody>
            {outboundOrders.map((o) => (
              <tr key={o.id} className="border-b border-gray-50 hover:bg-gray-50">
                <td className="px-4 py-3 font-medium text-blue-600 cursor-pointer hover:underline" onClick={() => onNavigate('outbound-detail')}>{o.id}</td>
                <td className="px-4 py-3 text-gray-600">{o.orderId}</td>
                <td className="px-4 py-3 text-gray-600">{o.warehouse}</td>
                <td className="px-4 py-3 text-gray-600 max-w-[200px] truncate">{o.items}</td>
                <td className="px-4 py-3 text-gray-600">{o.channel}</td>
                <td className="px-4 py-3 text-gray-600">{o.tracking || '-'}</td>
                <td className="px-4 py-3"><span className={`px-2 py-0.5 text-xs rounded-full ${statusColors[o.status]}`}>{o.status}</span></td>
                <td className="px-4 py-3 text-gray-500 text-xs">{o.time}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1">
                    <button onClick={() => onNavigate('outbound-detail')} className="p-1 hover:bg-gray-100 rounded text-gray-500 hover:text-blue-600" title="查看"><Eye size={14} /></button>
                    {o.status === '待出库' && <button className="p-1 hover:bg-gray-100 rounded text-gray-500 hover:text-green-600" title="拣货"><Package size={14} /></button>}
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

function OutboundDetailPage({ onNavigate }: PageProps) {
  const order = outboundOrders[0];
  const trackingSteps = [
    { time: '2026-09-13 14:30', event: '包裹已揽收', location: '深圳集运中心' },
    { time: '2026-09-13 18:00', event: '已离开深圳集运中心', location: '深圳' },
    { time: '2026-09-14 06:00', event: '到达目的国海关', location: '洛杉矶' },
  ];
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <button onClick={() => onNavigate('outbound-list')} className="p-1.5 hover:bg-gray-100 rounded-md text-gray-500"><ArrowLeft size={18} /></button>
        <h2 className="text-lg font-semibold text-gray-900">出库单详情 - {order.id}</h2>
        <span className={`px-2 py-0.5 text-xs rounded-full ${statusColors[order.status]}`}>{order.status}</span>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <h3 className="text-sm font-medium text-gray-900 mb-3">订单信息</h3>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div><span className="text-gray-500">出库单号：</span><span className="text-gray-900">{order.id}</span></div>
            <div><span className="text-gray-500">关联订单：</span><span className="text-blue-600">{order.orderId}</span></div>
            <div><span className="text-gray-500">仓库：</span><span className="text-gray-900">{order.warehouse}</span></div>
            <div><span className="text-gray-500">创建时间：</span><span className="text-gray-900">{order.time}</span></div>
            <div><span className="text-gray-500">物流渠道：</span><span className="text-gray-900">{order.channel}</span></div>
            <div><span className="text-gray-500">物流单号：</span><span className="text-gray-900">{order.tracking}</span></div>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <h3 className="text-sm font-medium text-gray-900 mb-3">物流跟踪</h3>
          <div className="space-y-3">
            {trackingSteps.map((s, i) => (
              <div key={i} className="flex gap-3 items-start">
                <div className="relative flex flex-col items-center">
                  <div className={`w-2.5 h-2.5 rounded-full ${i === 0 ? 'bg-blue-500' : 'bg-gray-300'}`} />
                  {i < trackingSteps.length - 1 && <div className="w-px h-6 bg-gray-200 mt-1" />}
                </div>
                <div className="text-sm">
                  <p className="text-gray-900">{s.event}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{s.location} · {s.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <h3 className="text-sm font-medium text-gray-900 mb-3">商品明细</h3>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 text-left text-gray-500">
              <th className="px-4 py-2 font-medium">商品名称</th>
              <th className="px-4 py-2 font-medium">SKU</th>
              <th className="px-4 py-2 font-medium">数量</th>
              <th className="px-4 py-2 font-medium">重量(kg)</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-gray-50">
              <td className="px-4 py-2">蓝牙耳机 TWS Pro</td>
              <td className="px-4 py-2 text-gray-600">SKU-BT001</td>
              <td className="px-4 py-2">50</td>
              <td className="px-4 py-2">7.5</td>
            </tr>
            <tr className="border-b border-gray-50">
              <td className="px-4 py-2">透明手机壳 iPhone15</td>
              <td className="px-4 py-2 text-gray-600">SKU-CS015</td>
              <td className="px-4 py-2">120</td>
              <td className="px-4 py-2">2.4</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

function InboundListPage({ onNavigate }: PageProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">采购入库</h2>
        <button className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700">
          <Plus size={16} /> 新建入库单
        </button>
      </div>
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex flex-wrap gap-3 items-end">
          <div className="flex flex-col gap-1">
            <label className="text-xs text-gray-500">状态</label>
            <select className="text-sm border border-gray-200 rounded-md px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-500">
              <option>全部</option>
              <option>待入库</option>
              <option>部分入库</option>
              <option>全部入库</option>
              <option>已取消</option>
            </select>
          </div>
          <div className="flex flex-col gap-1 flex-1 min-w-[200px]">
            <label className="text-xs text-gray-500">入库单号/供应商</label>
            <input placeholder="搜索入库单号或供应商" className="text-sm border border-gray-200 rounded-md px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-500" />
          </div>
          <button className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700">
            <Search size={14} /> 查询
          </button>
        </div>
      </div>
      <div className="bg-white rounded-lg border border-gray-200">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 text-left text-gray-500">
              <th className="px-4 py-3 font-medium">入库单号</th>
              <th className="px-4 py-3 font-medium">供应商</th>
              <th className="px-4 py-3 font-medium">仓库</th>
              <th className="px-4 py-3 font-medium">商品明细</th>
              <th className="px-4 py-3 font-medium">预期数量</th>
              <th className="px-4 py-3 font-medium">已收数量</th>
              <th className="px-4 py-3 font-medium">状态</th>
              <th className="px-4 py-3 font-medium">时间</th>
              <th className="px-4 py-3 font-medium">操作</th>
            </tr>
          </thead>
          <tbody>
            {inboundOrders.map((o) => (
              <tr key={o.id} className="border-b border-gray-50 hover:bg-gray-50">
                <td className="px-4 py-3 font-medium text-blue-600 cursor-pointer hover:underline" onClick={() => onNavigate('inbound-detail')}>{o.id}</td>
                <td className="px-4 py-3 text-gray-600">{o.supplier}</td>
                <td className="px-4 py-3 text-gray-600">{o.warehouse}</td>
                <td className="px-4 py-3 text-gray-600 max-w-[200px] truncate">{o.items}</td>
                <td className="px-4 py-3 text-gray-600">{o.expectedQty}</td>
                <td className="px-4 py-3 text-gray-600">{o.receivedQty}</td>
                <td className="px-4 py-3"><span className={`px-2 py-0.5 text-xs rounded-full ${statusColors[o.status]}`}>{o.status}</span></td>
                <td className="px-4 py-3 text-gray-500 text-xs">{o.time}</td>
                <td className="px-4 py-3">
                  <button onClick={() => onNavigate('inbound-detail')} className="p-1 hover:bg-gray-100 rounded text-gray-500 hover:text-blue-600" title="查看"><Eye size={14} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function InboundDetailPage({ onNavigate }: PageProps) {
  const order = inboundOrders[0];
  const receivingRecords = [
    { time: '2026-09-13 08:30', operator: '张三', qty: 200, variance: 0, note: '' },
    { time: '2026-09-13 09:15', operator: '李四', qty: 500, variance: 0, note: '' },
  ];
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <button onClick={() => onNavigate('inbound-list')} className="p-1.5 hover:bg-gray-100 rounded-md text-gray-500"><ArrowLeft size={18} /></button>
        <h2 className="text-lg font-semibold text-gray-900">入库单详情 - {order.id}</h2>
        <span className={`px-2 py-0.5 text-xs rounded-full ${statusColors[order.status]}`}>{order.status}</span>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <h3 className="text-sm font-medium text-gray-900 mb-3">入库信息</h3>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div><span className="text-gray-500">入库单号：</span><span className="text-gray-900">{order.id}</span></div>
            <div><span className="text-gray-500">供应商：</span><span className="text-gray-900">{order.supplier}</span></div>
            <div><span className="text-gray-500">仓库：</span><span className="text-gray-900">{order.warehouse}</span></div>
            <div><span className="text-gray-500">创建时间：</span><span className="text-gray-900">{order.time}</span></div>
            <div><span className="text-gray-500">预期数量：</span><span className="text-gray-900">{order.expectedQty}</span></div>
            <div><span className="text-gray-500">已收数量：</span><span className="text-gray-900">{order.receivedQty}</span></div>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <h3 className="text-sm font-medium text-gray-900 mb-3">数量差异</h3>
          <div className="flex items-center gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">{order.expectedQty}</p>
              <p className="text-xs text-gray-500">预期数量</p>
            </div>
            <div className="text-gray-400">→</div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">{order.receivedQty}</p>
              <p className="text-xs text-gray-500">已收数量</p>
            </div>
            <div className="text-gray-400">=</div>
            <div className="text-center">
              <p className={`text-2xl font-bold ${order.expectedQty - order.receivedQty === 0 ? 'text-green-600' : 'text-orange-600'}`}>{order.expectedQty - order.receivedQty}</p>
              <p className="text-xs text-gray-500">待收数量</p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <h3 className="text-sm font-medium text-gray-900 mb-3">收货记录</h3>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 text-left text-gray-500">
              <th className="px-4 py-2 font-medium">时间</th>
              <th className="px-4 py-2 font-medium">操作人</th>
              <th className="px-4 py-2 font-medium">收货数量</th>
              <th className="px-4 py-2 font-medium">差异</th>
              <th className="px-4 py-2 font-medium">备注</th>
            </tr>
          </thead>
          <tbody>
            {receivingRecords.map((r, i) => (
              <tr key={i} className="border-b border-gray-50">
                <td className="px-4 py-2 text-gray-600">{r.time}</td>
                <td className="px-4 py-2 text-gray-600">{r.operator}</td>
                <td className="px-4 py-2 text-gray-900">{r.qty}</td>
                <td className="px-4 py-2"><span className={r.variance === 0 ? 'text-green-600' : 'text-orange-600'}>{r.variance === 0 ? '无差异' : `+${r.variance}`}</span></td>
                <td className="px-4 py-2 text-gray-500">{r.note || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function LogisticsProviderListPage({ onNavigate }: PageProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">物流商列表</h2>
        <button className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700">
          <Plus size={16} /> 新增物流商
        </button>
      </div>
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex flex-wrap gap-3 items-end">
          <div className="flex flex-col gap-1 flex-1 min-w-[200px]">
            <label className="text-xs text-gray-500">名称</label>
            <input placeholder="物流商名称" className="text-sm border border-gray-200 rounded-md px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-500" />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs text-gray-500">类型</label>
            <select className="text-sm border border-gray-200 rounded-md px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-500">
              <option>全部</option>
              <option>专线小包</option>
              <option>国际快递</option>
              <option>海外仓</option>
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs text-gray-500">状态</label>
            <select className="text-sm border border-gray-200 rounded-md px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-500">
              <option>全部</option>
              <option>有效</option>
              <option>停用</option>
            </select>
          </div>
          <button className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700">
            <Search size={14} /> 查询
          </button>
        </div>
      </div>
      <div className="bg-white rounded-lg border border-gray-200">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 text-left text-gray-500">
              <th className="px-4 py-3 font-medium">编码</th>
              <th className="px-4 py-3 font-medium">名称</th>
              <th className="px-4 py-3 font-medium">类型</th>
              <th className="px-4 py-3 font-medium">覆盖区域</th>
              <th className="px-4 py-3 font-medium">状态</th>
              <th className="px-4 py-3 font-medium">联系人</th>
              <th className="px-4 py-3 font-medium">操作</th>
            </tr>
          </thead>
          <tbody>
            {logisticsProviders.map((p) => (
              <tr key={p.code} className="border-b border-gray-50 hover:bg-gray-50">
                <td className="px-4 py-3 font-medium text-gray-900">{p.code}</td>
                <td className="px-4 py-3 text-gray-600">{p.name}</td>
                <td className="px-4 py-3 text-gray-600">{p.type}</td>
                <td className="px-4 py-3 text-gray-600">{p.coverage}</td>
                <td className="px-4 py-3"><span className={`px-2 py-0.5 text-xs rounded-full ${statusColors[p.status]}`}>{p.status}</span></td>
                <td className="px-4 py-3 text-gray-600">{p.contact} {p.phone}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1">
                    <button className="p-1 hover:bg-gray-100 rounded text-gray-500 hover:text-blue-600" title="查看"><Eye size={14} /></button>
                    <button className="p-1 hover:bg-gray-100 rounded text-gray-500 hover:text-orange-600" title="编辑"><Edit3 size={14} /></button>
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

function LogisticsChannelConfigPage({ onNavigate }: PageProps) {
  const [selectedChannel, setSelectedChannel] = useState(channelConfigs[0]);
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <button onClick={() => onNavigate('logistics-provider')} className="p-1.5 hover:bg-gray-100 rounded-md text-gray-500"><ArrowLeft size={18} /></button>
        <h2 className="text-lg font-semibold text-gray-900">渠道配置</h2>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="p-3 border-b border-gray-100 font-medium text-sm text-gray-900">渠道列表</div>
          {channelConfigs.map((ch) => (
            <button
              key={ch.id}
              onClick={() => setSelectedChannel(ch)}
              className={`w-full text-left px-4 py-3 border-b border-gray-50 hover:bg-gray-50 transition-colors ${
                selectedChannel.id === ch.id ? 'bg-blue-50 border-l-2 border-l-blue-500' : ''
              }`}
            >
              <p className="text-sm font-medium text-gray-900">{ch.channelName}</p>
              <p className="text-xs text-gray-500 mt-0.5">{ch.provider} · {ch.type}</p>
            </button>
          ))}
        </div>
        <div className="col-span-2 space-y-4">
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h3 className="text-sm font-medium text-gray-900 mb-3">基本信息</h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div><span className="text-gray-500">渠道名称：</span><span className="text-gray-900">{selectedChannel.channelName}</span></div>
              <div><span className="text-gray-500">所属物流商：</span><span className="text-gray-900">{selectedChannel.provider}</span></div>
              <div><span className="text-gray-500">渠道类型：</span><span className="text-gray-900">{selectedChannel.type}</span></div>
              <div><span className="text-gray-500">状态：</span><span className={`px-2 py-0.5 text-xs rounded-full ${statusColors[selectedChannel.status]}`}>{selectedChannel.status}</span></div>
            </div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h3 className="text-sm font-medium text-gray-900 mb-3">计费规则（按重量）</h3>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 text-left text-gray-500">
                  <th className="px-4 py-2 font-medium">最大重量(kg)</th>
                  <th className="px-4 py-2 font-medium">单价(元)</th>
                </tr>
              </thead>
              <tbody>
                {selectedChannel.pricing.map((p, i) => (
                  <tr key={i} className="border-b border-gray-50">
                    <td className="px-4 py-2 text-gray-900">≤ {p.maxWeight}</td>
                    <td className="px-4 py-2 text-gray-900">¥{p.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h3 className="text-sm font-medium text-gray-900 mb-3">可发国家/地区</h3>
            <div className="flex flex-wrap gap-2">
              {selectedChannel.countries.map((c) => (
                <span key={c} className="px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-full">{c}</span>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h3 className="text-sm font-medium text-gray-900 mb-3">物流跟踪API</h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div><span className="text-gray-500">API地址：</span><span className="text-gray-900 font-mono text-xs">{selectedChannel.trackingApi}</span></div>
              <div><span className="text-gray-500">API密钥：</span><span className="text-gray-900 font-mono text-xs">{selectedChannel.apiKey}</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CustomsListPage({ onNavigate }: PageProps) {
  const [statusFilter, setStatusFilter] = useState('全部');
  const filtered = statusFilter === '全部' ? customsDeclarations : customsDeclarations.filter((c) => c.status === statusFilter);
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">报关列表</h2>
        <button onClick={() => onNavigate('customs-generate')} className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700">
          <Plus size={16} /> 生成报关
        </button>
      </div>
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex gap-2">
          {['全部', '草稿', '已提交', '已通过', '已拒绝'].map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                statusFilter === s ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>
      <div className="bg-white rounded-lg border border-gray-200">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 text-left text-gray-500">
              <th className="px-4 py-3 font-medium">报关单号</th>
              <th className="px-4 py-3 font-medium">类型</th>
              <th className="px-4 py-3 font-medium">关联出库单</th>
              <th className="px-4 py-3 font-medium">币种</th>
              <th className="px-4 py-3 font-medium">总金额</th>
              <th className="px-4 py-3 font-medium">状态</th>
              <th className="px-4 py-3 font-medium">提交时间</th>
              <th className="px-4 py-3 font-medium">操作</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((c) => (
              <tr key={c.id} className="border-b border-gray-50 hover:bg-gray-50">
                <td className="px-4 py-3 font-medium text-blue-600">{c.id}</td>
                <td className="px-4 py-3 text-gray-600">{c.type}</td>
                <td className="px-4 py-3 text-gray-600">{c.orders.join(', ')}</td>
                <td className="px-4 py-3 text-gray-600">{c.currency}</td>
                <td className="px-4 py-3 text-gray-900">{c.totalAmount.toLocaleString()}</td>
                <td className="px-4 py-3"><span className={`px-2 py-0.5 text-xs rounded-full ${statusColors[c.status]}`}>{c.status}</span></td>
                <td className="px-4 py-3 text-gray-500 text-xs">{c.submitTime}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1">
                    <button className="p-1 hover:bg-gray-100 rounded text-gray-500 hover:text-blue-600" title="查看"><Eye size={14} /></button>
                    <button className="p-1 hover:bg-gray-100 rounded text-gray-500 hover:text-green-600" title="下载"><Download size={14} /></button>
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

function CustomsGeneratePage({ onNavigate }: PageProps) {
  const [declType, setDeclType] = useState('出口报关');
  const [currency, setCurrency] = useState('USD');
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);
  const toggleOrder = (id: string) => {
    setSelectedOrders((prev) => prev.includes(id) ? prev.filter((o) => o !== id) : [...prev, id]);
  };
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <button onClick={() => onNavigate('customs-list')} className="p-1.5 hover:bg-gray-100 rounded-md text-gray-500"><ArrowLeft size={18} /></button>
        <h2 className="text-lg font-semibold text-gray-900">生成报关</h2>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-4">
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h3 className="text-sm font-medium text-gray-900 mb-3">报关配置</h3>
            <div className="space-y-3">
              <div className="flex flex-col gap-1">
                <label className="text-xs text-gray-500">报关类型</label>
                <select value={declType} onChange={(e) => setDeclType(e.target.value)} className="text-sm border border-gray-200 rounded-md px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-500">
                  <option>出口报关</option>
                  <option>目的国清关</option>
                </select>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs text-gray-500">报关币种</label>
                <select value={currency} onChange={(e) => setCurrency(e.target.value)} className="text-sm border border-gray-200 rounded-md px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-500">
                  <option>USD</option>
                  <option>EUR</option>
                  <option>GBP</option>
                  <option>JPY</option>
                </select>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h3 className="text-sm font-medium text-gray-900 mb-3">选择出库单</h3>
            <div className="space-y-2">
              {outboundOrders.filter((o) => o.status === '已发货' || o.status === '已签收').map((o) => (
                <label key={o.id} className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedOrders.includes(o.id)}
                    onChange={() => toggleOrder(o.id)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{o.id}</p>
                    <p className="text-xs text-gray-500">{o.items} · {o.channel}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <h3 className="text-sm font-medium text-gray-900 mb-3">报关预览</h3>
          <div className="border border-dashed border-gray-300 rounded-lg p-6 text-center">
            <ScrollText size={40} className="mx-auto text-gray-300 mb-3" />
            <p className="text-sm text-gray-500">请先选择出库单</p>
            {selectedOrders.length > 0 && (
              <div className="mt-4 text-left space-y-2">
                <div className="text-sm"><span className="text-gray-500">报关类型：</span><span className="text-gray-900">{declType}</span></div>
                <div className="text-sm"><span className="text-gray-500">币种：</span><span className="text-gray-900">{currency}</span></div>
                <div className="text-sm"><span className="text-gray-500">关联出库单：</span><span className="text-gray-900">{selectedOrders.length} 个</span></div>
              </div>
            )}
          </div>
          <div className="mt-4 flex gap-2">
            <button disabled={selectedOrders.length === 0} className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed">
              <FileText size={16} /> 生成报关单
            </button>
            <button disabled={selectedOrders.length === 0} className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 border border-gray-200 text-gray-700 text-sm rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
              <Download size={16} /> 导出Excel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export {
  OutboundListPage,
  OutboundDetailPage,
  InboundListPage,
  InboundDetailPage,
  LogisticsProviderListPage,
  LogisticsChannelConfigPage,
  CustomsListPage,
  CustomsGeneratePage,
};
