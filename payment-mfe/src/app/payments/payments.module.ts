/**
 * ============================================
 * PAYMENTS MODULE (LAZY LOADED)
 * ============================================
 *
 * Feature module for payment functionality.
 * This module is lazy-loaded when user clicks "Buy Now".
 *
 * LAZY LOADING BENEFITS:
 * - Faster initial page load
 * - Code splitting (smaller bundles)
 * - Only loads when needed
 *
 * STRUCTURE:
 * features/payments/
 * ├── components/
 * │   ├── payment-list/
 * │   └── payment-summary/
 * │
 * ├── pages/
 * │   └── payments-page/
 * │
 * ├── models/
 * │   └── payment.model.ts
 * │
 * ├── payments-routing.module.ts
 * └── payments.module.ts
 */

import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { PaymentsRoutingModule } from './payments-routing.module';

// Components
import { PaymentListComponent } from './components/payment-list/payment-list.component';
import { PaymentSummaryComponent } from './components/payment-summary/payment-summary.component';

// Pages
import { PaymentsPageComponent } from './pages/payments-page/payments-page.component';

@NgModule({
  declarations: [
    PaymentListComponent,
    PaymentSummaryComponent,
    PaymentsPageComponent
  ],
  imports: [
    SharedModule,
    PaymentsRoutingModule
  ]
})
export class PaymentsModule { }
