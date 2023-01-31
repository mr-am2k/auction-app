import { Address } from './address';
import { Bid } from './bid';
import { Category } from './category';
import { User } from './user';

export type Product = {
  id: string;
  name: string;
  description: string;
  imageURLs: string[];
  startPrice: number;
  creationDateTime: Date;
  expirationDateTime: Date;
  bids: Bid[];
  remainingTime: string;
  user: User;
  category: Category;
  subcategory: Category;
  address: Address;
  highestBidder: string | null;
  highestBidPrice: number | null;
  numberOfBids: number | null;
  paid: boolean
};
