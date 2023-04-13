import Table, { ColumnsType } from "antd/es/table";

const columns: ColumnsType<any> = [
  {
    title: "Month",
    dataIndex: "month",
    key: "month",
    render: (value) => `Month ${value}`,
  },
  {
    title: "Monthly Payment",
    dataIndex: "monthlyPayment",
    key: "monthlyPayment",
    render: (value) => `${value}$`,
  },
  {
    title: "Interest Payment",
    dataIndex: "interestPayment",
    key: "interestPayment",
    render: (value) => `${value}$`,
  },
  {
    title: "Principal payment",
    dataIndex: "principalPayment",
    key: "principalPayment",
    render: (value) => `${value}$`,
  },
];

interface Props {
  data: any;
}

export const PaymentsTable: React.FC<Props> = ({ data }) => {
  return <Table dataSource={data} columns={columns} />;
};
