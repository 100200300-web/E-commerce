import axios from "axios";
import { useQuery } from "react-query";
import Slider from "react-slick";

export default function CategorySlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 5,
    arrows: false,
    autoplay:true,
  };
  function getCatSlider() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  }
  let { data } = useQuery({
    queryKey: ["getCategories"],
    queryFn: getCatSlider,
  });
  return (
    <>
      <div className="  mx-auto my-10">
        <Slider {...settings}>
          {data?.data?.data.map((cat) => (
            <div key={cat.name} className="text-center">
              <img className="h-52 w-full" src={cat.image} alt="" />
              <p>{cat.name}</p>
            </div>
          ))}
        </Slider>
      </div>
    </>
  );
}
