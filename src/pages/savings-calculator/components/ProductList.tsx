import { css } from '@emotion/react';
import { ListRow, Assets, colors } from 'tosslib';
import { useSuspenseQuery } from '@tanstack/react-query';
import { getSavingsProductsQueryOptions } from '../queries/savings-products';
import { useSelectedProductId } from '../hooks/use-selected-product-id';
import { FilterSavingsProduct, OrderBySavingsProduct } from '../domain/savings-product';

interface ProductListProps {
  filters?: FilterSavingsProduct[];
  orderBy?: OrderBySavingsProduct;
  limit?: number;
}

export function ProductList({ filters, orderBy, limit }: ProductListProps) {
  // useSuspenseQuery를 왜 쓴거냐?
  // isLoading, isPending, isError 그리고 빠뜨릴때도 많음 이런 상태로 early return 하는게 지저분하고 옵셔널 체이닝이 붙어서 (data?.이렇게) 조건문을 보다가 지치기도함
  // 밖에서 처리하고 ProductList에 접근했을 때 개발자가 원하는 바를 바로 볼 수 있다.
  const { data } = useSuspenseQuery(getSavingsProductsQueryOptions({ filters, orderBy, limit }));

  if (data.length === 0) {
    return <ListRow contents={<ListRow.Texts type="1RowTypeA" top="조건에 맞는 상품이 없습니다." />} />;
  }

  return (
    <>
      {data.map(product => (
        <ProductList.Item
          key={product.id}
          id={product.id}
          top={product.name}
          middle={`연 이자율: ${product.annualRate}%`}
          bottom={`${product.minMonthlyAmount.toLocaleString()}원 ~ ${product.maxMonthlyAmount.toLocaleString()}원 | ${product.availableTerms}개월`}
        />
      ))}
    </>
  );
}

ProductList.Item = function Item({
  id,
  top,
  middle,
  bottom,
}: {
  id: string;
  top: string;
  middle: string;
  bottom: string;
}) {
  const [selectedProductId, setSelectedProductId] = useSelectedProductId();

  return (
    <button key={id} css={resetButtonStyle} onClick={() => setSelectedProductId(id)}>
      <ListRow
        contents={
          <ListRow.Texts
            type="3RowTypeA"
            top={top}
            topProps={{ fontSize: 16, fontWeight: 'bold', color: colors.grey900 }}
            middle={middle}
            middleProps={{ fontSize: 14, color: colors.blue600, fontWeight: 'medium' }}
            bottom={bottom}
            bottomProps={{ fontSize: 13, color: colors.grey600 }}
          />
        }
        right={selectedProductId === id ? <Assets.Icon name="icon-check-circle-green" /> : undefined}
      />
    </button>
  );
};

const resetButtonStyle = css({
  background: 'none',
  border: 'none',
  padding: 0,
  margin: 0,
  font: 'inherit',
  width: '100%',
  boxShadow: 'none',
  borderRadius: 0,
  overflow: 'visible',
  cursor: 'pointer',
});

// 어찌됐든 이 Loading은 추상화하지 않아도되긴하는데, ProductList와 강하게 결합되어있을 수 밖에 없기 때문에 이렇게 정리한 것
ProductList.Loading = function Loading() {
  return <ListRow contents={<ListRow.Texts type="1RowTypeA" top="상품을 불러오는 중..." />} />;
};
