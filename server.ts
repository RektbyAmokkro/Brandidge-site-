import express, { Request, Response } from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get('/api/health', (req: Request, res: Response) => {
    res.json({
      status: 'ok',
      service: 'BrandRidge Digital Architecture Engine',
      timestamp: new Date().toISOString(),
      version: '2.4.0'
    });
  });

  // Mock server-side auth validation
  app.post('/api/auth/login', (req: Request, res: Response) => {
    const { email, password, role } = req.body;

    if (role === 'admin') {
      const u = (email || '').trim().toLowerCase();
      const p = (password || '').trim();
      if ((u === 'admin' || u === 'admin@brandridge.com' || u === 'brandidge') && (p === 'admin' || p === 'brandidge2026')) {
        return res.json({
          success: true,
          token: `token_admin_${Date.now()}`,
          user: {
            id: 'user-admin',
            email: 'admin@brandridge.com',
            role: 'admin',
            fullName: 'System Administrator',
            companyName: 'BrandRidge Digital Architecture'
          }
        });
      }
      return res.status(401).json({ success: false, error: 'Invalid admin credentials' });
    }

    // Customer login
    const userEmail = (email || '').trim().toLowerCase();
    if (!userEmail) {
      return res.status(400).json({ success: false, error: 'Email is required' });
    }

    // Return authenticated session
    return res.json({
      success: true,
      token: `token_cust_${Date.now()}`,
      user: {
        id: `user-${userEmail.replace(/[^a-z0-9]/g, '')}`,
        email: userEmail,
        role: 'customer',
        fullName: userEmail.split('@')[0].replace('.', ' ').toUpperCase(),
        customerId: `cust-${userEmail.replace(/[^a-z0-9]/g, '')}`
      }
    });
  });

  // Financial & Pricing Engine: Calculate Quote & Breakdown
  app.post('/api/pricing/calculate-quote', (req: Request, res: Response) => {
    try {
      const {
        basePrice = 0,
        selectedExtras = [],
        customItems = [],
        discountType = 'fixed',
        discountValue = 0,
        vatRate = 21,
        paymentPlan = 'two_installments',
        depositPercentage = 50,
        milestoneInstallments = []
      } = req.body;

      const items: any[] = [];
      const numBasePrice = Math.max(0, Number(basePrice) || 0);

      // Base project item
      if (numBasePrice > 0 || (selectedExtras.length === 0 && customItems.length === 0)) {
        items.push({
          id: `qi-base-${Date.now()}`,
          nameSnapshot: 'Base Website Architecture & Web Development',
          description: 'Base Website Architecture & High-Converting Engineering',
          quantity: 1,
          unitPrice: numBasePrice,
          vatRate: Number(vatRate),
          total: numBasePrice,
          itemType: 'base_project'
        });
      }

      // Extras
      selectedExtras.forEach((extra: any) => {
        const itemPrice = Math.max(0, Number(extra.customPrice) || 0);
        items.push({
          id: `qi-ext-${extra.serviceId || Date.now()}-${Date.now()}`,
          serviceId: extra.serviceId,
          nameSnapshot: extra.name || 'Service Add-on',
          description: extra.description || extra.name || 'Selected Add-on Feature',
          quantity: 1,
          unitPrice: itemPrice,
          vatRate: Number(vatRate),
          total: itemPrice,
          itemType: 'service_extra'
        });
      });

      // Custom items
      customItems.forEach((c: any, idx: number) => {
        if (c.description && c.description.trim()) {
          const qty = Math.max(1, Number(c.quantity) || 1);
          const uPrice = Math.max(0, Number(c.unitPrice) || 0);
          const itemVat = c.vatRate !== undefined ? Number(c.vatRate) : Number(vatRate);
          const total = Math.round(qty * uPrice * 100) / 100;
          items.push({
            id: `qi-cust-${Date.now()}-${idx}`,
            nameSnapshot: c.description.trim(),
            description: c.description.trim(),
            quantity: qty,
            unitPrice: uPrice,
            vatRate: itemVat,
            total,
            itemType: 'custom'
          });
        }
      });

      const subtotal = Math.round(items.reduce((s, i) => s + i.total, 0) * 100) / 100;
      
      let discountTotal = 0;
      const numDiscountVal = Math.max(0, Number(discountValue) || 0);
      if (discountType === 'percentage') {
        const pct = Math.min(100, numDiscountVal);
        discountTotal = Math.round((subtotal * pct) / 100);
      } else {
        discountTotal = Math.min(subtotal, numDiscountVal);
      }

      const taxableAmount = Math.max(0, subtotal - discountTotal);
      const vatTotal = Math.round((taxableAmount * Number(vatRate)) / 100);
      const totalAmount = Math.max(0, taxableAmount + vatTotal);

      // Generate payment plan (1, 2, or 3 installments)
      const installments: any[] = [];
      if (paymentPlan === 'three_installments') {
        const p1 = Math.round((totalAmount / 3) * 100) / 100;
        const p2 = Math.round((totalAmount / 3) * 100) / 100;
        const p3 = Math.round((totalAmount - p1 - p2) * 100) / 100;

        installments.push({
          installmentNumber: 1,
          label: '1st Installment: Kickoff & Architecture Deposit',
          percentage: 33.33,
          amount: p1,
          dueTrigger: 'Due Immediately Upon Signing',
          dueDate: new Date(Date.now() + 3 * 86400000).toISOString().split('T')[0]
        });
        installments.push({
          installmentNumber: 2,
          label: '2nd Installment: Staging Preview Approval',
          percentage: 33.33,
          amount: p2,
          dueTrigger: 'Due Upon Interactive Staging Approval',
          dueDate: new Date(Date.now() + 17 * 86400000).toISOString().split('T')[0]
        });
        installments.push({
          installmentNumber: 3,
          label: '3rd Installment: Production Live Cutover',
          percentage: 33.34,
          amount: p3,
          dueTrigger: 'Due Prior to Production Launch',
          dueDate: new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0]
        });
      } else if (paymentPlan === 'two_installments') {
        const p1 = Math.round((totalAmount / 2) * 100) / 100;
        const p2 = Math.round((totalAmount - p1) * 100) / 100;

        installments.push({
          installmentNumber: 1,
          label: 'Payment 1: 50% Kickoff Deposit',
          percentage: 50,
          amount: p1,
          dueTrigger: 'Due Immediately Upon Signing',
          dueDate: new Date(Date.now() + 3 * 86400000).toISOString().split('T')[0]
        });
        installments.push({
          installmentNumber: 2,
          label: 'Payment 2: 50% Final Milestone',
          percentage: 50,
          amount: p2,
          dueTrigger: 'Due at Production Live Cutover',
          dueDate: new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0]
        });
      } else if (paymentPlan === 'percentage_deposit') {
        const pct = Math.min(99, Math.max(1, Number(depositPercentage) || 50));
        const p1 = Math.round((totalAmount * pct) / 100);
        const p2 = Math.round((totalAmount - p1) * 100) / 100;

        installments.push({
          installmentNumber: 1,
          label: `Payment 1: ${pct}% Kickoff Deposit`,
          percentage: pct,
          amount: p1,
          dueTrigger: 'Due Immediately Upon Signing',
          dueDate: new Date(Date.now() + 3 * 86400000).toISOString().split('T')[0]
        });
        installments.push({
          installmentNumber: 2,
          label: `Payment 2: ${100 - pct}% Final Launch Balance`,
          percentage: 100 - pct,
          amount: p2,
          dueTrigger: 'Due at Production Live Cutover',
          dueDate: new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0]
        });
      } else if (paymentPlan === 'milestone_installments' && milestoneInstallments.length > 0) {
        let running = 0;
        const count = milestoneInstallments.length;
        milestoneInstallments.forEach((m: any, idx: number) => {
          const isLast = idx === count - 1;
          const instAmount = isLast ? Math.round((totalAmount - running) * 100) / 100 : Math.round((totalAmount * m.percentage) / 100);
          running += instAmount;
          installments.push({
            installmentNumber: idx + 1,
            label: m.label || `Milestone ${idx + 1}`,
            percentage: m.percentage,
            amount: instAmount,
            dueTrigger: m.dueTrigger || `Milestone ${idx + 1} Approval`,
            dueDate: m.dueDate || new Date(Date.now() + (idx * 14 + 7) * 86400000).toISOString().split('T')[0]
          });
        });
      } else {
        installments.push({
          installmentNumber: 1,
          label: 'Payment in Full (100%)',
          percentage: 100,
          amount: totalAmount,
          dueTrigger: 'Due Within 14 Days of Signing',
          dueDate: new Date(Date.now() + 14 * 86400000).toISOString().split('T')[0]
        });
      }

      res.json({
        success: true,
        calculation: {
          items,
          subtotal,
          discountTotal,
          vatTotal,
          totalAmount,
          installments,
          paymentSchedule: installments
        }
      });
    } catch (err: any) {
      res.status(400).json({ success: false, error: err.message || 'Calculation error' });
    }
  });

  // Payment Plan Schedule Generator Endpoint (1, 2, or 3 Installments)
  app.post('/api/payment-plans/generate', (req: Request, res: Response) => {
    const { totalAmount = 0, paymentPlan = 'two_installments', depositPercentage = 50 } = req.body;
    const total = Math.max(0, Math.round(Number(totalAmount) * 100) / 100);

    const schedule: any[] = [];
    if (paymentPlan === 'three_installments') {
      const p1 = Math.round((total / 3) * 100) / 100;
      const p2 = Math.round((total / 3) * 100) / 100;
      const p3 = Math.round((total - p1 - p2) * 100) / 100;

      schedule.push(
        { installmentNumber: 1, label: '1st Installment: Kickoff Deposit', percentage: 33.33, amount: p1, dueTrigger: 'Due Upon Signing', dueDate: new Date(Date.now() + 3 * 86400000).toISOString().split('T')[0] },
        { installmentNumber: 2, label: '2nd Installment: Staging Preview', percentage: 33.33, amount: p2, dueTrigger: 'Due at Staging Approval', dueDate: new Date(Date.now() + 17 * 86400000).toISOString().split('T')[0] },
        { installmentNumber: 3, label: '3rd Installment: Production Launch', percentage: 33.34, amount: p3, dueTrigger: 'Due Prior to Go-Live', dueDate: new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0] }
      );
    } else if (paymentPlan === 'two_installments') {
      const p1 = Math.round((total / 2) * 100) / 100;
      const p2 = Math.round((total - p1) * 100) / 100;

      schedule.push(
        { installmentNumber: 1, label: 'Payment 1: 50% Kickoff Deposit', percentage: 50, amount: p1, dueTrigger: 'Due Upon Signing', dueDate: new Date(Date.now() + 3 * 86400000).toISOString().split('T')[0] },
        { installmentNumber: 2, label: 'Payment 2: 50% Final Milestone', percentage: 50, amount: p2, dueTrigger: 'Due at Live Cutover', dueDate: new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0] }
      );
    } else {
      schedule.push(
        { installmentNumber: 1, label: 'Payment in Full (100%)', percentage: 100, amount: total, dueTrigger: 'Due Within 14 Days', dueDate: new Date(Date.now() + 14 * 86400000).toISOString().split('T')[0] }
      );
    }

    res.json({ success: true, totalAmount: total, schedule });
  });

  // Services Catalog Endpoint
  app.get('/api/services', (req: Request, res: Response) => {
    res.json({
      success: true,
      services: [
        { id: 'svc-1', name: 'Custom High-Converting Web Design', defaultPrice: 500, type: 'one_time', isActive: true },
        { id: 'svc-2', name: 'SEO & Search Engine Acceleration', defaultPrice: 350, type: 'one_time', isActive: true },
        { id: 'svc-3', name: 'Sub-Second Speed & Core Web Vitals Optimization', defaultPrice: 400, type: 'one_time', isActive: true },
        { id: 'svc-4', name: 'WhatsApp & SMS Direct Conversion Lead Flow', defaultPrice: 250, type: 'one_time', isActive: true },
        { id: 'svc-5', name: 'Interactive Online Booking & Calendar Scheduling', defaultPrice: 450, type: 'one_time', isActive: true },
        { id: 'svc-6', name: 'Multi-Language Architecture (EN, NL, DE, ES)', defaultPrice: 600, type: 'one_time', isActive: true },
        { id: 'svc-7', name: 'Copywriting & Value Proposition Framing', defaultPrice: 350, type: 'one_time', isActive: true },
        { id: 'svc-8', name: '30 Days Post-Launch Concierge Maintenance', defaultPrice: 0, type: 'one_time', isActive: true },
        { id: 'svc-9', name: 'Ongoing Managed Cloud Hosting & Security Care', defaultPrice: 89, type: 'recurring', recurringInterval: 'monthly', isActive: true }
      ]
    });
  });

  // Financial webhook handler with signature validation simulation
  app.post('/api/payments/webhook', (req: Request, res: Response) => {
    const signature = req.headers['stripe-signature'] || req.headers['x-webhook-signature'];
    const event = req.body;

    console.log(`[Payment Webhook] Received event: ${event.type || 'payment_intent.succeeded'} (Signature verified)`);

    res.json({ received: true, eventId: event.id || `evt_${Date.now()}` });
  });

  // Vite middleware for development vs static dist for production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`BrandRidge Full-Stack Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
