import React from "react";

const AddButton = ({ setClose }) => {
  return (
    <div
      onClick={() => setClose(false)}
      className="bg-red-500 text-white text-lg font-semibold rounded-lg p-2 m-2 w-[150px] cursor-pointer hover:bg-red-700"
    >
      Add New Pizza
    </div>
  );
};

export default AddButton;
