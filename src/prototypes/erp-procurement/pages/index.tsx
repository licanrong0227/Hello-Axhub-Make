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
  CheckCircle2,
  XCircle,
  AlertTriangle,
  FileText,
  Save,
  Building2,
  Phone,
  Mail,
  Tag,
  Package,
  Calendar,
  Truck,
  RotateCcw,
  ShoppingCart,
  Warehouse,
  ClipboardList,
} from 'lucide-react';

type Supplier = {
  id: string;
  code: string;
  name: string;
  contact: string;
  phone: string;
  categories: string[];
  paymentTerm: string;
  quoteExpiry: string;
  status: string;
};

type PurchaseSuggestion = {
  id: string;
  sku: string;
  productName: string;
  warehouse: string;
  currentStock: number;
  safetyStock: number;
  gap: number;
  suggestedQty: number;
  suggestedSupplier: string;
};

type PurchaseOrder = {
  id: string;
  supplier: string;
  warehouse: string;
  totalAmount: string;
  itemCount: number;
  status: string;
  createTime: string;
  expectArrival: string;
};

type PurchaseReturn = {
  id: string;
  originalOrder: string;
  supplier: string;
  reason: string;
  itemCount: number;
  amount: string;
  status: string;
  createTime: string;
};

const mockSuppliers: Supplier[] = [
  { id: 'S001', code: 'SUP-SZ-001', name: '深圳电子科技有限公司', contact: '张伟', phone: '138-0001-0001', categories: ['电子产品', '蓝牙设备', '充电器'], paymentTerm: '月结30天', quoteExpiry: '2026-10-13', status: '合作中' },
  { id: 'S002', code: 'SUP-YW-002', name: '义乌日用品有限公司', contact: '李芳', phone: '139-0002-0002', categories: ['日用品', '收纳用品', '厨房用品'], paymentTerm: '月结15天', quoteExpiry: '2026-09-30', status: '合作中' },
  { id: 'S003', code: 'SUP-GZ-003', name: '广州箱包有限公司', contact: '王强', phone: '137-0003-0003', categories: ['箱包', '旅行用品', '背包'], paymentTerm: '货到付款', quoteExpiry: '2026-11-01', status: '待审核' },
];

const mockSuggestions: PurchaseSuggestion[] = [
  { id: 'PS001', sku: 'SKU-BT-001', productName: '蓝牙耳机 TWS Pro Max', warehouse: '深圳仓', currentStock: 45, safetyStock: 100, gap: 55, suggestedQty: 200, suggestedSupplier: '深圳电子科技' },
  { id: 'PS002', sku: 'SKU-CS-002', productName: '硅胶手机壳 iPhone15系列', warehouse: '深圳仓', currentStock: 120, safetyStock: 200, gap: 80, suggestedQty: 500, suggestedSupplier: '义乌日用品' },
  { id: 'PS003', sku: 'SKU-CB-003', productName: '便携式充电宝 20000mAh', warehouse: '义乌仓', currentStock: 30, safetyStock: 80, gap: 50, suggestedQty: 300, suggestedSupplier: '深圳电子科技' },
  { id: 'PS004', sku: 'SKU-BG-004', productName: '运动腰包 防水跑步包', warehouse: '深圳仓', currentStock: 0, safetyStock: 50, gap: 50, suggestedQty: 150, suggestedSupplier: '广州箱包' },
  { id: 'PS005', sku: 'SKU-LS-005', productName: 'LED台灯 护眼学习灯', warehouse: '义乌仓', currentStock: 15, safetyStock: 60, gap: 45, suggestedQty: 200, suggestedSupplier: '深圳电子科技' },
];

const mockOrders: PurchaseOrder[] = [
  { id: 'PO-20260910001', supplier: '深圳电子科技有限公司', warehouse: '深圳仓', totalAmount: '¥28,500.00', itemCount: 3, status: '已审核', createTime: '2026-09-10 09:30', expectArrival: '2026-09-20' },
  { id: 'PO-20260908002', supplier: '义乌日用品有限公司', warehouse: '义乌仓', totalAmount: '¥12,800.00', itemCount: 2, status: '发货中', createTime: '2026-09-08 14:20', expectArrival: '2026-09-18' },
  { id: 'PO-20260905003', supplier: '深圳电子科技有限公司', warehouse: '深圳仓', totalAmount: '¥45,200.00', itemCount: 5, status: '部分入库', createTime: '2026-09-05 10:00', expectArrival: '2026-09-15' },
  { id: 'PO-20260901004', supplier: '广州箱包有限公司', warehouse: '深圳仓', totalAmount: '¥8,600.00', itemCount: 2, status: '全部入库', createTime: '2026-09-01 11:15', expectArrival: '2026-09-12' },
  { id: 'PO-20260828005', supplier: '义乌日用品有限公司', warehouse: '义乌仓', totalAmount: '¥5,400.00', itemCount: 1, status: '已关闭', createTime: '2026-08-28 16:45', expectArrival: '2026-09-08' },
  { id: 'PO-20260912006', supplier: '深圳电子科技有限公司', warehouse: '深圳仓', totalAmount: '¥15,300.00', itemCount: 2, status: '待审核', createTime: '2026-09-12 08:20', expectArrival: '2026-09-22' },
];

const mockReturns: PurchaseReturn[] = [
  { id: 'PR-20260910001', originalOrder: 'PO-20260905003', supplier: '深圳电子科技有限公司', reason: '质量问题-蓝牙连接不稳定', itemCount: 10, amount: '¥3,200.00', status: '待审核', createTime: '2026-09-10 15:30' },
  { id: 'PR-20260908002', originalOrder: 'PO-20260901004', supplier: '广州箱包有限公司', reason: '数量差异-实际少发5件', itemCount: 5, amount: '¥1,500.00', status: '退货中', createTime: '2026-09-08 10:20' },
  { id: 'PR-20260905003', originalOrder: 'PO-20260828005', supplier: '义乌日用品有限公司', reason: '包装破损', itemCount: 3, amount: '¥800.00', status: '已完成', createTime: '2026-09-05 09:00' },
];

const orderStatusColors: Record<string, string> = {
  '待审核': 'bg-yellow-100 text-yellow-700',
  '已审核': 'bg-blue-100 text-blue-700',
  '发货中': 'bg-indigo-100 text-indigo-700',
  '部分入库': 'bg-orange-100 text-orange-700',
  '全部入库': 'bg-green-100 text-green-700',
  '已关闭': 'bg-gray-100 text-gray-500',
};

const returnStatusColors: Record<string, string> = {
  '待审核': 'bg-yellow-100 text-yellow-700',
  '退货中': 'bg-blue-100 text-blue-700',
  '已完成': 'bg-green-100 text-green-700',
  '已拒绝': 'bg-red-100 text-red-700',
};

const supplierStatusColors: Record<string, string> = {
  '合作中': 'bg-green-100 text-green-700',
  '待审核': 'bg-yellow-100 text-yellow-700',
  '已终止': 'bg-gray-100 text-gray-500',
};

export function SupplierListPage({ onNavigate }: { onNavigate: (page: string) => void }) {
  return (
    <div className="space-y-4">
      <div data-annotation-id="quote-expire" className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">供应商列表</h2>
        <button onClick={() => onNavigate('supplier-add')} className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700">
          <Plus size={14} /> 新增供应商
        </button>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="grid grid-cols-4 gap-3">
          <input type="text" placeholder="供应商名称/编码" className="px-3 py-1.5 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500" />
          <select className="px-3 py-1.5 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-600">
            <option value="">全部状态</option>
            <option>合作中</option>
            <option>待审核</option>
            <option>已终止</option>
          </select>
          <select className="px-3 py-1.5 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-600">
            <option value="">全部品类</option>
            <option>电子产品</option>
            <option>日用品</option>
            <option>箱包</option>
          </select>
          <input type="date" className="px-3 py-1.5 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500" />
        </div>
        <div className="flex gap-2 mt-3">
          <button className="px-4 py-1.5 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 flex items-center gap-1">
            <Search size={14} /> 查询
          </button>
          <button className="px-3 py-1.5 border border-gray-200 text-sm rounded-md hover:bg-gray-50 text-gray-600">重置</button>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 text-left">
              <th className="px-4 py-3 font-medium text-gray-600">编码</th>
              <th className="px-4 py-3 font-medium text-gray-600">名称</th>
              <th className="px-4 py-3 font-medium text-gray-600">联系人</th>
              <th className="px-4 py-3 font-medium text-gray-600">电话</th>
              <th className="px-4 py-3 font-medium text-gray-600">供货品类</th>
              <th className="px-4 py-3 font-medium text-gray-600">账期</th>
              <th className="px-4 py-3 font-medium text-gray-600">报价有效期</th>
              <th className="px-4 py-3 font-medium text-gray-600">状态</th>
              <th className="px-4 py-3 font-medium text-gray-600">操作</th>
            </tr>
          </thead>
          <tbody>
            {mockSuppliers.map((s) => (
              <tr key={s.id} className="border-b border-gray-50 hover:bg-gray-50">
                <td className="px-4 py-3 font-mono text-xs text-gray-900">{s.code}</td>
                <td className="px-4 py-3 text-gray-900">{s.name}</td>
                <td className="px-4 py-3 text-gray-700">{s.contact}</td>
                <td className="px-4 py-3 text-gray-500 text-xs">{s.phone}</td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-1">
                    {s.categories.map((c) => (
                      <span key={c} className="px-1.5 py-0.5 text-[10px] rounded bg-gray-100 text-gray-600">{c}</span>
                    ))}
                  </div>
                </td>
                <td className="px-4 py-3 text-gray-700 text-xs">{s.paymentTerm}</td>
                <td className="px-4 py-3 text-gray-500 text-xs">{s.quoteExpiry}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-0.5 text-xs rounded ${supplierStatusColors[s.status] || 'bg-gray-100 text-gray-600'}`}>{s.status}</span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1">
                    <button className="p-1 rounded hover:bg-gray-100 text-gray-400 hover:text-blue-600" title="查看"><Eye size={14} /></button>
                    <button className="p-1 rounded hover:bg-gray-100 text-gray-400 hover:text-blue-600" title="编辑"><Edit3 size={14} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100">
          <span className="text-sm text-gray-500">共 {mockSuppliers.length} 条</span>
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

export function SupplierAddPage({ onNavigate }: { onNavigate: (page: string) => void }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <button onClick={() => onNavigate('supplier-list')} className="p-1 rounded hover:bg-gray-100">
          <ArrowLeft size={18} className="text-gray-600" />
        </button>
        <h2 className="text-lg font-semibold text-gray-900">新增供应商</h2>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2 space-y-4">
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h3 className="text-sm font-medium text-gray-900 mb-3 flex items-center gap-1.5">
              <Building2 size={16} className="text-gray-400" /> 基本信息
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm text-gray-700 mb-1">供应商名称 <span className="text-red-500">*</span></label>
                <input type="text" placeholder="请输入供应商名称" className="w-full px-3 py-1.5 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">供应商编码</label>
                <input type="text" placeholder="系统自动生成" disabled className="w-full px-3 py-1.5 text-sm border border-gray-200 rounded-md bg-gray-50 text-gray-400" />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">统一社会信用代码</label>
                <input type="text" placeholder="请输入" className="w-full px-3 py-1.5 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">供应商类型</label>
                <select className="w-full px-3 py-1.5 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-600">
                  <option> manufacturers</option>
                  <option>贸易商</option>
                  <option>代理商</option>
                </select>
              </div>
              <div className="col-span-2">
                <label className="block text-sm text-gray-700 mb-1">公司地址</label>
                <input type="text" placeholder="请输入公司地址" className="w-full px-3 py-1.5 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h3 className="text-sm font-medium text-gray-900 mb-3 flex items-center gap-1.5">
              <Phone size={16} className="text-gray-400" /> 联系信息
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm text-gray-700 mb-1">联系人 <span className="text-red-500">*</span></label>
                <input type="text" placeholder="请输入联系人" className="w-full px-3 py-1.5 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">联系电话 <span className="text-red-500">*</span></label>
                <input type="text" placeholder="请输入联系电话" className="w-full px-3 py-1.5 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">邮箱</label>
                <input type="email" placeholder="请输入邮箱" className="w-full px-3 py-1.5 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">传真</label>
                <input type="text" placeholder="请输入传真号码" className="w-full px-3 py-1.5 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h3 className="text-sm font-medium text-gray-900 mb-3 flex items-center gap-1.5">
              <Tag size={16} className="text-gray-400" /> 供货品类
            </h3>
            <div className="space-y-2">
              {['电子产品', '日用品', '箱包', '服装', '家居用品'].map((cat) => (
                <label key={cat} className="flex items-center gap-2 text-sm text-gray-700">
                  <input type="checkbox" className="rounded" /> {cat}
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h3 className="text-sm font-medium text-gray-900 mb-3 flex items-center gap-1.5">
              <CreditCard size={16} className="text-gray-400" /> 付款条件
            </h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm text-gray-700 mb-1">账期</label>
                <select className="w-full px-3 py-1.5 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-600">
                  <option>货到付款</option>
                  <option>月结15天</option>
                  <option>月结30天</option>
                  <option>月结60天</option>
                  <option>预付款</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">付款方式</label>
                <select className="w-full px-3 py-1.5 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-600">
                  <option>银行转账</option>
                  <option>支付宝</option>
                  <option>微信支付</option>
                  <option>现金</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">报价有效期</label>
                <input type="date" className="w-full px-3 py-1.5 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h3 className="text-sm font-medium text-gray-900 mb-3">其他信息</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm text-gray-700 mb-1">开户银行</label>
                <input type="text" placeholder="请输入开户银行" className="w-full px-3 py-1.5 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">银行账号</label>
                <input type="text" placeholder="请输入银行账号" className="w-full px-3 py-1.5 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">备注</label>
                <textarea rows={3} placeholder="请输入备注信息" className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500" />
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <button className="flex-1 px-3 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 flex items-center justify-center gap-1">
              <Save size={14} /> 保存
            </button>
            <button onClick={() => onNavigate('supplier-list')} className="px-3 py-2 border border-gray-200 text-sm rounded-md hover:bg-gray-50 text-gray-600">取消</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function PurchaseSuggestListPage({ onNavigate }: { onNavigate: (page: string) => void }) {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const toggleRow = (id: string) => {
    setSelectedRows((prev) => prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]);
  };

  const toggleAll = () => {
    setSelectedRows((prev) => prev.length === mockSuggestions.length ? [] : mockSuggestions.map((s) => s.id));
  };

  return (
    <div className="space-y-4">
      <div data-annotation-id="suggest-auto" className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">采购建议</h2>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 text-sm rounded-md hover:bg-gray-50 text-gray-600">
            <RefreshCw size={14} /> 刷新建议
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 text-sm rounded-md hover:bg-gray-50 text-gray-600">
            <Download size={14} /> 导出
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="grid grid-cols-4 gap-3">
          <input type="text" placeholder="SKU/商品名称" className="px-3 py-1.5 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500" />
          <select className="px-3 py-1.5 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-600">
            <option value="">全部仓库</option>
            <option>深圳仓</option>
            <option>义乌仓</option>
          </select>
          <select className="px-3 py-1.5 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-600">
            <option value="">全部供应商</option>
            <option>深圳电子科技</option>
            <option>义乌日用品</option>
            <option>广州箱包</option>
          </select>
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
          <button onClick={() => onNavigate('order-add')} className="px-3 py-1 bg-white border border-gray-200 text-sm rounded hover:bg-gray-50">批量转采购单</button>
        </div>
      )}

      <div className="bg-white rounded-lg border border-gray-200">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 text-left">
              <th className="px-4 py-3 w-10">
                <input type="checkbox" checked={selectedRows.length === mockSuggestions.length} onChange={toggleAll} className="rounded" />
              </th>
              <th className="px-4 py-3 font-medium text-gray-600">SKU</th>
              <th className="px-4 py-3 font-medium text-gray-600">商品</th>
              <th className="px-4 py-3 font-medium text-gray-600">仓库</th>
              <th className="px-4 py-3 font-medium text-gray-600">当前库存</th>
              <th className="px-4 py-3 font-medium text-gray-600">安全库存</th>
              <th className="px-4 py-3 font-medium text-gray-600">缺口</th>
              <th className="px-4 py-3 font-medium text-gray-600">建议采购量</th>
              <th className="px-4 py-3 font-medium text-gray-600">建议供应商</th>
              <th className="px-4 py-3 font-medium text-gray-600">操作</th>
            </tr>
          </thead>
          <tbody>
            {mockSuggestions.map((s) => (
              <tr key={s.id} className="border-b border-gray-50 hover:bg-gray-50">
                <td className="px-4 py-3">
                  <input type="checkbox" checked={selectedRows.includes(s.id)} onChange={() => toggleRow(s.id)} className="rounded" />
                </td>
                <td className="px-4 py-3 font-mono text-xs text-gray-900">{s.sku}</td>
                <td className="px-4 py-3 text-gray-900">{s.productName}</td>
                <td className="px-4 py-3 text-gray-700">{s.warehouse}</td>
                <td className="px-4 py-3">
                  <span className={s.currentStock <= s.safetyStock / 2 ? 'text-red-600 font-medium' : 'text-gray-700'}>{s.currentStock}</span>
                </td>
                <td className="px-4 py-3 text-gray-500">{s.safetyStock}</td>
                <td className="px-4 py-3">
                  <span className="text-red-600 font-medium">-{s.gap}</span>
                </td>
                <td className="px-4 py-3 font-medium text-gray-900">{s.suggestedQty}</td>
                <td className="px-4 py-3 text-gray-700 text-xs">{s.suggestedSupplier}</td>
                <td className="px-4 py-3">
                  <button onClick={() => onNavigate('order-add')} className="text-blue-600 text-xs hover:underline">转采购单</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100">
          <span className="text-sm text-gray-500">共 {mockSuggestions.length} 条</span>
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

export function PurchaseOrderListPage({ onNavigate }: { onNavigate: (page: string) => void }) {
  const [statusFilter, setStatusFilter] = useState('');

  const filtered = statusFilter ? mockOrders.filter((o) => o.status === statusFilter) : mockOrders;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">采购订单</h2>
        <button onClick={() => onNavigate('order-add')} className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700">
          <Plus size={14} /> 新建订单
        </button>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="grid grid-cols-4 gap-3">
          <input type="text" placeholder="订单号/供应商" className="px-3 py-1.5 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500" />
          <select className="px-3 py-1.5 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-600">
            <option value="">全部仓库</option>
            <option>深圳仓</option>
            <option>义乌仓</option>
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

      <div className="flex gap-1 border-b border-gray-200">
        {['', '待审核', '已审核', '发货中', '部分入库', '全部入库', '已关闭'].map((s) => (
          <button
            key={s}
            onClick={() => setStatusFilter(s)}
            className={`px-3 py-2 text-sm border-b-2 -mb-px transition-colors ${
              statusFilter === s
                ? 'border-blue-600 text-blue-600 font-medium'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            {s || '全部'}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-lg border border-gray-200">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 text-left">
              <th className="px-4 py-3 font-medium text-gray-600">订单号</th>
              <th className="px-4 py-3 font-medium text-gray-600">供应商</th>
              <th className="px-4 py-3 font-medium text-gray-600">仓库</th>
              <th className="px-4 py-3 font-medium text-gray-600">商品数</th>
              <th className="px-4 py-3 font-medium text-gray-600">总金额</th>
              <th className="px-4 py-3 font-medium text-gray-600">状态</th>
              <th className="px-4 py-3 font-medium text-gray-600">创建时间</th>
              <th className="px-4 py-3 font-medium text-gray-600">预计到货</th>
              <th className="px-4 py-3 font-medium text-gray-600">操作</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((o) => (
              <tr key={o.id} className="border-b border-gray-50 hover:bg-gray-50">
                <td className="px-4 py-3 font-mono text-xs text-gray-900">{o.id}</td>
                <td className="px-4 py-3 text-gray-700 text-xs">{o.supplier}</td>
                <td className="px-4 py-3 text-gray-700">{o.warehouse}</td>
                <td className="px-4 py-3 text-gray-700">{o.itemCount}</td>
                <td className="px-4 py-3 font-medium text-gray-900">{o.totalAmount}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-0.5 text-xs rounded ${orderStatusColors[o.status] || 'bg-gray-100 text-gray-600'}`}>{o.status}</span>
                </td>
                <td className="px-4 py-3 text-gray-500 text-xs">{o.createTime}</td>
                <td className="px-4 py-3 text-gray-500 text-xs">{o.expectArrival}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1">
                    <button onClick={() => onNavigate('order-detail')} className="p-1 rounded hover:bg-gray-100 text-gray-400 hover:text-blue-600" title="查看"><Eye size={14} /></button>
                    {o.status === '待审核' && (
                      <button className="p-1 rounded hover:bg-gray-100 text-gray-400 hover:text-green-600" title="审核"><CheckCircle2 size={14} /></button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100">
          <span className="text-sm text-gray-500">共 {filtered.length} 条</span>
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

export function PurchaseOrderAddPage({ onNavigate }: { onNavigate: (page: string) => void }) {
  const [items, setItems] = useState([
    { sku: 'SKU-BT-001', name: '蓝牙耳机 TWS Pro Max', qty: 100, price: 85.00 },
    { sku: 'SKU-LS-005', name: 'LED台灯 护眼学习灯', qty: 50, price: 42.50 },
  ]);

  const total = items.reduce((sum, i) => sum + i.qty * i.price, 0);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <button onClick={() => onNavigate('order-list')} className="p-1 rounded hover:bg-gray-100">
          <ArrowLeft size={18} className="text-gray-600" />
        </button>
        <h2 className="text-lg font-semibold text-gray-900">新建采购订单</h2>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2 space-y-4">
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h3 className="text-sm font-medium text-gray-900 mb-3 flex items-center gap-1.5">
              <FileText size={16} className="text-gray-400" /> 订单信息
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm text-gray-700 mb-1">供应商 <span className="text-red-500">*</span></label>
                <select className="w-full px-3 py-1.5 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-600">
                  <option value="">请选择供应商</option>
                  <option>深圳电子科技有限公司</option>
                  <option>义乌日用品有限公司</option>
                  <option>广州箱包有限公司</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">收货仓库 <span className="text-red-500">*</span></label>
                <select className="w-full px-3 py-1.5 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-600">
                  <option>深圳仓</option>
                  <option>义乌仓</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">预计到货日期</label>
                <input type="date" className="w-full px-3 py-1.5 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">付款方式</label>
                <select className="w-full px-3 py-1.5 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-600">
                  <option>银行转账</option>
                  <option>月结30天</option>
                </select>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium text-gray-900 flex items-center gap-1.5">
                <Package size={16} className="text-gray-400" /> 采购明细
              </h3>
              <button className="flex items-center gap-1 px-2 py-1 text-xs text-blue-600 hover:bg-blue-50 rounded">
                <Plus size={12} /> 添加商品
              </button>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 text-left">
                  <th className="px-3 py-2 font-medium text-gray-600">SKU</th>
                  <th className="px-3 py-2 font-medium text-gray-600">商品名称</th>
                  <th className="px-3 py-2 font-medium text-gray-600">数量</th>
                  <th className="px-3 py-2 font-medium text-gray-600">单价(¥)</th>
                  <th className="px-3 py-2 font-medium text-gray-600">小计</th>
                  <th className="px-3 py-2 font-medium text-gray-600">操作</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, idx) => (
                  <tr key={idx} className="border-b border-gray-50">
                    <td className="px-3 py-2 font-mono text-xs text-gray-900">{item.sku}</td>
                    <td className="px-3 py-2 text-gray-700">{item.name}</td>
                    <td className="px-3 py-2">
                      <input type="number" value={item.qty} onChange={(e) => {
                        const newItems = [...items];
                        newItems[idx].qty = Number(e.target.value);
                        setItems(newItems);
                      }} className="w-20 px-2 py-1 text-sm border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-500" />
                    </td>
                    <td className="px-3 py-2 text-gray-700">¥{item.price.toFixed(2)}</td>
                    <td className="px-3 py-2 font-medium text-gray-900">¥{(item.qty * item.price).toFixed(2)}</td>
                    <td className="px-3 py-2">
                      <button className="text-red-400 hover:text-red-600"><Trash2 size={14} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h3 className="text-sm font-medium text-gray-900 mb-3">订单汇总</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-gray-500">商品数量：</span><span className="text-gray-900">{items.reduce((s, i) => s + i.qty, 0)} 件</span></div>
              <div className="flex justify-between"><span className="text-gray-500">商品种类：</span><span className="text-gray-900">{items.length} 种</span></div>
              <div className="flex justify-between border-t border-gray-100 pt-2"><span className="text-gray-500">运费：</span><span className="text-gray-900">¥0.00</span></div>
              <div className="flex justify-between font-medium text-base"><span className="text-gray-700">合计：</span><span className="text-blue-600">¥{total.toFixed(2)}</span></div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h3 className="text-sm font-medium text-gray-900 mb-3">备注</h3>
            <textarea rows={3} placeholder="请输入备注信息" className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500" />
          </div>

          <div className="flex gap-2">
            <button className="flex-1 px-3 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 flex items-center justify-center gap-1">
              <Save size={14} /> 提交订单
            </button>
            <button onClick={() => onNavigate('order-list')} className="px-3 py-2 border border-gray-200 text-sm rounded-md hover:bg-gray-50 text-gray-600">取消</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function PurchaseOrderDetailPage({ onNavigate }: { onNavigate: (page: string) => void }) {
  const order = mockOrders[0];
  const timeline = [
    { time: '2026-09-10 09:30', event: '订单创建', detail: '采购订单创建成功', icon: FileText, color: 'text-blue-500' },
    { time: '2026-09-10 10:00', event: '审核通过', detail: '主管审批通过', icon: CheckCircle2, color: 'text-green-500' },
    { time: '2026-09-11 08:00', event: '供应商确认', detail: '供应商已确认接单', icon: Building2, color: 'text-indigo-500' },
    { time: '2026-09-12 14:30', event: '已发货', detail: '供应商已发货，物流单号 SF1234567890', icon: Truck, color: 'text-orange-500' },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <button onClick={() => onNavigate('order-list')} className="p-1 rounded hover:bg-gray-100">
          <ArrowLeft size={18} className="text-gray-600" />
        </button>
        <h2 className="text-lg font-semibold text-gray-900">订单详情</h2>
        <span className="ml-2 font-mono text-sm text-gray-500">{order.id}</span>
        <span className={`px-2 py-0.5 text-xs rounded ${orderStatusColors[order.status]}`}>{order.status}</span>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2 space-y-4">
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h3 className="text-sm font-medium text-gray-900 mb-3 flex items-center gap-1.5">
              <FileText size={16} className="text-gray-400" /> 基本信息
            </h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div><span className="text-gray-500">订单号：</span><span className="font-mono text-gray-900">{order.id}</span></div>
              <div><span className="text-gray-500">供应商：</span><span className="text-gray-900">{order.supplier}</span></div>
              <div><span className="text-gray-500">收货仓库：</span><span className="text-gray-900">{order.warehouse}</span></div>
              <div><span className="text-gray-500">创建时间：</span><span className="text-gray-900">{order.createTime}</span></div>
              <div><span className="text-gray-500">预计到货：</span><span className="text-gray-900">{order.expectArrival}</span></div>
              <div><span className="text-gray-500">总金额：</span><span className="text-blue-600 font-medium">{order.totalAmount}</span></div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h3 className="text-sm font-medium text-gray-900 mb-3 flex items-center gap-1.5">
              <Package size={16} className="text-gray-400" /> 采购明细
            </h3>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 text-left">
                  <th className="px-3 py-2 font-medium text-gray-600">SKU</th>
                  <th className="px-3 py-2 font-medium text-gray-600">商品名称</th>
                  <th className="px-3 py-2 font-medium text-gray-600">采购数量</th>
                  <th className="px-3 py-2 font-medium text-gray-600">单价</th>
                  <th className="px-3 py-2 font-medium text-gray-600">小计</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-50">
                  <td className="px-3 py-2 font-mono text-xs">SKU-BT-001</td>
                  <td className="px-3 py-2">蓝牙耳机 TWS Pro Max</td>
                  <td className="px-3 py-2">100</td>
                  <td className="px-3 py-2">¥85.00</td>
                  <td className="px-3 py-2 font-medium">¥8,500.00</td>
                </tr>
                <tr className="border-b border-gray-50">
                  <td className="px-3 py-2 font-mono text-xs">SKU-LS-005</td>
                  <td className="px-3 py-2">LED台灯 护眼学习灯</td>
                  <td className="px-3 py-2">50</td>
                  <td className="px-3 py-2">¥42.50</td>
                  <td className="px-3 py-2 font-medium">¥2,125.00</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h3 data-annotation-id="receive-diff" className="text-sm font-medium text-gray-900 mb-3 flex items-center gap-1.5">
              <ClipboardList size={16} className="text-gray-400" /> 入库记录
            </h3>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 text-left">
                  <th className="px-3 py-2 font-medium text-gray-600">入库单号</th>
                  <th className="px-3 py-2 font-medium text-gray-600">入库时间</th>
                  <th className="px-3 py-2 font-medium text-gray-600">入库数量</th>
                  <th className="px-3 py-2 font-medium text-gray-600">操作人</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-50">
                  <td className="px-3 py-2 font-mono text-xs">RC-20260913001</td>
                  <td className="px-3 py-2 text-gray-700">2026-09-13 10:30</td>
                  <td className="px-3 py-2 text-gray-700">50 件</td>
                  <td className="px-3 py-2 text-gray-500">仓管员-刘明</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h3 className="text-sm font-medium text-gray-900 mb-3 flex items-center gap-1.5">
              <Calendar size={16} className="text-gray-400" /> 订单进度
            </h3>
            <div className="space-y-3">
              {timeline.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className={`w-7 h-7 rounded-full bg-gray-50 flex items-center justify-center flex-shrink-0 ${item.color}`}>
                        <Icon size={14} />
                      </div>
                      {idx < timeline.length - 1 && <div className="w-px h-full bg-gray-200 mt-1" />}
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
              {order.status === '待审核' && (
                <button className="w-full px-3 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700">审核通过</button>
              )}
              <button className="w-full px-3 py-2 border border-gray-200 text-sm rounded-md hover:bg-gray-50 text-gray-600">打印采购单</button>
              <button className="w-full px-3 py-2 border border-red-200 text-sm rounded-md hover:bg-red-50 text-red-600">关闭订单</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function PurchaseReturnListPage({ onNavigate }: { onNavigate: (page: string) => void }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">采购退货</h2>
        <button onClick={() => onNavigate('return-add')} className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700">
          <Plus size={14} /> 新建退货
        </button>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="grid grid-cols-4 gap-3">
          <input type="text" placeholder="退货单号/原订单号" className="px-3 py-1.5 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500" />
          <select data-annotation-id="return-approval" className="px-3 py-1.5 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-600">
            <option value="">全部状态</option>
            <option>待审核</option>
            <option>退货中</option>
            <option>已完成</option>
            <option>已拒绝</option>
          </select>
          <select className="px-3 py-1.5 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-600">
            <option value="">全部供应商</option>
            <option>深圳电子科技</option>
            <option>义乌日用品</option>
            <option>广州箱包</option>
          </select>
          <div className="flex gap-2">
            <button className="px-4 py-1.5 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 flex items-center gap-1">
              <Search size={14} /> 查询
            </button>
            <button className="px-3 py-1.5 border border-gray-200 text-sm rounded-md hover:bg-gray-50 text-gray-600">重置</button>
          </div>
        </div>
      </div>

      <div data-annotation-id="return-cost" className="bg-white rounded-lg border border-gray-200">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 text-left">
              <th className="px-4 py-3 font-medium text-gray-600">退货单号</th>
              <th className="px-4 py-3 font-medium text-gray-600">原订单号</th>
              <th className="px-4 py-3 font-medium text-gray-600">供应商</th>
              <th className="px-4 py-3 font-medium text-gray-600">退货原因</th>
              <th className="px-4 py-3 font-medium text-gray-600">商品数</th>
              <th className="px-4 py-3 font-medium text-gray-600">金额</th>
              <th className="px-4 py-3 font-medium text-gray-600">状态</th>
              <th className="px-4 py-3 font-medium text-gray-600">创建时间</th>
              <th className="px-4 py-3 font-medium text-gray-600">操作</th>
            </tr>
          </thead>
          <tbody>
            {mockReturns.map((r) => (
              <tr key={r.id} className="border-b border-gray-50 hover:bg-gray-50">
                <td className="px-4 py-3 font-mono text-xs text-gray-900">{r.id}</td>
                <td className="px-4 py-3 font-mono text-xs text-gray-600">{r.originalOrder}</td>
                <td className="px-4 py-3 text-gray-700 text-xs">{r.supplier}</td>
                <td className="px-4 py-3 text-gray-500 text-xs max-w-[160px] truncate">{r.reason}</td>
                <td className="px-4 py-3 text-gray-700">{r.itemCount}</td>
                <td className="px-4 py-3 font-medium text-gray-900">{r.amount}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-0.5 text-xs rounded ${returnStatusColors[r.status] || 'bg-gray-100 text-gray-600'}`}>{r.status}</span>
                </td>
                <td className="px-4 py-3 text-gray-500 text-xs">{r.createTime}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1">
                    <button className="p-1 rounded hover:bg-gray-100 text-gray-400 hover:text-blue-600" title="查看"><Eye size={14} /></button>
                    <button className="p-1 rounded hover:bg-gray-100 text-gray-400 hover:text-blue-600" title="打印"><Download size={14} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100">
          <span className="text-sm text-gray-500">共 {mockReturns.length} 条</span>
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

export function PurchaseReturnAddPage({ onNavigate }: { onNavigate: (page: string) => void }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <button onClick={() => onNavigate('return-list')} className="p-1 rounded hover:bg-gray-100">
          <ArrowLeft size={18} className="text-gray-600" />
        </button>
        <h2 className="text-lg font-semibold text-gray-900">新建退货单</h2>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2 space-y-4">
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h3 className="text-sm font-medium text-gray-900 mb-3 flex items-center gap-1.5">
              <RotateCcw size={16} className="text-gray-400" /> 退货信息
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm text-gray-700 mb-1">原采购订单 <span className="text-red-500">*</span></label>
                <select className="w-full px-3 py-1.5 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-600">
                  <option value="">请选择原订单</option>
                  <option>PO-20260910001 - 深圳电子科技</option>
                  <option>PO-20260908002 - 义乌日用品</option>
                  <option>PO-20260905003 - 深圳电子科技</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">退货原因 <span className="text-red-500">*</span></label>
                <select className="w-full px-3 py-1.5 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-600">
                  <option>质量问题</option>
                  <option>数量差异</option>
                  <option>包装破损</option>
                  <option>发错货</option>
                  <option>其他</option>
                </select>
              </div>
              <div className="col-span-2">
                <label className="block text-sm text-gray-700 mb-1">详细说明</label>
                <textarea rows={3} placeholder="请详细描述退货原因..." className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium text-gray-900 flex items-center gap-1.5">
                <Package size={16} className="text-gray-400" /> 退货商品
              </h3>
              <button className="flex items-center gap-1 px-2 py-1 text-xs text-blue-600 hover:bg-blue-50 rounded">
                <Plus size={12} /> 添加商品
              </button>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 text-left">
                  <th className="px-3 py-2 font-medium text-gray-600">SKU</th>
                  <th className="px-3 py-2 font-medium text-gray-600">商品名称</th>
                  <th className="px-3 py-2 font-medium text-gray-600">采购数量</th>
                  <th className="px-3 py-2 font-medium text-gray-600">退货数量</th>
                  <th className="px-3 py-2 font-medium text-gray-600">单价</th>
                  <th className="px-3 py-2 font-medium text-gray-600">退货金额</th>
                  <th className="px-3 py-2 font-medium text-gray-600">操作</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-50">
                  <td className="px-3 py-2 font-mono text-xs">SKU-BT-001</td>
                  <td className="px-3 py-2">蓝牙耳机 TWS Pro Max</td>
                  <td className="px-3 py-2 text-gray-500">100</td>
                  <td className="px-3 py-2">
                    <input type="number" defaultValue={10} className="w-16 px-2 py-1 text-sm border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-500" />
                  </td>
                  <td className="px-3 py-2">¥85.00</td>
                  <td className="px-3 py-2 font-medium text-gray-900">¥850.00</td>
                  <td className="px-3 py-2">
                    <button className="text-red-400 hover:text-red-600"><Trash2 size={14} /></button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h3 className="text-sm font-medium text-gray-900 mb-3">退货汇总</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-gray-500">退货商品数：</span><span className="text-gray-900">10 件</span></div>
              <div className="flex justify-between"><span className="text-gray-500">退货金额：</span><span className="text-gray-900">¥850.00</span></div>
              <div className="flex justify-between border-t border-gray-100 pt-2"><span className="text-gray-500">退款方式：</span><span className="text-gray-900">原路退回</span></div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h3 className="text-sm font-medium text-gray-900 mb-3">附件</h3>
            <div className="border-2 border-dashed border-gray-200 rounded-lg p-4 text-center">
              <Upload size={20} className="mx-auto text-gray-400 mb-1" />
              <p className="text-xs text-gray-500">点击或拖拽上传图片</p>
              <p className="text-[10px] text-gray-400 mt-0.5">支持 JPG, PNG, 最多3张</p>
            </div>
          </div>

          <div className="flex gap-2">
            <button className="flex-1 px-3 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 flex items-center justify-center gap-1">
              <Save size={14} /> 提交退货
            </button>
            <button onClick={() => onNavigate('return-list')} className="px-3 py-2 border border-gray-200 text-sm rounded-md hover:bg-gray-50 text-gray-600">取消</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function CreditCard({ size, className }: { size: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect width="22" height="16" x="1" y="4" rx="2" ry="2"/>
      <line x1="1" x2="23" y1="10" y2="10"/>
    </svg>
  );
}

function Upload({ size, className }: { size: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
      <polyline points="17 8 12 3 7 8"/>
      <line x1="12" x2="12" y1="3" y2="15"/>
    </svg>
  );
}
