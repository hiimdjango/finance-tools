import { Form, Grid, Input, InputNumber } from "antd";
import FormItem from "antd/es/form/FormItem";
import { MortgageFormItem } from "../../model";
import { useMortgageFormContext } from "../../state";

export const MortgageForm: React.FC = () => {
  const { formValues, updateValues } = useMortgageFormContext();
  const { useBreakpoint } = Grid;
  const { xs } = useBreakpoint();

  return (
    <Form
      labelAlign="left"
      style={{ gap: 16 }}
      layout={xs ? "horizontal" : "inline"}
      initialValues={formValues}
      onValuesChange={updateValues}
      size="large"
    >
      <FormItem name="principal" label="Cost">
        <InputNumber
          formatter={(value) =>
            `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          }
          parser={(value) => value!.replaceAll(",", "")}
          addonAfter="$"
          placeholder="Real estate cost"
        />
      </FormItem>
      <FormItem
        name={MortgageFormItem.interestRatePercentage}
        label="Interest Rate %"
      >
        <Input addonAfter="%" type="number" placeholder="Interest rate" />
      </FormItem>
      <FormItem name={MortgageFormItem.term} label="Term (years)">
        <Input type="number" placeholder="Term" />
      </FormItem>
      <FormItem label="Down payment" name={MortgageFormItem.downPayment}>
        <InputNumber
          formatter={(value) =>
            `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          }
          parser={(value) => value!.replaceAll(",", "")}
          addonAfter="$"
          placeholder="Down payment"
        />
      </FormItem>

      <FormItem name={MortgageFormItem.resellAfter} label="Resell after">
        <Input addonAfter="years" type="number" placeholder="Resell after" />
      </FormItem>
      <FormItem name={MortgageFormItem.resellPrice} label="Resell price">
        <InputNumber
          formatter={(value) =>
            `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          }
          parser={(value) => value!.replaceAll(",", "")}
          addonAfter="$"
          placeholder="Resell price"
        />
      </FormItem>
      <FormItem name={MortgageFormItem.co_fees} label="Monthly co-fees">
        <Input addonAfter="/month" type="number" placeholder="Resell after" />
      </FormItem>
      <FormItem name={MortgageFormItem.taxes} label="Yearly Property taxes">
        <Input
          addonAfter="/year"
          type="number"
          placeholder="Yearly Property taxes"
        />
      </FormItem>
    </Form>
  );
};
