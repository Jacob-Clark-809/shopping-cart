/**
 * @jest-environment jsdom
 */

import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import EditForm from "./EditForm";

test("edit form displays", () => {
  render(<EditForm />);
  const form = screen.getByRole("textbox", {name: "Product Name"});
  expect(form).toBeInTheDocument();
});

test("cancel button closes edit form", async () => {
  const mockFunc = jest.fn();
  render(<EditForm onCancel={mockFunc}/>);
  const user = userEvent.setup();
  const button = screen.getByRole("button", {name: "Cancel"});
  await user.click(button);
  expect(mockFunc.mock.calls.length).toBe(1);
});

