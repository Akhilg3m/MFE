/**
 * ============================================
 * VEHICLES MODULE (LAZY LOADED)
 * ============================================
 *
 * Feature module for vehicle browsing functionality.
 * This module is lazy-loaded when user navigates to /vehicles.
 *
 * LAZY LOADING BENEFITS:
 * - Faster initial page load
 * - Code splitting (smaller bundles)
 * - Only loads when needed
 *
 * STRUCTURE:
 * features/vehicles/
 * ├── components/
 * │   ├── vehicle-list/
 * │   └── vehicle-detail/
 * │
 * ├── pages/
 * │   └── vehicles-page/
 * │
 * ├── models/
 * │   └── vehicle.model.ts
 * │
 * ├── vehicles-routing.module.ts
 * └── vehicles.module.ts
 */

import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { VehiclesRoutingModule } from './vehicles-routing.module';

// Components
import { VehicleListComponent } from './components/vehicle-list/vehicle-list.component';
import { VehicleDetailComponent } from './components/vehicle-detail/vehicle-detail.component';

// Pages
import { VehiclesPageComponent } from './pages/vehicles-page/vehicles-page.component';
import { HttpClientModule } from '@angular/common/http';

// Services
import { VehicleService } from '../core/services/vehicle.service';

@NgModule({
  declarations: [
    VehicleListComponent,
    VehicleDetailComponent,
    VehiclesPageComponent
  ],
  imports: [
    SharedModule,
    VehiclesRoutingModule,
    HttpClientModule
  ],
  providers: [VehicleService]
})
export class VehiclesModule { }
