import { CreateCreditCardRequest } from './createCreditCardRequest';

export type CreatePaymentRequest = {
    productId: string;
    creditCardId: string | null;
    createCreditCardRequest: CreateCreditCardRequest;
}