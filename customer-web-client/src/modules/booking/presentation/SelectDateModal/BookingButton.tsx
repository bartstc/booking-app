import React from "react";
import { useIntl } from "react-intl";

import { Button } from "shared/Button";

import { IOffer } from "modules/offers/application";

import { useBookOfferModalStore } from "./index";

interface IProps {
  offer: IOffer;
}

const BookingButton = ({ offer }: IProps) => {
  const { formatMessage } = useIntl();
  const onOpen = useBookOfferModalStore((store) => store.onOpen);

  return (
    <Button
      size="sm"
      colorScheme="primary"
      textTransform="uppercase"
      onClick={() => onOpen(offer)}
    >
      {formatMessage({
        defaultMessage: "book it",
        id: "book-it",
      })}
    </Button>
  );
};

export { BookingButton };
