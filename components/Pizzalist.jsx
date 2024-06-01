"use client";
import React, { useEffect, useState } from "react";
import Pizzacard from "./Pizzacard";
import axios from "axios";

const Pizzalist = () => {
  const [pizzaList, setPizzaList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function fetchPizzaList() {
    try {
      const res = await axios.get(
        "https://pizza-delivery-iota.vercel.app/api/products"
      );
      setPizzaList(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching pizza list:", error);
      setError("Failed to fetch data");
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchPizzaList();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="flex flex-col items-center max-w-7xl mx-auto mt-20">
      <h1 className="uppercase border-b-2 border-black text-red-500 font-bold md:text-3xl text-2xl text-center">
        The Best Pizza in Town
      </h1>
      <p className="text-xl text-center p-2 mt-10 text-gray-800">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci in
        accusantium voluptatum provident ut reprehenderit quia quibusdam
        recusandae voluptates velit! Lorem ipsum dolor, sit amet consectetur
        adipisicing elit. Ea fuga dolores atque. Odio fuga blanditiis aliquid
        dolor temporibus quisquam aliquam.
      </p>
      <div className="flex justify-center items-center mt-10 flex-wrap w-full text-center">
        {pizzaList.map((pizza) => (
          <Pizzacard key={pizza._id} pizza={pizza} />
        ))}
      </div>
    </div>
  );
};

export default Pizzalist;
