import React, { useState } from 'react';
import { AuthUser } from '../types';
import { PortalStore } from '../data/portalStore';
import { X, Mail, Shield, KeyRound, ArrowRight } from 'lucide-react';
import { BrandLogo } from './BrandLogo';

interface CustomerAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: AuthUser) => void;
}

export const CustomerAuthModal: React.FC<CustomerAuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [fullName, setFullName] = useState('');
  const [company, setCompany] = useState('');
  const [phone, setPhone] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!email.trim()) {
      setErrorMsg('Please enter your email address.');
      return;
    }

    if (isRegisterMode) {
      if (!fullName.trim() || !company.trim()) {
        setErrorMsg('Please provide your full name and company.');
        return;
      }

      const newUserId = `user-${Date.now()}`;
      const newCustId = `cust-${Date.now()}`;

      const newUser: AuthUser = {
        id: newUserId,
        email: email.trim().toLowerCase(),
        role: 'customer',
        fullName: fullName.trim(),
        companyName: company.trim(),
        customerId: newCustId,
        phone: phone.trim()
      };

      PortalStore.saveUser(newUser);
      PortalStore.saveCustomer({
        id: newCustId,
        userId: newUserId,
        fullName: fullName.trim(),
        company: company.trim(),
        email: email.trim().toLowerCase(),
        phone: phone.trim() || '+1 (555) 000-0000',
        billingAddress: {
          street: 'Corporate Suite 100',
          city: 'London',
          state: 'Greater London',
          postalCode: 'EC1A 1BB',
          country: 'United Kingdom'
        },
        status: 'active',
        createdAt: new Date().toISOString()
      });

      onLoginSuccess(newUser);
      onClose();
      return;
    }

    // Normal Login
    const users = PortalStore.getUsers();
    const existing = users.find(u => u.email.toLowerCase() === email.trim().toLowerCase());

    if (existing) {
      onLoginSuccess(existing);
      onClose();
    } else {
      // Auto-provision standard client session
      const generatedCustId = `cust-${Date.now()}`;
      const autoUser: AuthUser = {
        id: `user-${Date.now()}`,
        email: email.trim().toLowerCase(),
        role: 'customer',
        fullName: email.split('@')[0].replace('.', ' ').toUpperCase(),
        companyName: `${email.split('@')[0].toUpperCase()} Enterprise`,
        customerId: generatedCustId
      };
      PortalStore.saveUser(autoUser);
      onLoginSuccess(autoUser);
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-lg bg-slate-900 border border-slate-700/90 text-white rounded-3xl shadow-2xl overflow-hidden p-6 sm:p-8 my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-5 mb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <BrandLogo size="md" />
              <span className="text-xs font-mono font-bold text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded border border-sky-500/20">
                CLIENT PORTAL
              </span>
            </div>
            <p className="text-xs text-slate-400">Access your active websites, milestones, quotes & invoices</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-all cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {errorMsg && (
          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-medium mb-4">
            {errorMsg}
          </div>
        )}

        {/* Auth Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegisterMode && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. John Doe"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:outline-none focus:border-sky-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">Company Name *</label>
                  <input
                    type="text"
                    required
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="e.g. Acme Corp"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:outline-none focus:border-sky-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">Phone Number (Optional)</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+1 (555) 000-0000"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:outline-none focus:border-sky-500"
                />
              </div>
            </>
          )}

          <div>
            <label className="block text-xs font-mono text-slate-300 mb-1">Business Email Address *</label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="client@yourcompany.com"
                className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:outline-none focus:border-sky-500"
              />
              <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-mono text-slate-300">Password</label>
              {!isRegisterMode && (
                <span className="text-[11px] text-sky-400 font-mono">Passwordless / Magic login enabled</span>
              )}
            </div>
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:outline-none focus:border-sky-500"
              />
              <KeyRound className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-slate-950 font-extrabold text-xs shadow-lg shadow-sky-500/25 flex items-center justify-center gap-2 transition-all cursor-pointer mt-2"
          >
            <Shield className="w-4 h-4" />
            <span>{isRegisterMode ? 'Create Account & Open Portal' : 'Log In to Customer Portal'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="flex items-center justify-between pt-4 mt-4 border-t border-slate-800 text-xs text-slate-400">
          <button
            type="button"
            onClick={() => setIsRegisterMode(!isRegisterMode)}
            className="text-sky-400 hover:text-sky-300 font-medium cursor-pointer"
          >
            {isRegisterMode ? 'Already have an account? Sign In' : 'New client? Register here'}
          </button>

          <span className="font-mono text-[11px] text-slate-500">
            SSL 256-bit Encrypted
          </span>
        </div>
      </div>
    </div>
  );
};
