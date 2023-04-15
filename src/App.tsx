import styled from "styled-components";
import { CompoundInterestScreen, MortgagePaymentsScreen } from "./screens";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MortgagePaymentsScreen />,
  },
  {
    path: "/compound-interest",
    element: <CompoundInterestScreen />,
  },
]);

const App = () => {
  return (
    <StyledApp className="App" style={{ padding: 24 }}>
      <RouterProvider router={router} />
    </StyledApp>
  );
};

const StyledApp = styled.div`
  padding: 24px;
`;

export default App;
