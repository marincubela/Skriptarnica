import axios from "axios";
import { AddedOrderDetails } from "../components/masterdetail/DetailsBox";
import { OrderDetails } from "../models/OrderDetails";

export const updateOrderDetails = async (
  orderDetails: Array<OrderDetails>,
  addedOrderDetails: Map<number, AddedOrderDetails>
): Promise<boolean> => {
  let detailsToDelete = orderDetails.filter((detail) => {
    return detail.quantity === 0;
  });

  let detailsToUpdate = orderDetails
    .filter((detail) => {
      return detail.quantity > 0;
    })
    .map((detail) => {
      return {
        narudzbaid: detail.orderId,
        rbrstavka: detail.indexInOrder,
        ponudaid: detail.offerId,
        kolicina: detail.quantity,
        jedcijena: detail.product
          ? detail.product.jedcijena
          : detail.service!.jedcijena,
      };
    });

  try {
    for (const orderDetail of detailsToDelete) {
      await axios.delete("/stavka_narudzba/delete", {
        data: {
          narudzbaid: orderDetail.orderId,
          rbrstavka: orderDetail.indexInOrder,
        },
      });
    }

    await axios.put("/stavka_narudzba/update", detailsToUpdate);

    if (addedOrderDetails.size > 0) {
      let mappedOrderDetails = Array.from(addedOrderDetails).map(
        ([id, detail]) => {
          return detail;
        }
      );

      console.log(mappedOrderDetails);
      for (const detail of mappedOrderDetails) {
        await axios.post("/stavka_narudzba/add", detail);
      }
    }

    if (
      detailsToDelete.length === orderDetails.length &&
      addedOrderDetails.size === 0
    ) {
      await axios.delete("/narudzba/" + detailsToDelete[0].orderId);
    }

    return true;
  } catch (error) {
    return false;
  }
};
