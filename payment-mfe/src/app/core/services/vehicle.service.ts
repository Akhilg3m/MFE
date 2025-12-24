import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { API_ENDPOINTS } from '../constants/app.constants';
import { Vehicle } from '../models/vehicle.model';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  private apiUrl = `${environment.apiBaseUrl}${API_ENDPOINTS.VEHICLES}`;

  constructor(private http: HttpClient) {
    if (environment.debugMode) {
      console.log('VehicleService initialized');
      console.log('API URL:', this.apiUrl);
    }
  }

  getAllVehicles(): Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>(this.apiUrl);
  }

  getVehicleById(id: string): Observable<Vehicle> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Vehicle>(url);
  }

  searchByManufacturer(manufacturer: string): Observable<Vehicle[]> {
    const url = `${this.apiUrl}?manufacturer=${manufacturer}`;
    return this.http.get<Vehicle[]>(url);
  }
}
