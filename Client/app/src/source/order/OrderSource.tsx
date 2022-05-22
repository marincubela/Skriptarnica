import axios from "axios";
import { ApiOrder } from "../../api/models/ApiOrder";
import { Order } from "../../models/Order";

export const fetchOrders = async (): Promise<Array<Order>> => {
  let response = await axios.get("/narudzba/all");

  if (response.status == 200) {
    return Array.from<ApiOrder>(response.data).map((apiOrder): Order => {
      return {
        id: apiOrder.narudzbaid,
        workerId: apiOrder.osobaid,
        buyerEmail: apiOrder.emailkupac,
        orderDate: new Date(apiOrder.datumnarucen),
        status: apiOrder.status,
        trackingCode: apiOrder.jedinstvenikod,
        orderReadyDate: apiOrder.datumspreman
          ? new Date(apiOrder.datumspreman)
          : null,
        orderExecutedDate: apiOrder.datumizvrsen
          ? new Date(apiOrder.datumizvrsen)
          : null,
      };
    });
  }

  return [];
};
