import React from "react";

const Button = ({ onClick, id, label, color }) => {
  const colorButton = {
    Primary: "bg-primary ",
    Delete: "bg-delete",
  };

  const customColor = colorButton[color];

  return (
    <button
      onClick={onClick}
      id={id}
      className={
        `rounded-md text-white font-normal py-3 px-4 w-28 ` + `${customColor}`
      }
    >
      {label}
    </button>
  );
};

export default Button;
