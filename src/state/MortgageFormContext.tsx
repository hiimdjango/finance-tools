import React, { useContext, useState } from "react";
import { MortgageForm } from "../model";

interface MortgageFormContextProps {
  formValues: MortgageForm;
  updateValues: (value: Record<keyof MortgageForm, string>) => void;
}

// Short circuit ahead, context value will never be empty
const MortgageFormContext = React.createContext<MortgageFormContextProps>(
  {} as any
);

export const useMortgageFormContext = () => useContext(MortgageFormContext);

export const MortgageFormProvider = ({
  children,
}: React.PropsWithChildren & { initialValues?: MortgageForm }) => {
  const [formValues, setFormValues] = useState<MortgageForm>({});

  const updateValues = (input: Record<keyof MortgageForm, string>) => {
    const key = Object.keys(input)[0] as keyof MortgageForm;
    const value = String(input[key]).replaceAll(",", "");
    setFormValues((previousValues) => ({
      ...previousValues,
      [key]: Number(value),
    }));
  };

  const value: MortgageFormContextProps = {
    formValues,
    updateValues,
  };

  return (
    <MortgageFormContext.Provider value={value}>
      {children}
    </MortgageFormContext.Provider>
  );
};
