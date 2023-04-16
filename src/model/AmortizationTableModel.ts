export interface AmortizationRowData {
  key: number;
  month: number;
  totalMonthlyPayment: number;
  interestPayment: number;
  principalPayment: number;
  monthlyMortgagePayment: number;
}

type AmortizationRowDataKey = keyof AmortizationRowData;

export const AmortizationTableColumnKey: { [P in AmortizationRowDataKey]: P } =
  {
    key: "key",
    interestPayment: "interestPayment",
    month: "month",
    totalMonthlyPayment: "totalMonthlyPayment",
    monthlyMortgagePayment: "monthlyMortgagePayment",
    principalPayment: "principalPayment",
  };
