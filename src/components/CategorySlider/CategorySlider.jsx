import axios from "axios";
import { useEffect, useState } from "react";
import Slider from "react-slick";


export default function CategorySlider() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 6,
    slidesToScroll: 1,
    arrows:false,
   autoplay:true,
   autoplaySpeed:2000,
  };
  const [categories, setCategories] = useState([]);

useEffect(() => {
  const controller = new AbortController()  
async function getCategories() {
 
    const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories`, {
      signal: controller.signal,
    });
    // console.log(data);
    setCategories(data.data);

}

  

  
    getCategories()
      return () => controller.abort()

  },[])

  return <>
               <Slider {...settings}>
     {categories?.map((category, index) => 
      <div  key={index}    className="my-3"
>
          <img    src={category.image}
              alt={category.title} className="w-full h-64 object-cover object-top"/>
          <h3 className="text-center text-lg font-semibold mt-2">{category.name}</h3>
        </div>)}
            
    </Slider> 
     </>
}
