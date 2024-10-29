import * as Yup from "yup";

export function GetFieldsErrors(err: Yup.ValidationError) {
  const { inner } = err as Yup.ValidationError;
  const errors: Record<string, string> = {};
  for (const { path, message } of inner) {
    if (path) errors[path] = message;
  }
  return errors;
}
