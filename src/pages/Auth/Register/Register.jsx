import axios from "axios";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import Logo from "../../../components/Logo/Logo";
import useAuth from "../../../hooks/useAuth";

const Register = () => {
  const { registerUser, updateUserProfile } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const location = useLocation()
  const navigate = useNavigate()
  console.log(location)

  const handleRegister = (data) => {
    const profileImg = data.photo[0];

    registerUser(data.email, data.password)
      .then((res) => {
        console.log(res.user);
        const formData = new FormData();
        formData.append("image", profileImg);
        const imgApiUrl = `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_image_hoisting
        }`;

        axios.post(imgApiUrl, formData).then((res) => {

          const userProfile = {
            displayName: data.name,
            photoURL: res.data.data.url,
          };
          updateUserProfile(userProfile)
            .then(() => {
              console.log("User Profile Update Successful");
              navigate=(location?.state ? location.state || "/")
            })
            .catch((err) => {
              console.log(err);
            });
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <div className="py-2 md:py-5">
        <Link to="/">
          <Logo></Logo>
        </Link>
      </div>

      <div className="w-2/3 mx-auto">
        <div>
          <h1 className="text-2xl md:text-5xl font-bold md:font-extrabold">
            Create an Account
          </h1>
          <p className="text-gray-800 text-sm md:text-base md:py-2">
            Register with ZapShift
          </p>
        </div>

        <form onSubmit={handleSubmit(handleRegister)}>
          <fieldset className="fieldset">
            {/* -------------- Name ------------- */}
            <label className="label text-gray-900 text-xs md:text-sm md:font-medium">
              Name
            </label>
            <input
              type="text"
              {...register("name", {
                required: true,
                minLength: 4,
              })}
              className="input w-full md:mb-2 text-sm md:text-base"
              placeholder="Name"
            />
            {errors.name?.type === "required" && (
              <p className="text-red-500 text-xs md:text-sm">
                Name is required!
              </p>
            )}

            {errors.name?.type === "minLength" && (
              <p className="text-red-500 text-xs md:text-sm">
                Minimum 4 characters
              </p>
            )}

            {/* -------------- Photo ------------ */}
            <label className="label text-gray-900 text-xs md:text-sm md:font-medium">
              Photo
            </label>
            <input
              type="file"
              {...register("photo", { required: true })}
              className="file-input w-full md:mb-2 text-sm md:text-base"
              placeholder="Your photo"
            />
            {errors.photo?.type === "required" && (
              <p className="text-red-500 text-xs md:text-sm">
                A profile photo is required!
              </p>
            )}

            {/* -------------- Email ------------ */}
            <label className="label text-gray-900 text-xs md:text-sm md:font-medium">
              Email
            </label>
            <input
              type="email"
              {...register("email", { required: true })}
              className="input w-full md:mb-2 text-sm md:text-base"
              placeholder="Email"
            />
            {errors.email?.type === "required" && (
              <p className="text-red-500 text-xs md:text-sm">
                A valid email is required!
              </p>
            )}

            <label className="label text-gray-900 text-xs md:text-sm md:font-medium">
              Password
            </label>
            <input
              type="password"
              {...register("password", {
                required: true,
                minLength: 6,
                pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/,
              })}
              className="input w-full md:mb-2 text-sm md:text-base"
              placeholder="Password"
            />
            {errors.password?.type === "required" && (
              <p className="text-red-500 text-xs md:text-sm">
                A valid password is required!
              </p>
            )}

            {errors.password?.type === "minLength" && (
              <p className="text-red-500 text-xs md:text-sm">
                Password should be at least 6 characters or more!
              </p>
            )}
            {errors.password?.type === "pattern" && (
              <p className="text-red-500 text-xs md:text-sm">
                Password must be at least 1 Uppercase, 1 lowercase, 1 number & 1
                special character
              </p>
            )}

            <button className="btn btn-primary text-black mt-4">
              Register Now
            </button>
          </fieldset>
        </form>

        <div className="md:mt-2">
          <p className="text-accent text-xs md:text-sm md:font-medium">
            Already have an account?{" "}
            <Link
              to="/login"
              state={location?.state}
              className="text-primary hover:text-red-500 hover:underline"
            >
              Login
            </Link>{" "}
          </p>
        </div>

        <div className="divider md:my-3 p-0">Or</div>

        {/* Google */}
        <button className="btn bg-base-200 hover:bg-base-300 text-black border-[#e5e5e5] w-full">
          <svg
            aria-label="Google logo"
            width="16"
            height="16"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <g>
              <path d="m0 0H512V512H0" fill="#fff"></path>
              <path
                fill="#34a853"
                d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
              ></path>
              <path
                fill="#4285f4"
                d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
              ></path>
              <path
                fill="#fbbc02"
                d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
              ></path>
              <path
                fill="#ea4335"
                d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
              ></path>
            </g>
          </svg>
          Login with Google
        </button>
      </div>
    </div>
  );
};

export default Register;
