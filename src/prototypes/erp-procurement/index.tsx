/**
 * @name 跨境ERP - 采购管理
 */

import React from 'react';
import {
  Truck,
  Building2,
  ShoppingCart,
  RotateCcw,
  Lightbulb,
} from 'lucide-react';
import { useHashPage, defineHashPageRoute } from '../../common/useHashPage';
import ErpShell from '../components/ErpShell';
import './style.css';
import {
  SupplierListPage,
  SupplierAddPage,
  PurchaseSuggestListPage,
  PurchaseOrderListPage,
  PurchaseOrderAddPage,
  PurchaseOrderDetailPage,
  PurchaseReturnListPage,
  PurchaseReturnAddPage,
} from './pages';

const route = defineHashPageRoute(
  [
    { id: 'supplier-list', title: '供应商列表' },
    { id: 'supplier-add', title: '新增供应商' },
    { id: 'suggest-list', title: '采购建议' },
    { id: 'order-list', title: '订单列表' },
    { id: 'order-add', title: '新建订单' },
    { id: 'order-detail', title: '订单详情' },
    { id: 'return-list', title: '退货列表' },
    { id: 'return-add', title: '新建退货' },
  ],
  { defaultPageId: 'supplier-list' }
);

const menuItems = [
  {
    key: '供应商管理',
    label: '供应商管理',
    icon: Building2,
    children: [
      { key: 'supplier-list', label: '供应商列表' },
    ],
  },
  {
    key: 'suggest-list',
    label: '采购建议',
    icon: Lightbulb,
  },
  {
    key: '采购订单',
    label: '采购订单',
    icon: ShoppingCart,
    children: [
      { key: 'order-list', label: '订单列表' },
    ],
  },
  {
    key: '采购退货',
    label: '采购退货',
    icon: RotateCcw,
    children: [
      { key: 'return-list', label: '退货列表' },
    ],
  },
];

const pageComponents: Record<string, React.FC<{ onNavigate: (page: string) => void }>> = {
  'supplier-list': SupplierListPage,
  'supplier-add': SupplierAddPage,
  'suggest-list': PurchaseSuggestListPage,
  'order-list': PurchaseOrderListPage,
  'order-add': PurchaseOrderAddPage,
  'order-detail': PurchaseOrderDetailPage,
  'return-list': PurchaseReturnListPage,
  'return-add': PurchaseReturnAddPage,
};

export default function ProcurementApp() {
  const { page, setPage } = useHashPage(route);
  const PageComponent = pageComponents[page] || SupplierListPage;

  return (
    <ErpShell
      title="采购管理"
      menuItems={menuItems}
      selectedKey={page}
      onMenuSelect={setPage}
    >
      <PageComponent onNavigate={setPage} />
    </ErpShell>
  );
}
