import { TextField } from 'tosslib';

export interface AmountInputProps extends Omit<ComponentPros<typeof TextField>, 'value', 'onChange'> {
  value?: number | null;
  onChange: (value: number) => void;
}

// props의 value가 number여야 사람으 실수를 줄일 수 있다.
// 그래서 Number(value) 이런 코드는 Number를 빼먹었을 때 에러가 발생하기 때문에 -> NaN이 들어간다던가 에러가 발생할 수 있음
// AmountInput을 만들어서 관리하는 컴포넌트를 새로 만든거다.
// 이 안에서 display되는 값을 관리하는거다.
// Amount는 Number니까 Amount인데 타입이 string이면 이상하지 않냐
// 일반적인 인터페이스를 디자인하는게 중요하다.
// 인풋다운 인풋을 만들어야한다.
// value가 아니라 goalAmount이런 이름이면 개처망하는거임
export function AmountInput({ value, onChange, ...props }: AmountInputProps) {
  return (
    <TextField
      suffix="원"
      value={value?.toLocaleString() ?? ''}
      onChange={e => onChange(Number(e.target.value.replace(/[^0-9]/g, '')))}
      {...props}
    />
  );
}
