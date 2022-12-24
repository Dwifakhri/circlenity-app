import React from "react";
import { MdDone } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";

const Notification = ({ triggerNotif, children, closeNotif }) => {
  return triggerNotif ? (
    <div className="fixed right-0 md:right-7 p-5 z-10">
      <div className=" bg-white shadow-lg w-60 md:w-80 py-8 px-7 rounded-none flex justify-between">
        <div className="flex flex-row space-x-5 justify-center items-center">
          <div
            className={`${
              triggerNotif === "Success" ? "bg-green-500" : "bg-red-600"
            } rounded-full p-2`}
          >
            {triggerNotif === "Success" ? (
              <MdDone size={25} color="white" />
            ) : (
              <RxCross2 size={25} color="white" />
            )}
          </div>
          <div>{children}</div>
        </div>
        <p onClick={closeNotif} className="text-center text-lg cursor-pointer">
          X
        </p>
      </div>
    </div>
  ) : (
    ""
  );
};

export default Notification;
