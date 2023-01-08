export type ProductList = {
  id: string;
  imageUrl: string;
  name: string;
  remainingTime: string;
  price: number;
  numberOfBids: number | null;
  highestBid: number | null;
};
