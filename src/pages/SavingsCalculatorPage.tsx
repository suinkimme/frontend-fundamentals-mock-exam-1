import { Suspense, useState, type ComponentProps } from 'react';
import { useQueryState, parseAsStringEnum } from 'nuqs';
import { match } from 'ts-pattern';
import {
  Assets,
  Border,
  colors,
  ListHeader,
  ListRow,
  NavigationBar,
  SelectBottomSheet,
  Spacing,
  Tab,
  TextField,
} from 'tosslib';
import { AmountInput } from '../components/amount-input';
import { useSavingsStates } from './savings-calculator/hooks/use-savings-states';
import { ProductList } from './savings-calculator/components/ProductList';
import {
  filterByMonthlyAmount,
  filterBySavingsTerms,
  orderByAnnualRate,
} from './savings-calculator/domain/savings-product';
import { CalculationResult } from './savings-calculator/components/CalculationResult';

const View = {
  products: 'products',
  results: 'results',
};

type View = (typeof View)[keyof typeof View];

function useView() {
  return useQueryState('view', parseAsStringEnum(Object.values(View)).withDefault(View.products));
}

export function SavingsCalculatorPage() {
  const [view, setView] = useView();

  const [{ goalAmount, monthlyAmount, savingsTerms }, setSavingsParams] = useSavingsStates();

  return (
    <>
      {/* 이런 요소들이 이 페이지의 랜드마크가 되는거다. */}
      {/* 조금 더 1:1 매칭되는 형태가될 수 있고, toss fundamentals에 시점 이동과 관련된 내용이다. */}
      <NavigationBar title="적금 계산기" />

      <Spacing size={16} />

      <AmountInput
        label="목표 금액"
        placeholder="목표 금액을 입력하세요"
        value={goalAmount}
        onChange={value => setSavingsParams({ goalAmount: value })}
      />
      <Spacing size={16} />
      <AmountInput
        label="월 납입액"
        placeholder="희망 월 납입액을 입력하세요"
        value={monthlyAmount}
        onChange={value => setSavingsParams({ monthlyAmount: value })}
      />
      <Spacing size={16} />
      <SavingsTermsSelect
        label="저축 기간"
        value={savingsTerms}
        onChange={value => setSavingsParams({ savingsTerms: value })}
      />

      <Spacing size={24} />
      <Border height={16} />
      <Spacing size={8} />

      <Tab onChange={setView}>
        <Tab.Item value={View.products} selected={view === View.products}>
          적금 상품
        </Tab.Item>
        <Tab.Item value={View.results} selected={view === View.results}>
          계산 결과
        </Tab.Item>
      </Tab>

      {match(view)
        .with(View.products, () => (
          <Suspense fallback={<ProductList.Loading />}>
            {/* props가 열리면서 스스로 값을 참조할 수 있는 형태로 바뀌었음 */}
            {/* ProductList가 중복되는데 출력을 어떻게하는지가 토스 평가 기준이었음 */}
            {/* 어떻게하면 ProductList를 재사용할 수 있을까? 고민했어야함 */}
            {/* filters에 배열과 함수를 넣는게 킥임 -> 로직이 여러개 들어갈 수 있으니까 */}
            <ProductList
              filters={[x => filterByMonthlyAmount(x, monthlyAmount), x => filterBySavingsTerms(x, savingsTerms)]}
            />
          </Suspense>
        ))
        .with(View.results, () => (
          <>
            <Spacing size={8} />
            <CalculationResult />
            <Spacing size={8} />
            <Border height={16} />
            <Spacing size={8} />
            <ListHeader
              title={<ListHeader.TitleParagraph fontWeight="bold">추천 상품 목록</ListHeader.TitleParagraph>}
            />
            <Spacing size={12} />
            <Suspense fallback={<ProductList.Loading />}>
              <ProductList
                filters={[x => filterByMonthlyAmount(x, monthlyAmount), x => filterBySavingsTerms(x, savingsTerms)]}
                orderBy={orderByAnnualRate(true)}
                limit={2}
              />
            </Suspense>
            <Spacing size={40} />
          </>
        ))
        .exhaustive()}
    </>
  );
}

interface SelectSavingsTermsInputProps
  extends Omit<ComponentProps<typeof SelectBottomSheet>, 'title' | 'onChange' | 'children'> {
  value?: number | null;
  onChange?: (value: number) => void;
}

// bottomSheet임을 굳이 이름에 나타낼 필요는 없었음 1:1 매칭되는 구현으로는 중요하지 않기 때문이다.
// title도 꺼낼 필요가 없다. 페이지 입장에선 보이지도 않는다.
function SavingsTermsSelect({ value, onChange, ...props }: SelectSavingsTermsInputProps) {
  return (
    <SelectBottomSheet title="저축 기간을 선택해주세요" value={value ?? undefined} onChange={onChange} {...props}>
      <SelectBottomSheet.Option value={6}>6개월</SelectBottomSheet.Option>
      <SelectBottomSheet.Option value={12}>12개월</SelectBottomSheet.Option>
      <SelectBottomSheet.Option value={24}>24개월</SelectBottomSheet.Option>
    </SelectBottomSheet>
  );
}
