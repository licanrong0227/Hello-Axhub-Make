/**
 * @name 记账APP
 */

import React, { useState } from 'react';
import {
    ArrowLeft,
    Plus,
    Calendar,
    BarChart3,
    User,
    Wallet,
    TrendingUp,
    TrendingDown,
    PieChart,
    Settings,
    Bell,
    Shield,
    Info,
    LogOut,
    Camera,
    Sparkles,
    Mic,
    Home,
    CreditCard,
    Target,
    ChevronRight,
    Check,
    X,
    Trash2,
    Edit3,
    Search,
    Filter,
    Share2,
    Moon,
    Sun,
    Mail,
    Phone,
    Lock,
    Eye,
    EyeOff,
    CheckCircle2,
    AlertCircle,
    Clock,
    DollarSign,
    Tag,
    FileText,
    MoreHorizontal,
    ArrowUpRight,
    ArrowDownLeft,
    RefreshCw,
    Download,
    Upload,
    Copy,
    ExternalLink,
    Menu,
    BellRing,
    HelpCircle,
    Star,
    Heart,
    Gift,
    Zap,
    Coffee,
    ShoppingBag,
    Car,
    Home as HomeIcon,
    Utensils,
    Wifi,
    WifiOff,
    Loader2,
} from 'lucide-react';
import { defineHashPageRoute, useHashPage } from '../../common/useHashPage';
import './style.css';
import { AnnotationViewer, useProtoDevState, type AnnotationSourceDocument, type AnnotationViewerOptions } from '@axhub/annotation';
import annotationSourceDocument from './annotation-source.json';

// 类型定义
type PageId =
    | 'login'
    | 'verification'
    | 'accounting'
    | 'statistics'
    | 'profile'
    | 'add-bill'
    | 'ai-bill'
    | 'edit-bill'
    | 'share'
    | 'profile-edit'
    | 'account-security'
    | 'category-manage'
    | 'budget-setting'
    | 'reminder-setting'
    | 'privacy-policy'
    | 'about';

type Bill = {
    id: string;
    type: 'income' | 'expense';
    amount: number;
    category: string;
    categoryIcon: string;
    note: string;
    date: string;
    time: string;
};

type Category = {
    id: string;
    name: string;
    icon: string;
    type: 'income' | 'expense';
    isSystem: boolean;
};

// 路由配置
const route = defineHashPageRoute(
    [
        { id: 'login', title: '登录' },
        { id: 'verification', title: '验证码' },
        { id: 'accounting', title: '记账' },
        { id: 'statistics', title: '统计' },
        { id: 'profile', title: '我的' },
        { id: 'add-bill', title: '记一笔' },
        { id: 'ai-bill', title: 'AI记账' },
        { id: 'edit-bill', title: '编辑账单' },
        { id: 'share', title: '分享' },
        { id: 'profile-edit', title: '编辑个人信息' },
        { id: 'account-security', title: '账号与安全' },
        { id: 'category-manage', title: '分类管理' },
        { id: 'budget-setting', title: '预算设置' },
        { id: 'reminder-setting', title: '记账提醒' },
        { id: 'privacy-policy', title: '隐私协议' },
        { id: 'about', title: '关于应用' },
    ],
    { defaultPageId: 'login' }
);

// 模拟数据
const mockBills: Bill[] = [
    { id: '1', type: 'expense', amount: 35.5, category: '餐饮', categoryIcon: '🍜', note: '午餐', date: '2026-09-13', time: '12:30' },
    { id: '2', type: 'expense', amount: 15, category: '交通', categoryIcon: '🚌', note: '地铁', date: '2026-09-13', time: '08:45' },
    { id: '3', type: 'income', amount: 5000, category: '工资', categoryIcon: '💰', note: '9月工资', date: '2026-09-10', time: '10:00' },
    { id: '4', type: 'expense', amount: 128, category: '购物', categoryIcon: '🛒', note: '日用品', date: '2026-09-09', time: '19:20' },
    { id: '5', type: 'expense', amount: 45, category: '娱乐', categoryIcon: '🎮', note: '游戏', date: '2026-09-08', time: '21:15' },
];

const expenseCategories: Category[] = [
    { id: '1', name: '餐饮', icon: '🍜', type: 'expense', isSystem: true },
    { id: '2', name: '交通', icon: '🚌', type: 'expense', isSystem: true },
    { id: '3', name: '购物', icon: '🛒', type: 'expense', isSystem: true },
    { id: '4', name: '娱乐', icon: '🎮', type: 'expense', isSystem: true },
    { id: '5', name: '住房', icon: '🏠', type: 'expense', isSystem: true },
    { id: '6', name: '医疗', icon: '🏥', type: 'expense', isSystem: true },
    { id: '7', name: '教育', icon: '📚', type: 'expense', isSystem: true },
    { id: '8', name: '其他', icon: '📦', type: 'expense', isSystem: true },
];

const incomeCategories: Category[] = [
    { id: '1', name: '工资', icon: '💰', type: 'income', isSystem: true },
    { id: '2', name: '奖金', icon: '🎁', type: 'income', isSystem: true },
    { id: '3', name: '投资', icon: '📈', type: 'income', isSystem: true },
    { id: '4', name: '兼职', icon: '💼', type: 'income', isSystem: true },
    { id: '5', name: '其他', icon: '📦', type: 'income', isSystem: true },
];

// 工具函数
function formatAmount(amount: number, type: 'income' | 'expense'): string {
    const prefix = type === 'income' ? '+' : '-';
    return `${prefix}¥${amount.toFixed(2)}`;
}

function getMonthTotal(bills: Bill[], type: 'income' | 'expense'): number {
    return bills
        .filter(bill => bill.type === type && bill.date.startsWith('2026-09'))
        .reduce((sum, bill) => sum + bill.amount, 0);
}

// 登录页组件
function LoginPage({ onNavigate, onLogin }: { onNavigate: (page: PageId) => void; onLogin: () => void }) {
    const [phone, setPhone] = useState('');
    const [agreed, setAgreed] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const protoState = useProtoDevState<{ btn_state?: 'disabled' | 'normal' }>();
    const btnState = protoState.btn_state || 'disabled';

    const handleGetCode = () => {
        if (!agreed) {
            setShowConfirm(true);
            return;
        }
        onNavigate('verification');
    };

    const getButtonClassName = () => {
        if (btnState === 'disabled') return 'btn-primary disabled';
        return 'btn-primary';
    };

    return (
        <div className="login-page" data-annotation-id="login-page">
            <div className="login-header" data-annotation-id="login-header">
                <div className="login-logo">
                    <Wallet size={48} />
                </div>
                <h1>记账本</h1>
                <p>轻松记账，智能理财</p>
            </div>

            <div className="login-form" data-annotation-id="login-form">
                <div className="input-group" data-annotation-id="phone-input">
                    <Phone size={20} />
                    <input
                        type="tel"
                        placeholder="请输入手机号"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        maxLength={11}
                    />
                </div>

                <button
                    className={getButtonClassName()}
                    data-annotation-id="get-code-btn"
                    onClick={handleGetCode}
                    disabled={btnState === 'disabled'}
                >
                    获取验证码
                </button>

                <div className="login-divider">
                    <span>或</span>
                </div>

                <button className="btn-wechat" data-annotation-id="wechat-login-btn">
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                        <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178A1.17 1.17 0 0 1 4.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178 1.17 1.17 0 0 1-1.162-1.178c0-.651.52-1.18 1.162-1.18zm5.34 2.867c-1.797-.052-3.746.512-5.28 1.786-1.72 1.428-2.687 3.72-1.78 6.22.942 2.453 3.666 4.229 6.884 4.229.826 0 1.622-.12 2.361-.336a.722.722 0 0 1 .598.082l1.584.926a.272.272 0 0 0 .14.047c.134 0 .24-.111.24-.247 0-.06-.023-.12-.038-.177l-.327-1.233a.582.582 0 0 1-.023-.156.49.49 0 0 1 .201-.398C23.024 18.48 24 16.82 24 14.98c0-3.21-2.931-5.837-7.062-6.122zM14.033 13.2c.535 0 .969.44.969.982a.976.976 0 0 1-.969.983.976.976 0 0 1-.969-.983c0-.542.434-.982.97-.982zm4.844 0c.535 0 .969.44.969.982a.976.976 0 0 1-.969.983.976.976 0 0 1-.969-.983c0-.542.434-.982.97-.982z"/>
                    </svg>
                    微信登录
                </button>
            </div>

            <div className="login-agreement" data-annotation-id="login-agreement">
                <label>
                    <input
                        type="checkbox"
                        checked={agreed}
                        onChange={(e) => setAgreed(e.target.checked)}
                    />
                    <span>我已阅读并同意《用户协议》和《隐私协议》</span>
                </label>
            </div>

            {showConfirm && (
                <div className="modal-overlay">
                    <div className="modal" data-annotation-id="agreement-confirm-modal">
                        <h3>用户协议确认</h3>
                        <p>是否同意《用户协议》和《隐私协议》？</p>
                        <div className="modal-actions">
                            <button className="btn-secondary" onClick={() => setShowConfirm(false)}>取消</button>
                            <button className="btn-primary" onClick={() => { setAgreed(true); setShowConfirm(false); onNavigate('verification'); }}>同意并继续</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

// 验证码页组件
function VerificationPage({ onNavigate, onLogin }: { onNavigate: (page: PageId) => void; onLogin: () => void }) {
    const [code, setCode] = useState(['', '', '', '']);
    const [countdown, setCountdown] = useState(59);
    const [error, setError] = useState(false);
    const protoState = useProtoDevState<{ resend_state?: 'cooldown' | 'active' }>();
    const resendState = protoState.resend_state || 'cooldown';

    const handleCodeChange = (index: number, value: string) => {
        if (value.length > 1) return;
        const newCode = [...code];
        newCode[index] = value;
        setCode(newCode);

        if (value && index < 3) {
            const nextInput = document.getElementById(`code-${index + 1}`);
            nextInput?.focus();
        }

        if (newCode.every(c => c !== '')) {
            // 模拟验证
            setTimeout(() => {
                if (newCode.join('') === '1234') {
                    onLogin();
                    onNavigate('accounting');
                } else {
                    setError(true);
                    setTimeout(() => setError(false), 1000);
                }
            }, 500);
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
        if (e.key === 'Backspace' && !code[index] && index > 0) {
            const prevInput = document.getElementById(`code-${index - 1}`);
            prevInput?.focus();
        }
    };

    return (
        <div className="verification-page" data-annotation-id="verification-page">
            <div className="verification-header">
                <button className="back-btn" onClick={() => onNavigate('login')}>
                    <ArrowLeft size={24} />
                </button>
                <h1>输入验证码</h1>
                <p>验证码已发送至 138****8888</p>
            </div>

            <div className="verification-code">
                {code.map((digit, index) => (
                    <input
                        key={index}
                        id={`code-${index}`}
                        type="tel"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleCodeChange(index, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        className={error ? 'error' : ''}
                    />
                ))}
            </div>

            {error && (
                <div className="verification-error">
                    <AlertCircle size={16} />
                    <span>验证码错误，请重新输入</span>
                </div>
            )}

            <div className="verification-countdown" data-annotation-id="resend-btn">
                {resendState === 'cooldown' ? (
                    <span>{countdown}秒后重新获取</span>
                ) : (
                    <button className="resend-btn">重新获取验证码</button>
                )}
            </div>
        </div>
    );
}

// 记账Tab主页面
function AccountingPage({ onNavigate }: { onNavigate: (page: PageId) => void }) {
    const [selectedMonth, setSelectedMonth] = useState('2026-09');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showCategoryPicker, setShowCategoryPicker] = useState(false);

    const monthIncome = getMonthTotal(mockBills, 'income');
    const monthExpense = getMonthTotal(mockBills, 'expense');
    const monthBalance = monthIncome - monthExpense;
    const budget = 3000;
    const budgetProgress = monthExpense / budget;

    return (
        <div className="accounting-page">
            {/* 筛选栏 */}
            <div className="filter-bar" data-annotation-id="filter-bar">
                <button className="filter-btn" onClick={() => setShowDatePicker(true)}>
                    <Calendar size={16} />
                    <span>{selectedMonth === '2026-09' ? '本月' : selectedMonth}</span>
                </button>
                <button className="filter-btn" onClick={() => setShowCategoryPicker(true)}>
                    <Filter size={16} />
                    <span>{selectedCategory === 'all' ? '全部分类' : selectedCategory}</span>
                </button>
            </div>

            {/* 统计卡片 */}
            <div className="stats-card" data-annotation-id="stats-card">
                <div className="stats-header">
                    <h2>收支概览</h2>
                    <span className="stats-month">2026年9月</span>
                </div>
                <div className="stats-grid">
                    <div className="stat-item">
                        <span className="stat-label">收入</span>
                        <span className="stat-value income">¥{monthIncome.toFixed(2)}</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-label">支出</span>
                        <span className="stat-value expense">¥{monthExpense.toFixed(2)}</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-label">结余</span>
                        <span className="stat-value">¥{monthBalance.toFixed(2)}</span>
                    </div>
                </div>
                {budget > 0 && (
                    <div className="budget-progress">
                        <div className="budget-info">
                            <span>月度预算</span>
                            <span>¥{monthExpense.toFixed(2)} / ¥{budget.toFixed(2)}</span>
                        </div>
                        <div className="progress-bar">
                            <div
                                className={`progress-fill ${budgetProgress > 1 ? 'over' : ''}`}
                                style={{ width: `${Math.min(budgetProgress * 100, 100)}%` }}
                            />
                        </div>
                    </div>
                )}
            </div>

            {/* 账单列表 */}
            <div className="bill-list" data-annotation-id="bill-list">
                <div className="bill-group">
                    <div className="bill-group-header">
                        <span>2026年9月</span>
                        <span className="bill-group-total">
                            收入 ¥{monthIncome.toFixed(2)} | 支出 ¥{monthExpense.toFixed(2)}
                        </span>
                    </div>
                    {mockBills.map(bill => (
                        <div
                            key={bill.id}
                            className="bill-item"
                            onClick={() => onNavigate('edit-bill')}
                        >
                            <div className="bill-icon">{bill.categoryIcon}</div>
                            <div className="bill-info">
                                <div className="bill-category">{bill.category}</div>
                                {bill.note && <div className="bill-note">{bill.note}</div>}
                                <div className="bill-time">{bill.date.slice(5)} {bill.time}</div>
                            </div>
                            <div className={`bill-amount ${bill.type}`}>
                                {formatAmount(bill.amount, bill.type)}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* 悬浮记账按钮 */}
            <div className="floating-btn" data-annotation-id="floating-btn" onClick={() => onNavigate('add-bill')}>
                <Plus size={24} />
            </div>
        </div>
    );
}

// 普通记账页
function AddBillPage({ onNavigate }: { onNavigate: (page: PageId) => void }) {
    const [type, setType] = useState<'expense' | 'income'>('expense');
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('');
    const [note, setNote] = useState('');
    const [showCategoryPicker, setShowCategoryPicker] = useState(false);

    const categories = type === 'expense' ? expenseCategories : incomeCategories;

    const handleSave = () => {
        if (!amount || !category) return;
        // 模拟保存
        onNavigate('accounting');
    };

    return (
        <div className="add-bill-page" data-annotation-id="add-bill-page">
            <div className="add-bill-header" data-annotation-id="add-bill-header">
                <button className="back-btn" onClick={() => onNavigate('accounting')}>
                    <ArrowLeft size={24} />
                </button>
                <div className="type-tabs" data-annotation-id="type-tabs">
                    <button
                        className={`type-tab ${type === 'expense' ? 'active' : ''}`}
                        onClick={() => { setType('expense'); setCategory(''); }}
                    >
                        支出
                    </button>
                    <button
                        className={`type-tab ${type === 'income' ? 'active' : ''}`}
                        onClick={() => { setType('income'); setCategory(''); }}
                    >
                        收入
                    </button>
                </div>
            </div>

            <div className="amount-input" data-annotation-id="amount-input">
                <span className="currency">¥</span>
                <input
                    type="number"
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    autoFocus
                />
            </div>

            <div className="category-grid" data-annotation-id="category-grid">
                {categories.slice(0, 8).map(cat => (
                    <button
                        key={cat.id}
                        className={`category-item ${category === cat.name ? 'selected' : ''}`}
                        onClick={() => setCategory(cat.name)}
                    >
                        <span className="category-icon">{cat.icon}</span>
                        <span className="category-name">{cat.name}</span>
                    </button>
                ))}
                <button className="category-item more" onClick={() => setShowCategoryPicker(true)}>
                    <MoreHorizontal size={24} />
                    <span className="category-name">更多</span>
                </button>
            </div>

            <div className="bill-form" data-annotation-id="bill-form">
                <div className="form-row" data-annotation-id="time-picker">
                    <Calendar size={20} />
                    <span>记账时间</span>
                    <span className="form-value">今天</span>
                </div>
                <div className="form-row" data-annotation-id="note-input">
                    <FileText size={20} />
                    <span>备注</span>
                    <input
                        type="text"
                        placeholder="添加备注（最多50字）"
                        value={note}
                        onChange={(e) => setNote(e.target.value.slice(0, 50))}
                        maxLength={50}
                    />
                </div>
            </div>

            <button
                className={`save-btn ${!amount || !category ? 'disabled' : ''}`}
                data-annotation-id="save-btn"
                onClick={handleSave}
                disabled={!amount || !category}
            >
                保存
            </button>

            {showCategoryPicker && (
                <div className="category-picker-overlay" onClick={() => setShowCategoryPicker(false)}>
                    <div className="category-picker" data-annotation-id="category-picker" onClick={e => e.stopPropagation()}>
                        <div className="category-picker-header">
                            <h3>选择分类</h3>
                            <button onClick={() => setShowCategoryPicker(false)}>
                                <X size={20} />
                            </button>
                        </div>
                        <div className="category-picker-list">
                            {categories.map(cat => (
                                <button
                                    key={cat.id}
                                    className={`category-picker-item ${category === cat.name ? 'selected' : ''}`}
                                    onClick={() => { setCategory(cat.name); setShowCategoryPicker(false); }}
                                >
                                    <span>{cat.icon}</span>
                                    <span>{cat.name}</span>
                                    {category === cat.name && <Check size={16} />}
                                </button>
                            ))}
                        </div>
                        <button className="add-category-btn">
                            <Plus size={16} />
                            新增分类
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

// 统计Tab页面
function StatisticsPage({ onNavigate }: { onNavigate: (page: PageId) => void }) {
    const [timeRange, setTimeRange] = useState('month');
    const [chartType, setChartType] = useState<'income' | 'expense'>('expense');
    const [showTimePicker, setShowTimePicker] = useState(false);

    const monthIncome = getMonthTotal(mockBills, 'income');
    const monthExpense = getMonthTotal(mockBills, 'expense');

    const categoryStats = [
        { name: '餐饮', amount: 35.5, percent: 45, icon: '🍜' },
        { name: '交通', amount: 15, percent: 19, icon: '🚌' },
        { name: '购物', amount: 128, percent: 36, icon: '🛒' },
    ];

    return (
        <div className="statistics-page">
            <div className="stats-header">
                <button className="time-btn" onClick={() => setShowTimePicker(true)}>
                    <Calendar size={16} />
                    <span>本月</span>
                </button>
                <div className="chart-type-tabs">
                    <button
                        className={`chart-type-tab ${chartType === 'expense' ? 'active' : ''}`}
                        onClick={() => setChartType('expense')}
                    >
                        支出
                    </button>
                    <button
                        className={`chart-type-tab ${chartType === 'income' ? 'active' : ''}`}
                        onClick={() => setChartType('income')}
                    >
                        收入
                    </button>
                </div>
                <button className="share-btn" onClick={() => onNavigate('share')}>
                    <Share2 size={18} />
                </button>
            </div>

            <div className="stats-overview">
                <div className="stats-total">
                    <span className="stats-label">总{chartType === 'expense' ? '支出' : '收入'}</span>
                    <span className={`stats-amount ${chartType}`}>
                        ¥{(chartType === 'expense' ? monthExpense : monthIncome).toFixed(2)}
                    </span>
                </div>
            </div>

            <div className="chart-section">
                <h3>分类占比</h3>
                <div className="pie-chart">
                    <div className="pie-placeholder">
                        <PieChart size={120} />
                    </div>
                </div>
            </div>

            <div className="trend-section">
                <h3>收支趋势</h3>
                <div className="line-chart">
                    <div className="chart-placeholder">
                        <BarChart3 size={120} />
                    </div>
                </div>
            </div>

            <div className="ranking-section">
                <h3>分类排行</h3>
                <div className="ranking-list">
                    {categoryStats.map((stat, index) => (
                        <div key={stat.name} className="ranking-item">
                            <span className="ranking-index">{index + 1}</span>
                            <span className="ranking-icon">{stat.icon}</span>
                            <div className="ranking-info">
                                <span className="ranking-name">{stat.name}</span>
                                <div className="ranking-bar">
                                    <div className="ranking-fill" style={{ width: `${stat.percent}%` }} />
                                </div>
                            </div>
                            <div className="ranking-amount">
                                <span>¥{stat.amount.toFixed(2)}</span>
                                <span className="ranking-percent">{stat.percent}%</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {showTimePicker && (
                <div className="time-picker-overlay" onClick={() => setShowTimePicker(false)}>
                    <div className="time-picker" onClick={e => e.stopPropagation()}>
                        <button onClick={() => { setTimeRange('today'); setShowTimePicker(false); }}>今天</button>
                        <button onClick={() => { setTimeRange('week'); setShowTimePicker(false); }}>本周</button>
                        <button onClick={() => { setTimeRange('month'); setShowTimePicker(false); }}>本月</button>
                        <button onClick={() => { setTimeRange('year'); setShowTimePicker(false); }}>本年</button>
                    </div>
                </div>
            )}
        </div>
    );
}

// 分类管理页面
function CategoryManagePage({ onNavigate }: { onNavigate: (page: PageId) => void }) {
    const [activeTab, setActiveTab] = useState<'expense' | 'income'>('expense');
    const [showAddModal, setShowAddModal] = useState(false);
    const [newCategoryName, setNewCategoryName] = useState('');

    const categories = activeTab === 'expense' ? expenseCategories : incomeCategories;

    return (
        <div className="category-manage-page" data-annotation-id="category-manage-page">
            <div className="category-manage-header" data-annotation-id="category-manage-header">
                <button className="back-btn" onClick={() => onNavigate('profile')}>
                    <ArrowLeft size={24} />
                </button>
                <h1>分类管理</h1>
            </div>

            <div className="category-tabs" data-annotation-id="category-tabs">
                <button
                    className={`category-tab ${activeTab === 'expense' ? 'active' : ''}`}
                    onClick={() => setActiveTab('expense')}
                >
                    支出
                </button>
                <button
                    className={`category-tab ${activeTab === 'income' ? 'active' : ''}`}
                    onClick={() => setActiveTab('income')}
                >
                    收入
                </button>
            </div>

            <div className="category-list" data-annotation-id="category-list">
                <div className="category-section">
                    <h3>系统预置</h3>
                    <div className="category-items">
                        {categories.filter(c => c.isSystem).map(cat => (
                            <div key={cat.id} className="category-item disabled">
                                <span className="category-icon">{cat.icon}</span>
                                <span className="category-name">{cat.name}</span>
                                <span className="category-tag">系统</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="category-section">
                    <h3>自定义分类</h3>
                    <div className="category-items">
                        {categories.filter(c => !c.isSystem).map(cat => (
                            <div key={cat.id} className="category-item">
                                <span className="category-icon">{cat.icon}</span>
                                <span className="category-name">{cat.name}</span>
                                <div className="category-actions">
                                    <Edit3 size={16} />
                                    <Trash2 size={16} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <button className="add-category-btn" data-annotation-id="add-category-btn" onClick={() => setShowAddModal(true)}>
                <Plus size={16} />
                新增分类
            </button>

            {showAddModal && (
                <div className="modal-overlay">
                    <div className="modal" data-annotation-id="add-category-modal">
                        <h3>新增分类</h3>
                        <div className="modal-form">
                            <input
                                type="text"
                                placeholder="输入分类名称"
                                value={newCategoryName}
                                onChange={(e) => setNewCategoryName(e.target.value)}
                            />
                            <button className="btn-ai-generate">
                                <Sparkles size={16} />
                                AI生成图标
                            </button>
                        </div>
                        <div className="modal-actions">
                            <button className="btn-secondary" onClick={() => setShowAddModal(false)}>取消</button>
                            <button className="btn-primary" onClick={() => { setShowAddModal(false); setNewCategoryName(''); }}>保存</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

// AI记账页面
function AiBillPage({ onNavigate }: { onNavigate: (page: PageId) => void }) {
    const [inputText, setInputText] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);

    const handleRecognize = () => {
        if (!inputText.trim()) return;
        setIsProcessing(true);
        setTimeout(() => {
            setIsProcessing(false);
            onNavigate('accounting');
        }, 1500);
    };

    return (
        <div className="ai-bill-page" data-annotation-id="ai-bill-page">
            <div className="ai-bill-header" data-annotation-id="ai-bill-header">
                <button className="back-btn" onClick={() => onNavigate('accounting')}>
                    <ArrowLeft size={24} />
                </button>
                <h1>AI记账</h1>
            </div>

            <div className="ai-bill-content">
                <div className="ai-bill-icon">
                    <Sparkles size={48} />
                </div>
                <h2>智能识别记账</h2>
                <p>输入消费描述，AI自动识别金额和分类</p>

                <div className="ai-bill-input" data-annotation-id="ai-bill-input">
                    <textarea
                        placeholder="例如：今天午餐花了35元，买了一杯奶茶18元"
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        rows={4}
                    />
                </div>

                <button
                    className={`ai-bill-btn ${!inputText.trim() || isProcessing ? 'disabled' : ''}`}
                    data-annotation-id="ai-bill-btn"
                    onClick={handleRecognize}
                    disabled={!inputText.trim() || isProcessing}
                >
                    {isProcessing ? (
                        <>
                            <Loader2 size={20} className="spin" />
                            识别中...
                        </>
                    ) : (
                        <>
                            <Sparkles size={20} />
                            开始识别
                        </>
                    )}
                </button>

                <div className="ai-bill-examples">
                    <h3>示例描述</h3>
                    <div className="example-list">
                        <button className="example-item" onClick={() => setInputText('午餐外卖35元')}>
                            午餐外卖35元
                        </button>
                        <button className="example-item" onClick={() => setInputText('地铁通勤6元')}>
                            地铁通勤6元
                        </button>
                        <button className="example-item" onClick={() => setInputText('超市购物128元')}>
                            超市购物128元
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

// 编辑账单页面
function EditBillPage({ onNavigate }: { onNavigate: (page: PageId) => void }) {
    const [type, setType] = useState<'expense' | 'income'>('expense');
    const [amount, setAmount] = useState('35.5');
    const [category, setCategory] = useState('餐饮');
    const [note, setNote] = useState('午餐');
    const [date, setDate] = useState('2026-09-13');

    const handleSave = () => {
        onNavigate('accounting');
    };

    const handleDelete = () => {
        onNavigate('accounting');
    };

    const categories = type === 'expense' ? expenseCategories : incomeCategories;

    return (
        <div className="add-bill-page" data-annotation-id="edit-bill-page">
            <div className="add-bill-header" data-annotation-id="edit-bill-header">
                <button className="back-btn" onClick={() => onNavigate('accounting')}>
                    <ArrowLeft size={24} />
                </button>
                <div className="type-tabs" data-annotation-id="edit-type-tabs">
                    <button
                        className={`type-tab ${type === 'expense' ? 'active' : ''}`}
                        onClick={() => { setType('expense'); setCategory('餐饮'); }}
                    >
                        支出
                    </button>
                    <button
                        className={`type-tab ${type === 'income' ? 'active' : ''}`}
                        onClick={() => { setType('income'); setCategory('工资'); }}
                    >
                        收入
                    </button>
                </div>
            </div>

            <div className="amount-input" data-annotation-id="edit-amount-input">
                <span className="currency">¥</span>
                <input
                    type="number"
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />
            </div>

            <div className="category-grid" data-annotation-id="edit-category-grid">
                {categories.slice(0, 8).map(cat => (
                    <button
                        key={cat.id}
                        className={`category-item ${category === cat.name ? 'selected' : ''}`}
                        onClick={() => setCategory(cat.name)}
                    >
                        <span className="category-icon">{cat.icon}</span>
                        <span className="category-name">{cat.name}</span>
                    </button>
                ))}
            </div>

            <div className="bill-form" data-annotation-id="edit-bill-form">
                <div className="form-row" data-annotation-id="edit-time-picker">
                    <Calendar size={20} />
                    <span>记账时间</span>
                    <span className="form-value">今天</span>
                </div>
                <div className="form-row" data-annotation-id="edit-note-input">
                    <FileText size={20} />
                    <span>备注</span>
                    <input
                        type="text"
                        placeholder="添加备注（最多50字）"
                        value={note}
                        onChange={(e) => setNote(e.target.value.slice(0, 50))}
                        maxLength={50}
                    />
                </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', padding: '24px', paddingBottom: '48px' }}>
                <button
                    className="btn-primary"
                    data-annotation-id="edit-save-btn"
                    onClick={handleSave}
                    style={{ flex: 1 }}
                >
                    保存
                </button>
                <button
                    className="btn-secondary"
                    data-annotation-id="edit-delete-btn"
                    onClick={handleDelete}
                    style={{ flex: 1, color: '#ef4444', borderColor: '#ef4444' }}
                >
                    删除
                </button>
            </div>
        </div>
    );
}

// 分享页面
function SharePage({ onNavigate }: { onNavigate: (page: PageId) => void }) {
    return (
        <div className="page-placeholder" data-annotation-id="share-page">
            <div className="page-header">
                <button className="back-btn" onClick={() => onNavigate('statistics')}>
                    <ArrowLeft size={24} />
                </button>
                <h1>分享</h1>
            </div>
            <div className="page-body">
                <div className="share-card">
                    <h2>2026年9月收支报告</h2>
                    <div className="share-stats">
                        <div className="share-stat">
                            <span>收入</span>
                            <span className="income">¥5,000.00</span>
                        </div>
                        <div className="share-stat">
                            <span>支出</span>
                            <span className="expense">¥223.50</span>
                        </div>
                        <div className="share-stat">
                            <span>结余</span>
                            <span>¥4,776.50</span>
                        </div>
                    </div>
                </div>
                <div className="share-actions">
                    <button className="btn-primary"><Share2 size={16} /> 分享到微信</button>
                    <button className="btn-secondary"><Download size={16} /> 保存图片</button>
                    <button className="btn-secondary"><Copy size={16} /> 复制链接</button>
                </div>
            </div>
        </div>
    );
}

// 编辑个人信息页面
function ProfileEditPage({ onNavigate }: { onNavigate: (page: PageId) => void }) {
    return (
        <div className="page-placeholder" data-annotation-id="profile-edit-page">
            <div className="page-header">
                <button className="back-btn" onClick={() => onNavigate('profile')}>
                    <ArrowLeft size={24} />
                </button>
                <h1>编辑个人信息</h1>
            </div>
            <div className="page-body">
                <div className="profile-edit-list">
                    <div className="profile-edit-item">
                        <span>头像</span>
                        <div className="profile-edit-value">
                            <div className="avatar-small"><User size={24} /></div>
                            <ChevronRight size={16} />
                        </div>
                    </div>
                    <div className="profile-edit-item">
                        <span>昵称</span>
                        <div className="profile-edit-value">
                            <span>用户1388</span>
                            <ChevronRight size={16} />
                        </div>
                    </div>
                    <div className="profile-edit-item">
                        <span>手机号</span>
                        <div className="profile-edit-value">
                            <span>138****8888</span>
                            <ChevronRight size={16} />
                        </div>
                    </div>
                    <div className="profile-edit-item">
                        <span>性别</span>
                        <div className="profile-edit-value">
                            <span>未设置</span>
                            <ChevronRight size={16} />
                        </div>
                    </div>
                    <div className="profile-edit-item">
                        <span>生日</span>
                        <div className="profile-edit-value">
                            <span>未设置</span>
                            <ChevronRight size={16} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// 账号与安全页面
function AccountSecurityPage({ onNavigate }: { onNavigate: (page: PageId) => void }) {
    return (
        <div className="page-placeholder" data-annotation-id="account-security-page">
            <div className="page-header">
                <button className="back-btn" onClick={() => onNavigate('profile')}>
                    <ArrowLeft size={24} />
                </button>
                <h1>账号与安全</h1>
            </div>
            <div className="page-body">
                <div className="security-list">
                    <div className="security-item">
                        <Lock size={20} />
                        <span>修改密码</span>
                        <ChevronRight size={16} />
                    </div>
                    <div className="security-item">
                        <Phone size={20} />
                        <span>绑定手机</span>
                        <span className="security-value">138****8888</span>
                        <ChevronRight size={16} />
                    </div>
                    <div className="security-item">
                        <Shield size={20} />
                        <span>实名认证</span>
                        <span className="security-value">未认证</span>
                        <ChevronRight size={16} />
                    </div>
                    <div className="security-item">
                        <Eye size={20} />
                        <span>登录设备管理</span>
                        <ChevronRight size={16} />
                    </div>
                </div>
            </div>
        </div>
    );
}

// 预算设置页面
function BudgetSettingPage({ onNavigate }: { onNavigate: (page: PageId) => void }) {
    return (
        <div className="page-placeholder" data-annotation-id="budget-setting-page">
            <div className="page-header">
                <button className="back-btn" onClick={() => onNavigate('profile')}>
                    <ArrowLeft size={24} />
                </button>
                <h1>预算设置</h1>
            </div>
            <div className="page-body">
                <div className="budget-overview">
                    <span className="budget-label">本月预算</span>
                    <div className="budget-amount-input">
                        <span className="currency">¥</span>
                        <input type="number" defaultValue="3000" />
                    </div>
                    <div className="budget-progress">
                        <div className="progress-bar">
                            <div className="progress-fill" style={{ width: '7.5%' }} />
                        </div>
                        <span>已使用 ¥223.50 / ¥3,000.00</span>
                    </div>
                </div>
                <div className="budget-settings-list">
                    <div className="budget-settings-item">
                        <span>预算周期</span>
                        <span className="settings-value">每月</span>
                        <ChevronRight size={16} />
                    </div>
                    <div className="budget-settings-item">
                        <span>超支提醒</span>
                        <div className="toggle-switch active">
                            <div className="toggle-knob" />
                        </div>
                    </div>
                    <div className="budget-settings-item">
                        <span>分类预算</span>
                        <ChevronRight size={16} />
                    </div>
                </div>
                <button className="save-btn">保存</button>
            </div>
        </div>
    );
}

// 记账提醒页面
function ReminderSettingPage({ onNavigate }: { onNavigate: (page: PageId) => void }) {
    return (
        <div className="page-placeholder" data-annotation-id="reminder-setting-page">
            <div className="page-header">
                <button className="back-btn" onClick={() => onNavigate('profile')}>
                    <ArrowLeft size={24} />
                </button>
                <h1>记账提醒</h1>
            </div>
            <div className="page-body">
                <div className="reminder-settings-list">
                    <div className="reminder-item">
                        <div className="reminder-info">
                            <Bell size={20} />
                            <div>
                                <span>每日记账提醒</span>
                                <p>每天 21:00 提醒记账</p>
                            </div>
                        </div>
                        <div className="toggle-switch active">
                            <div className="toggle-knob" />
                        </div>
                    </div>
                    <div className="reminder-item">
                        <div className="reminder-info">
                            <AlertCircle size={20} />
                            <div>
                                <span>预算超支提醒</span>
                                <p>超出预算时立即提醒</p>
                            </div>
                        </div>
                        <div className="toggle-switch active">
                            <div className="toggle-knob" />
                        </div>
                    </div>
                    <div className="reminder-item">
                        <div className="reminder-info">
                            <Clock size={20} />
                            <div>
                                <span>周报提醒</span>
                                <p>每周一发送上周收支报告</p>
                            </div>
                        </div>
                        <div className="toggle-switch">
                            <div className="toggle-knob" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// 隐私协议页面
function PrivacyPolicyPage({ onNavigate }: { onNavigate: (page: PageId) => void }) {
    return (
        <div className="page-placeholder" data-annotation-id="privacy-policy-page">
            <div className="page-header">
                <button className="back-btn" onClick={() => onNavigate('profile')}>
                    <ArrowLeft size={24} />
                </button>
                <h1>隐私协议</h1>
            </div>
            <div className="page-body policy-content">
                <h2>记账本隐私协议</h2>
                <p>更新日期：2026年9月1日 | 生效日期：2026年9月1日</p>
                <h3>一、信息收集</h3>
                <p>我们可能收集以下信息：手机号码、设备信息、记账数据等。</p>
                <h3>二、信息使用</h3>
                <p>我们收集的信息将用于：提供记账服务、改善用户体验、发送服务通知等。</p>
                <h3>三、信息保护</h3>
                <p>我们采用业界标准的安全技术和管理措施保护您的个人信息安全。</p>
                <h3>四、信息共享</h3>
                <p>未经您的同意，我们不会与任何第三方共享您的个人信息。</p>
                <h3>五、联系我们</h3>
                <p>如您对本协议有任何疑问，请联系我们：support@accounting-app.com</p>
            </div>
        </div>
    );
}

// 关于应用页面
function AboutPage({ onNavigate }: { onNavigate: (page: PageId) => void }) {
    return (
        <div className="page-placeholder" data-annotation-id="about-page">
            <div className="page-header">
                <button className="back-btn" onClick={() => onNavigate('profile')}>
                    <ArrowLeft size={24} />
                </button>
                <h1>关于应用</h1>
            </div>
            <div className="page-body">
                <div className="about-info">
                    <div className="about-logo">
                        <Wallet size={64} />
                    </div>
                    <h2>记账本</h2>
                    <p className="about-version">版本 1.0.0</p>
                </div>
                <div className="about-list">
                    <div className="about-item">
                        <span>功能介绍</span>
                        <ChevronRight size={16} />
                    </div>
                    <div className="about-item">
                        <span>给我们评分</span>
                        <ChevronRight size={16} />
                    </div>
                    <div className="about-item">
                        <span>检查更新</span>
                        <span className="about-value">已是最新版本</span>
                        <ChevronRight size={16} />
                    </div>
                    <div className="about-item">
                        <span>清除缓存</span>
                        <span className="about-value">12.3 MB</span>
                        <ChevronRight size={16} />
                    </div>
                    <div className="about-item">
                        <span>用户协议</span>
                        <ChevronRight size={16} />
                    </div>
                    <div className="about-item" onClick={() => onNavigate('privacy-policy')}>
                        <span>隐私协议</span>
                        <ChevronRight size={16} />
                    </div>
                </div>
            </div>
        </div>
    );
}

// 我的Tab页面
function ProfilePage({ onNavigate }: { onNavigate: (page: PageId) => void }) {
    return (
        <div className="profile-page">
            <div className="profile-header" onClick={() => onNavigate('profile-edit')}>
                <div className="avatar">
                    <User size={40} />
                </div>
                <div className="user-info">
                    <h2>用户1388</h2>
                    <p>138****8888</p>
                </div>
                <ChevronRight size={20} />
            </div>

            <div className="profile-menu">
                <div className="menu-item" onClick={() => onNavigate('account-security')}>
                    <Lock size={20} />
                    <span>账号与安全</span>
                    <ChevronRight size={16} />
                </div>
                <div className="menu-item" onClick={() => onNavigate('category-manage')}>
                    <Tag size={20} />
                    <span>自定义分类</span>
                    <ChevronRight size={16} />
                </div>
                <div className="menu-item" onClick={() => onNavigate('budget-setting')}>
                    <Target size={20} />
                    <span>预算设置</span>
                    <ChevronRight size={16} />
                </div>
                <div className="menu-item" onClick={() => onNavigate('reminder-setting')}>
                    <BellRing size={20} />
                    <span>记账提醒</span>
                    <ChevronRight size={16} />
                </div>
                <div className="menu-item" onClick={() => onNavigate('privacy-policy')}>
                    <Shield size={20} />
                    <span>隐私协议</span>
                    <ChevronRight size={16} />
                </div>
                <div className="menu-item" onClick={() => onNavigate('about')}>
                    <Info size={20} />
                    <span>关于应用</span>
                    <ChevronRight size={16} />
                </div>
                <div className="menu-item logout">
                    <LogOut size={20} />
                    <span>退出登录</span>
                </div>
            </div>
        </div>
    );
}

// 主应用组件
export default function AccountingApp() {
    const { page, setPage } = useHashPage(route);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleNavigate = (targetPage: PageId) => {
        setPage(targetPage);
    };

    const handleLogin = () => {
        setIsLoggedIn(true);
    };

    // 根据当前页面渲染对应组件
    const renderPage = () => {
        switch (page) {
            case 'login':
                return <LoginPage onNavigate={handleNavigate} onLogin={handleLogin} />;
            case 'verification':
                return <VerificationPage onNavigate={handleNavigate} onLogin={handleLogin} />;
            case 'accounting':
                return <AccountingPage onNavigate={handleNavigate} />;
            case 'statistics':
                return <StatisticsPage onNavigate={handleNavigate} />;
            case 'profile':
                return <ProfilePage onNavigate={handleNavigate} />;
            case 'add-bill':
                return <AddBillPage onNavigate={handleNavigate} />;
            case 'category-manage':
                return <CategoryManagePage onNavigate={handleNavigate} />;
            case 'ai-bill':
                return <AiBillPage onNavigate={handleNavigate} />;
            case 'edit-bill':
                return <EditBillPage onNavigate={handleNavigate} />;
            case 'share':
                return <SharePage onNavigate={handleNavigate} />;
            case 'profile-edit':
                return <ProfileEditPage onNavigate={handleNavigate} />;
            case 'account-security':
                return <AccountSecurityPage onNavigate={handleNavigate} />;
            case 'budget-setting':
                return <BudgetSettingPage onNavigate={handleNavigate} />;
            case 'reminder-setting':
                return <ReminderSettingPage onNavigate={handleNavigate} />;
            case 'privacy-policy':
                return <PrivacyPolicyPage onNavigate={handleNavigate} />;
            case 'about':
                return <AboutPage onNavigate={handleNavigate} />;
            default:
                return <LoginPage onNavigate={handleNavigate} onLogin={handleLogin} />;
        }
    };

    return (
        <>
          <div className="app-container">
                      {renderPage()}
          
                      {/* 底部Tab栏 - 仅在登录后显示 */}
                      {isLoggedIn && ['accounting', 'statistics', 'profile'].includes(page) && (
                          <div className="tab-bar">
                              <button
                                  className={`tab-item ${page === 'accounting' ? 'active' : ''}`}
                                  onClick={() => handleNavigate('accounting')}
                              >
                                  <Wallet size={20} />
                                  <span>记账</span>
                              </button>
                              <button
                                  className={`tab-item ${page === 'statistics' ? 'active' : ''}`}
                                  onClick={() => handleNavigate('statistics')}
                              >
                                  <BarChart3 size={20} />
                                  <span>统计</span>
                              </button>
                              <button
                                  className={`tab-item ${page === 'profile' ? 'active' : ''}`}
                                  onClick={() => handleNavigate('profile')}
                              >
                                  <User size={20} />
                                  <span>我的</span>
                              </button>
                          </div>
                      )}
                  </div>
          <AnnotationViewer
            source={annotationSourceDocument as unknown as AnnotationSourceDocument}
            options={{
              currentPageId: page,
              onDirectoryRoute: (node) => {
                if (typeof node.route === 'string' && /^[a-z0-9-]+$/u.test(node.route)) {
                  handleNavigate(node.route as PageId);
                }
              },
              toolbarEdge: 'right',
              showToolbar: true,
              showThemeToggle: true,
              showColorFilter: true,
              emptyWhenNoData: false,
            }}
          />
        </>
    );
}
