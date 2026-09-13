/**
 * @name 跨境ERP - 数据看板
 */

import React from 'react';
import {
  BarChart3,
  ShoppingCart,
  Warehouse,
  Truck,
} from 'lucide-react';
import { useHashPage, defineHashPageRoute } from '../../common/useHashPage';
import ErpShell from '../components/ErpShell';
import { BusinessOverviewPage, SalesReportPage, InventoryReportPage, LogisticsReportPage } from './pages';
import { AnnotationViewer, type AnnotationSourceDocument } from '@axhub/annotation';
import annotationSourceDocument from './annotation-source.json';
import './style.css';

const route = defineHashPageRoute(
  [
    { id: 'overview', title: '经营概览' },
    { id: 'sales', title: '销售报表' },
    { id: 'inventory', title: '库存报表' },
    { id: 'logistics', title: '物流报表' },
  ],
  { defaultPageId: 'overview' }
);

const menuItems = [
  { key: 'overview', label: '经营概览', icon: BarChart3 },
  { key: 'sales', label: '销售报表', icon: ShoppingCart },
  { key: 'inventory', label: '库存报表', icon: Warehouse },
  { key: 'logistics', label: '物流报表', icon: Truck },
];

const pageMap: Record<string, React.ComponentType> = {
  overview: BusinessOverviewPage,
  sales: SalesReportPage,
  inventory: InventoryReportPage,
  logistics: LogisticsReportPage,
};

export default function ErpReportsApp() {
  const { page, setPage } = useHashPage(route);
  const PageComponent = pageMap[page] || BusinessOverviewPage;

  return (
    <>
      <ErpShell
        menuItems={menuItems}
        selectedKey={page}
        onMenuSelect={setPage}
      >
        <PageComponent />
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
