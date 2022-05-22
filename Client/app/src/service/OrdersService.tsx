import axios from "axios";
import { Status } from "../api/models/ApiOrder";
import { Employee } from "../models/Employee";
import { SelectedItem } from "../models/SelectedItem";

export const addNewOrder = async (
  email: string,
  selectedEmployee: Employee,
  selectedItems: Array<SelectedItem>
): Promise<boolean> => {
  let response = await axios.post(
    "/narudzba/add",
    toNaruzbaDto(email, selectedEmployee, selectedItems)
  );

  if (response.status === 200) {
    return response.data;
  }

  return false;
};

const toNaruzbaDto = (
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
