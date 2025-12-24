/**
 * ============================================
 * VEHICLE DETAIL COMPONENT
 * ============================================
 *
 * BEGINNER EXPLANATION:
 * --------------------
 * This component displays details of a single vehicle.
 * It reads the vehicle ID from the URL and fetches data.
 *
 * KEY CONCEPTS:
 * - ActivatedRoute to read URL parameters
 * - CanComponentDeactivate for route guard
 * - Loading and error states
 *
 * URL: /vehicles/:id
 * The :id part is a ROUTE PARAMETER
 */

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VehicleService } from '../../../core/services/vehicle.service';
import { Vehicle } from '../../models/vehicle.model';
import { CanComponentDeactivate } from '../../../core/guards/notify.guard';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-vehicle-detail',
  templateUrl: './vehicle-detail.component.html',
  styleUrls: ['./vehicle-detail.component.scss']
})
export class VehicleDetailComponent implements OnInit, CanComponentDeactivate {

  // The vehicle data
  vehicle: Vehicle | null = null;

  // Loading state
  isLoading = true;

  // Error message
  errorMessage = '';

  // Track if user has interacted with the page
  // Used by the route guard
  hasInteracted = false;

  /**
   * CONSTRUCTOR
   * -----------
   * ActivatedRoute: Contains info about the current route
   * Router: Used for programmatic navigation
   * VehicleService: Our service for API calls
   */
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private vehicleService: VehicleService
  ) { }

  ngOnInit(): void {
    this.loadVehicle();
  }

  /**
   * LOAD VEHICLE DATA
   * -----------------
   * Gets the ID from URL and fetches vehicle data.
   *
   * URL: /vehicles/123
   * this.route.snapshot.paramMap.get('id') → '123'
   */
  loadVehicle(): void {
    // Get ID from URL
    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {
      this.errorMessage = 'No vehicle ID provided';
      this.isLoading = false;
      return;
    }

    // Fetch vehicle data
    this.vehicleService.getVehicleById(id).subscribe({
      next: (data: Vehicle) => {
        this.vehicle = data;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Failed to load vehicle details';
        this.isLoading = false;
        console.error('Error loading vehicle:', error);
      }
    });
  }

  /**
   * NAVIGATE BACK
   * -------------
   * Goes back to the vehicle list
   */
  goBack(): void {
    this.router.navigate(['/vehicles']);
  }

  /**
   * MARK INTERACTION
   * ----------------
   * Called when user interacts with the page.
   * The guard will ask for confirmation if hasInteracted is true.
   */
  onInteraction(): void {
    this.hasInteracted = true;
  }

  /**
   * BUY NOW
   * -------
   * Navigates to the payment page for this vehicle.
   * This triggers lazy loading of the PaymentsModule.
   */
  buyNow(): void {
    if (this.vehicle) {
      this.router.navigate(['/payment']);
    }
  }

  /**
   * CAN DEACTIVATE
   * --------------
   * Implements CanComponentDeactivate interface.
   * Called by NotifyGuard when user tries to leave.
   *
   * Returns:
   * - true: Allow navigation
   * - false: Block navigation
   * - confirm() result: Ask user
   */
  canDeactivate(): boolean | Observable<boolean> | Promise<boolean> {
    // If user hasn't interacted, allow leaving without prompt
    if (!this.hasInteracted) {
      return true;
    }

    // Ask user for confirmation
    return window.confirm('You have been viewing this vehicle. Leave anyway?');
  }
}
