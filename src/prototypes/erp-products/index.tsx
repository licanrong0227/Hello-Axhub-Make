/**
 * @name 跨境ERP - 商品中心
 */

import React from 'react';
import {
  LayoutDashboard,
  Package,
  Search as SearchIcon,
  Link,
  Upload,
  Globe,
  DollarSign,
} from 'lucide-react';
import { useHashPage, defineHashPageRoute } from '../../common/useHashPage';
import ErpShell from '../components/ErpShell';
import './style.css';
import { AnnotationViewer, type AnnotationSourceDocument } from '@axhub/annotation';
import annotationSourceDocument from './annotation-source.json';
import {
  ProductListPage,
  ProductAddPage,
  CollectTaskListPage,
  CollectTaskAddPage,
  PublishTaskListPage,
  PublishTaskAddPage,
  PublishFailListPage,
  PlatformMappingPage,
  PricingRuleListPage,
  PricingRuleAddPage,
} from './pages';

const route = defineHashPageRoute(
  [
    { id: 'product-list', title: '商品列表' },
    { id: 'product-add', title: '新增商品' },
    { id: 'collect-list', title: '采集任务' },
    { id: 'collect-add', title: '新建采集' },
    { id: 'publish-list', title: '刊登任务' },
    { id: 'publish-add', title: '新建刊登' },
    { id: 'publish-fail', title: '刊登失败记录' },
    { id: 'platform-mapping', title: '平台映射' },
    { id: 'pricing-list', title: '定价规则' },
    { id: 'pricing-add', title: '新增定价规则' },
  ],
  { defaultPageId: 'product-list' }
);

const menuItems = [
  {
    key: '商品管理',
    label: '商品管理',
    icon: Package,
    children: [
      { key: 'product-list', label: '商品列表' },
    ],
  },
  {
    key: '商品采集',
    label: '商品采集',
    icon: Link,
    children: [
      { key: 'collect-list', label: '采集任务' },
    ],
  },
  {
    key: '商品刊登',
    label: '商品刊登',
    icon: Upload,
    children: [
      { key: 'publish-list', label: '刊登任务' },
      { key: 'publish-fail', label: '刊登失败记录' },
    ],
  },
  {
    key: '多平台映射',
    label: '多平台映射',
    icon: Globe,
    children: [{ key: 'platform-mapping', label: '平台映射列表' }],
  },
  {
    key: '定价规则',
    label: '定价规则',
    icon: DollarSign,
    children: [
      { key: 'pricing-list', label: '定价规则' },
    ],
  },
];

const pageComponents: Record<string, React.FC<{ onNavigate: (page: string) => void }>> = {
  'product-list': ProductListPage,
  'product-add': ProductAddPage,
  'collect-list': CollectTaskListPage,
  'collect-add': CollectTaskAddPage,
  'publish-list': PublishTaskListPage,
  'publish-add': PublishTaskAddPage,
  'publish-fail': PublishFailListPage,
  'platform-mapping': PlatformMappingPage,
  'pricing-list': PricingRuleListPage,
  'pricing-add': PricingRuleAddPage,
};

export default function ProductsApp() {
  const { page, setPage } = useHashPage(route);
  const PageComponent = pageComponents[page] || ProductListPage;

  return (
    <>
      <ErpShell
        title="商品中心"
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
