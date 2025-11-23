import { useState } from 'react';
import { Tab } from 'tosslib';
import SavingsProductList from './SavingsProductList';
import SavingsResults from './SavingsResults';

type TabType = 'products' | 'results';

const isTabType = (value: string): value is TabType => {
  return value === 'products' || value === 'results';
};

const SavingsCalculatorTabs = () => {
  const [selectedTab, setSelectedTab] = useState<TabType>('products');
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
      {selectedTab === 'products' && <SavingsProductList />}
      {selectedTab === 'results' && <SavingsResults />}
    </>
  );
};

export default SavingsCalculatorTabs;
