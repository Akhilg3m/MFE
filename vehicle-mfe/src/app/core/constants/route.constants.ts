export const ROUTES = {
  HOME: '',
  VEHICLES: 'vehicles',
  VEHICLE_DETAIL: 'vehicles',
  PAYMENT: 'payment',
  ABOUT: 'about',
  NOT_FOUND: '**'
};

export function getVehicleDetailRoute(id: string): string {
  return `/${ROUTES.VEHICLE_DETAIL}/${id}`;
}

export function getPaymentRoute(vehicleId: string): string {
  return `/${ROUTES.PAYMENT}/${vehicleId}`;
}
