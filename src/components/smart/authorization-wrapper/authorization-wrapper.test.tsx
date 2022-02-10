import React from "react";
import { act, render } from "@testing-library/react";
// import { act, render, screen as rtlScreen } from "@testing-library/react";
import "@testing-library/jest-dom";
import AuthorizationWrapper from "./authorization-wrapper";
import { Box } from "@mui/material";
import { Providers } from "../../../global-state/context/providers";
import { store } from "../../../global-state/redux";
import { MockedProvider } from "@apollo/client/testing";

// const mocks = [];

test("renders login page", async () => {
  await act(async () => {
    render(
      <MockedProvider mocks={[]}>
        <Providers store={store}>
          <AuthorizationWrapper>
            <Box />
          </AuthorizationWrapper>
        </Providers>
      </MockedProvider>,
    );
  });

  // rtlScreen.debug();
});
