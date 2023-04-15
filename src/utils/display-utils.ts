export const moneyFormat = (value?: number) => {
  if (!value) return "";
  const dollarFormat = Intl.NumberFormat("en-US");
  return dollarFormat.format(value);
};
