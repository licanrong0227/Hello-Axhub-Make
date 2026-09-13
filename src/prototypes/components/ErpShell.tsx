import React, { useState, useCallback, useEffect } from 'react';
import {
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  Bell,
  User,
  Search,
  type LucideIcon,
} from 'lucide-react';

export type MenuItem = {
  key: string;
  label: string;
  icon?: LucideIcon;
  children?: MenuItem[];
};

function isInIframe(): boolean {
  try {
    return window.self !== window.top;
  } catch {
    return true;
  }
}

type ErpShellProps = {
  title?: string;
  menuItems: MenuItem[];
  selectedKey: string;
  onMenuSelect: (key: string) => void;
  headerExtra?: React.ReactNode;
  children: React.ReactNode;
};

export default function ErpShell({
  title = '跨境ERP系统',
  menuItems,
  selectedKey,
  onMenuSelect,
  headerExtra,
  children,
}: ErpShellProps) {
  const [embedded] = useState(() => isInIframe());
  const [collapsed, setCollapsed] = useState(false);
  const [openKeys, setOpenKeys] = useState<string[]>(() => {
    const parent = menuItems.find((item) =>
      item.children?.some((c) => c.key === selectedKey)
    );
    return parent ? [parent.key] : [];
  });

  const handleToggle = useCallback((key: string) => {
    setOpenKeys((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  }, []);

  if (embedded) {
    return (
      <div className="h-screen bg-gray-50 overflow-auto p-4">
        {children}
      </div>
    );
  }

  const sidebarWidth = collapsed ? 64 : 220;

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <aside
        className="flex flex-col bg-white border-r border-gray-200 transition-all duration-200 flex-shrink-0"
        style={{ width: sidebarWidth }}
      >
        <div className="flex items-center h-14 px-4 border-b border-gray-100">
          {!collapsed && (
            <span className="text-sm font-semibold text-gray-900 truncate">{title}</span>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="ml-auto p-1.5 rounded-md hover:bg-gray-100 text-gray-400 hover:text-gray-600 flex-shrink-0"
          >
            {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-2 px-2">
          {menuItems.map((item) => {
            const hasChildren = item.children && item.children.length > 0;
            const isOpen = openKeys.includes(item.key);
            const isSelected = !hasChildren && item.key === selectedKey;
            const Icon = item.icon;

            if (hasChildren) {
              return (
                <div key={item.key} className="mb-1">
                  <button
                    onClick={() => handleToggle(item.key)}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-md text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                    title={collapsed ? item.label : undefined}
                  >
                    {Icon && <Icon size={18} className="flex-shrink-0" />}
                    {!collapsed && (
                      <>
                        <span className="flex-1 text-left truncate">{item.label}</span>
                        {isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                      </>
                    )}
                  </button>
                  {!collapsed && isOpen && item.children && (
                    <div className="ml-4 mt-0.5">
                      {item.children.map((child) => (
                        <button
                          key={child.key}
                          onClick={() => onMenuSelect(child.key)}
                          className={`w-full text-left px-3 py-1.5 rounded-md text-sm transition-colors ${
                            child.key === selectedKey
                              ? 'bg-blue-50 text-blue-700 font-medium'
                              : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
                          }`}
                        >
                          {child.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <button
                key={item.key}
                onClick={() => onMenuSelect(item.key)}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-md text-sm transition-colors mb-0.5 ${
                  isSelected
                    ? 'bg-blue-50 text-blue-700 font-medium'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
                title={collapsed ? item.label : undefined}
              >
                {Icon && <Icon size={18} className="flex-shrink-0" />}
                {!collapsed && <span className="truncate">{item.label}</span>}
              </button>
            );
          })}
        </nav>
      </aside>

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-14 bg-white border-b border-gray-200 flex items-center px-4 gap-4 flex-shrink-0">
          <div className="flex-1 flex items-center gap-2">
            <div className="relative max-w-xs">
              <Search size={16} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="搜索..."
                className="pl-8 pr-3 py-1.5 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 w-64"
              />
            </div>
          </div>
          {headerExtra}
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

        <main className="flex-1 overflow-auto p-4">
          {children}
        </main>
      </div>
    </div>
  );
}
