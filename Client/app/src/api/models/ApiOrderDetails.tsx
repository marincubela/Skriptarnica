import { ApiProduct } from "./ApiProduct";
import { ApiServiceItem } from "./ApiService";

export type ApiOrderDetails = {
  narudzbaid: number;
  rbrstavka: number;
  ponudaid: number;
  kolicina: number;
  proizvod: ApiProduct | null;
  usluga: ApiServiceItem | null;
};
