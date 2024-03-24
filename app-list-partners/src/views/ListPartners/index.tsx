import { useState, useEffect } from "react";
import APIService from "../../services/APIService";
import "./styles.css";

interface IPartner {
    clients: [];
    createdAt: string;
    description: string;
    id: string;
    name: string;
    projects: [];
    repositoryGit: string;
    urlDoc: string;
  }

export function ListPartners() {
  const [partners, setPartners] = useState<IPartner[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const partnersPerPage: number = 5;

  useEffect(() => {
    const fetchData = async () => {
      const _partners = await APIService.getPartners();
      setPartners(_partners);
    };

    fetchData();
  }, []);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const indexOfLastPartner = currentPage * partnersPerPage;
  const indexOfFirstPartner = indexOfLastPartner - partnersPerPage;
  const currentPartners = partners.slice(
    indexOfFirstPartner,
    indexOfLastPartner
  );

  const renderPartners = currentPartners.map((partner) => (
    <tr key={partner.id}>
      <td>{partner.id}</td>
      <td>{partner.name}</td>
      <td>{partner.createdAt}</td>
      <td>
        <button onClick={() => handleEdit(partner.id)}>Editar</button>
        <button onClick={() => handleDelete(partner.id)}>Deletar</button>
      </td>
    </tr>
  ));

  const handleEdit = (partnerId: string) => {
    console.log(`Editar parceiro com ID ${partnerId}`);
  };

  const handleDelete = (partnerId: string) => {
    console.log(`Deletar parceiro com ID ${partnerId}`);
  };

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(partners.length / partnersPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="container">
      <h1>Lista de Parceiros</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Data de Criação</th> {/* Corrigi o cabeçalho da coluna */}
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>{renderPartners}</tbody>
      </table>
      <div className="pagination">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Anterior
        </button>
        {pageNumbers.map((number) => (
          <button key={number} onClick={() => paginate(number)}>
            {number}
          </button>
        ))}
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={
            currentPage === Math.ceil(partners.length / partnersPerPage)
          }
        >
          Próximo
        </button>
      </div>
    </div>
  );
}
