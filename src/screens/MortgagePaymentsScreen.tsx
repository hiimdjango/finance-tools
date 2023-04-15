import { Form, Input, Row, Col, Typography } from "antd";
import FormItem from "antd/es/form/FormItem";
import { useState } from "react";
import { PaymentsTable } from "../components";
import {
  getDueAmount,
  getDownPaymentAmount,
  moneyFormat,
  roundNumber,
} from "../utils";

interface Props {}

const generateRow = (
  monthNumber: number,
  monthlyPayment: number,
  interestPayment: number,
  principalPayment: number
) => ({
  key: monthNumber,
  month: roundNumber(monthNumber),
  monthlyPayment: roundNumber(monthlyPayment),
  interestPayment: roundNumber(interestPayment),
  principalPayment: roundNumber(principalPayment),
});

export const MortgagePaymentsScreen: React.FC<Props> = () => {
  const [principal, setPrincipal] = useState<number | undefined>();

  const [downPaymentPercentage, setDownpaymentPercentage] = useState<
    number | undefined
  >(undefined);

  const [pmiPercentage, setPmiPercentage] = useState<number | undefined>(
    undefined
  );
  //   const pmi = pmiPercentage ? pmiPercentage / 100 : 0;

  const [interestRatePercentage, setInterestRatePercentage] = useState<
    number | undefined
  >();
  const interestRate = interestRatePercentage
    ? interestRatePercentage / 100
    : 0;

  const [term, setTerm] = useState<number | undefined>();

  const n = 12;

  let due = getDueAmount(principal, downPaymentPercentage);

  const duration = term ? term * 12 : null;

  let year = 1;

  const data = [];

  const interestPayment = due && interestRate ? (due * interestRate) / n : null;
  const monthlyPayment =
    interestPayment && interestRate && term
      ? interestPayment / (1 - (1 + interestRate / n) ** -(n * term))
      : null;

  if (duration && due && interestPayment && monthlyPayment && interestRate) {
    for (let i = 1; i <= duration; i++) {
      if (i % 12 === 0) {
        year = year + 1;
      }
      const interestPayment = (due * interestRate) / n;
      const principalPayment = monthlyPayment - interestPayment;
      data.push(
        generateRow(i, monthlyPayment, interestPayment, principalPayment)
      );
      due -= principalPayment;
    }
  }

  const downPaymentAmount = getDownPaymentAmount(
    principal,
    downPaymentPercentage
  );

  const costDisplayValue = moneyFormat(principal || 0);

  return (
    <>
      <Form>
        <FormItem label="Cost">
          <Input
            addonAfter="$"
            value={principal ? costDisplayValue : ""}
            placeholder="Real estate cost"
            onChange={(e) => {
              const value = e.target.value.replaceAll(",", "");
              setPrincipal(Number(value));
            }}
          />
        </FormItem>
        <FormItem label="Interest Rate %">
          <Input
            addonAfter="%"
            type="number"
            value={interestRatePercentage || ""}
            placeholder="Interest rate"
            onChange={(e) => {
              setInterestRatePercentage(Number(e.target.value));
            }}
          />
        </FormItem>
        <FormItem label="Term (years)">
          <Input
            type="number"
            value={term || ""}
            placeholder="Term"
            onChange={(e) => setTerm(Number(e.target.value))}
          />
        </FormItem>
        <FormItem label="Down payment %">
          <Row gutter={16} align="middle" wrap={false}>
            <Col flex="1">
              <Input
                addonAfter="%"
                type="number"
                value={downPaymentPercentage || ""}
                placeholder="Down payment"
                onChange={(e) =>
                  setDownpaymentPercentage(Number(e.target.value))
                }
              />
            </Col>
            <Col>
              {Boolean(downPaymentPercentage) && (
                <Typography.Text>
                  {moneyFormat(downPaymentAmount)}$
                </Typography.Text>
              )}
            </Col>
          </Row>
        </FormItem>
        <FormItem label="PMI">
          <Input
            addonAfter="%"
            type="number"
            value={pmiPercentage || ""}
            placeholder="PMI"
            onChange={(e) => {
              setPmiPercentage(Number(e.target.value));
            }}
          />
        </FormItem>
      </Form>
      <PaymentsTable data={data} />
    </>
  );
};
