export interface MortgageForm {
  principal?: number;
  interestRatePercentage?: number;
  term?: number;
  downPayment?: number;
  resellAfter?: number;
  resellPrice?: number;
}

type MortgageFormKey = keyof MortgageForm;

export const MortgageFormItem: { [P in MortgageFormKey]: P } = {
  principal: "principal",
  interestRatePercentage: "interestRatePercentage",
  term: "term",
  downPayment: "downPayment",
  resellAfter: "resellAfter",
  resellPrice: "resellPrice",
};
