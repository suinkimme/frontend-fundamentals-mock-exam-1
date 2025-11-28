export interface SavingsProduct {
  id: string;
  name: string;
  annualRate: number;
  minMonthlyAmount: number;
  maxMonthlyAmount: number;
  availableTerms: number;
}

export type FilterSavingsProduct = (product: SavingsProduct) => boolean;

export function filterByMonthlyAmount(product: SavingsProduct, monthlyAmount?: number | null) {
  if (monthlyAmount == null) {
    return true;
  }

  return product.minMonthlyAmount <= monthlyAmount && product.maxMonthlyAmount >= monthlyAmount;
}

export function filterBySavingsTerms(product: SavingsProduct, savingsTerms?: number | null) {
  if (savingsTerms == null) {
    return true;
  }

  return product.availableTerms <= savingsTerms;
}

export function filterByProductId(product: SavingsProduct, productId?: string | null) {
  if (productId == null) {
    return true;
  }

  return product.id === productId;
}

export type OrderBySavingsProduct = (a: SavingsProduct, b: SavingsProduct) => number;

export function orderByAnnualRate(ascending: boolean): OrderBySavingsProduct {
  return (a: SavingsProduct, b: SavingsProduct) => {
    return ascending ? a.annualRate - b.annualRate : b.annualRate - a.annualRate;
  };
}

export function calculateExpectedProfit(product: SavingsProduct, monthlyAmount: number) {
  return monthlyAmount * product.availableTerms * (1 + product.annualRate * 0.5);
}

export function calculateDifference(product: SavingsProduct, goalAmount: number, expectedProfit: number) {
  return goalAmount - expectedProfit;
}

export function calculateMonthlyAmount(product: SavingsProduct, goalAmount: number) {
  return goalAmount / (product.availableTerms * (1 + product.annualRate * 0.5));
}
