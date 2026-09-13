/**
 * @name 跨境ERP - 仓储与物流
 */

import React from 'react';
import {
  Package,
  Truck,
  FileText,
  Send,
  Warehouse,
  ClipboardList,
  Building2,
  ScrollText,
} from 'lucide-react';
import { useHashPage, defineHashPageRoute } from '../../common/useHashPage';
import ErpShell from '../components/ErpShell';
import './style.css';
import { AnnotationViewer, type AnnotationSourceDocument } from '@axhub/annotation';
import annotationSourceDocument from './annotation-source.json';
import {
  OutboundListPage,
  OutboundDetailPage,
  InboundListPage,
  InboundDetailPage,
  LogisticsProviderListPage,
  LogisticsChannelConfigPage,
  CustomsListPage,
  CustomsGeneratePage,
} from './pages';

const route = defineHashPageRoute(
  [
    { id: 'outbound-list', title: '销售出库' },
    { id: 'outbound-detail', title: '出库详情' },
    { id: 'inbound-list', title: '采购入库' },
    { id: 'inbound-detail', title: '入库详情' },
    { id: 'logistics-provider', title: '物流商列表' },
    { id: 'logistics-channel', title: '渠道配置' },
    { id: 'customs-list', title: '报关列表' },
    { id: 'customs-generate', title: '生成报关' },
  ],
  { defaultPageId: 'outbound-list' }
);

const menuItems = [
  {
    key: '出库管理',
    label: '出库管理',
    icon: Send,
    children: [
      { key: 'outbound-list', label: '销售出库' },
    ],
  },
  {
    key: '入库管理',
    label: '入库管理',
    icon: Warehouse,
    children: [
      { key: 'inbound-list', label: '采购入库' },
    ],
  },
  {
    key: '物流商管理',
    label: '物流商管理',
    icon: Truck,
    children: [
      { key: 'logistics-provider', label: '物流商列表' },
    ],
  },
  {
    key: '报关管理',
    label: '报关管理',
    icon: FileText,
    children: [
      { key: 'customs-list', label: '报关列表' },
    ],
  },
];

const pageComponents: Record<string, React.FC<{ onNavigate: (page: string) => void }>> = {
  'outbound-list': OutboundListPage,
  'outbound-detail': OutboundDetailPage,
  'inbound-list': InboundListPage,
  'inbound-detail': InboundDetailPage,
  'logistics-provider': LogisticsProviderListPage,
  'logistics-channel': LogisticsChannelConfigPage,
  'customs-list': CustomsListPage,
  'customs-generate': CustomsGeneratePage,
};

export default function LogisticsApp() {
  const { page, setPage } = useHashPage(route);
  const PageComponent = pageComponents[page] || OutboundListPage;

  return (
    <>
      <ErpShell
        title="仓储与物流"
        menuItems={menuItems}
        selectedKey={page}
        onMenuSelect={setPage}
      >
        <PageComponent onNavigate={setPage} />
      </ErpShell>
      <AnnotationViewer
        source={annotationSourceDocument as unknown as AnnotationSourceDocument}
        options={{
          currentPageId: page,
          toolbarEdge: 'right',
          showToolbar: true,
          emptyWhenNoData: false,
        }}
      />
    </>
  );
}
