import React, { useState } from 'react';
import { ViewType, AuthUser } from '../types';
import { BrandLogo } from './BrandLogo';
import { 
  ArrowRight, 
  Menu, 
  X, 
  Sparkles, 
  CalendarCheck2,
  ChevronRight,
  UserCheck,
  Lock,
  Globe
} from 'lucide-react';

interface NavbarProps {
  currentView: ViewType;
  onNavigate: (view: ViewType) => void;
  onOpenBooking: () => void;
  onOpenAuthModal: () => void;
  currentUser?: AuthUser | null;
  leadCount?: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  onOpenBooking,
  onOpenAuthModal,
  currentUser,
  leadCount = 0
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { label: string; view: ViewType; badge?: string }[] = [
    { label: 'Capabilities', view: 'services' },
    { label: 'Our Process', view: 'process' },
    { label: 'Pricing & Packages', view: 'pricing', badge: 'Free Call' },
    { label: 'About', view: 'about' },
    { label: 'Contact', view: 'contact' },
  ];

  const handleNavClick = (view: ViewType) => {
    onNavigate(view);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Top Notification Announcement Bar */}
      <div 
        id="top-promo-banner" 
        className="bg-gradient-to-r from-cyan-950/80 via-slate-900 to-emerald-950/80 border-b border-cyan-500/20 py-2 px-4 text-xs text-slate-300 flex items-center justify-center gap-3 relative z-50 backdrop-blur-md"
      >
        <div className="flex items-center gap-1.5 text-cyan-400 font-semibold">
          <Sparkles className="w-3.5 h-3.5 animate-pulse" />
          <span>New Business Launch Initiative:</span>
        </div>
        <span className="hidden sm:inline text-slate-200">
          Book your <strong>100% Free Strategy Consultation</strong> + get <strong>1 Month Free Maintenance</strong> on all new builds.
        </span>
        <button 
          id="banner-claim-btn"
          onClick={onOpenBooking}
          className="text-cyan-400 hover:text-cyan-300 font-medium underline underline-offset-2 flex items-center gap-1 transition-colors cursor-pointer"
        >
          Book Free Call <ChevronRight className="w-3 h-3" />
        </button>
      </div>

      {/* Main Sticky Navigation */}
      <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-[#080B11]/85 border-b border-slate-800/80 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Catchy Brand Logo */}
          <BrandLogo 
            size="md" 
            showTagline={true} 
            onClick={() => handleNavClick('home')} 
          />

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((item) => {
              const isActive = currentView === item.view;
              return (
                <button
                  key={item.view}
                  id={`nav-link-${item.view}`}
                  onClick={() => handleNavClick(item.view)}
                  className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all relative cursor-pointer flex items-center gap-1.5 ${
                    isActive 
                      ? 'text-cyan-400 bg-slate-800/80 shadow-sm border border-cyan-500/20' 
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/40'
                  }`}
                >
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="px-1.5 py-0.2 rounded-full text-[9px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      {item.badge}
                    </span>
                  )}
                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-cyan-400 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Actions: Client Portal + Free Call Button */}
          <div className="hidden sm:flex items-center gap-3">
            {currentUser ? (
              <button
                id="nav-client-portal-btn"
                onClick={() => handleNavClick('customer-portal')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
                  currentView === 'customer-portal'
                    ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                    : 'bg-slate-900 border border-slate-700/80 text-cyan-300 hover:bg-slate-800'
                }`}
              >
                <UserCheck className="w-3.5 h-3.5" />
                <span>Portal ({currentUser.fullName.split(' ')[0]})</span>
              </button>
            ) : (
              <button
                id="nav-client-login-btn"
                onClick={onOpenAuthModal}
                className="px-3.5 py-2 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <UserCheck className="w-3.5 h-3.5 text-cyan-400" />
                <span>Client Login</span>
              </button>
            )}

            <button
              id="nav-book-consultation-btn"
              onClick={onOpenBooking}
              className="px-4.5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-cyan-500 bg-size-200 hover:bg-right transition-all duration-500 text-white text-xs font-bold shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/35 hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2 cursor-pointer"
            >
              <CalendarCheck2 className="w-4 h-4" />
              <span>Book 100% Free Meeting</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              id="nav-mobile-portal-btn"
              onClick={currentUser ? () => handleNavClick('customer-portal') : onOpenAuthModal}
              className="px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-cyan-300 font-bold text-xs flex items-center gap-1"
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>Portal</span>
            </button>
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div 
            id="mobile-nav-panel"
            className="sm:hidden bg-[#080B11]/98 border-b border-slate-800 px-4 pt-3 pb-6 space-y-3 backdrop-blur-2xl animate-in slide-in-from-top duration-200"
          >
            <div className="grid grid-cols-2 gap-2 pb-3 border-b border-slate-800">
              {navLinks.map((item) => (
                <button
                  key={item.view}
                  onClick={() => handleNavClick(item.view)}
                  className={`px-3 py-2.5 rounded-lg text-sm text-left font-medium transition-all ${
                    currentView === item.view 
                      ? 'text-cyan-400 bg-slate-800/90 border border-cyan-500/30' 
                      : 'text-slate-300 hover:bg-slate-800/50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{item.label}</span>
                    {item.badge && (
                      <span className="text-[9px] px-1 bg-emerald-500/20 text-emerald-300 rounded">
                        {item.badge}
                      </span>
                    )}
                  </div>
                </button>
              ))}
            </div>

            <div className="space-y-2 pt-1">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (currentUser) {
                    handleNavClick('customer-portal');
                  } else {
                    onOpenAuthModal();
                  }
                }}
                className="w-full py-2.5 px-4 rounded-xl bg-slate-900 border border-cyan-500/40 text-cyan-300 font-bold text-xs flex items-center justify-center gap-2"
              >
                <UserCheck className="w-4 h-4" />
                <span>{currentUser ? `Open Portal (${currentUser.fullName})` : 'Client Portal Login'}</span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 cursor-pointer"
              >
                <CalendarCheck2 className="w-4 h-4" />
                <span>Schedule Free Consultation</span>
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
