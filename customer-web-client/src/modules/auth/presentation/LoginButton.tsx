import React from "react";
import { useIntl } from "react-intl";
import { ButtonProps } from "@chakra-ui/react";

import { Button } from "shared/Button";
import { useAuthContextSelector } from "modules/auth/application";

interface IProps extends ButtonProps {}

const LoginButton = ({ onClick, ...props }: IProps) => {
  const { formatMessage } = useIntl();
  const isAuthenticated = useAuthContextSelector(
    (state) => state.isAuthenticated
  );
  const login = useAuthContextSelector((state) => state.login);

  if (isAuthenticated()) {
    return null;
  }

  return (
    <Button
      colorScheme="gray"
      size="sm"
      onClick={(e) => {
        login();
        if (onClick) onClick(e);
      }}
      {...props}
    >
      {formatMessage({ defaultMessage: "Sign in", id: "sign-in" })}
    </Button>
  );
};

export { LoginButton };
