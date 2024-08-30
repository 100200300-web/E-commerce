import React, { useContext } from "react";
import { WishlistContext } from "../Context/WishlistContext";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import wishlist from "../../assets/shopping-cart2.png";

export default function Wishlist() {
  const { wishlistProducts, deleteWishlistItem, numOfItemOfWishlist } =
    useContext(WishlistContext);
  async function handelDelete(id) {
    await deleteWishlistItem(id);
  }
  return (
    <>
      <Helmet>
        <title>Wishlist</title>
      </Helmet>
      {numOfItemOfWishlist == 0 ? (
        <>
          <div className="  py-28">
            <div className="flex justify-center items-center">
              <div className="text-center">
                <p className="text-2xl font-bold mb-3">
                  Your Shopping Wishlist still Empty .
                </p>
                <p className="text-2xl font-semibold mb-5">
                  Add your Fav Products
                </p>
                <Link to={"/Products"} className="btn p-2">
                  Check Our Products
                </Link>
              </div>

              <img src={wishlist} alt="wishlist" className="w-[200px]" />
            </div>
          </div>
        </>
      ) : (
        <>
          <h2 className="text-center text-3xl mb-5 text-cyan-600">Wishlist</h2>
          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-y-5 gap-x-2">
            {wishlistProducts?.map((proudct) => (
              <div
                key={proudct._id}
                className="product p-2 group overflow-hidden border rounded-lg group"
              >
                <div className=" relative">
                  <img
                    src={proudct.imageCover}
                    alt={proudct.title}
                    className="w-full "
                  />
                  <div
                    onClick={() => {
                      handelDelete(proudct._id);
                    }}
                    className=" inline-flex justify-center items-center  absolute top-0 right-0 rounded-lg p-2 "
                  >
                    <i className="fa-solid fa-heart text-red-600 "></i>
                  </div>
                </div>
                <Link to={`/ProductDetails/${proudct._id}`}>
                  <h6 className="text-cyan-600 mt-2">
                    {proudct.category.name}
                  </h6>
                  <p>{proudct.title.split(" ").slice(0, 2).join(" ")}</p>
                </Link>
                <div className="flex items-center justify-between">
                  <p className="mt-2">
                    <span>EGP</span> {proudct.price}
                  </p>
                  <p className="">
                    {proudct.ratingsAverage}{" "}
                    <i className="fa-solid fa-star text-yellow-300"></i>
                  </p>
                </div>
                <div
                  onClick={() => handelAddProduct(proudct._id)}
                  className=" btn rounded-lg p-2 text-center w-36 mx-auto translate-y-[200%] group-hover:translate-y-0 transition-all duration-500 cursor-pointer"
                >
                  Add To Cart
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
}
