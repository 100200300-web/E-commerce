import React, { useContext, useState } from "react";
import styles from "./IconWishlist.module.css";
import { WishlistContext } from "../Context/WishlistContext";
import toast from "react-hot-toast";
export default function IconWishlist({ id }) {
  const { addToWishlist, deleteWishlistItem, wishlistProducts } =
    useContext(WishlistContext);
  const [isAdded, setIsAdded] = useState(false);

  async function handelWishlist(id) {
    const resFlag = await addToWishlist(id);
    if (resFlag) {
      toast.success("Add To Wishlist Successfully", {
        duration: 2000,
      });
      setIsAdded(!isAdded);
    } else {
      toast.error("Add To Wishlist Error", {
        duration: 2000,
      });
    }
  }
  async function handelDelete(id) {
    await deleteWishlistItem(id);
    setIsAdded(!isAdded);
  }

  return (
    <>
      <div
        key={id}
        onClick={() => {
          if ( wishlistProducts?.map((like) => like._id == id).includes(true)) {
            handelDelete(id);
          } else {
            handelWishlist(id);
          }
        }}
        className=" inline-flex justify-center items-center  absolute top-0 right-0 p-2 "
      >
        <i
          className={`fa-solid fa-heart ${
            wishlistProducts?.map((like) => like._id == id).includes(true)
              ? "text-red-600"
              : ""
          }`}
        ></i>
      </div>
          
    </>
  );
}
