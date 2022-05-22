import { EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Collapse,
  Heading,
  IconButton,
  Stack,
} from "@chakra-ui/react";
import { useState } from "react";
import { Employee } from "../../models/Employee";
import { Order } from "../../models/Order";
import { EditableInfoLabel } from "../util/EditableInfoLabel";
import { InfoLabel } from "../util/InfoLabel";

export const MasterBox = ({
  order,
  employees,
}: MasterBoxProps): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const employeeMap = new Map<number, string>(
    employees.map((employee) => {
      return [employee.id, `${employee.name} ${employee.lastName}`];
    })
  );

  console.log(order);

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
        <EditableInfoLabel
          label="Djelatnik"
          value={employeeMap.get(order.workerId as number)!}
          isEditMode={isEditMode}
          onUpdateValue={(value: Number) => console.log(value)}
          options={employeeMap}
        />
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
          icon={<EditIcon />}
          aria-label="Edit icon"
          onClick={() => setIsEditMode(!isEditMode)}
        />
      </Stack>
      <Collapse in={isOpen} animateOpacity>
        <Box>
          <Heading>Hello</Heading>
        </Box>
      </Collapse>
    </Stack>
  );
};

type MasterBoxProps = {
  order: Order;
  employees: Array<Employee>;
};
