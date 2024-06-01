"use client";
import React from "react";
import { useState } from "react";
import { FaChevronRight } from "react-icons/fa";
import { FaChevronLeft } from "react-icons/fa";
import Image from "next/image";
const Featured = () => {
  const images = [
    "/img/featured1.jpg",
    "/img/featured2.jpg",
    "/img/featured3.jpg",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="relative">
      <div className=" lg:max-w-[1600px] md:max-w-[1000px] sm:max-w-[800px] xl:h-[820px] lg:h-[600px] md:h-[550px] sm:h-[400px] h-[250px] w-full m-auto group">
        {images.map((img, index) => (
          <div
            key={index}
            className={`w-full xl:h-[820px] lg:h-[600px] md:h-[550px] sm:h-[400px] h-[250px] bg-center bg-cover rounded-2xl duration-500 absolute top-0 left-0 ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={img}
              alt={`Image ${index}`}
              layout="fill"
              className="px-2"
            />
          </div>
        ))}

        <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 md:text-2xl text-md">
          <FaChevronLeft
            className="text-white lg:size-[100px] sm:size-[70px] size-[50px]  p-1 bg-red-500 rounded-full"
            onClick={prevSlide}
          />
        </div>
        <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 md:text-2xl text-md">
          <FaChevronRight
            className="lg:size-[100px] sm:size-[70px] size-[50px] text-white p-1 bg-red-500 rounded-full"
            onClick={nextSlide}
          />
        </div>
      </div>
    </div>
  );
};

export default Featured;
