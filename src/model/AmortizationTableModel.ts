export interface AmortizationRowData {
  key: number;
  month: number;
  monthlyPayment: number;
  interestPayment: number;
  principalPayment: number;
}

type AmortizationRowDataKey = keyof AmortizationRowData;

export const AmortizationTableColumnKey: { [P in AmortizationRowDataKey]: P } =
  {
    key: "key",
    interestPayment: "interestPayment",
    month: "month",
    monthlyPayment: "monthlyPayment",
    principalPayment: "principalPayment",
  };
