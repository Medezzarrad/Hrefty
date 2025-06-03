import React, { useState } from 'react';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay  } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import '..//..//style/homePage/swiperSlide.scss'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

export default () => {
    const [swiperInstance, setSwiperInstance] = useState(null);
  return (
    <div
    className='m-auto' style={{width: '500px'}}     
    onMouseEnter={() => swiperInstance.autoplay.stop()}  // Arrête autoplay
    onMouseLeave={() => swiperInstance.autoplay.start()} // Reprend autoplay
    >
        <Swiper
        onSwiper={setSwiperInstance} 
        className='swiper'
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
        // spaceBetween={50}
        slidesPerView={1}
        // navigation
        autoplay={{ delay: 2000, disableOnInteraction: false }}
        loop={true}
        pagination={{ clickable: true }}
        >
            <SwiperSlide  ><img className='img' src="imgs/ads/ads1.png" alt="" /></SwiperSlide>
            <SwiperSlide><img className='img' src="imgs/ads/ads2.png" alt="" /></SwiperSlide>
            <SwiperSlide><img className='img' src="imgs/ads/ads3.png" alt="" /></SwiperSlide>
        </Swiper>
    </div>
  );
};