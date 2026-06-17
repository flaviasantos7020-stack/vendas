export type ProductCategory = 'naninha' | 'fralda-bordada';

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: ProductCategory;
  price: number;
  size?: string;
  images: string[];
}
