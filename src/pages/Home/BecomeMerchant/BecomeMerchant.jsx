import img1 from "../../../assets/be-a-merchant-bg.png";
import img2 from "../../../assets/location-merchant.png";

const BecomeMerchant = () => {
  return (
    <div className="px-8 md:px-20 ">
      <div className="relative bg-secondary p-8 md:p-20 rounded-4xl">
        <img className="absolute md:top-0 md:right-10" src={img1} alt="" />
        <div className="md:space-y-6 md:w-[65%]">
          <h2 className="text-white text-2xl md:text-4xl font-bold">
            Merchant and Customer Satisfaction is Our First Priority
          </h2>
          <p className="text-white text-sm md:text-base">
            We offer the lowest delivery charge with the highest value along
            with 100% safety of your product. Pathao courier delivers your
            parcels in every corner of Bangladesh right on time.
          </p>

          <div className="font-medium md:font-semibold">
            <button className="btn btn-xs md:btn-lg md:py-6 bg-primary text-[#1f1f1f] md:rounded-4xl border-none shadow-none md:mr-4">
              Become a Merchant
            </button>

            <button className="btn btn-xs md:btn-lg btn-outline btn-primary text-primary hover:text-[#1f1f1f] md:rounded-3xl hover:border-none hover:shadow-none">
              Earn with ZapShift courier
            </button>
          </div>
        </div>
        <img className="absolute md:top-24 md:right-10 md:w-[400px]" src={img2} alt="" />
      </div>
    </div>
  );
};

export default BecomeMerchant;
