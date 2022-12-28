import { Product } from './product';

export type BidWithProduct = {
    id: string;
    price: number;
    creationDateTime: Date;
    product: Product;
    userId: string;
}

