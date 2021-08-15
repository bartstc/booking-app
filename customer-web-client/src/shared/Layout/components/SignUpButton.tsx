import React from "react";
import { useIntl } from "react-intl";

import { Button } from "../../Button";

const SignUpButton = () => {
  const { formatMessage } = useIntl();

  return (
    <Button colorScheme="primary" variant="solid" size="sm">
      {formatMessage({ defaultMessage: "Sign up", id: "sign-up" })}
    </Button>
  );
};

export { SignUpButton };
