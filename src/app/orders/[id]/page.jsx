"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";
const Order = ({ params }) => {
  useEffect(() => {
    fetchOrder();
  }, []);

  async function fetchOrder() {
    try {
      await axios
        .get(`https://pizza-delivery-iota.vercel.app/api/orders/${params.id}`)
        .then((res) => {
          setOrder(res.data);
          console.log(order);
        });
    } catch (error) {
      console.error("Error fetching pizza list:", error);
      throw new Error("Failed to fetch data");
    }
  }
  const [status, setStatus] = useState(0);
  const [order, setOrder] = useState(null);

  return (
    <div className="lg:flex m-2 py-20 lg:px-10 px-2 justify-between">
      {/* left div */}
      <div className="lg:w-[60%] w-full">
        <div className="mr-10 w-full">
          <table
            className="w-full text-center lg:table hidden"
            style={{ borderCollapse: "separate", borderSpacing: "0 12px" }}
          >
            <thead>
              <tr className="text-xl">
                <th>Order ID</th>
                <th>Customer</th>
                <th>Address</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 2 }, (_, index) => (
                <tr className="text-lg" key={index}>
                  <td>
                    <span className="uppercase text-red-500 text-xl">
                      {order?._id}
                    </span>
                  </td>
                  <td>
                    <span>{order?.customer}</span>
                  </td>
                  <td>
                    <span>{order?.address}</span>
                  </td>
                  <td>
                    <span>Rs {order?.total}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="lg:hidden block">
            {Array.from({ length: 1 }, (_, index) => (
              <div
                className="text-lg border-b border-gray-200 py-2"
                key={index}
              >
                <div className="py-1">
                  <span className="font-bold">Order ID: </span>
                  <span className="uppercase text-red-500 text-xl">
                    {order?._id}
                  </span>
                </div>
                <div className="py-1">
                  <span className="font-bold">Customer: </span>
                  <span>{order?.customer}</span>
                </div>
                <div className="py-1">
                  <span className="font-bold">Address: </span>
                  <span className=" lg:inline">{order?.address}</span>
                </div>
                <div className="py-1">
                  <span className="font-bold">Total: </span>
                  <span>Rs. {order?.total}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-between items-center lg:p-10 my-5  text-center ">
          <div
            className={`${
              status >= 0 ? "opacity-100" : "opacity-0"
            } flex flex-col items-center`}
          >
            <Image src="/img/paid.png" alt="" width="30" height="30" />
            <span>Payment</span>
            <div className="">
              <Image src="/img/checked.png" alt="" width="20" height="20" />
            </div>
          </div>
          <div
            className={`${
              status >= 0 ? "animate-pulse" : "opacity-0"
            } flex flex-col items-center`}
          >
            <Image src="/img/bake.png" alt="" width="30" height="30" />
            <span>Preparing</span>
            <div className="">
              <Image src="/img/checked.png" alt="" width="20" height="20" />
            </div>
          </div>
          <div className="flex flex-col items-center opacity-30">
            <Image src="/img/bike.png" alt="" width="32" height="32" />
            <span>On the way</span>
            <div className="">
              <Image src="/img/checked.png" alt="" width="20" height="20" />
            </div>
          </div>
          <div className="flex flex-col items-center opacity-30">
            <Image src="/img/delivered.png" alt="" width="30" height="30" />
            <span>Delivered</span>
            <div className="">
              <Image src="/img/checked.png" alt="" width="20" height="20" />
            </div>
          </div>
        </div>
      </div>
      {/* right div */}
      <div className="lg:w-[30%] max-w-2xl mx-auto bg-black/75 p-10 h-auto">
        <div className="">
          <h1 className="uppercase text-3xl font-bold mb-5 text-white">
            Cart Total
          </h1>
          <div className="text-xl p-1 text-white">
            <b>SubTotal:</b> Rs. {order?.total}
          </div>
          <div className="text-xl p-1 text-white">
            <b>Discount:</b> Rs. 0.00
          </div>
          <div className="text-xl p-1 text-white">
            <b className="">Total:</b> Rs. {order?.total}
          </div>
        </div>
        <button
          disabled
          className="text-white bg-red-500 px-2 py-1 rounded-lg w-full mt-5 h-12 uppercase font-bold text-xl"
        >
          PAID
        </button>
      </div>
    </div>
  );
};

export default Order;
