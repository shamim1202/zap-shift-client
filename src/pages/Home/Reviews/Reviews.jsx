import { use } from "react";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import sectionImg from "../../../assets/customer-top.png";
import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";
import ReviewCard from "./ReviewCard";

const Reviews = ({ reviewsPromise }) => {
  const reviews = use(reviewsPromise);
  console.log(reviews);
  return (
    <div>
      <div className="md:w-3xl mx-auto mb-4 md:mb-8 md:space-y-3 text-center">
        <img className="mx-auto" src={sectionImg} alt="" />
        <h1 className="text-2xl md:text-5xl font-bold text-secondary">
          What our customers are sayings
        </h1>
        <p className="text-gray-600 text-sm md:text-base">
          Enhance posture, mobility, and well-being effortlessly with Posture
          Pro. Achieve proper alignment, reduce pain, and strengthen your body
          with ease!
        </p>
      </div>
      <div>
        <Swiper
          effect={"coverflow"}
          loop={true}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={3}
          coverflowEffect={{
            rotate: 20,
            stretch: "50%",
            depth: 200,
            modifier: 1,
            scale: 0.8,
            slideShadows: true,
          }}
          pagination={true}
          modules={[Autoplay, EffectCoverflow, Pagination]}
          className="mySwiper"
        >
          {reviews.map((review) => (
            <SwiperSlide key={review._id}>
              <ReviewCard reviewData={review}></ReviewCard>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Reviews;
