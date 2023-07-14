import axios from "./api";

const ApiService = {
  // GET
  async getDays() {
    const response = await axios.get("/kunlar");
    return response;
  },
  async getOperators() {
    const response = await axios.get("/operatorlar");
    return response;
  },
  async getCurrentOperator() {
    const response = await axios.get("/amaldagi_operator");
    return response;
  },

  //POST
  async postDay(yangi_kun) {
    const response = await axios.post("/kunlar", {...yangi_kun});
    return response;
  },
  async putDay(id ,day) {
    const response = await axios.put(`/kunlar/${id}/`, day);
    return response;
  },

  //DELETE
  async deleteDay(id) {
    const response = await axios.delete(`/kunlar/${id}`);
    return response;
  } 
};

export default ApiService;
