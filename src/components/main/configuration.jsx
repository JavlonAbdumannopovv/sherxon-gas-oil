import React, { useState } from "react";
import Dropdown from "../dropdown/dropdown";
import { useSelector, useDispatch } from "react-redux";
import Day from "../day/day";
import ApiService from "../../services/app.service";
import { setDays } from "../../store/app.slice";

const currentDate = new Date();
const monthName = currentDate.toLocaleDateString("default", {
  month: "long",
});
const year = currentDate.getFullYear();
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const years = [2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030];

const Configuration = ({ setDay }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen1, setIsOpen1] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(monthName);
  const [currentYear, setCurrentYear] = useState(year);
  const { kunlar } = useSelector((state) => state.app);
  const { amaldagi_operator } = useSelector((state) => state.app);

  const yangiKunId = `${new Date().getDate()}-${new Date().toLocaleString(
    "default",
    { month: "long" }
  )}-${new Date().getFullYear()}_operator=${amaldagi_operator.ism}-${
    amaldagi_operator.familiya
  }`;
  const yangiKun = {
    id: yangiKunId.toLowerCase(),
    operator: {
      id: amaldagi_operator.id,
      ism: amaldagi_operator.ism,
      familiya: amaldagi_operator.familiya,
    },
    sana: {
      kun: new Date().getDate(),
      hafta_kuni: new Date().toLocaleString("default", { weekday: "long" }),
      oy: new Date().toLocaleString("default", { month: "long" }),
      yil: new Date().getFullYear(),
    },
    kirim_chiqim: {
      nasiyalar: [
        {
          ism: "",
          summa: "",
        },
        {
          ism: "",
          summa: "",
        },
        {
          ism: "",
          summa: "",
        },
        {
          ism: "",
          summa: "",
        },
        {
          ism: "",
          summa: "",
        },
        {
          ism: "",
          summa: "",
        },
        {
          ism: "",
          summa: "",
        },
        {
          ism: "",
          summa: "",
        },
        {
          ism: "",
          summa: "",
        },
        {
          ism: "",
          summa: "",
        },
        {
          ism: "",
          summa: "",
        },
        {
          ism: "",
          summa: "",
        },
        {
          ism: "",
          summa: "",
        },
        {
          ism: "",
          summa: "",
        },
        {
          ism: "",
          summa: "",
        },
        {
          ism: "",
          summa: "",
        },
        {
          ism: "",
          summa: "",
        },
        {
          ism: "",
          summa: "",
        },
        {
          ism: "",
          summa: "",
        },
        {
          ism: "",
          summa: "",
        },
      ],
      qaytarilgan_nasiyalar: [
        {
          ism: "",
          summa: "",
        },
        {
          ism: "",
          summa: "",
        },
        {
          ism: "",
          summa: "",
        },
        {
          ism: "",
          summa: "",
        },
        {
          ism: "",
          summa: "",
        },
        {
          ism: "",
          summa: "",
        },
        {
          ism: "",
          summa: "",
        },
        {
          ism: "",
          summa: "",
        },
        {
          ism: "",
          summa: "",
        },
        {
          ism: "",
          summa: "",
        },
        {
          ism: "",
          summa: "",
        },
        {
          ism: "",
          summa: "",
        },
        {
          ism: "",
          summa: "",
        },
        {
          ism: "",
          summa: "",
        },
        {
          ism: "",
          summa: "",
        },
        {
          ism: "",
          summa: "",
        },
        {
          ism: "",
          summa: "",
        },
        {
          ism: "",
          summa: "",
        },
        {
          ism: "",
          summa: "",
        },
        {
          ism: "",
          summa: "",
        },
      ],
      zapravka_harajatlari: [
        {
          ism: "",
          summa: "",
        },
        {
          ism: "",
          summa: "",
        },
        {
          ism: "",
          summa: "",
        },
        {
          ism: "",
          summa: "",
        },
        {
          ism: "",
          summa: "",
        },
        {
          ism: "",
          summa: "",
        },
        {
          ism: "",
          summa: "",
        },
        {
          ism: "",
          summa: "",
        },
        {
          ism: "",
          summa: "",
        },
        {
          ism: "",
          summa: "",
        },
        {
          ism: "",
          summa: "",
        },
        {
          ism: "",
          summa: "",
        },
        {
          ism: "",
          summa: "",
        },
        {
          ism: "",
          summa: "",
        },
        {
          ism: "",
          summa: "",
        },
        {
          ism: "",
          summa: "",
        },
        {
          ism: "",
          summa: "",
        },
        {
          ism: "",
          summa: "",
        },
        {
          ism: "",
          summa: "",
        },
        {
          ism: "",
          summa: "",
        },
      ],
      jami: {
        nasiyalar: 0,
        qaytarilgan_nasiyalar: 0,
        zapravka_harajatlari: 0,
      },
    },
    sotib_olingan_mahsulot: {
      ai_80: 0,
      ai_92: 0,
      dizel: 0,
    },
    sotilgan_mahsulot: {
      ai_80: {
        narx: 0,
        miqdor: 0,
        summa: 0,
        hisoblagich: 0,
      },
      ai_92: {
        narx: 0,
        miqdor: 0,
        summa: 0,
        hisoblagich: 0,
      },
      dizel: {
        narx: 0,
        miqdor: 0,
        summa: 0,
        hisoblagich: 0,
      },
      umumiy_summa: 0,
    },
    qolgan_mahsulot: {
      ai_80: 0,
      ai_92: 0,
      dizel: 0,
    },
    plastik_terminal: {
      uzcard: 0,
      humo: 0,
    },
    naqd_pul: 0,
  };

  const dispatch = useDispatch();
  const postDay = async () => {
    try {
      const res = await ApiService.postDay(yangiKun);
      const days = await ApiService.getDays();
      dispatch(setDays(days.data));
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-[100%] h-[1000px]">
      <div className="flex justify-between items-center">
        <div className="flex justify-between w-[240px]">
          <Dropdown
            arr={months}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            current={currentMonth}
            setCurrent={setCurrentMonth}
          />
          <Dropdown
            arr={years}
            isOpen={isOpen1}
            setIsOpen={setIsOpen1}
            current={currentYear}
            setCurrent={setCurrentYear}
          />
        </div>
        <div>
          <button
            onClick={postDay}
            className="w-[100px] rounded text-white cursor-pointer h-10 bg-green-600 transition-all duration-300 text-center border-[1px] border-transparent  hover:bg-green-900 shadow-sm shadow-green-950"
          >
            Yangi kun
          </button>
        </div>
      </div>

      <div className="w-[100%] min-h-[500px] py-4">
        <ul className="w-[100%] flex flex-wrap">
          {kunlar.map((kun) => (
            <div
              key={
                kun.sana.kun +
                "_" +
                amaldagi_operator.id +
                Math.random() * 100000
              }
            >
              <Day
                kun={kun}
                amaldagi_operator={amaldagi_operator}
                setDay={setDay}
              />
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Configuration;
