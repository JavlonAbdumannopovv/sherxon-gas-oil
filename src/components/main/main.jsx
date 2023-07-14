import { useState } from "react";
import Configuration from "./configuration";
import DayInfo from "./day-info";

const Main = () => {
  const [day, setDay] = useState(0);

  return (
    <div className="w-[100%] bg-[#171923] rounded-lg h-[1400px] mx-4 py-4 px-8">
      {day !== 0 ? <DayInfo day={day} setDay={setDay}/> : <Configuration setDay={setDay}/>}
    </div>
  );
};

export default Main;
