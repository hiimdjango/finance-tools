import {
  AmortizationTable,
  Breakdown,
  MortgageForm,
  createAmortizationTableRow,
} from "../screen-components";
import { getDueAmount, getMonthlyInterest, getMonthlyPayment } from "../utils";
import { useMortgageFormContext } from "../state";
import { Col, Collapse, Row, Typography } from "antd";

export const MortgageScreen: React.FC = () => {
  const { formValues } = useMortgageFormContext();
  const {
    downPayment,
    interestRatePercentage,
    principal,
    resellAfter,
    resellPrice,
    term,
    co_fees,
    taxes,
  } = formValues;

  const interestRate = interestRatePercentage && interestRatePercentage / 100;

  const n = 12; // Number of payments per year

  const duration = resellAfter
    ? resellAfter * 12
    : term
    ? term * 12
    : undefined;

  let due = getDueAmount(principal, downPayment);
  let totalInterest = 0;
  let totalMortgagePayment = 0;
  let totalPayment = 0;
  let totalPrincipalPaid = 0;
  let totalCoFees = 0;
  let totalTaxes = 0;

  const data = [];

  const monthlyPayment = getMonthlyPayment(n, due, interestRate, term);

  if (duration && interestRate) {
    for (let i = 1; i <= duration; i++) {
      const interestPayment = getMonthlyInterest(n, due, interestRate);
      totalInterest += interestPayment;
      const principalPayment = monthlyPayment - interestPayment;
      totalPrincipalPaid += principalPayment;

      totalCoFees += co_fees || 0;

      const taxPayment = taxes ? taxes / n : 0;
      totalTaxes += taxPayment;

      totalMortgagePayment += monthlyPayment;

      const totalMonthlyPayment = monthlyPayment + (co_fees || 0) + taxPayment;
      totalPayment += totalMonthlyPayment;

      data.push(
        createAmortizationTableRow(
          i,
          totalMonthlyPayment,
          monthlyPayment,
          interestPayment,
          principalPayment
        )
      );

      due -= principalPayment;
    }
  }

  const displayBreakdown = Boolean(principal && interestRate && term);

  return (
    <Row gutter={[24, 24]}>
      <Col span={24}>
        <MortgageForm />
      </Col>
      {displayBreakdown && (
        <Col span={24}>
          <Breakdown
            due={due}
            totalInterest={totalInterest}
            principal={principal}
            duration={resellAfter || term}
            totalMortgagePayment={totalMortgagePayment}
            totalPrincipalPaid={totalPrincipalPaid}
            resellPrice={resellPrice}
            totalTaxes={totalTaxes}
            totalCoFees={totalCoFees}
            totalPayment={totalPayment}
          />
        </Col>
      )}
      <Col span={24}>
        <Collapse>
          <Collapse.Panel
            header={
              <Typography.Title style={{ margin: 0 }} level={5}>
                Amortization Table
              </Typography.Title>
            }
            key="amortization-table"
          >
            <AmortizationTable data={data} />
          </Collapse.Panel>
        </Collapse>
      </Col>
    </Row>
  );
};
