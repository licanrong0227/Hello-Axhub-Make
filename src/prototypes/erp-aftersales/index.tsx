/**
 * @name 跨境ERP - 客户与售后
 */

import React from 'react';
import {
  Users,
  HeadphonesIcon,
} from 'lucide-react';
import { useHashPage, defineHashPageRoute } from '../../common/useHashPage';
import ErpShell from '../components/ErpShell';
import { AnnotationViewer, type AnnotationSourceDocument } from '@axhub/annotation';
import annotationSourceDocument from './annotation-source.json';
import './style.css';
import {
  CustomerListPage,
  CustomerDetailPage,
  AftersaleListPage,
  AftersaleDetailPage,
} from './pages';

const route = defineHashPageRoute(
  [
    { id: 'customer-list', title: '客户列表' },
    { id: 'customer-detail', title: '客户详情' },
    { id: 'aftersale-list', title: '工单列表' },
    { id: 'aftersale-detail', title: '工单详情' },
  ],
  { defaultPageId: 'customer-list' }
);

const menuItems = [
  {
    key: '客户管理',
    label: '客户管理',
    icon: Users,
    children: [
      { key: 'customer-list', label: '客户列表' },
    ],
  },
  {
    key: '售后工单',
    label: '售后工单',
    icon: HeadphonesIcon,
    children: [
      { key: 'aftersale-list', label: '工单列表' },
    ],
  },
];

const pageComponents: Record<string, React.FC<{ onNavigate: (page: string) => void }>> = {
  'customer-list': CustomerListPage,
  'customer-detail': CustomerDetailPage,
  'aftersale-list': AftersaleListPage,
  'aftersale-detail': AftersaleDetailPage,
};

export default function AftersalesApp() {
  const { page, setPage } = useHashPage(route);
  const PageComponent = pageComponents[page] || CustomerListPage;

  return (
    <>
      <ErpShell
        title="客户与售后"
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
