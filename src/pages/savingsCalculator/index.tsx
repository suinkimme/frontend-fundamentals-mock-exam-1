import { useState, useEffect } from 'react';
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
  http,
} from 'tosslib';
import SavingsCalculatorForm from './components/SavingsCalculatorForm';
import SavingsCalculatorTabs from './components/SavingsCalculatorTabs';

export function SavingsCalculatorPage() {
  return (
    <>
      <NavigationBar title="적금 계산기" />

      <Spacing size={16} />

      <SavingsCalculatorForm />
      {/* 생각해보니까 여기에 버튼이 없어서 Form이라고 보기에는 좀 어려움이 있지 않을까 싶기도 함 */}

      <Spacing size={24} />
      <Border height={16} />
      <Spacing size={8} />

      <SavingsCalculatorTabs />

      {/* 아래는 사용자가 적금 상품을 선택하지 않고 계산 결과 탭을 선택했을 때 출력해주세요. */}
      {/* <ListRow contents={<ListRow.Texts type="1RowTypeA" top="상품을 선택해주세요." />} /> */}
    </>
  );
}
