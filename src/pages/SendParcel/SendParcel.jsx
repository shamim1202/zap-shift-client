import { useForm } from "react-hook-form";
import { useLoaderData } from "react-router";

const SendParcel = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  // get all region from api/json --------------->
  const allRegions = useLoaderData();
  const duplicateRegions = allRegions.map((c) => c.region);
  const regions = [...new Set(duplicateRegions)];
  const senderRegion = watch("senderRegion");
  console.log(regions);

  // show all district region wise -------------->
  const regionWiseDistricts = (region) => {
    const regionalDistricts = allRegions.filter((r) => r.region === region);
    const districts = regionalDistricts.map((d) => d.district);
    return districts;
  };

  const handleSendParcel = (data) => {
    console.log(data);
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
          <div className="grid grid-cols-1 md:grid-cols-2 md:gap-10">
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
                type="number"
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
                  {/* ----- sender name */}
                  <label className="label text-xs md:text-sm">
                    Sender Name
                  </label>
                  <input
                    type="text"
                    className="input w-full"
                    placeholder="Sender Name"
                    {...register("senderName")}
                  />
                  {/* ----- sender email */}
                  <label className="label text-xs md:text-sm">
                    Sender Email
                  </label>
                  <input
                    type="email"
                    className="input w-full"
                    placeholder="Sender Email"
                    {...register("senderEmail")}
                  />
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
                  <fieldset>
                    <label className="label text-xs md:text-sm block md:pb-1">
                      Receiver Region
                    </label>
                    <select className="select select-bordered w-full">
                      <option disabled selected>
                        Select your region
                      </option>
                      {regions.map((r, i) => (
                        <option key={i} value={r}>
                          {r}
                        </option>
                      ))}
                    </select>
                  </fieldset>
                  {/* -------- Receiver District -------- */}
                  <label className="label text-xs md:text-sm">
                    Receiver District
                  </label>
                  <input
                    type="text"
                    className="input w-full"
                    placeholder="Receiver District"
                    {...register("receiverDistrict")}
                  />

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
