import { CheckIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Button, Collapse, IconButton, Stack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Employee } from "../../models/Employee";
import { Order } from "../../models/Order";
import { OrderDetails } from "../../models/OrderDetails";
import { deleteOrder, updateOrder } from "../../service/OrdersService";
import { fetchOrderDetails } from "../../source/details/OrderDetailsSource";
import { EditableInfoLabel } from "../util/EditableInfoLabel";
import { InfoLabel } from "../util/InfoLabel";
import { DetailsBox } from "./DetailsBox";

export const MasterBox = ({
  order,
  employees,
  onUpdate,
}: MasterBoxProps): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [employeeMap, setEmployeeMap] = useState<Map<number, string>>();

  const [details, setDetails] = useState<Array<OrderDetails>>([]);

  useEffect(() => {
    let employeeMap = new Map<number, string>(
      employees.map((employee) => {
        return [employee.id, `${employee.name} ${employee.lastName}`];
      })
    );

    setEmployeeMap(employeeMap);

    fetchOrderDetails(order.id as number).then((details) => {
      setDetails(details);
    });
  }, []);

  const handleEmployeeChange = (id: number) => {
    order.workerId = id as Number;
  };

  const handleEditChange = () => {
    if (isEditMode) {
      updateOrder(order.workerId.toString(), order.id as number)
        .catch((err) => console.log(err))
        .finally(() => {
          setIsEditMode(false);
          onUpdate();
        });
    } else {
      setIsEditMode(true);
    }
  };

  const handleDelete = () => {
    deleteOrder(order.id as number)
      .catch((err) => console.log(err))
      .finally(() => {
        onUpdate();
      });
  };

  return (
    <Stack direction={"column"} spacing={2} border={"2px"} borderRadius={"2xl"}>
      <Stack
        align={"center"}
        direction={{ base: "column", md: "row" }}
        flex={2}
      >
        <InfoLabel label="Kupac email" value={order.buyerEmail} />
        <InfoLabel
          label="Datum narudžbe"
          value={order.orderDate.toLocaleDateString() ?? "Nepoznato"}
        />
        <InfoLabel
          label="Datum isporuke"
          value={order.orderExecutedDate?.toLocaleDateString() ?? "Nepoznato"}
        />
        <InfoLabel
          label="Datum narudžba spremna"
          value={order.orderReadyDate?.toLocaleDateString() ?? "Nepoznato"}
        />
        <InfoLabel
          label="Jedinsveni kod"
          value={order.trackingCode.toString()}
        />
        {employeeMap && (
          <EditableInfoLabel
            label="Djelatnik"
            value={employeeMap.get(order.workerId as number)!}
            isEditMode={isEditMode}
            onUpdateValue={(value: Number) =>
              handleEmployeeChange(value as number)
            }
            options={employeeMap}
          />
        )}
      </Stack>
      <Stack align={"center"} justify={"center"} direction={"row"} py={2}>
        <Button
          variant={"solid"}
          size={"lg"}
          onClick={() => setIsOpen(!isOpen)}
        >
          Detalji
        </Button>
        <IconButton
          variant={"solid"}
          size={"lg"}
          icon={isEditMode ? <CheckIcon /> : <EditIcon />}
          aria-label="Edit icon"
          onClick={() => handleEditChange()}
        />
        <IconButton
          variant={"solid"}
          size={"lg"}
          icon={<DeleteIcon />}
          aria-label="Delete icon"
          onClick={() => handleDelete()}
        />
      </Stack>
      <Collapse in={isOpen} animateOpacity>
        {details.length > 0 && (
          <DetailsBox details={details} orderId={order.id as number} />
        )}
      </Collapse>
    </Stack>
  );
};

type MasterBoxProps = {
  order: Order;
  employees: Array<Employee>;
  onUpdate: () => void;
};
