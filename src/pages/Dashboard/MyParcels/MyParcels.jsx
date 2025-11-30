import { useQuery } from "@tanstack/react-query";
import { FaEdit } from "react-icons/fa";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { RiDeleteBin6Line } from "react-icons/ri";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const MyParcels = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: parcels = [], refetch } = useQuery({
    queryKey: ["myParcels", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?email=${user?.email}`);
      return res.data;
    },
  });

  const handleDelete = (id) => {
    console.log("This Id Will Be Delete", id);

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/parcels/${id}`).then((res) => {
          console.log(res.data);
          if (res.data.deletedCount) {
            Swal.fire({
              title: "Deleted!",
              text: "Your parcel has been deleted.",
              icon: "success",
            });
            refetch();
          }
        });
      }
    });
  };

  const handlePayment = async (parcel) => {
    const paymentInfo = {
      cost: parcel.cost,
      parcelName: parcel.parcelName,
      senderEmail: parcel.senderEmail,
      parcelId: parcel._id,
    };
    const res = await axiosSecure.post(
      "/payment-checkout-session",
      paymentInfo
    );
    window.location.assign(res.data.url);
  };

  return (
    <div>
      <h1 className="text-2xl md:text-5xl font-bold md:font-extrabold text-secondary md:mb-8">
        All my parcels {parcels.length}
      </h1>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>Sl.</th>
              {/* <th>Receiver Name</th> */}
              {/* <th>Receiver Address</th> */}
              <th>Parcel Name</th>
              <th>Parcel Type</th>
              <th>Parcel Weight</th>
              <th>Parcel Cost</th>
              <th>Payment Status</th>
              <th>Delivery Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((p, i) => (
              <tr key={p._id}>
                <th>{i + 1}</th>
                {/* <td>{p.receiverName}</td> */}
                {/* <td>{`${p.receiverAddress}, ${p.receiverDistrict}, ${p.receiverRegion}`}</td> */}
                <td>{p.parcelName}</td>
                <td>{p.parcelType}</td>
                <td>{p.parcelWeight}</td>
                <td>{p.cost}</td>

                <td>
                  {p.paymentStatus === "paid" ? (
                    <span className="bg-green-600 text-white font-bold md:px-5.5 md:py-2 rounded">
                      Paid
                    </span>
                  ) : (
                    // <Link to={`/dashboard/payment/${p._id}`}>
                    //   <button className="btn btn-primary btn-xs md:btn-sm text-secondary">
                    //     Pay
                    //   </button>
                    // </Link>
                    <button
                      onClick={() => handlePayment(p)}
                      className="btn btn-primary btn-xs md:btn-sm text-secondary"
                    >
                      Pay Now
                    </button>
                  )}
                </td>

                <td>{p.deliveryStatus}</td>
                <td className="flex items-center gap-1">
                  <button className="btn btn-square btn-sm md:btn-md hover:bg-green-500 hover:text-white">
                    <FaMagnifyingGlass />
                  </button>

                  <button className="btn btn-square btn-sm md:btn-md hover:bg-blue-500 hover:text-white">
                    <FaEdit />
                  </button>

                  <button
                    onClick={() => handleDelete(p._id)}
                    className="btn btn-square btn-sm md:btn-md hover:bg-red-500 hover:text-white"
                  >
                    <RiDeleteBin6Line />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyParcels;
