import AwesomeSlider from "react-awesome-slider";
import "react-awesome-slider/dist/styles.css";

import styled from "styled-components";

const StyledSlider = styled(AwesomeSlider)`
  .aws-btn {
    background-color: #4caf50!important; /* Change arrow background color */
    color: white !important; /* Change arrow icon color */
  }

  .aws-btn:hover {
    background-color: #388e3c !important; /* Change arrow hover background */
  }

  .aws-sld__bullets .aws-sld__bullets-item {
    background-color: #cccccc; /* Inactive bullet */
  }

  .aws-sld__bullets .aws-sld__bullets-item--active {
    background-color: #4caf50; /* Active bullet */
  }
`;

const Banner = () => {
  return (
    <StyledSlider className="sm:h-[400px] h-[610px]">
      <div className="bg-gradient-to-t from-teal-700 to-black sm:flex items-center justify-center  h-full gap-3  px-4">
        <div className="sm:w-1/2">
          <h2 className="text-white text-xl border-b-2 border-[#00F9AA]">
            Lets talk about
          </h2>
          <h2 className="text-5xl text-[#00F9AA] font-bold my-4">
            Visa for work what you need to know
          </h2>
          <h2 className="text-gray-300">
            Discover everything for a work need to know about a visa for
            tour. Learn the important rule for go to abroad and enjoy your
            tour,and benifits in your journey. Best of luck.
          </h2>
        </div>
        <div className="sm:w-1/2">
          <img src="/assets/work.png" alt="" className="w-full " />
        </div>
      </div>
      <div className="bg-gradient-to-t from-teal-700 to-black sm:flex items-center justify-center h-full gap-3 px-4">
        <div className="sm:w-1/2">
          <h2 className="text-white text-xl border-b-2 border-[#00F9AA]">
            Lets talk about
          </h2>
          <h2 className="text-5xl text-[#00F9AA] font-bold my-4">
            Visa for tourist what you need to know
          </h2>
          <h2 className="text-gray-300">
            Discover everything for a tourist need to know about a visa for
            tour. Learn the important rule for go to abroad and enjoy your
            tour,and benifits in your journey. Best of luck.
          </h2>
        </div>
        <div className="sm:w-1/2">
          <img src="/assets/tour-1.png" alt="" className="w-full " />
        </div>
      </div>
      <div className="bg-gradient-to-t from-teal-700 to-black sm:flex items-center justify-center h-full gap-3 px-4">
        <div className="sm:w-1/2">
          <h2 className="text-white text-xl border-b-2 border-[#00F9AA]">
            Lets talk about
          </h2>
          <h2 className="text-5xl text-[#00F9AA] font-bold my-4">
            Visa for student what you need to know
          </h2>
          <h2 className="text-gray-300">
            Discover everything for a student need to know about a visa for
            tour. Learn the important rule for go to abroad and enjoy your
            tour,and benifits in your journey.and well study, Best of luck.
          </h2>
        </div>
        <div className="sm:w-1/2">
          <img src="/assets/visa.png" alt="" className="w-full " />
        </div>
      </div>
    </StyledSlider>
  );
};

export default Banner;
