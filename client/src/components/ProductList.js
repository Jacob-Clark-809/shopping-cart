import Product from './Product'

const ProductList = ({ products, onAddToCart, onEditProduct, onDelete }) => {
  return (
    <div className="product-listing">
      <h2>Products</h2>
      <ul className="product-list">
        { products.map( product => {
          return (
            <li className="product" key={product._id} >
              <Product {...product} onAddToCart={onAddToCart} 
                       onEditProduct={onEditProduct} onDelete={onDelete} />
            </li>
          )
        })}
      </ul> 
    </div>
  )
};

export default ProductList