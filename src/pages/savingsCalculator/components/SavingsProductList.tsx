import { Assets, ListRow, colors } from 'tosslib';
import useSavingsProducts from '../hooks/useSavingsProducts';
import { useSavingsCalculatorStore } from '@/store/savingsCalculator';
import { SavingsProduct } from '@/apis/types/savingsProducts.types';
import { formatNumber } from '@/utils/fomatter';

const isSamePeriod = (productPeriod: number, selectedPeriod: number) => productPeriod === selectedPeriod;
const hasTargetPeriod = (products: SavingsProduct[], targetPeriod: number) =>
  products.some(product => isSamePeriod(product.availableTerms, targetPeriod));

const isMonthlyAmountInRange = (monthlyAmount: number, minMonthlyAmount: number, maxMonthlyAmount: number) =>
  monthlyAmount >= minMonthlyAmount && monthlyAmount <= maxMonthlyAmount;

interface Props {
  selectedProductId: string | null;
  onClickProduct: (productId: string) => void;
}

const SavingsProductList = ({ selectedProductId, onClickProduct }: Props) => {
  const { amount, monthly, period } = useSavingsCalculatorStore();
  const { data } = useSavingsProducts();

  const products = data?.filter(product => {
    const hasInput = amount > 0 || monthly > 0;

    if (!hasInput) {
      return isSamePeriod(product.availableTerms, period);
    }

    return (
      hasTargetPeriod(data, period) &&
      isSamePeriod(product.availableTerms, period) &&
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
              top={product.name}
              topProps={{ fontSize: 16, fontWeight: 'bold', color: colors.grey900 }}
              middle={`연 이자율: ${product.annualRate}%`}
              middleProps={{ fontSize: 14, color: colors.blue600, fontWeight: 'medium' }}
              bottom={`${formatNumber(product.minMonthlyAmount)}원 ~ ${formatNumber(product.maxMonthlyAmount)}원 | ${product.availableTerms}개월`}
              bottomProps={{ fontSize: 13, color: colors.grey600 }}
            />
          }
          right={selectedProductId === product.id && <Assets.Icon name="icon-check-circle-green" />}
          onClick={() => onClickProduct(product.id)}
        />
      ))}
    </>
  );
};

export default SavingsProductList;
