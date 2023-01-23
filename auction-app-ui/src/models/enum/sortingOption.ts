export enum SortingOption {
  DEFAULT,
  CREATED_DESC,
  EXPIRATION_ASC,
  PRICE_ASC,
  PRICE_DESC,
}

export const getSortingName = (sort: SortingOption) => {
  return SortingOption[sort];
};
