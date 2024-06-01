import React from "react";
import Image from "next/image";
const Footer = () => {
  return (
    <div className="sm:flex xs:flex-col uppercase bg-black/80 mt-10 mx-2">
      <div className="md:w-[40%] lg:block hidden">
        <Image
          src="/img/bg.png"
          alt=""
          width="500"
          height="400"
          className="h-[500px] w-[800px]"
        />
      </div>
      <div className="xs:flex-col w-[60%] sm:flex justify-center mt-10 mx-auto px-5">
        <div className="font-bold sm:text-3xl text-2xl pt-5  text-white">
          <h2 className="text-center sm:text-left mt-10 px-5">
            Oh yes,we did. <br /> The pizza store, well baked <br /> slice of
            pizza
          </h2>
        </div>
        <div className="px-5 text-center sm:text-left mt-10 sm:mt-0">
          <h1 className="text-yellow-500 font-bold text-2xl">
            find our restaurant
          </h1>
          <p className="py-5 text-white text-lg">
            1654 R, Don Road #308,
            <br /> Sector-6, Dwarka
            <br />
            New Delhi-110089
          </p>
          <p className="py-5 text-white text-lg">
            1654 R, Don Road #308,
            <br /> Sector-6, Dwarka
            <br />
            New Delhi-110089
          </p>
        </div>
        <div className="px-5 text-center sm:text-left mt-10 sm:mt-0">
          <h1 className="text-yellow-500 font-bold text-2xl">Working hours</h1>
          <p className="py-5 text-white text-lg">
            monday unitl friday
            <br />
            9:00 - 22:00
          </p>
          <p className="text-white text-lg pb-10 sm:pb-0">
            Saturday-sunday
            <br />
            12:00 - 24:00
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
