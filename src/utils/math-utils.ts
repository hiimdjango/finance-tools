/**
 *
 * @param principal Principal deposit
 * @param yearlyInterestRate Yearly interest rate in decimal format (APY)
 * @param n number of times interest is compounded in a year
 * @param duration duration
 * @returns
 */
export const getCompoundInterest = (
  principal: number,
  yearlyInterestRate: number,
  n: number,
  duration: number
) => {
  return principal * (1 + yearlyInterestRate / n) ** (n * duration) - principal;
};

export const roundNumber = (x: number) => Math.round(x * 100) / 100;
