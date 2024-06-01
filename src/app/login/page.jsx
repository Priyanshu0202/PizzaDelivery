"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../../redux/authSlice"; // Adjust the path to your authSlice

const Login = () => {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [error, setError] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const handleClick = async () => {
    try {
      const res = await axios.post(
        "https://pizza-delivery-iota.vercel.app/api/login",
        {
          username,
          password,
        }
      );
      if (res.status === 200) {
        dispatch(login({ token: res.data.token, isAdmin: res.data.isAdmin })); // Dispatch login action with token and admin status
        router.push("/admin"); // Redirect to admin page
      }
    } catch (err) {
      setError(true);
    }
  };

  return (
    <div className="max-w-lg rounded-lg mx-auto p-20 h-auto text-center flex items-center justify-center">
      <div className="flex flex-col font-semibold w-full">
        <h1 className="text-2xl p-2">Admin Dashboard</h1>
        <input
          placeholder="username"
          className="bg-gray-200 p-2 rounded-md my-2"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          placeholder="password"
          type="password"
          className="bg-gray-200 p-2 rounded-md"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={handleClick}
          className="bg-red-500 text-white font-semibold my-2 p-2 rounded-md hover:bg-red-700"
        >
          Sign In
        </button>
        {error && <span className="">Wrong Credentials!</span>}
      </div>
    </div>
  );
};

export default Login;
