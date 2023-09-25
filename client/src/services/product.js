const getProducts = async () => {
  const response = await fetch("/api/products");
  const products = await response.json();
  return products
}

const getCartItems = async () => {
  const response = await fetch("/api/cart")
  const cartItems = await response.json()
  return cartItems;
}

const addToCart = async (product) => {
  const response = await fetch("/api/add-to-cart", { 
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product) 
  });

  const responseObject = await response.json();
  return responseObject;
}

const deleteProduct = async (id) => {
  await fetch(`/api/products/${id}`, { method: "DELETE" });
};

const editProduct = async (id, updatedProduct) => {
  const response = await fetch(`/api/products/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedProduct),
  });
  const returnedProduct = await response.json();
  return returnedProduct;
}

const newProduct = async (product) => {
  const response = await fetch("/api/products", { 
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product) 
  });

  const jsonResponse = await response.json();
  return jsonResponse;
}

const checkout = async () => {
  await fetch("/api/checkout", {
    method: "POST",
  });
}

export default {
  deleteProduct,
  getProducts,
  getCartItems,
  editProduct,
  newProduct,
  addToCart,
  checkout
}