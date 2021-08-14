import React from "react";
import { useIntl } from "react-intl";

import { Button } from "../../Button";

const SignInButton = () => {
  const { formatMessage } = useIntl();

  return (
    <Button colorScheme="brand" variant="ghost" size="sm">
      {formatMessage({ defaultMessage: "Sign in", id: "sign-in" })}
    </Button>
  );
};

export { SignInButton };
