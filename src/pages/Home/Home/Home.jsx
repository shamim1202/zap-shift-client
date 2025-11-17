import Banner from "../Banner/Banner";
import BecomeMerchant from "../BecomeMerchant/BecomeMerchant";
import Brands from "../Brands/Brands";
import HowItWorks from "../HowItWorks/HowItWorks";
import OurServices from "../OurServices/OurServices";
import Reviews from "../Reviews/Reviews";

const reviewsPromise = fetch("/public/reviews.json").then((res) => res.json());

const Home = () => {
  return (
    <div className="space-y-8 md:space-y-20">
      <Banner></Banner>
      <HowItWorks></HowItWorks>
      <OurServices></OurServices>
      <Brands></Brands>
      <BecomeMerchant></BecomeMerchant>
      <Reviews reviewsPromise={reviewsPromise}></Reviews>
    </div>
  );
};

export default Home;
