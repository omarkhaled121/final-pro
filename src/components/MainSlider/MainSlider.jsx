import React from 'react';
import img1 from "../../assets/41nN4nvKaAL._AC_SY200_.jpg";
import img3 from "../../assets/XCM_Manual_1396328_4379575_Egypt_EG_BAU_GW_DC_SL_Bags_Wallets_379x304_1X._SY304_CB650636675_.jpg";
import img2 from "../../assets/sli.jpg";
import img4 from "../../assets/61cSNgtEISL._AC_SY200_.jpg";

import Slider from 'react-slick';

export default function MainSlider() {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    customPaging: (i) => (
      <div className="custom-dot2 translate-x-0 md:translate-x-32"></div>
    ),
    appendDots: (dots) => (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '10px' }}>
        {dots.slice(0, 2)}
      </div>
    )}

  return (
    <div className='row my-7 mt-12 pt-7 relative justify-center   flex'>

      <div className="w-full md:w-2/4">
        <Slider {...settings}>
          <div>
            <img src={img1} className='h-[460px] translate-x-0 md:translate-x-32 w-full object-contain' alt="Slider Image 1" />
          </div>
          <div>
            <img src={img4} className='h-[460px] translate-x-0 md:translate-x-32 w-full object-contain' alt="Slider Image 4" />
          </div>
        </Slider>
      </div>
      <div className="w-full md:w-1/4 flex flex-col  py-0 mt-6 gap-y-0 md:mt-0  ">
      
          <img src={img3} className='h-[250px] mb-5 md:my-0  w-full object-contain md:object-cover' alt="Secondary Image 1" />
    
          <img src={img2} className='h-[250px] my-0  w-full object-contain md:object-cover' alt="Secondary Image 2" />
        
      </div>
    </div>
  );
}
