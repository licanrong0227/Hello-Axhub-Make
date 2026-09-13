import React, { useState } from 'react';
import {
  Search,
  Plus,
  Filter,
  Download,
  RefreshCw,
  Edit3,
  Trash2,
  Upload,
  ArrowLeft,
  ChevronRight,
  X,
  Check,
  ExternalLink,
  Package,
  Tag,
  Globe,
  Image,
} from 'lucide-react';

type Product = {
  id: string;
  spuCode: string;
  name: string;
  category: string;
  skuCount: number;
  platforms: string[];
  status: string;
  source: string;
  image: string;
  createdAt: string;
};

const mockProducts: Product[] = [
  { id: '1', spuCode: 'SPU-20260913001', name: '蓝牙耳机 TWS Pro Max', category: '电子产品 > 音频设备 > 耳机', skuCount: 3, platforms: ['亚马逊', 'TEMU'], status: '上架中', source: '1688', image: '', createdAt: '2026-09-13' },
  { id: '2', spuCode: 'SPU-20260912002', name: '硅胶手机壳 iPhone15系列', category: '手机配件 > 手机壳', skuCount: 6, platforms: ['亚马逊', 'Shopee', '速卖通'], status: '部分上架', source: '淘宝', image: '', createdAt: '2026-09-12' },
  { id: '3', spuCode: 'SPU-20260911003', name: '便携式充电宝 20000mAh', category: '电子产品 > 充电设备', skuCount: 2, platforms: ['TEMU'], status: '上架中', source: '1688', image: '', createdAt: '2026-09-11' },
  { id: '4', spuCode: 'SPU-20260910004', name: '不锈钢保温杯 500ml', category: '家居用品 > 厨房用品 > 杯具', skuCount: 4, platforms: ['亚马逊', 'eBay'], status: '上架中', source: '拼多多', image: '', createdAt: '2026-09-10' },
  { id: '5', spuCode: 'SPU-20260909005', name: 'LED台灯 护眼学习灯', category: '家居用品 > 照明 > 台灯', skuCount: 2, platforms: [], status: '已下架', source: '1688', image: '', createdAt: '2026-09-09' },
  { id: '6', spuCode: 'SPU-20260908006', name: '运动腰包 防水跑步包', category: '箱包 > 运动包', skuCount: 3, platforms: ['Shopee', 'Lazada'], status: '上架中', source: '淘宝', image: '', createdAt: '2026-09-08' },
];

const statusColors: Record<string, string> = {
  '上架中': 'bg-green-100 text-green-700',
  '已下架': 'bg-gray-100 text-gray-500',
  '部分上架': 'bg-yellow-100 text-yellow-700',
};

const platformColors: Record<string, string> = {
  '亚马逊': 'bg-orange-100 text-orange-700',
  'TEMU': 'bg-purple-100 text-purple-700',
  'Shopee': 'bg-red-100 text-red-700',
  '速卖通': 'bg-blue-100 text-blue-700',
  'Lazada': 'bg-cyan-100 text-cyan-700',
  'eBay': 'bg-yellow-100 text-yellow-700',
  'TikTok Shop': 'bg-pink-100 text-pink-700',
  'Wish': 'bg-indigo-100 text-indigo-700',
};

export function ProductListPage({ onNavigate }: { onNavigate: (page: string) => void }) {
  const [searchText, setSearchText] = useState('');
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const toggleRow = (id: string) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]
    );
  };

  const toggleAll = () => {
    setSelectedRows((prev) =>
      prev.length === mockProducts.length ? [] : mockProducts.map((p) => p.id)
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">商品列表</h2>
        <button
          onClick={() => onNavigate('product-add')}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700"
        >
          <Plus size={16} /> 新增商品
        </button>
      </div>

      {/* 查询区 */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="grid grid-cols-4 gap-3">
          <input
            type="text"
            placeholder="商品名称/SPU编码"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="px-3 py-1.5 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="SKU编码"
            className="px-3 py-1.5 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <select className="px-3 py-1.5 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-600">
            <option value="">全部类目</option>
            <option>电子产品</option>
            <option>家居用品</option>
            <option>箱包</option>
          </select>
          <select className="px-3 py-1.5 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-600">
            <option value="">全部状态</option>
            <option>上架中</option>
            <option>已下架</option>
            <option>部分上架</option>
          </select>
        </div>
        <div className="grid grid-cols-4 gap-3 mt-3">
          <select className="px-3 py-1.5 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-600">
            <option value="">全部平台</option>
            <option>亚马逊</option>
            <option>TEMU</option>
            <option>Shopee</option>
            <option>速卖通</option>
          </select>
          <select className="px-3 py-1.5 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-600">
            <option value="">全部来源</option>
            <option>1688</option>
            <option>淘宝</option>
            <option>拼多多</option>
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

      {/* 批量操作 */}
      {selectedRows.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg px-4 py-2 flex items-center gap-3">
          <span className="text-sm text-blue-700">已选 {selectedRows.length} 项</span>
          <button className="px-3 py-1 bg-white border border-gray-200 text-sm rounded hover:bg-gray-50">批量上架</button>
          <button className="px-3 py-1 bg-white border border-gray-200 text-sm rounded hover:bg-gray-50">批量下架</button>
          <button className="px-3 py-1 bg-white border border-gray-200 text-sm rounded hover:bg-gray-50">批量刊登</button>
          <button className="px-3 py-1 bg-white border border-gray-200 text-sm rounded hover:bg-gray-50">同步平台</button>
          <button className="px-3 py-1 bg-white border border-gray-200 text-sm rounded hover:bg-gray-50 text-red-600">删除</button>
        </div>
      )}

      {/* 列表 */}
      <div className="bg-white rounded-lg border border-gray-200">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 text-left">
              <th className="px-4 py-3 w-10">
                <input type="checkbox" checked={selectedRows.length === mockProducts.length} onChange={toggleAll} className="rounded" />
              </th>
              <th className="px-4 py-3 font-medium text-gray-600">商品</th>
              <th className="px-4 py-3 font-medium text-gray-600">SPU编码</th>
              <th className="px-4 py-3 font-medium text-gray-600">类目</th>
              <th className="px-4 py-3 font-medium text-gray-600">SKU数</th>
              <th className="px-4 py-3 font-medium text-gray-600">已刊登平台</th>
              <th className="px-4 py-3 font-medium text-gray-600">状态</th>
              <th className="px-4 py-3 font-medium text-gray-600">来源</th>
              <th className="px-4 py-3 font-medium text-gray-600">创建时间</th>
              <th className="px-4 py-3 font-medium text-gray-600">操作</th>
            </tr>
          </thead>
          <tbody>
            {mockProducts.map((product) => (
              <tr key={product.id} className="border-b border-gray-50 hover:bg-gray-50">
                <td className="px-4 py-3">
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(product.id)}
                    onChange={() => toggleRow(product.id)}
                    className="rounded"
                  />
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center flex-shrink-0">
                      <Image size={18} className="text-gray-400" />
                    </div>
                    <span className="font-medium text-gray-900 truncate max-w-[180px]">{product.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-gray-600 font-mono text-xs">{product.spuCode}</td>
                <td className="px-4 py-3 text-gray-500 text-xs max-w-[160px] truncate">{product.category}</td>
                <td className="px-4 py-3 text-gray-600">{product.skuCount}</td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-1">
                    {product.platforms.map((p) => (
                      <span key={p} className={`px-1.5 py-0.5 text-[10px] rounded ${platformColors[p] || 'bg-gray-100 text-gray-600'}`}>
                        {p}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-0.5 text-xs rounded ${statusColors[product.status] || 'bg-gray-100 text-gray-600'}`}>
                    {product.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-500 text-xs">{product.source}</td>
                <td className="px-4 py-3 text-gray-500 text-xs">{product.createdAt}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1">
                    <button onClick={() => onNavigate('product-add')} className="p-1 rounded hover:bg-gray-100 text-gray-400 hover:text-blue-600">
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
          <span className="text-sm text-gray-500">共 {mockProducts.length} 条</span>
          <div className="flex items-center gap-1">
            <button className="px-3 py-1 text-sm border border-gray-200 rounded hover:bg-gray-50 text-gray-400" disabled>上一页</button>
            <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded">1</button>
            <button className="px-3 py-1 text-sm border border-gray-200 rounded hover:bg-gray-50 text-gray-600">2</button>
            <button className="px-3 py-1 text-sm border border-gray-200 rounded hover:bg-gray-50 text-gray-600">下一页</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ProductAddPage({ onNavigate }: { onNavigate: (page: string) => void }) {
  const [activeTab, setActiveTab] = useState('base');
  const [activeSite, setActiveSite] = useState('US');

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <button onClick={() => onNavigate('product-list')} className="p-1 rounded hover:bg-gray-100">
          <ArrowLeft size={18} className="text-gray-600" />
        </button>
        <h2 className="text-lg font-semibold text-gray-900">新增商品</h2>
      </div>

      <div className="bg-white rounded-lg border border-gray-200">
        <div className="flex border-b border-gray-100">
          {[
            { key: 'base', label: '基础信息' },
            { key: 'sku', label: 'SKU信息' },
            { key: 'site', label: '站点内容' },
            { key: 'logistics', label: '物流属性' },
            { key: 'source', label: '上游信息' },
          ].map((tab) => (
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

        <div className="p-6">
          {activeTab === 'base' && (
            <div className="max-w-2xl space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">商品名称 <span className="text-red-500">*</span></label>
                <input type="text" placeholder="请输入商品名称" className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">商品类目 <span className="text-red-500">*</span></label>
                <div className="flex gap-2">
                  <select className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-600">
                    <option>电子产品</option>
                    <option>家居用品</option>
                    <option>箱包</option>
                  </select>
                  <select className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-600">
                    <option>音频设备</option>
                    <option>充电设备</option>
                  </select>
                  <select className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-600">
                    <option>耳机</option>
                    <option>音箱</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">商品主图 <span className="text-red-500">*</span></label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="w-20 h-20 border-2 border-dashed border-gray-200 rounded-lg flex items-center justify-center hover:border-blue-400 cursor-pointer transition-colors">
                      {i === 1 ? (
                        <span className="text-xs text-gray-400">+上传</span>
                      ) : (
                        <Plus size={16} className="text-gray-300" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">商品详情描述</label>
                <textarea rows={4} placeholder="请输入商品详情描述" className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">规格参数</label>
                <input type="text" placeholder="如：颜色、尺寸、材质等" className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500" />
              </div>
            </div>
          )}

          {activeTab === 'sku' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-gray-900">SKU列表</h3>
                <button className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700">
                  <Plus size={14} /> 新增SKU
                </button>
              </div>
              <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 py-2 text-left font-medium text-gray-600">SKU编码</th>
                    <th className="px-3 py-2 text-left font-medium text-gray-600">规格名称</th>
                    <th className="px-3 py-2 text-left font-medium text-gray-600">条码</th>
                    <th className="px-3 py-2 text-left font-medium text-gray-600">重量(g)</th>
                    <th className="px-3 py-2 text-left font-medium text-gray-600">成本价</th>
                    <th className="px-3 py-2 text-left font-medium text-gray-600">销售价</th>
                    <th className="px-3 py-2 text-left font-medium text-gray-600">安全库存</th>
                    <th className="px-3 py-2 text-left font-medium text-gray-600">操作</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-gray-100">
                    <td className="px-3 py-2 font-mono text-xs text-gray-600">SKU-A001-01</td>
                    <td className="px-3 py-2"><input defaultValue="黑色" className="px-2 py-1 border border-gray-200 rounded text-sm w-20" /></td>
                    <td className="px-3 py-2"><input defaultValue="6901234567890" className="px-2 py-1 border border-gray-200 rounded text-sm w-32" /></td>
                    <td className="px-3 py-2"><input defaultValue="250" type="number" className="px-2 py-1 border border-gray-200 rounded text-sm w-16" /></td>
                    <td className="px-3 py-2"><input defaultValue="45.00" type="number" className="px-2 py-1 border border-gray-200 rounded text-sm w-20" /></td>
                    <td className="px-3 py-2"><input defaultValue="129.00" type="number" className="px-2 py-1 border border-gray-200 rounded text-sm w-20" /></td>
                    <td className="px-3 py-2"><input defaultValue="50" type="number" className="px-2 py-1 border border-gray-200 rounded text-sm w-16" /></td>
                    <td className="px-3 py-2">
                      <button className="text-red-500 hover:text-red-700"><Trash2 size={14} /></button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'site' && (
            <div className="space-y-4">
              <div className="flex gap-2 border-b border-gray-100 pb-3">
                {['US-美国', 'UK-英国', 'DE-德国', 'JP-日本'].map((site) => (
                  <button
                    key={site}
                    onClick={() => setActiveSite(site.split('-')[0])}
                    className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                      activeSite === site.split('-')[0]
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {site}
                  </button>
                ))}
              </div>
              <div className="max-w-2xl space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">站点标题</label>
                  <input type="text" placeholder={`请输入${activeSite}站点标题`} className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">站点描述</label>
                  <textarea rows={3} placeholder={`请输入${activeSite}站点描述`} className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">站点图片</label>
                  <div className="flex gap-2">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="w-20 h-20 border-2 border-dashed border-gray-200 rounded-lg flex items-center justify-center hover:border-blue-400 cursor-pointer">
                        <Plus size={16} className="text-gray-300" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'logistics' && (
            <div className="max-w-2xl space-y-4">
              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" className="rounded" /> 是否冷冻品
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" className="rounded" /> 是否禁运品
                </label>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">默认物流渠道</label>
                <select className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-600">
                  <option value="">请选择</option>
                  <option>国际专线-标准</option>
                  <option>国际专线-加急</option>
                  <option>海外仓派送</option>
                </select>
              </div>
            </div>
          )}

          {activeTab === 'source' && (
            <div className="max-w-2xl space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">采集来源平台</label>
                <select className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-600">
                  <option>1688</option>
                  <option>淘宝</option>
                  <option>拼多多</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">平台商品ID</label>
                <input type="text" className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">平台商品链接</label>
                <input type="text" placeholder="https://..." className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500" />
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-100">
          <button onClick={() => onNavigate('product-list')} className="px-4 py-2 text-sm border border-gray-200 rounded-md hover:bg-gray-50 text-gray-600">取消</button>
          <button className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700">保存</button>
        </div>
      </div>
    </div>
  );
}

export function CollectTaskListPage({ onNavigate }: { onNavigate: (page: string) => void }) {
  const tasks = [
    { id: 'CT-001', platform: '1688', count: 5, status: '已完成', createdAt: '2026-09-13 10:00' },
    { id: 'CT-002', platform: '淘宝', count: 12, status: '采集中', createdAt: '2026-09-13 09:30' },
    { id: 'CT-003', platform: '1688', count: 3, status: '失败', createdAt: '2026-09-12 16:00' },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">采集任务</h2>
        <button onClick={() => onNavigate('collect-add')} className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700">
          <Plus size={16} /> 新建采集
        </button>
      </div>
      <div className="bg-white rounded-lg border border-gray-200">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 text-left">
              <th className="px-4 py-3 font-medium text-gray-600">任务编号</th>
              <th className="px-4 py-3 font-medium text-gray-600">采集平台</th>
              <th className="px-4 py-3 font-medium text-gray-600">商品数量</th>
              <th className="px-4 py-3 font-medium text-gray-600">状态</th>
              <th className="px-4 py-3 font-medium text-gray-600">创建时间</th>
              <th className="px-4 py-3 font-medium text-gray-600">操作</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((t) => (
              <tr key={t.id} className="border-b border-gray-50 hover:bg-gray-50">
                <td className="px-4 py-3 font-mono text-xs">{t.id}</td>
                <td className="px-4 py-3">{t.platform}</td>
                <td className="px-4 py-3">{t.count}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-0.5 text-xs rounded ${t.status === '已完成' ? 'bg-green-100 text-green-700' : t.status === '采集中' ? 'bg-blue-100 text-blue-700' : 'bg-red-100 text-red-700'}`}>
                    {t.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-500 text-xs">{t.createdAt}</td>
                <td className="px-4 py-3"><button className="text-blue-600 text-xs hover:underline">查看</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function CollectTaskAddPage({ onNavigate }: { onNavigate: (page: string) => void }) {
  const [platform, setPlatform] = useState('1688');
  const [mode, setMode] = useState('single');

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <button onClick={() => onNavigate('collect-list')} className="p-1 rounded hover:bg-gray-100">
          <ArrowLeft size={18} className="text-gray-600" />
        </button>
        <h2 className="text-lg font-semibold text-gray-900">新建采集任务</h2>
      </div>
      <div className="bg-white rounded-lg border border-gray-200 p-6 max-w-2xl space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">采集平台 <span className="text-red-500">*</span></label>
          <select value={platform} onChange={(e) => setPlatform(e.target.value)} className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500">
            <option value="1688">1688</option>
            <option value="淘宝">淘宝</option>
            <option value="拼多多">拼多多</option>
            <option value="京东">京东</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">采集方式 <span className="text-red-500">*</span></label>
          <div className="flex gap-3">
            <label className="flex items-center gap-2 text-sm">
              <input type="radio" name="mode" checked={mode === 'single'} onChange={() => setMode('single')} /> 单个采集
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input type="radio" name="mode" checked={mode === 'batch'} onChange={() => setMode('batch')} /> 批量采集
            </label>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">商品链接 <span className="text-red-500">*</span></label>
          <textarea
            rows={mode === 'single' ? 2 : 6}
            placeholder={mode === 'single' ? '请输入商品链接' : '请输入多个商品链接，每行一条（最多50条）'}
            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          {mode === 'batch' && <p className="text-xs text-gray-400 mt-1">示例：https://detail.1688.com/offer/xxx.html</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">商品分类</label>
          <select className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-600">
            <option value="">自动匹配</option>
            <option>电子产品</option>
            <option>家居用品</option>
          </select>
        </div>
        <div className="flex justify-end gap-3 pt-2">
          <button onClick={() => onNavigate('collect-list')} className="px-4 py-2 text-sm border border-gray-200 rounded-md hover:bg-gray-50">取消</button>
          <button className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700">提交任务</button>
        </div>
      </div>
    </div>
  );
}

export function PublishTaskListPage({ onNavigate }: { onNavigate: (page: string) => void }) {
  const tasks = [
    { id: 'PT-001', platform: '亚马逊', count: 3, status: '已完成', time: '2026-09-13 11:00' },
    { id: 'PT-002', platform: 'TEMU', count: 5, status: '刊登中', time: '2026-09-13 10:30' },
    { id: 'PT-003', platform: 'Shopee', count: 2, status: '失败', time: '2026-09-12 15:00' },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">刊登任务</h2>
        <button onClick={() => onNavigate('publish-add')} className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700">
          <Plus size={16} /> 新建刊登
        </button>
      </div>
      <div className="bg-white rounded-lg border border-gray-200">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 text-left">
              <th className="px-4 py-3 font-medium text-gray-600">任务编号</th>
              <th className="px-4 py-3 font-medium text-gray-600">目标平台</th>
              <th className="px-4 py-3 font-medium text-gray-600">商品数量</th>
              <th className="px-4 py-3 font-medium text-gray-600">状态</th>
              <th className="px-4 py-3 font-medium text-gray-600">创建时间</th>
              <th className="px-4 py-3 font-medium text-gray-600">操作</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((t) => (
              <tr key={t.id} className="border-b border-gray-50 hover:bg-gray-50">
                <td className="px-4 py-3 font-mono text-xs">{t.id}</td>
                <td className="px-4 py-3">
                  <span className={`px-1.5 py-0.5 text-[10px] rounded ${platformColors[t.platform] || ''}`}>{t.platform}</span>
                </td>
                <td className="px-4 py-3">{t.count}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-0.5 text-xs rounded ${t.status === '已完成' ? 'bg-green-100 text-green-700' : t.status === '刊登中' ? 'bg-blue-100 text-blue-700' : 'bg-red-100 text-red-700'}`}>
                    {t.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-500 text-xs">{t.time}</td>
                <td className="px-4 py-3"><button className="text-blue-600 text-xs hover:underline">查看</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function PublishTaskAddPage({ onNavigate }: { onNavigate: (page: string) => void }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <button onClick={() => onNavigate('publish-list')} className="p-1 rounded hover:bg-gray-100">
          <ArrowLeft size={18} className="text-gray-600" />
        </button>
        <h2 className="text-lg font-semibold text-gray-900">新建刊登任务</h2>
      </div>
      <div className="bg-white rounded-lg border border-gray-200 p-6 max-w-2xl space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">目标平台 <span className="text-red-500">*</span></label>
          <select className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500">
            <option>亚马逊</option><option>TEMU</option><option>Shopee</option><option>速卖通</option><option>Lazada</option><option>eBay</option><option>TikTok Shop</option><option>Wish</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">目标站点/店铺</label>
          <select className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500">
            <option>美国站 - Amazon.com</option><option>欧洲站 - Amazon.de</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">刊登方式</label>
          <div className="flex gap-3">
            <label className="flex items-center gap-2 text-sm"><input type="radio" name="publish" defaultChecked /> 立即刊登</label>
            <label className="flex items-center gap-2 text-sm"><input type="radio" name="publish" /> 定时刊登</label>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">内容处理</label>
          <div className="flex gap-3">
            <label className="flex items-center gap-2 text-sm"><input type="radio" name="content" defaultChecked /> 直接使用ERP内容</label>
            <label className="flex items-center gap-2 text-sm"><input type="radio" name="content" /> 自动翻译生成草稿</label>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">已选商品</label>
          <div className="border border-gray-200 rounded-md p-3 text-sm text-gray-400">暂无选中商品，请先在商品列表中选择</div>
        </div>
        <div className="flex justify-end gap-3 pt-2">
          <button onClick={() => onNavigate('publish-list')} className="px-4 py-2 text-sm border border-gray-200 rounded-md hover:bg-gray-50">取消</button>
          <button className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700">提交刊登</button>
        </div>
      </div>
    </div>
  );
}

export function PublishFailListPage({ onNavigate }: { onNavigate: (page: string) => void }) {
  const fails = [
    { id: 'PF-001', spuCode: 'SPU-20260912002', name: '硅胶手机壳', platform: 'Shopee', reason: '图片尺寸不符合平台要求', time: '2026-09-12 15:30' },
    { id: 'PF-002', spuCode: 'SPU-20260910004', name: '不锈钢保温杯', platform: '亚马逊', reason: '类目映射缺失', time: '2026-09-12 14:00' },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <button onClick={() => onNavigate('publish-list')} className="p-1 rounded hover:bg-gray-100">
          <ArrowLeft size={18} className="text-gray-600" />
        </button>
        <h2 className="text-lg font-semibold text-gray-900">刊登失败记录</h2>
      </div>
      <div className="bg-white rounded-lg border border-gray-200">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 text-left">
              <th className="px-4 py-3 font-medium text-gray-600">编号</th>
              <th className="px-4 py-3 font-medium text-gray-600">SPU编码</th>
              <th className="px-4 py-3 font-medium text-gray-600">商品名称</th>
              <th className="px-4 py-3 font-medium text-gray-600">目标平台</th>
              <th className="px-4 py-3 font-medium text-gray-600">失败原因</th>
              <th className="px-4 py-3 font-medium text-gray-600">时间</th>
              <th className="px-4 py-3 font-medium text-gray-600">操作</th>
            </tr>
          </thead>
          <tbody>
            {fails.map((f) => (
              <tr key={f.id} className="border-b border-gray-50 hover:bg-gray-50">
                <td className="px-4 py-3 font-mono text-xs">{f.id}</td>
                <td className="px-4 py-3 font-mono text-xs">{f.spuCode}</td>
                <td className="px-4 py-3">{f.name}</td>
                <td className="px-4 py-3"><span className={`px-1.5 py-0.5 text-[10px] rounded ${platformColors[f.platform] || ''}`}>{f.platform}</span></td>
                <td className="px-4 py-3 text-red-600 text-xs">{f.reason}</td>
                <td className="px-4 py-3 text-gray-500 text-xs">{f.time}</td>
                <td className="px-4 py-3"><button className="text-blue-600 text-xs hover:underline">重新刊登</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function PlatformMappingPage({ onNavigate }: { onNavigate: (page: string) => void }) {
  const mappings = [
    { id: '1', spuCode: 'SPU-20260913001', name: '蓝牙耳机', platform: '亚马逊', listingId: 'B0D1234567', status: '已映射' },
    { id: '2', spuCode: 'SPU-20260912002', name: '硅胶手机壳', platform: 'Shopee', listingId: 'SH-987654', status: '已映射' },
    { id: '3', spuCode: 'SPU-20260911003', name: '便携式充电宝', platform: 'TEMU', listingId: 'TM-456789', status: '已映射' },
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-900">平台商品映射</h2>
      <div className="bg-white rounded-lg border border-gray-200">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 text-left">
              <th className="px-4 py-3 font-medium text-gray-600">ERP商品</th>
              <th className="px-4 py-3 font-medium text-gray-600">SPU编码</th>
              <th className="px-4 py-3 font-medium text-gray-600">平台</th>
              <th className="px-4 py-3 font-medium text-gray-600">平台Listing ID</th>
              <th className="px-4 py-3 font-medium text-gray-600">状态</th>
            </tr>
          </thead>
          <tbody>
            {mappings.map((m) => (
              <tr key={m.id} className="border-b border-gray-50 hover:bg-gray-50">
                <td className="px-4 py-3">{m.name}</td>
                <td className="px-4 py-3 font-mono text-xs">{m.spuCode}</td>
                <td className="px-4 py-3"><span className={`px-1.5 py-0.5 text-[10px] rounded ${platformColors[m.platform] || ''}`}>{m.platform}</span></td>
                <td className="px-4 py-3 font-mono text-xs">{m.listingId}</td>
                <td className="px-4 py-3"><span className="px-2 py-0.5 text-xs rounded bg-green-100 text-green-700">{m.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function PricingRuleListPage({ onNavigate }: { onNavigate: (page: string) => void }) {
  const rules = [
    { id: '1', name: '亚马逊美国站定价', dimension: '站点', target: 'US站', method: '成本加成', rate: '180%', status: '启用' },
    { id: '2', name: 'TEMU平台定价', dimension: '平台', target: 'TEMU', method: '固定售价', rate: '-', status: '启用' },
    { id: '3', name: 'Shopee东南亚定价', dimension: '站点', target: '东南亚站', method: '成本加成', rate: '150%', status: '停用' },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">定价规则</h2>
        <button onClick={() => onNavigate('pricing-add')} className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700">
          <Plus size={16} /> 新增规则
        </button>
      </div>
      <div className="bg-white rounded-lg border border-gray-200">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 text-left">
              <th className="px-4 py-3 font-medium text-gray-600">规则名称</th>
              <th className="px-4 py-3 font-medium text-gray-600">适用维度</th>
              <th className="px-4 py-3 font-medium text-gray-600">适用对象</th>
              <th className="px-4 py-3 font-medium text-gray-600">定价方式</th>
              <th className="px-4 py-3 font-medium text-gray-600">参数</th>
              <th className="px-4 py-3 font-medium text-gray-600">状态</th>
              <th className="px-4 py-3 font-medium text-gray-600">操作</th>
            </tr>
          </thead>
          <tbody>
            {rules.map((r) => (
              <tr key={r.id} className="border-b border-gray-50 hover:bg-gray-50">
                <td className="px-4 py-3 font-medium">{r.name}</td>
                <td className="px-4 py-3 text-gray-500">{r.dimension}</td>
                <td className="px-4 py-3 text-gray-500">{r.target}</td>
                <td className="px-4 py-3 text-gray-500">{r.method}</td>
                <td className="px-4 py-3 text-gray-500">{r.rate}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-0.5 text-xs rounded ${r.status === '启用' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>{r.status}</span>
                </td>
                <td className="px-4 py-3">
                  <button onClick={() => onNavigate('pricing-add')} className="text-blue-600 text-xs hover:underline mr-2">编辑</button>
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

export function PricingRuleAddPage({ onNavigate }: { onNavigate: (page: string) => void }) {
  const [method, setMethod] = useState('cost');

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <button onClick={() => onNavigate('pricing-list')} className="p-1 rounded hover:bg-gray-100">
          <ArrowLeft size={18} className="text-gray-600" />
        </button>
        <h2 className="text-lg font-semibold text-gray-900">新增定价规则</h2>
      </div>
      <div className="bg-white rounded-lg border border-gray-200 p-6 max-w-2xl space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">规则名称 <span className="text-red-500">*</span></label>
          <input type="text" placeholder="请输入规则名称" className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">适用维度 <span className="text-red-500">*</span></label>
          <div className="flex gap-3">
            <label className="flex items-center gap-2 text-sm"><input type="radio" name="dim" defaultChecked /> 平台</label>
            <label className="flex items-center gap-2 text-sm"><input type="radio" name="dim" /> 站点</label>
            <label className="flex items-center gap-2 text-sm"><input type="radio" name="dim" /> 店铺</label>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">适用对象 <span className="text-red-500">*</span></label>
          <select className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500">
            <option>亚马逊</option><option>TEMU</option><option>Shopee</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">定价方式 <span className="text-red-500">*</span></label>
          <div className="flex gap-3">
            <label className="flex items-center gap-2 text-sm"><input type="radio" name="method" checked={method === 'cost'} onChange={() => setMethod('cost')} /> 成本加成法</label>
            <label className="flex items-center gap-2 text-sm"><input type="radio" name="method" checked={method === 'fixed'} onChange={() => setMethod('fixed')} /> 固定售价法</label>
          </div>
        </div>
        {method === 'cost' ? (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">加成比例(%) <span className="text-red-500">*</span></label>
              <input type="number" defaultValue={180} className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">汇率取值</label>
              <select className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500">
                <option>实时汇率</option><option>固定汇率</option>
              </select>
            </div>
          </>
        ) : (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">统一售价 <span className="text-red-500">*</span></label>
            <input type="number" placeholder="0.00" className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500" />
          </div>
        )}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">生效时间</label>
          <div className="flex gap-2">
            <input type="date" className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500" />
            <span className="text-gray-400 self-center">至</span>
            <input type="date" className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500" />
          </div>
        </div>
        <div className="flex justify-end gap-3 pt-2">
          <button onClick={() => onNavigate('pricing-list')} className="px-4 py-2 text-sm border border-gray-200 rounded-md hover:bg-gray-50">取消</button>
          <button className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700">保存</button>
        </div>
      </div>
    </div>
  );
}
