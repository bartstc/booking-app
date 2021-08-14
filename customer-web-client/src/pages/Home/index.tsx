import React from 'react';
import {VStack, chakra} from "@chakra-ui/react"

import {OffersList} from 'modules/offers/presentation'

import {HeroSection} from "./HeroSection";

const Home = () => {
  return (
    <VStack spacing={4}>
      <HeroSection />
      <OffersList />
    </VStack>
  );
};

export default Home;
