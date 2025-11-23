import { Assets, ListRow, colors } from 'tosslib';
import useSavingsProducts from '../hooks/useSavingsProducts';
import { useSavingsCalculatorStore } from '@/store/savingsCalculator';
import { SavingsProducts } from '@/apis/types/savingsProducts.types';

const isSamePeriod = (productPeriod: number, selectedPeriod: number) => productPeriod === selectedPeriod;
const hasTargetPeriod = (products: SavingsProduct[], targetPeriod: number) =>
  products.some(product => isSamePeriod(product.availableTerms, targetPeriod));

const isMonthlyAmountInRange = (monthlyAmount: number, minMonthlyAmount: number, maxMonthlyAmount: number) =>
  monthlyAmount >= minMonthlyAmount && monthlyAmount <= maxMonthlyAmount;

const SavingsProductList = () => {
  const { amount, monthly, period } = useSavingsCalculatorStore();
  const { data } = useSavingsProducts();

  const products = data?.filter(product => {
    const hasInput = amount > 0 || monthly > 0;

    if (!hasInput) {
      return true;
    }

    return (
      hasTargetPeriod(data, period) &&
      isMonthlyAmountInRange(monthly, product.minMonthlyAmount, product.maxMonthlyAmount)
    );
  });

  return (
    <>
      {products.map((product, index) => (
        <ListRow
          key={`${product.id}-${index}}`}
          contents={
            <ListRow.Texts
              type="3RowTypeA"
              top={'기본 정기적금'}
              topProps={{ fontSize: 16, fontWeight: 'bold', color: colors.grey900 }}
              middle={'연 이자율: 3.2%'}
              middleProps={{ fontSize: 14, color: colors.blue600, fontWeight: 'medium' }}
              bottom={'100,000원 ~ 500,000원 | 12개월'}
              bottomProps={{ fontSize: 13, color: colors.grey600 }}
            />
          }
          // right={<Assets.Icon name="icon-check-circle-green" />}
          onClick={() => {}}
        />
      ))}
    </>
  );
};

export default SavingsProductList;
