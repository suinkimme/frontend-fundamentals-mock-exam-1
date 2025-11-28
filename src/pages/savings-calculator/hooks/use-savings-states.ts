import { parseAsInteger, useQueryStates } from 'nuqs';

export function useSavingsStates() {
  return useQueryStates({
    goalAmount: parseAsInteger,
    monthlyAmount: parseAsInteger,
    savingsTerms: parseAsInteger,
  });
}
