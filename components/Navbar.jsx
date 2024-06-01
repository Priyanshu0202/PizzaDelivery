"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { BsCart3 } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import { logout } from "../redux/authSlice";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [showbtn, setShowBtn] = useState(false);
  const quantity = useSelector((state) => state.cart.quantity);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    if (token) {
      setShowBtn(true);
    }
  }, [token]);

  const handleLogout = () => {
    dispatch(logout());
    setShowBtn(false);
    router.push("/");
  };
  return (
    <div
      className="flex bg-red-500 text-white items-center px-10 justify-between h-[100px] sticky top-0 z-10
      m-2"
    >
      <div className="flex items-center">
        <div className="mr-2">
          <Image
            src="/img/telephone.png"
            alt=""
            width={40}
            height={40}
            className="bg-white p-1 rounded-full"
          />
        </div>
        <div>
          <div className="text-sm font-semibold">ORDER NOW!</div>
          <div className="text-lg font-bold">012 345 678</div>
        </div>
      </div>
      <div className="">
        <ul className="flex items-center">
          <Link href="/" passHref>
            <li className="mx-5 text-xl cursor-pointer font-semibold hidden xl:block">
              HomePage
            </li>
          </Link>

          <li className="mx-5 xl:block cursor-pointer text-xl font-semibold hidden">
            Products
          </li>
          <li className="mx-5 xl:block cursor-pointer text-xl font-semibold  hidden">
            Menu
          </li>
          <Link href="/" passHref>
            <li className="mx-5 text-4xl font-medium font-sans cursor-pointer border-b-2 sm:block hidden">
              Pizza..Store
            </li>
          </Link>
          <li className="mx-5 text-xl cursor-pointer font-semibold hidden xl:block">
            Events
          </li>
          <li className="mx-5 cursor-pointer text-xl font-semibold hidden xl:block">
            Blog
          </li>
          <li className="mx-5 cursor-pointer text-xl font-semibold hidden xl:block">
            Contact
          </li>
        </ul>
      </div>

      <div className="relative p-1 flex">
        {showbtn && (
          <button
            onClick={handleLogout}
            className="bg-white text-red-500 px-4 py-2 rounded-full font-semibold mr-5"
          >
            Logout
          </button>
        )}
        <Link href="/cart" passHref>
          <span className="absolute font-semibold right-0 top-0 text-sm px-1 bg-white text-red-500 rounded-full ">
            {quantity}
          </span>
          <BsCart3 className="text-3xl" />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
