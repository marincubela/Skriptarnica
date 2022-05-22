import React from "react";
import { Box, ChakraProvider } from "@chakra-ui/react";
import WithSubnavigation from "./components/navigation/NavBar";
import { MasterDetail } from "./components/masterdetail/MasterDetail";
import { OrderForm } from "./components/forms/OrderForm";

function App() {
  return (
    <ChakraProvider>
      <Box minH={"100vh"}>
        <WithSubnavigation />
        <MasterDetail />
        <OrderForm />
      </Box>
    </ChakraProvider>
  );
}

export default App;
