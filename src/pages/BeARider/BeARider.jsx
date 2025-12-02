import riderImg from "../../assets/agent-pending.png";
import { useForm, useWatch } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useLoaderData } from "react-router";
import Swal from "sweetalert2";

const BeARider = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { register, handleSubmit, control } = useForm();

  // get all region from api/json --------------->
  const allRegions = useLoaderData();
  const duplicateRegions = allRegions.map((c) => c.region);
  const regions = [...new Set(duplicateRegions)];
  const riderRegion = useWatch({ control, name: "riderRegion" });

  // show all district region wise -------------->
  const regionWiseDistricts = (region) => {
    const regionalDistricts = allRegions.filter((r) => r.region === region);
    const districts = regionalDistricts.map((d) => d.district);
    return districts;
  };

  const handleRiderApply = (data) => {
    console.log("Rider Entry Info Data", data);
    axiosSecure.post("/riders", data).then((res) => {
      if (res.data.insertedId) {
        Swal.fire({
          position: "top-end",
          title: "Confirmed!",
          text: "Your application has been submitted. Wait 72 hours until confirmation.",
          showConfirmButton: "false",
          icon: "success",
          timer: 5000,
        });
      }
    });
  };

  return (
    <div className="bg-white md:px-20 md:py-16">
      {/* ------------------ Image Side -------------------- */}
      <div className="md:w-[50%] md:mb-10">
        <h1 className="text-2xl md:text-5xl font-bold md:font-extrabold text-secondary md:mb-4">
          Be a Rider
        </h1>
        <p className="text-sm md:text-base text-accent">
          Enjoy fast, reliable parcel delivery with real-time tracking and zero
          hassle. From personal packages to business shipments — we deliver on
          time, every time.
        </p>
      </div>

      {/* ---------------- Form Info Side ------------------ */}
      <h3 className="md:text-2xl font-bold text-secondary">
        Tell Us About Yourself
      </h3>
      <div className="flex flex-col-reverse md:flex-row items-end justify-between md:gap-16">
        {/* ---------- Rider Join Form ----------- */}
        <div className="flex-1">
          <form
            onSubmit={handleSubmit(handleRiderApply)}
            className="fieldset p-4 rounded-xl"
          >
            {/* ------------ Name & Age ------------ */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Your Name</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered"
                  placeholder="Name"
                  {...register("riderName")}
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Your Age</span>
                </label>
                <input
                  type="number"
                  className="input input-bordered"
                  placeholder="Age"
                  {...register("riderAge")}
                />
              </div>
            </div>

            {/* ------------ Email & Contact ------------ */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Your Email</span>
                </label>
                <input
                  type="email"
                  className="input input-bordered"
                  placeholder="Email"
                  {...register("riderEmail")}
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Your Contact No.</span>
                </label>
                <input
                  type="number"
                  className="input input-bordered"
                  placeholder="Contact"
                  {...register("riderContact")}
                />
              </div>
            </div>

            {/* ------------ NID & Bike ------------ */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Your NID No.</span>
                </label>
                <input
                  type="number"
                  className="input input-bordered"
                  placeholder="NID Number"
                  {...register("riderNid")}
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Your Bike Info</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered"
                  placeholder="Bike Details"
                  {...register("riderBike")}
                />
              </div>
            </div>

            {/* ------------ Liscense & Registration ------------ */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Driving License No.</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered"
                  placeholder="Your License"
                  {...register("riderLicense")}
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Registration No.</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered"
                  placeholder="Your Vehicle Registration No"
                  {...register("riderReg")}
                />
              </div>
            </div>

            {/* --------- Rider region & Warehouse ---------- */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Your Region</span>
                </label>
                <select
                  className="select select-bordered w-full"
                  {...register("riderRegion")}
                >
                  <option disabled selected>
                    Select your region
                  </option>
                  {regions.map((r, i) => (
                    <option key={i} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">
                    Which warehouse you want to work?
                  </span>
                </label>
                <select
                  className="select select-bordered w-full"
                  {...register("riderDistrict")}
                >
                  <option disabled selected>
                    Select your Warehouse
                  </option>
                  {regionWiseDistricts(riderRegion).map((r, i) => (
                    <option key={i} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-control mt-2 flex flex-col">
              <label className="label">
                <span className="label-text">Your Address</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full"
                placeholder="Your Address"
                {...register("riderAddress")}
              />
            </div>

            {/* ------------ Submit Button ------------ */}
            <button className="btn btn-primary btn-sm md:btn-md text-secondary text-base mt-6">
              Apply As a Rider
            </button>
          </form>
        </div>

        <div className="flex-1">
          <img className="w-full" src={riderImg} alt="" srcset="" />
        </div>
      </div>
    </div>
  );
};

export default BeARider;
