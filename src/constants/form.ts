export const IS_ONLY_ALPHABET_CHARACTERS = {
  value: /^[a-zA-Z0-9]([\w -]*[a-zA-Z0-9])?$/i,
  message: 'Only alphabet characters, -, and spaces are allowed',
};

export const MAX_FIELD_LENGTH = 50;

export const IS_EMAIL_PATTERN = {
  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
  message: 'Invalid email address',
};
