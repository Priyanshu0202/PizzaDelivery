import React from "react";
import Image from "next/image";
import Link from "next/link";

const Pizzacard = ({ pizza }) => {
  const description = pizza.desc;
  const truncateDescription = (description, maxLength) => {
    if (description.length > maxLength) {
      return description.substring(0, maxLength) + "...";
    }
    return description;
  };
  const truncatedDescription = truncateDescription(pizza.desc, 40);
  return (
    <div className="h-a lg:w-[25%] md:w-[30%] sm:w-[45%] w-[70%] p-10 flex flex-col justify-between items-center cursor-pointer hover:bg-gray-100 shadow-md">
      <Link href={`/product/${pizza._id}`}>
        <div className="w-[250px] h-[250px] relative">
          <Image
            src={pizza.img}
            alt="pizza"
            layout="fill"
            objectFit="cover"
            className=""
          />
        </div>
      </Link>
      <h1 className="text-lg font-bold text-red-500 py-2 text-center">
        {pizza.title}
      </h1>
      <span className="text-lg font-bold">Rs {pizza.prices[0]}</span>
      <p className="text-gray-700 text-left">{truncatedDescription}</p>
    </div>
  );
};

export default Pizzacard;
