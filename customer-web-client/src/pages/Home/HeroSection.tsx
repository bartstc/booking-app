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

import barberImg from "assets/images/barberswg.svg";

const HeroSection = () => {
  const { formatMessage } = useIntl();

  return (
    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={0} position="relative">
      <Flex
        direction="column"
        alignItems="start"
        justifyContent="center"
        px={{ base: 4, lg: 20 }}
        py={{ base: 10, md: 16 }}
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
          fontSize={{ base: "2xl", lg: "3xl", "2xl": "6xl" }}
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
                  color={useColorModeValue("primary.500", "primary.300")}
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
        <chakra.div w="100%" mb={{ base: 6, md: 8, lg: 16 }}>
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
          fontSize={{ base: "sm", xl: "lg" }}
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
      <Box
        display={{ base: "none", md: "block" }}
        zIndex={1}
        p={{ base: 4, xl: 10 }}
      >
        <Image
          src={barberImg}
          alt="Barber shop"
          fit="cover"
          w="full"
          h={{ base: 64, md: "full" }}
          maxH={{ "2xl": "520px" }}
          loading="lazy"
        />
      </Box>
    </SimpleGrid>
  );
};

export { HeroSection };
