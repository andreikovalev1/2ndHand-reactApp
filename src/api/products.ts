export interface Product {
    id: number;
    title: string;
    category: string;
    image: string;
    badges?: ('New' | 'Reserved')[];
    price: number;
    originalPrice?: number;
}

export const MOCK_PRODUCTS: Product[] = [
  { id: 1, title: 'Autumn / Spring jacket - Esprit', price: 42.90, image: 'https://dummyjson.com/image/300x400/008080/ffffff?text=Jacket', category: 'Jackets', badges: ['New', 'Reserved'] },
  { id: 2, title: 'Autumn / Spring jacket - Other Brand', price: 32.90, originalPrice: 42.90, image: 'https://dummyjson.com/image/300x400/cccccc/000000?text=Jacket+2', category: 'Jackets', badges: ['New'] },
  { id: 3, title: 'Faux leather jacket - Zizzi', price: 37.90, image: 'https://dummyjson.com/image/300x400/a18167/ffffff?text=Leather', category: 'Jackets', badges: ['New'] },
  { id: 4, title: 'Outdoor jacket - Torstai', price: 22.90, image: 'https://dummyjson.com/image/300x400/eebb44/ffffff?text=Outdoor', category: 'Jackets', badges: ['New'] },
];