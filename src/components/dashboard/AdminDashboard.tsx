import React, { useState, useEffect, useMemo } from 'react';
import {
  LayoutDashboard,
  Briefcase,
  CalendarCheck2,
  Users,
  MessageSquareText,
  Sliders,
  LogOut,
  Plus,
  Search,
  Filter,
  CheckCircle2,
  XCircle,
  Clock,
  ExternalLink,
  Trash2,
  Edit,
  Mail,
  Phone,
  Globe,
  Building,
  Calendar,
  AlertCircle,
  Check,
  ChevronRight,
  Eye,
  Send,
  Shield,
  FileText,
  ArrowUpRight,
  RefreshCw,
  Sparkles,
  Key
} from 'lucide-react';
import { BrandLogo } from '../BrandLogo';
import { Vacancy, ContactMessage, LeadSubmission, CustomerProfile, CompanySettings } from '../../types';
import { PortalStore } from '../../data/portalStore';

interface AdminDashboardProps {
  onLogout: () => void;
  onNavigateHome: () => void;
  leads: LeadSubmission[];
  onUpdateLeadStatus: (leadId: string, status: LeadSubmission['meetingStatus']) => void;
  onUpdateLeadsList?: (updated: LeadSubmission[]) => void;
}

type DashboardTab = 'overview' | 'vacancies' | 'appointments' | 'customers' | 'messages' | 'settings';

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  onLogout,
  onNavigateHome,
  leads,
  onUpdateLeadStatus,
  onUpdateLeadsList
}) => {
  const [activeTab, setActiveTab] = useState<DashboardTab>('overview');
  const [sessionUser, setSessionUser] = useState<{ username: string; role: string } | null>(null);
  const [isVerifying, setIsVerifying] = useState(true);

  // Vacancies state
  const [vacancies, setVacancies] = useState<Vacancy[]>(() => PortalStore.getVacancies());
  const [vacancyModalOpen, setVacancyModalOpen] = useState(false);
  const [editingVacancy, setEditingVacancy] = useState<Vacancy | null>(null);
  const [vacancyFilterDept, setVacancyFilterDept] = useState<string>('all');
  const [vacancySearch, setVacancySearch] = useState('');

  // Appointments state
  const [appointmentSearch, setAppointmentSearch] = useState('');
  const [appointmentStatusFilter, setAppointmentStatusFilter] = useState<string>('all');
  const [appointmentDateFilter, setAppointmentDateFilter] = useState<string>('all');
  const [selectedAppointment, setSelectedAppointment] = useState<LeadSubmission | null>(null);

  // Customers state
  const [customers, setCustomers] = useState<CustomerProfile[]>(() => PortalStore.getCustomers());
  const [customerSearch, setCustomerSearch] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerProfile | null>(null);

  // Messages state
  const [messages, setMessages] = useState<ContactMessage[]>(() => PortalStore.getContactMessages());
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [messageFilter, setMessageFilter] = useState<'all' | 'unread' | 'read'>('all');

  // Settings state
  const [settings, setSettings] = useState<CompanySettings>(() => PortalStore.getCompanySettings());
  const [settingsSavedNotice, setSettingsSavedNotice] = useState(false);

  // Vacancy Form State
  const [vacancyForm, setVacancyForm] = useState({
    title: '',
    department: 'Engineering',
    location: 'Amsterdam / Remote',
    type: 'full-time' as Vacancy['type'],
    experienceLevel: 'senior' as Vacancy['experienceLevel'],
    salaryRange: '',
    description: '',
    requirements: '',
    responsibilities: '',
    isPublished: true
  });

  // Verify authentication on mount
  useEffect(() => {
    const token = PortalStore.getAdminToken();
    if (!token) {
      onLogout();
      return;
    }

    fetch('/api/admin/verify', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.authenticated) {
          setSessionUser(data.user);
          setIsVerifying(false);
        } else {
          PortalStore.clearAdminToken();
          onLogout();
        }
      })
      .catch(() => {
        PortalStore.clearAdminToken();
        onLogout();
      });
  }, [onLogout]);

  // Handle Logout
  const handleLogoutAction = async () => {
    const token = PortalStore.getAdminToken();
    if (token) {
      try {
        await fetch('/api/admin/logout', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
      } catch (e) {
        // ignore
      }
    }
    PortalStore.clearAdminToken();
    onLogout();
  };

  // Vacancy Handlers
  const handleOpenAddVacancy = () => {
    setEditingVacancy(null);
    setVacancyForm({
      title: '',
      department: 'Engineering',
      location: 'Amsterdam / Remote',
      type: 'full-time',
      experienceLevel: 'senior',
      salaryRange: '',
      description: '',
      requirements: '',
      responsibilities: '',
      isPublished: true
    });
    setVacancyModalOpen(true);
  };

  const handleOpenEditVacancy = (v: Vacancy) => {
    setEditingVacancy(v);
    setVacancyForm({
      title: v.title,
      department: v.department,
      location: v.location,
      type: v.type,
      experienceLevel: v.experienceLevel,
      salaryRange: v.salaryRange || '',
      description: v.description,
      requirements: (v.requirements || []).join('\n'),
      responsibilities: (v.responsibilities || []).join('\n'),
      isPublished: v.isPublished
    });
    setVacancyModalOpen(true);
  };

  const handleSaveVacancy = (e: React.FormEvent) => {
    e.preventDefault();
    if (!vacancyForm.title.trim()) return;

    const reqArray = vacancyForm.requirements
      .split('\n')
      .map(r => r.trim())
      .filter(Boolean);
    const respArray = vacancyForm.responsibilities
      .split('\n')
      .map(r => r.trim())
      .filter(Boolean);

    const newVacancy: Vacancy = {
      id: editingVacancy ? editingVacancy.id : `vac-${Date.now()}`,
      title: vacancyForm.title.trim(),
      department: vacancyForm.department.trim(),
      location: vacancyForm.location.trim(),
      type: vacancyForm.type,
      experienceLevel: vacancyForm.experienceLevel,
      salaryRange: vacancyForm.salaryRange.trim() || undefined,
      description: vacancyForm.description.trim(),
      requirements: reqArray,
      responsibilities: respArray,
      isPublished: vacancyForm.isPublished,
      createdAt: editingVacancy ? editingVacancy.createdAt : new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    PortalStore.saveVacancy(newVacancy);
    setVacancies(PortalStore.getVacancies());
    setVacancyModalOpen(false);
  };

  const handleDeleteVacancy = (id: string) => {
    if (window.confirm('Are you sure you want to permanently delete this vacancy?')) {
      PortalStore.deleteVacancy(id);
      setVacancies(PortalStore.getVacancies());
    }
  };

  const handleToggleVacancyPublish = (id: string) => {
    PortalStore.toggleVacancyPublish(id);
    setVacancies(PortalStore.getVacancies());
  };

  // Filtered Vacancies
  const filteredVacancies = useMemo(() => {
    return vacancies.filter(v => {
      const matchDept = vacancyFilterDept === 'all' || v.department.toLowerCase() === vacancyFilterDept.toLowerCase();
      const matchSearch =
        !vacancySearch.trim() ||
        v.title.toLowerCase().includes(vacancySearch.toLowerCase()) ||
        v.department.toLowerCase().includes(vacancySearch.toLowerCase()) ||
        v.location.toLowerCase().includes(vacancySearch.toLowerCase());
      return matchDept && matchSearch;
    });
  }, [vacancies, vacancyFilterDept, vacancySearch]);

  // Appointments (derived from leads having selectedDate)
  const appointmentsList = useMemo(() => {
    return leads.filter(l => Boolean(l.selectedDate));
  }, [leads]);

  const filteredAppointments = useMemo(() => {
    return appointmentsList.filter(app => {
      // Search
      const s = appointmentSearch.toLowerCase().trim();
      const matchSearch =
        !s ||
        app.fullName.toLowerCase().includes(s) ||
        app.email.toLowerCase().includes(s) ||
        app.company.toLowerCase().includes(s) ||
        app.serviceInterest.toLowerCase().includes(s);

      // Status
      const matchStatus =
        appointmentStatusFilter === 'all' ||
        (app.meetingStatus || 'upcoming') === appointmentStatusFilter;

      // Date filter
      let matchDate = true;
      if (appointmentDateFilter === 'today') {
        const todayStr = new Date().toISOString().split('T')[0];
        matchDate = app.selectedDate === todayStr;
      } else if (appointmentDateFilter === 'upcoming') {
        const todayStr = new Date().toISOString().split('T')[0];
        matchDate = Boolean(app.selectedDate && app.selectedDate >= todayStr);
      } else if (appointmentDateFilter === 'past') {
        const todayStr = new Date().toISOString().split('T')[0];
        matchDate = Boolean(app.selectedDate && app.selectedDate < todayStr);
      }

      return matchSearch && matchStatus && matchDate;
    });
  }, [appointmentsList, appointmentSearch, appointmentStatusFilter, appointmentDateFilter]);

  // Filtered Customers
  const filteredCustomers = useMemo(() => {
    return customers.filter(c => {
      const s = customerSearch.toLowerCase().trim();
      return (
        !s ||
        c.fullName.toLowerCase().includes(s) ||
        c.company.toLowerCase().includes(s) ||
        c.email.toLowerCase().includes(s) ||
        c.phone.toLowerCase().includes(s)
      );
    });
  }, [customers, customerSearch]);

  // Filtered Messages
  const filteredMessages = useMemo(() => {
    return messages.filter(m => {
      if (messageFilter === 'unread') return !m.isRead;
      if (messageFilter === 'read') return m.isRead;
      return true;
    });
  }, [messages, messageFilter]);

  const unreadMessagesCount = useMemo(() => {
    return messages.filter(m => !m.isRead).length;
  }, [messages]);

  // Message Actions
  const handleOpenMessage = (msg: ContactMessage) => {
    setSelectedMessage(msg);
    if (!msg.isRead) {
      PortalStore.markContactMessageRead(msg.id, true);
      setMessages(PortalStore.getContactMessages());
    }
  };

  const handleToggleMessageRead = (id: string, currentRead: boolean) => {
    PortalStore.markContactMessageRead(id, !currentRead);
    setMessages(PortalStore.getContactMessages());
    if (selectedMessage && selectedMessage.id === id) {
      setSelectedMessage({ ...selectedMessage, isRead: !currentRead });
    }
  };

  const handleDeleteMessage = (id: string) => {
    if (window.confirm('Delete this contact message permanently?')) {
      PortalStore.deleteContactMessage(id);
      setMessages(PortalStore.getContactMessages());
      if (selectedMessage && selectedMessage.id === id) {
        setSelectedMessage(null);
      }
    }
  };

  // Appointment Status Change
  const handleChangeAppointmentStatus = (leadId: string, newStatus: LeadSubmission['meetingStatus']) => {
    onUpdateLeadStatus(leadId, newStatus);
    if (selectedAppointment && selectedAppointment.id === leadId) {
      setSelectedAppointment({
        ...selectedAppointment,
        meetingStatus: newStatus
      });
    }
  };

  // Save Settings
  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    PortalStore.saveCompanySettings(settings);
    setSettingsSavedNotice(true);
    setTimeout(() => setSettingsSavedNotice(false), 3000);
  };

  if (isVerifying) {
    return (
      <div className="min-h-screen bg-[#080B11] flex items-center justify-center p-4">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-slate-400 font-mono text-xs">Authenticating Brandidge Administrator Session...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#080B11] text-slate-100 flex flex-col font-sans">
      {/* Top Admin Navigation Bar */}
      <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <BrandLogo size="md" />
          <div className="hidden sm:flex items-center gap-2 pl-3 border-l border-slate-800">
            <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-800/60 text-cyan-300">
              Operations Dashboard
            </span>
            <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              Live & Protected
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 font-mono text-xs text-slate-300">
            <Shield className="w-3.5 h-3.5 text-cyan-400" />
            <span>Admin: <strong>Brandidge</strong></span>
          </div>

          <button
            onClick={onNavigateHome}
            className="px-3 py-1.5 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-slate-800 text-xs font-mono text-slate-300 hover:text-white transition-all flex items-center gap-1.5 cursor-pointer"
            title="Open Public Website"
          >
            <span>Public Website</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-slate-500" />
          </button>

          <button
            onClick={handleLogoutAction}
            className="px-3 py-1.5 rounded-lg bg-rose-950/30 hover:bg-rose-900/50 border border-rose-800/40 text-rose-300 hover:text-rose-100 text-xs font-mono transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Log Out</span>
          </button>
        </div>
      </header>

      {/* Main Layout Body */}
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Sidebar Navigation */}
        <aside className="w-full md:w-64 bg-slate-950/60 border-r border-slate-800/80 p-4 shrink-0">
          <div className="text-[11px] font-mono uppercase tracking-wider text-slate-500 px-3 mb-2 font-semibold">
            Management Modules
          </div>

          <nav className="space-y-1">
            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                activeTab === 'overview'
                  ? 'bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <LayoutDashboard className="w-4 h-4 text-cyan-400" />
                <span>Overview</span>
              </div>
            </button>

            <button
              onClick={() => setActiveTab('vacancies')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                activeTab === 'vacancies'
                  ? 'bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Briefcase className="w-4 h-4 text-blue-400" />
                <span>Vacancies</span>
              </div>
              <span className="font-mono text-[11px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">
                {vacancies.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('appointments')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                activeTab === 'appointments'
                  ? 'bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <CalendarCheck2 className="w-4 h-4 text-emerald-400" />
                <span>Appointments</span>
              </div>
              <span className="font-mono text-[11px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">
                {appointmentsList.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('customers')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                activeTab === 'customers'
                  ? 'bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Users className="w-4 h-4 text-indigo-400" />
                <span>Customers & Contacts</span>
              </div>
              <span className="font-mono text-[11px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">
                {customers.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('messages')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                activeTab === 'messages'
                  ? 'bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <MessageSquareText className="w-4 h-4 text-amber-400" />
                <span>Contact Messages</span>
              </div>
              {unreadMessagesCount > 0 && (
                <span className="font-mono text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-rose-500 text-slate-950">
                  {unreadMessagesCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                activeTab === 'settings'
                  ? 'bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Sliders className="w-4 h-4 text-slate-400" />
                <span>Settings & Security</span>
              </div>
            </button>
          </nav>

          <div className="mt-8 p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 text-[11px] text-slate-400 leading-relaxed font-mono">
            <div className="flex items-center gap-1.5 text-cyan-400 font-semibold mb-1">
              <Key className="w-3.5 h-3.5" />
              <span>Route /dashboard</span>
            </div>
            Protected session running under username <strong>Brandidge</strong>.
          </div>
        </aside>

        {/* Content Area */}
        <main className="flex-1 p-4 sm:p-8 overflow-y-auto max-w-7xl">
          {/* ========================================================================= */}
          {/* TAB 1: OVERVIEW */}
          {/* ========================================================================= */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-white font-['Outfit']">
                  Operations Overview
                </h1>
                <p className="text-xs text-slate-400 mt-1">
                  Real-time summary of vacancies, client consultation requests, and incoming inquiries.
                </p>
              </div>

              {/* KPI Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-4 relative overflow-hidden">
                  <div className="flex items-center justify-between text-slate-400 mb-2">
                    <span className="text-xs font-mono uppercase tracking-wider">Appointments</span>
                    <CalendarCheck2 className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="text-2xl font-bold font-mono text-white">
                    {appointmentsList.length}
                  </div>
                  <div className="text-[11px] text-emerald-400 mt-1 flex items-center gap-1">
                    <span>{appointmentsList.filter(a => a.meetingStatus === 'upcoming').length} upcoming sessions</span>
                  </div>
                </div>

                <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-4 relative overflow-hidden">
                  <div className="flex items-center justify-between text-slate-400 mb-2">
                    <span className="text-xs font-mono uppercase tracking-wider">Unread Messages</span>
                    <MessageSquareText className="w-4 h-4 text-amber-400" />
                  </div>
                  <div className="text-2xl font-bold font-mono text-white">
                    {unreadMessagesCount}
                  </div>
                  <div className="text-[11px] text-amber-400 mt-1">
                    {messages.length} total inquiries logged
                  </div>
                </div>

                <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-4 relative overflow-hidden">
                  <div className="flex items-center justify-between text-slate-400 mb-2">
                    <span className="text-xs font-mono uppercase tracking-wider">Job Vacancies</span>
                    <Briefcase className="w-4 h-4 text-blue-400" />
                  </div>
                  <div className="text-2xl font-bold font-mono text-white">
                    {vacancies.length}
                  </div>
                  <div className="text-[11px] text-blue-400 mt-1">
                    {vacancies.filter(v => v.isPublished).length} published live
                  </div>
                </div>

                <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-4 relative overflow-hidden">
                  <div className="flex items-center justify-between text-slate-400 mb-2">
                    <span className="text-xs font-mono uppercase tracking-wider">Active Customers</span>
                    <Users className="w-4 h-4 text-indigo-400" />
                  </div>
                  <div className="text-2xl font-bold font-mono text-white">
                    {customers.length}
                  </div>
                  <div className="text-[11px] text-indigo-400 mt-1">
                    Profiles in dossier storage
                  </div>
                </div>
              </div>

              {/* Quick Actions & Recent Items Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Upcoming Appointments preview */}
                <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-5">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-sm font-bold text-white font-mono flex items-center gap-2">
                      <CalendarCheck2 className="w-4 h-4 text-emerald-400" />
                      <span>Next Upcoming Appointments</span>
                    </h2>
                    <button
                      onClick={() => setActiveTab('appointments')}
                      className="text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1 cursor-pointer"
                    >
                      <span>View All</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="space-y-3">
                    {appointmentsList.slice(0, 4).map(app => (
                      <div
                        key={app.id}
                        onClick={() => {
                          setSelectedAppointment(app);
                          setActiveTab('appointments');
                        }}
                        className="p-3 rounded-lg bg-slate-950/70 border border-slate-800/80 hover:border-slate-700 transition-all flex items-center justify-between cursor-pointer group"
                      >
                        <div className="space-y-0.5">
                          <div className="text-xs font-semibold text-white group-hover:text-cyan-300 transition-colors">
                            {app.fullName} • {app.company}
                          </div>
                          <div className="text-[11px] font-mono text-slate-400 flex items-center gap-2">
                            <span>{app.selectedDate}</span>
                            <span>•</span>
                            <span className="text-cyan-400">{app.selectedTimeSlot}</span>
                          </div>
                        </div>
                        <span className={`text-[10px] font-mono px-2 py-0.5 rounded border capitalize ${
                          app.meetingStatus === 'completed'
                            ? 'bg-slate-800 text-slate-300 border-slate-700'
                            : 'bg-emerald-950/50 text-emerald-300 border-emerald-800/50'
                        }`}>
                          {app.meetingStatus || 'upcoming'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Messages preview */}
                <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-5">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-sm font-bold text-white font-mono flex items-center gap-2">
                      <MessageSquareText className="w-4 h-4 text-amber-400" />
                      <span>Recent Contact Messages</span>
                    </h2>
                    <button
                      onClick={() => setActiveTab('messages')}
                      className="text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1 cursor-pointer"
                    >
                      <span>View Inbox</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="space-y-3">
                    {messages.slice(0, 4).map(msg => (
                      <div
                        key={msg.id}
                        onClick={() => {
                          handleOpenMessage(msg);
                          setActiveTab('messages');
                        }}
                        className="p-3 rounded-lg bg-slate-950/70 border border-slate-800/80 hover:border-slate-700 transition-all flex items-start justify-between cursor-pointer group"
                      >
                        <div className="space-y-1 pr-3">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-semibold text-white group-hover:text-cyan-300 transition-colors">
                              {msg.fullName}
                            </span>
                            {!msg.isRead && (
                              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                            )}
                          </div>
                          <div className="text-[11px] text-slate-300 font-medium line-clamp-1">
                            {msg.subject}
                          </div>
                          <div className="text-[10px] text-slate-500 line-clamp-1">
                            {msg.message}
                          </div>
                        </div>
                        <span className="text-[10px] font-mono text-slate-500 shrink-0">
                          {msg.submittedAt.split('T')[0]}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 2: VACANCIES */}
          {/* ========================================================================= */}
          {activeTab === 'vacancies' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold tracking-tight text-white font-['Outfit']">
                    Job Vacancies Management
                  </h1>
                  <p className="text-xs text-slate-400 mt-1">
                    Add, edit, publish, or archive job postings for Brandidge agency positions.
                  </p>
                </div>

                <button
                  onClick={handleOpenAddVacancy}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 shadow-lg shadow-cyan-500/20 hover:from-cyan-400 hover:to-blue-500 transition-all cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Create New Vacancy</span>
                </button>
              </div>

              {/* Filters & Search */}
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type="text"
                    value={vacancySearch}
                    onChange={(e) => setVacancySearch(e.target.value)}
                    placeholder="Search by job title, department, or location..."
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/60 font-mono"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <Filter className="w-3.5 h-3.5 text-slate-500" />
                  <select
                    value={vacancyFilterDept}
                    onChange={(e) => setVacancyFilterDept(e.target.value)}
                    className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-cyan-500/60 font-mono"
                  >
                    <option value="all">All Departments</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Design">Design</option>
                    <option value="Growth">Growth</option>
                    <option value="Marketing">Marketing</option>
                  </select>
                </div>
              </div>

              {/* Vacancies List */}
              <div className="space-y-4">
                {filteredVacancies.length === 0 ? (
                  <div className="p-12 text-center bg-slate-900/40 border border-slate-800/80 rounded-2xl">
                    <Briefcase className="w-10 h-10 text-slate-600 mx-auto mb-2" />
                    <h3 className="text-sm font-semibold text-slate-300">No vacancies found</h3>
                    <p className="text-xs text-slate-500 mt-1">Try adjusting your search criteria or create a new vacancy.</p>
                  </div>
                ) : (
                  filteredVacancies.map(v => (
                    <div
                      key={v.id}
                      className="bg-slate-900/70 border border-slate-800 rounded-xl p-5 hover:border-slate-700 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
                    >
                      <div className="space-y-2 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-base font-bold text-white font-['Outfit']">
                            {v.title}
                          </h3>
                          <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                            v.isPublished
                              ? 'bg-emerald-950/60 border-emerald-800/60 text-emerald-300'
                              : 'bg-slate-800/80 border-slate-700 text-slate-400'
                          }`}>
                            {v.isPublished ? '● Published / Live' : '○ Draft / Unpublished'}
                          </span>
                        </div>

                        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 font-mono">
                          <span className="text-cyan-400">{v.department}</span>
                          <span>•</span>
                          <span>{v.location}</span>
                          <span>•</span>
                          <span className="capitalize">{v.type} ({v.experienceLevel})</span>
                          {v.salaryRange && (
                            <>
                              <span>•</span>
                              <span className="text-slate-300">{v.salaryRange}</span>
                            </>
                          )}
                        </div>

                        <p className="text-xs text-slate-400 line-clamp-2">
                          {v.description}
                        </p>
                      </div>

                      {/* Action buttons */}
                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => handleToggleVacancyPublish(v.id)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all border cursor-pointer ${
                            v.isPublished
                              ? 'bg-amber-950/30 border-amber-800/50 text-amber-300 hover:bg-amber-900/40'
                              : 'bg-emerald-950/30 border-emerald-800/50 text-emerald-300 hover:bg-emerald-900/40'
                          }`}
                        >
                          {v.isPublished ? 'Unpublish' : 'Publish'}
                        </button>

                        <button
                          onClick={() => handleOpenEditVacancy(v)}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
                          title="Edit Vacancy"
                        >
                          <Edit className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => handleDeleteVacancy(v.id)}
                          className="p-1.5 rounded-lg bg-rose-950/30 hover:bg-rose-900/50 text-rose-300 hover:text-rose-100 transition-colors cursor-pointer"
                          title="Delete Vacancy"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 3: APPOINTMENTS */}
          {/* ========================================================================= */}
          {activeTab === 'appointments' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-white font-['Outfit']">
                  Consultation Appointments
                </h1>
                <p className="text-xs text-slate-400 mt-1">
                  Manage discovery calls, review prospective client project briefs, and update meeting statuses.
                </p>
              </div>

              {/* Filters */}
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type="text"
                    value={appointmentSearch}
                    onChange={(e) => setAppointmentSearch(e.target.value)}
                    placeholder="Search client name, email, company, or service..."
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/60 font-mono"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <select
                    value={appointmentStatusFilter}
                    onChange={(e) => setAppointmentStatusFilter(e.target.value)}
                    className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-cyan-500/60 font-mono"
                  >
                    <option value="all">All Statuses</option>
                    <option value="upcoming">Upcoming</option>
                    <option value="completed">Completed</option>
                    <option value="rescheduled">Rescheduled</option>
                    <option value="cancelled">Cancelled</option>
                    <option value="no-show">No-Show</option>
                  </select>

                  <select
                    value={appointmentDateFilter}
                    onChange={(e) => setAppointmentDateFilter(e.target.value)}
                    className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-cyan-500/60 font-mono"
                  >
                    <option value="all">All Dates</option>
                    <option value="today">Today</option>
                    <option value="upcoming">Future</option>
                    <option value="past">Past</option>
                  </select>
                </div>
              </div>

              {/* Appointments Table / Cards */}
              <div className="space-y-3">
                {filteredAppointments.length === 0 ? (
                  <div className="p-12 text-center bg-slate-900/40 border border-slate-800/80 rounded-2xl">
                    <CalendarCheck2 className="w-10 h-10 text-slate-600 mx-auto mb-2" />
                    <h3 className="text-sm font-semibold text-slate-300">No appointments matched</h3>
                    <p className="text-xs text-slate-500 mt-1">Try resetting the status or date filter.</p>
                  </div>
                ) : (
                  filteredAppointments.map(app => (
                    <div
                      key={app.id}
                      className="bg-slate-900/70 border border-slate-800 rounded-xl p-4 sm:p-5 hover:border-slate-700 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
                    >
                      <div className="space-y-1.5 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-sm font-bold text-white font-['Outfit']">
                            {app.fullName}
                          </span>
                          <span className="text-xs font-mono text-cyan-400">
                            • {app.company}
                          </span>
                        </div>

                        <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-slate-400">
                          <span className="text-white flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                            {app.selectedDate}
                          </span>
                          <span className="text-cyan-300 flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" />
                            {app.selectedTimeSlot}
                          </span>
                          <span>•</span>
                          <span>{app.serviceInterest}</span>
                        </div>

                        <div className="text-xs text-slate-400 line-clamp-1">
                          {app.projectBrief || app.primaryGoal}
                        </div>
                      </div>

                      {/* Status Selector & View Details */}
                      <div className="flex items-center gap-3 shrink-0">
                        <select
                          value={app.meetingStatus || 'upcoming'}
                          onChange={(e) => handleChangeAppointmentStatus(app.id, e.target.value as any)}
                          className="bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs font-mono text-slate-300 focus:outline-none focus:border-cyan-500/60"
                        >
                          <option value="upcoming">Upcoming</option>
                          <option value="completed">Completed</option>
                          <option value="rescheduled">Rescheduled</option>
                          <option value="cancelled">Cancelled</option>
                          <option value="no-show">No-Show</option>
                        </select>

                        <button
                          onClick={() => setSelectedAppointment(app)}
                          className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-mono text-slate-200 hover:text-white transition-all flex items-center gap-1.5 cursor-pointer"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Details</span>
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 4: CUSTOMERS & CONTACTS */}
          {/* ========================================================================= */}
          {activeTab === 'customers' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-white font-['Outfit']">
                  Customers & Contact Dossiers
                </h1>
                <p className="text-xs text-slate-400 mt-1">
                  View customer accounts, linked business contact points, and their associated appointments and messages.
                </p>
              </div>

              {/* Search */}
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="text"
                  value={customerSearch}
                  onChange={(e) => setCustomerSearch(e.target.value)}
                  placeholder="Search customer by name, company, email, or telephone..."
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/60 font-mono"
                />
              </div>

              {/* Customers List */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredCustomers.length === 0 ? (
                  <div className="col-span-2 p-12 text-center bg-slate-900/40 border border-slate-800/80 rounded-2xl">
                    <Users className="w-10 h-10 text-slate-600 mx-auto mb-2" />
                    <h3 className="text-sm font-semibold text-slate-300">No customers found</h3>
                    <p className="text-xs text-slate-500 mt-1">Try another search keyword.</p>
                  </div>
                ) : (
                  filteredCustomers.map(cust => {
                    const relatedApps = appointmentsList.filter(a => a.email.toLowerCase() === cust.email.toLowerCase());
                    const relatedMsgs = messages.filter(m => m.email.toLowerCase() === cust.email.toLowerCase());

                    return (
                      <div
                        key={cust.id}
                        className="bg-slate-900/70 border border-slate-800 rounded-xl p-5 hover:border-slate-700 transition-all flex flex-col justify-between"
                      >
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <h3 className="text-sm font-bold text-white font-['Outfit']">
                              {cust.fullName}
                            </h3>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-800/50 text-cyan-300 capitalize">
                              {cust.status}
                            </span>
                          </div>

                          <div className="text-xs text-cyan-400 font-mono flex items-center gap-1.5">
                            <Building className="w-3.5 h-3.5" />
                            <span>{cust.company}</span>
                          </div>

                          <div className="space-y-1 pt-1 text-xs text-slate-400 font-mono">
                            <div className="flex items-center gap-2">
                              <Mail className="w-3.5 h-3.5 text-slate-500" />
                              <a href={`mailto:${cust.email}`} className="hover:text-cyan-300 transition-colors">
                                {cust.email}
                              </a>
                            </div>
                            <div className="flex items-center gap-2">
                              <Phone className="w-3.5 h-3.5 text-slate-500" />
                              <span>{cust.phone}</span>
                            </div>
                            {cust.websiteUrl && (
                              <div className="flex items-center gap-2">
                                <Globe className="w-3.5 h-3.5 text-slate-500" />
                                <a href={cust.websiteUrl} target="_blank" rel="noopener noreferrer" className="hover:text-cyan-300 transition-colors">
                                  {cust.websiteUrl}
                                </a>
                              </div>
                            )}
                          </div>

                          {/* Related Records Indicators */}
                          <div className="pt-3 border-t border-slate-800/80 flex items-center gap-3 text-[11px] font-mono text-slate-400">
                            <span>{relatedApps.length} Appointments</span>
                            <span>•</span>
                            <span>{relatedMsgs.length} Messages</span>
                          </div>
                        </div>

                        <div className="mt-4 pt-3 flex items-center justify-end">
                          <button
                            onClick={() => setSelectedCustomer(cust)}
                            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-mono text-slate-200 hover:text-white transition-all flex items-center gap-1.5 cursor-pointer"
                          >
                            <FileText className="w-3.5 h-3.5 text-cyan-400" />
                            <span>View Linked Dossier</span>
                          </button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 5: CONTACT MESSAGES */}
          {/* ========================================================================= */}
          {activeTab === 'messages' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold tracking-tight text-white font-['Outfit']">
                    Contact Form Messages
                  </h1>
                  <p className="text-xs text-slate-400 mt-1">
                    Inbox of direct inquiries sent by prospective clients via the website contact form.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setMessageFilter('all')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                      messageFilter === 'all'
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                        : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                    }`}
                  >
                    All ({messages.length})
                  </button>
                  <button
                    onClick={() => setMessageFilter('unread')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                      messageFilter === 'unread'
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                        : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                    }`}
                  >
                    Unread ({unreadMessagesCount})
                  </button>
                  <button
                    onClick={() => setMessageFilter('read')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                      messageFilter === 'read'
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                        : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                    }`}
                  >
                    Read
                  </button>
                </div>
              </div>

              {/* Messages list */}
              <div className="space-y-3">
                {filteredMessages.length === 0 ? (
                  <div className="p-12 text-center bg-slate-900/40 border border-slate-800/80 rounded-2xl">
                    <MessageSquareText className="w-10 h-10 text-slate-600 mx-auto mb-2" />
                    <h3 className="text-sm font-semibold text-slate-300">No contact messages</h3>
                    <p className="text-xs text-slate-500 mt-1">Your inbox is clear.</p>
                  </div>
                ) : (
                  filteredMessages.map(msg => (
                    <div
                      key={msg.id}
                      className={`p-4 sm:p-5 rounded-xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer ${
                        msg.isRead
                          ? 'bg-slate-900/50 border-slate-800/80 hover:border-slate-700'
                          : 'bg-cyan-950/20 border-cyan-500/30 hover:border-cyan-500/50'
                      }`}
                      onClick={() => handleOpenMessage(msg)}
                    >
                      <div className="space-y-1 flex-1">
                        <div className="flex items-center gap-2">
                          {!msg.isRead && (
                            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
                          )}
                          <span className="text-sm font-bold text-white font-['Outfit']">
                            {msg.fullName}
                          </span>
                          {msg.company && (
                            <span className="text-xs font-mono text-cyan-400">
                              • {msg.company}
                            </span>
                          )}
                          <span className="text-[10px] font-mono text-slate-500 ml-auto sm:ml-2">
                            {msg.submittedAt.split('T')[0]}
                          </span>
                        </div>

                        <div className="text-xs font-medium text-slate-200">
                          {msg.subject}
                        </div>

                        <p className="text-xs text-slate-400 line-clamp-2">
                          {msg.message}
                        </p>
                      </div>

                      {/* Action buttons */}
                      <div className="flex items-center gap-2 shrink-0" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={() => handleToggleMessageRead(msg.id, msg.isRead)}
                          className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-mono text-slate-300 hover:text-white transition-colors cursor-pointer"
                        >
                          {msg.isRead ? 'Mark Unread' : 'Mark Read'}
                        </button>

                        <button
                          onClick={() => handleDeleteMessage(msg.id)}
                          className="p-1.5 rounded-lg bg-rose-950/30 hover:bg-rose-900/50 text-rose-300 hover:text-rose-100 transition-colors cursor-pointer"
                          title="Delete Message"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 6: SETTINGS & SECURITY */}
          {/* ========================================================================= */}
          {activeTab === 'settings' && (
            <div className="space-y-8">
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-white font-['Outfit']">
                  Settings & Security Architecture
                </h1>
                <p className="text-xs text-slate-400 mt-1">
                  Manage agency profile metadata, banking & invoicing credentials, and Cloudflare security secrets.
                </p>
              </div>

              {/* Cloudflare Security Requirements Card */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900/90 to-cyan-950/30 border border-cyan-500/40 shadow-xl relative overflow-hidden">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center shrink-0">
                    <Shield className="w-5 h-5" />
                  </div>
                  <div className="space-y-2">
                    <h2 className="text-base font-bold text-white font-['Outfit'] flex items-center gap-2">
                      <span>Cloudflare Deployment & Environment Secrets</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-700 text-emerald-300">
                        Zero Client Exposure
                      </span>
                    </h2>
                    <p className="text-xs text-slate-300 leading-relaxed font-sans">
                      In compliance with strict security requirements, administrator authentication runs entirely on the backend server. The password is <strong>never</strong> present in frontend code, HTML, or client bundles.
                    </p>

                    <div className="pt-2 grid grid-cols-1 md:grid-cols-2 gap-3 font-mono text-xs">
                      <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800">
                        <div className="text-slate-500 text-[10px] uppercase">Cloudflare Secret Key</div>
                        <div className="text-cyan-300 font-bold mt-0.5">ADMIN_USERNAME</div>
                        <div className="text-slate-400 text-[11px] mt-1">Set value: <code className="text-white">Brandidge</code></div>
                      </div>

                      <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800">
                        <div className="text-slate-500 text-[10px] uppercase">Cloudflare Secret Key (Encrypted)</div>
                        <div className="text-cyan-300 font-bold mt-0.5">ADMIN_PASSWORD</div>
                        <div className="text-slate-400 text-[11px] mt-1">Configured securely in Cloudflare Settings → Environment Variables.</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Company Details Form */}
              <form onSubmit={handleSaveSettings} className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                  <h3 className="text-base font-bold text-white font-['Outfit']">
                    Agency Company Information
                  </h3>
                  {settingsSavedNotice && (
                    <span className="text-xs font-mono text-emerald-400 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Changes Saved Successfully</span>
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                      Agency Name
                    </label>
                    <input
                      type="text"
                      value={settings.name}
                      onChange={(e) => setSettings({ ...settings, name: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-cyan-500/60 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                      Tagline
                    </label>
                    <input
                      type="text"
                      value={settings.tagline}
                      onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-cyan-500/60 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                      Legal Entity
                    </label>
                    <input
                      type="text"
                      value={settings.legalEntity}
                      onChange={(e) => setSettings({ ...settings, legalEntity: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-cyan-500/60 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                      Official Contact Email
                    </label>
                    <input
                      type="email"
                      value={settings.email}
                      onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-cyan-500/60 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      value={settings.phone}
                      onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-cyan-500/60 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                      KvK Registration
                    </label>
                    <input
                      type="text"
                      value={settings.kvkRegistration}
                      onChange={(e) => setSettings({ ...settings, kvkRegistration: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-cyan-500/60 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                      VAT Identification Number
                    </label>
                    <input
                      type="text"
                      value={settings.vatNumber}
                      onChange={(e) => setSettings({ ...settings, vatNumber: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-cyan-500/60 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                      Primary Bank IBAN
                    </label>
                    <input
                      type="text"
                      value={settings.bankDetails.iban}
                      onChange={(e) => setSettings({
                        ...settings,
                        bankDetails: { ...settings.bankDetails, iban: e.target.value }
                      })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-cyan-500/60 font-mono"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-end pt-4">
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 hover:from-cyan-400 hover:to-blue-500 transition-all cursor-pointer"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          )}
        </main>
      </div>

      {/* ========================================================================= */}
      {/* MODAL: ADD / EDIT VACANCY */}
      {/* ========================================================================= */}
      {vacancyModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-xl w-full p-6 shadow-2xl space-y-4 my-8">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-white font-['Outfit']">
                {editingVacancy ? 'Edit Vacancy' : 'Create New Job Vacancy'}
              </h3>
              <button
                onClick={() => setVacancyModalOpen(false)}
                className="text-slate-500 hover:text-white cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveVacancy} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-slate-400 uppercase mb-1">Job Title *</label>
                <input
                  type="text"
                  required
                  value={vacancyForm.title}
                  onChange={(e) => setVacancyForm({ ...vacancyForm, title: e.target.value })}
                  placeholder="e.g. Senior Frontend Architect"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-cyan-500/60"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono text-slate-400 uppercase mb-1">Department</label>
                  <select
                    value={vacancyForm.department}
                    onChange={(e) => setVacancyForm({ ...vacancyForm, department: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500/60"
                  >
                    <option value="Engineering">Engineering</option>
                    <option value="Design">Design</option>
                    <option value="Growth">Growth</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Operations">Operations</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 uppercase mb-1">Employment Type</label>
                  <select
                    value={vacancyForm.type}
                    onChange={(e) => setVacancyForm({ ...vacancyForm, type: e.target.value as any })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500/60"
                  >
                    <option value="full-time">Full-Time</option>
                    <option value="part-time">Part-Time</option>
                    <option value="contract">Contract</option>
                    <option value="internship">Internship</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono text-slate-400 uppercase mb-1">Location</label>
                  <input
                    type="text"
                    value={vacancyForm.location}
                    onChange={(e) => setVacancyForm({ ...vacancyForm, location: e.target.value })}
                    placeholder="e.g. Amsterdam / Remote"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-cyan-500/60"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 uppercase mb-1">Salary Range (Optional)</label>
                  <input
                    type="text"
                    value={vacancyForm.salaryRange}
                    onChange={(e) => setVacancyForm({ ...vacancyForm, salaryRange: e.target.value })}
                    placeholder="e.g. €60,000 - €80,000 / year"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-cyan-500/60 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 uppercase mb-1">Job Description</label>
                <textarea
                  rows={3}
                  required
                  value={vacancyForm.description}
                  onChange={(e) => setVacancyForm({ ...vacancyForm, description: e.target.value })}
                  placeholder="Outline the core role summary and purpose..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-cyan-500/60 leading-relaxed"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 uppercase mb-1">Requirements (one per line)</label>
                <textarea
                  rows={3}
                  value={vacancyForm.requirements}
                  onChange={(e) => setVacancyForm({ ...vacancyForm, requirements: e.target.value })}
                  placeholder="5+ years experience in React...&#10;Expert in Tailwind CSS..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-cyan-500/60 font-mono leading-relaxed"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 uppercase mb-1">Key Responsibilities (one per line)</label>
                <textarea
                  rows={3}
                  value={vacancyForm.responsibilities}
                  onChange={(e) => setVacancyForm({ ...vacancyForm, responsibilities: e.target.value })}
                  placeholder="Architect scalable frontends...&#10;Lead technical sprints..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-cyan-500/60 font-mono leading-relaxed"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="pubCheck"
                  checked={vacancyForm.isPublished}
                  onChange={(e) => setVacancyForm({ ...vacancyForm, isPublished: e.target.checked })}
                  className="rounded bg-slate-950 border-slate-800 text-cyan-500 focus:ring-0 cursor-pointer"
                />
                <label htmlFor="pubCheck" className="text-xs text-slate-300 font-mono cursor-pointer">
                  Publish vacancy immediately (visible to candidates)
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setVacancyModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-xs font-mono text-slate-300 hover:text-white cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 hover:from-cyan-400 hover:to-blue-500 transition-all cursor-pointer"
                >
                  {editingVacancy ? 'Save Changes' : 'Create Vacancy'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: APPOINTMENT DETAILS */}
      {/* ========================================================================= */}
      {selectedAppointment && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4 my-8">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <h3 className="text-base font-bold text-white font-['Outfit']">
                  Consultation Dossier
                </h3>
                <span className="text-[11px] font-mono text-cyan-400">
                  {selectedAppointment.company}
                </span>
              </div>
              <button
                onClick={() => setSelectedAppointment(null)}
                className="text-slate-500 hover:text-white cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
                <div className="text-[10px] font-mono uppercase text-slate-500">Scheduled Time</div>
                <div className="text-sm font-bold text-white font-mono flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-cyan-400" />
                  <span>{selectedAppointment.selectedDate} at {selectedAppointment.selectedTimeSlot}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono uppercase text-slate-500">Client Name</span>
                  <div className="text-white font-semibold">{selectedAppointment.fullName}</div>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-mono uppercase text-slate-500">Email Address</span>
                  <div className="text-cyan-300 font-mono">
                    <a href={`mailto:${selectedAppointment.email}`}>{selectedAppointment.email}</a>
                  </div>
                </div>

                {selectedAppointment.phone && (
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono uppercase text-slate-500">Phone</span>
                    <div className="text-slate-300 font-mono">{selectedAppointment.phone}</div>
                  </div>
                )}

                {selectedAppointment.websiteUrl && (
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono uppercase text-slate-500">Website</span>
                    <div className="text-cyan-300 font-mono">
                      <a href={selectedAppointment.websiteUrl} target="_blank" rel="noreferrer">
                        {selectedAppointment.websiteUrl}
                      </a>
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase text-slate-500">Service Interest</span>
                <div className="text-slate-200 bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                  {selectedAppointment.serviceInterest}
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase text-slate-500">Project Brief & Objectives</span>
                <div className="text-slate-300 bg-slate-950 p-3 rounded-lg border border-slate-800 leading-relaxed whitespace-pre-wrap">
                  {selectedAppointment.projectBrief || selectedAppointment.primaryGoal || 'No brief provided.'}
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase text-slate-500">Meeting Status</span>
                <select
                  value={selectedAppointment.meetingStatus || 'upcoming'}
                  onChange={(e) => handleChangeAppointmentStatus(selectedAppointment.id, e.target.value as any)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500/60 font-mono"
                >
                  <option value="upcoming">Upcoming</option>
                  <option value="completed">Completed</option>
                  <option value="rescheduled">Rescheduled</option>
                  <option value="cancelled">Cancelled</option>
                  <option value="no-show">No-Show</option>
                </select>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
              <a
                href={`mailto:${selectedAppointment.email}?subject=Brandidge Consultation: ${selectedAppointment.selectedDate}`}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-mono text-cyan-300 flex items-center gap-1.5 cursor-pointer"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Email Client</span>
              </a>

              <button
                onClick={() => setSelectedAppointment(null)}
                className="px-4 py-1.5 rounded-lg bg-slate-800 text-xs font-mono text-slate-300 hover:text-white cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: CONTACT MESSAGE VIEWER */}
      {/* ========================================================================= */}
      {selectedMessage && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4 my-8">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <h3 className="text-base font-bold text-white font-['Outfit']">
                  {selectedMessage.subject}
                </h3>
                <span className="text-[11px] font-mono text-slate-400">
                  Received {selectedMessage.submittedAt.split('T')[0]}
                </span>
              </div>
              <button
                onClick={() => setSelectedMessage(null)}
                className="text-slate-500 hover:text-white cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1 font-mono">
                <div className="text-white font-semibold">From: {selectedMessage.fullName}</div>
                <div className="text-cyan-400">Email: {selectedMessage.email}</div>
                {selectedMessage.company && <div className="text-slate-400">Company: {selectedMessage.company}</div>}
                {selectedMessage.phone && <div className="text-slate-400">Phone: {selectedMessage.phone}</div>}
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 leading-relaxed whitespace-pre-wrap">
                {selectedMessage.message}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <a
                  href={`mailto:${selectedMessage.email}?subject=Re: ${encodeURIComponent(selectedMessage.subject)}`}
                  className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Reply via Email</span>
                </a>

                <button
                  onClick={() => handleToggleMessageRead(selectedMessage.id, selectedMessage.isRead)}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-mono text-slate-300 cursor-pointer"
                >
                  {selectedMessage.isRead ? 'Mark Unread' : 'Mark Read'}
                </button>
              </div>

              <button
                onClick={() => setSelectedMessage(null)}
                className="px-4 py-1.5 rounded-lg bg-slate-800 text-xs font-mono text-slate-300 hover:text-white cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: CUSTOMER LINKED DOSSIER */}
      {/* ========================================================================= */}
      {selectedCustomer && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-xl w-full p-6 shadow-2xl space-y-4 my-8">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <h3 className="text-base font-bold text-white font-['Outfit']">
                  {selectedCustomer.fullName} • Linked Records
                </h3>
                <span className="text-[11px] font-mono text-cyan-400">
                  {selectedCustomer.company}
                </span>
              </div>
              <button
                onClick={() => setSelectedCustomer(null)}
                className="text-slate-500 hover:text-white cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1 font-mono">
                <div className="text-white font-bold">{selectedCustomer.company}</div>
                <div className="text-slate-400">Contact: {selectedCustomer.fullName} ({selectedCustomer.email})</div>
                <div className="text-slate-400">Phone: {selectedCustomer.phone}</div>
                <div className="text-slate-400">
                  Address: {selectedCustomer.billingAddress.street}, {selectedCustomer.billingAddress.city}, {selectedCustomer.billingAddress.country}
                </div>
              </div>

              {/* Linked Appointments */}
              <div>
                <h4 className="text-xs font-bold text-white font-mono uppercase mb-2">
                  Linked Consultations & Appointments
                </h4>
                {appointmentsList.filter(a => a.email.toLowerCase() === selectedCustomer.email.toLowerCase()).length === 0 ? (
                  <p className="text-slate-500 text-xs font-mono">No direct scheduled appointments found for this contact.</p>
                ) : (
                  <div className="space-y-2">
                    {appointmentsList
                      .filter(a => a.email.toLowerCase() === selectedCustomer.email.toLowerCase())
                      .map(a => (
                        <div key={a.id} className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between text-xs font-mono">
                          <span>{a.selectedDate} at {a.selectedTimeSlot}</span>
                          <span className="text-emerald-400 capitalize">{a.meetingStatus || 'upcoming'}</span>
                        </div>
                      ))}
                  </div>
                )}
              </div>

              {/* Linked Contact Messages */}
              <div>
                <h4 className="text-xs font-bold text-white font-mono uppercase mb-2">
                  Linked Contact Messages
                </h4>
                {messages.filter(m => m.email.toLowerCase() === selectedCustomer.email.toLowerCase()).length === 0 ? (
                  <p className="text-slate-500 text-xs font-mono">No contact messages logged for this email address.</p>
                ) : (
                  <div className="space-y-2">
                    {messages
                      .filter(m => m.email.toLowerCase() === selectedCustomer.email.toLowerCase())
                      .map(m => (
                        <div key={m.id} className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-xs">
                          <div className="font-semibold text-white">{m.subject}</div>
                          <div className="text-slate-400 line-clamp-1">{m.message}</div>
                        </div>
                      ))}
                  </div>
                )}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => setSelectedCustomer(null)}
                className="px-4 py-1.5 rounded-lg bg-slate-800 text-xs font-mono text-slate-300 hover:text-white cursor-pointer"
              >
                Close Dossier
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
