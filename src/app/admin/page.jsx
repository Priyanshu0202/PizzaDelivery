"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";

const Page = () => {
  useEffect(() => {
    fetchPizza();
    fetchOrder();
  }, []);

  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const status = ["preparing", "on the way", "delivered"];

  async function fetchPizza() {
    try {
      const res = await axios.get(
        `https://pizza-delivery-iota.vercel.app/api/products/`
      );
      setProducts(res.data);
    } catch (error) {
      console.error("Error fetching pizza list:", error);
      throw new Error("Failed to fetch data");
    }
  }

  async function fetchOrder() {
    try {
      const res = await axios.get(
        `https://pizza-delivery-iota.vercel.app/api/orders/`
      );
      setOrders(res.data);
    } catch (error) {
      console.error("Error fetching order list:", error);
      throw new Error("Failed to fetch data");
    }
  }

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `https://pizza-delivery-iota.vercel.app/api/products/${id}`
      );
      setProducts(products.filter((product) => product._id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleStatus = async (id) => {
    const item = orders.find((order) => order._id === id);
    const currentStatus = item.status;
    try {
      const res = await axios.put(
        `https://pizza-delivery-iota.vercel.app/api/orders/${id}`,
        {
          status: currentStatus + 1,
        }
      );
      setOrders([res.data, ...orders.filter((order) => order._id !== id)]);
    } catch (err) {
      console.error("Error updating order status:", err);
    }
  };

  return (
    <div className="m-2 p-4 flex flex-col lg:flex-row lg:h-screen space-y-6 lg:space-y-0 lg:space-x-6 space-x-5 ">
      <div className="w-full lg:w-1/2 ">
        <h1 className="text-3xl font-semibold mb-4">Products</h1>
        <div className="overflow-x-auto ">
          <table className="w-full text-left">
            <thead>
              <tr className="text-md">
                <th>Image</th>
                <th>Id</th>
                <th>Title</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id} className="border-b">
                  <td>
                    <Image
                      src={product.img}
                      width={60}
                      height={60}
                      objectFit="cover"
                      alt=""
                    />
                  </td>
                  <td>{product._id.slice(0, 5)}...</td>
                  <td>{product.title}</td>
                  <td>Rs {product.prices[0]}</td>
                  <td className="flex">
                    <button className="bg-teal-500 text-white font-medium px-3 py-1 rounded-lg mr-2">
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white font-medium px-2 py-1 rounded-lg"
                      onClick={() => handleDelete(product._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="w-full lg:w-1/2">
        <h1 className="text-3xl font-semibold mb-4">Orders</h1>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr>
                <th>Id</th>
                <th>Customer</th>
                <th>Total</th>
                <th>Payment</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id} className="border-b">
                  <td>{order._id.slice(0, 5)}...</td>
                  <td>{order.customer}</td>
                  <td>${order.total}</td>
                  <td>{order.method === 0 ? "cash" : "paid"}</td>
                  <td>{status[order.status]}</td>
                  <td>
                    <button
                      className="bg-gray-200 px-2 rounded-md"
                      onClick={() => handleStatus(order._id)}
                    >
                      Next Stage
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Page;
