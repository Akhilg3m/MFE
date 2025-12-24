/**
 * ============================================
 * PAYMENTS ROUTING MODULE
 * ============================================
 *
 * Defines routes for the lazy-loaded PaymentsModule.
 * Uses RouterModule.forChild() for feature module routing.
 */

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PaymentsPageComponent } from './pages/payments-page/payments-page.component';
import { PaymentListComponent } from './components/payment-list/payment-list.component';
import { PaymentSummaryComponent } from './components/payment-summary/payment-summary.component';

const routes: Routes = [
  {
    path: '',
    component: PaymentsPageComponent,
    children: [
      { path: '', component: PaymentListComponent },
      { path: 'upi', component: PaymentSummaryComponent },
      { path: 'card', component: PaymentSummaryComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentsRoutingModule { }
