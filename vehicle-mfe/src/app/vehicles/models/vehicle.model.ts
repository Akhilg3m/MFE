/**
 * ============================================
 * VEHICLE MODEL (Interface)
 * ============================================
 *
 * BEGINNER EXPLANATION:
 * --------------------
 * A MODEL (or Interface) defines the SHAPE of our data.
 * It tells TypeScript what properties an object should have.
 *
 * WHY USE MODELS?
 * - Type safety: Catch errors before runtime
 * - Autocomplete: IDE helps you with property names
 * - Documentation: Easy to understand data structure
 *
 * This interface matches the data from our Vehicle API.
 */

export interface Vehicle {
  // Unique identifier for each vehicle
  id: string;

  // Name of the vehicle (e.g., "Maserati Altima")
  Vehicle: string;

  // Company that made the vehicle (e.g., "Porsche")
  manufacturer: string;

  // Model name (e.g., "Alpine")
  model: string;

  // Type of vehicle (e.g., "Cargo Van", "SUV")
  type: string;

  // Fuel type (e.g., "Hybrid", "Gasoline", "Electric")
  fuel: string;

  // Color of the vehicle (e.g., "azure", "red")
  color: string;

  // URL to vehicle image
  image: string;

  // Price/cost as string (e.g., "944.29")
  cost: string;

  // Number of tyres
  tyres: number;
}

/**
 * OPTIONAL: You can also create a class if you need methods
 * For beginners, interface is simpler and recommended
 */
