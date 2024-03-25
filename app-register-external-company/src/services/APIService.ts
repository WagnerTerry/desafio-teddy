import axios from "axios";

const BaseURL =
  "https://655cf25525b76d9884fe3153.mockapi.io/v1/external-companies";

interface CompanyFormEditProps {
  id?: string;
  collaboratorsCount?: number;
  companyName?: string;
  isActive?: string;
}

export default class APIService {
  static getCompanies = async () => {
    const result = await axios.get(`${BaseURL}`);
    return result.data;
  };

  static saveCompany = async (data: string) => {
    const result = await axios.post(`${BaseURL}`, data);
    return result.data;
  };

  static updateCompany = async (id: string, data: CompanyFormEditProps) => {
    const { companyName, collaboratorsCount, isActive } = data;
    const payload = {
      id,
      collaboratorsCount,
      companyName,
      isActive,
    };
    const result = await axios.put(`${BaseURL}/${id}`, payload);
    return result.data;
  };
}
