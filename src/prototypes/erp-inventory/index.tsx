/**
 * @name 跨境ERP - 库存管理
 */

import React from 'react';
import {
  BarChart3,
  Package,
  ClipboardList,
  ArrowRightLeft,
  Warehouse,
} from 'lucide-react';
import { useHashPage, defineHashPageRoute } from '../../common/useHashPage';
import ErpShell from '../components/ErpShell';
import './style.css';
import { AnnotationViewer, type AnnotationSourceDocument } from '@axhub/annotation';
import annotationSourceDocument from './annotation-source.json';
import {
  InventoryOverviewPage,
  InventoryListPage,
  InventoryDetailPage,
  StocktakeListPage,
  StocktakeAddPage,
  StocktakeDetailPage,
  TransferListPage,
  TransferAddPage,
  TransferDetailPage,
  WarehouseListPage,
  WarehouseAddPage,
  LocationManagePage,
} from './pages';

const route = defineHashPageRoute(
  [
    { id: 'inventory-overview', title: '库存总览' },
    { id: 'inventory-list', title: '库存列表' },
    { id: 'inventory-detail', title: '库存明细' },
    { id: 'stocktake-list', title: '盘点列表' },
    { id: 'stocktake-add', title: '新建盘点' },
    { id: 'stocktake-detail', title: '盘点详情' },
    { id: 'transfer-list', title: '调拨列表' },
    { id: 'transfer-add', title: '新建调拨' },
    { id: 'transfer-detail', title: '调拨详情' },
    { id: 'warehouse-list', title: '仓库列表' },
    { id: 'warehouse-add', title: '新建仓库' },
    { id: 'location-manage', title: '库位管理' },
  ],
  { defaultPageId: 'inventory-overview' }
);

const menuItems = [
  {
    key: '库存总览',
    label: '库存总览',
    icon: BarChart3,
    children: [{ key: 'inventory-overview', label: '库存总览' }],
  },
  {
    key: '库存查询',
    label: '库存查询',
    icon: Package,
    children: [
      { key: 'inventory-list', label: '库存列表' },
    ],
  },
  {
    key: '库存盘点',
    label: '库存盘点',
    icon: ClipboardList,
    children: [
      { key: 'stocktake-list', label: '盘点列表' },
    ],
  },
  {
    key: '库存调拨',
    label: '库存调拨',
    icon: ArrowRightLeft,
    children: [
      { key: 'transfer-list', label: '调拨列表' },
    ],
  },
  {
    key: '仓库管理',
    label: '仓库管理',
    icon: Warehouse,
    children: [
      { key: 'warehouse-list', label: '仓库列表' },
      { key: 'location-manage', label: '库位管理' },
    ],
  },
];

const pageComponents: Record<string, React.FC<{ onNavigate: (page: string) => void }>> = {
  'inventory-overview': InventoryOverviewPage,
  'inventory-list': InventoryListPage,
  'inventory-detail': InventoryDetailPage,
  'stocktake-list': StocktakeListPage,
  'stocktake-add': StocktakeAddPage,
  'stocktake-detail': StocktakeDetailPage,
  'transfer-list': TransferListPage,
  'transfer-add': TransferAddPage,
  'transfer-detail': TransferDetailPage,
  'warehouse-list': WarehouseListPage,
  'warehouse-add': WarehouseAddPage,
  'location-manage': LocationManagePage,
};

export default function InventoryApp() {
  const { page, setPage } = useHashPage(route);
  const PageComponent = pageComponents[page] || InventoryOverviewPage;

  return (
    <>
      <ErpShell
        title="库存管理"
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
