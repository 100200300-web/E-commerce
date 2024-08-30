import React, { useContext, useEffect } from "react";
import sliderImage1 from "../../assets/blog-img-1.jpeg";
import sliderImage2 from "../../assets/blog-img-2.jpeg";
import sliderImage3 from "../../assets/grocery-banner.png";
import sliderImage4 from "../../assets/grocery-banner-2.jpeg";
import sliderImage5 from "../../assets/slider-2.jpeg";
import sideImage1 from "../../assets/slider-image-2.jpeg";
import sideImage2 from "../../assets/slider-image-3.jpeg";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Home.module.css";
import Slider from "react-slick";
import { Helmet } from "react-helmet";
import { cartContext } from "../Context/CartContext";
import Products from "../Products/Products";
import CategorySlider from "../CategorySlider/CategorySlider";

export default function Home() {
  const { getCartItems } = useContext(cartContext);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    cssEase: "linear",
  };
  useEffect(() => {
    getCartItems();
  }, []);

  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <div className="pb-8">
        <div className="flex items-center justify-center">
          <div className="w-full lg:w-3/4">
            <Slider {...settings} className="mt-1">
              <div>
                <img
                  src={sliderImage1}
                  alt="sliderImage1"
                  className="w-full h-[300px]"
                />
              </div>
              <div>
                <img
                  src={sliderImage2}
                  alt="sliderImage2"
                  className="w-full h-[300px]"
                />
              </div>
              <div>
                <img
                  src={sliderImage3}
                  alt="sliderImage3"
                  className="w-full h-[300px]"
                />
              </div>
              <div>
                <img
                  src={sliderImage4}
                  alt="sliderImage4"
                  className="w-full h-[300px]"
                />
              </div>
              <div>
                <img
                  src={sliderImage5}
                  alt="sliderImage5"
                  className="w-full h-[300px]"
                />
              </div>
            </Slider>
          </div>
          <div className="w-1/4  hidden lg:block">
            <img
              src={sideImage1}
              alt="sideImage1"
              className="w-full h-[150px] rounded"
            />
            <img
              src={sideImage2}
              alt="sideImage2"
              className="w-full h-[150px] rounded"
            />
          </div>
        </div>
        <div className="mt-16">
          <CategorySlider />
        </div>
        <div className="mt-16">
          <Products />
        </div>
      </div>
    </>
  );
}
