import React from "react";
import { useIntl } from "react-intl";

import { Button } from "shared/Button";

import { IOffer } from "modules/offers/application";
import { useAuthContextSelector } from "modules/auth/application";

import { useBookOfferModalStore } from "./SelectDateModal";
import { useSignInForBookingModalStore } from "./SignInForBookingModal";

interface IProps {
  offer: IOffer;
}

const BookingButton = ({ offer }: IProps) => {
  const isAuthenticated = useAuthContextSelector(
    (state) => state.isAuthenticated
  );

  const onSignInOpen = useSignInForBookingModalStore((state) => state.onOpen);

  const { formatMessage } = useIntl();
  const onOpen = useBookOfferModalStore((store) => store.onOpen);

  return (
    <Button
      size="sm"
      colorScheme="primary"
      textTransform="uppercase"
      onClick={() => {
        if (isAuthenticated()) {
          onOpen(offer);
        } else {
          onSignInOpen();
        }
      }}
    >
      {formatMessage({
        defaultMessage: "book it",
        id: "book-it",
      })}
    </Button>
  );
};

export { BookingButton };
