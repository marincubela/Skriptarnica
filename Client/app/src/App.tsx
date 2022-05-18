import React from "react";
import { Box, ChakraProvider } from "@chakra-ui/react";
import WithSubnavigation from "./components/NavBar";
import { MasterDetail } from "./components/MasterDetail";

function App() {
  return (
    <ChakraProvider>
      <Box minH={"100vh"}>
        <WithSubnavigation />
        <MasterDetail/>
      </Box>
    </ChakraProvider>
  );
}

export default App;
