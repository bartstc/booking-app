import React from "react";
import { FormattedMessage } from "react-intl";
import { ModalFooter } from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";

import { Button } from "shared/Button";

interface IProps {
  onClose: () => void;
  isDisabled: boolean;
}

const Footer = ({ onClose, isDisabled }: IProps) => {
  const {
    formState: { isSubmitting },
  } = useFormContext();

  return (
    <ModalFooter>
      <Button
        isDisabled={isDisabled}
        type="submit"
        form="booking-form"
        isLoading={isSubmitting}
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
