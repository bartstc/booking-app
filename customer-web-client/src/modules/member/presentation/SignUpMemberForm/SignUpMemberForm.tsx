import React from "react";
import { SimpleGrid } from "@chakra-ui/react";
import { FormattedMessage } from "react-intl";
import { InputField, MaskedInputField } from "react-hook-form-chakra-fields";

import { Form, masks } from "shared/Form";

import { useSignUpMemberSchema } from "../../application";
import { ISignUpMemberDto } from "../../application/types";

interface IProps {
  onSubmit: (model: ISignUpMemberDto) => void;
}

const SignUpMemberForm = ({ onSubmit }: IProps) => {
  const schema = useSignUpMemberSchema();

  return (
    <Form<ISignUpMemberDto>
      id="sign-up-member-form"
      schema={schema}
      onSubmit={onSubmit}
      defaultValues={{
        fullName: "",
        email: "",
        password: "",
        phone: "",
      }}
    >
      <SimpleGrid
        columns={4}
        spacingX={4}
        w="100%"
        minW={{ base: "300px", md: "480px" }}
      >
        <InputField
          name="fullName"
          label={<FormattedMessage id="full-name" defaultMessage="Full name" />}
          id="full-name"
          colSpan={4}
        />
        <InputField
          name="email"
          label={<FormattedMessage id="email" defaultMessage="Email" />}
          id="email"
          colSpan={{ base: 4, md: 3 }}
        />
        <MaskedInputField
          label={<FormattedMessage id="phone" defaultMessage="Phone" />}
          name="phone"
          id="phone"
          mask={masks.phone}
          colSpan={{ base: 4, md: 3 }}
        />
        <InputField
          type="password"
          name="password"
          label={<FormattedMessage id="password" defaultMessage="Password" />}
          id="employee-password"
          colSpan={4}
          tip={
            <FormattedMessage
              id="password-tip"
              defaultMessage="Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character."
            />
          }
        />
      </SimpleGrid>
    </Form>
  );
};

export { SignUpMemberForm };
