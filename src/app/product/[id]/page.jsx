"use client";
import axios from "axios";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addProduct } from "../../../../redux/cartSlice";

const Product = ({ params }) => {
  const dispatch = useDispatch();
  const [pizza, setPizza] = useState(null);
  const [size, setSize] = useState(0);
  const [price, setPrice] = useState(0);
  const [extras, setExtras] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPizza();
  }, [params.id]);

  useEffect(() => {
    if (pizza) {
      setPrice(pizza.prices[0]); // Set price once pizza data is fetched
    }
  }, [pizza]);

  async function fetchPizza() {
    try {
      const res = await axios.get(
        `https://pizza-delivery-iota.vercel.app/api/products/${params.id}`
      );
      setPizza(res.data);
      setLoading(false);
    } catch (error) {
      setError("Error fetching pizza list");
      setLoading(false);
    }
  }

  const changePrice = (number) => {
    setPrice((prevPrice) => prevPrice + number);
  };

  const handleSize = (sizeIdx) => {
    const diff = pizza.prices[sizeIdx] - pizza.prices[size];
    setSize(sizeIdx);
    changePrice(diff);
  };

  const handleChange = (e, option) => {
    const checked = e.target.checked;

    if (checked) {
      changePrice(option.price);
      setExtras((prev) => [...prev, option]);
    } else {
      changePrice(-option.price);
      setExtras((prev) => prev.filter((extra) => extra._id !== option._id));
    }
  };

  const handleClick = () => {
    dispatch(addProduct({ ...pizza, extras, price, quantity }));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="md:flex h-auto justify-center">
      <div className="flex xl:w-[50%] lg:w-[40%] sm:w-[40%] w-[70%] lg:h-[80vh] mx-auto mt-20 justify-end">
        <div className="mx-auto">
          <Image src={pizza?.img} alt={pizza?.title} width="500" height="500" />
        </div>
      </div>
      <div className="flex-col p-2 w-[50%] text-center mx-auto lg:text-left mt-20">
        <h1 className="text-3xl font-bold mb-10">{pizza?.title}</h1>
        <span className="text-2xl text-red-500 font-medium border-red-500 border-b-4 pb-1">
          Rs.{price}
        </span>
        <p className="lg:text-xl text-lg mt-5">{pizza?.desc}</p>
        <h1 className="mt-5 text-2xl font-bold mb-5">Choose the size</h1>
        <div className="sm:flex">
          {["Small", "Medium", "Large"].map((sizeLabel, index) => (
            <div
              key={sizeLabel}
              className="mr-20 relative mb-2"
              onClick={() => handleSize(index)}
            >
              <Image
                src="/img/size.png"
                width={70 + 20 * index}
                height={70 + 20 * index}
                className="mx-auto"
                alt={sizeLabel}
              />
              <span className="absolute bg-green-400 text-lg px-2 rounded-full top-0 left-12">
                {sizeLabel}
              </span>
            </div>
          ))}
        </div>
        <h1 className="my-5 md:text-2xl text-xl font-bold">
          Choose additional ingredients
        </h1>
        <div className="lg:flex">
          {pizza?.extraOption.map((option) => (
            <div className="mr-5 text-xl" key={option._id}>
              <input
                type="checkbox"
                id={option.text}
                name={option.text}
                className="scale-125"
                onChange={(e) => handleChange(e, option)}
              />
              <label htmlFor={option.text} className="ml-1">
                {option.text}
              </label>
            </div>
          ))}
        </div>
        <div className="mt-10">
          <input
            type="number"
            defaultValue={1}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
            className="border border-black w-16 text-lg rounded-sm px-1"
            min="1"
          />
          <button
            onClick={handleClick}
            className="text-white bg-red-500 font-semibold px-2 rounded-md ml-5 h-8 text-lg"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;
