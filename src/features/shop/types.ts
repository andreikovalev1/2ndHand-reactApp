export interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand: string;
  sku: string;
  weight: number;
  thumbnail: string;
  images: string[];
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export interface Category {
  slug: string;
  name: string;
  url: string;
}

export interface ShopSidebarProps {
    onCategorySelect: (slug: string | null) => void;
    selectedCategory: string | null;
}

export type SortOption = 'asc' | 'desc' | null;
export type SelectedFilters = Record<string, string[]>;

export interface FilterBarProps {
    currentSort: SortOption;
    onSortChange: (sort: SortOption) => void;
    selectedFilters: SelectedFilters;
    onFilterChange: (filters: SelectedFilters) => void;
    isSaleActive: boolean;
    onSaleToggle: (active: boolean) => void;
}