import { Bid } from './bid';

export type Product = {
    id: string;
    name: string;
    description: string;
    imageURLs: string[];
    startPrice: number;
    creationDateTime: Date;
    expirationDateTime: Date;
    bids: Bid[];
    remainingTime: string
    userId: string;
    highestBidder: string | null;
    highestBid: number | null;
    numberOfBids: number | null;
}

