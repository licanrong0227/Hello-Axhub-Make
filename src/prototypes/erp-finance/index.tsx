/**
 * @name 跨境ERP - 财务管理
 */

import React from 'react';
import {
  DollarSign,
  FileText,
  Settings,
  Globe,
  Calculator,
  Scale,
} from 'lucide-react';
import { useHashPage, defineHashPageRoute } from '../../common/useHashPage';
import ErpShell from '../components/ErpShell';
import './style.css';
import {
  ARListPage,
  ARWriteoffPage,
  APListPage,
  APWriteoffPage,
  ExpenseListPage,
  ExpenseAddPage,
  ExpenseRulePage,
  ExchangeRateListPage,
  ExchangeRateConfigPage,
  CostCalcConfigPage,
  ReconciliationListPage,
  ReconciliationDetailPage,
} from './pages';

const route = defineHashPageRoute(
  [
    { id: 'ar-list', title: '应收列表' },
    { id: 'ar-writeoff', title: '应收核销' },
    { id: 'ap-list', title: '应付列表' },
    { id: 'ap-writeoff', title: '应付核销' },
    { id: 'expense-list', title: '费用列表' },
    { id: 'expense-add', title: '新增费用' },
    { id: 'expense-rule', title: '分摊规则' },
    { id: 'exchange-rate-list', title: '汇率列表' },
    { id: 'exchange-rate-config', title: '汇率配置' },
    { id: 'cost-calc-config', title: '成本核算配置' },
    { id: 'reconciliation-list', title: '对账列表' },
    { id: 'reconciliation-detail', title: '对账详情' },
  ],
  { defaultPageId: 'ar-list' }
);

const menuItems = [
  {
    key: '应收管理',
    label: '应收管理',
    icon: DollarSign,
    children: [
      { key: 'ar-list', label: '应收列表' },
    ],
  },
  {
    key: '应付管理',
    label: '应付管理',
    icon: FileText,
    children: [
      { key: 'ap-list', label: '应付列表' },
    ],
  },
  {
    key: '费用管理',
    label: '费用管理',
    icon: Calculator,
    children: [
      { key: 'expense-list', label: '费用列表' },
    ],
  },
  {
    key: '汇率管理',
    label: '汇率管理',
    icon: Globe,
    children: [
      { key: 'exchange-rate-list', label: '汇率列表' },
    ],
  },
  {
    key: '平台对账',
    label: '平台对账',
    icon: Scale,
    children: [
      { key: 'reconciliation-list', label: '对账列表' },
    ],
  },
];

const pageComponents: Record<string, React.FC<{ onNavigate: (page: string) => void }>> = {
  'ar-list': ARListPage,
  'ar-writeoff': ARWriteoffPage,
  'ap-list': APListPage,
  'ap-writeoff': APWriteoffPage,
  'expense-list': ExpenseListPage,
  'expense-add': ExpenseAddPage,
  'expense-rule': ExpenseRulePage,
  'exchange-rate-list': ExchangeRateListPage,
  'exchange-rate-config': ExchangeRateConfigPage,
  'cost-calc-config': CostCalcConfigPage,
  'reconciliation-list': ReconciliationListPage,
  'reconciliation-detail': ReconciliationDetailPage,
};

export default function FinanceApp() {
  const { page, setPage } = useHashPage(route);
  const PageComponent = pageComponents[page] || ARListPage;

  return (
    <ErpShell
      title="财务管理"
      menuItems={menuItems}
      selectedKey={page}
      onMenuSelect={setPage}
    >
      <PageComponent onNavigate={setPage} />
    </ErpShell>
  );
}
