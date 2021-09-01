import React from "react";
import { useIntl } from "react-intl";
import { VStack, Divider, Heading, useColorModeValue } from "@chakra-ui/react";

import { SubmitButton } from "shared/Form";
import { SignUpMemberForm } from "modules/member/presentation";

const SignUp = () => {
  const { formatMessage } = useIntl();
  const subheadingColor = useColorModeValue("primary.500", "primary.300");

  return (
    <VStack spacing={8} w="100%" py={4} mt={8}>
      <VStack minW={{ base: "300px", md: "480px" }}>
        <Heading fontSize={{ base: "lg", md: "3xl" }}>
          {formatMessage({
            id: "sign-up-heading",
            defaultMessage: "Ready to dive in?",
          })}
        </Heading>
        <Heading color={subheadingColor} fontSize={{ base: "lg", md: "3xl" }}>
          {formatMessage({
            id: "sign-up-subheading",
            defaultMessage: "Create your account for free!",
          })}
        </Heading>
        <Divider pt={3} />
      </VStack>
      <VStack w="100%">
        <SignUpMemberForm onSubmit={(model) => console.log(model)} />
        <SubmitButton
          colorScheme="green"
          type="submit"
          form="sign-up-member-form"
        />
      </VStack>
    </VStack>
  );
};

export default SignUp;
