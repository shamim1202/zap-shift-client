import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";

const ApproveRiders = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { refetch, data: riders = [] } = useQuery({
    queryKey: ["riders", "Pending"],
    queryFn: async () => {
      const res = await axiosSecure.get("/riders");
      return res.data;
    },
  });

  //   Accept Applicaton to be a rider........................
  const updateRiderStatus = (rider, status) => {
    const updateInfo = { status: status, email: rider.riderEmail };
    axiosSecure.patch(`/riders/${rider._id}`, updateInfo).then((res) => {
      console.log(res.data);
      if (res.data.modifiedCount) {
        refetch();
        Swal.fire({
          position: "top-end",
          title: "Confirmed!",
          text: `Application to be a Rider has been ${status}`,
          showConfirmButton: "false",
          icon: "success",
          timer: 3000,
        });
      }
    });
  };

  const handleApprove = (rider) => {
    updateRiderStatus(rider, "Approved");
  };

  const handleReject = (rider) => {
    updateRiderStatus(rider, "Rejected");
  };

  return (
    <div>
      <h1 className="text-2xl md:text-5xl font-bold md:font-extrabold text-secondary md:mb-4">
        Pending Riders Approval Page
      </h1>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>SL.</th>
              <th>Name</th>
              <th>Region</th>
              <th>Warehouse</th>
              <th>Bike</th>
              <th>License</th>
              <th>Registration</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {riders.map((rider, i) => (
              <tr key={rider._id}>
                <th>{i + 1}</th>
                <td>{rider.riderName}</td>
                <td>{rider.riderRegion}</td>
                <td>{rider.riderDistrict}</td>
                <td>{rider.riderBike}</td>
                <td>{rider.riderLicense}</td>
                <td>{rider.riderReg}</td>
                <td>
                  <p
                    className={`${
                      rider.status === "Approved"
                        ? "bg-green-500 text-white text-center rounded-xs md:py-1"
                        : rider.status === "Rejected"
                        ? "bg-red-500 text-secondary text-center rounded-xs md:py-1"
                        : "bg-yellow-500 text-secondary text-center rounded-xs md:py-1"
                    }`}
                  >
                    {rider.status}
                  </p>
                </td>
                <td className="flex items-center md:gap-2">
                  <button
                    onClick={() => handleApprove(rider)}
                    className="btn btn-xs md:btn-sm btn-primary text-secondary"
                    disabled={
                      rider.status === "Rejected" || rider.status === "Approved"
                    }
                  >
                    Approve
                  </button>

                  <button
                    onClick={() => handleReject(rider)}
                    className="btn btn-xs md:btn-sm btn-secondary "
                    disabled={
                      rider.status === "Rejected" || rider.status === "Approved"
                    }
                  >
                    Reject
                  </button>

                  <button className="btn btn-xs md:btn-sm btn-error text-white">
                    Delete
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

export default ApproveRiders;
