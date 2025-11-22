import { useState, useEffect } from 'react';
import { http } from 'tosslib';
import { apiRoutes } from '@/apis/routes';
import { SavingsProduct } from '@/apis/types/savingsProducts.types';

const useSavingsProducts = () => {
  const [savingsProducts, setSavingsProducts] = useState<SavingsProduct[]>([]);

  const fetchSavingsProducts = async () => {
    const products = await http.get<SavingsProduct[]>(apiRoutes.products);
    return products;
  };

  useEffect(() => {
    fetchSavingsProducts().then(products => {
      setSavingsProducts(products);
    });
  }, []);

  return { data: savingsProducts };
};

export default useSavingsProducts;
