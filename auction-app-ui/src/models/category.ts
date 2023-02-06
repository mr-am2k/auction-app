export type Category = {
  id: string;
  name: string;
  parentCategoryId?: string | null;
  numberOfProducts?: number | null;
};
