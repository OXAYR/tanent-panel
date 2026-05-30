import { getIn } from './formik-nested';

export function fieldError(errors, touched, name, { showErrors = false } = {}) {
  const message = getIn(errors, name);
  if (!message) return undefined;
  if (showErrors || getIn(touched, name)) return message;
  return undefined;
}

export function inputErrorClass(errors, touched, name, options) {
  return fieldError(errors, touched, name, options)
    ? 'border-red-500 focus-visible:border-red-500 focus-visible:ring-red-500/15'
    : '';
}
