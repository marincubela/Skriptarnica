import axios from "axios";

export enum Status {
  "Zaprimljeno",
  "U tijeku",
  "Otkazano",
}

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

const fakeOrders: Array<Order> = [
  {
    id: 1,
    status: Status["U tijeku"],
    orderDate: new Date(),
    orderReadyDate: new Date(),
    orderExecutedDate: null,
    buyerEmail: "email@gma.com",
    trackingCode: 1234,
    workerId: 1,
  },
  {
    id: 2,
    status: Status["Zaprimljeno"],
    orderDate: new Date(),
    orderReadyDate: new Date(),
    orderExecutedDate: null,
    buyerEmail: "email123@gma.com",
    trackingCode: 1234353,
    workerId: 2,
  },
  {
    id: 3,
    status: Status["Otkazano"],
    orderDate: new Date(),
    orderReadyDate: new Date(),
    orderExecutedDate: null,
    buyerEmail: "email@gmadsa.com",
    trackingCode: 121232134,
    workerId: 2,
  },
  {
    id: 4,
    status: Status["U tijeku"],
    orderDate: new Date(),
    orderReadyDate: new Date(),
    orderExecutedDate: null,
    buyerEmail: "email@gma2323.com",
    trackingCode: 123424124,
    workerId: 1,
  },
];

export const fetchOrders = async (): Promise<Array<Order>> => {
    return new Promise((resolve, reject) => {
        resolve(fakeOrders)
    })
};
