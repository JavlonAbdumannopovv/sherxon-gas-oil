import { useDispatch, useSelector } from "react-redux";
import ApiService from "../../services/app.service";
import { setDays } from "../../store/app.slice";

const Day = ({ kun, amaldagi_operator, setDay }) => {
  const data = useSelector((state) => state.app);
  const dispatch = useDispatch();

  const deleteDay = async () => {
    try {
      const deleteDay = await ApiService.deleteDay(kun.id);
      const days = await ApiService.getDays();
      dispatch(setDays(days.data));
      return deleteDay;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <li className="w-[220px] bg-[#1A202C] rounded shadow-md shadow-[#1b1d29] p-3 !mr-4 !mb-4 transition-all duration-300 text-center border-[1px] border-transparent hover:scale-105 cursor-pointer">
      <p className="text-white text-md">
        {kun.sana.kun + " " + kun.sana.oy}{" "}
        <span className="pl-2">{kun.sana.hafta_kuni}</span>{" "}
        <span className="pl-2">{kun.sana.yil}</span>{" "}
      </p>
      <h2 className="text-white text-2xl py-2">{kun.operator.ism}</h2>
      <div className="flex justify-between items-center">
        <div className="w-[100%] pt-2 flex justify-between">
          {data.amaldagi_operator.id + "-" + data.amaldagi_operator.ism ===
          kun.operator.id + "-" + kun.operator.ism ? (
            <>
              <button onClick={() => {
                setDay(kun)
              }} className="w-[60px] h-9 bg-yellow-600 text-white rounded transition-all duration-300 text-center border-[1px] border-transparent hover:bg-yellow-800">
                Edit
              </button>
              <button
                onClick={deleteDay}
                className="w-[70px] h-9 bg-red-500 text-white rounded transition-all duration-300 text-center border-[1px] border-transparent  hover:bg-red-800"
              >
                Delete
              </button>
            </>
          ) : (
            <button className="w-[100%] h-9 bg-blue-600 text-white rounded transition-all duration-300 text-center border-[1px] border-transparent  hover:bg-blue-900">
              Only view
            </button>
          )}
        </div>
      </div>
    </li>
  );
};

export default Day;
