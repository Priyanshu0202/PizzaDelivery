"use client";
import Featured from "../../components/Featured";
import Pizzalist from "../../components/Pizzalist";
import { useState, useEffect } from "react";
import AddButton from "../../components/AddButton";
import Add from "../../components/Add";
import { useSelector } from "react-redux";

export default function Home() {
  const [close, setClose] = useState(true);
  const isAdmin = useSelector((state) => state.auth.isAdmin);

  return (
    <div className="">
      <div className="">
        <Featured />
      </div>
      {isAdmin && <AddButton setClose={setClose} />}
      <div className="">
        <Pizzalist />
      </div>
      {!close && <Add setClose={setClose} />}
    </div>
  );
}
