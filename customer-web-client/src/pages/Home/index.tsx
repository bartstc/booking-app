import React from "react";
import { VStack, HStack } from "@chakra-ui/react";
import { useIntl } from "react-intl";
import { mdiFilter } from "@mdi/js";
import { isMobileOnly } from "react-device-detect";

import { OffersList } from "modules/offers/presentation";

import { FiltersInput } from "shared/Filters";
import { Button, IconButton } from "shared/Button";
import { Icon } from "shared/Icon";

import { HeroSection } from "./HeroSection";

const Home = () => {
  const { formatMessage } = useIntl();

  return (
    <VStack spacing={4}>
      <HeroSection />
      <VStack
        maxW="1080px"
        m="0 auto"
        w="full"
        mt={12}
        spacing={8}
        px={2}
        align="flex-start"
      >
        <HStack w="100%" spacing={4}>
          <FiltersInput
            placeholder={`${formatMessage({
              id: "search-employee-name-or-position",
              defaultMessage: `Type offer's name`,
            })}...`}
            filterName="name"
          />
          {isMobileOnly ? (
            <IconButton
              ml={4}
              title={formatMessage({
                defaultMessage: "More filters",
                id: "more-filters",
              })}
              variant="solid"
              path={mdiFilter}
            />
          ) : (
            <Button leftIcon={<Icon path={mdiFilter} />}>
              {formatMessage({
                defaultMessage: "More filters",
                id: "more-filters",
              })}
            </Button>
          )}
        </HStack>
        <OffersList />
      </VStack>
    </VStack>
  );
};

export default Home;
