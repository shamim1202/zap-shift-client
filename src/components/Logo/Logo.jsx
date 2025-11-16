import logo from "../../assets/logo.png";

const Logo = () => {
  return (
    <div className="flex items-end">
      <img className="w-7" src={logo} alt="Logo" />
      <span className="text-xl md:text-3xl font-bold md:font-extrabold -mb-1 -ms-3 md:-mb-2 md:-ms-3">
        ZapShift
      </span>
    </div>
  );
};

export default Logo;
