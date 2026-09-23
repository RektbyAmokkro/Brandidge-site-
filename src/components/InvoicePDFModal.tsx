import React from 'react';
import { Invoice, CompanySettings } from '../types';
import { X, Printer, Download, CheckCircle2, ShieldCheck, Building2, Mail, Phone, Globe, Calendar, CreditCard } from 'lucide-react';
import { BrandLogo } from './BrandLogo';

interface InvoicePDFModalProps {
  isOpen: boolean;
  onClose: () => void;
  invoice: Invoice | null;
  settings: CompanySettings;
}

export const InvoicePDFModal: React.FC<InvoicePDFModalProps> = ({
  isOpen,
  onClose,
  invoice,
  settings
}) => {
  if (!isOpen || !invoice) return null;

  const handlePrint = () => {
    window.print();
  };

  const isPaid = invoice.status === 'paid';
  const isPartiallyPaid = invoice.status === 'partially_paid';

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-4xl bg-white text-slate-900 rounded-3xl shadow-2xl overflow-hidden my-auto p-6 sm:p-10 border border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Control Bar (Hidden when printing) */}
        <div className="flex items-center justify-between pb-6 mb-6 border-b border-slate-200 print:hidden">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-slate-100 text-slate-700">
              Tax Invoice Document
            </span>
            <span className={`px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider ${
              isPaid ? 'bg-emerald-100 text-emerald-800' : isPartiallyPaid ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-800'
            }`}>
              Status: {invoice.status.replace('_', ' ')}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs flex items-center gap-2 transition-all cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Save as PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Invoice Printable Sheet */}
        <div className="space-y-8 font-sans">
          
          {/* Header Row: Company Details & Invoice Meta */}
          <div className="flex flex-col sm:flex-row justify-between items-start gap-6 border-b border-slate-200 pb-8">
            <div>
              <div className="mb-2">
                <BrandLogo size="lg" darkText={true} />
              </div>
              <p className="text-xs text-slate-500 font-medium">{settings.legalEntity}</p>
              <p className="text-xs text-slate-500">{settings.address.street}</p>
              <p className="text-xs text-slate-500">{settings.address.postalCode} {settings.address.city}, {settings.address.country}</p>
              <p className="text-xs text-slate-500 mt-1">VAT: <strong className="text-slate-700">{settings.vatNumber}</strong> • KvK: <strong className="text-slate-700">{settings.kvkRegistration}</strong></p>
              <p className="text-xs text-slate-500">{settings.email} • {settings.phone}</p>
            </div>

            <div className="text-left sm:text-right">
              <h1 className="text-3xl font-black text-slate-950 font-mono tracking-tight">
                {invoice.invoiceNumber}
              </h1>
              <div className="mt-2 space-y-1 text-xs text-slate-600">
                <div>Issue Date: <strong className="text-slate-900 font-mono">{invoice.issueDate}</strong></div>
                <div>Due Date: <strong className="text-slate-900 font-mono">{invoice.dueDate}</strong></div>
                {invoice.quoteId && <div>Reference Quote: <strong className="text-slate-900 font-mono">{invoice.quoteId}</strong></div>}
              </div>

              {isPaid && (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 mt-3 rounded-lg bg-emerald-50 border border-emerald-300 text-emerald-700 font-bold text-xs font-mono">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>PAID IN FULL</span>
                </div>
              )}
            </div>
          </div>

          {/* Billed To & Project Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-slate-50 p-5 rounded-2xl border border-slate-200">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 font-bold block mb-1">
                Billed To:
              </span>
              <h3 className="text-base font-bold text-slate-950">{invoice.customerName}</h3>
              <p className="text-xs font-semibold text-slate-700">{invoice.company}</p>
              <p className="text-xs text-slate-600 mt-1">{invoice.billingAddress.street}</p>
              <p className="text-xs text-slate-600">{invoice.billingAddress.postalCode} {invoice.billingAddress.city}, {invoice.billingAddress.country}</p>
              <p className="text-xs text-slate-600 mt-1">Email: {invoice.email}</p>
              {invoice.vatNumber && <p className="text-xs text-slate-600">VAT / Tax ID: <strong className="font-mono">{invoice.vatNumber}</strong></p>}
            </div>

            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 font-bold block mb-1">
                Project & Scope:
              </span>
              <h3 className="text-base font-bold text-slate-950">{invoice.projectName || 'Digital Architecture & Web System'}</h3>
              <p className="text-xs text-slate-600 mt-1">Payment Plan: <strong className="capitalize text-slate-800">{invoice.paymentStructure.replace(/_/g, ' ')}</strong></p>
              <p className="text-xs text-slate-600">Currency: <strong className="text-slate-800">EUR (€)</strong></p>
            </div>
          </div>

          {/* Line Items Table */}
          <div>
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b-2 border-slate-300 text-slate-500 font-mono uppercase tracking-wider">
                  <th className="py-3 font-semibold">Description</th>
                  <th className="py-3 text-center font-semibold">Qty</th>
                  <th className="py-3 text-right font-semibold">Unit Price</th>
                  <th className="py-3 text-center font-semibold">VAT</th>
                  <th className="py-3 text-right font-semibold">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {invoice.items.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50">
                    <td className="py-3.5 pr-4">
                      <div className="font-semibold text-slate-900">{item.description}</div>
                      {item.isRecurring && (
                        <span className="inline-block mt-0.5 text-[10px] text-cyan-700 bg-cyan-50 px-1.5 py-0.5 rounded font-mono font-medium">
                          Recurring ({item.recurringInterval})
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 text-center font-mono text-slate-700">{item.quantity}</td>
                    <td className="py-3.5 text-right font-mono text-slate-700">€{item.unitPrice.toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
                    <td className="py-3.5 text-center font-mono text-slate-500">{item.vatRate}%</td>
                    <td className="py-3.5 text-right font-mono font-bold text-slate-950">€{item.total.toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Financial Totals Calculation Box */}
          <div className="flex flex-col sm:flex-row justify-between items-start gap-6 pt-4 border-t border-slate-200">
            <div className="space-y-2 max-w-sm text-xs text-slate-600">
              <span className="font-bold text-slate-900 block">Bank Transfer Instructions:</span>
              <p>Bank: <strong>{settings.bankDetails.bankName}</strong></p>
              <p>IBAN: <strong className="font-mono text-slate-900">{settings.bankDetails.iban}</strong></p>
              <p>BIC: <strong className="font-mono text-slate-900">{settings.bankDetails.bic}</strong></p>
              <p className="text-[11px] text-slate-500 italic mt-1">Please include invoice number <strong className="text-slate-800">{invoice.invoiceNumber}</strong> in the payment description.</p>
            </div>

            <div className="w-full sm:w-72 space-y-2 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal:</span>
                <span className="font-mono">€{invoice.subtotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
              </div>
              {invoice.discountTotal > 0 && (
                <div className="flex justify-between text-emerald-700">
                  <span>Discount:</span>
                  <span className="font-mono">-€{invoice.discountTotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                </div>
              )}
              <div className="flex justify-between text-slate-600">
                <span>VAT / Tax ({settings.defaultVatRate}%):</span>
                <span className="font-mono">€{invoice.vatTotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
              </div>
              <div className="flex justify-between text-base font-black text-slate-950 border-t-2 border-slate-900 pt-2">
                <span>Total Due:</span>
                <span className="font-mono">€{invoice.totalAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
              </div>
              <div className="flex justify-between text-emerald-700 font-semibold pt-1">
                <span>Amount Paid:</span>
                <span className="font-mono">€{invoice.amountPaid.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-blue-900 bg-blue-50 p-2 rounded-xl border border-blue-200 mt-1">
                <span>Remaining Balance:</span>
                <span className="font-mono">€{invoice.balanceDue.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
              </div>
            </div>
          </div>

          {/* Payment Plan Installments Schedule */}
          {invoice.installments && invoice.installments.length > 1 && (
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="text-xs font-mono font-bold text-slate-700 uppercase tracking-wider">
                Installment Payment Schedule
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {invoice.installments.map((inst, i) => (
                  <div 
                    key={inst.id || i}
                    className={`p-3 rounded-xl border text-xs flex items-center justify-between ${
                      inst.status === 'paid' ? 'bg-emerald-50/70 border-emerald-200 text-emerald-900' : 'bg-white border-slate-200 text-slate-900'
                    }`}
                  >
                    <div>
                      <div className="font-bold">{inst.label}</div>
                      <div className="text-[11px] text-slate-500 font-mono mt-0.5">Due: {inst.dueDate}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-mono font-extrabold">€{inst.amount.toLocaleString()}</div>
                      <span className={`inline-block text-[10px] px-2 py-0.5 rounded-full font-mono font-bold uppercase mt-1 ${
                        inst.status === 'paid' ? 'bg-emerald-200 text-emerald-900' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {inst.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Footer Guarantee */}
          <div className="text-center pt-6 border-t border-slate-200 text-[11px] text-slate-400">
            <p>BrandRidge Solutions B.V. • All work protected by 1-Month Free Agency Warranty & Performance SLA • Thank you for your partnership.</p>
          </div>

        </div>
      </div>
    </div>
  );
};
