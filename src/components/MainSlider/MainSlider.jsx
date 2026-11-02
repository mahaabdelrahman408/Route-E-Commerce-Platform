import slide1 from'../../assets/slider-image-1-Dh9d2U6G (2).jpeg'
import slide2 from'../../assets/slider-image-2-Xt88XJy9.jpeg'
import slide3 from'../../assets/slider-image-3-BtMvVf4V.jpeg'
import banner1 from'../../assets/grocery-banner-2-BWrZqEBM.jpeg'
import banner2 from'../../assets/banner-4.jpeg'
import Slider from 'react-slick'

export default function MainSlider() {
      const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows:false,
   autoplay:true,
   autoplaySpeed:2000,
  };
  return <>
  {/* <img src={slide1} alt="Slider Image" className="w-full h-64 object-cover object-top"/> */}

<div className="flex pt-4">
<div className="w-3/4">
                 <Slider {...settings}>
       <img src={slide1} alt="Slider Image" className="w-full h-100 object-cover "/>
       <img src={slide2} alt="Slider Image" className="w-full h-100 object-cover "/>
       <img src={slide3} alt="Slider Image" className="w-full h-100 object-cover "/>

    </Slider>
</div>
<div className="w-1/4">
  <img src={banner1} alt="Banner Image" className="w-full h-50"/>
  <img src={banner2} alt="Banner Image" className="w-full h-50"/>

</div>
</div>





  </>
   
}
