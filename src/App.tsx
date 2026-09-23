import React, { useState, useEffect } from 'react';
import { ViewType, LeadSubmission, AuthUser } from './types';
import { INITIAL_LEADS } from './data/agencyData';
import { PortalStore } from './data/portalStore';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HeroSection } from './components/HeroSection';
import { ServicesSection } from './components/ServicesSection';
import { ProcessSection } from './components/ProcessSection';
import { PricingSection } from './components/PricingSection';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { BookingModal } from './components/BookingModal';
import { CustomerPortal } from './components/CustomerPortal';
import { CustomerAuthModal } from './components/CustomerAuthModal';
import { LegalModals } from './components/LegalModals';
import { DashboardLogin } from './components/dashboard/DashboardLogin';
import { AdminDashboard } from './components/dashboard/AdminDashboard';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(() => PortalStore.getCurrentUser());
  const [selectedBookingContext, setSelectedBookingContext] = useState<string | undefined>(undefined);
  const [activeLegalModal, setActiveLegalModal] = useState<'privacy' | 'terms' | 'cookies' | 'sitemap' | null>(null);

  // Path-based routing for /dashboard and /dashboard/login
  const [dashboardRoute, setDashboardRoute] = useState<'none' | 'login' | 'dashboard'>(() => {
    if (typeof window !== 'undefined') {
      const p = window.location.pathname;
      if (p === '/dashboard/login') return 'login';
      if (p === '/dashboard' || p.startsWith('/dashboard/')) return 'dashboard';
    }
    return 'none';
  });

  useEffect(() => {
    const handlePopState = () => {
      const p = window.location.pathname;
      if (p === '/dashboard/login') {
        setDashboardRoute('login');
      } else if (p === '/dashboard' || p.startsWith('/dashboard/')) {
        setDashboardRoute('dashboard');
      } else {
        setDashboardRoute('none');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleNavigateToDashboard = () => {
    window.history.pushState(null, '', '/dashboard');
    setDashboardRoute('dashboard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToDashboardLogin = () => {
    window.history.pushState(null, '', '/dashboard/login');
    setDashboardRoute('login');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateHomeFromDashboard = () => {
    window.history.pushState(null, '', '/');
    setDashboardRoute('none');
    setCurrentView('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Persistent leads management
  const [leads, setLeads] = useState<LeadSubmission[]>(() => {
    const saved = localStorage.getItem('brandridge_leads') || localStorage.getItem('brandidge_leads');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return INITIAL_LEADS;
      }
    }
    return INITIAL_LEADS;
  });

  useEffect(() => {
    localStorage.setItem('brandridge_leads', JSON.stringify(leads));
  }, [leads]);

  const handleOpenBooking = (serviceContext?: string) => {
    setSelectedBookingContext(serviceContext);
    setBookingModalOpen(true);
  };

  const handleNewBookingComplete = (newLead: LeadSubmission) => {
    setLeads((prev) => [newLead, ...prev]);
    // Also save in portal store to keep strategy call dossiers synchronized
    PortalStore.logAudit({
      userId: currentUser?.id || 'guest',
      userEmail: newLead.email,
      action: 'BOOKING_CREATED',
      entityType: 'APPOINTMENT',
      details: `New consultation booked for ${newLead.fullName} on ${newLead.selectedDate} at ${newLead.selectedTimeSlot}.`
    });
  };

  const handleUpdateLeadStatus = (id: string, newStatus: LeadSubmission['status']) => {
    setLeads((prev) =>
      prev.map((lead) => (lead.id === id ? { ...lead, status: newStatus } : lead))
    );
  };

  const handleUpdateLead = (id: string, updates: Partial<LeadSubmission>) => {
    setLeads((prev) =>
      prev.map((lead) => (lead.id === id ? { ...lead, ...updates } : lead))
    );
  };

  const handleAddLeadManual = (newLead: LeadSubmission) => {
    setLeads((prev) => [newLead, ...prev]);
  };

  const handleDeleteLead = (id: string) => {
    setLeads((prev) => prev.filter((lead) => lead.id !== id));
  };

  const handleNavigate = (view: ViewType) => {
    if (view === 'admin') {
      handleNavigateToDashboard();
      return;
    }
    if (dashboardRoute !== 'none') {
      setDashboardRoute('none');
      window.history.pushState(null, '', '/');
    }
    if (view === 'customer-portal' && !currentUser) {
      setAuthModalOpen(true);
      return;
    }
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLoginSuccess = (user: AuthUser) => {
    setCurrentUser(user);
    setAuthModalOpen(false);
    setCurrentView('customer-portal');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogout = () => {
    PortalStore.logout();
    setCurrentUser(null);
    setCurrentView('home');
  };

  // Render Admin Dashboard Login Route (/dashboard/login)
  if (dashboardRoute === 'login') {
    return (
      <DashboardLogin
        onLoginSuccess={handleNavigateToDashboard}
        onNavigateHome={handleNavigateHomeFromDashboard}
      />
    );
  }

  // Render Protected Admin Dashboard Route (/dashboard)
  if (dashboardRoute === 'dashboard') {
    return (
      <AdminDashboard
        onLogout={handleNavigateToDashboardLogin}
        onNavigateHome={handleNavigateHomeFromDashboard}
        leads={leads}
        onUpdateLeadStatus={(id, status) => {
          setLeads(prev => prev.map(l => (l.id === id ? { ...l, meetingStatus: status } : l)));
        }}
        onUpdateLeadsList={(updated) => setLeads(updated)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#080B11] text-slate-100 flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      
      {/* Top Navbar */}
      {currentView !== 'admin' && currentView !== 'customer-portal' && (
        <Navbar
          currentView={currentView}
          onNavigate={handleNavigate}
          onOpenBooking={() => handleOpenBooking()}
          onOpenAuthModal={() => setAuthModalOpen(true)}
          currentUser={currentUser}
          leadCount={leads.filter((l) => l.status === 'new').length}
        />
      )}

      {/* Main View Container */}
      <main className="flex-grow">
        {currentView === 'home' && (
          <div className="space-y-4">
            <HeroSection
              onNavigate={handleNavigate}
              onOpenBooking={() => handleOpenBooking()}
            />
            <ProcessSection
              onNavigate={handleNavigate}
              onOpenBooking={() => handleOpenBooking()}
            />
            <ServicesSection
              onNavigate={handleNavigate}
              onOpenBooking={handleOpenBooking}
            />
            <PricingSection
              onNavigate={handleNavigate}
              onOpenBooking={handleOpenBooking}
            />
            <AboutSection
              onNavigate={handleNavigate}
              onOpenBooking={() => handleOpenBooking()}
            />
            <ContactSection
              onNavigate={handleNavigate}
              onOpenBooking={() => handleOpenBooking()}
              onNewLead={handleNewBookingComplete}
            />
          </div>
        )}

        {currentView === 'services' && (
          <div className="pt-6">
            <ServicesSection
              onNavigate={handleNavigate}
              onOpenBooking={handleOpenBooking}
            />
          </div>
        )}

        {currentView === 'process' && (
          <div className="pt-6">
            <ProcessSection
              onNavigate={handleNavigate}
              onOpenBooking={() => handleOpenBooking()}
            />
          </div>
        )}

        {currentView === 'pricing' && (
          <div className="pt-6">
            <PricingSection
              onNavigate={handleNavigate}
              onOpenBooking={handleOpenBooking}
            />
          </div>
        )}

        {currentView === 'about' && (
          <div className="pt-6">
            <AboutSection
              onNavigate={handleNavigate}
              onOpenBooking={() => handleOpenBooking()}
            />
          </div>
        )}

        {currentView === 'contact' && (
          <div className="pt-6">
            <ContactSection
              onNavigate={handleNavigate}
              onOpenBooking={() => handleOpenBooking()}
              onNewLead={handleNewBookingComplete}
            />
          </div>
        )}

        {currentView === 'customer-portal' && (
          <CustomerPortal
            currentUser={currentUser}
            user={currentUser}
            onNavigate={handleNavigate}
            onNavigateHome={() => handleNavigate('home')}
            onOpenBookingModal={() => handleOpenBooking()}
            onLogout={handleLogout}
          />
        )}

        {currentView === 'admin' && (
          <AdminDashboard
            onLogout={handleNavigateToDashboardLogin}
            onNavigateHome={handleNavigateHomeFromDashboard}
            leads={leads}
            onUpdateLeadStatus={(id, status) => {
              setLeads(prev => prev.map(l => (l.id === id ? { ...l, meetingStatus: status } : l)));
            }}
            onUpdateLeadsList={(updated) => setLeads(updated)}
          />
        )}
      </main>

      {/* Global Footer */}
      {currentView !== 'admin' && currentView !== 'customer-portal' && (
        <Footer
          onNavigate={handleNavigate}
          onOpenBooking={() => handleOpenBooking()}
          onOpenLegal={(type) => setActiveLegalModal(type)}
        />
      )}

      {/* Multi-Step Strategy Session Booking Modal */}
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        initialService={selectedBookingContext}
        onBookingComplete={handleNewBookingComplete}
      />

      {/* Customer Portal Auth / Registration Modal */}
      <CustomerAuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* Legal & Policy Modals */}
      <LegalModals
        type={activeLegalModal}
        onClose={() => setActiveLegalModal(null)}
      />

    </div>
  );
}
