import { ApiProduct } from "../api/models/ApiProduct";
import { ApiServiceItem } from "../api/models/ApiService";

export interface OrderDetails {
  orderId: number;
  indexInOrder: number;
  offerId: number;
  quantity: number;
  product: ApiProduct | null;
  service: ApiServiceItem | null;
}
