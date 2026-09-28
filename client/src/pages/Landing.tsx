import { Link } from "react-router-dom";
import component from "../assets/Component.svg";

const Landing = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <div className="flex flex-col md:flex-row items-center gap-10">
        <div className="flex-1">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
            Manage your Tasks on{" "}
            <span className="text-[#974FD0]">TaskDuty</span>
          </h1>
          <p className="text-gray-500 mt-4 text-sm leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Non tellus,
            sapien, morbi ante nunc euismod ac felis ac. Massa et, at platea
            tempus duis non eget. Hendrerit tortor fermentum bibendum mi nisl
            semper porttitor. Nec accumsan.
          </p>
          <Link
            to="/"
            className="flex flex-col items-center md:inline-block mt-6 bg-[#974FD0] text-white px-6 py-3 rounded-lg font-semibold text-sm"
          >
            Go to My Tasks
          </Link>
        </div>

        <div className="flex-1 w-full">
          <img src={component} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Landing;
