import React from "react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const Brands = () => {
  return (
    <div className="px-8 md:px-20">
      <h3 className="text-center text-secondary text-lg md:text-2xl font-bold pb-4 md:pb-8">
        We've helped thousands of sales team!
      </h3>
      <Swiper
        slidesPerView={4}
        autoplay={{
          delay: 1000,
          disableOnInteraction: false,
        }}
        loop={true}
        modules={[Autoplay]}
        centeredSlides={true}
        spaceBetween={30}
        grabCursor={true}
      >
        <SwiperSlide>
          <img src="https://i.ibb.co.com/35S8567g/moonstar.png" alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://i.ibb.co.com/Z1mMm0W9/star.png" alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://i.ibb.co.com/zHVt1S4q/amazon-vector.png" alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://i.ibb.co.com/wr72PZbC/casio.png" alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://i.ibb.co.com/tTsCcjSq/randstad.png" alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://i.ibb.co.com/8LQM1fhJ/start-people.png" alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://i.ibb.co.com/ymNCbz2Y/amazon.png" alt="" />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Brands;
