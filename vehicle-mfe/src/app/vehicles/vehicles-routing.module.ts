/**
 * ============================================
 * VEHICLES ROUTING MODULE
 * ============================================
 *
 * Defines routes for the lazy-loaded VehiclesModule.
 * Uses RouterModule.forChild() for feature module routing.
 */

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { VehiclesPageComponent } from './pages/vehicles-page/vehicles-page.component';
import { VehicleDetailComponent } from './components/vehicle-detail/vehicle-detail.component';
import { NotifyGuard } from '../core/guards/notify.guard';

const routes: Routes = [
  {
    path: '',
    component: VehiclesPageComponent
  },
  {
    path: ':id',
    component: VehicleDetailComponent,
    canDeactivate: [NotifyGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VehiclesRoutingModule { }
