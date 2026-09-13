/**
 * @name 跨境ERP - 系统门户
 */

import React, { useState, useCallback, useMemo } from 'react';
import {
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  Bell,
  User,
  Search,
  LayoutDashboard,
  Package,
  Link as LinkIcon,
  Upload,
  Globe,
  DollarSign,
  ShoppingCart,
  GitMerge,
  Layers,
  Warehouse,
  ClipboardList,
  ArrowRightLeft,
  Building2,
  Lightbulb,
  RotateCcw,
  Send,
  Truck,
  FileText,
  Calculator,
  Settings,
  Scale,
  Users,
  Headphones,
  BarChart3,
  Shield,
  Store,
  Key,
  type LucideIcon,
} from 'lucide-react';
import { useHashPage, defineHashPageRoute } from '../../common/useHashPage';
import PortalOverview from './pages';
import './style.css';

// ── 菜单类型 ──────────────────────────────────────────────

type MenuItem = {
  key: string;
  label: string;
  icon?: LucideIcon;
  children?: MenuItem[];
  link?: string;
};

// ── 路由：系统概览 + 跳转占位 ─────────────────────────────

const route = defineHashPageRoute(
  [{ id: 'overview', title: '系统概览' }],
  { defaultPageId: 'overview' }
);

// ── 根据 key 查找菜单项（含父级路径） ────────────────────────

function findMenuItem(
  items: MenuItem[],
  key: string,
  parentLabel = ''
): { label: string; breadcrumb: string } | null {
  for (const item of items) {
    if (item.key === key) {
      const breadcrumb = parentLabel ? `${parentLabel} / ${item.label}` : item.label;
      return { label: item.label, breadcrumb };
    }
    if (item.children) {
      const found = findMenuItem(item.children, key, item.label);
      if (found) return found;
    }
  }
  return null;
}

// ── 完整侧边栏菜单（10大模块） ─────────────────────────────

const menuItems: MenuItem[] = [
  {
    key: 'm-dashboard',
    label: '首页工作台',
    icon: LayoutDashboard,
    children: [
      { key: 'go-dashboard', label: '工作台首页', link: '/prototypes/erp-dashboard/#page=home' },
    ],
  },
  {
    key: 'm-products',
    label: '商品中心',
    icon: Package,
    children: [
      { key: 'go-product-list', label: '商品列表', link: '/prototypes/erp-products/#page=product-list' },
      { key: 'go-collect-list', label: '采集任务', link: '/prototypes/erp-products/#page=collect-list' },
      { key: 'go-publish-list', label: '刊登任务', link: '/prototypes/erp-products/#page=publish-list' },
      { key: 'go-publish-fail', label: '刊登失败记录', link: '/prototypes/erp-products/#page=publish-fail' },
      { key: 'go-platform-mapping', label: '多平台映射列表', link: '/prototypes/erp-products/#page=platform-mapping' },
      { key: 'go-pricing-list', label: '定价规则', link: '/prototypes/erp-products/#page=pricing-list' },
    ],
  },
  {
    key: 'm-orders',
    label: '订单管理',
    icon: ShoppingCart,
    children: [
      { key: 'go-order-list', label: '订单列表', link: '/prototypes/erp-orders/#page=order-list' },
      { key: 'go-exception-list', label: '异常订单', link: '/prototypes/erp-orders/#page=exception-list' },
      { key: 'go-merge-split', label: '合单拆单规则', link: '/prototypes/erp-orders/#page=merge-split-rule' },
      { key: 'go-wave-list', label: '波次拣货列表', link: '/prototypes/erp-orders/#page=wave-list' },
    ],
  },
  {
    key: 'm-inventory',
    label: '库存管理',
    icon: Warehouse,
    children: [
      { key: 'go-inventory-overview', label: '库存总览', link: '/prototypes/erp-inventory/#page=inventory-overview' },
      { key: 'go-inventory-list', label: '库存列表', link: '/prototypes/erp-inventory/#page=inventory-list' },
      { key: 'go-stocktake-list', label: '盘点列表', link: '/prototypes/erp-inventory/#page=stocktake-list' },
      { key: 'go-transfer-list', label: '调拨列表', link: '/prototypes/erp-inventory/#page=transfer-list' },
      { key: 'go-warehouse-list', label: '仓库列表', link: '/prototypes/erp-inventory/#page=warehouse-list' },
      { key: 'go-location-manage', label: '库位管理', link: '/prototypes/erp-inventory/#page=location-manage' },
    ],
  },
  {
    key: 'm-procurement',
    label: '采购管理',
    icon: Truck,
    children: [
      { key: 'go-supplier-list', label: '供应商列表', link: '/prototypes/erp-procurement/#page=supplier-list' },
      { key: 'go-suggest-list', label: '采购建议', link: '/prototypes/erp-procurement/#page=suggest-list' },
      { key: 'go-purchase-order-list', label: '采购订单', link: '/prototypes/erp-procurement/#page=order-list' },
      { key: 'go-return-list', label: '采购退货', link: '/prototypes/erp-procurement/#page=return-list' },
    ],
  },
  {
    key: 'm-logistics',
    label: '仓储与物流',
    icon: Send,
    children: [
      { key: 'go-outbound-list', label: '销售出库', link: '/prototypes/erp-logistics/#page=outbound-list' },
      { key: 'go-inbound-list', label: '采购入库', link: '/prototypes/erp-logistics/#page=inbound-list' },
      { key: 'go-logistics-provider', label: '物流商列表', link: '/prototypes/erp-logistics/#page=logistics-provider' },
      { key: 'go-customs-list', label: '报关列表', link: '/prototypes/erp-logistics/#page=customs-list' },
    ],
  },
  {
    key: 'm-finance',
    label: '财务管理',
    icon: DollarSign,
    children: [
      { key: 'go-ar-list', label: '应收列表', link: '/prototypes/erp-finance/#page=ar-list' },
      { key: 'go-ap-list', label: '应付列表', link: '/prototypes/erp-finance/#page=ap-list' },
      { key: 'go-expense-list', label: '费用列表', link: '/prototypes/erp-finance/#page=expense-list' },
      { key: 'go-exchange-rate-list', label: '汇率列表', link: '/prototypes/erp-finance/#page=exchange-rate-list' },
      { key: 'go-reconciliation-list', label: '对账列表', link: '/prototypes/erp-finance/#page=reconciliation-list' },
    ],
  },
  {
    key: 'm-aftersales',
    label: '客户与售后',
    icon: Users,
    children: [
      { key: 'go-customer-list', label: '客户列表', link: '/prototypes/erp-aftersales/#page=customer-list' },
      { key: 'go-aftersale-list', label: '售后工单', link: '/prototypes/erp-aftersales/#page=aftersale-list' },
    ],
  },
  {
    key: 'm-reports',
    label: '数据看板',
    icon: BarChart3,
    children: [
      { key: 'go-report-overview', label: '经营概览', link: '/prototypes/erp-reports/#page=overview' },
      { key: 'go-report-sales', label: '销售报表', link: '/prototypes/erp-reports/#page=sales' },
      { key: 'go-report-inventory', label: '库存报表', link: '/prototypes/erp-reports/#page=inventory' },
      { key: 'go-report-logistics', label: '物流报表', link: '/prototypes/erp-reports/#page=logistics' },
    ],
  },
  {
    key: 'm-system',
    label: '系统管理',
    icon: Settings,
    children: [
      { key: 'go-user-list', label: '用户列表', link: '/prototypes/erp-system/#page=user-list' },
      { key: 'go-role-manage', label: '角色管理', link: '/prototypes/erp-system/#page=role-manage' },
      { key: 'go-shop-auth-list', label: '店铺授权列表', link: '/prototypes/erp-system/#page=shop-auth-list' },
      { key: 'go-platform-mapping-list', label: '平台映射列表', link: '/prototypes/erp-system/#page=platform-mapping-list' },
      { key: 'go-approval-flow-list', label: '审批流程列表', link: '/prototypes/erp-system/#page=approval-flow-list' },
      { key: 'go-message-center', label: '消息中心', link: '/prototypes/erp-system/#page=message-center' },
      { key: 'go-audit-log', label: '操作日志', link: '/prototypes/erp-system/#page=audit-log' },
    ],
  },
];

// ── 侧边栏组件 ──────────────────────────────────────────

function SideMenu({
  items,
  collapsed,
  onToggle,
  openKeys,
  selectedKey,
  onSelect,
  onNavigateExternal,
  level = 0,
}: {
  items: MenuItem[];
  collapsed: boolean;
  onToggle: (key: string) => void;
  openKeys: string[];
  selectedKey: string;
  onSelect: (key: string) => void;
  onNavigateExternal: (link: string) => void;
  level?: number;
}) {
  return (
    <ul className={level === 0 ? 'py-1' : 'pl-3'}>
      {items.map((item) => {
        const hasChildren = item.children && item.children.length > 0;
        const isOpen = openKeys.includes(item.key);
        const isLeaf = !hasChildren;
        const isSelected = item.key === selectedKey;
        const Icon = item.icon;

        if (isLeaf) {
          return (
            <li key={item.key}>
              <button
                onClick={() => {
                  onSelect(item.key);
                  if (item.link) onNavigateExternal(item.link);
                }}
                className={`w-full text-left px-3 py-1.5 rounded-md text-sm transition-colors ${
                  isSelected
                    ? 'bg-blue-50 text-blue-700 font-medium'
                    : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
                }`}
                title={collapsed ? item.label : undefined}
              >
                {!collapsed && item.label}
              </button>
            </li>
          );
        }

        return (
          <li key={item.key}>
            <button
              onClick={() => onToggle(item.key)}
              className="w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors font-medium"
              title={collapsed ? item.label : undefined}
            >
              {Icon && <Icon size={18} className="flex-shrink-0" />}
              {!collapsed && (
                <>
                  <span className="flex-1 text-left truncate">{item.label}</span>
                  {isOpen ? <ChevronDown size={14} className="text-gray-400" /> : <ChevronRight size={14} className="text-gray-400" />}
                </>
              )}
            </button>
            {!collapsed && isOpen && item.children && (
              <SideMenu
                items={item.children}
                collapsed={collapsed}
                onToggle={onToggle}
                openKeys={openKeys}
                selectedKey={selectedKey}
                onSelect={onSelect}
                onNavigateExternal={onNavigateExternal}
                level={level + 1}
              />
            )}
          </li>
        );
      })}
    </ul>
  );
}

// ── 主应用 ──────────────────────────────────────────────

export default function ErpPortal() {
  const { page, setPage } = useHashPage(route);
  const [collapsed, setCollapsed] = useState(false);
  const [openKeys, setOpenKeys] = useState<string[]>(['m-dashboard']);
  const [activeIframeUrl, setActiveIframeUrl] = useState<string | null>(null);

  const activeMenuInfo = useMemo(
    () => (activeIframeUrl && page ? findMenuItem(menuItems, page) : null),
    [activeIframeUrl, page]
  );

  const handleToggle = useCallback((key: string) => {
    setOpenKeys((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  }, []);

  const handleNavigateExternal = useCallback((link: string) => {
    setActiveIframeUrl(link);
  }, []);

  const handleBackToOverview = useCallback(() => {
    setActiveIframeUrl(null);
    setPage('overview');
  }, [setPage]);

  const sidebarWidth = collapsed ? 64 : 240;

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <aside
        className="flex flex-col bg-white border-r border-gray-200 transition-all duration-200 flex-shrink-0"
        style={{ width: sidebarWidth }}
      >
        {/* Logo */}
        <div className="flex items-center h-14 px-4 border-b border-gray-100 flex-shrink-0">
          {!collapsed && (
            <span className="text-sm font-semibold text-gray-900 truncate">跨境ERP系统</span>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="ml-auto p-1.5 rounded-md hover:bg-gray-100 text-gray-400 hover:text-gray-600 flex-shrink-0"
          >
            {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
        </div>

        {/* Menu */}
        <nav className="flex-1 overflow-y-auto px-2">
          <SideMenu
            items={menuItems}
            collapsed={collapsed}
            onToggle={handleToggle}
            openKeys={openKeys}
            selectedKey={page}
            onSelect={setPage}
            onNavigateExternal={handleNavigateExternal}
          />
        </nav>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top bar */}
        <header className="h-14 bg-white border-b border-gray-200 flex items-center px-4 gap-4 flex-shrink-0">
          <div className="flex-1 flex items-center gap-2">
            <div className="relative max-w-xs">
              <Search size={16} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="搜索功能..."
                className="pl-8 pr-3 py-1.5 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 w-64"
              />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative p-1.5 rounded-md hover:bg-gray-100 text-gray-500">
              <Bell size={18} />
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center font-medium">
                5
              </span>
            </button>
            <div className="w-px h-6 bg-gray-200" />
            <button className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-gray-50">
              <div className="w-7 h-7 rounded-full bg-blue-500 flex items-center justify-center">
                <User size={14} className="text-white" />
              </div>
              <span className="text-sm text-gray-700">管理员</span>
            </button>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-hidden">
          {activeIframeUrl ? (
            <div className="h-full flex flex-col">
              <div className="h-9 bg-gray-50 border-b border-gray-200 flex items-center px-4 gap-2 flex-shrink-0">
                <button
                  onClick={handleBackToOverview}
                  className="text-xs text-blue-600 hover:underline"
                >
                  系统概览
                </button>
                <ChevronRight size={12} className="text-gray-400" />
                <span className="text-xs text-gray-700 truncate">
                  {activeMenuInfo?.breadcrumb ?? ''}
                </span>
              </div>
              <iframe
                src={activeIframeUrl}
                className="flex-1 w-full border-0"
                title={activeMenuInfo?.label ?? ''}
              />
            </div>
          ) : (
            <div className="h-full overflow-auto p-4">
              <PortalOverview />
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
