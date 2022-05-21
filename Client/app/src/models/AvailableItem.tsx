export interface AvailableItem {
  id: number;
  name: string;
  unitPrice: number;
  available: boolean;
}

export interface AvailableProduct extends AvailableItem {}
export interface AvailableService extends AvailableItem {
  daysToComplete: number;
}
