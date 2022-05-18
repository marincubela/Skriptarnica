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
            {options.map((option) => (
              <option value={option}>{option}</option>
            ))}
          </Select>
        </Box>
      )}
      {!isEditMode && <InfoLabel label={label} value={value.toString()} />}
    </>
  );
};

type EditInfoLabelProps = {
  label: String;
  value: String | Number;
  isEditMode: Boolean;
  onUpdateValue: Function;
  options: Array<number>;
};
