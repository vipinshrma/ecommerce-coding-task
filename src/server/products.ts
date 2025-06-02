import { Product } from '@/types';
import axios from 'axios';

const PRODUCTS_API_URL = 'https://dummyjson.com/products';




export const getProducts = async ({ search }: { search: string }): Promise<Product[]> => {
  try {
    const response = await axios.get(PRODUCTS_API_URL);
    return response.data.products;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const getProductById = async (id: number): Promise<Product> => {
  try {
    const response = await axios.get(`${PRODUCTS_API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching product with id ${id}:`, error);
    throw error;
  }
};

export const searchProducts = async (query: string): Promise<Product[]> => {
  try {
    const response = await axios.get(`${PRODUCTS_API_URL}/search?q=${query}`);
    return response.data.products;
  } catch (error) {
    console.error(`Error searching products with query "${query}":`, error);
    throw error;
  }
};

export const getProductsByCategory = async (category: string): Promise<Product[]> => {
  try {
    const response = await axios.get(`${PRODUCTS_API_URL}/category/${category}`);
    return response.data.products;
  } catch (error) {
    console.error(`Error fetching products in category "${category}":`, error);
    throw error;
  }
};


export const getProductCategories = async (): Promise<string[]> => {
  try {
    const response = await axios.get(`${PRODUCTS_API_URL}/categories`);
    return response.data;
  } catch (error) {
    console.error('Error fetching product categories:', error);
    throw error;
  }
};
