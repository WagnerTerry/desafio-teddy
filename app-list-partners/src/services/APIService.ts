import axios from "axios";

const BaseURL = "https://644060ba792fe886a88de1b9.mockapi.io/v1/test/partners";

// Listar tudo - GET /
// Listar um por id - GET /:id
// Cadastrar um parceiro - POST - /
// Atualizar um parceiro - PUT - /:id
// Deletar um parceiro - DELETE - /:id

export default class APIService {
  static getPartners = async () => {
    const result = await axios.get(`${BaseURL}`);
    return result.data;
  };

  static deletePartner = async (id: string) => {
    const result = await axios.delete(`${BaseURL}/${id}`);
    return result.data;
  };
}
