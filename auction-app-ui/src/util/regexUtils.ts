export const EMAIL_REGEX = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;

export const PASSWORD_REGEX = {
  capital: /[A-Z]/,
  lowercase: /[a-z]/,
  digit: /[0-9]/,
  character: /[!@#$%^&*]/,
  full: /^[A-Za-z0-9!@#$%^&*]{8,}$/,
};
