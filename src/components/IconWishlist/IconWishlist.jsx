import React, { useContext, useState } from "react";
import { WishlistContext } from "../Context/WishlistContext";
import toast from "react-hot-toast";
export default function IconWishlist({ id, data }) {
  const {
    addToWishlist,
    deleteWishlistItem,
    wishlistItems,
    wishlistProducts,
    numOfItemOfWishlist,
  } = useContext(WishlistContext);
  const [isClicked, setIsClicked] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [items, setItems] = useState([]);

  async function handelWishlist(id) {
    const resFlag = await addToWishlist(id);
    setItems(wishlistItems);
    if (resFlag) {
      toast.success("Add To Wishlist Successfully", {
        duration: 2000,
      });
      setIsClicked(!isClicked);
      setIsAdded(!isAdded);
    } else {
      toast.error("Add To Wishlist Error", {
        duration: 2000,
      });
    }
  }
  async function handelDelete(id) {
    await deleteWishlistItem(id);
    if (numOfItemOfWishlist == 0) {
      setItems([]);
    }
    setIsClicked(!isClicked);
    setIsAdded(!isAdded);
  }

  return (
    <>
      <div
        key={id}
        onClick={() => {
          if (isAdded) {
            handelDelete(id);
          } else {
            handelWishlist(id);
          }
        }}
        className=" inline-flex justify-center items-center  absolute top-0 right-0  rounded-lg p-2 "
      >
        <i
          className={`fa-solid fa-heart ${isClicked ? "text-red-600" : ""}`}
        ></i>
      </div>
    </>
  );
}
