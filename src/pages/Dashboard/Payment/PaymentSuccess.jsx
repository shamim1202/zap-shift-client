import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const PaymentSuccess = () => {
  const axiosSecure = useAxiosSecure();
  const [paymentInfo, setPaymentInfo] = useState({});
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  console.log(sessionId);

  useEffect(() => {
    if (sessionId) {
      axiosSecure
        .patch(`/payment-success?session_id=${sessionId}`)
        .then((res) => {
          console.log(res.data);
          setPaymentInfo({
            trackingId: res.data.trackingId,
            transactionId: res.data.transactionId,
          });
        });
    }
  }, [sessionId, axiosSecure]);

  return (
    <div className="w-full mx-auto">
      <h1 className="text-center font-bold text-xl md:text-4xl text-secondary py-3 md:py-6">
        Your Parcel Payment Successfull
      </h1>
      <div>
        <p>
          Your Transaction Id:{" "}
          <span className="font-semibold md:text-lg text-secondary">
            {paymentInfo.transactionId}
          </span>
        </p>
        <p>
          Your Tracking Id:{" "}
          <span className="font-semibold md:text-lg text-secondary">
            {paymentInfo.trackingId}
          </span>
        </p>
      </div>
    </div>
  );
};

export default PaymentSuccess;
