/** `head_admins[0].email` → `head_admins.0.email` */
export function normalizeFieldPath(path) {
  return path.replace(/\[(\d+)\]/g, '.$1');
}

export function getIn(object, path) {
  if (!object || !path) return undefined;
  return normalizeFieldPath(path)
    .split('.')
    .reduce((acc, key) => (acc == null ? acc : acc[key]), object);
}

export function setIn(object, path, value) {
  const keys = normalizeFieldPath(path).split('.');
  let current = object;
  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    if (
      current[key] === undefined ||
      current[key] === null ||
      typeof current[key] !== 'object'
    ) {
      current[key] = {};
    }
    current = current[key];
  }
  current[keys[keys.length - 1]] = value;
  return object;
}

export function flatErrorsToNested(flatErrors) {
  const nested = {};
  Object.entries(flatErrors).forEach(([path, message]) => {
    setIn(nested, path, message);
  });
  return nested;
}

export function flatPathsToTouched(flatErrors) {
  const touched = {};
  Object.keys(flatErrors).forEach((path) => {
    setIn(touched, path, true);
  });
  return touched;
}

export function mergeDeep(target, source) {
  const output = { ...target };
  Object.keys(source).forEach((key) => {
    const sourceValue = source[key];
    const targetValue = output[key];
    if (
      sourceValue &&
      typeof sourceValue === 'object' &&
      !Array.isArray(sourceValue)
    ) {
      output[key] = mergeDeep(
        targetValue && typeof targetValue === 'object' ? targetValue : {},
        sourceValue
      );
    } else {
      output[key] = sourceValue;
    }
  });
  return output;
}

/** Build nested touched map from Formik/Yup nested errors. */
export function touchAllFields(errors) {
  if (!errors || typeof errors === 'string') return true;
  if (Array.isArray(errors)) {
    return errors.map((entry) => touchAllFields(entry));
  }
  const touched = {};
  Object.entries(errors).forEach(([key, value]) => {
    touched[key] = touchAllFields(value);
  });
  return touched;
}

export function flattenErrorMessages(errors, messages = []) {
  if (!errors) return messages;
  if (typeof errors === 'string') {
    messages.push(errors);
    return messages;
  }
  if (Array.isArray(errors)) {
    errors.forEach((entry) => flattenErrorMessages(entry, messages));
    return messages;
  }
  Object.values(errors).forEach((value) => flattenErrorMessages(value, messages));
  return messages;
}
