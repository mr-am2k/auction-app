export type CreateProductRequest = {
  name: string;
  description: string;
  imageURLs: string[];
  startPrice: number;
  categoryId: string;
  creationDateTime: Date;
  expirationDateTime: Date;
  userId: string;
};
