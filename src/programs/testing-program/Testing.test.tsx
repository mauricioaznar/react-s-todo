import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import Testing from "./Testing";

test("renders a message", () => {
  const { container, getByText } = render(<Testing />);
  expect(getByText("Hello, world!")).toBeInTheDocument();
});
