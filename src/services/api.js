import axios from "axios";

axios.defaults.baseURL = "http://localhost:3001";
axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
axios.defaults.headers.common["Content-Type"] = "application/json";

// Boshqa so'rovlarni amalga oshirish

export default axios;