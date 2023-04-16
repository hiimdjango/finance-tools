export interface MortgageForm {
  principal?: number;
  interestRatePercentage?: number;
  term?: number;
  downPayment?: number;
  resellAfter?: number;
  resellPrice?: number;
  co_fees?: number;
  taxes?: number;
}

type MortgageFormKey = keyof MortgageForm;

export const MortgageFormItem: { [P in MortgageFormKey]: P } = {
  principal: "principal",
  interestRatePercentage: "interestRatePercentage",
  term: "term",
  downPayment: "downPayment",
  resellAfter: "resellAfter",
  resellPrice: "resellPrice",
  co_fees: "co_fees",
  taxes: "taxes",
};
