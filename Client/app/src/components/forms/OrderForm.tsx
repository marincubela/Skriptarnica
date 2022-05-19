import {
  FormLabel,
  FormControl,
  Input,
  Button,
  Box,
  Select,
  Heading,
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

const mockAvailableItems: Array<AvailableItem> = [
  { id: 1, name: "Nalivpero" },
  { id: 2, name: "Bilježnica" },
  { id: 3, name: "Uvez rada" },
];

export const OrderForm: FunctionComponent = () => {
  const [employees, setEmployees] = useState<Array<Employee>>(mockEmployees);
  const [availableItems, setAvailableItems] =
    useState<Array<AvailableItem>>(mockAvailableItems);

  const [selectedEmployee, setSelectedEmployee] = useState<Employee>();
  const [email, setEmail] = useState("");
  const [items, setItems] = useState<Map<number, number>>(
    new Map<number, number>(availableItems.map((i) => [i.id, 0]))
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

    if (items?.size == 0) {
      handleError("Morate unijeti barem 1 proizvod!");
      return;
    }

    console.log(
      `Email: ${email}, Djelatnik: ${JSON.stringify(
        selectedEmployee
      )}, Proizvodi: ${JSON.stringify([...items])}`
    );
  };

  const handleEmployeeChange = (employee: Employee) => {
    setSelectedEmployee(employee);
  };

  const handleItemChange = (item: Item) => {
    let currentItems = items;

    currentItems?.set(item.id, currentItems?.get(item.id)! + 1);

    console.log(`ITEm ${currentItems.get(item.id)}`);

    setItems(currentItems);
  };

  return (
    <Box my={4} p={16} textAlign="left">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          handleSubmit();
        }}
      >
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
              handleItemChange(JSON.parse(event.target.value))
            }
          >
            {availableItems.map((item) => {
              return <option value={JSON.stringify(item)}>{item.name}</option>;
            })}
          </Select>
        </FormControl>
        {errorMessage.length > 0 && (
          <Heading color={"red.600"}>{errorMessage}</Heading>
        )}

        <Button width="full" mt={4} type="submit">
          Sign In
        </Button>
      </form>
    </Box>
  );
};
