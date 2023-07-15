import React, { useEffect } from "react";
import Header from "./components/header/header.jsx";
import Main from "./components/main/main.jsx";
import ApiService from "./services/app.service.js";
import { useDispatch } from "react-redux";
import {
  setCurrentOperator,
  setDays,
  setOperators,
} from "../src/store/app.slice.js";

function App() {
  const dispatch = useDispatch();

  const getData = async () => {
    try {
      const days = await ApiService.getDays();
      const operators = await ApiService.getOperators();
      const currentOperator = await ApiService.getCurrentOperator();
      dispatch(setDays(days.data));
      dispatch(setOperators(operators.data));
      dispatch(setCurrentOperator(currentOperator.data));
    } catch (error) {
      console.log(error);
    }
    fetch("/.netlify/functions/hello")
      .then((response) => response.json())
      .then((data) => console.log(data.message))
      .catch((error) => console.error("Error:", error));
  };

  useEffect(() => {
    getData();

    //eslint-disable-next-line
  }, []);

  return (
    <div className="w-[100%] bg-[#1A202C] pb-4">
      <Header />
      <main className="flex justify-between items-center">
        <Main />
      </main>
    </div>
  );
}

export default App;
