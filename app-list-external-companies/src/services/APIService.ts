import axios from "axios";

const BaseURL =
  "https://655cf25525b76d9884fe3153.mockapi.io/v1/external-companies";

interface CompanyFormEditProps {
  id?: string;
  companyName?: string;
  isActive?: boolean;
  collaboratorsCount: number;
}

export default class APIService {
  static getCompanies = async () => {
    const result = await axios.get(`${BaseURL}`);
    return result.data;
  };

  static getCompaniesByCode = async (id: string) => {
    const result = await axios.get(`${BaseURL}/${id}`);
    return result.data;
  };

  static updateCompanies = async (id: string, data: CompanyFormEditProps) => {
    const { collaboratorsCount, companyName, isActive } = data;
    const payload = {
      id,
      collaboratorsCount,
      companyName,
      isActive,
    };
    const result = await axios.put(`${BaseURL}/${id}`, payload);
    return result.data;
  };

  static deleteCompany = async (id: string) => {
    const result = await axios.delete(`${BaseURL}/${id}`);
    return result.data;
  };
}
