import React from "react";
import { useIntl } from "react-intl";
import { ButtonProps } from "@chakra-ui/react";

import { Button } from "shared/Button";
import { useAuthContextSelector } from "modules/auth/application";

interface IProps extends ButtonProps {}

const LoginButton = (props: IProps) => {
  const { formatMessage } = useIntl();
  const login = useAuthContextSelector((state) => state.login);

  return (
    <Button colorScheme="gray" onClick={login} {...props}>
      {formatMessage({ defaultMessage: "Sign in", id: "sign-in" })}
    </Button>
  );
};

export { LoginButton };
