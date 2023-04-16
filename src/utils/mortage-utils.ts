export const getDueAmount = (principal?: number, downPayment?: number) => {
  if (!principal) return 0;
  if (!downPayment) return principal;
  return principal - downPayment;
};

export const getMonthlyPayment = (
  paymentsPerYear: number,
  due?: number,
  interestRate?: number,
  termInYears?: number
) => {
  if (!due || !interestRate || !termInYears) return 0;
  const i = interestRate / paymentsPerYear;
  const n = termInYears * paymentsPerYear;

  return due * ((i * (1 + i) ** n) / ((1 + i) ** n - 1));
};
