import { create } from 'zustand';

interface SavingsCalculatorStore {
  amount: number;
  monthly: number;
  period: number;
  setAmount: (amount: number) => void;
  setMonthly: (monthly: number) => void;
  setPeriod: (period: number) => void;
}

export const useSavingsCalculatorStore = create<SavingsCalculatorStore>(set => ({
  amount: 0,
  monthly: 0,
  period: 12,
  setAmount: (amount: number) => set(state => ({ ...state, amount })),
  setMonthly: (monthly: number) => set(state => ({ ...state, monthly })),
  setPeriod: (period: number) => set(state => ({ ...state, period })),
}));
