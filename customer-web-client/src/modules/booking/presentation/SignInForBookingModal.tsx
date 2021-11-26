import React from "react";
import { useIntl } from "react-intl";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";

import { createModalStore } from "shared/Modal";
import { Button } from "shared/Button";

import { LoginButton } from "modules/auth/presentation";

export const useSignInForBookingModalStore = createModalStore();

const SignInForBookingModal = () => {
  const { formatMessage } = useIntl();
  const [isOpen, onClose] = useSignInForBookingModalStore((state) => [
    state.isOpen,
    state.onClose,
  ]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {formatMessage({
            id: "sign-in",
            defaultMessage: "Sign in",
          })}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          {formatMessage({
            id: "sign-in-for-booking-description",
            defaultMessage:
              "Join our community to book offers for free! Registration is fun and should not take you more than a minute!",
          })}
        </ModalBody>
        <ModalFooter>
          <LoginButton size="md" colorScheme="green" onClick={onClose} />
          <Button colorScheme="gray" ml={3} onClick={onClose}>
            {formatMessage({
              id: "not-yet",
              defaultMessage: "Not yet",
            })}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export { SignInForBookingModal };
