import { useState, useEffect } from 'react';
import { TextField, Spacing, SelectBottomSheet } from 'tosslib';
import { useSavingsCalculatorStore } from '@/store/savingsCalculator';
import { formatNumber } from '@/utils/fomatter';

const SavingsCalculatorForm = () => {
  const { amount, monthly, period, setAmount, setMonthly, setPeriod } = useSavingsCalculatorStore();

  return (
    <>
      <TextField
        label="목표 금액"
        placeholder="목표 금액을 입력하세요"
        suffix="원"
        value={amount ? formatNumber(amount) : null}
        onChange={e => {
          setAmount(Number(e.target.value.replace(/[^0-9]/g, '')));
        }}
      />
      <Spacing size={16} />
      <TextField
        label="월 납입액"
        placeholder="희망 월 납입액을 입력하세요"
        suffix="원"
        value={monthly ? formatNumber(monthly) : null}
        onChange={e => {
          setMonthly(Number(e.target.value.replace(/[^0-9]/g, '')));
        }}
      />
      <Spacing size={16} />
      <SelectBottomSheet
        label="저축 기간"
        title="저축 기간을 선택해주세요"
        value={period}
        onChange={value => {
          setPeriod(value);
        }}
      >
        <SelectBottomSheet.Option value={6}>6개월</SelectBottomSheet.Option>
        <SelectBottomSheet.Option value={12}>12개월</SelectBottomSheet.Option>
        <SelectBottomSheet.Option value={24}>24개월</SelectBottomSheet.Option>
      </SelectBottomSheet>
    </>
  );
};

export default SavingsCalculatorForm;
