import React, { useState, useEffect } from 'react';
import { 
  AuthUser, 
  CustomerProject, 
  Quote, 
  Invoice, 
  Installment, 
  PaymentRecord, 
  ChangeRequest, 
  LeadSubmission, 
  CompanySettings 
} from '../types';
import { PortalStore } from '../data/portalStore';
import { InvoicePDFModal } from './InvoicePDFModal';
import { PaymentModal } from './PaymentModal';
import { BrandLogo } from './BrandLogo';
import { 
  LayoutDashboard, 
  Globe, 
  ListChecks, 
  Eye, 
  GitPullRequest, 
  Calendar, 
  FileText, 
  CreditCard, 
  Receipt, 
  Settings, 
  LogOut, 
  ShieldCheck, 
  Sparkles, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  ArrowUpRight, 
  Plus, 
  ExternalLink, 
  Download, 
  Video, 
  Send, 
  ChevronRight, 
  Smartphone, 
  Tablet, 
  Monitor, 
  Maximize2, 
  RefreshCw,
  Building,
  User
} from 'lucide-react';

interface CustomerPortalProps {
  currentUser?: AuthUser | null;
  user?: AuthUser | null;
  onLogout: () => void;
  onNavigateHome?: () => void;
  onNavigate?: (view: any) => void;
  onOpenBookingModal?: () => void;
}

type TabType = 
  | 'dashboard'
  | 'project'
  | 'preview'
  | 'change_requests'
  | 'appointments'
  | 'quotes'
  | 'invoices'
  | 'payments'
  | 'settings';

export const CustomerPortal: React.FC<CustomerPortalProps> = ({
  currentUser: propCurrentUser,
  user: propUser,
  onLogout,
  onNavigateHome,
  onNavigate,
  onOpenBookingModal
}) => {
  // Resolve active customer profile safely with full fallback
  const currentUser: AuthUser = propCurrentUser || propUser || PortalStore.getCurrentUser() || {
    id: 'cust-1',
    email: 'marcus@lumina-aesthetics.com',
    fullName: 'Marcus Sterling',
    role: 'client',
    companyName: 'Lumina Aesthetics Clinic',
    customerId: 'cust-1'
  };

  const handleNavHome = () => {
    if (onNavigateHome) {
      onNavigateHome();
    } else if (onNavigate) {
      onNavigate('home');
    }
  };

  const handleOpenBooking = () => {
    if (onOpenBookingModal) {
      onOpenBookingModal();
    }
  };

  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [projects, setProjects] = useState<CustomerProject[]>([]);
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [payments, setPayments] = useState<PaymentRecord[]>([]);
  const [changeRequests, setChangeRequests] = useState<ChangeRequest[]>([]);
  const [settings, setSettings] = useState<CompanySettings>(PortalStore.getCompanySettings());
  
  // Modals state
  const [selectedInvoiceForPDF, setSelectedInvoiceForPDF] = useState<Invoice | null>(null);
  const [paymentModalData, setPaymentModalData] = useState<{
    isOpen: boolean;
    invoice: Invoice | null;
    installment?: Installment | null;
  }>({ isOpen: false, invoice: null });

  // New Change Request Form State
  const [showNewCRModal, setShowNewCRModal] = useState(false);
  const [newCRTitle, setNewCRTitle] = useState('');
  const [newCRDesc, setNewCRDesc] = useState('');
  const [newCRPriority, setNewCRPriority] = useState<'low' | 'medium' | 'high' | 'urgent'>('medium');

  // Preview iframe viewport
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [previewKey, setPreviewKey] = useState(0);

  // Quote Accept Confirmation Modal
  const [quoteToAccept, setQuoteToAccept] = useState<Quote | null>(null);

  // Load Customer-Specific Data (Strict Anti-IDOR: only queries records for currentUser.customerId)
  const refreshData = () => {
    const custId = currentUser.customerId || 'cust-1';
    setProjects(PortalStore.getProjectsForCustomer(custId));
    setQuotes(PortalStore.getQuotesForCustomer(custId));
    setInvoices(PortalStore.getInvoicesForCustomer(custId));
    setPayments(PortalStore.getPaymentsForCustomer(custId));
    setChangeRequests(PortalStore.getChangeRequestsForCustomer(custId));
    setSettings(PortalStore.getCompanySettings());
  };

  useEffect(() => {
    refreshData();
  }, [currentUser]);

  // Primary project if available
  const primaryProject = projects[0] || {
    id: 'proj-default',
    customerId: currentUser.customerId || 'cust-1',
    customerName: currentUser.fullName,
    companyName: currentUser.companyName || 'Enterprise Client',
    name: `${currentUser.companyName || 'Digital'} Flagship Web Platform`,
    domain: 'preview.brandridge.dev',
    status: 'in_development',
    progressPercent: 65,
    previewUrl: 'https://brandridge.com',
    liveUrl: 'https://brandridge.com',
    startDate: '2026-08-01',
    estimatedCompletionDate: '2026-09-01',
    techStack: ['React', 'Next.js 15', 'Tailwind CSS', 'PostgreSQL'],
    notes: 'Custom digital architecture project.',
    maintenanceActive: true,
    maintenancePlan: '1-Month Free Agency Warranty Included',
    milestones: [
      { id: 'm1', title: 'UX & Architecture Strategy', description: 'Wireframes and technical architecture finalized.', status: 'completed', targetDate: '2026-08-10', completionDate: '2026-08-09' },
      { id: 'm2', title: 'Frontend UI & Responsive Build', description: 'Core pages and responsive design.', status: 'in_progress', targetDate: '2026-08-25' },
      { id: 'm3', title: 'Production Launch & DNS Migration', description: 'Global CDN routing and live cutover.', status: 'pending', targetDate: '2026-09-01' }
    ]
  };

  // Financial aggregates
  const totalBilled = invoices.reduce((sum, inv) => sum + inv.totalAmount, 0);
  const totalPaid = invoices.reduce((sum, inv) => sum + inv.amountPaid, 0);
  const outstandingBalance = invoices.reduce((sum, inv) => sum + inv.balanceDue, 0);

  // Next upcoming pending installment
  const nextPendingInstallment = invoices
    .flatMap(inv => inv.installments.map(inst => ({ ...inst, invoice: inv })))
    .find(inst => inst.status === 'pending');

  // Handle Quote Acceptance
  const handleConfirmAcceptQuote = (quote: Quote) => {
    const res = PortalStore.acceptQuote(quote.id, currentUser.fullName);
    if (res.success) {
      setQuoteToAccept(null);
      refreshData();
      alert(`Quote ${quote.quoteNumber} accepted successfully! Invoice ${res.invoice?.invoiceNumber} has been generated.`);
    }
  };

  // Handle Submit Change Request
  const handleCreateChangeRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCRTitle.trim() || !newCRDesc.trim()) return;

    PortalStore.saveChangeRequest({
      id: `cr-${Date.now()}`,
      projectId: primaryProject.id,
      projectName: primaryProject.name,
      customerId: currentUser.customerId || 'cust-1',
      customerName: currentUser.fullName,
      title: newCRTitle.trim(),
      description: newCRDesc.trim(),
      priority: newCRPriority,
      status: 'new',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });

    setNewCRTitle('');
    setNewCRDesc('');
    setShowNewCRModal(false);
    refreshData();
  };

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'project', label: 'My Website & Status', icon: Globe, badge: `${primaryProject.progressPercent}%` },
    { id: 'preview', label: 'Live Preview', icon: Eye },
    { id: 'change_requests', label: 'Change Requests', icon: GitPullRequest, count: changeRequests.length },
    { id: 'quotes', label: 'Quotes & Proposals', icon: FileText, count: quotes.filter(q => q.status === 'sent').length },
    { id: 'invoices', label: 'Invoices & Billing', icon: CreditCard, count: invoices.filter(i => i.balanceDue > 0).length },
    { id: 'payments', label: 'Payment Receipts', icon: Receipt },
    { id: 'appointments', label: 'Strategy Calls', icon: Calendar },
    { id: 'settings', label: 'Account Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col selection:bg-cyan-500/30">
      
      {/* Top Client Portal Bar */}
      <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800/80 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <BrandLogo size="sm" onClick={handleNavHome} />
            <span className="text-xs font-mono font-bold text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded border border-sky-500/20">
              CLIENT PORTAL
            </span>
          </div>

          <div className="h-4 w-px bg-slate-800 hidden sm:block"></div>

          <div className="flex items-center gap-2 text-xs text-slate-400">
            <Building className="w-3.5 h-3.5 text-cyan-400" />
            <span className="font-semibold text-white">{currentUser.companyName || 'Lumina Aesthetics'}</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleOpenBooking}
            className="px-3.5 py-1.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Book Strategy Call</span>
          </button>

          <div className="flex items-center gap-2 pl-2 border-l border-slate-800">
            <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 overflow-hidden flex items-center justify-center">
              {currentUser.avatar ? (
                <img src={currentUser.avatar} alt={currentUser.fullName} className="w-full h-full object-cover" />
              ) : (
                <User className="w-4 h-4 text-slate-400" />
              )}
            </div>
            <div className="hidden md:block text-left">
              <div className="text-xs font-bold text-white">{currentUser.fullName}</div>
              <div className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                Verified Client
              </div>
            </div>
          </div>

          <button
            onClick={onLogout}
            title="Log Out"
            className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-all cursor-pointer ml-1"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Portal Body */}
      <div className="flex-1 flex flex-col md:flex-row max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 gap-6">
        
        {/* Sidebar Navigation */}
        <aside className="w-full md:w-64 shrink-0 space-y-2">
          {/* Client Mini Dossier Card */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800/90 mb-4">
            <div className="text-[11px] font-mono font-bold text-slate-500 uppercase tracking-wider mb-1">
              Active Contract
            </div>
            <h4 className="text-sm font-bold text-white truncate">{primaryProject.name}</h4>
            <div className="mt-2 flex items-center justify-between text-xs">
              <span className="text-slate-400">Status:</span>
              <span className="px-2 py-0.5 rounded-md bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 font-mono text-[10px] font-bold uppercase">
                {primaryProject.status.replace(/_/g, ' ')}
              </span>
            </div>
            {primaryProject.maintenanceActive && (
              <div className="mt-2 pt-2 border-t border-slate-800 text-[11px] text-emerald-400 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                <span>1-Mo Free Warranty Active</span>
              </div>
            )}
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as TabType)}
                  className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-between transition-all cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-cyan-500/20 to-blue-600/10 text-cyan-300 border border-cyan-500/40 shadow-sm'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-500'}`} />
                    <span>{item.label}</span>
                  </div>

                  {item.badge && (
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-cyan-500/20 text-cyan-300">
                      {item.badge}
                    </span>
                  )}
                  {item.count !== undefined && item.count > 0 && (
                    <span className="w-5 h-5 rounded-full text-[10px] font-mono font-bold bg-blue-500/20 text-blue-300 border border-blue-500/40 flex items-center justify-center">
                      {item.count}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Dynamic Content Pane */}
        <main className="flex-1 min-w-0 space-y-6">
          
          {/* TAB 1: DASHBOARD OVERVIEW */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              
              {/* Welcome Banner */}
              <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-cyan-950/40 border border-slate-800 relative overflow-hidden">
                <div className="relative z-10 max-w-2xl">
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 inline-block mb-3">
                    Project Command Center
                  </span>
                  <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                    Welcome back, {currentUser.fullName.split(' ')[0]}
                  </h1>
                  <p className="text-sm text-slate-300 mt-2 leading-relaxed">
                    Your web architecture is currently in <strong className="text-cyan-400 capitalize">{primaryProject.status.replace(/_/g, ' ')}</strong>. Track real-time progress, review invoices, or request changes below.
                  </p>

                  <div className="mt-5 flex flex-wrap items-center gap-3">
                    <button
                      onClick={() => setActiveTab('preview')}
                      className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 flex items-center gap-1.5 transition-all cursor-pointer"
                    >
                      <Eye className="w-4 h-4" />
                      <span>Launch Live Staging Preview</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => setShowNewCRModal(true)}
                      className="px-4 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-white font-semibold text-xs border border-slate-700 flex items-center gap-1.5 transition-all cursor-pointer"
                    >
                      <Plus className="w-4 h-4 text-cyan-400" />
                      <span>Request a Modification</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Top 3 Stat Metric Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Project Progress */}
                <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800">
                  <div className="flex justify-between items-start text-xs text-slate-400 mb-2">
                    <span>Overall Project Progress</span>
                    <Globe className="w-4 h-4 text-cyan-400" />
                  </div>
                  <div className="text-2xl font-black font-mono text-white mb-2">
                    {primaryProject.progressPercent}%
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-1000"
                      style={{ width: `${primaryProject.progressPercent}%` }}
                    ></div>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-2 flex justify-between">
                    <span>Est. Launch:</span>
                    <strong className="text-slate-200 font-mono">{primaryProject.estimatedCompletionDate}</strong>
                  </div>
                </div>

                {/* Outstanding Balance */}
                <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800">
                  <div className="flex justify-between items-start text-xs text-slate-400 mb-2">
                    <span>Outstanding Invoices</span>
                    <CreditCard className="w-4 h-4 text-amber-400" />
                  </div>
                  <div className="text-2xl font-black font-mono text-white mb-1">
                    €{outstandingBalance.toLocaleString()}
                  </div>
                  <div className="text-[11px] text-slate-400 flex items-center justify-between mt-3 pt-2 border-t border-slate-800">
                    <span>Total Paid to Date:</span>
                    <strong className="text-emerald-400 font-mono">€{totalPaid.toLocaleString()}</strong>
                  </div>
                </div>

                {/* Open Change Requests */}
                <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800">
                  <div className="flex justify-between items-start text-xs text-slate-400 mb-2">
                    <span>Active Change Requests</span>
                    <GitPullRequest className="w-4 h-4 text-purple-400" />
                  </div>
                  <div className="text-2xl font-black font-mono text-white mb-1">
                    {changeRequests.filter(cr => cr.status !== 'completed' && cr.status !== 'rejected').length}
                  </div>
                  <div className="text-[11px] text-slate-400 flex items-center justify-between mt-3 pt-2 border-t border-slate-800">
                    <span>Total Submitted:</span>
                    <strong className="text-slate-200 font-mono">{changeRequests.length}</strong>
                  </div>
                </div>
              </div>

              {/* Next Action Installment Alert (if pending) */}
              {nextPendingInstallment && (
                <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-500/10 via-slate-900 to-slate-900 border border-amber-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">Upcoming Payment Schedule</h4>
                      <p className="text-xs text-slate-300 mt-0.5">
                        {nextPendingInstallment.label} due on <strong className="text-amber-300 font-mono">{nextPendingInstallment.dueDate}</strong> for <strong className="text-white font-mono">{nextPendingInstallment.invoice.invoiceNumber}</strong>.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                    <span className="text-lg font-black font-mono text-emerald-400">
                      €{nextPendingInstallment.amount.toLocaleString()}
                    </span>
                    <button
                      onClick={() => setPaymentModalData({
                        isOpen: true,
                        invoice: nextPendingInstallment.invoice,
                        installment: nextPendingInstallment
                      })}
                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs shadow-md transition-all cursor-pointer"
                    >
                      Pay Now
                    </button>
                  </div>
                </div>
              )}

              {/* Two Column Grid: Milestones & Recent Invoices */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* Milestones Card */}
                <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      <ListChecks className="w-4 h-4 text-cyan-400" />
                      <span>Project Milestones</span>
                    </h3>
                    <button 
                      onClick={() => setActiveTab('project')}
                      className="text-xs text-cyan-400 hover:text-cyan-300 font-medium flex items-center gap-1 cursor-pointer"
                    >
                      <span>View All</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="space-y-3">
                    {primaryProject.milestones.map((m, i) => (
                      <div 
                        key={m.id || i}
                        className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800/80 flex items-start gap-3"
                      >
                        <div className="mt-0.5">
                          {m.status === 'completed' ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                          ) : m.status === 'in_progress' ? (
                            <Clock className="w-4 h-4 text-cyan-400 shrink-0 animate-pulse" />
                          ) : (
                            <div className="w-4 h-4 rounded-full border border-slate-600 shrink-0"></div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h5 className="text-xs font-bold text-white truncate">{m.title}</h5>
                            <span className={`text-[10px] font-mono font-bold uppercase px-1.5 py-0.5 rounded ${
                              m.status === 'completed' ? 'bg-emerald-500/10 text-emerald-400' : m.status === 'in_progress' ? 'bg-cyan-500/10 text-cyan-400' : 'bg-slate-800 text-slate-400'
                            }`}>
                              {m.status.replace('_', ' ')}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-2">{m.description}</p>
                          <div className="text-[10px] text-slate-500 font-mono mt-1">Target: {m.targetDate}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Invoices List Preview */}
                <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-cyan-400" />
                      <span>Recent Invoices & Status</span>
                    </h3>
                    <button 
                      onClick={() => setActiveTab('invoices')}
                      className="text-xs text-cyan-400 hover:text-cyan-300 font-medium flex items-center gap-1 cursor-pointer"
                    >
                      <span>Billing Portal</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="space-y-3">
                    {invoices.length === 0 ? (
                      <div className="text-center py-6 text-xs text-slate-500">No invoices generated yet.</div>
                    ) : (
                      invoices.map((inv) => (
                        <div 
                          key={inv.id}
                          className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800/80 flex items-center justify-between gap-3"
                        >
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-mono font-bold text-white">{inv.invoiceNumber}</span>
                              <span className={`text-[10px] font-mono font-bold uppercase px-1.5 py-0.5 rounded ${
                                inv.status === 'paid' ? 'bg-emerald-500/10 text-emerald-400' : inv.status === 'partially_paid' ? 'bg-amber-500/10 text-amber-400' : 'bg-blue-500/10 text-blue-400'
                              }`}>
                                {inv.status.replace('_', ' ')}
                              </span>
                            </div>
                            <div className="text-[11px] text-slate-400 mt-1">
                              Total: <strong className="text-slate-200 font-mono">€{inv.totalAmount.toLocaleString()}</strong> • Due: <span className="font-mono">{inv.dueDate}</span>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => setSelectedInvoiceForPDF(inv)}
                              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-all cursor-pointer"
                              title="View & Download PDF"
                            >
                              <Download className="w-3.5 h-3.5" />
                            </button>
                            {inv.balanceDue > 0 && (
                              <button
                                onClick={() => setPaymentModalData({ isOpen: true, invoice: inv })}
                                className="px-3 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-all cursor-pointer"
                              >
                                Pay
                              </button>
                            )}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* TAB 2: MY WEBSITE & PROJECT STATUS */}
          {activeTab === 'project' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                <div>
                  <h2 className="text-xl font-bold text-white">Project Specifications & Architecture</h2>
                  <p className="text-xs text-slate-400">Detailed deliverables, milestones, and technical stack</p>
                </div>
                <button
                  onClick={() => setActiveTab('preview')}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <Eye className="w-4 h-4" />
                  <span>Open Interactive Staging</span>
                </button>
              </div>

              {/* Project Details Sheet */}
              <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800">
                    <span className="text-[11px] font-mono text-slate-500 uppercase">Target Domain</span>
                    <h5 className="text-sm font-bold text-white mt-1 font-mono">{primaryProject.domain}</h5>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800">
                    <span className="text-[11px] font-mono text-slate-500 uppercase">Start Date</span>
                    <h5 className="text-sm font-bold text-white mt-1 font-mono">{primaryProject.startDate}</h5>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800">
                    <span className="text-[11px] font-mono text-slate-500 uppercase">Target Launch</span>
                    <h5 className="text-sm font-bold text-white mt-1 font-mono">{primaryProject.estimatedCompletionDate}</h5>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800">
                    <span className="text-[11px] font-mono text-slate-500 uppercase">Warranty & Care</span>
                    <h5 className="text-xs font-bold text-emerald-400 mt-1">{primaryProject.maintenancePlan || '1-Mo Free Included'}</h5>
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mb-2">
                    Technology Stack & Performance Engine
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {primaryProject.techStack.map((tech, i) => (
                      <span key={i} className="px-3 py-1 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-cyan-300">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mb-3">
                    Milestone Progress ({primaryProject.progressPercent}% Complete)
                  </h4>
                  <div className="space-y-3">
                    {primaryProject.milestones.map((m, idx) => (
                      <div key={m.id || idx} className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 flex items-start gap-4">
                        <div className="w-8 h-8 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center font-mono font-bold text-xs text-cyan-400 shrink-0">
                          {idx + 1}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h5 className="text-sm font-bold text-white">{m.title}</h5>
                            <span className={`text-xs font-mono font-bold uppercase px-2 py-0.5 rounded-full ${
                              m.status === 'completed' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' : m.status === 'in_progress' ? 'bg-cyan-500/10 text-cyan-300 border border-cyan-500/30' : 'bg-slate-800 text-slate-400'
                            }`}>
                              {m.status.replace('_', ' ')}
                            </span>
                          </div>
                          <p className="text-xs text-slate-300 mt-1 leading-relaxed">{m.description}</p>
                          <div className="text-[11px] text-slate-500 font-mono mt-2 flex items-center gap-4">
                            <span>Target Date: <strong className="text-slate-300">{m.targetDate}</strong></span>
                            {m.completionDate && <span>Completed: <strong className="text-emerald-400">{m.completionDate}</strong></span>}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: LIVE PREVIEW SYSTEM */}
          {activeTab === 'preview' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
                <div>
                  <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    <Eye className="w-5 h-5 text-cyan-400" />
                    <span>Private Staging Sandbox</span>
                  </h2>
                  <p className="text-xs text-slate-400">Interactive live preview of {primaryProject.name}</p>
                </div>

                <div className="flex items-center gap-2 bg-slate-900 p-1 rounded-2xl border border-slate-800">
                  <button
                    onClick={() => setPreviewDevice('desktop')}
                    className={`p-2 rounded-xl text-xs font-semibold flex items-center gap-1 cursor-pointer transition-all ${
                      previewDevice === 'desktop' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                    }`}
                    title="Desktop 1920x1080"
                  >
                    <Monitor className="w-4 h-4" />
                    <span className="hidden sm:inline">Desktop</span>
                  </button>

                  <button
                    onClick={() => setPreviewDevice('tablet')}
                    className={`p-2 rounded-xl text-xs font-semibold flex items-center gap-1 cursor-pointer transition-all ${
                      previewDevice === 'tablet' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                    }`}
                    title="Tablet 768px"
                  >
                    <Tablet className="w-4 h-4" />
                    <span className="hidden sm:inline">Tablet</span>
                  </button>

                  <button
                    onClick={() => setPreviewDevice('mobile')}
                    className={`p-2 rounded-xl text-xs font-semibold flex items-center gap-1 cursor-pointer transition-all ${
                      previewDevice === 'mobile' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                    }`}
                    title="Mobile 390px"
                  >
                    <Smartphone className="w-4 h-4" />
                    <span className="hidden sm:inline">Mobile</span>
                  </button>

                  <button
                    onClick={() => setPreviewKey(k => k + 1)}
                    className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-all cursor-pointer"
                    title="Reload Preview Frame"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Preview Container */}
              <div className="flex justify-center p-4 bg-slate-950 rounded-3xl border border-slate-800 overflow-x-auto min-h-[550px]">
                <div 
                  className={`transition-all duration-300 rounded-2xl overflow-hidden border-2 border-slate-700/80 bg-white shadow-2xl flex flex-col ${
                    previewDevice === 'desktop' ? 'w-full h-[650px]' : previewDevice === 'tablet' ? 'w-[768px] h-[650px]' : 'w-[390px] h-[650px]'
                  }`}
                >
                  {/* Browser Mockup Top Bar */}
                  <div className="bg-slate-900 px-4 py-2 border-b border-slate-800 flex items-center gap-2 text-xs font-mono text-slate-400">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                    </div>
                    <div className="flex-1 mx-3 px-3 py-1 rounded-md bg-slate-950 text-[11px] text-slate-300 border border-slate-800 truncate text-center">
                      https://preview.{primaryProject.domain}/staging-v2
                    </div>
                    <span className="text-[10px] text-emerald-400 font-bold uppercase">SSL Secured</span>
                  </div>

                  {/* Staging Render Preview View */}
                  <div className="flex-1 bg-slate-950 text-white overflow-y-auto p-6 flex flex-col items-center justify-center text-center space-y-4">
                    <div className="w-16 h-16 rounded-2xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400 animate-pulse">
                      <Globe className="w-8 h-8" />
                    </div>
                    <div className="max-w-md space-y-2">
                      <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                        Active Staging Build v2.4.1
                      </span>
                      <h3 className="text-xl font-bold text-white">{primaryProject.name}</h3>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        Sub-second Core Web Vitals pre-configured. Live appointment engine and checkout modules bound to secure sandbox.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-left text-xs font-mono space-y-1 w-full max-w-sm text-slate-400">
                      <div>Build Status: <strong className="text-emerald-400">READY (200 OK)</strong></div>
                      <div>Lighthouse Speed: <strong className="text-cyan-400">99 / 100 Mobile</strong></div>
                      <div>SSL Certificate: <strong className="text-emerald-400">Active (TLS 1.3)</strong></div>
                    </div>

                    <button
                      onClick={() => setShowNewCRModal(true)}
                      className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 font-semibold text-xs border border-cyan-500/30 flex items-center gap-1.5 transition-all cursor-pointer"
                    >
                      <GitPullRequest className="w-3.5 h-3.5" />
                      <span>Submit Modification on this Preview</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: CHANGE REQUESTS */}
          {activeTab === 'change_requests' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                <div>
                  <h2 className="text-xl font-bold text-white">Change Requests & Feedback</h2>
                  <p className="text-xs text-slate-400">Submit tweaks, content changes, or feature enhancements</p>
                </div>
                <button
                  onClick={() => setShowNewCRModal(true)}
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>New Change Request</span>
                </button>
              </div>

              <div className="space-y-3">
                {changeRequests.length === 0 ? (
                  <div className="p-12 text-center rounded-3xl bg-slate-900 border border-slate-800 space-y-3">
                    <GitPullRequest className="w-8 h-8 text-slate-600 mx-auto" />
                    <h4 className="text-sm font-bold text-white">No Change Requests Submitted</h4>
                    <p className="text-xs text-slate-400">Need adjustments to your copy, layout, or integrations? Click New Change Request above.</p>
                  </div>
                ) : (
                  changeRequests.map((cr) => (
                    <div key={cr.id} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase ${
                            cr.priority === 'urgent' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40' : cr.priority === 'high' ? 'bg-amber-500/20 text-amber-300' : 'bg-slate-800 text-slate-400'
                          }`}>
                            Priority: {cr.priority}
                          </span>
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase ${
                            cr.status === 'completed' ? 'bg-emerald-500/20 text-emerald-300' : cr.status === 'in_progress' ? 'bg-cyan-500/20 text-cyan-300' : 'bg-slate-800 text-slate-300'
                          }`}>
                            Status: {cr.status.replace('_', ' ')}
                          </span>
                        </div>
                        <span className="text-[11px] text-slate-500 font-mono">
                          Submitted: {new Date(cr.createdAt).toLocaleDateString()}
                        </span>
                      </div>

                      <h4 className="text-sm font-bold text-white">{cr.title}</h4>
                      <p className="text-xs text-slate-300 leading-relaxed">{cr.description}</p>

                      {cr.adminNotes && (
                        <div className="p-3 rounded-xl bg-slate-950 border border-cyan-500/20 text-xs text-cyan-300 flex items-start gap-2">
                          <span className="font-bold text-cyan-400 shrink-0">Admin Reply:</span>
                          <span>{cr.adminNotes}</span>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* TAB 5: QUOTES & PROPOSALS */}
          {activeTab === 'quotes' && (
            <div className="space-y-6">
              <div className="pb-4 border-b border-slate-800">
                <h2 className="text-xl font-bold text-white">Quotations & Scope of Work</h2>
                <p className="text-xs text-slate-400">Review project proposals and confirm contracts online with 1 click</p>
              </div>

              <div className="space-y-4">
                {quotes.length === 0 ? (
                  <div className="p-12 text-center rounded-3xl bg-slate-900 border border-slate-800 space-y-3">
                    <FileText className="w-8 h-8 text-slate-600 mx-auto" />
                    <h4 className="text-sm font-bold text-white">No Quotations Pending</h4>
                    <p className="text-xs text-slate-400">All proposals have been signed or your active scope is underway.</p>
                  </div>
                ) : (
                  quotes.map((quote) => (
                    <div key={quote.id} className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-5">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-4 border-b border-slate-800">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-mono font-bold text-cyan-400">{quote.quoteNumber}</span>
                            <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-slate-800 text-cyan-300 border border-slate-700">
                              v{quote.version || 1}
                            </span>
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase ${
                              quote.status === 'accepted' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' : 'bg-blue-500/10 text-blue-400 border border-blue-500/30'
                            }`}>
                              {quote.status}
                            </span>
                          </div>
                          <h3 className="text-base font-bold text-white mt-1">{quote.title}</h3>
                        </div>

                        <div className="text-right">
                          <div className="text-xl font-black font-mono text-white">
                            €{quote.totalAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                          </div>
                          <span className="text-[11px] text-slate-400 font-mono">Expires: {quote.expiresAt}</span>
                        </div>
                      </div>

                      {/* Items */}
                      <div className="space-y-2">
                        <span className="text-xs font-mono font-bold text-slate-400 uppercase">Itemized Deliverables & Add-ons:</span>
                        <div className="divide-y divide-slate-800/60 bg-slate-950/60 p-4 rounded-2xl border border-slate-800">
                          {quote.items.map((item, idx) => (
                            <div key={idx} className="py-2 flex justify-between items-center text-xs">
                              <div>
                                <span className="text-slate-200 font-semibold">{item.description}</span>
                                {item.quantity > 1 && <span className="text-slate-400 font-mono text-[11px] ml-1.5">(x{item.quantity})</span>}
                                {item.itemType === 'extra' && (
                                  <span className="ml-2 px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                                    Add-on
                                  </span>
                                )}
                              </div>
                              <span className="font-mono text-slate-100 font-bold">
                                {item.unitPrice === 0 ? (
                                  <span className="text-emerald-400">€0.00 (Included Free)</span>
                                ) : (
                                  `€${item.total.toLocaleString('en-US', { minimumFractionDigits: 2 })}`
                                )}
                              </span>
                            </div>
                          ))}

                          {/* Financial Summary */}
                          <div className="pt-3 mt-2 border-t border-slate-800 space-y-1 text-xs text-slate-400">
                            <div className="flex justify-between">
                              <span>Subtotal</span>
                              <span className="font-mono text-slate-200">€{quote.subtotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                            </div>
                            {quote.discountTotal > 0 && (
                              <div className="flex justify-between text-emerald-400 font-semibold">
                                <span>Discount</span>
                                <span className="font-mono">-€{quote.discountTotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                              </div>
                            )}
                            <div className="flex justify-between">
                              <span>VAT / Tax ({quote.vatRate || 21}%)</span>
                              <span className="font-mono text-slate-200">€{quote.vatTotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                            </div>
                            <div className="flex justify-between pt-1 border-t border-slate-800 text-sm font-black text-white">
                              <span>Final Total Amount</span>
                              <span className="font-mono text-cyan-400">€{quote.totalAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Terms & Payment Plan Preview */}
                      <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-xs space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="font-semibold text-slate-300">
                            Payment Schedule ({quote.milestoneInstallments?.length || 1} Stage{(quote.milestoneInstallments?.length || 1) > 1 ? 's' : ''}): <span className="capitalize text-cyan-400 font-mono">{quote.paymentPlanProposed.replace(/_/g, ' ')}</span>
                          </div>
                          <span className="text-[10px] font-mono text-slate-500 uppercase">Calculated on Total €{quote.totalAmount.toLocaleString()}</span>
                        </div>

                        {quote.milestoneInstallments && quote.milestoneInstallments.length > 0 && (
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
                            {quote.milestoneInstallments.map((inst, idx) => (
                              <div key={idx} className="p-3 rounded-xl bg-slate-900 border border-slate-800 relative overflow-hidden">
                                <div className="flex items-center justify-between text-[11px] pb-1 border-b border-slate-800/60 mb-1.5">
                                  <span className="font-mono font-bold text-slate-400">Step {idx + 1}</span>
                                  <span className="px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-400 font-mono text-[10px] font-bold">
                                    {inst.percentage}%
                                  </span>
                                </div>
                                <div className="font-bold text-slate-200 text-xs truncate">{inst.label}</div>
                                <div className="flex justify-between items-center mt-2 pt-1 border-t border-slate-800/40">
                                  <span className="font-mono font-black text-cyan-400 text-sm">€{inst.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                                  <span className="text-[10px] text-slate-400 font-mono truncate max-w-[120px]">{inst.dueTrigger}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                        <p className="text-slate-400 leading-relaxed text-[11px] pt-1">{quote.terms}</p>
                      </div>

                      {/* Action */}
                      <div className="flex items-center justify-between pt-2">
                        {quote.status === 'accepted' ? (
                          <div className="text-xs text-emerald-400 flex items-center gap-1.5 font-semibold">
                            <CheckCircle2 className="w-4 h-4" />
                            <span>Accepted on {new Date(quote.acceptedAt || '').toLocaleDateString()} by {quote.acceptedBy}</span>
                          </div>
                        ) : (
                          <button
                            onClick={() => handleConfirmAcceptQuote(quote)}
                            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/20 flex items-center gap-1.5 transition-all cursor-pointer"
                          >
                            <CheckCircle2 className="w-4 h-4" />
                            <span>Accept Quote & Generate Payment Schedule</span>
                          </button>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* TAB 6: INVOICES & BILLING */}
          {activeTab === 'invoices' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                <div>
                  <h2 className="text-xl font-bold text-white">Invoices & Flexible Payment Plans</h2>
                  <p className="text-xs text-slate-400">Download official tax invoices and fulfill scheduled installments</p>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-400">Outstanding Balance:</span>
                  <div className="text-xl font-black font-mono text-emerald-400">€{outstandingBalance.toLocaleString()}</div>
                </div>
              </div>

              <div className="space-y-6">
                {invoices.map((inv) => (
                  <div key={inv.id} className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-5">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-base font-mono font-extrabold text-white">{inv.invoiceNumber}</span>
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase ${
                            inv.status === 'paid' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' : inv.status === 'partially_paid' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30' : 'bg-blue-500/10 text-blue-400 border border-blue-500/30'
                          }`}>
                            {inv.status.replace('_', ' ')}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 mt-1">{inv.projectName}</p>
                      </div>

                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => setSelectedInvoiceForPDF(inv)}
                          className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
                        >
                          <Download className="w-3.5 h-3.5 text-cyan-400" />
                          <span>Download / Print PDF</span>
                        </button>
                        {inv.balanceDue > 0 && (
                          <button
                            onClick={() => setPaymentModalData({ isOpen: true, invoice: inv })}
                            className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs shadow-md transition-all cursor-pointer"
                          >
                            Pay Full Remaining (€{inv.balanceDue.toLocaleString()})
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Financial Summary */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                      <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
                        <span className="text-slate-500 font-mono text-[10px] uppercase">Total Invoiced</span>
                        <div className="font-mono font-bold text-white mt-0.5">€{inv.totalAmount.toLocaleString()}</div>
                      </div>
                      <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
                        <span className="text-slate-500 font-mono text-[10px] uppercase">Paid to Date</span>
                        <div className="font-mono font-bold text-emerald-400 mt-0.5">€{inv.amountPaid.toLocaleString()}</div>
                      </div>
                      <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
                        <span className="text-slate-500 font-mono text-[10px] uppercase">Remaining Due</span>
                        <div className="font-mono font-bold text-amber-400 mt-0.5">€{inv.balanceDue.toLocaleString()}</div>
                      </div>
                      <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
                        <span className="text-slate-500 font-mono text-[10px] uppercase">Due Date</span>
                        <div className="font-mono font-bold text-slate-300 mt-0.5">{inv.dueDate}</div>
                      </div>
                    </div>

                    {/* Installments Breakdown */}
                    {inv.installments && inv.installments.length > 0 && (
                      <div className="space-y-3 pt-2">
                        <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
                          Installment Payment Plan:
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {inv.installments.map((inst, idx) => (
                            <div 
                              key={inst.id || idx}
                              className={`p-4 rounded-2xl border text-xs space-y-2 ${
                                inst.status === 'paid' ? 'bg-emerald-950/20 border-emerald-500/30' : 'bg-slate-950/80 border-slate-800'
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <span className="font-bold text-white">{inst.label}</span>
                                <span className="font-mono font-black text-emerald-400 text-sm">€{inst.amount.toLocaleString()}</span>
                              </div>
                              <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-800/80">
                                <span>Due: <strong className="font-mono text-slate-300">{inst.dueDate}</strong></span>
                                {inst.status === 'paid' ? (
                                  <span className="text-emerald-400 font-bold flex items-center gap-1">
                                    <CheckCircle2 className="w-3.5 h-3.5" />
                                    <span>PAID</span>
                                  </span>
                                ) : (
                                  <button
                                    onClick={() => setPaymentModalData({ isOpen: true, invoice: inv, installment: inst })}
                                    className="px-3 py-1 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-all cursor-pointer"
                                  >
                                    Pay Installment
                                  </button>
                                )}
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

          {/* TAB 7: PAYMENTS & RECEIPTS */}
          {activeTab === 'payments' && (
            <div className="space-y-6">
              <div className="pb-4 border-b border-slate-800">
                <h2 className="text-xl font-bold text-white">Payment Receipts & History</h2>
                <p className="text-xs text-slate-400">Immutable ledger of verified transactions and settlement receipts</p>
              </div>

              <div className="space-y-3">
                {payments.length === 0 ? (
                  <div className="p-12 text-center rounded-3xl bg-slate-900 border border-slate-800">
                    <Receipt className="w-8 h-8 text-slate-600 mx-auto mb-2" />
                    <p className="text-xs text-slate-400">No settled payments recorded yet.</p>
                  </div>
                ) : (
                  payments.map((p) => (
                    <div key={p.id} className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-white">{p.invoiceNumber}</span>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                            Settled ({p.paymentMethod})
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-400 font-mono mt-1">Tx: {p.providerTxId} • Date: {new Date(p.paidAt).toLocaleString()}</div>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="text-base font-black font-mono text-emerald-400">€{p.amount.toLocaleString()}</span>
                        <a
                          href={p.receiptUrl || '#'}
                          target="_blank"
                          rel="noreferrer"
                          className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 font-medium text-[11px] flex items-center gap-1 transition-all"
                        >
                          <ExternalLink className="w-3 h-3" />
                          <span>Receipt</span>
                        </a>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* TAB 8: APPOINTMENTS & STRATEGY CALLS */}
          {activeTab === 'appointments' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                <div>
                  <h2 className="text-xl font-bold text-white">Consultations & Strategy Sessions</h2>
                  <p className="text-xs text-slate-400">Join your upcoming discovery or review meetings via Google Meet</p>
                </div>
                <button
                  onClick={handleOpenBooking}
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs shadow-md flex items-center gap-1.5 cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Schedule Another Call</span>
                </button>
              </div>

              <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
                <div className="p-4 rounded-2xl bg-gradient-to-r from-cyan-950/40 to-slate-950 border border-cyan-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shrink-0">
                      <Video className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">Weekly Architectural Walkthrough</h4>
                      <p className="text-xs text-slate-300 mt-0.5">30-Minute Video Consultation with BrandRidge Leadership</p>
                      <div className="text-[11px] text-cyan-400 font-mono mt-1">Google Meet High-Definition Bridge</div>
                    </div>
                  </div>

                  <a
                    href="https://meet.google.com/new"
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-all shadow-md"
                  >
                    <Video className="w-3.5 h-3.5" />
                    <span>Join Google Meet</span>
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* TAB 9: ACCOUNT SETTINGS */}
          {activeTab === 'settings' && (
            <div className="space-y-6">
              <div className="pb-4 border-b border-slate-800">
                <h2 className="text-xl font-bold text-white">Client Profile & Billing Address</h2>
                <p className="text-xs text-slate-400">Ensure your legal invoicing and VAT information is accurate</p>
              </div>

              <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 max-w-2xl">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block text-slate-400 font-mono mb-1">Company Legal Name</label>
                    <input 
                      type="text" 
                      defaultValue={currentUser.companyName || 'Lumina Aesthetics Clinic'} 
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 font-mono mb-1">VAT / Tax Registration Number</label>
                    <input 
                      type="text" 
                      defaultValue="US-CA-941084920" 
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono"
                    />
                  </div>
                </div>

                <div className="text-xs">
                  <label className="block text-slate-400 font-mono mb-1">Registered Billing Street</label>
                  <input 
                    type="text" 
                    defaultValue="450 Sutter Street, Suite 1200" 
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white"
                  />
                </div>

                <button 
                  onClick={() => alert('Account billing profile updated.')}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-xs shadow-md transition-all cursor-pointer"
                >
                  Save Account Changes
                </button>
              </div>
            </div>
          )}

        </main>
      </div>

      {/* New Change Request Modal */}
      {showNewCRModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md"
          onClick={() => setShowNewCRModal(false)}
        >
          <div 
            className="w-full max-w-lg bg-slate-900 border border-slate-700/80 rounded-3xl p-6 text-white shadow-2xl space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <GitPullRequest className="w-4 h-4 text-cyan-400" />
                <span>Submit Change Request</span>
              </h3>
              <button onClick={() => setShowNewCRModal(false)} className="p-1 rounded-lg text-slate-400 hover:text-white">
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateChangeRequest} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-mono mb-1">Change Request Title *</label>
                <input
                  type="text"
                  required
                  value={newCRTitle}
                  onChange={(e) => setNewCRTitle(e.target.value)}
                  placeholder="e.g. Update Hero Section Headline and Add Trust Badges"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white font-medium focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-mono mb-1">Priority Level</label>
                <select
                  value={newCRPriority}
                  onChange={(e) => setNewCRPriority(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white font-medium"
                >
                  <option value="low">Low (Standard Backlog)</option>
                  <option value="medium">Medium (Next Sprint)</option>
                  <option value="high">High (Urgent Attention)</option>
                  <option value="urgent">Urgent (Blocking Live Launch)</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-mono mb-1">Detailed Description & Specifications *</label>
                <textarea
                  required
                  rows={4}
                  value={newCRDesc}
                  onChange={(e) => setNewCRDesc(e.target.value)}
                  placeholder="Please specify exact copy, imagery references, or functionality adjustments..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white font-medium focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowNewCRModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold"
                >
                  Submit Change Request
                </button>
              </div>
            </form>
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

      {/* Payment Processing Modal */}
      <PaymentModal
        isOpen={paymentModalData.isOpen}
        onClose={() => setPaymentModalData({ isOpen: false, invoice: null })}
        invoice={paymentModalData.invoice}
        installment={paymentModalData.installment}
        onPaymentSuccess={() => {
          refreshData();
        }}
      />

    </div>
  );
};
