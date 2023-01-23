export enum ProductSort {
  DEFAULT,
  CREATED_DESC,
  EXPIRATION_ASC,
  PRICE_ASC,
  PRICE_DESC,
}

export const getSortingName = (sort: ProductSort) => {
  return ProductSort[sort];
};
