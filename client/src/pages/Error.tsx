import { Link } from "react-router-dom";
import errorImg from "../assets/amico.png";

const Error = () => {
  return (
    <div className="grid grid-cols-[1fr_2fr] gap-[146px] mx-[100px] my-[58px] items-center">
      {/* Illustration */}
      <img src={errorImg} alt="Page not found" />

      {/* Text content */}
      <div className="text-start flex flex-col gap-[25px] items-start">
        <h1 className="font-montserrat font-semibold text-[36px] leading-[43.88px] text-black m-0">
          Oops! <span className="text-[#974FD0]">Page Not Found</span>
        </h1>

        <p className="font-montserrat font-normal text-[20px] leading-[24.38px] tracking-[2%] text-black/80 m-0">
          The page you’re looking for doesn’t exist or may have been moved.
          Don’t worry you can always get back on track and continue managing
          your goals without missing a beat.
        </p>

        <Link
          to="/welcome"
          className="no-underline p-[16px] rounded-[10px] bg-[#974FD0] font-montserrat font-semibold text-[20px] text-white cursor-pointer"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default Error;
