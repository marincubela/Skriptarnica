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
import { Order } from "../service/OrdersService";
import { EditableInfoLabel } from "./EditableInfoLabel";
import { InfoLabel } from "./InfoLabel";

export const MasterBox = ({
  order,
  workerIdOptions,
}: MasterBoxProps): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

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
          value={order.orderDate?.toLocaleDateString() ?? "Nepoznato"}
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
          label="Djelatnik Id"
          value={order.workerId}
          isEditMode={isEditMode}
          onUpdateValue={(value: Number) => console.log(value)}
          options={workerIdOptions}
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
  workerIdOptions: Array<number>;
};
