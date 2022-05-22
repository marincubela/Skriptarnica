import { Box, Heading, Select, Text } from "@chakra-ui/react";
import { InfoLabel } from "./InfoLabel";

export const EditableInfoLabel = ({
  label,
  value,
  isEditMode,
  onUpdateValue,
  options,
}: EditInfoLabelProps) => {

  return (
    <>
      {isEditMode && (
        <Box p={{ base: 4, md: 6 }} textAlign={"center"}>
          <Heading fontSize={{ base: "lg", md: "xl" }}>{label}:</Heading>
          <Select
            variant={"outline"}
            onChange={(event) => onUpdateValue(event.target.value)}
          >
            {Array.from(options).map(([id, name]) => {
              return <option key={id} value={id}>{name}</option>;
            })}
          </Select>
        </Box>
      )}
      {!isEditMode && <InfoLabel label={label} value={value.toString()} />}
    </>
  );
};

type EditInfoLabelProps = {
  label: string;
  value: string | number;
  isEditMode: Boolean;
  onUpdateValue: Function;
  options: Map<number, string>;
};
