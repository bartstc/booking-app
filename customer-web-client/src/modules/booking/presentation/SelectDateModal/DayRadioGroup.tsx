import React, { ReactNode } from "react";
import {
  HStack,
  VStack,
  useRadioGroup,
  Box,
  RadioProps,
  useBreakpointValue,
  useColorModeValue,
  Center,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import { mdiCalendarRemove } from "@mdi/js";

import { RadioPill } from "shared/RadioPill";
import { FormattedDate } from "shared/Date";
import { Icon } from "shared/Icon";

interface IProps {
  setSelectedTerm: (term: string) => void;
  availableTerms: string[];
  selectedDay: string;
  selectedTerm?: string;
}

const DayRadioPill = ({
  term,
  selectedTerm,
  ...props
}: RadioProps & { selectedTerm?: string; term: string }) => {
  return (
    <Box>
      <RadioPill
        {...props}
        checked={
          selectedTerm
            ? dayjs(selectedTerm).format("H-m") === dayjs(term).format("H-m")
            : false
        }
        radioStyles={{
          px: { base: 6, md: 20 },
        }}
      >
        <FormattedDate value={term} format="HH:mm" />
      </RadioPill>
    </Box>
  );
};

const NoAvailableDatesIcon = ({ size }: { size?: string }) => {
  const defaultSize = useBreakpointValue({ base: "48px", md: "72px" });
  const color = useColorModeValue("gray.300", "gray.600");

  return (
    <Center
      m="0 auto"
      minH={{ base: "240px", md: "300px" }}
      minW={{ base: "95px", md: "200px" }}
    >
      <Icon path={mdiCalendarRemove} size={size ?? defaultSize} color={color} />
    </Center>
  );
};

const RadioColumn = ({
  rowCount,
  children,
}: {
  rowCount: number;
  children: ReactNode;
}) => {
  if (rowCount === 0) {
    return <NoAvailableDatesIcon />;
  }

  return (
    <VStack
      minH={{ base: "240px", md: "300px" }}
      minW={{ base: "95px", md: "200px" }}
    >
      {children}
    </VStack>
  );
};

const DayRadioGroup = ({
  selectedTerm,
  selectedDay,
  setSelectedTerm,
  availableTerms,
}: IProps) => {
  const emptyStateIconSize = useBreakpointValue({ base: "96px", md: "150px" });
  const midday = dayjs(selectedDay).startOf("day");
  const afternoon = dayjs(selectedDay).hour(11).minute(59);
  const evening = dayjs(selectedDay).hour(17).minute(59);
  const moon = dayjs(selectedDay).hour(23).minute(59).second(59);

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "selectedDay",
    defaultValue: selectedTerm,
    onChange: (value) => setSelectedTerm(value as string),
  });

  const group = getRootProps();

  const morningTerms = availableTerms.filter(
    (term) => dayjs(term).isAfter(midday) && dayjs(term).isBefore(afternoon)
  );
  const afternoonTerms = availableTerms.filter(
    (term) => dayjs(term).isAfter(afternoon) && dayjs(term).isBefore(evening)
  );
  const eveningTerms = availableTerms.filter(
    (term) => dayjs(term).isAfter(evening) && dayjs(term).isBefore(moon)
  );

  if (
    morningTerms.length === 0 &&
    afternoonTerms.length === 0 &&
    eveningTerms.length === 0
  ) {
    return <NoAvailableDatesIcon size={emptyStateIconSize} />;
  }

  return (
    <HStack w="100%" justify="space-around" align="flex-start" {...group}>
      <RadioColumn rowCount={morningTerms.length}>
        {morningTerms.map((term) => (
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          <DayRadioPill
            key={term}
            term={term}
            selectedTerm={selectedTerm}
            {...getRadioProps({ value: term } as any)}
          />
        ))}
      </RadioColumn>
      <RadioColumn rowCount={afternoonTerms.length}>
        {afternoonTerms.map((term) => (
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          <DayRadioPill
            key={term}
            term={term}
            selectedTerm={selectedTerm}
            {...getRadioProps({ value: term } as any)}
          />
        ))}
      </RadioColumn>
      <RadioColumn rowCount={eveningTerms.length}>
        {eveningTerms.map((term) => (
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          <DayRadioPill
            key={term}
            term={term}
            selectedTerm={selectedTerm}
            {...getRadioProps({ value: term } as any)}
          />
        ))}
      </RadioColumn>
    </HStack>
  );
};

export { DayRadioGroup };
