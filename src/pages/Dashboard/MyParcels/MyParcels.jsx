import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const MyParcels = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: parcels = [] } = useQuery({
    queryKey: ["myParcels", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?email=${user?.email}`);
      return res.data;
    },
  });
  return (
    <div>
      <h1 className="text-2xl md:text-5xl font-bold md:font-extrabold text-secondary md:mb-8">
        All my parcels {parcels.length}
      </h1>
    </div>
  );
};

export default MyParcels;
