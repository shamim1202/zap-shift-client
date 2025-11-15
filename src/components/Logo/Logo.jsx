import logo from "../../assets/logo.png";

const Logo = () => {
  return (
    <div className="flex items-end">
      <img src={logo} alt="Logo" />
      <span className="md:text-3xl md:font-bold md:-mb-1.5 md:-ms-3.5">
        ZapShift
      </span>
    </div>
  );
};

export default Logo;
