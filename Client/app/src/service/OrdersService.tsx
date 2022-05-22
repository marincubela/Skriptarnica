import axios from "axios";
import { Status } from "../api/models/ApiOrder";
import { Employee } from "../models/Employee";
import { Order } from "../models/Order";
import { SelectedItem } from "../models/SelectedItem";

export const deleteOrder = async (orderId: number) => {
  let response = await axios.delete("/narudzba/" + orderId);

  if (response.status === 200) {
    return true;
  }
  return false;
};

export const updateOrder = async (
  workerId: string,
  orderId: number
): Promise<boolean> => {
  let response = await axios.put("/narudzba/update-osoba/" + orderId, {
    noviIdOsoba: parseInt(workerId) as number,
  });

  if (response.status === 200) {
    return true;
  }
  return false;
};

export const addNewOrder = async (
  email: string,
  selectedEmployee: Employee,
  selectedItems: Array<SelectedItem>
): Promise<boolean> => {
  let response = await axios.post(
    "/narudzba/add",
    toNewNaruzbaDto(email, selectedEmployee, selectedItems)
  );

  if (response.status === 200) {
    return response.data;
  }

  return false;
};

const toNarudzbaDto = (order: Order) => {
  return {
    emailkupac: order.buyerEmail,
    status: Status.IN_PROGRESS,
    osobaid: order.workerId,
  };
};

const toNewNaruzbaDto = (
  email: string,
  selectedEmployee: Employee,
  selectedItems: Array<SelectedItem>
) => {
  return {
    emailkupac: email,
    status: Status.IN_PROGRESS,
    osobaid: selectedEmployee.id,
    stavkaNarudzbas: selectedItems,
  };
};
