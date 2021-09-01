import * as yup from "yup";
import { useIntl } from "react-intl";
import {
  useRequiredFieldMessage,
  useInvalidFormatFieldMessage,
} from "utils/messages";
import { TextValidator } from "utils/validation";

import { ISignUpMemberDto } from "./types";

export const useSignUpMemberSchema = () => {
  const { formatMessage } = useIntl();
  const requiredMessage = useRequiredFieldMessage();
  const invalidFormatMessage = useInvalidFormatFieldMessage();

  return yup.object().shape<ISignUpMemberDto>({
    fullName: yup.string().required(requiredMessage).min(1).max(999),
    phone: yup
      .string()
      .required(requiredMessage)
      .min(1)
      .max(999)
      .test("phone format", invalidFormatMessage, function (value) {
        return TextValidator.validatePhoneNumber(value!);
      }),
    birthDate: yup
      .string()
      .required(requiredMessage)
      .nullable(true) as yup.Schema<string>,
    email: yup
      .string()
      .required(requiredMessage)
      .test(
        "valid email format",
        formatMessage({
          id: "invalid-format",
          defaultMessage: "Invalid format",
        }),
        (email) => {
          if (!email) return false;
          return TextValidator.validateEmailAddress(email);
        }
      ),
    password: yup
      .string()
      .required(requiredMessage)
      .test(
        "valid password format",
        formatMessage({
          id: "invalid-format",
          defaultMessage: "Invalid format",
        }),
        (password) => {
          if (!password) return false;
          return TextValidator.validatePassword(password);
        }
      ),
  });
};
