import React, { useState } from 'react';
import {
  Search,
  Download,
  RefreshCw,
  ArrowLeft,
  Eye,
  CreditCard,
  CheckCircle2,
  AlertTriangle,
  DollarSign,
  Plus,
  Save,
  Scale,
  Globe,
  Settings,
  FileCheck,
  AlertCircle,
  Package,
  Hash,
  Zap,
  ToggleLeft,
  ToggleRight,
  ChevronDown,
  ChevronRight,
  TrendingUp,
  TrendingDown,
  XCircle,
} from 'lucide-react';

type ARRecord = {
  id: string;
  batchNo: string;
  platform: string;
  shop: string;
  amount: number;
  writtenOff: number;
  unwrittenOff: number;
  status: string;
};

type APRecord = {
  id: string;
  purchaseOrder: string;
  supplier: string;
  amount: number;
  writtenOff: number;
  unwrittenOff: number;
  status: string;
};

type ExpenseRecord = {
  id: string;
  type: string;
  amount: number;
  date: string;
  department: string;
  status: string;
  notes: string;
};

type ExchangeRate = {
  currency: string;
  symbol: string;
  rate: number;
  updateTime: string;
  source: string;
};

type ReconciliationBatch = {
  id: string;
  platform: string;
  period: string;
  totalOrders: number;
  matchedOrders: number;
  discrepancyOrders: number;
  totalAmount: number;
  discrepancyAmount: number;
  status: string;
};

const mockARRecords: ARRecord[] = [
  { id: 'AR-20260901001', batchNo: 'BAT-20260901', platform: '亚马逊', shop: 'US亚马逊旗舰店', amount: 12850.00, writtenOff: 12850.00, unwrittenOff: 0, status: '全部核销' },
  { id: 'AR-20260902002', batchNo: 'BAT-20260902', platform: 'TEMU', shop: 'TEMU官方店', amount: 8760.50, writtenOff: 5000.00, unwrittenOff: 3760.50, status: '部分核销' },
  { id: 'AR-20260903003', batchNo: 'BAT-20260903', platform: 'Shopee', shop: 'Shopee越南店', amount: 15200.00, writtenOff: 0, unwrittenOff: 15200.00, status: '待核销' },
  { id: 'AR-20260904004', batchNo: 'BAT-20260904', platform: '速卖通', shop: '速卖通官方店', amount: 6340.80, writtenOff: 0, unwrittenOff: 6340.80, status: '已逾期' },
  { id: 'AR-20260905005', batchNo: 'BAT-20260905', platform: 'eBay', shop: 'eBay综合店', amount: 23400.00, writtenOff: 18000.00, unwrittenOff: 5400.00, status: '部分核销' },
];

const mockAPRecords: APRecord[] = [
  { id: 'AP-20260901001', purchaseOrder: 'PO-20260901', supplier: '深圳华芯科技有限公司', amount: 45600.00, writtenOff: 45600.00, unwrittenOff: 0, status: '全部核销' },
  { id: 'AP-20260902002', purchaseOrder: 'PO-20260902', supplier: '东莞精密模具厂', amount: 23800.00, writtenOff: 10000.00, unwrittenOff: 13800.00, status: '部分核销' },
  { id: 'AP-20260903003', purchaseOrder: 'PO-20260903', supplier: '广州包装材料有限公司', amount: 8900.00, writtenOff: 0, unwrittenOff: 8900.00, status: '待核销' },
  { id: 'AP-20260904004', purchaseOrder: 'PO-20260904', supplier: '义乌小商品供应商', amount: 31200.00, writtenOff: 0, unwrittenOff: 31200.00, status: '待核销' },
];

const mockExpenses: ExpenseRecord[] = [
  { id: 'EX-001', type: '物流费', amount: 15600.00, date: '2026-09-01', department: '物流部', status: '已审批', notes: '8月国际快递费用' },
  { id: 'EX-002', type: '平台佣金', amount: 8920.50, date: '2026-09-03', department: '运营部', status: '已审批', notes: '亚马逊8月佣金' },
  { id: 'EX-003', type: '仓储费', amount: 4500.00, date: '2026-09-05', department: '仓储部', status: '待审批', notes: '海外仓月度仓储费' },
  { id: 'EX-004', type: '物流费', amount: 6780.00, date: '2026-09-08', department: '物流部', status: '已驳回', notes: 'TEMU物流运费' },
];

const mockExchangeRates: ExchangeRate[] = [
  { currency: 'USD', symbol: '$', rate: 7.2456, updateTime: '2026-09-13 09:30', source: '自动' },
  { currency: 'EUR', symbol: '€', rate: 7.8923, updateTime: '2026-09-13 09:30', source: '自动' },
  { currency: 'GBP', symbol: '£', rate: 9.1245, updateTime: '2026-09-13 09:30', source: '自动' },
  { currency: 'JPY', symbol: '¥', rate: 0.0485, updateTime: '2026-09-13 09:30', source: '自动' },
];

const mockReconciliationBatches: ReconciliationBatch[] = [
  { id: 'REC-20260901', platform: '亚马逊', period: '2026-08', totalOrders: 1250, matchedOrders: 1230, discrepancyOrders: 20, totalAmount: 156800.00, discrepancyAmount: 2340.50, status: '差异处理中' },
  { id: 'REC-20260902', platform: 'TEMU', period: '2026-08', totalOrders: 890, matchedOrders: 890, discrepancyOrders: 0, totalAmount: 67500.00, discrepancyAmount: 0, status: '已完成' },
  { id: 'REC-20260903', platform: 'Shopee', period: '2026-08', totalOrders: 560, matchedOrders: 545, discrepancyOrders: 15, totalAmount: 42300.00, discrepancyAmount: 890.20, status: '差异处理中' },
  { id: 'REC-20260904', platform: '速卖通', period: '2026-08', totalOrders: 320, matchedOrders: 320, discrepancyOrders: 0, totalAmount: 28900.00, discrepancyAmount: 0, status: '已完成' },
];

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    '待核销': 'bg-yellow-50 text-yellow-700 border border-yellow-200',
    '部分核销': 'bg-blue-50 text-blue-700 border border-blue-200',
    '全部核销': 'bg-green-50 text-green-700 border border-green-200',
    '已逾期': 'bg-red-50 text-red-700 border border-red-200',
    '已审批': 'bg-green-50 text-green-700 border border-green-200',
    '待审批': 'bg-yellow-50 text-yellow-700 border border-yellow-200',
    '已驳回': 'bg-red-50 text-red-700 border border-red-200',
    '已完成': 'bg-green-50 text-green-700 border border-green-200',
    '差异处理中': 'bg-orange-50 text-orange-700 border border-orange-200',
  };
  return (
    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${styles[status] || 'bg-gray-50 text-gray-700 border border-gray-200'}`}>
      {status}
    </span>
  );
}

function formatMoney(value: number) {
  return value.toLocaleString('zh-CN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export function ARListPage({ onNavigate }: { onNavigate: (page: string) => void }) {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('全部');

  const filtered = mockARRecords.filter((r) => {
    const matchSearch = !search || r.id.includes(search) || r.platform.includes(search) || r.shop.includes(search);
    const matchStatus = statusFilter === '全部' || r.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">应收列表</h2>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm bg-white border border-gray-200 rounded-lg hover:bg-gray-50">
            <Download className="w-4 h-4" /> 导出
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm bg-white border border-gray-200 rounded-lg hover:bg-gray-50">
            <RefreshCw className="w-4 h-4" /> 刷新
          </button>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="搜索应收单号、平台、店铺..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <select
          className="px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          {['全部', '待核销', '部分核销', '全部核销', '已逾期'].map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-4 py-3 text-left font-medium text-gray-600">应收单号</th>
              <th className="px-4 py-3 text-left font-medium text-gray-600">结算批次</th>
              <th className="px-4 py-3 text-left font-medium text-gray-600">平台/店铺</th>
              <th className="px-4 py-3 text-right font-medium text-gray-600">应收金额</th>
              <th className="px-4 py-3 text-right font-medium text-gray-600">已核销</th>
              <th className="px-4 py-3 text-right font-medium text-gray-600">未核销</th>
              <th className="px-4 py-3 text-center font-medium text-gray-600">状态</th>
              <th className="px-4 py-3 text-center font-medium text-gray-600">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filtered.map((r) => (
              <tr key={r.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-medium text-blue-600">{r.id}</td>
                <td className="px-4 py-3 text-gray-700">{r.batchNo}</td>
                <td className="px-4 py-3">
                  <div className="text-gray-900">{r.platform}</div>
                  <div className="text-gray-500 text-xs">{r.shop}</div>
                </td>
                <td className="px-4 py-3 text-right font-medium">¥{formatMoney(r.amount)}</td>
                <td className="px-4 py-3 text-right text-green-600">¥{formatMoney(r.writtenOff)}</td>
                <td className="px-4 py-3 text-right text-orange-600">¥{formatMoney(r.unwrittenOff)}</td>
                <td className="px-4 py-3 text-center"><StatusBadge status={r.status} /></td>
                <td className="px-4 py-3 text-center">
                  <button
                    onClick={() => onNavigate('ar-writeoff')}
                    className="text-blue-600 hover:text-blue-800 text-xs"
                  >
                    核销
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function ARWriteoffPage({ onNavigate }: { onNavigate: (page: string) => void }) {
  const [selectedAR, setSelectedAR] = useState<string | null>(null);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <button onClick={() => onNavigate('ar-list')} className="p-1 hover:bg-gray-100 rounded">
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        <h2 className="text-lg font-semibold text-gray-900">应收核销</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-4 space-y-3">
          <h3 className="font-medium text-gray-900">选择应收单</h3>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg" placeholder="搜索应收单号..." />
          </div>
          <div className="space-y-2 max-h-80 overflow-y-auto">
            {mockARRecords.filter((r) => r.status !== '全部核销').map((r) => (
              <div
                key={r.id}
                onClick={() => setSelectedAR(r.id)}
                className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                  selectedAR === r.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium text-sm">{r.id}</span>
                  <StatusBadge status={r.status} />
                </div>
                <div className="text-xs text-gray-500 mt-1">{r.platform} - {r.shop}</div>
                <div className="flex justify-between mt-2 text-sm">
                  <span className="text-gray-600">应收: ¥{formatMoney(r.amount)}</span>
                  <span className="text-orange-600">待核销: ¥{formatMoney(r.unwrittenOff)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-4 space-y-3">
          <h3 className="font-medium text-gray-900">收款匹配</h3>
          {selectedAR ? (
            <div className="space-y-3">
              <div className="p-3 bg-gray-50 rounded-lg text-sm">
                <div className="font-medium">应收单: {selectedAR}</div>
                <div className="text-gray-500 text-xs mt-1">请选择对应的收款记录进行核销</div>
              </div>
              <div className="space-y-2">
                {[
                  { id: 'PAY-001', date: '2026-09-10', amount: 5000.00, bank: '中国银行' },
                  { id: 'PAY-002', date: '2026-09-12', amount: 3760.50, bank: '招商银行' },
                ].map((p) => (
                  <div key={p.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                    <div>
                      <div className="text-sm font-medium">{p.id}</div>
                      <div className="text-xs text-gray-500">{p.date} · {p.bank}</div>
                    </div>
                    <div className="text-sm font-medium">¥{formatMoney(p.amount)}</div>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <button className="flex-1 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700">确认核销</button>
                <button className="px-4 py-2 border border-gray-200 text-sm rounded-lg hover:bg-gray-50">取消</button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-gray-400">
              <CreditCard className="w-12 h-12 mb-2" />
              <p className="text-sm">请先选择应收单</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function APListPage({ onNavigate }: { onNavigate: (page: string) => void }) {
  const [search, setSearch] = useState('');

  const filtered = mockAPRecords.filter((r) => {
    return !search || r.id.includes(search) || r.supplier.includes(search) || r.purchaseOrder.includes(search);
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">应付列表</h2>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm bg-white border border-gray-200 rounded-lg hover:bg-gray-50">
            <Download className="w-4 h-4" /> 导出
          </button>
        </div>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="搜索应付单号、供应商..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-4 py-3 text-left font-medium text-gray-600">应付单号</th>
              <th className="px-4 py-3 text-left font-medium text-gray-600">关联采购单</th>
              <th className="px-4 py-3 text-left font-medium text-gray-600">供应商</th>
              <th className="px-4 py-3 text-right font-medium text-gray-600">应付金额</th>
              <th className="px-4 py-3 text-right font-medium text-gray-600">已核销</th>
              <th className="px-4 py-3 text-right font-medium text-gray-600">未核销</th>
              <th className="px-4 py-3 text-center font-medium text-gray-600">状态</th>
              <th className="px-4 py-3 text-center font-medium text-gray-600">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filtered.map((r) => (
              <tr key={r.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-medium text-blue-600">{r.id}</td>
                <td className="px-4 py-3 text-gray-700">{r.purchaseOrder}</td>
                <td className="px-4 py-3 text-gray-900">{r.supplier}</td>
                <td className="px-4 py-3 text-right font-medium">¥{formatMoney(r.amount)}</td>
                <td className="px-4 py-3 text-right text-green-600">¥{formatMoney(r.writtenOff)}</td>
                <td className="px-4 py-3 text-right text-orange-600">¥{formatMoney(r.unwrittenOff)}</td>
                <td className="px-4 py-3 text-center"><StatusBadge status={r.status} /></td>
                <td className="px-4 py-3 text-center">
                  <button
                    onClick={() => onNavigate('ap-writeoff')}
                    className="text-blue-600 hover:text-blue-800 text-xs"
                  >
                    核销
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function APWriteoffPage({ onNavigate }: { onNavigate: (page: string) => void }) {
  const [selectedAP, setSelectedAP] = useState<string | null>(null);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <button onClick={() => onNavigate('ap-list')} className="p-1 hover:bg-gray-100 rounded">
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        <h2 className="text-lg font-semibold text-gray-900">应付核销</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-4 space-y-3">
          <h3 className="font-medium text-gray-900">选择应付单</h3>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg" placeholder="搜索应付单号..." />
          </div>
          <div className="space-y-2 max-h-80 overflow-y-auto">
            {mockAPRecords.filter((r) => r.status !== '全部核销').map((r) => (
              <div
                key={r.id}
                onClick={() => setSelectedAP(r.id)}
                className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                  selectedAP === r.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium text-sm">{r.id}</span>
                  <StatusBadge status={r.status} />
                </div>
                <div className="text-xs text-gray-500 mt-1">{r.supplier}</div>
                <div className="flex justify-between mt-2 text-sm">
                  <span className="text-gray-600">应付: ¥{formatMoney(r.amount)}</span>
                  <span className="text-orange-600">待核销: ¥{formatMoney(r.unwrittenOff)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-4 space-y-3">
          <h3 className="font-medium text-gray-900">付款匹配</h3>
          {selectedAP ? (
            <div className="space-y-3">
              <div className="p-3 bg-gray-50 rounded-lg text-sm">
                <div className="font-medium">应付单: {selectedAP}</div>
                <div className="text-gray-500 text-xs mt-1">请选择对应的付款记录进行核销</div>
              </div>
              <div className="space-y-2">
                {[
                  { id: 'PAY-AP-001', date: '2026-09-11', amount: 10000.00, method: '银行转账' },
                  { id: 'PAY-AP-002', date: '2026-09-13', amount: 13800.00, method: '承兑汇票' },
                ].map((p) => (
                  <div key={p.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                    <div>
                      <div className="text-sm font-medium">{p.id}</div>
                      <div className="text-xs text-gray-500">{p.date} · {p.method}</div>
                    </div>
                    <div className="text-sm font-medium">¥{formatMoney(p.amount)}</div>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <button className="flex-1 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700">确认核销</button>
                <button className="px-4 py-2 border border-gray-200 text-sm rounded-lg hover:bg-gray-50">取消</button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-gray-400">
              <CreditCard className="w-12 h-12 mb-2" />
              <p className="text-sm">请先选择应付单</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function ExpenseListPage({ onNavigate }: { onNavigate: (page: string) => void }) {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('全部');

  const types = ['全部', ...new Set(mockExpenses.map((e) => e.type))];
  const filtered = mockExpenses.filter((e) => {
    const matchSearch = !search || e.id.includes(search) || e.notes.includes(search);
    const matchType = typeFilter === '全部' || e.type === typeFilter;
    return matchSearch && matchType;
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">费用列表</h2>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate('expense-add')}
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus className="w-4 h-4" /> 新增费用
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm bg-white border border-gray-200 rounded-lg hover:bg-gray-50">
            <Download className="w-4 h-4" /> 导出
          </button>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="搜索费用编号、备注..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <select
          className="px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white"
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
        >
          {types.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-4 py-3 text-left font-medium text-gray-600">费用编号</th>
              <th className="px-4 py-3 text-left font-medium text-gray-600">费用类型</th>
              <th className="px-4 py-3 text-right font-medium text-gray-600">金额</th>
              <th className="px-4 py-3 text-left font-medium text-gray-600">日期</th>
              <th className="px-4 py-3 text-left font-medium text-gray-600">部门</th>
              <th className="px-4 py-3 text-left font-medium text-gray-600">备注</th>
              <th className="px-4 py-3 text-center font-medium text-gray-600">状态</th>
              <th className="px-4 py-3 text-center font-medium text-gray-600">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filtered.map((e) => (
              <tr key={e.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-medium text-blue-600">{e.id}</td>
                <td className="px-4 py-3 text-gray-700">{e.type}</td>
                <td className="px-4 py-3 text-right font-medium">¥{formatMoney(e.amount)}</td>
                <td className="px-4 py-3 text-gray-700">{e.date}</td>
                <td className="px-4 py-3 text-gray-700">{e.department}</td>
                <td className="px-4 py-3 text-gray-500 text-xs max-w-[200px] truncate">{e.notes}</td>
                <td className="px-4 py-3 text-center"><StatusBadge status={e.status} /></td>
                <td className="px-4 py-3 text-center">
                  <button className="text-gray-500 hover:text-gray-700">
                    <Eye className="w-4 h-4 inline" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function ExpenseAddPage({ onNavigate }: { onNavigate: (page: string) => void }) {
  const [form, setForm] = useState({ type: '', amount: '', date: '', department: '', notes: '' });
  const update = (field: string, value: string) => setForm((prev) => ({ ...prev, [field]: value }));

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <button onClick={() => onNavigate('expense-list')} className="p-1 hover:bg-gray-100 rounded">
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        <h2 className="text-lg font-semibold text-gray-900">新增费用</h2>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6 max-w-2xl">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">费用类型 <span className="text-red-500">*</span></label>
            <select className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg" value={form.type} onChange={(e) => update('type', e.target.value)}>
              <option value="">请选择费用类型</option>
              {['物流费', '平台佣金', '仓储费', '关税', '包装费', '其他'].map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">金额 <span className="text-red-500">*</span></label>
            <input type="number" className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg" placeholder="请输入金额" value={form.amount} onChange={(e) => update('amount', e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">日期 <span className="text-red-500">*</span></label>
            <input type="date" className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg" value={form.date} onChange={(e) => update('date', e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">部门 <span className="text-red-500">*</span></label>
            <select className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg" value={form.department} onChange={(e) => update('department', e.target.value)}>
              <option value="">请选择部门</option>
              {['物流部', '运营部', '仓储部', '采购部', '财务部'].map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">备注</label>
            <textarea className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg" rows={3} placeholder="请输入备注信息" value={form.notes} onChange={(e) => update('notes', e.target.value)} />
          </div>
          <div className="flex gap-2 pt-2">
            <button className="px-6 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700">提交</button>
            <button onClick={() => onNavigate('expense-list')} className="px-6 py-2 border border-gray-200 text-sm rounded-lg hover:bg-gray-50">取消</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ExpenseRulePage({ onNavigate }: { onNavigate: (page: string) => void }) {
  const [rules, setRules] = useState([
    { id: 1, name: '物流费分摊', method: '按订单金额', enabled: true },
    { id: 2, name: '平台佣金分摊', method: '按订单金额', enabled: true },
    { id: 3, name: '仓储费分摊', method: '按数量', enabled: false },
    { id: 4, name: '关税分摊', method: '按重量', enabled: true },
  ]);

  const toggleRule = (id: number) => {
    setRules((prev) => prev.map((r) => (r.id === id ? { ...r, enabled: !r.enabled } : r)));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">费用分摊规则</h2>
        <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          <Plus className="w-4 h-4" /> 新增规则
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <h3 className="font-medium text-gray-900 mb-3">分摊方式</h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { method: '按订单金额', icon: DollarSign, desc: '按订单金额比例分摊' },
            { method: '按数量', icon: Hash, desc: '按商品数量平均分摊' },
            { method: '按重量', icon: Scale, desc: '按商品重量比例分摊' },
            { method: '按SKU', icon: Package, desc: '按SKU数量平均分摊' },
          ].map((m) => (
            <div key={m.method} className="p-3 border border-gray-200 rounded-lg text-center">
              <m.icon className="w-6 h-6 mx-auto text-blue-600 mb-2" />
              <div className="text-sm font-medium text-gray-900">{m.method}</div>
              <div className="text-xs text-gray-500 mt-1">{m.desc}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-4 py-3 text-left font-medium text-gray-600">规则名称</th>
              <th className="px-4 py-3 text-left font-medium text-gray-600">分摊方式</th>
              <th className="px-4 py-3 text-center font-medium text-gray-600">状态</th>
              <th className="px-4 py-3 text-center font-medium text-gray-600">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {rules.map((r) => (
              <tr key={r.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-medium text-gray-900">{r.name}</td>
                <td className="px-4 py-3 text-gray-700">{r.method}</td>
                <td className="px-4 py-3 text-center">
                  <button onClick={() => toggleRule(r.id)} className="flex items-center justify-center mx-auto gap-1">
                    {r.enabled ? <ToggleRight className="w-6 h-6 text-blue-600" /> : <ToggleLeft className="w-6 h-6 text-gray-400" />}
                  </button>
                </td>
                <td className="px-4 py-3 text-center">
                  <button className="text-blue-600 hover:text-blue-800 text-xs">编辑</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function ExchangeRateListPage({ onNavigate }: { onNavigate: (page: string) => void }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">汇率列表</h2>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm bg-white border border-gray-200 rounded-lg hover:bg-gray-50">
            <RefreshCw className="w-4 h-4" /> 刷新汇率
          </button>
          <button
            onClick={() => onNavigate('exchange-rate-config')}
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm bg-white border border-gray-200 rounded-lg hover:bg-gray-50"
          >
            <Settings className="w-4 h-4" /> 配置
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {mockExchangeRates.map((r) => (
          <div key={r.currency} className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-blue-600" />
                <span className="font-medium text-gray-900">{r.currency}</span>
              </div>
              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded">{r.source}</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">{r.rate}</div>
            <div className="text-xs text-gray-500 mt-1">更新于 {r.updateTime}</div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-4 py-3 text-left font-medium text-gray-600">货币</th>
              <th className="px-4 py-3 text-right font-medium text-gray-600">汇率 (兑CNY)</th>
              <th className="px-4 py-3 text-left font-medium text-gray-600">更新时间</th>
              <th className="px-4 py-3 text-center font-medium text-gray-600">来源</th>
              <th className="px-4 py-3 text-center font-medium text-gray-600">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {mockExchangeRates.map((r) => (
              <tr key={r.currency} className="hover:bg-gray-50">
                <td className="px-4 py-3">
                  <span className="font-medium text-gray-900">{r.symbol} {r.currency}</span>
                </td>
                <td className="px-4 py-3 text-right font-medium">{r.rate}</td>
                <td className="px-4 py-3 text-gray-700">{r.updateTime}</td>
                <td className="px-4 py-3 text-center">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${r.source === '自动' ? 'bg-blue-50 text-blue-700' : 'bg-gray-100 text-gray-700'}`}>
                    {r.source}
                  </span>
                </td>
                <td className="px-4 py-3 text-center">
                  <button className="text-blue-600 hover:text-blue-800 text-xs">调整</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function ExchangeRateConfigPage({ onNavigate }: { onNavigate: (page: string) => void }) {
  const [autoSync, setAutoSync] = useState(true);
  const [syncInterval, setSyncInterval] = useState('30');
  const [baseCurrency, setBaseCurrency] = useState('CNY');

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <button onClick={() => onNavigate('exchange-rate-list')} className="p-1 hover:bg-gray-100 rounded">
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        <h2 className="text-lg font-semibold text-gray-900">汇率配置</h2>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6 max-w-2xl space-y-6">
        <div>
          <h3 className="font-medium text-gray-900 mb-3">自动同步</h3>
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <div className="text-sm font-medium text-gray-900">启用自动同步</div>
              <div className="text-xs text-gray-500">从外汇数据源自动获取最新汇率</div>
            </div>
            <button onClick={() => setAutoSync(!autoSync)}>
              {autoSync ? <ToggleRight className="w-8 h-8 text-blue-600" /> : <ToggleLeft className="w-8 h-8 text-gray-400" />}
            </button>
          </div>
        </div>

        {autoSync && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">同步间隔</label>
            <select className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg" value={syncInterval} onChange={(e) => setSyncInterval(e.target.value)}>
              <option value="15">每15分钟</option>
              <option value="30">每30分钟</option>
              <option value="60">每1小时</option>
              <option value="360">每6小时</option>
              <option value="1440">每24小时</option>
            </select>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">基准货币</label>
          <select className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg" value={baseCurrency} onChange={(e) => setBaseCurrency(e.target.value)}>
            {['CNY', 'USD', 'EUR'].map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <div>
          <h3 className="font-medium text-gray-900 mb-3">手动调整</h3>
          <div className="space-y-2">
            {mockExchangeRates.map((r) => (
              <div key={r.currency} className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg">
                <span className="w-16 font-medium text-gray-900">{r.symbol} {r.currency}</span>
                <span className="text-sm text-gray-500">当前: {r.rate}</span>
                <input type="number" step="0.0001" className="flex-1 px-3 py-1.5 text-sm border border-gray-200 rounded-lg" placeholder="输入调整值" />
                <button className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700">应用</button>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-2 pt-2">
          <button className="px-6 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700">保存配置</button>
          <button onClick={() => onNavigate('exchange-rate-list')} className="px-6 py-2 border border-gray-200 text-sm rounded-lg hover:bg-gray-50">取消</button>
        </div>
      </div>
    </div>
  );
}

export function CostCalcConfigPage({ onNavigate }: { onNavigate: (page: string) => void }) {
  const [pricingMethod, setPricingMethod] = useState('移动加权平均');
  const [components, setComponents] = useState({
    purchasePrice: true,
    shippingFee: true,
    customsDuty: true,
    insurance: false,
    packagingFee: false,
    otherFees: false,
  });

  const toggleComponent = (key: keyof typeof components) => {
    setComponents((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const componentList = [
    { key: 'purchasePrice' as const, label: '采购单价', desc: '商品的采购成本' },
    { key: 'shippingFee' as const, label: '物流运费', desc: '国际/国内物流费用' },
    { key: 'customsDuty' as const, label: '关税', desc: '进口关税及相关税费' },
    { key: 'insurance' as const, label: '保险费', desc: '货物运输保险' },
    { key: 'packagingFee' as const, label: '包装费', desc: '商品包装材料费用' },
    { key: 'otherFees' as const, label: '其他费用', desc: '其他杂项费用' },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <button onClick={() => onNavigate('ar-list')} className="p-1 hover:bg-gray-100 rounded">
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        <h2 className="text-lg font-semibold text-gray-900">成本核算配置</h2>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6 max-w-2xl space-y-6">
        <div>
          <h3 className="font-medium text-gray-900 mb-3">计价方式</h3>
          <div className="space-y-2">
            {[
              { value: '移动加权平均', label: '移动加权平均法', desc: '每次入库后重新计算加权平均成本，适用于价格波动较大的场景' },
              { value: '固定成本', label: '固定成本法', desc: '成本在入库时锁定，后续不再随市场价格变动调整' },
            ].map((m) => (
              <div
                key={m.value}
                onClick={() => setPricingMethod(m.value)}
                className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                  pricingMethod === m.value ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-2">
                  <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                    pricingMethod === m.value ? 'border-blue-600' : 'border-gray-300'
                  }`}>
                    {pricingMethod === m.value && <div className="w-2 h-2 rounded-full bg-blue-600" />}
                  </div>
                  <span className="font-medium text-gray-900">{m.label}</span>
                </div>
                <p className="text-xs text-gray-500 mt-1 ml-6">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-medium text-gray-900 mb-3">成本组件</h3>
          <p className="text-xs text-gray-500 mb-3">选择计入成本的费用项目</p>
          <div className="space-y-2">
            {componentList.map((c) => (
              <div
                key={c.key}
                onClick={() => toggleComponent(c.key)}
                className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                    components[c.key] ? 'bg-blue-600 border-blue-600' : 'border-gray-300'
                  }`}>
                    {components[c.key] && <CheckCircle2 className="w-3 h-3 text-white" />}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">{c.label}</div>
                    <div className="text-xs text-gray-500">{c.desc}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-2 pt-2">
          <button className="px-6 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700">保存配置</button>
          <button onClick={() => onNavigate('ar-list')} className="px-6 py-2 border border-gray-200 text-sm rounded-lg hover:bg-gray-50">取消</button>
        </div>
      </div>
    </div>
  );
}

export function ReconciliationListPage({ onNavigate }: { onNavigate: (page: string) => void }) {
  const [search, setSearch] = useState('');

  const filtered = mockReconciliationBatches.filter((r) => {
    return !search || r.id.includes(search) || r.platform.includes(search);
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">平台对账</h2>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <Plus className="w-4 h-4" /> 新建对账
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm bg-white border border-gray-200 rounded-lg hover:bg-gray-50">
            <Download className="w-4 h-4" /> 导出
          </button>
        </div>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="搜索对账批次、平台..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {filtered.map((r) => (
          <div
            key={r.id}
            onClick={() => onNavigate('reconciliation-detail')}
            className={`bg-white rounded-xl border p-4 cursor-pointer hover:shadow-md transition-shadow ${
              r.discrepancyOrders > 0 ? 'border-orange-300' : 'border-gray-200'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-blue-600" />
                <span className="font-medium text-gray-900">{r.platform}</span>
              </div>
              <StatusBadge status={r.status} />
            </div>
            <div className="text-xs text-gray-500 mb-2">{r.period} · {r.id}</div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <div className="text-gray-500">总订单</div>
                <div className="font-medium">{r.totalOrders}</div>
              </div>
              <div>
                <div className="text-gray-500">已匹配</div>
                <div className="font-medium text-green-600">{r.matchedOrders}</div>
              </div>
              <div>
                <div className="text-gray-500">总金额</div>
                <div className="font-medium">¥{formatMoney(r.totalAmount)}</div>
              </div>
              <div>
                <div className="text-gray-500">差异</div>
                <div className={`font-medium ${r.discrepancyAmount > 0 ? 'text-red-600' : 'text-green-600'}`}>
                  {r.discrepancyAmount > 0 ? `¥${formatMoney(r.discrepancyAmount)}` : '无差异'}
                </div>
              </div>
            </div>
            {r.discrepancyOrders > 0 && (
              <div className="mt-3 pt-3 border-t border-gray-100 flex items-center gap-1.5 text-orange-600 text-xs">
                <AlertTriangle className="w-3.5 h-3.5" />
                {r.discrepancyOrders} 笔订单存在差异
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export function ReconciliationDetailPage({ onNavigate }: { onNavigate: (page: string) => void }) {
  const batch = mockReconciliationBatches[0];
  const discrepancyItems = [
    { orderId: 'ORD-20260815001', platform: '亚马逊', amount: 128.50, platformAmount: 128.50, systemAmount: 125.30, diff: -3.20, reason: '平台手续费差异' },
    { orderId: 'ORD-20260816023', platform: '亚马逊', amount: 234.00, platformAmount: 234.00, systemAmount: 230.00, diff: -4.00, reason: '汇率折算差异' },
    { orderId: 'ORD-20260818045', platform: '亚马逊', amount: 89.90, platformAmount: 89.90, systemAmount: 0, diff: -89.90, reason: '系统漏单' },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <button onClick={() => onNavigate('reconciliation-list')} className="p-1 hover:bg-gray-100 rounded">
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        <h2 className="text-lg font-semibold text-gray-900">对账详情</h2>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: '总订单数', value: batch.totalOrders, icon: Package },
          { label: '已匹配', value: batch.matchedOrders, icon: CheckCircle2, color: 'text-green-600' },
          { label: '差异订单', value: batch.discrepancyOrders, icon: AlertTriangle, color: batch.discrepancyOrders > 0 ? 'text-red-600' : 'text-gray-900' },
          { label: '差异金额', value: `¥${formatMoney(batch.discrepancyAmount)}`, icon: TrendingDown, color: batch.discrepancyAmount > 0 ? 'text-red-600' : 'text-green-600' },
        ].map((s, i) => (
          <div key={i} className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center gap-2 mb-1">
              <s.icon className="w-4 h-4 text-gray-400" />
              <span className="text-xs text-gray-500">{s.label}</span>
            </div>
            <div className={`text-xl font-bold ${s.color || 'text-gray-900'}`}>{s.value}</div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <h3 className="font-medium text-gray-900 mb-3">差异订单明细</h3>
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-4 py-3 text-left font-medium text-gray-600">订单号</th>
                <th className="px-4 py-3 text-right font-medium text-gray-600">平台金额</th>
                <th className="px-4 py-3 text-right font-medium text-gray-600">系统金额</th>
                <th className="px-4 py-3 text-right font-medium text-gray-600">差异</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">差异原因</th>
                <th className="px-4 py-3 text-center font-medium text-gray-600">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {discrepancyItems.map((item) => (
                <tr key={item.orderId} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-blue-600">{item.orderId}</td>
                  <td className="px-4 py-3 text-right">¥{formatMoney(item.platformAmount)}</td>
                  <td className="px-4 py-3 text-right">¥{formatMoney(item.systemAmount)}</td>
                  <td className="px-4 py-3 text-right font-medium text-red-600">¥{formatMoney(item.diff)}</td>
                  <td className="px-4 py-3 text-gray-700">{item.reason}</td>
                  <td className="px-4 py-3 text-center">
                    <button className="text-blue-600 hover:text-blue-800 text-xs">处理</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <h3 className="font-medium text-gray-900 mb-3">差异分析</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {[
            { reason: '平台手续费差异', count: 8, amount: 156.30, icon: DollarSign },
            { reason: '汇率折算差异', count: 7, amount: 89.20, icon: TrendingDown },
            { reason: '系统漏单', count: 5, amount: 2095.00, icon: AlertCircle },
          ].map((a) => (
            <div key={a.reason} className="p-3 border border-gray-200 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <a.icon className="w-4 h-4 text-orange-600" />
                <span className="text-sm font-medium text-gray-900">{a.reason}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">{a.count} 笔</span>
                <span className="font-medium text-red-600">¥{formatMoney(a.amount)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
