import { useState } from "react";
import "./App.css";
import { Form, Input } from "antd";
import FormItem from "antd/es/form/FormItem";
import { PaymentsTable } from "./components";

const roundNumber = (x: number) => Math.round(x * 100) / 100;

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

function App() {
  const [principal, setPrincipal] = useState<number | null>(null);
  const [interestRatePercentage, setInterestRatePercentage] = useState<
    number | null
  >(null);
  const interestRate = interestRatePercentage
    ? interestRatePercentage / 100
    : 0;
  const [term, setTerm] = useState<number | null>(null);
  const n = 12;
  let due = principal;

  const duration = term ? term * 12 : null;

  let year = 1;

  const data = [];

  const interestPayment =
    principal && interestRate ? (principal * interestRate) / n : null;
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

  return (
    <div className="App" style={{ padding: 24 }}>
      <Form>
        <FormItem label="Principal">
          <Input
            type="number"
            value={principal || ""}
            placeholder="Principal"
            onChange={(e) => setPrincipal(Number(e.target.value))}
          />
        </FormItem>
        <FormItem label="Interest Rate %">
          <Input
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
        <PaymentsTable data={data} />
      </Form>
    </div>
  );
}

export default App;
