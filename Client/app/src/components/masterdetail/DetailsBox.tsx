import { MinusIcon, AddIcon, CheckIcon, EditIcon } from "@chakra-ui/icons";
import * as chakra from "@chakra-ui/react";
import { Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { AvailableItem } from "../../models/AvailableItem";
import { OrderDetails } from "../../models/OrderDetails";
import { updateOrderDetails } from "../../service/OrderDetailsService";
import { fetchItems } from "../../source/items/ItemsSource";

export const DetailsBox = ({
  details,
  orderId,
}: DetailsBoxProps): JSX.Element => {
  const [isDetailsEditMode, setIsDetailsEditMode] = useState<boolean>(false);
  const [orderDetails, setOrderDetails] =
    useState<Array<OrderDetails>>(details);

  const [availableItems, setAvailableItems] = useState<
    Map<number, AvailableItem>
  >(new Map<number, AvailableItem>());

  const [addedOrderDetails, setAddedOrderDetails] = useState<
    Map<number, AddedOrderDetails>
  >(new Map<number, AddedOrderDetails>());

  useEffect(() => {
    fetchItems().then((data) => {
      setAvailableItems(
        new Map<number, AvailableItem>(
          Array.from(data).map((item) => [item.id, item])
        )
      );
    });
  }, []);

  const updateItemQuantity = (detailId: number, by: number) => {
    let currOrderDetails = Array.from(orderDetails);

    let newOrderDetails = currOrderDetails.map((orderDetail) => {
      if (orderDetail.indexInOrder === detailId) {
        orderDetail.quantity += by;
      }
      return orderDetail;
    });

    if (currOrderDetails === newOrderDetails) return;

    setOrderDetails(newOrderDetails);
  };

  const handleEditChange = () => {
    if (isDetailsEditMode) {
      updateOrderDetails(orderDetails, addedOrderDetails)
        .then((data) => setIsDetailsEditMode(false))
        .catch((err) => console.log(err))
        .finally(() => window.location.reload());
    } else {
      setIsDetailsEditMode(true);
    }
  };

  const updateAddedOrderDetails = (id: number, by: number = 1) => {
    let exists = details.find((detail) => {
      return detail.offerId === id;
    });

    if (exists) {
      updateItemQuantity(exists.indexInOrder, 1);
      return;
    }

    let currentAddedOrderDetails = new Map<number, AddedOrderDetails>(
      addedOrderDetails
    );

    if (currentAddedOrderDetails.get(id)) {
      let toUpdate = currentAddedOrderDetails.get(id)!;
      toUpdate.kolicina += by;
      currentAddedOrderDetails.set(id, toUpdate);
    } else {
      let maxIndexInOrder = 0;

      if (addedOrderDetails.size === 0) {
        maxIndexInOrder = Math.max.apply(
          Math,
          details.map((detail) => detail.indexInOrder)
        );
      } else {
        maxIndexInOrder = Math.max.apply(
          Math,
          Array.from(addedOrderDetails).map(([id, detail]) => {
            return detail.rbrstavka;
          })
        );
      }

      let item = availableItems.get(id)!;
      currentAddedOrderDetails.set(id, {
        ponudaid: id,
        jedcijena: item.unitPrice,
        narudzbaid: orderId,
        rbrstavka: maxIndexInOrder + 1,
        kolicina: 1,
      });
    }

    setAddedOrderDetails(currentAddedOrderDetails);
  };

  return (
    <chakra.Stack p={2}>
      <Flex>
        <chakra.UnorderedList w={"full"}>
          {orderDetails
            .filter((details) => {
              return details.quantity > 0;
            })
            .map((orderDetails) => {
              return (
                <chakra.Box
                  key={orderDetails.offerId}
                  as={chakra.Flex}
                  align={"center"}
                  justify={"center"}
                  p={{ base: 2, md: 8 }}
                >
                  {orderDetails.product && (
                    <chakra.Text
                      w={"full"}
                      mx={{ base: 2, md: 4 }}
                      fontSize={{ base: "lg", md: "2xl" }}
                      textAlign={"center"}
                    >
                      {orderDetails.product.naziv}
                    </chakra.Text>
                  )}

                  {orderDetails.service && (
                    <chakra.Text
                      w={"full"}
                      mx={{ base: 2, md: 4 }}
                      fontSize={{ base: "lg", md: "2xl" }}
                      textAlign={"center"}
                    >
                      {orderDetails.service.naziv}
                    </chakra.Text>
                  )}

                  {isDetailsEditMode && (
                    <chakra.IconButton
                      icon={<MinusIcon />}
                      aria-label="Minus"
                      onClick={(event) => {
                        if (orderDetails.quantity > 0)
                          updateItemQuantity(orderDetails.indexInOrder, -1);
                      }}
                    />
                  )}

                  <chakra.Text
                    w={"full"}
                    mx={{ base: 2, md: 4 }}
                    fontSize={{ base: "lg", md: "2xl" }}
                    textAlign={"center"}
                  >
                    Kolicina: {orderDetails.quantity}
                  </chakra.Text>

                  {isDetailsEditMode && (
                    <chakra.IconButton
                      icon={<AddIcon />}
                      aria-label="Plus"
                      onClick={(event) => {
                        updateItemQuantity(orderDetails.indexInOrder, 1);
                      }}
                    />
                  )}
                </chakra.Box>
              );
            })}
        </chakra.UnorderedList>
      </Flex>
      <Flex>
        {addedOrderDetails.size > 0 && (
          <chakra.UnorderedList w={"full"} spacing={4}>
            {Array.from(addedOrderDetails!)
              .filter(([id, detail]) => {
                return detail.kolicina > 0;
              })
              .map(([id, detail]) => {
                return (
                  <chakra.Box
                    key={id}
                    as={chakra.Flex}
                    align={"center"}
                    justify={"center"}
                    p={{ base: 2, md: 8 }}
                  >
                    <chakra.Text
                      w={"full"}
                      mx={{ base: 2, md: 4 }}
                      fontSize={{ base: "lg", md: "2xl" }}
                      textAlign={"center"}
                    >
                      {availableItems!.get(id)?.name}
                    </chakra.Text>
                    {isDetailsEditMode && (
                      <chakra.IconButton
                        icon={<MinusIcon />}
                        aria-label="Minus"
                        onClick={(event) => {
                          if (detail.kolicina > 0)
                            updateAddedOrderDetails(id, -1);
                        }}
                      />
                    )}

                    <chakra.Text
                      w={"full"}
                      mx={{ base: 2, md: 4 }}
                      fontSize={{ base: "lg", md: "2xl" }}
                      textAlign={"center"}
                    >
                      Kolicina: {detail.kolicina}
                    </chakra.Text>
                    {isDetailsEditMode && (
                      <chakra.IconButton
                        icon={<AddIcon />}
                        aria-label="Plus"
                        onClick={(event) => {
                          updateAddedOrderDetails(id, 1);
                        }}
                      />
                    )}
                  </chakra.Box>
                );
              })}
          </chakra.UnorderedList>
        )}
      </Flex>

      <chakra.Flex
        align={"center"}
        justify={"center"}
        direction={{ base: "column" }}
      >
        <form>
          {isDetailsEditMode && availableItems.size > 0 && (
            <chakra.FormControl mt={6}>
              <chakra.FormLabel>Novi proizvod</chakra.FormLabel>
              <chakra.Select
                onChange={(event) =>
                  updateAddedOrderDetails(parseInt(event.target.value))
                }
              >
                {Array.from(availableItems).map(([id, item]) => {
                  return (
                    <option key={id} value={id}>
                      {item.name} / {item.unitPrice} kn
                    </option>
                  );
                })}
              </chakra.Select>
            </chakra.FormControl>
          )}
        </form>
        <chakra.IconButton
          variant={"solid"}
          size={"lg"}
          icon={isDetailsEditMode ? <CheckIcon /> : <EditIcon />}
          aria-label="Edit icon"
          onClick={() => handleEditChange()}
          m={4}
        />
      </chakra.Flex>
    </chakra.Stack>
  );
};

type DetailsBoxProps = {
  details: Array<OrderDetails>;
  orderId: number;
};

export type AddedOrderDetails = {
  narudzbaid: number;
  rbrstavka: number;
  ponudaid: number;
  kolicina: number;
  jedcijena: number;
};
