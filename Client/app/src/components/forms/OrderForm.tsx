import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import * as react from "@chakra-ui/react";
import { FunctionComponent, useEffect, useState } from "react";
import { AvailableItem } from "../../models/AvailableItem";
import { Employee } from "../../models/Employee";
import { SelectedItem } from "../../models/SelectedItem";
import { addNewOrder } from "../../service/OrdersService";
import { fetchEmployees } from "../../source/employee/EmployeeSource";
import { fetchItems } from "../../source/items/ItemsSource";

export const OrderForm: FunctionComponent = () => {
  const [employees, setEmployees] = useState<Array<Employee>>([]);
  const [availableItems, setAvailableItems] = useState<
    Map<number, AvailableItem>
  >(new Map<number, AvailableItem>());

  const [selectedEmployee, setSelectedEmployee] = useState<Employee>();
  const [email, setEmail] = useState("");
  const [selectedItems, setSelectedItems] = useState<Map<number, number>>(
    new Map<number, number>()
  );

  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetchEmployees().then((data) => setEmployees(data));
    fetchItems().then((data) => {
      setAvailableItems(
        new Map<number, AvailableItem>(
          Array.from(data).map((item) => [item.id, item])
        )
      );
      setSelectedItems(
        new Map<number, number>(Array.from(data).map((item) => [item.id, 0]))
      );
    });
  }, []);

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

    if (!pattern.test(email)) {
      handleError("Neispravan e-mail!");
      return;
    }

    if (selectedItems?.size == 0) {
      handleError("Morate unijeti barem 1 proizvod!");
      return;
    }

    let mappedSelectedItems: Array<SelectedItem> = Array.from(selectedItems)
      .filter(([id, quantity]) => {
        return quantity > 0;
      })
      .map(([id, quantity]) => {
        return {
          ponudaid: id,
          kolicina: quantity,
          jedcijena: availableItems.get(id)!.unitPrice,
        };
      });

    addNewOrder(email, selectedEmployee, mappedSelectedItems)
      .then((data) => window.location.reload())
      .catch((err) => console.log(err));
  };

  const handleEmployeeChange = (employee: Employee) => {
    setSelectedEmployee(employee);
  };

  const updateItemQuantity = (id: number, changeBy: number) => {
    let currentSelectedItems = new Map<number, number>(selectedItems);

    currentSelectedItems.set(id, currentSelectedItems.get(id)! + changeBy);

    setSelectedItems(currentSelectedItems);
  };

  return (
    <react.Box my={4} p={16} textAlign="left">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          handleSubmit();
        }}
      >
        <react.Stack direction={{ base: "column", md: "row" }} spacing={8}>
          <react.Flex flex={1} direction={"column"}>
            <react.FormControl isRequired>
              <react.FormLabel>Email</react.FormLabel>
              <react.Input
                onChange={(event) => setEmail(event.target.value)}
                type="email"
                placeholder="kupac@skrpt.hr"
              />
            </react.FormControl>
            {employees.length > 0 && (
              <react.FormControl mt={6} isRequired>
                <react.FormLabel>Djelatnik</react.FormLabel>
                <react.Select
                  onChange={(event) =>
                    handleEmployeeChange(JSON.parse(event.target.value))
                  }
                >
                  {employees.map((employee) => {
                    return (
                      <option
                        key={employee.id}
                        value={JSON.stringify(employee)}
                      >
                        {employee.name} {employee.lastName}
                      </option>
                    );
                  })}
                </react.Select>
              </react.FormControl>
            )}

            {availableItems.size > 0 && (
              <react.FormControl mt={6} isRequired>
                <react.FormLabel>Proizvod</react.FormLabel>
                <react.Select
                  onChange={(event) =>
                    updateItemQuantity(parseInt(event.target.value), 1)
                  }
                >
                  {Array.from(availableItems).map(([id, item]) => {
                    return (
                      <option key={id} value={id}>
                        {item.name} / {item.unitPrice} kn
                      </option>
                    );
                  })}
                </react.Select>
              </react.FormControl>
            )}
          </react.Flex>
          <react.Flex flex={1} align={"center"} justify={"center"}>
            {selectedItems.size > 0 && (
              <react.UnorderedList>
                {Array.from(selectedItems!)
                  .filter(([id, quantity]) => {
                    return quantity > 0;
                  })
                  .map(([id, quantity]) => {
                    return (
                      <react.Box
                        key={id}
                        as={react.Flex}
                        align={"center"}
                        justify={"center"}
                        p={{ base: 2, md: 8 }}
                      >
                        <react.IconButton
                          icon={<MinusIcon />}
                          aria-label="Minus"
                          onClick={(event) => {
                            if (quantity > 0) updateItemQuantity(id, -1);
                          }}
                        />
                        <react.Text
                          w={"full"}
                          mx={{ base: 2, md: 4 }}
                          fontSize={{ base: "lg", md: "2xl" }}
                          textAlign={"center"}
                        >
                          {availableItems!.get(id)?.name}: {quantity}
                        </react.Text>
                        <react.IconButton
                          icon={<AddIcon />}
                          aria-label="Plus"
                          onClick={(event) => {
                            updateItemQuantity(id, 1);
                          }}
                        />
                      </react.Box>
                    );
                  })}
              </react.UnorderedList>
            )}
          </react.Flex>
        </react.Stack>
        {errorMessage.length > 0 && (
          <react.Heading color={"red.600"}>{errorMessage}</react.Heading>
        )}
        <react.Button width="full" mt={4} type="submit">
          Dodaj narudžbu
        </react.Button>
      </form>
    </react.Box>
  );
};
