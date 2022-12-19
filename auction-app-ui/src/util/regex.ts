export const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/;
export const PASSWORD_REGEX = {
  capital: /[A-Z]/,
  lowercase: /[a-z]/,
  digit: /[0-9]/,
  character: /[!@#$%^&*]/,
  full: /^[A-Za-z0-9!@#$%^&*]{7,20}$/,
};
