import { type Product, type ProductsResponse, type Category } from './types';

const BASE_URL = 'https://dummyjson.com';

export const shopApi = {
  getAllProducts: async (): Promise<Product[]> => {
    const response = await fetch(`${BASE_URL}/products?limit=100`);
    if (!response.ok) throw new Error('Failed to fetch products');
    const data: ProductsResponse = await response.json();
    return data.products;
  },

  getProductsByCategory: async (category: string): Promise<Product[]> => {
    const response = await fetch(`${BASE_URL}/products/category/${category}`);
    if (!response.ok) throw new Error('Failed to fetch category');
    const data: ProductsResponse = await response.json();
    return data.products;
  },

  searchProducts: async (query: string): Promise<Product[]> => {
    const response = await fetch(`${BASE_URL}/products/search?q=${query}`);
    if (!response.ok) throw new Error('Search failed');
    const data: ProductsResponse = await response.json();
    return data.products;
  },

  getMultipleCategories: async (categories: string[]): Promise<Product[]> => {
    const promises = categories.map(category => 
      fetch(`${BASE_URL}/products/category/${category}`)
        .then(res => {
          if (!res.ok) return { products: [] };
          return res.json();
        })
    );

    const results = await Promise.all(promises);
    return results.flatMap((data: ProductsResponse) => data.products);
  },

    getCategories: async (): Promise<Category[]> => {
        const response = await fetch(`${BASE_URL}/products/categories`);
        if (!response.ok) throw new Error('Failed to fetch categories');
        return response.json();
    }
};