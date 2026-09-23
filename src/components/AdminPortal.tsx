import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ViewType, 
  LeadSubmission, 
  Quote, 
  Invoice, 
  CustomerProject, 
  ChangeRequest, 
  AuditLog, 
  CompanySettings, 
  PaymentRecord, 
  CustomerProfile,
  CompanyService
} from '../types';
import { PortalStore } from '../data/portalStore';
import { InvoicePDFModal } from './InvoicePDFModal';
import { ServicesManagement } from './admin/ServicesManagement';
import { QuoteBuilderModal } from './admin/QuoteBuilderModal';
import { BrandLogo } from './BrandLogo';
import { 
  Users, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  Search, 
  Plus, 
  Trash2, 
  Mail, 
  Phone, 
  Globe, 
  Activity, 
  ArrowLeft, 
  Sparkles, 
  AlertTriangle, 
  DollarSign, 
  FileText, 
  X, 
  Lock, 
  Unlock, 
  KeyRound, 
  ShieldAlert, 
  ShieldCheck, 
  Eye, 
  EyeOff, 
  LogOut,
  Video,
  Download,
  Copy,
  Check,
  ExternalLink,
  ChevronRight,
  Filter,
  CalendarCheck2,
  Briefcase,
  Layers,
  Edit3,
  BarChart3,
  Database,
  ArrowUpRight,
  Tag,
  Gift,
  HelpCircle,
  FileSpreadsheet,
  CreditCard,
  Receipt,
  GitPullRequest,
  History,
  Settings,
  Send,
  Building,
  Save,
  Printer
} from 'lucide-react';

interface AdminPortalProps {
  leads: LeadSubmission[];
  onUpdateLeadStatus?: (id: string, newStatus: LeadSubmission['status']) => void;
  onUpdateLead?: (id: string, updates: Partial<LeadSubmission>) => void;
  onAddLead: (lead: LeadSubmission) => void;
  onDeleteLead: (id: string) => void;
  onNavigate: (view: ViewType) => void;
}

const DEFAULT_ADMIN_USERNAME = 'admin';
const DEFAULT_ADMIN_PASSWORD = 'admin';

type AdminTab = 
  | 'calls' 
  | 'clients' 
  | 'projects' 
  | 'services'
  | 'quotes' 
  | 'invoices' 
  | 'change_requests' 
  | 'audit' 
  | 'settings';

export const AdminPortal: React.FC<AdminPortalProps> = ({
  leads,
  onUpdateLeadStatus,
  onUpdateLead,
  onAddLead,
  onDeleteLead,
  onNavigate
}) => {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem('brandridge_admin_authenticated') === 'true';
    } catch {
      return false;
    }
  });

  const [enteredUsername, setEnteredUsername] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState('');
  const [isSubmittingAuth, setIsSubmittingAuth] = useState(false);

  // Active Admin Navigation Tab
  const [activeTab, setActiveTab] = useState<AdminTab>('calls');

  // Search and Filters
  const [searchFilter, setSearchFilter] = useState('');
  const [callStatusFilter, setCallStatusFilter] = useState<string>('all');
  const [clientStageFilter, setClientStageFilter] = useState<string>('all');
  const [invoiceStatusFilter, setInvoiceStatusFilter] = useState<string>('all');

  // Relational Data State from PortalStore
  const [projects, setProjects] = useState<CustomerProject[]>([]);
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [services, setServices] = useState<CompanyService[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [payments, setPayments] = useState<PaymentRecord[]>([]);
  const [changeRequests, setChangeRequests] = useState<ChangeRequest[]>([]);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
  const [settings, setSettings] = useState<CompanySettings>(PortalStore.getCompanySettings());
  const [customers, setCustomers] = useState<CustomerProfile[]>([]);

  // Modals
  const [selectedLead, setSelectedLead] = useState<LeadSubmission | null>(null);
  const [editingLead, setEditingLead] = useState<LeadSubmission | null>(null);
  const [showAddCallModal, setShowAddCallModal] = useState(false);
  const [selectedInvoiceForPDF, setSelectedInvoiceForPDF] = useState<Invoice | null>(null);
  const [showNewInvoiceModal, setShowNewInvoiceModal] = useState(false);
  const [showNewQuoteModal, setShowNewQuoteModal] = useState(false);
  const [editingQuoteForModal, setEditingQuoteForModal] = useState<Quote | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [exportNotice, setExportNotice] = useState<string | null>(null);

  // New Invoice Form Builder
  const [invCustomer, setInvCustomer] = useState('Marcus Sterling');
  const [invCompany, setInvCompany] = useState('Lumina Aesthetics Clinic');
  const [invEmail, setInvEmail] = useState('marcus@lumina-aesthetics.com');
  const [invProjectName, setInvProjectName] = useState('Lumina High-Converting VIP Booking Platform');
  const [invPaymentPlan, setInvPaymentPlan] = useState<any>('percentage_deposit');
  const [invDepositPct, setInvDepositPct] = useState(50);
  const [invItems, setInvItems] = useState([
    { id: '1', description: 'Custom High-Converting Web Architecture & VIP UI', quantity: 1, unitPrice: 3800, vatRate: 0, total: 3800 },
    { id: '2', description: 'Automated 24/7 Appointment & Deposit Engine', quantity: 1, unitPrice: 1200, vatRate: 0, total: 1200 }
  ]);

  // Strategy Call Modal State
  const [newCallForm, setNewCallForm] = useState({
    fullName: '',
    email: '',
    company: '',
    phone: '',
    websiteUrl: '',
    serviceInterest: 'Complete Architecture Transformation',
    budgetRange: '€4,000 - €8,000',
    timeline: 'Within 2-4 weeks',
    primaryGoal: 'Increase conversion rates and automate VIP bookings',
    projectBrief: '',
    selectedDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    selectedTimeSlot: '10:00 AM (10:00)',
    timezone: 'Europe/Amsterdam (CET)',
    meetingStatus: 'upcoming' as const,
    meetingLink: 'https://meet.google.com/br-vip-call'
  });

  const refreshAllData = () => {
    setProjects(PortalStore.getProjects());
    setQuotes(PortalStore.getQuotes());
    setServices(PortalStore.getCompanyServices());
    setInvoices(PortalStore.getInvoices());
    setPayments(PortalStore.getPayments());
    setChangeRequests(PortalStore.getChangeRequests());
    setAuditLogs(PortalStore.getAuditLogs());
    setSettings(PortalStore.getCompanySettings());
    setCustomers(PortalStore.getCustomers());
  };

  useEffect(() => {
    if (isAuthenticated) {
      refreshAllData();
    }
  }, [isAuthenticated]);

  // Auth Handler
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingAuth(true);
    setAuthError('');

    setTimeout(() => {
      const u = enteredUsername.trim().toLowerCase();
      const p = enteredPassword.trim();

      if ((u === 'admin' || u === 'admin@brandridge.com' || u === 'brandidge') && (p === 'admin' || p === 'brandidge2026')) {
        setIsAuthenticated(true);
        sessionStorage.setItem('brandidge_admin_authenticated', 'true');
        PortalStore.logAudit({
          userId: 'user-admin',
          userEmail: 'admin@brandridge.com',
          action: 'ADMIN_SIGN_IN',
          entityType: 'AUTH',
          details: 'Admin authenticated via console.'
        });
      } else {
        setAuthError('Invalid username or password.');
      }
      setIsSubmittingAuth(false);
    }, 400);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('brandidge_admin_authenticated');
    setEnteredUsername('');
    setEnteredPassword('');
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Financial Metrics
  const totalRevenue = invoices.reduce((sum, inv) => sum + inv.totalAmount, 0);
  const totalPaidRevenue = invoices.reduce((sum, inv) => sum + inv.amountPaid, 0);
  const totalOutstanding = invoices.reduce((sum, inv) => sum + inv.balanceDue, 0);

  // Handle Save New Invoice
  const handleSaveNewInvoice = (sendEmail: boolean = false) => {
    const subtotal = invItems.reduce((s, i) => s + (i.quantity * i.unitPrice), 0);
    const vatTotal = Math.round((subtotal * settings.defaultVatRate) / 100);
    const totalAmount = subtotal + vatTotal;
    const invNumber = `INV-2026-${String(invoices.length + 1).padStart(4, '0')}`;

    const installments: any[] = [];
    if (invPaymentPlan === 'percentage_deposit') {
      const depositAmt = Math.round((totalAmount * invDepositPct) / 100);
      installments.push({
        id: `inst-${Date.now()}-1`,
        invoiceId: `inv-${Date.now()}`,
        installmentNumber: 1,
        label: `${invDepositPct}% Upfront Deposit`,
        percentage: invDepositPct,
        amount: depositAmt,
        dueDate: new Date(Date.now() + 3 * 86400000).toISOString().split('T')[0],
        status: 'pending'
      });
      installments.push({
        id: `inst-${Date.now()}-2`,
        invoiceId: `inv-${Date.now()}`,
        installmentNumber: 2,
        label: `${100 - invDepositPct}% Final Milestone: Production Launch`,
        percentage: 100 - invDepositPct,
        amount: totalAmount - depositAmt,
        dueDate: new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0],
        status: 'pending'
      });
    } else {
      installments.push({
        id: `inst-${Date.now()}-1`,
        invoiceId: `inv-${Date.now()}`,
        installmentNumber: 1,
        label: '100% Full Payment Upfront',
        percentage: 100,
        amount: totalAmount,
        dueDate: new Date(Date.now() + 14 * 86400000).toISOString().split('T')[0],
        status: 'pending'
      });
    }

    const newInv: Invoice = {
      id: `inv-${Date.now()}`,
      invoiceNumber: invNumber,
      customerId: 'cust-1',
      customerName: invCustomer,
      company: invCompany,
      email: invEmail,
      billingAddress: {
        street: 'Corporate Suite 100',
        city: 'Amsterdam',
        state: 'NH',
        postalCode: '1016 EK',
        country: 'Netherlands'
      },
      projectName: invProjectName,
      items: invItems,
      subtotal,
      discountTotal: 0,
      vatTotal,
      totalAmount,
      amountPaid: 0,
      balanceDue: totalAmount,
      status: 'open',
      paymentStructure: invPaymentPlan,
      installments,
      issueDate: new Date().toISOString().split('T')[0],
      dueDate: new Date(Date.now() + 14 * 86400000).toISOString().split('T')[0],
      notes: 'Issued by BrandRidge Solutions B.V. Payment plan active.',
      paymentInstructions: 'Bank transfer to ING Bank NL91 INGB 0401 9283 11 or instant card payment in Customer Portal.',
      createdAt: new Date().toISOString()
    };

    PortalStore.saveInvoice(newInv, sendEmail);
    setShowNewInvoiceModal(false);
    refreshAllData();
    alert(`Invoice ${invNumber} saved successfully${sendEmail ? ' and emailed to client' : ''}!`);
  };

  // Export accounting CSV
  const handleExportCSV = () => {
    const csvRows = [
      ['Invoice Number', 'Customer', 'Company', 'Total Amount', 'Amount Paid', 'Balance Due', 'Status', 'Issue Date', 'Due Date'],
      ...invoices.map(i => [
        i.invoiceNumber,
        `"${i.customerName}"`,
        `"${i.company}"`,
        i.totalAmount,
        i.amountPaid,
        i.balanceDue,
        i.status,
        i.issueDate,
        i.dueDate
      ])
    ];

    const csvContent = 'data:text/csv;charset=utf-8,' + csvRows.map(e => e.join(',')).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `BrandRidge_Financial_Export_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setExportNotice('Exported accounting ledger CSV successfully.');
    setTimeout(() => setExportNotice(null), 3000);
  };

  // If Not Authenticated, show Login Box
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 selection:bg-cyan-500/30">
        <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl text-white space-y-6">
          <div className="text-center space-y-3">
            <BrandLogo size="lg" className="mx-auto" />
            <div className="inline-block">
              <span className="text-xs font-mono font-bold text-sky-400 bg-sky-500/10 px-2.5 py-0.5 rounded border border-sky-500/20">
                ADMIN CONSOLE
              </span>
            </div>
            <p className="text-xs text-slate-400">Restricted access for Brandidge management</p>
          </div>

          {authError && (
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-medium">
              {authError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1">Username / Email</label>
              <input
                type="text"
                required
                value={enteredUsername}
                onChange={(e) => setEnteredUsername(e.target.value)}
                placeholder="admin"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs font-mono focus:outline-none focus:border-sky-500"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={enteredPassword}
                  onChange={(e) => setEnteredPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs font-mono focus:outline-none focus:border-sky-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-slate-400 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmittingAuth}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-slate-950 font-extrabold text-xs shadow-lg shadow-sky-500/20 transition-all cursor-pointer"
            >
              {isSubmittingAuth ? 'Verifying...' : 'Sign In to Admin Console'}
            </button>
          </form>

          <div className="flex items-center justify-between pt-4 border-t border-slate-800 text-xs text-slate-500">
            <button onClick={() => onNavigate('home')} className="hover:text-slate-300 flex items-center gap-1 cursor-pointer">
              <ArrowLeft className="w-3 h-3" /> Return Home
            </button>
            <span className="font-mono text-[11px]">Secure SSL Gateway</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-cyan-500/30">
      
      {/* Top Admin Header */}
      <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800/80 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <BrandLogo size="sm" onClick={() => onNavigate('home')} />
            <span className="text-xs font-mono font-bold text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded border border-sky-500/20">
              ADMIN
            </span>
          </div>

          <div className="h-4 w-px bg-slate-800 hidden sm:block"></div>

          <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/30 hidden sm:inline-flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            Live Node: OK
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('customer-portal')}
            className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Switch to Client Portal View</span>
          </button>

          <button
            onClick={handleExportCSV}
            className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={handleLogout}
            className="p-2 rounded-xl bg-slate-800 hover:bg-rose-500/20 text-slate-400 hover:text-rose-300 transition-all cursor-pointer"
            title="Log Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Admin Body Container */}
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        
        {/* Top Financial Dashboard Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800">
            <div className="flex justify-between items-start text-xs text-slate-400 mb-1">
              <span>Total Contract Billed</span>
              <DollarSign className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="text-2xl font-black font-mono text-white">
              €{totalRevenue.toLocaleString()}
            </div>
            <div className="text-[11px] text-slate-400 mt-2 flex items-center gap-1">
              <span className="text-emerald-400 font-bold">100%</span> guaranteed SLA
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800">
            <div className="flex justify-between items-start text-xs text-slate-400 mb-1">
              <span>Settled Revenue (Paid)</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl font-black font-mono text-emerald-400">
              €{totalPaidRevenue.toLocaleString()}
            </div>
            <div className="text-[11px] text-slate-400 mt-2">
              Across {payments.length} verified transactions
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800">
            <div className="flex justify-between items-start text-xs text-slate-400 mb-1">
              <span>Outstanding Receivable</span>
              <Clock className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-2xl font-black font-mono text-amber-400">
              €{totalOutstanding.toLocaleString()}
            </div>
            <div className="text-[11px] text-slate-400 mt-2">
              Milestone installments scheduled
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800">
            <div className="flex justify-between items-start text-xs text-slate-400 mb-1">
              <span>Active Projects & Leads</span>
              <Layers className="w-4 h-4 text-purple-400" />
            </div>
            <div className="text-2xl font-black font-mono text-white">
              {projects.length} / {leads.length}
            </div>
            <div className="text-[11px] text-slate-400 mt-2">
              {changeRequests.filter(c => c.status === 'new').length} new change requests
            </div>
          </div>
        </div>

        {exportNotice && (
          <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>{exportNotice}</span>
          </div>
        )}

        {/* Navigation Tabs Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-800">
          {[
            { id: 'calls', label: 'Strategy Calls', icon: CalendarCheck2, count: leads.filter(l => l.selectedDate).length },
            { id: 'clients', label: 'Client CRM', icon: Users, count: leads.length },
            { id: 'services', label: 'Services & Extras', icon: Sparkles, count: services.length },
            { id: 'quotes', label: 'Quotations', icon: FileText, count: quotes.length },
            { id: 'invoices', label: 'Invoices & Payment Plans', icon: CreditCard, count: invoices.length },
            { id: 'projects', label: 'Projects & Previews', icon: Globe, count: projects.length },
            { id: 'change_requests', label: 'Change Requests', icon: GitPullRequest, count: changeRequests.length },
            { id: 'audit', label: 'Audit Logs', icon: History, count: auditLogs.length },
            { id: 'settings', label: 'Company Settings', icon: Settings },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as AdminTab)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 shrink-0 transition-all cursor-pointer ${
                  isActive
                    ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                    : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span className={`px-1.5 py-0.5 rounded-md text-[10px] font-mono ${
                    isActive ? 'bg-slate-950/20 text-slate-950 font-black' : 'bg-slate-800 text-slate-300'
                  }`}>
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* TAB CONTENT: SERVICES & EXTRAS */}
        {activeTab === 'services' && (
          <ServicesManagement
            services={services}
            onServicesUpdated={refreshAllData}
          />
        )}

        {/* TAB CONTENT: INVOICES & PAYMENT PLANS */}
        {activeTab === 'invoices' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-white">Invoice Management & Payment Plan Engine</h3>
                <p className="text-xs text-slate-400">Create flexible installment schedules (Upfront, 50/50, 30/40/30, €75/mo Maintenance)</p>
              </div>

              <button
                onClick={() => setShowNewInvoiceModal(true)}
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-xs shadow-md flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Create New Invoice / Payment Plan</span>
              </button>
            </div>

            <div className="space-y-4">
              {invoices.map((inv) => (
                <div key={inv.id} className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-mono font-bold text-white">{inv.invoiceNumber}</span>
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                          {inv.status.replace('_', ' ')}
                        </span>
                        <span className="text-xs text-slate-400">Plan: <strong className="capitalize text-slate-200">{inv.paymentStructure.replace(/_/g, ' ')}</strong></span>
                      </div>
                      <h4 className="text-base font-bold text-white mt-1">{inv.company} — {inv.customerName}</h4>
                      <p className="text-xs text-slate-400">{inv.email} • {inv.projectName}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSelectedInvoiceForPDF(inv)}
                        className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1 cursor-pointer"
                      >
                        <Printer className="w-3.5 h-3.5 text-cyan-400" />
                        <span>Print / PDF</span>
                      </button>

                      <button
                        onClick={() => {
                          PortalStore.sendEmail({
                            recipient: inv.email,
                            subject: `BrandRidge — Payment Reminder for ${inv.invoiceNumber}`,
                            templateType: 'payment_reminder',
                            relatedEntityId: inv.id,
                            previewSnippet: `Friendly reminder regarding remaining balance of €${inv.balanceDue.toLocaleString()} for ${inv.invoiceNumber}.`
                          });
                          refreshAllData();
                          alert(`Payment reminder emailed to ${inv.email}!`);
                        }}
                        className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1 cursor-pointer"
                      >
                        <Send className="w-3.5 h-3.5 text-amber-400" />
                        <span>Send Reminder</span>
                      </button>
                    </div>
                  </div>

                  {/* Financial Metrics */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                    <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                      <span className="text-slate-500 font-mono text-[10px] uppercase">Total Amount</span>
                      <div className="font-mono font-black text-white mt-0.5">€{inv.totalAmount.toLocaleString()}</div>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                      <span className="text-slate-500 font-mono text-[10px] uppercase">Paid</span>
                      <div className="font-mono font-black text-emerald-400 mt-0.5">€{inv.amountPaid.toLocaleString()}</div>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                      <span className="text-slate-500 font-mono text-[10px] uppercase">Balance Due</span>
                      <div className="font-mono font-black text-amber-400 mt-0.5">€{inv.balanceDue.toLocaleString()}</div>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                      <span className="text-slate-500 font-mono text-[10px] uppercase">Due Date</span>
                      <div className="font-mono font-bold text-slate-300 mt-0.5">{inv.dueDate}</div>
                    </div>
                  </div>

                  {/* Installments Table */}
                  {inv.installments && (
                    <div className="space-y-2 pt-2">
                      <span className="text-xs font-mono font-bold text-slate-400 uppercase">Installment Breakdown:</span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 text-xs">
                        {inv.installments.map((inst, idx) => (
                          <div key={inst.id || idx} className={`p-3 rounded-xl border ${
                            inst.status === 'paid' ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-300' : 'bg-slate-950 border-slate-800 text-slate-300'
                          }`}>
                            <div className="font-bold truncate">{inst.label}</div>
                            <div className="flex justify-between items-center mt-1 text-[11px]">
                              <span className="font-mono font-extrabold text-white">€{inst.amount.toLocaleString()}</span>
                              <span className="font-mono font-bold uppercase text-[10px]">{inst.status}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB CONTENT: QUOTES */}
        {activeTab === 'quotes' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-white">Quotations & Flexible Pricing Engine</h3>
                <p className="text-xs text-slate-400">
                  Build custom proposals with manual base project prices, configurable service extras, discounts, and payment plans
                </p>
              </div>

              <button
                onClick={() => {
                  setEditingQuoteForModal(null);
                  setShowNewQuoteModal(true);
                }}
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs shadow-md flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>+ Create New Proposal / Quote</span>
              </button>
            </div>

            <div className="space-y-4">
              {quotes.length === 0 ? (
                <div className="p-12 text-center rounded-3xl bg-slate-900 border border-slate-800 space-y-3">
                  <FileText className="w-8 h-8 text-slate-600 mx-auto" />
                  <h4 className="text-sm font-bold text-white">No Quotations Found</h4>
                  <p className="text-xs text-slate-400">Click "+ Create New Proposal / Quote" to create a flexible quote.</p>
                </div>
              ) : (
                quotes.map((quote) => (
                  <div key={quote.id} className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-cyan-400">{quote.quoteNumber}</span>
                          <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-slate-800 text-cyan-300 border border-slate-700">
                            v{quote.version || 1}
                          </span>
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase ${
                            quote.status === 'accepted' 
                              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' 
                              : quote.status === 'sent'
                              ? 'bg-blue-500/10 text-blue-400 border border-blue-500/30'
                              : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                          }`}>
                            {quote.status}
                          </span>
                        </div>
                        <h4 className="text-base font-bold text-white mt-1">{quote.title}</h4>
                        <p className="text-xs text-slate-400">Client: <strong className="text-slate-200">{quote.customerName}</strong> ({quote.company}) • {quote.email}</p>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <div className="text-xl font-black font-mono text-white">€{quote.totalAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}</div>
                          <span className="text-[11px] text-slate-400 font-mono">Plan: {quote.paymentPlanProposed.replace(/_/g, ' ')}</span>
                        </div>

                        <div className="flex items-center gap-1.5 pl-2 border-l border-slate-800">
                          <button
                            onClick={() => {
                              setEditingQuoteForModal(quote);
                              setShowNewQuoteModal(true);
                            }}
                            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1 cursor-pointer"
                            title="Edit or create new version of this quote"
                          >
                            <Edit3 className="w-3.5 h-3.5 text-cyan-400" />
                            <span>Edit</span>
                          </button>

                          {quote.status === 'draft' && (
                            <button
                              onClick={() => {
                                const updated = { ...quote, status: 'sent' as const };
                                PortalStore.saveQuote(updated);
                                PortalStore.sendEmail({
                                  recipient: quote.email,
                                  subject: `Quotation ${quote.quoteNumber}: ${quote.title}`,
                                  templateType: 'new_quote',
                                  relatedEntityId: quote.id,
                                  previewSnippet: `Hi ${quote.customerName}, your proposal ${quote.quoteNumber} for €${quote.totalAmount.toLocaleString()} is ready.`
                                });
                                refreshAllData();
                                alert(`Quote ${quote.quoteNumber} sent to ${quote.email}!`);
                              }}
                              className="px-3 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold flex items-center gap-1 cursor-pointer"
                            >
                              <Send className="w-3.5 h-3.5" />
                              <span>Send</span>
                            </button>
                          )}

                          {quote.status !== 'accepted' && (
                            <button
                              onClick={() => {
                                const res = PortalStore.convertQuoteToInvoice(quote);
                                if (res) {
                                  refreshAllData();
                                  alert(`Quote converted to Invoice ${res.invoiceNumber} successfully!`);
                                }
                              }}
                              className="px-3 py-1.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 text-xs font-bold flex items-center gap-1 cursor-pointer"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>Convert to Invoice</span>
                            </button>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Breakdown of Deliverables */}
                    <div className="space-y-1.5 text-xs text-slate-300 bg-slate-950/60 p-3.5 rounded-2xl border border-slate-800">
                      <span className="font-mono text-[10px] text-slate-500 uppercase block font-bold">Itemized Scope Breakdown:</span>
                      {quote.items.map((item, idx) => (
                        <div key={idx} className="flex justify-between py-1 border-b border-slate-800/40 last:border-0">
                          <span className="text-slate-300">
                            {item.description} {item.quantity > 1 ? `(x${item.quantity})` : ''}
                            {item.itemType === 'extra' && <span className="ml-1.5 px-1.5 py-0.2 rounded text-[10px] font-mono bg-cyan-500/10 text-cyan-400">Add-on</span>}
                          </span>
                          <span className="font-mono font-semibold text-white">
                            {item.unitPrice === 0 ? <span className="text-emerald-400">€0.00 (Free)</span> : `€${item.total.toLocaleString('en-US', { minimumFractionDigits: 2 })}`}
                          </span>
                        </div>
                      ))}
                      <div className="pt-2 border-t border-slate-800 flex justify-between items-center text-slate-400 font-mono text-[11px]">
                        <span>Subtotal: €{quote.subtotal.toLocaleString()} • Tax: €{quote.vatTotal.toLocaleString()} {quote.discountTotal > 0 ? `• Discount: -€${quote.discountTotal.toLocaleString()}` : ''}</span>
                        <span className="font-bold text-cyan-400 text-xs">Total: €{quote.totalAmount.toLocaleString()}</span>
                      </div>
                    </div>

                    {/* Installments Schedule Preview */}
                    {quote.milestoneInstallments && quote.milestoneInstallments.length > 0 && (
                      <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 text-xs space-y-1.5">
                        <span className="font-mono text-[10px] text-slate-500 uppercase block font-bold">Calculated Installment Schedule ({quote.milestoneInstallments.length} Installments):</span>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                          {quote.milestoneInstallments.map((inst, idx) => (
                            <div key={idx} className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                              <div className="font-bold text-slate-200 truncate">{inst.label}</div>
                              <div className="flex justify-between items-center mt-1">
                                <span className="font-mono text-cyan-400 font-bold">€{inst.amount.toLocaleString()}</span>
                                <span className="text-[10px] text-slate-400">{inst.dueTrigger}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Historical Quote Versioning Archive */}
                    {quote.versionHistory && quote.versionHistory.length > 0 && (
                      <div className="p-3 rounded-xl bg-slate-950/90 border border-slate-800/80 text-xs space-y-2">
                        <div className="flex items-center justify-between text-slate-400 font-mono text-[11px]">
                          <span className="font-bold text-slate-300">Quote Version History ({quote.versionHistory.length} Prior Revisions):</span>
                          <span className="text-[10px] text-cyan-400">Current: v{quote.version || 1}</span>
                        </div>
                        <div className="space-y-1.5">
                          {quote.versionHistory.map((ver, vIdx) => (
                            <div key={vIdx} className="p-2 rounded-lg bg-slate-900/90 border border-slate-800/60 flex items-center justify-between text-[11px]">
                              <div>
                                <span className="font-mono font-bold text-slate-200">{ver.quoteNumber} (v{ver.version})</span>
                                <span className="text-slate-400 ml-2">Archived: {new Date(ver.savedAt).toLocaleDateString()} by {ver.savedBy}</span>
                              </div>
                              <div className="font-mono font-bold text-slate-300">
                                €{ver.totalAmount.toLocaleString()} ({ver.paymentPlanProposed.replace(/_/g, ' ')})
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {quote.status === 'accepted' && (
                      <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-xs text-emerald-300 flex items-center justify-between">
                        <span>Accepted by {quote.acceptedBy} on {new Date(quote.acceptedAt || '').toLocaleDateString()}</span>
                        <span className="font-mono text-[10px]">Verified Audit Signed</span>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* TAB CONTENT: PROJECTS & MILESTONES */}
        {activeTab === 'projects' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-white">Customer Projects & Milestones</h3>
              <p className="text-xs text-slate-400">Track delivery milestones, staging preview links, and launch cutovers</p>
            </div>

            <div className="space-y-4">
              {projects.map((proj) => (
                <div key={proj.id} className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                          {proj.status.replace(/_/g, ' ')}
                        </span>
                        <span className="text-xs font-mono text-slate-400">{proj.domain}</span>
                      </div>
                      <h4 className="text-base font-bold text-white mt-1">{proj.name}</h4>
                      <p className="text-xs text-slate-400">{proj.companyName} • Client: {proj.customerName}</p>
                    </div>

                    <div className="text-right">
                      <div className="text-xl font-black font-mono text-cyan-400">{proj.progressPercent}%</div>
                      <span className="text-[11px] text-slate-400 font-mono">Target: {proj.estimatedCompletionDate}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    {proj.milestones.map((m, idx) => (
                      <div key={m.id || idx} className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-2">
                        <span className="w-5 h-5 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center font-mono text-[10px] text-cyan-400 shrink-0">
                          {idx + 1}
                        </span>
                        <div>
                          <div className="font-bold text-white">{m.title}</div>
                          <div className="text-[11px] text-slate-400 mt-0.5">{m.description}</div>
                          <div className="text-[10px] text-cyan-400 font-mono mt-1">Status: {m.status}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB CONTENT: CHANGE REQUESTS */}
        {activeTab === 'change_requests' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-white">Client Change Requests Pipeline</h3>
              <p className="text-xs text-slate-400">Review client submissions, reply with estimates, and update statuses</p>
            </div>

            <div className="space-y-3">
              {changeRequests.map((cr) => (
                <div key={cr.id} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase ${
                        cr.priority === 'urgent' ? 'bg-rose-500/20 text-rose-300' : 'bg-amber-500/20 text-amber-300'
                      }`}>
                        {cr.priority}
                      </span>
                      <span className="text-xs font-bold text-white">{cr.projectName}</span>
                    </div>
                    <span className="text-[11px] text-slate-500 font-mono">From {cr.customerName}</span>
                  </div>

                  <h4 className="text-sm font-bold text-white">{cr.title}</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">{cr.description}</p>

                  <div className="flex items-center gap-2 pt-2 border-t border-slate-800/80">
                    <button
                      onClick={() => {
                        cr.status = 'in_progress';
                        cr.adminNotes = 'Engineering assigned; changes in development.';
                        PortalStore.saveChangeRequest(cr);
                        refreshAllData();
                      }}
                      className="px-3 py-1 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 font-bold text-xs transition-all cursor-pointer"
                    >
                      Mark In Progress
                    </button>
                    <button
                      onClick={() => {
                        cr.status = 'completed';
                        cr.adminNotes = 'Deployed to staging preview environment.';
                        PortalStore.saveChangeRequest(cr);
                        refreshAllData();
                      }}
                      className="px-3 py-1 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 font-bold text-xs transition-all cursor-pointer"
                    >
                      Mark Completed
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB CONTENT: STRATEGY CALLS */}
        {activeTab === 'calls' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-white">Booked Strategy Calls</h3>
                <p className="text-xs text-slate-400">Consultation calendar strictly configured between 09:00 and 20:00</p>
              </div>

              <button
                onClick={() => setShowAddCallModal(true)}
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-xs shadow-md flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add Scheduled Strategy Call</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {leads.filter(l => l.selectedDate).map((call) => (
                <div key={call.id} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                        {call.meetingStatus || 'Upcoming'}
                      </span>
                      <span className="text-xs text-slate-400 font-mono">{call.timezone || 'CET'}</span>
                    </div>
                    <span className="text-xs font-mono font-bold text-cyan-300">
                      {call.selectedDate} @ {call.selectedTimeSlot}
                    </span>
                  </div>

                  <div>
                    <h4 className="text-sm font-bold text-white">{call.fullName}</h4>
                    <p className="text-xs text-slate-400">{call.company} • {call.email}</p>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300">
                    <div className="font-semibold text-slate-400">Interest: {call.serviceInterest}</div>
                    <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">{call.projectBrief || call.primaryGoal}</p>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <a
                      href={call.meetingLink || 'https://meet.google.com'}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs text-cyan-400 hover:text-cyan-300 font-bold flex items-center gap-1"
                    >
                      <Video className="w-3.5 h-3.5" />
                      <span>Open Meet Bridge</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB CONTENT: CLIENT CRM */}
        {activeTab === 'clients' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-white">Client CRM Dossiers</h3>
              <p className="text-xs text-slate-400">All prospective and active clients with 1-month warranty tracking</p>
            </div>

            <div className="space-y-3">
              {leads.map((client) => (
                <div key={client.id} className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-sm">{client.fullName}</span>
                      <span className="text-slate-400 font-medium">({client.company})</span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase bg-blue-500/10 text-blue-400">
                        {client.clientStage || 'Lead'}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-400 mt-1">
                      {client.email} • {client.phone || '+31 (0) 20 894 3200'} • Budget: {client.budgetRange}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSelectedLead(client)}
                      className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold"
                    >
                      View Dossier
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB CONTENT: AUDIT LOGS */}
        {activeTab === 'audit' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-white">Immutable Security & Financial Audit Logs</h3>
              <p className="text-xs text-slate-400">Timestamped record of all authentication, quote signatures, invoices, and payments</p>
            </div>

            <div className="space-y-2 font-mono text-xs">
              {auditLogs.map((log) => (
                <div key={log.id} className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-cyan-400 font-bold">{log.action}</span>
                      <span className="text-slate-500">[{log.entityType}]</span>
                      <span className="text-slate-300 font-sans">{log.details}</span>
                    </div>
                    <div className="text-[10px] text-slate-500 mt-1">User: {log.userEmail} • IP: {log.ipAddress}</div>
                  </div>
                  <span className="text-[11px] text-slate-500 shrink-0">{new Date(log.timestamp).toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB CONTENT: SETTINGS */}
        {activeTab === 'settings' && (
          <div className="space-y-6 max-w-2xl">
            <div>
              <h3 className="text-lg font-bold text-white">Corporate Invoicing & Bank Details</h3>
              <p className="text-xs text-slate-400">Configured across all auto-generated PDF invoices and tax receipts</p>
            </div>

            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 font-mono mb-1">Company Legal Entity</label>
                  <input
                    type="text"
                    defaultValue={settings.legalEntity}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white font-medium"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-mono mb-1">VAT / BTW Number</label>
                  <input
                    type="text"
                    defaultValue={settings.vatNumber}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 font-mono mb-1">Bank Name</label>
                  <input
                    type="text"
                    defaultValue={settings.bankDetails.bankName}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-mono mb-1">IBAN Account Number</label>
                  <input
                    type="text"
                    defaultValue={settings.bankDetails.iban}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono"
                  />
                </div>
              </div>

              <button
                onClick={() => alert('Corporate invoice settings updated.')}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-xs shadow-md transition-all cursor-pointer"
              >
                Save Corporate Settings
              </button>
            </div>
          </div>
        )}

      </div>

      {/* New Invoice Modal with Flexible Payment Plan Selector */}
      {showNewInvoiceModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto"
          onClick={() => setShowNewInvoiceModal(false)}
        >
          <div 
            className="w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-3xl p-6 sm:p-8 text-white shadow-2xl space-y-5 my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-cyan-400" />
                <span>Create Flexible Invoice & Payment Schedule</span>
              </h3>
              <button onClick={() => setShowNewInvoiceModal(false)} className="p-1 text-slate-400 hover:text-white">
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-mono mb-1">Customer Full Name *</label>
                  <input
                    type="text"
                    value={invCustomer}
                    onChange={(e) => setInvCustomer(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-mono mb-1">Company Name *</label>
                  <input
                    type="text"
                    value={invCompany}
                    onChange={(e) => setInvCompany(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-mono mb-1">Customer Email *</label>
                <input
                  type="email"
                  value={invEmail}
                  onChange={(e) => setInvEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white"
                />
              </div>

              {/* Payment Plan Selector */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-cyan-500/30 space-y-3">
                <label className="block text-cyan-300 font-mono font-bold uppercase">
                  Choose Payment Structure (Mandate 10 & 11):
                </label>
                <select
                  value={invPaymentPlan}
                  onChange={(e) => setInvPaymentPlan(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white font-semibold"
                >
                  <option value="percentage_deposit">Percentage Deposit (e.g. 50% Upfront, 50% Launch)</option>
                  <option value="milestone_installments">Milestone Installments (30% Upfront / 40% Staging / 30% Delivery)</option>
                  <option value="full_upfront">100% Full Payment Upfront</option>
                  <option value="recurring_subscription">Monthly Recurring Retainer (€75/mo Maintenance)</option>
                </select>

                {invPaymentPlan === 'percentage_deposit' && (
                  <div className="flex items-center gap-3 pt-2">
                    <span className="text-slate-400">Upfront Deposit %:</span>
                    <input
                      type="number"
                      min={10}
                      max={90}
                      value={invDepositPct}
                      onChange={(e) => setInvDepositPct(Number(e.target.value))}
                      className="w-20 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-white font-mono text-center"
                    />
                    <span className="text-slate-400 font-mono">Remaining: {100 - invDepositPct}%</span>
                  </div>
                )}
              </div>

              {/* Buttons: SAVE vs SAVE + SEND */}
              <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => handleSaveNewInvoice(false)}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>[ SAVE INVOICE ]</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleSaveNewInvoice(true)}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-lg shadow-cyan-500/20 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>[ SAVE + SEND TO CLIENT ]</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Invoice PDF Printable Modal */}
      <InvoicePDFModal
        isOpen={!!selectedInvoiceForPDF}
        onClose={() => setSelectedInvoiceForPDF(null)}
        invoice={selectedInvoiceForPDF}
        settings={settings}
      />

      {/* Quote Builder Modal */}
      <QuoteBuilderModal
        isOpen={showNewQuoteModal}
        onClose={() => {
          setShowNewQuoteModal(false);
          setEditingQuoteForModal(null);
        }}
        onQuoteSaved={(saved) => {
          refreshAllData();
          alert(`Quote ${saved.quoteNumber} (v${saved.version || 1}) saved successfully!`);
        }}
        initialQuote={editingQuoteForModal}
        customers={customers}
        leads={leads}
        services={services}
      />

    </div>
  );
};
