import { Card, Col, Row, Typography } from "antd";
import { moneyFormat } from "../../utils";

interface Props {
  principal?: number;
  totalPayment: number;
  totalMortgagePayment?: number;
  duration?: number;
  resellPrice?: number;
  totalInterest: number;
  totalPrincipalPaid: number;
  due: number;
  totalTaxes?: number;
  totalCoFees?: number;
}

export const Breakdown: React.FC<Props> = ({
  duration,
  totalInterest,
  totalPrincipalPaid,
  principal,
  resellPrice,
  totalPayment,
  due,
  totalCoFees,
  totalTaxes,
  totalMortgagePayment,
}) => {
  return (
    <Row gutter={[16, 16]}>
      <BreakdownCard
        title={`Total Paid over ${duration} years`}
        value={totalPayment}
      />
      <BreakdownCard
        title={`Total Mortgage payment`}
        value={totalMortgagePayment || 0}
      />
      <BreakdownCard title="Total Interest Paid" value={totalInterest} />
      <BreakdownCard title="Total Principal Paid" value={totalPrincipalPaid} />
      {Boolean(resellPrice && principal) && (
        <BreakdownCard
          title="Total Gain/Loss"
          value={
            resellPrice! -
            principal! -
            totalInterest -
            (totalCoFees || 0) -
            (totalTaxes || 0)
          }
        />
      )}
      {Boolean(resellPrice && principal && duration) && (
        <BreakdownCard
          title="Monthly Gain/Loss "
          value={
            (resellPrice! -
              principal! -
              totalInterest -
              (totalCoFees || 0) -
              (totalTaxes || 0)) /
            (12 * duration!)
          }
        />
      )}
      {Boolean(duration && resellPrice) && (
        <BreakdownCard title="Due at sell" value={due} />
      )}
      {Boolean(resellPrice && due) && (
        <BreakdownCard title="Cashout" value={resellPrice! - due} />
      )}
      {Boolean(totalCoFees) && (
        <BreakdownCard title="Total Co-fees" value={totalCoFees!} />
      )}
      {Boolean(totalTaxes) && (
        <BreakdownCard title="Total Taxes" value={totalTaxes!} />
      )}
    </Row>
  );
};

const BreakdownCard = ({ title, value }: { title: string; value: number }) => (
  <Col>
    <Card
      title={
        <Typography.Title style={{ margin: 0 }} level={5}>
          {title}
        </Typography.Title>
      }
    >
      {moneyFormat(value)}
    </Card>
  </Col>
);
