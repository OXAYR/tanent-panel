import { normalizeFieldPath } from './formik-nested';

export async function validateYupStep(schema, values) {
  if (!schema) return {};

  try {
    await schema.validate(values, { abortEarly: false });
    return {};
  } catch (err) {
    const errors = {};
    err.inner?.forEach((validationError) => {
      if (!validationError.path) return;
      const path = normalizeFieldPath(validationError.path);
      if (!errors[path]) {
        errors[path] = validationError.message;
      }
    });
    return errors;
  }
}
