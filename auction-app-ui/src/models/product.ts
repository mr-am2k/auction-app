import { Bid } from './bid';

export type Product = {
    id: string;
    name: string;
    description: string;
    imageURL: string[];
    price: number;
    creationDateTime: Date;
    expirationDateTime: Date;
    bids: Bid[];
}

