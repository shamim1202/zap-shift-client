import riderImg from "../../assets/agent-pending.png";

const BeARider = () => {
  return (
    <div className="bg-white md:px-25 md:py-20">
      <div className="md:w-[45%] md:mb-10">
        <h1 className="text-2xl md:text-5xl font-bold md:font-extrabold text-secondary md:mb-4">
          Be a Rider
        </h1>
        <p className="text-sm md:text-base text-accent">
          Enjoy fast, reliable parcel delivery with real-time tracking and zero
          hassle. From personal packages to business shipments — we deliver on
          time, every time.
        </p>
      </div>

      <h3 className="md:text-2xl font-bold text-secondary">Tell Us About Yourself</h3>
      <div className="flex flex-col-reverse md:flex-row items-end justify-between md:gap-16">
        {/* ---------- Rider Join Form ----------- */}
        <div className="flex-1">
          <fieldset className="fieldset bg-base-200 p-4 rounded-xl">
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
                />
              </div>
            </div>

            {/* ------------ Email & Region ------------ */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Your Email</span>
                </label>
                <input
                  type="email"
                  className="input input-bordered"
                  placeholder="Email"
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Your Region</span>
                </label>
                <select className="select select-bordered">
                  <option disabled selected>
                    Select your region
                  </option>
                  <option>Dhaka</option>
                  <option>Barishal</option>
                  <option>Rajshahi</option>
                  <option>Khulna</option>
                  <option>Chottogram</option>
                  <option>Jessore</option>
                  <option>Shylet</option>
                </select>
              </div>
            </div>

            {/* ------------ NID & Contact ------------ */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Your NID No.</span>
                </label>
                <input
                  type="number"
                  className="input input-bordered"
                  placeholder="NID Number"
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
                />
              </div>
            </div>

            {/* ------------ Warehouse ------------ */}
            <div className="form-control mt-4">
              <label className="label">
                <span className="label-text">
                  Which warehouse you want to work?
                </span>
              </label>
              <select className="select select-bordered w-full">
                <option disabled selected>
                  Select Warehouse
                </option>
                <option>Dhaka</option>
                <option>Barishal</option>
                <option>Rajshahi</option>
                <option>Khulna</option>
                <option>Chottogram</option>
                <option>Jessore</option>
                <option>Shylet</option>
              </select>
            </div>

            {/* ------------ Submit Button ------------ */}
            <button className="btn btn-primary btn-sm md:btn-md text-gray-900 text-base mt-6">
              Submit
            </button>
          </fieldset>
        </div>

        <div className="flex-1">
          <img className="w-[80%] mx-auto" src={riderImg} alt="" srcset="" />
        </div>
      </div>
    </div>
  );
};

export default BeARider;
