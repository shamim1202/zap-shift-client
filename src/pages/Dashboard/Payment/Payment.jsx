import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const Payment = () => {
  const axiosSecure = useAxiosSecure();
  const { parcelId } = useParams();
  const { isLoading, data: parcel } = useQuery({
    queryKey: ["parcels", parcelId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels/${parcelId}`);
      return res.data;
    },
  });

  const handlePayment = async () => {
    const paymentInfo = {
      cost: parcel.cost,
      parcelName: parcel.parcelName,
      senderEmail: parcel.senderEmail,
      parcelId: parcel._id,
    };

    const res = await axiosSecure.post("/create-checkout-session", paymentInfo);
    window.location.href = res.data.url;
    console.log(res.data);
  };

  if (isLoading) {
    return (
      <div>
        <span className="loading loading-dots loading-xl"></span>
      </div>
    );
  }

  return (
    <div>
      <h3>
        Please Pay Amount{" "}
        <span className="text-lg font-semibold">{parcel.cost}</span> for the
        parcel {parcel.parcelName}
      </h3>
      <button
        onClick={handlePayment}
        className="btn btn-xs md:btn-md px-4 md:px-6 text-sm md:test-base btn-primary text-secondary hover:btn-secondary hover:text-white"
      >
        Pay
      </button>
    </div>
  );
};

export default Payment;
