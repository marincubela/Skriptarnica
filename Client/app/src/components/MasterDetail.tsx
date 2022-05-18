import { CloseIcon, EditIcon, InfoIcon } from "@chakra-ui/icons";
import * as react from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { fetchOrders, Order } from "../service/OrdersService";
import { MasterBox } from "./MasterBox";

export const MasterDetail: React.FunctionComponent = () => {
  const [orders, setOrders] = useState<Array<Order>>([]);

  useEffect(() => {
    fetchOrders().then((orders) => {
      setOrders(orders);
    });
  });

  return (
    <react.Center minH={"100vh"}>
      {orders.length == 0 && <react.CircularProgress isIndeterminate={true} />}

      {orders.length > 0 && (
        <react.Stack direction={"column"} px={8}>
          {orders.map((order) => (
            <MasterBox order={order} workerIdOptions={[1, 2, 3]} />
          ))}
        </react.Stack>
      )}
    </react.Center>
  );
};
