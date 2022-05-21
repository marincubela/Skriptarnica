import { AddIcon, MinusIcon, PlusSquareIcon } from "@chakra-ui/icons";
import {
  FormLabel,
  FormControl,
  Input,
  Button,
  Box,
  Select,
  Heading,
  Stack,
  Flex,
  OrderedList,
  UnorderedList,
  ListItem,
  IconButton,
  Text,
} from "@chakra-ui/react";
import React, { FunctionComponent, useState } from "react";

type Item = {
  id: number;
  quantity: number;
};

type Employee = {
  id: number;
  name: string;
};

const mockEmployees: Array<Employee> = [
  { id: 1, name: "Fran" },
  { id: 2, name: "Joža" },
  { id: 3, name: "Pero" },
  { id: 4, name: "lala" },
];

type AvailableItem = {
  id: number;
  name: string;
};

const mockAvailableItems = new Map<number, AvailableItem>([
  [1, { id: 1, name: "Nalivpero" }],
  [2, { id: 2, name: "Bilježnica" }],
  [3, { id: 3, name: "Uvez rada" }],
  [4, { id: 4, name: "Knjiga" }],
  [5, { id: 5, name: "Žvake" }],
]);
export const OrderForm: FunctionComponent = () => {
  const [employees, setEmployees] = useState<Array<Employee>>(mockEmployees);
  const [availableItems, setAvailableItems] =
    useState<Map<number, AvailableItem>>(mockAvailableItems);

  const [selectedEmployee, setSelectedEmployee] = useState<Employee>();
  const [email, setEmail] = useState("");
  const [selectedItems, setSelectedItems] = useState<Map<number, number>>(
    new Map<number, number>(
      Array.from(availableItems).map(([id, _]) => [id, 0])
    )
  );

  const [errorMessage, setErrorMessage] = useState("");

  const handleError = (message: string) => {
    console.log(message);
    setErrorMessage(message);

    setTimeout(() => {
      setErrorMessage("");
    }, 1500);
  };

  const handleSubmit = async () => {
    if (selectedEmployee == null) {
      handleError("Morate unijeti djelatnika!");
      return;
    }

    let pattern = new RegExp(
      /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
    );

    console.log(`EMAIL ${email}`);

    if (!pattern.test(email)) {
      handleError("Neispravan e-mail!");
      return;
    }

    if (selectedItems?.size == 0) {
      handleError("Morate unijeti barem 1 proizvod!");
      return;
    }

    console.log(
      `Email: ${email}, Djelatnik: ${JSON.stringify(
        selectedEmployee
      )}, Proizvodi: ${JSON.stringify([...selectedItems])}`
    );
  };

  const handleEmployeeChange = (employee: Employee) => {
    setSelectedEmployee(employee);
  };

  const updateItemQuantity = (id: number, changeBy: number) => {
    let currentSelectedItems = new Map<number, number>(selectedItems);

    currentSelectedItems.set(id, currentSelectedItems.get(id)! + changeBy);

    console.log(currentSelectedItems);

    setSelectedItems(currentSelectedItems);
  };

  return (
    <Box my={4} p={16} textAlign="left">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          handleSubmit();
        }}
      >
        <Stack direction={{ base: "column", md: "row" }} spacing={8}>
          <Flex flex={1} direction={"column"}>
            <FormControl isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                onChange={(event) => setEmail(event.target.value)}
                type="email"
                placeholder="kupac@skrpt.hr"
              />
            </FormControl>
            <FormControl mt={6} isRequired>
              <FormLabel>Djelatnik</FormLabel>
              <Select
                onChange={(event) =>
                  handleEmployeeChange(JSON.parse(event.target.value))
                }
              >
                {employees.map((employee) => {
                  return (
                    <option value={JSON.stringify(employee)}>
                      {employee.name}
                    </option>
                  );
                })}
              </Select>
            </FormControl>
            <FormControl mt={6} isRequired>
              <FormLabel>Proizvod</FormLabel>
              <Select
                onChange={(event) =>
                  updateItemQuantity(parseInt(event.target.value), 1)
                }
              >
                {Array.from(availableItems).map(([id, item]) => {
                  return <option value={id}>{item.name}</option>;
                })}
              </Select>
            </FormControl>
          </Flex>
          <Flex flex={1}>
            <UnorderedList>
              {Array.from(selectedItems)
                .filter(([id, quantity]) => {
                  return quantity > 0;
                })
                .map(([id, quantity]) => {
                  return (
                    <Box
                      scrollBehavior={"smooth"}
                      display={"flex"}
                      flexDirection={"row"}
                      alignItems={"center"}
                      p={8}
                    >
                      <IconButton
                        icon={<MinusIcon />}
                        aria-label="Minus"
                        onClick={(event) => {
                          if (quantity > 0) updateItemQuantity(id, -1);
                        }}
                      />
                      <Text
                      w={"full"}
                        mx={4}
                        fontSize={{ base: "lg", md: "2xl" }}
                        textAlign={"center"}
                      >
                        {availableItems.get(id)?.name}: {quantity}
                      </Text>
                      <IconButton
                        icon={<AddIcon />}
                        aria-label="Plus"
                        onClick={(event) => {
                          updateItemQuantity(id, 1);
                        }}
                      />
                    </Box>
                  );
                })}
            </UnorderedList>
          </Flex>
        </Stack>
        {errorMessage.length > 0 && (
          <Heading color={"red.600"}>{errorMessage}</Heading>
        )}
        <Button width="full" mt={4} type="submit">
          Dodaj narudžbu
        </Button>
      </form>
    </Box>
  );
};
