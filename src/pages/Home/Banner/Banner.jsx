import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { MdArrowOutward } from "react-icons/md";
import { LuBike } from "react-icons/lu";

const Banner = () => {
  return (
    // autoPlay="true" infiniteLoop="true"
    <Carousel stopOnHover="true" >
      <div className="relative">
        <img src="https://i.ibb.co.com/nstchXS5/banner1.png" />
        <div>
            <button className="absolute z-10 left-7 bottom-7 md:left-23 md:bottom-17 btn btn-xs md:btn-lg md:py-6.5 bg-primary text-[#1f1f1f] md:rounded-4xl shadow-none">Track Your parcel <MdArrowOutward /></button>

            <button className="absolute left-7 bottom-0.5 md:left-78 md:bottom-18 btn btn-xs md:btn-lg btn-outline btn-secondary md:rounded-3xl">Be A Rider <LuBike /></button>
        </div>
      </div>
      <div>
        <img src="https://i.ibb.co.com/C5b27qJh/banner2.png" />
      </div>
      <div>
        <img src="https://i.ibb.co.com/cXSBbm1M/banner3.png" />
      </div>
    </Carousel>
  );
};

export default Banner;
