import { InfoIcon } from "@chakra-ui/icons";
import * as chakra from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Employee } from "../../models/Employee";
import { Order } from "../../models/Order";
import { fetchEmployees } from "../../source/employee/EmployeeSource";
import { fetchOrders } from "../../source/order/OrderSource";
import { MasterBox } from "./MasterBox";

export const MasterDetail: React.FunctionComponent = () => {
  const [orders, setOrders] = useState<Array<Order>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [employees, setEmployees] = useState<Array<Employee>>([]);

  useEffect(() => {
    fetchOrders().then((orders) => {
      setOrders(orders);
      setIsLoading(false);
    });

    fetchEmployees().then((employees) => {
      setEmployees(employees);
    });
  }, []);

  return (
    <chakra.Center minH={"100vh"}>
      {orders.length == 0 && isLoading && (
        <chakra.CircularProgress isIndeterminate={true} />
      )}
      {orders.length == 0 && !isLoading && (
        <chakra.Box textAlign="center" py={10} px={6}>
          <InfoIcon boxSize={"50px"} color={"blue.500"} />
          <chakra.Heading as="h2" size="xl" mt={6} mb={2}>
            Nema narudžbi
          </chakra.Heading>
          <chakra.Text color={"gray.500"}>
            Još nisu unesene nikakve narudžbe u sustav.
          </chakra.Text>
        </chakra.Box>
      )}

      {orders.length > 0 && (
        <chakra.Stack direction={"column"} px={8}>
          {orders.map((order) => (
            <MasterBox order={order} employees={employees} onUpdate={() => window.location.reload()} />
          ))}
        </chakra.Stack>
      )}
    </chakra.Center>
  );
};
