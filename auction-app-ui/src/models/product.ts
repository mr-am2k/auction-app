import { Bid } from './bid';

export type Product = {
    id: string;
    name: string;
    description: string;
    imageURLs: string[];
    price: number;
    creationDateTime: Date;
    expirationDateTime: Date;
    bids: Bid[];
    remainingTime: string
    userId: string;
}

