import axios from "axios";

const BaseURL = "https://644060ba792fe886a88de1b9.mockapi.io/v1/test/partners";

export default class APIService {
  static getPartners = async () => {
    const result = await axios.get(`${BaseURL}`);
    return result.data;
  };
}
