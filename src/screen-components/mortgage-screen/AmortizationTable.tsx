import Table, { ColumnsType } from "antd/es/table";
import { roundNumber } from "../../utils";
import { AmortizationRowData, AmortizationTableColumnKey } from "../../model";

const columns: ColumnsType<AmortizationRowData> = [
  {
    title: "Month",
    dataIndex: AmortizationTableColumnKey.month,
    key: "month",
    render: (value) => `Month ${value}`,
  },
  {
    title: "Monthly Payment",
    dataIndex: AmortizationTableColumnKey.totalMonthlyPayment,
    key: "monthlyPayment",
    render: (value) => `${value}$`,
  },
  {
    title: "Monthly Mortgage Payment",
    dataIndex: AmortizationTableColumnKey.monthlyMortgagePayment,
    key: "monthlyPayment",
    render: (value) => `${value}$`,
  },
  {
    title: "Interest Payment",
    dataIndex: AmortizationTableColumnKey.interestPayment,
    key: "interestPayment",
    render: (value) => `${value}$`,
  },
  {
    title: "Principal payment",
    dataIndex: AmortizationTableColumnKey.principalPayment,
    key: "principalPayment",
    render: (value) => `${value}$`,
  },
];

export const createAmortizationTableRow = (
  monthNumber: number,
  totalMonthlyPayment: number,
  monthlyMortgagePayment: number,
  interestPayment: number,
  principalPayment: number
): AmortizationRowData => ({
  key: monthNumber,
  month: roundNumber(monthNumber),
  totalMonthlyPayment: roundNumber(totalMonthlyPayment),
  monthlyMortgagePayment: roundNumber(monthlyMortgagePayment),
  interestPayment: roundNumber(interestPayment),
  principalPayment: roundNumber(principalPayment),
});

interface Props {
  data: AmortizationRowData[];
}

export const AmortizationTable: React.FC<Props> = ({ data }) => {
  return (
    <>
      <Table dataSource={data} columns={columns} />
    </>
  );
};
