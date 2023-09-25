import EditForm from "./EditForm";
import { useState } from "react";

const Product = ({ _id, title, quantity, price, onAddToCart, onDelete, onEditProduct }) => {
  const [showEditForm, setShowEditForm] = useState(false);

  const quantityStyle = quantity === 0 ? "none-left" : "";

  const handleCancel = () => {
    setShowEditForm(false);
  };

  return (
    <>
    <div className="product-details">
      <h3>{title}</h3>
      <p className="price">${price}</p>
      <p className={`quantity ${quantityStyle}`}>{quantity} left in stock</p>
      <div className="actions product-action">
        <button className="add-to-cart" onClick={() => onAddToCart(_id)} disabled={quantity === 0}>Add to Cart</button>
        <button className="edit" onClick={() => setShowEditForm(!showEditForm)}>Edit</button>
      </div>
      <button className="delete-button" onClick={() => onDelete(_id)}>
        <span>X</span>
      </button>
    </div>
    {showEditForm ? 
      (<div className="edit-form">
      <h3>Edit Product:</h3>
      <EditForm _id={_id} startTitle={title} startQuantity={quantity} 
                startPrice={price} onEditProduct={onEditProduct} onCancel={handleCancel} />
    </div>) : null}
    </>
  )
};

export default Product