import styled from "styled-components";
import { getCompoundInterest } from "../utils";
import { useState } from "react";
import { Form, Input, Typography } from "antd";
import FormItem from "antd/es/form/FormItem";

interface Props {}

const usDollar = Intl.NumberFormat("us-US");

export const CompoundInterestScreen: React.FC<Props> = () => {
  const [contribution, setContribution] = useState<number | undefined>();
  const [deposit, setDeposit] = useState<number | undefined>();
  const [contributionDuration, setContributionDuration] = useState<
    number | undefined
  >();
  const [duration, setDuration] = useState<number | undefined>();
  const [interestRatePercentage, setInterestRatePercentage] = useState<
    number | undefined
  >();

  let investedMoney = 0;
  let totalBenef = 0;
  let sum = 0;

  if (duration && contributionDuration && contribution) {
    const rate = interestRatePercentage ? interestRatePercentage / 100 : 0;
    for (let i = 1; i < duration * 12 + 1; i++) {
      if (i === 1) {
        investedMoney += deposit || 0;
        sum += deposit || 0;
      }
      const compoundInterest = getCompoundInterest(sum, rate, 1, 1 / 12);
      totalBenef += compoundInterest;
      sum += compoundInterest;
      if (i < contributionDuration * 12 + 1) {
        investedMoney = investedMoney + contribution;
        sum += contribution;
      }
    }
  }
  return (
    <StyledCompoundInterestScreen>
      <Form>
        <FormItem label="Monthly contribution">
          <Input
            addonAfter="$"
            type="number"
            placeholder="Monthly contribution"
            onChange={(e) => handleChangeNumericValue(e, setContribution)}
          />
        </FormItem>
        <FormItem label="Initial deposit">
          <Input
            addonAfter="$"
            type="number"
            placeholder="Initial deposit"
            onChange={(e) => handleChangeNumericValue(e, setDeposit)}
          />
        </FormItem>
        <FormItem label="Contribution duration (years)">
          <Input
            addonAfter="Years"
            type="number"
            placeholder="Contribution duration (years)"
            onChange={(e) =>
              handleChangeNumericValue(e, setContributionDuration)
            }
          />
        </FormItem>
        <FormItem label="Investment time (years)">
          <Input
            addonAfter="Years"
            type="number"
            placeholder="Investment time (years)"
            onChange={(e) => handleChangeNumericValue(e, setDuration)}
          />
        </FormItem>
        <FormItem label="Yearly interest rate %">
          <Input
            addonAfter="%"
            type="number"
            placeholder="Yearly interest rate"
            onChange={(e) =>
              handleChangeNumericValue(e, setInterestRatePercentage)
            }
          />
        </FormItem>
      </Form>
      <Typography.Title level={5}>
        Total: {usDollar.format(sum)}$
      </Typography.Title>
      <Typography.Title level={5}>
        Total invested: {usDollar.format(investedMoney)}$
      </Typography.Title>
      <Typography.Title level={5}>
        Total profit: {usDollar.format(totalBenef)}$
      </Typography.Title>
    </StyledCompoundInterestScreen>
  );
};

const handleChangeNumericValue = (
  e: React.ChangeEvent<HTMLInputElement>,
  callBack: (v: number) => void
) => {
  const value = e.target.value.replaceAll(",", "");
  callBack(Number(value));
};

const StyledCompoundInterestScreen = styled.div``;
