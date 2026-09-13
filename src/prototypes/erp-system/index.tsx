/**
 * @name 跨境ERP - 系统管理
 */

import React, { useMemo } from 'react';
import {
  Shield,
  Users,
  Store,
  Settings,
  Key,
  Link,
  ClipboardList,
  Bell,
  FileText,
  MessageSquare,
} from 'lucide-react';
import { AnnotationViewer } from '@axhub/annotation';
import type { AnnotationDirectoryRouteNode, AnnotationSourceDocument, AnnotationViewerOptions } from '@axhub/annotation';
import annotationSourceDocument from './annotation-source.json';
import { useHashPage, defineHashPageRoute } from '../../common/useHashPage';
import ErpShell from '../components/ErpShell';
import './style.css';
import {
  UserListPage,
  RoleManagePage,
  PermissionConfigPage,
  ShopAuthListPage,
  ShopAuthAddPage,
  PlatformMappingListPage,
  PlatformMappingConfigPage,
  ApprovalFlowListPage,
  ApprovalFlowConfigPage,
  CodeRulePage,
  MessageCenterPage,
  AuditLogPage,
} from './pages';

const route = defineHashPageRoute(
  [
    { id: 'user-list', title: '用户列表' },
    { id: 'role-manage', title: '角色管理' },
    { id: 'permission-config', title: '权限配置' },
    { id: 'shop-auth-list', title: '授权列表' },
    { id: 'shop-auth-add', title: '新增授权' },
    { id: 'platform-mapping-list', title: '映射列表' },
    { id: 'platform-mapping-config', title: '映射配置' },
    { id: 'approval-flow-list', title: '流程列表' },
    { id: 'approval-flow-config', title: '配置' },
    { id: 'code-rule', title: '编码规则配置' },
    { id: 'message-center', title: '消息中心' },
    { id: 'audit-log', title: '操作日志' },
  ],
  { defaultPageId: 'user-list' }
);

const menuItems = [
  {
    key: '账号权限',
    label: '账号权限',
    icon: Shield,
    children: [
      { key: 'user-list', label: '用户列表' },
      { key: 'role-manage', label: '角色管理' },
    ],
  },
  {
    key: '店铺授权',
    label: '店铺授权',
    icon: Store,
    children: [
      { key: 'shop-auth-list', label: '授权列表' },
    ],
  },
  {
    key: '平台字典映射',
    label: '平台字典映射',
    icon: Link,
    children: [
      { key: 'platform-mapping-list', label: '映射列表' },
    ],
  },
  {
    key: '审批工作流',
    label: '审批工作流',
    icon: ClipboardList,
    children: [
      { key: 'approval-flow-list', label: '流程列表' },
    ],
  },
  {
    key: 'message-center',
    label: '消息中心',
    icon: Bell,
  },
  {
    key: 'audit-log',
    label: '操作日志',
    icon: FileText,
  },
];

const pageComponents: Record<string, React.FC<{ onNavigate: (page: string) => void }>> = {
  'user-list': UserListPage,
  'role-manage': RoleManagePage,
  'permission-config': PermissionConfigPage,
  'shop-auth-list': ShopAuthListPage,
  'shop-auth-add': ShopAuthAddPage,
  'platform-mapping-list': PlatformMappingListPage,
  'platform-mapping-config': PlatformMappingConfigPage,
  'approval-flow-list': ApprovalFlowListPage,
  'approval-flow-config': ApprovalFlowConfigPage,
  'code-rule': CodeRulePage,
  'message-center': MessageCenterPage,
  'audit-log': AuditLogPage,
};

export default function ErpSystemApp() {
  const { page, setPage } = useHashPage(route);
  const PageComponent = pageComponents[page] || UserListPage;

  const annotationOptions = useMemo<AnnotationViewerOptions>(() => ({
    showToolbar: true,
    showThemeToggle: true,
    showColorFilter: true,
    emptyWhenNoData: false,
    toolbarEdge: 'right',
    currentPageId: page,
    onDirectoryRoute: (node: AnnotationDirectoryRouteNode) => {
      if (typeof node.route === 'string') setPage(node.route);
    },
  }), [page, setPage]);

  return (
    <ErpShell
      title="跨境ERP - 系统管理"
      menuItems={menuItems}
      selectedKey={page}
      onMenuSelect={setPage}
    >
      <PageComponent onNavigate={setPage} />
      <AnnotationViewer
        source={annotationSourceDocument as AnnotationSourceDocument}
        options={annotationOptions}
      />
    </ErpShell>
  );
}
