import ProductList from "./ProductList"
import AddProductForm from "./AddProductForm";
import Header from "./Header";
import productServices from "../services/product";
import { useState } from "react";
import { useEffect } from "react";

const App = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [addFormToggle, setAddFormToggle] = useState(false);

  const handleNewProduct = async (product, callback) => {
    try {
      const addedProduct = await productServices.newProduct(product);
      setProducts(products.concat(addedProduct));
      if (callback) {
        callback();
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const products = await productServices.getProducts();
        setProducts(products);
      } catch(e) {
        console.log(e);
      }
    })()
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const cartItems = await productServices.getCartItems()
        setCart(cartItems);
      } catch(e) {
        console.log(e);
      }
    })()
  }, []);

  const handleAddToCart = async (id) => {
    const product = {productId: id};
    try {
      const responseObject = await productServices.addToCart(product);
      const cartItem = responseObject.item;

      let newCart = [];
      if (cart.some(item => item.productId === cartItem.productId)) {
        newCart = cart.map(item => {
          if (item.productId === cartItem.productId) {
            item.quantity = cartItem.quantity
          }
          return item;
        })
      } else {
        newCart = cart.concat(cartItem)
      }

      const newProducts = products.map(product => {
        if (product._id === cartItem.productId) {
          return responseObject.product;
        } else {
          return product;
        }
      })

      setProducts(newProducts);
      setCart(newCart);
    } catch (e) {
      console.log(e);
    }
  };

  const handleCheckout = async () => {
    try {
      await productServices.checkout();
      setCart([]);
    } catch (e) {
      console.log(e);
    }
  };
  
  const handleEditProduct = async (id, product, callback) => {
    try {
      const updatedProduct = await productServices.editProduct(id, product);
      setProducts(products.map(product => {
        if (product._id === id) {
          return updatedProduct;
        } else {
          return product;
        };
      }));
      if (callback) {
        callback();
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleDelete = async (id) => {
    try {
      await productServices.deleteProduct(id);
      setProducts(products.filter(product => product._id !== id));
    } catch (e) {
      console.log(e);
    }
  };

  const handleClickAddForm = () => {
    addFormToggle === true ? setAddFormToggle(false) : setAddFormToggle(true);
  }

  return (
    <div id="app">
      <Header cart={cart} onCheckout={handleCheckout}/>
      <main>
        <ProductList products={products} onAddToCart={handleAddToCart} 
                     onEditProduct={handleEditProduct} onDelete={handleDelete} />
        
        <AddProductForm onSubmit={handleNewProduct} addFormToggle={addFormToggle} onAddFormClick={handleClickAddForm}/>
      </main>
    </div>
  )
};

export default App;