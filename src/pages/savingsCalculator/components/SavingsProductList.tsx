import { Assets, ListRow, colors } from 'tosslib';
import useSavingsProducts from '../hooks/useSavingsProducts';

const SavingsProductList = () => {
  const { data } = useSavingsProducts();
  const products = data; // reduce 예정

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
