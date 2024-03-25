import axios from "axios";

const BaseURL = "https://644060ba792fe886a88de1b9.mockapi.io/v1/test/partners";

interface PartnerFormEditProps {
  id?: string;
  name?: string;
  description?: string;
}

export default class APIService {
  static getPartners = async () => {
    const result = await axios.get(`${BaseURL}`);
    return result.data;
  };

  static getPartnersByCode = async (id: string) => {
    const result = await axios.get(`${BaseURL}/${id}`);
    return result.data;
  };

  static savePartner = async (data: string) => {
    const result = await axios.post(`${BaseURL}`, data);
    return result.data;
  };

  static updatePartner = async (id: string, data: PartnerFormEditProps) => {
    const { name, description } = data;
    const payload = {
      id,
      name,
      description,
    };
    const result = await axios.put(`${BaseURL}/${id}`, payload);
    return result.data;
  };

  static deletePartner = async (id: string) => {
    const result = await axios.delete(`${BaseURL}/${id}`);
    return result.data;
  };
}
