import React from "react";
import { useIntl } from "react-intl";
import {
  Badge,
  Box,
  Flex,
  SimpleGrid,
  useColorModeValue,
  chakra,
  Image,
} from "@chakra-ui/react";

import { FiltersInput } from "shared/Filters";

const HeroSection = () => {
  const { formatMessage } = useIntl();

  return (
    <SimpleGrid
      columns={{ base: 1, md: 2 }}
      spacing={0}
      position="relative"
      _after={{
        bg: "primary.500",
        opacity: 0.25,
        pos: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        content: '" "',
      }}
    >
      <Flex
        direction="column"
        alignItems="start"
        justifyContent="center"
        px={{ base: 4, lg: 20 }}
        py={{ base: 10, md: 16, lg: 24 }}
        zIndex={1}
      >
        <Badge
          color="white"
          px={3}
          py={1}
          mb={3}
          variant="solid"
          colorScheme="primary"
          rounded="full"
        >
          {formatMessage({ defaultMessage: "Pre Beta", id: "pre-beta-tag" })}
        </Badge>
        <chakra.h1
          mb={6}
          fontSize={{ base: "4xl", md: "4xl", lg: "5xl" }}
          fontWeight="bold"
          lineHeight="shorter"
        >
          {formatMessage(
            {
              id: "home-hero-title",
              defaultMessage: "Explore  and book {accent} near you.",
            },
            {
              accent: (
                <chakra.strong
                  color={useColorModeValue("primary.500", "gray.300")}
                >
                  {formatMessage({
                    id: "home-hero-title-accent",
                    defaultMessage: "beauty & wellness",
                  })}
                </chakra.strong>
              ),
            }
          )}
        </chakra.h1>
        <chakra.div w="100%" mb={6}>
          <chakra.div
            background={useColorModeValue("white", "transparent")}
            maxW="360px"
            borderRadius="6px"
          >
            <FiltersInput
              placeholder={`${formatMessage({
                id: "search-employee-name-or-position",
                defaultMessage: `Type offer's name`,
              })}...`}
              filterName="name"
            />
          </chakra.div>
        </chakra.div>
        <chakra.p
          pr={{ base: 0, lg: 16 }}
          mb={4}
          fontSize="sm"
          letterSpacing="wider"
        >
          {formatMessage(
            {
              id: "home-hero-subtitle",
              defaultMessage:
                "Try the #1 Booking Manager and start enjoying {accent1} at at every stage of {accent2}.",
            },
            {
              accent1: (
                <chakra.strong fontWeight="bold">
                  {formatMessage({
                    id: "home-hero-subtitle-accent-1",
                    defaultMessage: "professional experiences",
                  })}
                </chakra.strong>
              ),
              accent2: (
                <chakra.strong fontWeight="bold">
                  {formatMessage({
                    id: "home-hero-subtitle-accent-2",
                    defaultMessage: "taking care of yourself",
                  })}
                </chakra.strong>
              ),
            }
          )}
        </chakra.p>
      </Flex>
      <Box zIndex={1}>
        <Image
          src="https://images.unsplash.com/photo-1622286342621-4bd786c2447c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
          alt="Barber shop"
          fit="cover"
          w="full"
          h={{ base: 64, md: "full" }}
          maxH={{ base: "400px", lg: "520px" }}
          bg="gray.100"
          loading="lazy"
        />
      </Box>
    </SimpleGrid>
  );
};

export { HeroSection };
