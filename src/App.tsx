import styled from "styled-components";
import { CompoundInterestScreen, MortgageScreen } from "./screens";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { MortgageFormProvider } from "./state/MortgageFormContext";
import { Layout } from "antd";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <MortgageFormProvider>
        <MortgageScreen />
      </MortgageFormProvider>
    ),
  },
  {
    path: "/compound-interest",
    element: <CompoundInterestScreen />,
  },
]);

const { Content } = Layout;

const App = () => {
  return (
    <Layout>
      <StyledContent>
        <RouterProvider router={router} />
      </StyledContent>
    </Layout>
  );
};

const StyledContent = styled(Content)`
  padding: 24px;
  min-height: 100vh;
`;

export default App;
