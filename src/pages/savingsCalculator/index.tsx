import { Border, NavigationBar, Spacing } from 'tosslib';
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
    </>
  );
}
