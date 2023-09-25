/**
 * @jest-environment jsdom
 */

import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Product from "./Product";

test("can display edit form", async () => {
  render(<Product />)
  const showEditButton = screen.getByRole("button", {name: "Edit"});
  const user = userEvent.setup();
  await user.click(showEditButton);
  const form = screen.getByRole("textbox", {name: "Product Name"});
  expect(form).toBeInTheDocument();
});
