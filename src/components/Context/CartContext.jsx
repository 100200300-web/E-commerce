import axios from "axios";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export const cartContext = createContext();
export default function CartContextProvider({ children }) {
  const [numberOfCartItems, setNumberOfCartItems] = useState(0);
  const [products, setProducts] = useState(null);
  const [cartId, setCartId] = useState(null);
  const [totalCartPrice, setTotalCartPrice] = useState(0);
  const [cartOwner, setCartOwner] = useState(null);
  let headers = {
    token: localStorage.getItem("token"),
  };
  async function addProduct(id) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        {
          productId: id,
        },
        {
          headers,
        }
      )
      .then((res) => {
        getCartItems();
        setCartId(res.data.data._id);
        setCartOwner(res.data.data.cartOwner);

        return res;
      })
      .catch((error) => {
        return false;
      });
  }
  async function getCartItems() {
    await axios
      .get(`https://ecommerce.routemisr.com/api/v1/cart`, {
        headers,
      })
      .then((res) => {
        setNumberOfCartItems(res.data.numOfCartItems);
        setProducts(res.data.data.products);
        setTotalCartPrice(res.data.data.totalCartPrice);
        setCartId(res.data.data._id);
        console.log(res.data.data.cartOwner);

        setCartOwner(res.data.data.cartOwner);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  async function updateCount(id, count) {
    await axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
        { count },
        { headers }
      )
      .then((res) => {
        setNumberOfCartItems(res.data.numOfCartItems);
        setProducts(res.data.data.products);
        setTotalCartPrice(res.data.data.totalCartPrice);
        setCartId(res.data.data._id);
        setCartOwner(res.data.data.cartOwner);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  async function onlinePayment(shippingAddress) {
    await axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=https://e-commerce-pearl-nine-18.vercel.app/`,
        { shippingAddress },
        { headers }
      )
      .then((res) => {
        window.location.href = res.data.session.url;
        clearCart();
      })
      .catch((error) => {
        console.log(error);
        toast.error(`${error.response.data.message}`, {
          duration: 2000,
        });
      });
  }
  async function cashPayment(shippingAddress) {
    await axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
        { shippingAddress },
        { headers }
      )
      .then((res) => {
        toast.success("success", {
          duration: 2000,
        });

        clearCart();
      })
      .catch((error) => {
        toast.error(`${error.response.data.message}`, {
          duration: 2000,
        });
      });
  }
  async function deleteCartItem(id) {
    await axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, { headers })
      .then((res) => {
        setNumberOfCartItems(res.data.numOfCartItems);
        setProducts(res.data.data.products);
        setTotalCartPrice(res.data.data.totalCartPrice);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  async function clearCart() {
    await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`, {
      headers,
    });
    setProducts([]);
    setTotalCartPrice(0);
    setNumberOfCartItems(0);
  }
  useEffect(() => {
    if (localStorage.getItem("token")) {
      getCartItems();
    }
  }, [localStorage.getItem("token")]);

  return (
    <cartContext.Provider
      value={{
        cartOwner,
        cartId,
        addProduct,
        onlinePayment,
        cashPayment,
        products,
        totalCartPrice,
        numberOfCartItems,
        clearCart,
        updateCount,
        deleteCartItem,
        getCartItems,
        
      }}
    >
      {children}
    </cartContext.Provider>
  );
}
