import { useState } from 'react';
import { Tab } from 'tosslib';
import SavingsProductList from './SavingsProductList';
import SavingsResults from './SavingsResults';
import useSavingsProducts from '../hooks/useSavingsProducts';
import { useSavingsCalculatorStore } from '@/store/savingsCalculator';

type TabType = 'products' | 'results';

const isTabType = (value: string): value is TabType => {
  return value === 'products' || value === 'results';
};

const isSamePeriod = (productPeriod: number, selectedPeriod: number) => productPeriod === selectedPeriod;
const hasTargetPeriod = (products: SavingsProduct[], targetPeriod: number) =>
  products.some(product => isSamePeriod(product.availableTerms, targetPeriod));

const isMonthlyAmountInRange = (monthlyAmount: number, minMonthlyAmount: number, maxMonthlyAmount: number) =>
  monthlyAmount >= minMonthlyAmount && monthlyAmount <= maxMonthlyAmount;

const SavingsCalculatorTabs = () => {
  const [selectedTab, setSelectedTab] = useState<TabType>('products');
  const [selectedProductId, setSelectedProductId] = useState<string>('');

  const { amount, monthly, period } = useSavingsCalculatorStore();

  // 질문: List, Results에서 상품 리스트를 모두 사용하는데, 이 경우 전역 상태로 관리하는 게 좋을지 prop으로 충분한지
  const { data } = useSavingsProducts<SavingsProduct[]>([]);

  const filteredProducts = data.filter(product => {
    const hasInput = amount > 0 || monthly > 0;

    if (!hasInput) {
      return isSamePeriod(product.availableTerms, period);
    }

    return (
      hasTargetPeriod(products, period) &&
      isSamePeriod(product.availableTerms, period) &&
      isMonthlyAmountInRange(monthly, product.minMonthlyAmount, product.maxMonthlyAmount)
    );
  });

  return (
    <>
      <Tab
        onChange={value => {
          if (isTabType(value)) {
            setSelectedTab(value);
          }
        }}
      >
        <Tab.Item value="products" selected={selectedTab === 'products'}>
          적금 상품
        </Tab.Item>
        <Tab.Item value="results" selected={selectedTab === 'results'}>
          계산 결과
        </Tab.Item>
      </Tab>
      {selectedTab === 'products' && (
        <SavingsProductList
          products={filteredProducts}
          selectedProductId={selectedProductId}
          onClickProduct={productId => {
            setSelectedProductId(productId);
          }}
        />
      )}
      {selectedTab === 'results' && (
        <SavingsResults
          products={filteredProducts}
          selectedProductId={selectedProductId}
          onClickProduct={productId => {
            setSelectedProductId(productId);
          }}
        />
      )}
    </>
  );
};

export default SavingsCalculatorTabs;
