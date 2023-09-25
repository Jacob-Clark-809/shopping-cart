/**
 * @jest-environment jsdom
 */

import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import EditForm from "./EditForm";

test("can display edit form", async () => {
  const showEditButton = screen.getByRole("button", {name: "Edit"});
  const user = userEvent.setup();
  await user.click(button);
  const form = screen.getByRole("textbox", {name: "Product Name"});
  expect(form).toBeInTheDocument();
});
