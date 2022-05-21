import axios from "axios";
import { ApiProduct } from "../../api/models/ApiProduct";
import { ApiService } from "../../api/models/ApiService";
import {
  AvailableItem,
  AvailableProduct,
  AvailableService,
} from "../../models/AvailableItem";

let reqCounter = 0;

export const fetchItems = async (): Promise<Array<AvailableItem>> => {
  let productResponse = await axios.get("/proizvod/all");
  let serviceResponse = await axios.get("/usluga/all");

  if (productResponse.status === 200 && serviceResponse.status === 200) {
    let items: Array<AvailableItem> = [];

    return items
      .concat(
        Array.from<ApiProduct>(productResponse.data).map(
          (apiProduct): AvailableProduct => {
            return {
              id: apiProduct.ponudaid,
              name: apiProduct.naziv,
              unitPrice: apiProduct.jedcijena,
              available:
                apiProduct.kolicinadostupno > apiProduct.kolicinakriticno,
            };
          }
        )
      )
      .concat(
        Array.from<ApiService>(serviceResponse.data).map(
          (apiProduct): AvailableService => {
            return {
              id: apiProduct.ponudaid,
              name: apiProduct.naziv,
              unitPrice: apiProduct.jedcijena,
              available: apiProduct.dostupnost === "da",
              daysToComplete: apiProduct.vrijemetrajanja,
            };
          }
        )
      );
  }

  if (reqCounter === 10) return [];
  reqCounter++;

  return fetchItems();
};
