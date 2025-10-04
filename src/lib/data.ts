import { placeholderImages } from './placeholder-images.json';

export type Product = {
  id: string;
  name: string;
  price: number;
  imageId: string;
  category: 'Men' | 'Women' | 'Kids' | 'Accessories';
  tags: string[];
  shopId: string;
};

export type Shop = {
  id: string;
  name: string;
  location: string;
  imageId: string;
};

export type User = {
  id: string;
  name: string;
  avatarId: string;
};

export type Transaction = {
  id: string;
  type: 'cashback' | 'return' | 'exchange' | 'debit';
  amount: number;
  date: string;
  description: string;
};


export const products: Product[] = [
  { id: 'p1', name: 'Classic Denim Jacket', price: 89.99, imageId: 'product1', category: 'Women', tags: ['jacket', 'denim', 'casual'], shopId: 's1' },
  { id: 'p2', name: 'Floral Summer Dress', price: 64.50, imageId: 'product2', category: 'Women', tags: ['dress', 'summer', 'floral'], shopId: 's1' },
  { id: 'p3', name: 'Leather Ankle Boots', price: 120.00, imageId: 'product3', category: 'Women', tags: ['shoes', 'boots', 'leather'], shopId: 's2' },
  { id: 'p4', name: 'Cozy Gray Hoodie', price: 55.00, imageId: 'product4', category: 'Men', tags: ['hoodie', 'casual', 'comfort'], shopId: 's3' },
  { id: 'p5', name: 'Slim-Fit Chinos', price: 70.00, imageId: 'product5', category: 'Men', tags: ['pants', 'chinos', 'smart-casual'], shopId: 's3' },
  { id: 'p6', name: 'Striped T-Shirt', price: 25.00, imageId: 'product6', category: 'Men', tags: ['t-shirt', 'striped', 'casual'], shopId: 's1' },
  { id: 'p7', name: 'Flannel Shirt', price: 45.00, imageId: 'product7', category: 'Men', tags: ['shirt', 'flannel', 'plaid'], shopId: 's4' },
  { id: 'p8', name: 'Wool Winter Coat', price: 250.00, imageId: 'product8', category: 'Women', tags: ['coat', 'winter', 'wool'], shopId: 's2' },
  { id: 'p9', name: 'High-Waisted Jeans', price: 95.00, imageId: 'product9', category: 'Women', tags: ['jeans', 'denim', 'high-waist'], shopId: 's4' },
  { id: 'p10', name: 'Graphic T-Shirt', price: 30.00, imageId: 'product10', category: 'Men', tags: ['t-shirt', 'graphic', 'streetwear'], shopId: 's5' },
  { id: 'p11', name: 'Flowy Midi Skirt', price: 59.99, imageId: 'product11', category: 'Women', tags: ['skirt', 'midi', 'boho'], shopId: 's1' },
  { id: 'p12', name: 'Navy Blue Blazer', price: 150.00, imageId: 'product12', category: 'Men', tags: ['blazer', 'formal', 'smart'], shopId: 's5' },
];

export const shops: Shop[] = [
  { id: 's1', name: 'The Chic Boutique', location: 'Downtown, Springfield', imageId: 'shop1' },
  { id: 's2', name: 'Vintage Threads', location: 'Old Town, Springfield', imageId: 'shop2' },
  { id: 's3', name: 'Urban Appeal', location: 'North District, Springfield', imageId: 'shop3' },
  { id: 's4', name: 'Style & Substance', location: 'East Suburbs, Springfield', imageId: 'shop4' },
  { id: 's5', name: 'Gentleman\'s Quarter', location: 'Financial District, Springfield', imageId: 'shop5' },
];

export const users: User[] = [
  { id: 'u1', name: 'Alice Johnson', avatarId: 'avatar1' },
];

export const findImageById = (id: string) => placeholderImages.find(i => i.id === id);
