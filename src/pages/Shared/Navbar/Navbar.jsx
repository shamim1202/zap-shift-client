import { Link, NavLink } from "react-router";
import Logo from "../../../components/Logo/Logo";
import useAuth from "../../../hooks/useAuth";

const Navbar = () => {
  const { user, logOut } = useAuth();

  const links = (
    <>
      <li className="text-sm md:text-base font-semibold">
        <NavLink>Services</NavLink>
      </li>
      <li className="text-sm md:text-base font-semibold">
        <NavLink to="/coverage">Coverage</NavLink>
      </li>
      <li className="text-sm md:text-base font-semibold">
        <NavLink>Pricing</NavLink>
      </li>
      <li className="text-sm md:text-base font-semibold">
        <NavLink>About Us</NavLink>
      </li>
      <li className="text-sm md:text-base font-semibold">
        <NavLink>Blog</NavLink>
      </li>
      <li className="text-sm md:text-base font-semibold">
        <NavLink>Contact</NavLink>
      </li>
    </>
  );

  const handleLogout = () => {
    logOut()
      .then()
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="navbar bg-base-100 mb-4 md:mb-8">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>
        <Link to="/">
          <Logo></Logo>
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>

      <div className="navbar-end md:space-x-4">
        {user ? (
          <button
            onClick={handleLogout}
            className="btn btn-outline btn-secondary btn-sm md:btn-md"
          >
            Logout
          </button>
        ) : (
          <Link
            to="/login"
            className="btn btn-primary text-gray-900 btn-sm md:btn-md"
          >
            Log in
          </Link>
        )}

        <Link
          to="/be_a_rider"
          className="btn btn-primary text-gray-900 btn-sm md:btn-md"
        >
          Be a rider
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
