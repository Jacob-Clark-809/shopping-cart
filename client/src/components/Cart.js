const Cart = ({ cart, onCheckout }) => {
  let total = 0;
  const formatMoney = (total) => {
    return '$'+total.toFixed(2);
  }

  return (
    <div className="cart">
      <h2>Your Cart</h2>
      {cart.length === 0 ? <p>{"Your cart is empty"}</p> : 
        <>
        <table className="cart-items">
          <thead>
            <tr>
              <th scope="col">Item</th>
              <th scope="col">Quantity</th>
              <th scope="col">Price</th>
            </tr>
          </thead>
          <tbody>
            {cart.map(item => {
              total += item.price * item.quantity
              return (
                <tr key={item.productId}>
                  <td>{item.title}</td>
                  <td>{item.quantity}</td>
                  <td>{formatMoney(item.price)}</td>
                </tr>
              )
            })}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="3" className="total">Total: { formatMoney(total) }</td>
            </tr>
          </tfoot>
        </table>
        </>
      }
      <button className="checkout" 
              disabled={cart.length === 0}
              onClick={onCheckout}>
        Checkout
        </button>
    </div>
  )
}

export default Cart;

// <div class="cart">
// <h2>Your Cart</h2>
// <table class="cart-items">
//   <thead>
//     <tr>
//       <th scope="col">Item</th>
//       <th scope="col">Quantity</th>
//       <th scope="col">Price</th>
//     </tr>
//   </thead>
//   <tbody>
//     <tr>
//       <td>Amazon Kindle E-reader</td>
//       <td>2</td>
//       <td>$79.99</td>
//     </tr>
//     <tr>
//       <td>Apple 10.5-Inch iPad Pro</td>
//       <td>1</td>
//       <td>$649.99</td>
//     </tr>
//   </tbody>
//   <tfoot>
//     <tr>
//       <td colspan="3" class="total">Total: $729.98</td>
//     </tr>
//   </tfoot>
// </table>
// <div class="checkout-button">
//   <button class="checkout">Checkout</button>
// </div>