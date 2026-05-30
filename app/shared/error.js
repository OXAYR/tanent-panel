function collectFieldErrors(errors) {
  return Object.values(errors).flatMap((value) =>
    Array.isArray(value) ? value : [value]
  );
}

export function getApiErrorMessage(error, options = {}) {
  const {
    unauthorizedMessage = 'Invalid login or password.',
    fallbackMessage = 'Something went wrong. Please try again.',
  } = options;

  if (!error) return null;

  const payloadErrors = error.data?.errors;
  if (Array.isArray(payloadErrors) && payloadErrors.length > 0) {
    return payloadErrors.join(', ');
  }
  if (payloadErrors && typeof payloadErrors === 'object') {
    const messages = collectFieldErrors(payloadErrors);
    if (messages.length > 0) return messages.join(', ');
  }

  if (typeof error.data?.message === 'string') return error.data.message;
  if (error.status === 401) return unauthorizedMessage;
  return fallbackMessage;
}
