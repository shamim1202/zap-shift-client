import { Link } from "react-router";

const PaymentCanceled = () => {
  return (
    <div className="w-full mx-auto">
      <h1 className="text-center font-bold text-xl md:text-4xl text-warning py-3 md:py-6">
        Your Parcel Payment Cancelled
      </h1>
      <Link to="/dashboard/my_parcels">
        <button className="btn btn-primary text-secondary btn-xs md:btn-md px-4 md:px-6">Try Again</button>
      </Link>
    </div>
  );
};

export default PaymentCanceled;
