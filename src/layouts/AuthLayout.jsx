import { Outlet } from "react-router";
import authImg from "../assets/authImage.png";
import Logo from "../components/Logo/Logo";


const AuthLayout = () => {
    return (
        <div className="max-w-7xl mx-auto">
            {/* <div className="md:py-8">
                <Logo></Logo>
            </div> */}
            <div className="flex items-center bg-[#fafdf0]">
                <div className="flex-1 bg-white">
                    <Outlet></Outlet>
                </div>
                <div className="flex-1">
                    <img className="w-full" src={authImg} alt="" />
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;