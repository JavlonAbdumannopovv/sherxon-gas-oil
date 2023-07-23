import axios from "axios";

axios.defaults.baseURL = "https://sherxon-gas-oil-bugaltery.netlify.app";
axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
axios.defaults.headers.common["Content-Type"] = "application/json";

// Boshqa so'rovlarni amalga oshirish

export default axios;