import React from "react";

const Input = ({ type, id, onChange, value, placeholder, required }) => {
  return (
    <input
      required={required}
      onChange={onChange}
      id={id}
      type={type}
      placeholder={placeholder}
      value={value}
      className="w-full border border-graynew placeholder:text-graynew text-black rounded-md py-2 px-3 font-light"
    />
  );
};

export default Input;
