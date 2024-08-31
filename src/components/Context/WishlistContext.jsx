import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
export const WishlistContext = createContext();
export default function WishlistContextProvider({ children }) {
  let headers = {
    token: localStorage.getItem("token"),
  };
  const [numOfItemOfWishlist, setNumOfItemOfWishlist] = useState(0);
  const [wishlistProducts, setWishlistProducts] = useState(null);
  const [wishlistItems, setWishlistItems] = useState(null);

  async function addToWishlist(id) {
    return await axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/wishlist`,
        {
          productId: id,
        },
        { headers }
      )
      .then((res) => {
        setWishlistItems(res.data.data);

        getWishlistItems();
        return res;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function getWishlistItems() {
    await axios
      .get(`https://ecommerce.routemisr.com/api/v1/wishlist`, { headers })
      .then((res) => {
        setNumOfItemOfWishlist(res.data.count);
        setWishlistProducts(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function deleteWishlistItem(id) {
    await axios
      .delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`, {
        headers,
      })
      .then((res) => {
        getWishlistItems();
        toast.success("Delete Wishlist Item Successfully");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Delete Wishlist Item Error");
      });
  }

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getWishlistItems();
    }
  }, [localStorage.getItem("token")]);
  return (
    <WishlistContext.Provider
      value={{
        addToWishlist,
        getWishlistItems,
        numOfItemOfWishlist,
        wishlistProducts,
        wishlistItems,
        deleteWishlistItem,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}
