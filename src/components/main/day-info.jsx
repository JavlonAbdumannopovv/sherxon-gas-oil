import React, { useEffect, useState } from "react";
import ApiService from "../../services/app.service";
import { setDays } from "../../store/app.slice";
import { useDispatch, useSelector } from "react-redux";

const DayInfo = ({ day, setDay }) => {
  const [saved, setSaved] = useState(true);
  const dispatch = useDispatch();
  const { kunlar } = useSelector((state) => state.app);
  const [topDefault, setTopDefault] = useState(true);

  const inputChangeHandler = (property, index, value) => {
    setDay((prevDay) => {
      const updatedNasiyalar = [...prevDay.kirim_chiqim.nasiyalar];
      updatedNasiyalar[index] = {
        ...updatedNasiyalar[index],
        [property]: value,
      };

      let summaTotal = 0;
      const jami = updatedNasiyalar.map((obj) => {
        summaTotal += Number(obj.summa);
        return summaTotal;
      });

      return {
        ...prevDay,
        kirim_chiqim: {
          ...prevDay.kirim_chiqim,
          nasiyalar: updatedNasiyalar,
          jami: {
            ...prevDay.kirim_chiqim.jami,
            nasiyalar: jami[jami.length - 1],
          },
        },
      };
    });

    setSaved(false);
  };

  const inputChangeHandler1 = (property, index, value) => {
    setDay((prevDay) => {
      const updatedNasiyalar = [...prevDay.kirim_chiqim.qaytarilgan_nasiyalar];
      updatedNasiyalar[index] = {
        ...updatedNasiyalar[index],
        [property]: value,
      };

      let summaTotal = 0;
      const jami = updatedNasiyalar.map((obj) => {
        summaTotal += Number(obj.summa);
        return summaTotal;
      });

      return {
        ...prevDay,
        kirim_chiqim: {
          ...prevDay.kirim_chiqim,
          qaytarilgan_nasiyalar: updatedNasiyalar,
          jami: {
            ...prevDay.kirim_chiqim.jami,
            qaytarilgan_nasiyalar: jami[jami.length - 1],
          },
        },
      };
    });

    setSaved(false);
  };

  const inputChangeHandler2 = (property, index, value) => {
    setDay((prevDay) => {
      const updatedNasiyalar = [...prevDay.kirim_chiqim.zapravka_harajatlari];
      updatedNasiyalar[index] = {
        ...updatedNasiyalar[index],
        [property]: value,
      };

      let summaTotal = 0;
      const jami = updatedNasiyalar.map((obj) => {
        summaTotal += Number(obj.summa);
        return summaTotal;
      });

      return {
        ...prevDay,
        kirim_chiqim: {
          ...prevDay.kirim_chiqim,
          zapravka_harajatlari: updatedNasiyalar,
          jami: {
            ...prevDay.kirim_chiqim.jami,
            zapravka_harajatlari: jami[jami.length - 1],
          },
        },
      };
    });

    setSaved(false);
  };

  const savePage = async () => {
    console.log(day);
    try {
      await ApiService.putDay(day.id, day);
      setSaved(true);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    try {
      const days = ApiService.getDays();
      dispatch(setDays(days.data));
    } catch (error) {
      console.log(error);
    }

    const handleKeyDown = (event) => {
      if (event.ctrlKey && event.key === "s") {
        event.preventDefault(); // Saqlash funksiyasini o'chirish
        savePage(); // Tanlashtirilgan tugmani bosish
      }
    };

    try {
      kunlar.map((kun) => {
        if (day.id === kun.id) {
          setDay((prev) => {
            return { ...prev, ...kun };
          });
        }
        return null;
      });
    } catch (error) {
      console.log(error);
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
    //eslint-disable-next-line
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center p-2 w-[430px] h-12 rounded-lg m-auto">
        <button
          onClick={() => setTopDefault(true)}
          className={`button ${topDefault && "active"} text-lg w-[200px] h-12`}
        >
          Kirim/Chiqimlar
        </button>
        <button
          onClick={() => setTopDefault(false)}
          className={`button ${!topDefault && "active"} text-lg w-[200px] h-12`}
        >
          Kunlik Hisobot
        </button>
      </div>

      {topDefault ? (
        <div>
          <div className="bg_default mt-4">
            <div className="pt-4 text-center w-full">
              {" "}
              <h2 className="text-2xl text-green-500">
                {day.sana.yil} yil {day.sana.kun} {day.sana.oy}
              </h2>
            </div>
            <div className="day_info bg_default rounded-lg">
              <div className="w-[35%] flex flex-col ">
                <div className="title bg-gray-700">
                  <h2>Nasiyalar</h2>
                </div>
                <div className="subtitle bg-gray-700">
                  <p className="!w-[55%]">Kimga</p>
                  <p className="!w-[45%]">Summa</p>
                </div>
                <ul className="w-[100%] day_info_list">
                  {day.kirim_chiqim.nasiyalar.map((nasiya, ind) => {
                    return (
                      <li key={ind}>
                        <input
                          type="text"
                          value={nasiya.ism}
                          onChange={(e) => {
                            inputChangeHandler("ism", ind, e.target.value);
                          }}
                        />
                        <input
                          type="number"
                          value={nasiya.summa}
                          onChange={(e) => {
                            inputChangeHandler("summa", ind, e.target.value);
                          }}
                        />
                      </li>
                    );
                  })}
                  <div className="day_info_footer flex">
                    <p className="!w-[55%]">Jami</p>
                    <p className="!w-[45%]">
                      {day.kirim_chiqim.jami.nasiyalar}
                    </p>
                  </div>
                </ul>
              </div>

              <div className="w-[33.3%] flex flex-col">
                <div className="title bg-gray-700">
                  <h2>Nasiyadan qaytgan pullar</h2>
                </div>
                <div className="subtitle bg-gray-700">
                  <p className="!w-[55%]">Kimga</p>
                  <p className="!w-[45%]">Summa</p>
                </div>
                <ul className="w-[100%] day_info_list">
                  {day.kirim_chiqim.qaytarilgan_nasiyalar.map((nasiya, ind) => {
                    return (
                      <li key={ind}>
                        <input
                          type="text"
                          value={nasiya.ism}
                          onChange={(e) => {
                            inputChangeHandler1("ism", ind, e.target.value);
                          }}
                        />
                        <input
                          type="number"
                          value={nasiya.summa}
                          onChange={(e) => {
                            inputChangeHandler1("summa", ind, e.target.value);
                          }}
                        />
                      </li>
                    );
                  })}
                  <div className="day_info_footer flex">
                    <p className="!w-[55%]">Jami</p>
                    <p className="!w-[45%]">
                      {day.kirim_chiqim.jami.qaytarilgan_nasiyalar}
                    </p>
                  </div>
                </ul>
              </div>

              <div className="w-[35%] flex flex-col ">
                <div className="title bg-gray-700">
                  <h2>Zapravka chiqimlari</h2>
                </div>
                <div className="subtitle bg-gray-700">
                  <p className="!w-[55%]">Kimga</p>
                  <p className="!w-[45%]">Summa</p>
                </div>
                <ul className="w-[100%] day_info_list">
                  {day.kirim_chiqim.zapravka_harajatlari.map((nasiya, ind) => {
                    return (
                      <li key={ind}>
                        <input
                          type="text"
                          value={nasiya.ism}
                          onChange={(e) => {
                            inputChangeHandler2("ism", ind, e.target.value);
                          }}
                        />
                        <input
                          type="number"
                          value={nasiya.summa}
                          onChange={(e) => {
                            inputChangeHandler2("summa", ind, e.target.value);
                          }}
                        />
                      </li>
                    );
                  })}
                  <div className="day_info_footer flex">
                    <p className="!w-[55%]">Jami</p>
                    <p className="!w-[45%]">
                      {day.kirim_chiqim.jami.zapravka_harajatlari}
                    </p>
                  </div>
                </ul>
              </div>
            </div>
          </div>
          <div className="p-4 flex justify-end bg_default">
            {/*eslint-disable-next-line*/}
            <button
              disabled={saved}
              className={`py-3 px-6 button ${saved && "active"}`}
              onClick={savePage}
            >
              {saved ? "Saqlangan" : "Saqlash"}
            </button>
          </div>
        </div>
      ) : (
        <div className="bg_default w-[100%] h-[1000px] mt-4 rounded-lg p-4">
          <div className="day_report w-[100%] h-[400px] border-[1px] border-white">
            {/* NOTE - Header */}
            <div className="day_report_header py-4 text-center border-b-[1px] border-white">
              <h1 className="text-xl">
                Xo`jaobod tumani{" "}
                <span className="text-2xl text-red-500">
                  Sherxon Gas-OIL MCHJ
                </span>{" "}
                ga qarashli <span>AYOQSH</span> da{" "}
                <span className="text-2xl text-green-500">
                  {day.sana.yil} yil {day.sana.kun} {day.sana.oy}
                </span>{" "}
                kungi neft mahsulotlari sotilishi haqida MA`LUMOT
              </h1>
            </div>

            {/* NOTE - Body */}
            <div className="day_report_body">
              {/* ------------------------------- modellar -------------*/}
              <div className="w-[9%]">
                <div className="title">
                  <h3>Benzin</h3>
                  <div className="subtitle">
                    <p>Turlari</p>
                  </div>
                </div>
                <ul>
                  <li key="1">
                    <p>AI-80</p>
                  </li>
                  <li key="2">
                    <p>AI-92</p>
                  </li>
                  <li key="3">
                    <p>Dizel</p>
                  </li>
                </ul>
              </div>
              {/* ------------------------------- sotib olindi -------------*/}
              <div className="w-[9%]">
                <div className="title">
                  <h3>Olindi</h3>
                  <div className="subtitle">
                    <p>Litr</p>
                  </div>
                </div>
                <ul>
                  <li key="1">
                    <input
                      type="number"
                      value={day.sotib_olingan_mahsulot.ai_80}
                      readOnly
                    />
                  </li>
                  <li key="2">
                    <input
                      type="number"
                      value={day.sotib_olingan_mahsulot.ai_92}
                      readOnly
                    />
                  </li>
                  <li key="3">
                    <input
                      type="number"
                      value={day.sotib_olingan_mahsulot.dizel}
                      readOnly
                    />
                  </li>
                </ul>
              </div>
              {/* ------------------------------- sotildi ------------------*/}
              <div className="w-[19%]">
                <div className="title">
                  <h3>Sotildi</h3>
                  <div className="subtitle">
                    <p className="w-[50%]">Litr</p>
                    <p className="w-[50%]">Summa</p>
                  </div>
                </div>
                <ul>
                  <li key="ai_80">
                    <input
                      type="number"
                      value={day.sotilgan_mahsulot.ai_80.miqdor}
                      readOnly
                    />
                    <input
                      type="number"
                      value={day.sotilgan_mahsulot.ai_80.summa}
                      readOnly
                    />
                  </li>
                  <li key="ai_92">
                    <input
                      type="number"
                      value={day.sotilgan_mahsulot.ai_92.miqdor}
                      readOnly
                    />
                    <input
                      type="number"
                      value={day.sotilgan_mahsulot.ai_92.summa}
                      readOnly
                    />
                  </li>
                  <li key="dizel">
                    <input
                      type="number"
                      value={day.sotilgan_mahsulot.dizel.miqdor}
                      readOnly
                    />
                    <input
                      type="number"
                      value={day.sotilgan_mahsulot.dizel.summa}
                      readOnly
                    />
                  </li>
                </ul>
              </div>
              {/* ------------------------------- kirim / chiqimlar ------------------*/}
              <div className="w-[27%]">
                <div className="title">
                  <h3>Kirim / Chiqimlar</h3>
                  <div className="subtitle">
                    <p className="w-[50%] h-[105px]">Qaytarilgan nasiyalar</p>
                    <p className="w-[50%] h-[105px]">Zapravka chiqimlari</p>
                    <p className="w-[50%] h-[105px]">Nasiyalar</p>
                  </div>
                </div>
                <ul>
                  <li key="ai_80">
                    <p>{day.kirim_chiqim.jami.qaytarilgan_nasiyalar}</p>
                    <p>{day.kirim_chiqim.jami.zapravka_harajatlari}</p>
                    <p>{day.kirim_chiqim.jami.nasiyalar}</p>
                  </li>
                  <li key="ai_92">
                    <p></p>
                    <p></p>
                    <p></p>
                  </li>
                </ul>
              </div>
              {/* ------------------------------- Plastik / Terminal ------------------*/}
              <div className="w-[18%]">
                <div className="title">
                  <h3>Plastik</h3>
                  <div className="subtitle">
                    <p className="w-[50%] h-[105px]">Humo</p>
                    <p className="w-[50%] h-[105px]">Uzcard</p>
                  </div>
                </div>
                <ul>
                  <li key="ai_80">
                    <input type="number" value={day.plastik_terminal.humo} readOnly/>
                    <input type="number" value={day.plastik_terminal.uzcard} readOnly/>
                  </li>
                  <li key="ai_92">
                    <p></p>
                    <p></p>
                  </li>
                </ul>
              </div>
              {/* ------------------------------- Plastik / Terminal ------------------*/}
              <div className="w-[9%]">
              <div className="title">
                  <h3>Naqd Pul</h3>
                  <div className="subtitle">
                    <p className="w-[100%] h-[105px]">Summa</p>
                  </div>
                </div>
                <ul>
                  <li key="summa">
                    <input type="number" value={day.naqd_pul} readOnly/>
                  </li>
                  <li>
                    <p></p>
                  </li>
                </ul>
              </div>
              <div className="w-[9%]"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DayInfo;
