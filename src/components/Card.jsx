import React from "react";

const Card = ({ text, image, likes, tags, first, last, clickImage }) => {
  return (
    <div className="w-full h-full rounded-none flex flex-col justify-center shadow-lg ">
      <label htmlFor="img">
        <img
          onClick={clickImage}
          className="md:h-56 md:w-56 object-cover cursor-pointer"
          src={image}
        />
      </label>
      <div className="flex flex-col items-start justify-start p-2 text-graynew break-words ">
        <h1 className="text-sm font-semibold">
          {first}_{last}
        </h1>
        <p className="text-xs break-words my-1">{text}</p>

        <p className="mt-1 text-[10px] break-words font-light">
          {tags.map((item) => " #" + item)}
        </p>
      </div>
    </div>
  );
};

export default Card;
