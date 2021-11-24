import React from "react";
import { FormattedMessage } from "react-intl";
import { ModalFooter } from "@chakra-ui/react";

import { Button } from "shared/Button";

interface IProps {
  onClose: () => void;
  isDisabled: boolean;
}

const Footer = ({ onClose, isDisabled }: IProps) => {
  return (
    <ModalFooter>
      <Button
        isDisabled={isDisabled}
        type="submit"
        form="booking-form"
        colorScheme="blue"
      >
        <FormattedMessage id="accept" defaultMessage="Accept" />
      </Button>
      <Button colorScheme="gray" ml={3} onClick={onClose}>
        <FormattedMessage id="close" defaultMessage="Close" />
      </Button>
    </ModalFooter>
  );
};

export { Footer };
