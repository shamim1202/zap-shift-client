import { useForm, useWatch } from "react-hook-form";
import { useLoaderData, useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const SendParcel = () => {
  const { register, handleSubmit, control } = useForm();

  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  // get all region from api/json --------------->
  const allRegions = useLoaderData();
  const duplicateRegions = allRegions.map((c) => c.region);
  const regions = [...new Set(duplicateRegions)];
  const senderRegion = useWatch({ control, name: "senderRegion" });
  const receiverRegion = useWatch({ control, name: "receiverRegion" });

  // show all district region wise -------------->
  const regionWiseDistricts = (region) => {
    const regionalDistricts = allRegions.filter((r) => r.region === region);
    const districts = regionalDistricts.map((d) => d.district);
    return districts;
  };

  const handleSendParcel = (data) => {
    console.log(data);

    const isDocument = data.parcelType === "document";
    const isSameDistrict = data.senderDistrict === data.receiverDistrict;
    const parcelWeight = parseFloat(data.parcelWeight);
    let cost = 0;

    if (isDocument) {
      cost = isSameDistrict ? 60 : 80;
    } else {
      if (parcelWeight < 3) {
        cost = isSameDistrict ? 110 : 150;
      } else {
        const minCharge = isSameDistrict ? 110 : 150;
        const extraWeight = parcelWeight - 3;
        const extraCharge = isSameDistrict
          ? extraWeight * 40
          : extraWeight * 40 + 40;
        cost = minCharge + extraCharge;
      }
    }

    data.cost = cost;
    console.log("cost calculation", cost);

    Swal.fire({
      title: "Are you agree with sending cost?",
      text: `Your cost: ${cost}taka; You won't be able to cancel this!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirm & Continue",
    }).then((result) => {
      if (result.isConfirmed) {
        // Save the parcel into the database ----------------------->
        axiosSecure.post("/parcels", data).then((res) => {
          console.log("after confirmed", res.data);
          if (res.data.insertedId) {
            Swal.fire({
              position: "top-end",
              title: "Confirmed!",
              text: "Parcel Created, Please Pay.",
              showConfirmButton: "false",
              icon: "success",
              timer: 2000,
            });
            navigate("/dashboard/my_parcels");
          }
        });
      }
    });
  };

  return (
    <div className="md:px-20 md:py-16">
      <h1 className="text-2xl md:text-5xl font-bold md:font-extrabold text-secondary md:mb-8">
        Send Parcel
      </h1>
      <div>
        <h3 className="text-lg md:text-2xl font-bold text-secondary">
          Enter Your Parcel Details
        </h3>
        <form onSubmit={handleSubmit(handleSendParcel)}>
          {/* ------- Parcel type ------- */}
          <div className="md:space-x-8 md:py-4">
            <label className="font-bold">
              <input
                {...register("parcelType")}
                type="radio"
                value="document"
                className="radio md:mr-2"
                defaultChecked
              />{" "}
              Document
            </label>

            <label className="font-bold">
              <input
                {...register("parcelType")}
                type="radio"
                value="non-document"
                className="radio md:mr-2"
              />{" "}
              Non-Document
            </label>
          </div>

          {/* ------- Parcel Info (Name & Weight) ------- */}
          <div className="grid grid-cols-1 md:grid-cols-2 md:gap-10 items-center">
            <fieldset className="fieldset">
              <label className="label text-xs md:text-sm">Parcel Name</label>
              <input
                type="text"
                className="input w-full"
                placeholder="Parcel Name"
                {...register("parcelName")}
              />
            </fieldset>

            <fieldset>
              <label className="label text-xs md:text-sm">Parcel Weight</label>
              <input
                type="text"
                className="input w-full"
                placeholder="Parcel Weight (kg)"
                {...register("parcelWeight")}
              />
            </fieldset>
          </div>

          {/* ------ Sender and Receiver Info -------- */}
          <div className="flex flex-col md:flex-row md:gap-10">
            {/* ------- Sender Info -------- */}
            <div className="flex-1">
              <h3 className="text-base md:text-lg font-bold text-secondary">
                Sender Details
              </h3>
              <div>
                <fieldset className="fieldset">
                  {/* ----- Sender Name and E-mail ----- */}
                  <div className="flex flex-col md:flex-row">
                    <div>
                      {/* ----- sender name */}
                      <label className="label text-xs md:text-sm">
                        Sender Name
                      </label>
                      <input
                        type="text"
                        className="input w-full"
                        defaultValue={user?.displayName}
                        readOnly
                        {...register("senderName")}
                      />
                    </div>
                    <div>
                      {/* ----- sender email */}
                      <label className="label text-xs md:text-sm">
                        Sender Email
                      </label>
                      <input
                        type="email"
                        className="input w-full"
                        defaultValue={user?.email}
                        readOnly
                        {...register("senderEmail")}
                      />
                    </div>
                  </div>

                  {/* -------- Sender Phone No -------- */}
                  <label className="label text-xs md:text-sm">
                    Sender Phone No
                  </label>
                  <input
                    type="number"
                    className="input w-full"
                    placeholder="Sender Phone"
                    {...register("senderPhone")}
                  />

                  {/* ----- Sender Region and District ----- */}
                  <div className="flex flex-col md:flex-row">
                    <div className="flex-1">
                      {/* ------- Sender Region -------- */}
                      <label className="label text-xs md:text-sm">
                        Sender Region
                      </label>
                      <select
                        className="select select-bordered w-full"
                        {...register("senderRegion")}
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

                    <div className="flex-1">
                      {/* -------- Sender District -------- */}
                      <label className="label text-xs md:text-sm">
                        Sender District
                      </label>
                      <select
                        className="select select-bordered w-full"
                        {...register("senderDistrict")}
                      >
                        <option disabled selected>
                          Select your District
                        </option>
                        {regionWiseDistricts(senderRegion).map((r, i) => (
                          <option key={i} value={r}>
                            {r}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* ---- Sender Address ----- */}
                  <label className="label text-xs md:text-sm">
                    Sender Address
                  </label>
                  <input
                    type="text"
                    className="input w-full"
                    placeholder="Sender Address"
                    {...register("senderAddress")}
                  />

                  {/* -------- Sender Instruction No -------- */}
                  <label className="label text-xs md:text-sm">
                    Pickup Instructions
                  </label>
                  <textarea
                    type="text"
                    className="textarea w-full"
                    placeholder="Parcel Pickup Instructions"
                    {...register("senderParcelIns")}
                  />
                </fieldset>
              </div>
            </div>

            {/* -------- Receiver Info --------- */}
            <div className="flex-1">
              <h3 className="text-base md:text-lg font-bold text-secondary">
                Receiver Details
              </h3>
              <div>
                <fieldset className="fieldset">
                  {/* ----- Receiver name */}
                  <label className="label text-xs md:text-sm">
                    Receiver Name
                  </label>
                  <input
                    type="text"
                    className="input w-full"
                    placeholder="Receiver Name"
                    {...register("receiverName")}
                  />
                  {/* ----- Receiver email */}
                  <label className="label text-xs md:text-sm">
                    Receiver Email
                  </label>
                  <input
                    type="email"
                    className="input w-full"
                    placeholder="Receiver Email"
                    {...register("receiverEmail")}
                  />
                  {/* ---- Receiver Address ----- */}
                  <label className="label text-xs md:text-sm">
                    Receiver Address
                  </label>
                  <input
                    type="text"
                    className="input w-full"
                    placeholder="Receiver Address"
                    {...register("receiverAddress")}
                  />

                  {/* ------- Receiver Region -------- */}
                  <label className="label text-xs md:text-sm">
                    Receiver Region
                  </label>
                  <select
                    className="select select-bordered w-full"
                    {...register("receiverRegion")}
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

                  <label className="label text-xs md:text-sm">
                    Receiver District
                  </label>
                  <select
                    className="select select-bordered w-full"
                    {...register("receiverDistrict")}
                  >
                    <option disabled selected>
                      Select your District
                    </option>
                    {regionWiseDistricts(receiverRegion).map((d, i) => (
                      <option key={i} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>

                  {/* -------- Receiver Phone No -------- */}
                  <label className="label text-xs md:text-sm">
                    Receiver Phone No
                  </label>
                  <input
                    type="number"
                    className="input w-full"
                    placeholder="Receiver Phone"
                    {...register("receiverPhone")}
                  />
                </fieldset>
              </div>
            </div>
          </div>

          <p className="text-sm md:text-base font-bold py-2 md:py-4 my-3 md:my-6">
            *Pick-up time 4pm to 7pm Approx
          </p>
          <button
            type="submit"
            className="btn btn-sm md:btn-md btn-primary text-gray-900 md:text-base font-bold"
          >
            Proceed to confirm booking
          </button>
        </form>
      </div>
    </div>
  );
};

export default SendParcel;
