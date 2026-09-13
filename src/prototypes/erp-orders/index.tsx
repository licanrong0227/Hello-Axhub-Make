/**
 * @name 跨境ERP - 订单管理
 */

import React from 'react';
import {
  ShoppingCart,
  AlertTriangle,
  GitMerge,
  Layers,
  Settings,
} from 'lucide-react';
import { useHashPage, defineHashPageRoute } from '../../common/useHashPage';
import ErpShell from '../components/ErpShell';
import './style.css';
import { AnnotationViewer, type AnnotationSourceDocument } from '@axhub/annotation';
import annotationSourceDocument from './annotation-source.json';
import {
  OrderListPage,
  OrderDetailPage,
  ExceptionOrderListPage,
  ExceptionOrderHandlePage,
  MergeSplitRulePage,
  WavePickingListPage,
  WavePickingRulePage,
} from './pages';

const route = defineHashPageRoute(
  [
    { id: 'order-list', title: '订单列表' },
    { id: 'order-detail', title: '订单详情' },
    { id: 'exception-list', title: '异常订单' },
    { id: 'exception-handle', title: '异常处理' },
    { id: 'merge-split-rule', title: '合单拆单规则' },
    { id: 'wave-list', title: '波次列表' },
    { id: 'wave-rule', title: '波次规则配置' },
  ],
  { defaultPageId: 'order-list' }
);

const menuItems = [
  {
    key: '订单管理',
    label: '订单管理',
    icon: ShoppingCart,
    children: [
      { key: 'order-list', label: '订单列表' },
      { key: 'exception-list', label: '异常订单' },
    ],
  },
  { key: 'merge-split-rule', label: '合单拆单规则', icon: GitMerge },
  {
    key: '波次拣货',
    label: '波次拣货',
    icon: Layers,
    children: [
      { key: 'wave-list', label: '波次列表' },
    ],
  },
];

const pageComponents: Record<string, React.FC<{ onNavigate: (page: string) => void }>> = {
  'order-list': OrderListPage,
  'order-detail': OrderDetailPage,
  'exception-list': ExceptionOrderListPage,
  'exception-handle': ExceptionOrderHandlePage,
  'merge-split-rule': MergeSplitRulePage,
  'wave-list': WavePickingListPage,
  'wave-rule': WavePickingRulePage,
};

export default function OrdersApp() {
  const { page, setPage } = useHashPage(route);
  const PageComponent = pageComponents[page] || OrderListPage;

  return (
    <>
      <ErpShell
        title="订单管理"
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
