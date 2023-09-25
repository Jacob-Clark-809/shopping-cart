import ProductList from "./ProductList"
import AddProductForm from "./AddProductForm";
import Header from "./Header";
import { useState } from "react";
import { useEffect } from "react";

const App = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [addFormToggle, setAddFormToggle] = useState(false);

  const handleNewProduct = async (product, callback) => {
    try {
      const response = await fetch("/api/products", { 
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product) 
      });
      const addedProduct = await response.json();
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
        const response = await fetch("/api/products")
        const product = await response.json()
        setProducts(product);
      } catch(e) {
        console.log(e);
      }
    })()
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch("/api/cart")
        const cart = await response.json()
        setCart(cart);
      } catch(e) {
        console.log(e);
      }
    })()
  }, []);

  const handleAddToCart = async (id) => {
    const product = {productId: id};
    try {
      const response = await fetch("/api/add-to-cart", { 
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product) 
      });

      let responseObject = await response.json()
      cartItem = responseObject.item;

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
      const response = await fetch("/api/checkout", {
        method: "POST",
      });
      setCart([]);
    } catch (e) {
      console.log(e);
    }
  };
  
  const handleEditProduct = async (id, product, callback) => {
    try {
      const response = await fetch(`/api/products/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });
      const updatedProduct = await response.json();
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
      await fetch(`/api/products/${id}`, { method: "DELETE" });
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