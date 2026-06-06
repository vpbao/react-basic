export type Product = {
  id?: number;
  name: string;
  price: number;
  category: string;
  inStock: boolean;
  discount: number;
}

export type ProductFormValues = Omit<Product, "id">;

export type ProductFilters = {
  keyword: string;
  selectedCategory: string;
};
