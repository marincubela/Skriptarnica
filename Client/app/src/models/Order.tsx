import { Status } from "../api/models/ApiOrder";

export interface Order {
  id: Number;
  status: Status;
  orderDate: Date;
  orderReadyDate: Date | null;
  orderExecutedDate: Date | null;
  buyerEmail: String;
  trackingCode: Number;
  workerId: Number;
}
