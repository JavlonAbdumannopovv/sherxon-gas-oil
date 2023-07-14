import React from "react";

const Dropdown = ({ arr, isOpen, setIsOpen, current, setCurrent }) => {
  return (
    <div className="relative">
      <p
        onClick={() => setIsOpen((prev) => !prev)}
        key={"currentYear"}
        className="text-white text-lg cursor-pointer bg-[#1A202C] w-28 my-1 py-2 transition-all duration-300 text-center rounded border-[1px] border-transparent  hover:border-gray-100"
      >
        {current}
      </p>
      <div className="absolute">
        {isOpen === true
          ? arr.map((item, i) => {
              if (current !== item) {
                return (
                  <p
                    onClick={() => {
                      setCurrent(item);
                      setIsOpen((prev) => !prev);
                    }}
                    key={i}
                    className="text-white text-lg cursor-pointer transition-all duration-300 bg-[#1A202C] w-28 my-1 py-2 text-center rounded border-[1px] border-transparent  hover:border-gray-100"
                  >
                    {item}
                  </p>
                );
              } else {
                return null;
              }
            })
          : null}
      </div>
    </div>
  );
};

export default Dropdown;
