const NumberFormat = Intl.NumberFormat('ko-KR');

export const formatNumber = (value: number) => NumberFormat.format(value);
