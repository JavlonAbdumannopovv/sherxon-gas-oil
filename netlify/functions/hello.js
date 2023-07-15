const { default: axios } = require("axios");

const response = await axios.get("/kunlar");
exports.handler = async (event, context) => {
  return {
    statusCode: 200,
    body: JSON.stringify({ message: response}),
  };
};