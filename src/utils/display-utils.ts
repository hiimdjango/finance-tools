export const moneyFormat = (value?: number) => {
  if (!value) return "";
  const dollarFormat = Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  return dollarFormat.format(value);
};
