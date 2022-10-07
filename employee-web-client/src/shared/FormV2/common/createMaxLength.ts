export const createMaxLength = (max: number, message = `Max ${max} characters`) => ({
  value: max,
  message,
});
