import React from "react";
import { useIntl } from "react-intl";
import {
  Badge,
  Box,
  chakra,
  Flex,
  HStack,
  Image,
  useColorModeValue,
} from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import { mdiMapMarker, mdiTag } from "@mdi/js";

import { useFacilityByIdQuery } from "modules/facility/infrastructure/query";
import { businessCategoryTypeMessages } from "modules/facility/application/messages";
import { BookingButton } from "modules/booking/presentation";
import {
  BusinessCategoryDegreeType,
  BusinessCategoryType,
} from "modules/facility/application";

import { Icon } from "shared/Icon";

import { ContactType } from "types";

import { IOffer, PriceModel } from "../../application";

interface IProps {
  offer: IOffer;
  index: number;
}

const OfferItem = ({ offer, index }: IProps) => {
  const { formatMessage } = useIntl();

  const facility = useFacilityByIdQuery(offer.facilityId);

  const mainBusinessCategory =
    facility.businessCategories.find(
      (category) => category.degree === BusinessCategoryDegreeType.Main
    )?.type ?? BusinessCategoryType.Other;
  const address = `${facility.address.postCode}, ${facility.address.city}, ${facility.address.street}`;
  const contact = facility.contacts.find(
    (contact) =>
      contact.type === ContactType.Phone || contact.type === ContactType.Email
  );

  return (
    <Flex w="full" maxW={{ base: "480px", md: "100%" }} m="0 auto" mb={10}>
      <Flex
        shadow="lg"
        rounded="lg"
        overflow="hidden"
        flexDirection={{ base: "column", md: "row" }}
        w="full"
      >
        <chakra.div w={{ base: "full", md: "40%" }}>
          <Image
            w="full"
            h={56}
            fit="cover"
            objectPosition="center"
            src={`https://source.unsplash.com/1600x90${index}/?barber-shop`}
            alt="avatar"
          />

          <Flex
            alignItems="center"
            px={6}
            py={3}
            bg={useColorModeValue("gray.900", "gray.800")}
          >
            <Icon path={mdiTag} color="white" />

            <chakra.h1 mx={3} color="white" fontWeight="bold" fontSize="lg">
              {formatMessage({
                ...businessCategoryTypeMessages[mainBusinessCategory],
              })}
            </chakra.h1>
          </Flex>
        </chakra.div>

        <chakra.div w={{ base: "full", md: "60%" }}>
          <Box py={4} px={6}>
            <chakra.h1
              fontSize="xl"
              fontWeight="bold"
              color={useColorModeValue("gray.800", "white")}
            >
              {facility.name}
            </chakra.h1>

            <HStack>
              <Icon
                path={mdiMapMarker}
                color={useColorModeValue("gray.400", "gray.500")}
              />
              <chakra.p
                py={1}
                fontWeight="300"
                color={useColorModeValue("gray.400", "gray.500")}
              >
                {address}
              </chakra.p>
            </HStack>
            <Box py="6">
              <HStack alignItems="baseline">
                {offer.price.type === PriceModel.Free && (
                  <Badge rounded="full" px="2" colorScheme="teal">
                    Free
                  </Badge>
                )}
                <Box
                  color="gray.500"
                  fontWeight="semibold"
                  letterSpacing="wide"
                  fontSize="xs"
                  textTransform="uppercase"
                >
                  {offer.duration} min &bull;{" "}
                  {contact
                    ? contact.value
                    : formatMessage({
                        defaultMessage: "contact not available",
                        id: "contact-not-available",
                      })}
                </Box>
              </HStack>

              <Box
                mt="1"
                fontWeight="semibold"
                as="h4"
                lineHeight="tight"
                fontSize="lg"
                isTruncated
              >
                {offer.name}
              </Box>

              <Box>
                {offer.price.value} {offer.price.currency.toUpperCase()}
              </Box>

              <HStack align="flex-end" justify="space-between">
                <Flex d="flex" mt="8" alignItems="center">
                  {Array(5)
                    .fill("")
                    .map((_, i) => (
                      <StarIcon
                        key={i}
                        color={i < 4 ? "gray.600" : "gray.300"}
                      />
                    ))}
                  <Box as="span" ml="2" color="gray.600" fontSize="sm">
                    16 reviews
                  </Box>
                </Flex>
                <BookingButton offer={offer} />
              </HStack>
            </Box>
          </Box>
        </chakra.div>
      </Flex>
    </Flex>
  );
};

export { OfferItem };
