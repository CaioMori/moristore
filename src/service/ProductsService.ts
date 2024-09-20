import api from './Service';

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export const getProducts = async (): Promise<Product[]> => {
  const {data} = await api.get<Product[]>('/products');
  console.log(data);
  return data;
};
