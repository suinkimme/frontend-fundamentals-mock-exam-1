import { useSuspenseQuery } from '@tanstack/react-query';
import { Suspense } from 'react';
import { colors, ListRow } from 'tosslib';
import {
  filterByProductId,
  calculateExpectedProfit,
  calculateDifference,
  calculateMonthlyAmount,
} from '../domain/savings-product';
import { useSavingsStates } from '../hooks/use-savings-states';
import { useSelectedProductId } from '../hooks/use-selected-product-id';
import { getSavingsProductsQueryOptions } from '../queries/savings-products';

export function CalculationResult() {
  const [selectedProductId] = useSelectedProductId();

  if (selectedProductId == null) {
    return <ListRow contents={<ListRow.Texts type="1RowTypeA" top="상품을 선택해주세요." />} />;
  }

  return (
    <Suspense fallback={<ListRow contents={<ListRow.Texts type="1RowTypeA" top="상품을 불러오는 중..." />} />}>
      <CalculationResult.Contents />
    </Suspense>
  );
}

CalculationResult.Contents = function Contents() {
  const [{ goalAmount, monthlyAmount }] = useSavingsStates();

  const [selectedProductId] = useSelectedProductId();
  const { data } = useSuspenseQuery(
    getSavingsProductsQueryOptions({ filters: [x => filterByProductId(x, selectedProductId)] })
  );
  const savingsProduct = data[0];

  if (savingsProduct == null) {
    return <ListRow contents={<ListRow.Texts type="1RowTypeA" top="상품을 선택해주세요." />} />;
  }

  if (goalAmount == null) {
    return <ListRow contents={<ListRow.Texts type="1RowTypeA" top="목표 금액을 입력해주세요." />} />;
  }

  return (
    <>
      <ListRow
        contents={
          <ListRow.Texts
            type="2RowTypeA"
            top="예상 수익 금액"
            topProps={{ color: colors.grey600 }}
            bottom={`${calculateExpectedProfit(savingsProduct, monthlyAmount).toLocaleString()}원`}
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
            bottom={`${calculateDifference(savingsProduct, goalAmount, calculateExpectedProfit(savingsProduct, monthlyAmount)).toLocaleString()}원`}
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
            bottom={`${(Math.round(calculateMonthlyAmount(savingsProduct, goalAmount) / 1000) * 1000).toLocaleString()}원`}
            bottomProps={{ fontWeight: 'bold', color: colors.blue600 }}
          />
        }
      />
    </>
  );
};
