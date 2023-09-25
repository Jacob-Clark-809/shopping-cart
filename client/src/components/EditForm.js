import { useState } from "react";

const EditForm = ({ _id, startTitle, startPrice, startQuantity, onEditProduct, onCancel }) => {
  const [title, setTitle] = useState(startTitle);
  const [price, setPrice] = useState(startPrice);
  const [quantity, setQuantity] = useState(startQuantity);

  const handleEditProduct = (e) => {
    e.preventDefault();
    const updatedProduct = { title, price, quantity };
    onEditProduct(_id, updatedProduct, reset);
  };

  const reset = () => {
    setTitle("");
    setPrice("");
    setQuantity("");
    onCancel();
  };

  return (
  <form onSubmit={handleEditProduct}>
    <div className="input-group">
      <label htmlFor="product-name">Product Name</label>
      <input
        type="text"
        id="product-name"
        value={title}
        aria-label="Product Name"
        onChange={(e) => {setTitle(e.target.value)}}
      />
    </div>

    <div className="input-group">
      <label htmlFor="product-price">Price</label>
      <input
        type="number"
        id="product-price"
        value={price}
        aria-label="Product Price"
        onChange={(e) => {setPrice(e.target.value)}}
      />
    </div>

    <div className="input-group">
      <label htmlFor="product-quantity">Quantity</label>
      <input
        type="number"
        id="product-quantity"
        value={quantity}
        aria-label="Product Quantity"
        onChange={(e) => {setQuantity(e.target.value)}}
      />
    </div>

    <div className="actions form-actions">
      <button type="submit">Update</button>
      <button type="button" onClick={onCancel}>Cancel</button>
    </div>
  </form>
  );
};

export default EditForm;