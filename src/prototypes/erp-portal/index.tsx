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
  Lock,
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
import LoginPage from './pages/login';
import './style.css';

// ── 菜单类型 ──────────────────────────────────────────────

type MenuItem = {
  key: string;
  label: string;
  icon?: LucideIcon;
  children?: MenuItem[];
  link?: string;
};

// ── 路由 ──────────────────────────────────────────────────

const route = defineHashPageRoute(
  [{ id: 'login', title: '登录' }, { id: 'go-dashboard', title: '工作台首页' }],
  { defaultPageId: 'login' }
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
      { key: 'go-dashboard', label: '工作台首页', link: '../erp-dashboard/#page=home' },
    ],
  },
  {
    key: 'm-products',
    label: '商品中心',
    icon: Package,
    children: [
      { key: 'go-product-list', label: '商品列表', link: '../erp-products/#page=product-list' },
      { key: 'go-collect-list', label: '采集任务', link: '../erp-products/#page=collect-list' },
      { key: 'go-publish-list', label: '刊登任务', link: '../erp-products/#page=publish-list' },
      { key: 'go-publish-fail', label: '刊登失败记录', link: '../erp-products/#page=publish-fail' },
      { key: 'go-platform-mapping', label: '多平台映射列表', link: '../erp-products/#page=platform-mapping' },
      { key: 'go-pricing-list', label: '定价规则', link: '../erp-products/#page=pricing-list' },
    ],
  },
  {
    key: 'm-orders',
    label: '订单管理',
    icon: ShoppingCart,
    children: [
      { key: 'go-order-list', label: '订单列表', link: '../erp-orders/#page=order-list' },
      { key: 'go-exception-list', label: '异常订单', link: '../erp-orders/#page=exception-list' },
      { key: 'go-merge-split', label: '合单拆单规则', link: '../erp-orders/#page=merge-split-rule' },
      { key: 'go-wave-list', label: '波次拣货列表', link: '../erp-orders/#page=wave-list' },
    ],
  },
  {
    key: 'm-inventory',
    label: '库存管理',
    icon: Warehouse,
    children: [
      { key: 'go-inventory-overview', label: '库存总览', link: '../erp-inventory/#page=inventory-overview' },
      { key: 'go-inventory-list', label: '库存列表', link: '../erp-inventory/#page=inventory-list' },
      { key: 'go-stocktake-list', label: '盘点列表', link: '../erp-inventory/#page=stocktake-list' },
      { key: 'go-transfer-list', label: '调拨列表', link: '../erp-inventory/#page=transfer-list' },
      { key: 'go-warehouse-list', label: '仓库列表', link: '../erp-inventory/#page=warehouse-list' },
      { key: 'go-location-manage', label: '库位管理', link: '../erp-inventory/#page=location-manage' },
    ],
  },
  {
    key: 'm-procurement',
    label: '采购管理',
    icon: Truck,
    children: [
      { key: 'go-supplier-list', label: '供应商列表', link: '../erp-procurement/#page=supplier-list' },
      { key: 'go-suggest-list', label: '采购建议', link: '../erp-procurement/#page=suggest-list' },
      { key: 'go-purchase-order-list', label: '采购订单', link: '../erp-procurement/#page=order-list' },
      { key: 'go-return-list', label: '采购退货', link: '../erp-procurement/#page=return-list' },
    ],
  },
  {
    key: 'm-logistics',
    label: '仓储与物流',
    icon: Send,
    children: [
      { key: 'go-outbound-list', label: '销售出库', link: '../erp-logistics/#page=outbound-list' },
      { key: 'go-inbound-list', label: '采购入库', link: '../erp-logistics/#page=inbound-list' },
      { key: 'go-logistics-provider', label: '物流商列表', link: '../erp-logistics/#page=logistics-provider' },
      { key: 'go-customs-list', label: '报关列表', link: '../erp-logistics/#page=customs-list' },
    ],
  },
  {
    key: 'm-finance',
    label: '财务管理',
    icon: DollarSign,
    children: [
      { key: 'go-ar-list', label: '应收列表', link: '../erp-finance/#page=ar-list' },
      { key: 'go-ap-list', label: '应付列表', link: '../erp-finance/#page=ap-list' },
      { key: 'go-expense-list', label: '费用列表', link: '../erp-finance/#page=expense-list' },
      { key: 'go-exchange-rate-list', label: '汇率列表', link: '../erp-finance/#page=exchange-rate-list' },
      { key: 'go-reconciliation-list', label: '对账列表', link: '../erp-finance/#page=reconciliation-list' },
    ],
  },
  {
    key: 'm-aftersales',
    label: '客户与售后',
    icon: Users,
    children: [
      { key: 'go-customer-list', label: '客户列表', link: '../erp-aftersales/#page=customer-list' },
      { key: 'go-aftersale-list', label: '售后工单', link: '../erp-aftersales/#page=aftersale-list' },
    ],
  },
  {
    key: 'm-reports',
    label: '数据看板',
    icon: BarChart3,
    children: [
      { key: 'go-report-overview', label: '经营概览', link: '../erp-reports/#page=overview' },
      { key: 'go-report-sales', label: '销售报表', link: '../erp-reports/#page=sales' },
      { key: 'go-report-inventory', label: '库存报表', link: '../erp-reports/#page=inventory' },
      { key: 'go-report-logistics', label: '物流报表', link: '../erp-reports/#page=logistics' },
    ],
  },
  {
    key: 'm-system',
    label: '系统管理',
    icon: Settings,
    children: [
      { key: 'go-user-list', label: '用户列表', link: '../erp-system/#page=user-list' },
      { key: 'go-role-manage', label: '角色管理', link: '../erp-system/#page=role-manage' },
      { key: 'go-shop-auth-list', label: '店铺授权列表', link: '../erp-system/#page=shop-auth-list' },
      { key: 'go-platform-mapping-list', label: '平台映射列表', link: '../erp-system/#page=platform-mapping-list' },
      { key: 'go-approval-flow-list', label: '审批流程列表', link: '../erp-system/#page=approval-flow-list' },
      { key: 'go-message-center', label: '消息中心', link: '../erp-system/#page=message-center' },
      { key: 'go-audit-log', label: '操作日志', link: '../erp-system/#page=audit-log' },
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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [openKeys, setOpenKeys] = useState<string[]>(['m-dashboard']);
  const [activeIframeUrl, setActiveIframeUrl] = useState<string | null>(
    '../erp-dashboard/#page=home'
  );
  const [showAvatarMenu, setShowAvatarMenu] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [passwordStep, setPasswordStep] = useState(1);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleLogin = useCallback(() => {
    setIsLoggedIn(true);
    setPage('go-dashboard');
  }, [setPage]);

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

  const handleLogout = useCallback(() => {
    setShowLogoutConfirm(false);
    setIsLoggedIn(false);
    setPage('login');
  }, [setPage]);

  const handleChangePassword = useCallback(() => {
    setShowChangePassword(true);
    setShowAvatarMenu(false);
    setPasswordStep(1);
    setOldPassword('');
    setNewPassword('');
    setConfirmPassword('');
  }, []);

  const handlePasswordNext = useCallback(() => {
    setPasswordStep(2);
  }, []);

  const handlePasswordSubmit = useCallback(() => {
    setShowChangePassword(false);
    setPasswordStep(1);
  }, []);

  if (!isLoggedIn || page === 'login') {
    return <LoginPage onLogin={handleLogin} />;
  }

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
            <div className="relative">
              <button
                className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-gray-50"
                onMouseEnter={() => setShowAvatarMenu(true)}
                onMouseLeave={() => setShowAvatarMenu(false)}
              >
                <div className="w-7 h-7 rounded-full bg-blue-500 flex items-center justify-center">
                  <User size={14} className="text-white" />
                </div>
                <span className="text-sm text-gray-700">管理员</span>
              </button>
              {showAvatarMenu && (
                <div
                  className="absolute right-0 top-full mt-1 w-40 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-50"
                  onMouseEnter={() => setShowAvatarMenu(true)}
                  onMouseLeave={() => setShowAvatarMenu(false)}
                >
                  <button
                    onClick={handleChangePassword}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    修改密码
                  </button>
                  <button
                    onClick={() => { setShowLogoutConfirm(true); setShowAvatarMenu(false); }}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    退出登录
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-hidden">
          <div className="h-full flex flex-col">
            <div className="h-9 bg-gray-50 border-b border-gray-200 flex items-center px-4 gap-2 flex-shrink-0">
              <span className="text-xs text-gray-700 truncate">
                {activeMenuInfo?.breadcrumb ?? '工作台首页'}
              </span>
            </div>
            {activeIframeUrl && (
              <iframe
                src={activeIframeUrl}
                className="flex-1 w-full border-0"
                title={activeMenuInfo?.label ?? ''}
              />
            )}
          </div>
        </main>
      </div>

      {/* 修改密码弹窗 */}
      {showChangePassword && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md mx-4">
            <div className="px-6 py-4 border-b border-gray-100">
              <h3 className="text-base font-semibold text-gray-900">修改密码</h3>
            </div>
            {/* 步骤条 */}
            <div className="px-6 pt-5">
              <div className="flex items-center gap-3">
                <div className={`flex items-center justify-center w-7 h-7 rounded-full text-xs font-medium ${passwordStep >= 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-500'}`}>1</div>
                <span className={`text-sm ${passwordStep >= 1 ? 'text-blue-600 font-medium' : 'text-gray-500'}`}>验证旧密码</span>
                <div className={`flex-1 h-px ${passwordStep >= 2 ? 'bg-blue-500' : 'bg-gray-200'}`} />
                <div className={`flex items-center justify-center w-7 h-7 rounded-full text-xs font-medium ${passwordStep >= 2 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-500'}`}>2</div>
                <span className={`text-sm ${passwordStep >= 2 ? 'text-blue-600 font-medium' : 'text-gray-500'}`}>设置新密码</span>
              </div>
            </div>
            {/* 内容 */}
            <div className="px-6 py-5">
              {passwordStep === 1 ? (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">旧密码</label>
                  <input
                    type="password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    placeholder="请输入旧密码"
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">新密码</label>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="请输入新密码"
                      className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">确认新密码</label>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="请再次输入新密码"
                      className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              )}
            </div>
            {/* 按钮 */}
            <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-3">
              <button
                onClick={() => setShowChangePassword(false)}
                className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                取消
              </button>
              {passwordStep === 1 ? (
                <button
                  onClick={handlePasswordNext}
                  className="px-4 py-2 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  下一步
                </button>
              ) : (
                <button
                  onClick={handlePasswordSubmit}
                  className="px-4 py-2 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  确认修改
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 退出登录确认 */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-sm mx-4">
            <div className="px-6 py-5 text-center">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
                <User size={24} className="text-red-500" />
              </div>
              <h3 className="text-base font-semibold text-gray-900 mb-1">确认退出登录？</h3>
              <p className="text-sm text-gray-500">退出后需要重新登录才能使用系统</p>
            </div>
            <div className="px-6 py-4 border-t border-gray-100 flex justify-center gap-3">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                取消
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                确认退出
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
