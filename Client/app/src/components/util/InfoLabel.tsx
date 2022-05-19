import { Box, Heading, Select, Text } from "@chakra-ui/react";

export const InfoLabel = ({ label, value }: InfoLabelProps): JSX.Element => (
  <Box p={{ base: 4, md: 6 }} textAlign={"center"}>
    <Heading fontSize={{ base: "lg", md: "xl" }}>{label}:</Heading>
    <Text>{value}</Text>
  </Box>
);

type InfoLabelProps = {
  label: String;
  value: String;
};
