import React, { useState } from 'react';
import { Invoice, Installment } from '../types';
import { PortalStore } from '../data/portalStore';
import { X, CreditCard, CheckCircle2, ShieldCheck, Lock, ArrowRight, Building, Sparkles } from 'lucide-react';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  invoice: Invoice | null;
  installment?: Installment | null;
  onPaymentSuccess: () => void;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  invoice,
  installment,
  onPaymentSuccess
}) => {
  const [paymentMethod, setPaymentMethod] = useState<'credit_card' | 'sepa' | 'ideal'>('credit_card');
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [expiry, setExpiry] = useState('12/28');
  const [cvc, setCvc] = useState('888');
  const [cardHolder, setCardHolder] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentDone, setPaymentDone] = useState(false);
  const [txRef, setTxRef] = useState('');

  if (!isOpen || !invoice) return null;

  const targetAmount = installment ? installment.amount : invoice.balanceDue;
  const payLabel = installment ? installment.label : `Full Balance for ${invoice.invoiceNumber}`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      try {
        const result = PortalStore.recordPayment({
          invoiceId: invoice.id,
          installmentId: installment?.id,
          amount: targetAmount,
          paymentMethod: paymentMethod === 'credit_card' ? 'credit_card' : paymentMethod === 'sepa' ? 'sepa' : 'ideal'
        });

        setIsProcessing(false);
        setPaymentDone(true);
        setTxRef(result.paymentRecord.providerTxId);
        onPaymentSuccess();
      } catch (err) {
        setIsProcessing(false);
        alert('Payment recording failed. Please try again.');
      }
    }, 1200);
  };

  const handleClose = () => {
    setPaymentDone(false);
    setIsProcessing(false);
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto"
      onClick={handleClose}
    >
      <div 
        className="relative w-full max-w-lg bg-slate-900 border border-slate-700/80 text-white rounded-3xl shadow-2xl overflow-hidden p-6 sm:p-8 my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-5 mb-5 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Secure Payment Terminal</h3>
              <p className="text-xs text-slate-400 font-mono">256-bit Encrypted SSL Gateway</p>
            </div>
          </div>
          <button 
            onClick={handleClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-all cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {paymentDone ? (
          /* Payment Success State */
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-500 flex items-center justify-center text-emerald-400 mx-auto animate-bounce">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-white">Payment Confirmed!</h2>
            <p className="text-sm text-slate-300">
              We received your payment of <strong className="text-emerald-400 font-mono">€{targetAmount.toLocaleString()}</strong> for <strong className="text-white">{invoice.invoiceNumber}</strong>.
            </p>

            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-left text-xs font-mono space-y-1.5 text-slate-400">
              <div className="flex justify-between">
                <span>Transaction Ref:</span>
                <span className="text-cyan-400 font-bold">{txRef}</span>
              </div>
              <div className="flex justify-between">
                <span>Target:</span>
                <span className="text-white">{payLabel}</span>
              </div>
              <div className="flex justify-between">
                <span>Status:</span>
                <span className="text-emerald-400 font-bold">VERIFIED_SETTLED</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={handleClose}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-sm shadow-lg shadow-cyan-500/20 transition-all cursor-pointer"
              >
                Return to Dashboard
              </button>
            </div>
          </div>
        ) : (
          /* Payment Form */
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Amount Summary Card */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-950 to-slate-900 border border-cyan-500/30">
              <div className="flex justify-between items-center text-xs text-slate-400 mb-1">
                <span>Paying for:</span>
                <span className="font-mono text-cyan-400 font-bold">{invoice.invoiceNumber}</span>
              </div>
              <div className="text-sm font-semibold text-white truncate mb-2">{payLabel}</div>
              <div className="flex justify-between items-baseline pt-2 border-t border-slate-800/80">
                <span className="text-xs text-slate-400">Total Amount Due:</span>
                <span className="text-2xl font-black font-mono text-emerald-400">€{targetAmount.toLocaleString()}</span>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setPaymentMethod('credit_card')}
                className={`py-2.5 px-3 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                  paymentMethod === 'credit_card'
                    ? 'bg-cyan-500/15 border-cyan-500 text-cyan-300 shadow-sm'
                    : 'bg-slate-800/50 border-slate-700/60 text-slate-400 hover:bg-slate-800'
                }`}
              >
                <CreditCard className="w-4 h-4" />
                <span>Credit Card</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('sepa')}
                className={`py-2.5 px-3 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                  paymentMethod === 'sepa'
                    ? 'bg-cyan-500/15 border-cyan-500 text-cyan-300 shadow-sm'
                    : 'bg-slate-800/50 border-slate-700/60 text-slate-400 hover:bg-slate-800'
                }`}
              >
                <Building className="w-4 h-4" />
                <span>SEPA / IBAN</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('ideal')}
                className={`py-2.5 px-3 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                  paymentMethod === 'ideal'
                    ? 'bg-cyan-500/15 border-cyan-500 text-cyan-300 shadow-sm'
                    : 'bg-slate-800/50 border-slate-700/60 text-slate-400 hover:bg-slate-800'
                }`}
              >
                <Sparkles className="w-4 h-4" />
                <span>iDEAL / Wire</span>
              </button>
            </div>

            {/* Card Inputs */}
            {paymentMethod === 'credit_card' && (
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">Cardholder Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder={invoice.customerName || 'Full Name'}
                    defaultValue={invoice.customerName}
                    onChange={(e) => setCardHolder(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-cyan-500 font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">Card Number (Stripe Test / Live)</label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm font-mono focus:outline-none focus:border-cyan-500"
                    />
                    <CreditCard className="w-4 h-4 text-slate-400 absolute right-3.5 top-3.5" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">Expiry Date</label>
                    <input
                      type="text"
                      required
                      value={expiry}
                      onChange={(e) => setExpiry(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm font-mono focus:outline-none focus:border-cyan-500 text-center"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">CVC / CVV</label>
                    <input
                      type="password"
                      required
                      maxLength={4}
                      value={cvc}
                      onChange={(e) => setCvc(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm font-mono focus:outline-none focus:border-cyan-500 text-center"
                    />
                  </div>
                </div>
              </div>
            )}

            {paymentMethod === 'sepa' && (
              <div className="space-y-3 p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs">
                <p className="text-slate-300">Authorize SEPA Direct Debit Mandate for {invoice.company}:</p>
                <input
                  type="text"
                  placeholder="IBAN: NL91 INGB 0401 9283 11"
                  defaultValue="NL91 INGB 0401 9283 11"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono text-sm"
                />
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  By confirming, you authorize BrandRidge Solutions B.V. to debit your account according to SEPA regulations.
                </p>
              </div>
            )}

            {paymentMethod === 'ideal' && (
              <div className="space-y-3 p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs">
                <p className="text-slate-300">Select your bank:</p>
                <select className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm font-medium">
                  <option>ING Bank</option>
                  <option>ABN AMRO</option>
                  <option>Rabobank</option>
                  <option>Revolut</option>
                  <option>Bunq</option>
                </select>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isProcessing}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-slate-950 font-extrabold text-sm shadow-xl shadow-cyan-500/25 flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50"
            >
              {isProcessing ? (
                <span>Authorizing Payment...</span>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>Authorize €{targetAmount.toLocaleString()} Payment</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 font-mono">
              <Lock className="w-3 h-3 text-cyan-400" />
              <span>PCI-DSS Level 1 Verified • Automated Webhook Confirmation</span>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
