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
import { AdminPortal } from './components/AdminPortal';
import { CustomerPortal } from './components/CustomerPortal';
import { CustomerAuthModal } from './components/CustomerAuthModal';
import { LegalModals } from './components/LegalModals';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(() => PortalStore.getCurrentUser());
  const [selectedBookingContext, setSelectedBookingContext] = useState<string | undefined>(undefined);
  const [activeLegalModal, setActiveLegalModal] = useState<'privacy' | 'terms' | 'cookies' | 'sitemap' | null>(null);

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
          <AdminPortal
            leads={leads}
            onUpdateLeadStatus={handleUpdateLeadStatus}
            onUpdateLead={handleUpdateLead}
            onAddLead={handleAddLeadManual}
            onDeleteLead={handleDeleteLead}
            onNavigate={handleNavigate}
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
