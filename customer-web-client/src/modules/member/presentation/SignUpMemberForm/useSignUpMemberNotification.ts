import { useIntl } from "react-intl";
import { useNotification } from "hooks";

export const useSignUpMemberNotification = () => {
  const { formatMessage } = useIntl();
  const { addNotification } = useNotification();

  return {
    showSuccessNotification: () =>
      addNotification({
        title: formatMessage({
          id: "sign-up-member",
          defaultMessage: "Sign up",
        }),
        description: formatMessage({
          id: "sign-up-member-success",
          defaultMessage: "New member account created successfully",
        }),
        type: "success",
      }),
    showFailureNotification: () =>
      addNotification({
        title: formatMessage({
          id: "sign-up-member",
          defaultMessage: "Sign up",
        }),
        description: formatMessage({
          id: "sign-up-member-failure",
          defaultMessage: "An error occurred during creating new account",
        }),
        type: "error",
      }),
    showEmailInUseNotification: () =>
      addNotification({
        title: formatMessage({
          id: "sign-up-member",
          defaultMessage: "Sign up",
        }),
        description: formatMessage({
          id: "sign-up-member-email-in-use",
          defaultMessage: "Provided email already in use",
        }),
        type: "warning",
      }),
  };
};
