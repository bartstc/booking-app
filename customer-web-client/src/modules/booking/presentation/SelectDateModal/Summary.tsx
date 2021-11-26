import React from "react";
import { FormattedMessage } from "react-intl";
import { Box, chakra, useColorModeValue } from "@chakra-ui/react";

import { FormattedDate } from "shared/Date";

interface IProps {
  selectedTerm?: string;
}

const Summary = ({ selectedTerm }: IProps) => {
  const color = useColorModeValue("primary.500", "primary.300");

  return (
    <Box display="flex" mt={6} mb={4}>
      <FormattedMessage
        id="selected-term"
        defaultMessage="Selected term: {term}"
        values={{
          term: selectedTerm ? (
            <chakra.b ml={1} color={color}>
              <FormattedDate value={selectedTerm} format={"ddd DD MMM HH:mm"} />
            </chakra.b>
          ) : (
            "---"
          ),
        }}
      />
    </Box>
  );
};

export { Summary };
