/**
 * ============================================
 * VEHICLE LIST COMPONENT
 * ============================================
 *
 * BEGINNER EXPLANATION:
 * --------------------
 * This component displays a list of vehicles.
 * It fetches data from the API using VehicleService.
 *
 * KEY CONCEPTS SHOWN:
 * - Dependency Injection (VehicleService)
 * - OnInit lifecycle hook
 * - Subscribing to Observables
 * - Loading and error states
 * - Displaying lists with *ngFor
 */

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VehicleService } from '../../../core/services/vehicle.service';
import { Vehicle } from '../../models/vehicle.model';
import { getVehicleDetailRoute } from '../../../core/constants/route.constants';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.scss']
})
export class VehicleListComponent implements OnInit {

  // Array to store vehicles from API
  vehicles: Vehicle[] = [];

  // Loading state - true while fetching data
  isLoading = true;

  // Error state - stores error message if API fails
  errorMessage = '';

  /**
   * CONSTRUCTOR - Dependency Injection
   * ----------------------------------
   * Angular "injects" these services automatically.
   * We don't create them with 'new' - Angular handles that!
   */
  constructor(
    private vehicleService: VehicleService,
    private router: Router
  ) { }

  /**
   * ngOnInit LIFECYCLE HOOK
   * -----------------------
   * Called once when component initializes.
   * Perfect place to load data!
   *
   * LIFECYCLE ORDER:
   * constructor → ngOnChanges → ngOnInit → ngAfterViewInit → ngOnDestroy
   */
  ngOnInit(): void {
    this.loadVehicles();
  }

  /**
   * LOAD VEHICLES FROM API
   * ----------------------
   * Calls the service to fetch vehicle data.
   *
   * SUBSCRIBE EXPLAINED:
   * - Observables are "lazy" - nothing happens until subscribe()
   * - next: Called when data arrives successfully
   * - error: Called if something goes wrong
   * - complete: Called when stream ends (optional)
   */
  loadVehicles(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.vehicleService.getAllVehicles().subscribe({
      // Success callback
      next: (data: Vehicle[]) => {
        this.vehicles = data;
        this.isLoading = false;
      },
      // Error callback
      error: (error) => {
        this.errorMessage = 'Failed to load vehicles. Please try again.';
        this.isLoading = false;
        console.error('Error loading vehicles:', error);
      }
    });
  }

  /**
   * NAVIGATE TO VEHICLE DETAIL
   * --------------------------
   * Called when user clicks on a vehicle card.
   * Uses Router to navigate programmatically.
   */
  viewVehicle(vehicle: Vehicle): void {
    const route = getVehicleDetailRoute(vehicle.id);
    this.router.navigate([route]);
  }

  /**
   * TRACK BY FUNCTION
   * -----------------
   * Used with *ngFor to improve performance.
   * Tells Angular how to identify each item uniquely.
   *
   * Without trackBy: Angular re-renders entire list on any change
   * With trackBy: Angular only updates changed items
   */
  trackByVehicleId(index: number, vehicle: Vehicle): string {
    return vehicle.id;
  }
}
