import React from "react";
import { useIntl } from "react-intl";
import { useHistory } from "react-router-dom";

import { useAuthContextSelector } from "modules/auth/application";

import { Button } from "../../Button";

const SignUpButton = () => {
  const { formatMessage } = useIntl();
  const { push } = useHistory();
  const isAuthenticated = useAuthContextSelector(
    (state) => state.isAuthenticated
  );

  if (isAuthenticated()) {
    return null;
  }

  return (
    <Button
      colorScheme="primary"
      variant="solid"
      size="sm"
      onClick={() => push("/sign-up")}
    >
      {formatMessage({ defaultMessage: "Sign up", id: "sign-up" })}
    </Button>
  );
};

export { SignUpButton };
