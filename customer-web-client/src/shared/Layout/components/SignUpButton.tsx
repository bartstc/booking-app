import React from "react";
import { useIntl } from "react-intl";
import { useHistory } from "react-router-dom";

import { Button } from "../../Button";

const SignUpButton = () => {
  const { formatMessage } = useIntl();
  const { push } = useHistory();

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
