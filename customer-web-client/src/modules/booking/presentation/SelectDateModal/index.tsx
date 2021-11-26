import React from "react";
import shallow from "zustand/shallow";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useBreakpointValue,
} from "@chakra-ui/react";
import { FormattedMessage } from "react-intl";

import { createModalStore } from "shared/Modal";
import { Form } from "shared/Form";

import { IOffer } from "modules/offers/application";

import { TermSelector } from "./TermSelector";
import { IAddBookingDto } from "../../application";
import { useAddBooking } from "../../infrastructure/command";
import { useAddBookingNotification } from "./useAddBookingNotification";
import { useMemberContextSelector } from "../../../context/application";

export const useBookOfferModalStore = createModalStore<IOffer>();

const SelectDateModal = () => {
  const memberId = useMemberContextSelector((state) => state.id);
  const [isOpen, onClose, offer] = useBookOfferModalStore(
    (state) => [state.isOpen, state.onClose, state.selectedItem],
    shallow
  );
  const modalSize = useBreakpointValue({ base: "sm", md: "2xl" });

  const [addBooking] = useAddBooking();
  const {
    showFailureNotification,
    showSuccessNotification,
  } = useAddBookingNotification();

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={modalSize}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <FormattedMessage
            id="select-term-and-employee-header"
            defaultMessage="Select term and employee"
          />
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody p={{ base: 2, md: 4 }} pb={6}>
          {offer && (
            <Form<IAddBookingDto>
              id="booking-form"
              onSubmit={async (model) => {
                try {
                  await addBooking(offer.facilityId, model);
                  showSuccessNotification();
                } catch {
                  showFailureNotification();
                } finally {
                  onClose();
                }
              }}
              defaultValues={{
                customerId: memberId,
                bookedRecords: [
                  {
                    employerId: "",
                    offerId: offer.offerId,
                    date: "",
                  },
                ],
              }}
            >
              <TermSelector
                offerId={offer.offerId}
                facilityId={offer.facilityId}
              />
            </Form>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export { SelectDateModal };
