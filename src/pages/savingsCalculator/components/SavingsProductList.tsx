import { Assets, ListRow, colors } from 'tosslib';
import { useSavingsCalculatorStore } from '@/store/savingsCalculator';
import { SavingsProduct } from '@/apis/types/savingsProducts.types';
import { formatNumber } from '@/utils/fomatter';

interface Props {
  products: SavingsProduct[];
  selectedProductId: string;
  onClickProduct: (productId: string) => void;
}

const SavingsProductList = ({ products, selectedProductId, onClickProduct }: Props) => {
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
