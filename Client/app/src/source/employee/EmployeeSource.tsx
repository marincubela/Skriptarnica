import axios from "axios";
import { ApiEmployee } from "../../api/models/ApiEmployee";
import { Employee } from "../../models/Employee";

export const fetchEmployees = async (): Promise<Array<Employee>> => {
  let response = await axios.get("/djelatnik/all");

  if (response.status == 200) {
    return Array.from<ApiEmployee>(response.data).map(
      (apiEmployee): Employee => {
        return {
          id: apiEmployee.osobaid,
          name: apiEmployee.ime,
          lastName: apiEmployee.prezime,
        };
      }
    );
  }

  return [];
};
