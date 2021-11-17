import React from "react";
import { useIntl } from "react-intl";
import { VStack, Divider, Heading, useColorModeValue } from "@chakra-ui/react";

import { SubmitButton } from "shared/Form";

import {
  SignUpMemberForm,
  SignUpSuccessModal,
  useSignUpMemberNotification,
  useSignUpSuccessModalStore,
} from "modules/member/presentation";
import { useSignUpMember } from "modules/member/infrastructure/command";

const SignUp = () => {
  const { formatMessage } = useIntl();
  const subheadingColor = useColorModeValue("primary.500", "primary.300");
  const [signUpMember, isLoading] = useSignUpMember();
  const {
    showSuccessNotification,
    showFailureNotification,
  } = useSignUpMemberNotification();
  const onOpen = useSignUpSuccessModalStore((state) => state.onOpen);

  return (
    <>
      <SignUpSuccessModal />
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
          <SignUpMemberForm
            onSubmit={async (model) => {
              try {
                await signUpMember(model);
                showSuccessNotification();
                onOpen();
              } catch {
                showFailureNotification();
              }
            }}
          />
          <SubmitButton form="sign-up-member-form" isLoading={isLoading} />
        </VStack>
      </VStack>
    </>
  );
};

export default SignUp;
