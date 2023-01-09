export type CreateCreditCardRequest = {
  holderFullName: string;
  number: string;
  expirationDate: Date;
  verificationValue: string;
};
