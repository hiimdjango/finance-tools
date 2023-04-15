export const getDueAmount = (
  principal?: number,
  downPaymentPercentage?: number
) => {
  if (!principal) return 0;
  if (!downPaymentPercentage) return principal;
  return principal - getDownPaymentAmount(principal, downPaymentPercentage);
};

export const getDownPaymentAmount = (
  principal?: number,
  downPaymentPercentage?: number
) => {
  if (!principal || !downPaymentPercentage) return 0;
  return (principal * downPaymentPercentage) / 100;
};
