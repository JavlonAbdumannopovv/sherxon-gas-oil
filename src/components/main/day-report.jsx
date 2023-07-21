import React, { useEffect, useState } from "react";
import ApiService from "../../services/app.service";

const DayReport = ({ day, setDay }) => {
  const [state, setState] = useState(0);
  const [saved, setSaved] = useState(true);

  useEffect(() => {
    setState(
      Number(day.naqd_pul) +
        Number(day.plastik_terminal.uzcard) +
        Number(day.plastik_terminal.humo) +
        Number(day.kirim_chiqim.jami.nasiyalar) +
        Number(day.kirim_chiqim.jami.zapravka_harajatlari) -
        Number(day.kirim_chiqim.jami.qaytarilgan_nasiyalar) -
        Number(day.sotilgan_mahsulot.umumiy_summa)
    );

    //eslint-disable-next-line
  }, [day]);

  const savePage = async () => {
    // put data base
    try {
      await ApiService.putDay(day.id, day);
      setSaved(true);
    } catch (error) {
      console.log(error);
    }
  };

  const buyHandler = (value, model) => {
    if (model === 1) {
      setDay((prev) => {
        const sotibOlingan = { ...prev.sotib_olingan_mahsulot, ai_80: value };
        return {
          ...prev,
          sotib_olingan_mahsulot: {
            ...sotibOlingan,
          },
        };
      });
    } else if (model === 2) {
      setDay((prev) => {
        const sotibOlingan = { ...prev.sotib_olingan_mahsulot, ai_92: value };
        return {
          ...prev,
          sotib_olingan_mahsulot: {
            ...sotibOlingan,
          },
        };
      });
    } else if (model === 3) {
      setDay((prev) => {
        const sotibOlingan = { ...prev.sotib_olingan_mahsulot, dizel: value };
        return {
          ...prev,
          sotib_olingan_mahsulot: {
            ...sotibOlingan,
          },
        };
      });
    }

    setSaved(false);
  };

  const amountSoldHandler = (value, model) => {
    if (model === 1) {
      setDay((prev) => {
        const sotilganMiqdor = {
          ...prev.sotilgan_mahsulot.ai_80,
          miqdor: value,
        };
        return {
          ...prev,
          sotilgan_mahsulot: {
            ...prev.sotilgan_mahsulot,
            ai_80: sotilganMiqdor,
          },
        };
      });
    } else if (model === 2) {
      setDay((prev) => {
        const sotilganMiqdor = {
          ...prev.sotilgan_mahsulot.ai_92,
          miqdor: value,
        };
        return {
          ...prev,
          sotilgan_mahsulot: {
            ...prev.sotilgan_mahsulot,
            ai_92: sotilganMiqdor,
          },
        };
      });
    } else if (model === 3) {
      setDay((prev) => {
        const sotilganMiqdor = {
          ...prev.sotilgan_mahsulot.dizel,
          miqdor: value,
        };
        return {
          ...prev,
          sotilgan_mahsulot: {
            ...prev.sotilgan_mahsulot,
            dizel: sotilganMiqdor,
          },
        };
      });
    }

    setSaved(false);
  };

  const moneySoldHandler = (value, model) => {
    if (model === 1) {
      setDay((prev) => {
        const sotilganPul = { ...prev.sotilgan_mahsulot.ai_80, summa: value };
        return {
          ...prev,
          sotilgan_mahsulot: {
            ...prev.sotilgan_mahsulot,
            ai_80: sotilganPul,
          },
        };
      });
    } else if (model === 2) {
      setDay((prev) => {
        const sotilganPul = { ...prev.sotilgan_mahsulot.ai_92, summa: value };
        return {
          ...prev,
          sotilgan_mahsulot: {
            ...prev.sotilgan_mahsulot,
            ai_92: sotilganPul,
          },
        };
      });
    } else if (model === 3) {
      setDay((prev) => {
        const sotilganPul = { ...prev.sotilgan_mahsulot.dizel, summa: value };
        return {
          ...prev,
          sotilgan_mahsulot: {
            ...prev.sotilgan_mahsulot,
            dizel: sotilganPul,
          },
        };
      });
    }
    setDay((prev) => {
      const umumiySumma =
        Number(prev.sotilgan_mahsulot.ai_80.summa) +
        Number(prev.sotilgan_mahsulot.ai_92.summa) +
        Number(prev.sotilgan_mahsulot.dizel.summa);
      return {
        ...prev,
        sotilgan_mahsulot: {
          ...prev.sotilgan_mahsulot,
          umumiy_summa: umumiySumma,
        },
      };
    });
    setSaved(false);
  };

  const terminalHandler = (value, model) => {
    if (model === 1) {
      setDay((prev) => {
        const terminal = { ...prev.plastik_terminal, uzcard: value };
        return {
          ...prev,
          plastik_terminal: {
            ...terminal,
          },
        };
      });
    } else if (model === 2) {
      setDay((prev) => {
        const terminal = { ...prev.plastik_terminal, humo: value };
        return {
          ...prev,
          plastik_terminal: {
            ...terminal,
          },
        };
      });
    }
  };

  const cashHandler = (value) => {
    setDay((prev) => {
      return {
        ...prev,
        naqd_pul: value,
      };
    });
  };

  const residualHandler = (value, model) => {
    if (model === 1) {
      setDay((prev) => {
        const qolganMahsulot = { ...prev.qolgan_mahsulot, ai_80: value };
        return {
          ...prev,
          qolgan_mahsulot: {
            ...qolganMahsulot,
          },
        };
      });
    } else if (model === 2) {
      setDay((prev) => {
        const qolganMahsulot = { ...prev.qolgan_mahsulot, ai_92: value };
        return {
          ...prev,
          qolgan_mahsulot: {
            ...qolganMahsulot,
          },
        };
      });
    } else if (model === 3) {
      setDay((prev) => {
        const qolganMahsulot = { ...prev.qolgan_mahsulot, dizel: value };
        return {
          ...prev,
          qolgan_mahsulot: {
            ...qolganMahsulot,
          },
        };
      });
    }

    setSaved(false);
  };

  const counterHandler = (value, model) => {
    if (model === 1) {
      setDay((prev) => {
        const hisoblagich = { ...prev.hisoblagich, ai_80: value };
        return {
          ...prev,
          hisoblagich: {
            ...hisoblagich,
          },
        };
      });
    } else if (model === 2) {
      setDay((prev) => {
        const hisoblagich = { ...prev.hisoblagich, ai_92: value };
        return {
          ...prev,
          hisoblagich: {
            ...hisoblagich,
          },
        };
      });
    } else if (model === 3) {
      setDay((prev) => {
        const hisoblagich = { ...prev.hisoblagich, dizel: value };
        return {
          ...prev,
          hisoblagich: {
            ...hisoblagich,
          },
        };
      });
    }

    setSaved(false);
  };

  return (
    <div className="bg_default w-[100%] h-[1000px] mt-4 rounded-lg p-4">
      <div className="day_report w-[100%] border-[2px] !border-white mb-8">
        {/* NOTE - Header */}
        <div className="day_report_header py-4 text-center bg-gray-700">
          <h1 className="text-xl">
            Xo`jaobod tumani{" "}
            <span className="text-2xl text-red-500">Sherxon Gas-OIL MCHJ</span>{" "}
            ga qarashli <span>AYOQSH</span> da{" "}
            <span className="text-2xl text-green-500">
              {day.sana.yil} yil {day.sana.kun} {day.sana.oy}
            </span>{" "}
            kungi neft mahsulotlari sotilishi haqida MA`LUMOT
          </h1>
        </div>
        <div></div>
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
                  onChange={(e) => {
                    buyHandler(e.target.value, 1);
                  }}
                />
              </li>
              <li key="2">
                <input
                  type="number"
                  value={day.sotib_olingan_mahsulot.ai_92}
                  onChange={(e) => {
                    buyHandler(e.target.value, 2);
                  }}
                />
              </li>
              <li key="3">
                <input
                  type="number"
                  value={day.sotib_olingan_mahsulot.dizel}
                  onChange={(e) => {
                    buyHandler(e.target.value, 3);
                  }}
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
                  onChange={(e) => {
                    amountSoldHandler(e.target.value, 1);
                  }}
                />
                <input
                  type="number"
                  value={day.sotilgan_mahsulot.ai_80.summa}
                  onChange={(e) => {
                    moneySoldHandler(e.target.value, 1);
                  }}
                />
              </li>
              <li key="ai_92">
                <input
                  type="number"
                  value={day.sotilgan_mahsulot.ai_92.miqdor}
                  onChange={(e) => {
                    amountSoldHandler(e.target.value, 2);
                  }}
                />
                <input
                  type="number"
                  value={day.sotilgan_mahsulot.ai_92.summa}
                  onChange={(e) => {
                    moneySoldHandler(e.target.value, 2);
                  }}
                />
              </li>
              <li key="dizel">
                <input
                  type="number"
                  value={day.sotilgan_mahsulot.dizel.miqdor}
                  onChange={(e) => {
                    amountSoldHandler(e.target.value, 3);
                  }}
                />
                <input
                  type="number"
                  value={day.sotilgan_mahsulot.dizel.summa}
                  onChange={(e) => {
                    moneySoldHandler(e.target.value, 3);
                  }}
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
              <li key="ai_80" className="!h-[100px] big">
                <p>{day.kirim_chiqim.jami.qaytarilgan_nasiyalar}</p>
                <p>{day.kirim_chiqim.jami.zapravka_harajatlari}</p>
                <p>{day.kirim_chiqim.jami.nasiyalar}</p>
              </li>
            </ul>
          </div>
          {/* ------------------------------- Plastik / Terminal ------------------*/}
          <div className="w-[18%]">
            <div className="title">
              <h3>Plastik</h3>
              <div className="subtitle">
                <p className="w-[50%] h-[105px]">Uzcard</p>
                <p className="w-[50%] h-[105px]">Humo</p>
              </div>
            </div>
            <ul>
              <li key="ai_80" className="!h-[100px] big">
                <input
                  type="number"
                  value={day.plastik_terminal.uzcard}
                  onChange={(e) => {
                    terminalHandler(e.target.value, 1);
                  }}
                />
                <input
                  type="number"
                  value={day.plastik_terminal.humo}
                  onChange={(e) => {
                    terminalHandler(e.target.value, 2);
                  }}
                />
              </li>
              {/* <li key="ai_92">
                <p></p>
                <p></p>
              </li> */}
            </ul>
          </div>
          {/* ------------------------------- Naqd Pul ------------------*/}
          <div className="w-[9%]">
            <div className="title">
              <h3>Naqd Pul</h3>
              <div className="subtitle">
                <p className="w-[100%] h-[105px]">Summa</p>
              </div>
            </div>
            <ul>
              <li key="summa" className="!h-[100px] big">
                <input
                  type="number"
                  value={day.naqd_pul}
                  onChange={(e) => {
                    cashHandler(e.target.value);
                  }}
                />
              </li>
            </ul>
          </div>
          {/* ------------------------------- Qoldiq Benzin ------------------*/}
          <div className="w-[9%]">
            <div className="title">
              <h3>Qoldiq</h3>
              <div className="subtitle">
                <p className="w-[100%] ">Litr</p>
              </div>
            </div>
            <ul>
              <li key="summa">
                <input
                  type="number"
                  value={day.qolgan_mahsulot.ai_80}
                  onChange={(e) => {
                    residualHandler(e.target.value, 1);
                  }}
                />
              </li>
              <li>
                <input
                  type="number"
                  value={day.qolgan_mahsulot.ai_92}
                  onChange={(e) => {
                    residualHandler(e.target.value, 2);
                  }}
                />
              </li>
              <li>
                <input
                  type="number"
                  value={day.qolgan_mahsulot.dizel}
                  onChange={(e) => {
                    residualHandler(e.target.value, 3);
                  }}
                />
              </li>
            </ul>
          </div>
        </div>

        {/* NOTE - Footer */}
        <div className="day_report_footer h-[70px] flex justify-between items-center">
          <div className="w-[10%] title">
            <p className="text-xl">Hisoblagich</p>
          </div>
          <div className="w-[30%] wrapper">
            <div className="title">
              <p>Ai-80</p>
            </div>
            <div className="counter">
              <input
                type="number"
                value={day.hisoblagich.ai_80}
                onChange={(e) => {
                  counterHandler(e.target.value, 1);
                }}
              />
            </div>
          </div>
          <div className="w-[30%] wrapper">
            <div className="title">
              <p>Ai-92</p>
            </div>
            <div className="counter">
              <input
                type="number"
                value={day.hisoblagich.ai_92}
                onChange={(e) => {
                  counterHandler(e.target.value, 2);
                }}
              />
            </div>
          </div>
          <div className="w-[30%] wrapper">
            <div className="title">
              <p>Dizel</p>
            </div>
            <div className="counter">
              <input
                type="number"
                value={day.hisoblagich.dizel}
                onChange={(e) => {
                  counterHandler(e.target.value, 3);
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-start">
        {/* day report auto */}
        <div className="day_report_auto w-[900px] border-[1px] border-white">
          <div className="w-[20%]">
            <p className="title">Umumiy savdo</p>
            <p className="counter">
              {Number(day.sotilgan_mahsulot.umumiy_summa)}
            </p>
          </div>
          <div className="w-[20%]">
            <p className="title">Kirim</p>
            <p className="counter">
              {Number(day.kirim_chiqim.jami.qaytarilgan_nasiyalar)}
            </p>
          </div>
          <div className="w-[20%]">
            <p className="title">Chiqim</p>
            <p className="counter">
              {Number(
                day.kirim_chiqim.jami.nasiyalar +
                  day.kirim_chiqim.jami.zapravka_harajatlari
              )}
            </p>
          </div>
          <div className="w-[20%]">
            <p className="title">Plastik</p>
            <p className="counter">
              {Number(day.plastik_terminal.uzcard) +
                Number(day.plastik_terminal.humo)}
            </p>
          </div>
          <div className="w-[20%]">
            <p className="title">Naqd pul</p>
            <p className="counter">{Number(day.naqd_pul)}</p>
          </div>
          <div className="w-[20%] bg-gray-700">
            <p className="title">Holat</p>
            <p
              className={`counter ${
                state >= 0 ? "text-green-500" : "text-red-500"
              }`}
            >
              {state}
            </p>
          </div>
        </div>
        {/* save page */}
        <div className="p-4 flex justify-end bg_default">
          {/*eslint-disable-next-line*/}
          <button
            disabled={saved}
            className={`py-3 px-6 button ${saved && "active"}`}
            onClick={() => {
              savePage();
            }}
          >
            {saved ? "Saqlangan" : "Saqlash"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DayReport;
