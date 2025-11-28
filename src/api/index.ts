import { http } from 'tosslib';

interface SavingsProduct {
  id: string;
  name: string;
  annualRate: number;
  minMonthlyAmount: number;
  maxMonthlyAmount: number;
  availableTerms: number;
}

export async function getSavingsProducts() {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return http.get<SavingsProduct[]>('/api/savings-products');
}
