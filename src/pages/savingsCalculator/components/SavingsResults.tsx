import { Spacing, ListRow, Border, ListHeader, colors, Assets } from 'tosslib';
import { formatNumber } from '@/utils/fomatter';
import { SavingsProduct } from '@/apis/types/savingsProducts.types';
import { useSavingsCalculatorStore } from '@/store/savingsCalculator';
import SavingsSummary from './SavingsSummary';

interface Props {
  products: SavingsProduct[];
  selectedProductId: string;
  onClickProduct: (productId: string) => void;
}

const SavingsResults = ({ products, selectedProductId, onClickProduct }: Props) => {
  const sortedProducts = products.sort((a, b) => b.annualRate - a.annualRate);

  return (
    <>
      <Spacing size={8} />

      <SavingsSummary products={products} selectedProductId={selectedProductId} />

      <Spacing size={8} />
      <Border height={16} />
      <Spacing size={8} />

      <ListHeader title={<ListHeader.TitleParagraph fontWeight="bold">추천 상품 목록</ListHeader.TitleParagraph>} />
      <Spacing size={12} />

      {sortedProducts.slice(0, 2).map((product, index) => (
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

      <Spacing size={40} />
    </>
  );
};

export default SavingsResults;
