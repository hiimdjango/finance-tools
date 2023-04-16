import { Card, Col, Row, Typography } from "antd";
import { moneyFormat } from "../../utils";

interface Props {
  principal?: number;
  totalPayment: number;
  duration?: number;
  resellPrice?: number;
  totalInterest: number;
  totalPrincipalPaid: number;
  due: number;
}

export const Breakdown: React.FC<Props> = ({
  duration,
  totalInterest,
  totalPrincipalPaid,
  principal,
  resellPrice,
  totalPayment,
  due,
}) => {
  return (
    <Row gutter={[16, 16]}>
      <BreakdownCard
        title={`Total Paid over ${duration} years`}
        value={totalPayment}
      />
      <BreakdownCard title="Total Interest Paid" value={totalInterest} />
      <BreakdownCard title="Total Principal Paid" value={totalPrincipalPaid} />
      {Boolean(resellPrice && principal) && (
        <BreakdownCard
          title="Total Gain/Loss"
          value={resellPrice! - principal! - totalInterest}
        />
      )}
      {Boolean(resellPrice && principal && duration) && (
        <BreakdownCard
          title="Monthly Gain/Loss "
          value={(resellPrice! - principal! - totalInterest) / (12 * duration!)}
        />
      )}
      {Boolean(duration && resellPrice) && (
        <BreakdownCard title="Due at sell" value={due} />
      )}
      {Boolean(resellPrice && due) && (
        <BreakdownCard title="Cashout" value={resellPrice! - due} />
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
