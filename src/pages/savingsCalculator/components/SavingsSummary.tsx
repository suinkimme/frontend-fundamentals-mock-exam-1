import { Spacing, ListRow, Border, ListHeader, colors } from 'tosslib';
import { formatNumber } from '@/utils/fomatter';
import { SavingsProduct } from '@/apis/types/savingsProducts.types';
import { useSavingsCalculatorStore } from '@/store/savingsCalculator';

const calculateExpectedProfit = (monthlyAmount: number, period: number, annualRate: number) => {
  return monthlyAmount * period * (1 + annualRate * 0.5);
};

const calculateSavingsGap = (targetAmount: number, expectedProfit: number) => {
  return targetAmount - expectedProfit;
};

const calculateSavingsMonthlyDeposit = (targetAmount: number, period: number, annualRate: number) => {
  return targetAmount / (period * (1 + annualRate * 0.5));
};

interface Props {
  products: SavingsProduct[];
  selectedProductId: string;
}

const SavingsSummary = ({ products, selectedProductId }: Props) => {
  const { amount, monthly } = useSavingsCalculatorStore();
  const selectedProduct = products.find(product => product.id === selectedProductId);

  if (!selectedProduct) {
    return <ListRow contents={<ListRow.Texts type="1RowTypeA" top="상품을 선택해주세요." />} />;
  }

  const 예상_수익_금액 = calculateExpectedProfit(monthly, selectedProduct.availableTerms, selectedProduct.annualRate);
  const 목표_금액과의_차이 = calculateSavingsGap(amount, 예상_수익_금액);
  const 추천_월_납입_금액 = calculateSavingsMonthlyDeposit(
    amount,
    selectedProduct.availableTerms,
    selectedProduct.annualRate
  );

  return (
    <>
      <Spacing size={8} />

      <ListRow
        contents={
          <ListRow.Texts
            type="2RowTypeA"
            top="예상 수익 금액"
            topProps={{ color: colors.grey600 }}
            bottom={`${formatNumber(예상_수익_금액)}원`}
            bottomProps={{ fontWeight: 'bold', color: colors.blue600 }}
          />
        }
      />
      <ListRow
        contents={
          <ListRow.Texts
            type="2RowTypeA"
            top="목표 금액과의 차이"
            topProps={{ color: colors.grey600 }}
            bottom={`${formatNumber(목표_금액과의_차이)}원`}
            bottomProps={{ fontWeight: 'bold', color: colors.blue600 }}
          />
        }
      />
      <ListRow
        contents={
          <ListRow.Texts
            type="2RowTypeA"
            top="추천 월 납입 금액"
            topProps={{ color: colors.grey600 }}
            bottom={`${formatNumber(추천_월_납입_금액)}원`}
            bottomProps={{ fontWeight: 'bold', color: colors.blue600 }}
          />
        }
      />
    </>
  );
};

export default SavingsSummary;
