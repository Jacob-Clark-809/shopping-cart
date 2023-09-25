/**
 * @jest-environment jsdom
 */

import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import services from "../services/product";
import userEvent from "@testing-library/user-event";
import App from "./App";

jest.mock("../services/product.js");

const mockData = [
  {
    _id: 1,
    productId: 1,
    title: "Amazon Kindle E-reader",
    quantity: 5,
    price: 79.99
  },
  {
    _id: 2,
    productId: 2,
    title: "Apple 10.5-Inch iPad Pro",
    quantity: 0,
    price: 649.99
  },
  {
    _id: 3,
    productId: 3,
    title: "Yamaha Portable Keyboard",
    quantity: 2,
    price: 155.99
  },
  {
    _id: 4,
    productId: 4,
    title: "Tinker, Tailor, Soldier, Spy - A John le Carre Novel",
    quantity: 12,
    price: 13.74
  }
];

const mockCartData = [
  {
    _id: 4,
    productId: 4,
    title: "Tinker, Tailor, Soldier, Spy - A John le Carre Novel",
    quantity: 12,
    price: 13.74
  }
]

test("products are rendered", async () => {
  services.getProducts.mockResolvedValue(mockData);
  services.getCartItems.mockResolvedValue(mockCartData);
  render(<App />)
  const header = await screen.findByRole("heading", {name: /Apple 10.5-Inch iPad Pro/i});
  expect(header).toBeInTheDocument();
});

test("add item to cart", async () => {
  services.getProducts.mockResolvedValue(mockData);
  services.getCartItems.mockResolvedValue(mockCartData);
  services.addToCart.mockResolvedValue({item: mockData[0], product: mockData[0]});
  render(<App />);
  const allAddToCartButtons = await screen.findAllByRole("button", {name: "Add to Cart"});
  const addToCartButton = allAddToCartButtons[0];
  const user = userEvent.setup();
  await user.click(addToCartButton);
  const tableElement = await screen.findByRole("cell", {name: /Amazon Kindle E-reader/i});
  expect(tableElement).toBeInTheDocument();
});

test("delete product", async () => {
  services.getProducts.mockResolvedValue(mockData);
  services.getCartItems.mockResolvedValue(mockCartData);
  render(<App />);
  const allDeleteButtons = await screen.findAllByRole("button", {name: "X"});
  const deleteButton = allDeleteButtons[0];
  expect(deleteButton).toBeInTheDocument();

  const user = userEvent.setup();
  await user.click(deleteButton);

  expect(deleteButton).not.toBeInTheDocument();
});