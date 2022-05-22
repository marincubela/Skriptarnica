import axios from "axios";
import { ApiOrderDetails } from "../../api/models/ApiOrderDetails";
import { OrderDetails } from "../../models/OrderDetails";

export const fetchOrderDetails = async (
  orderId: number
): Promise<Array<OrderDetails>> => {
  let response = await axios.get("/stavka_narudzba/" + orderId);

  if (response.status == 200) {
    return Array.from<ApiOrderDetails>(response.data).map(
      (apiOrderDetails): OrderDetails => {
        return {
          orderId: apiOrderDetails.narudzbaid,
          indexInOrder: apiOrderDetails.rbrstavka,
          offerId: apiOrderDetails.ponudaid,
          service: apiOrderDetails.usluga,
          product: apiOrderDetails.proizvod,
          quantity: apiOrderDetails.kolicina,
        };
      }
    );
  }

  return [];
};
