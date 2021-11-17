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

export const useSignUpSuccessModalStore = createModalStore();

const SignUpSuccessModal = () => {
  const { formatMessage } = useIntl();
  const [isOpen, onClose] = useSignUpSuccessModalStore((state) => [
    state.isOpen,
    state.onClose,
  ]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {formatMessage({
            id: "success",
            defaultMessage: "Success!",
          })}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          {formatMessage({
            id: "sign-up-success-description",
            defaultMessage:
              "Your account has been created successfully. Just log in to use all the possibilities of our application!",
          })}
        </ModalBody>
        <ModalFooter>
          <LoginButton colorScheme="green" onClick={onClose} />
          <Button colorScheme="gray" ml={3} onClick={onClose}>
            {formatMessage({
              id: "continue-as-unlogged",
              defaultMessage: "Continue as unlogged",
            })}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export { SignUpSuccessModal };
