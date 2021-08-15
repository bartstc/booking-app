import React from "react";
import { useIntl } from "react-intl";
import {
  Box,
  Flex,
  useColorModeValue,
  Image,
  chakra,
  HStack,
} from "@chakra-ui/react";
import { mdiMapMarker, mdiTag } from "@mdi/js";

import { useFacilityByIdQuery } from "modules/facility/infrastructure/query";
import { businessCategoryTypeMessages } from "modules/facility/application/messages";
import {
  BusinessCategoryDegreeType,
  BusinessCategoryType,
} from "modules/facility/application";

import { Icon } from "shared/Icon";

import { IOffer } from "../../application";

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

        <chakra.div>
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

            <Flex
              alignItems="center"
              mt={4}
              color={useColorModeValue("gray.700", "gray.200")}
            >
              <Icon path={mdiTag} />

              <chakra.h1 px={2} fontSize="sm">
                Choc UI
              </chakra.h1>
            </Flex>

            <Flex
              alignItems="center"
              mt={4}
              color={useColorModeValue("gray.700", "gray.200")}
            >
              <Icon path={mdiTag} />

              <chakra.h1 px={2} fontSize="sm">
                California
              </chakra.h1>
            </Flex>
            <Flex
              alignItems="center"
              mt={4}
              color={useColorModeValue("gray.700", "gray.200")}
            >
              <Icon path={mdiTag} />

              <chakra.h1 px={2} fontSize="sm">
                patterson@example.com
              </chakra.h1>
            </Flex>
          </Box>
        </chakra.div>
      </Flex>
    </Flex>
  );
};

export { OfferItem };
