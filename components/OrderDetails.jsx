import { useState } from "react";
import styles from "../styles/OrderDetail.module.css";

const OrderDetail = ({ total, createOrder }) => {
  const [customer, setCustomer] = useState("");
  const [address, setAddress] = useState("");

  const handleClick = () => {
    createOrder({ customer, address, total, method: 0 });
  };

  return (
    <div className={styles.container}>
      <div className="flex flex-col bg-white p-8 rounded-lg justify-center items-center">
        <h1 className="text-2xl my-4">You will pay Rs12 after delivery.</h1>
        <div className="flex flex-col w-full">
          <label className="">Name Surname</label>
          <input
            placeholder="John Doe"
            type="text"
            className="p-2 bg-gray-100"
            onChange={(e) => setCustomer(e.target.value)}
          />
        </div>
        <div className="flex flex-col w-full my-3">
          <label className="">Phone Number</label>
          <input
            type="text"
            placeholder="+1 234 567 89"
            className="bg-gray-100 p-2"
          />
        </div>
        <div className="flex flex-col w-full">
          <label className="">Address</label>
          <textarea
            rows={5}
            placeholder="Elton St. 505 NY"
            type="text"
            className="bg-gray-100 rounded-md p-2"
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <button
          className="bg-green-300 text-lg p-2 items-center justify-center text-center rounded-md m-2 w-full hover:bg-green-400 uppercase"
          onClick={handleClick}
        >
          Order
        </button>
      </div>
    </div>
  );
};

export default OrderDetail;
