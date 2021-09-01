import * as yup from 'yup';
import { useRequiredFieldMessage } from '../messages';

export const useStringSchema = () => {
  const requiredMessage = useRequiredFieldMessage();
  return yup.string().required(requiredMessage).nullable(true);
};
