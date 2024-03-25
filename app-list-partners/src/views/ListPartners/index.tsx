import { useState, useEffect } from "react";
import * as singleSpa from "single-spa";

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
  const [loading, setLoading] = useState<boolean>(true); 

  const partnersPerPage: number = 10;

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR'); // Define o formato da data como DD/MM/YYYY
  };

  useEffect(() => {
    const fetchData = async () => {
      const _partners = await APIService.getPartners();
      setPartners(_partners);
      setLoading(false); 
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-text">Loading...</div>
      </div>
    );
  }

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const indexOfLastPartner = currentPage * partnersPerPage;
  const indexOfFirstPartner = indexOfLastPartner - partnersPerPage;
  const currentPartners = partners.slice(
    indexOfFirstPartner,
    indexOfLastPartner
  );

  const renderPartners = currentPartners.map((partner, idx) => (
    <tr key={idx}>
      <td>{partner.id}</td>
      <td>{partner.name}</td>
      <td className="truncate-text">{partner.description}</td>
      <td>{formatDate(partner.createdAt)}</td> {/* Formatando a data aqui */}
      <td>
        <button className="edit-button" onClick={() => handleEdit(partner.id, partner[idx])}>Editar</button>
        <button className="delete-button" onClick={() => handleDelete(partner.id)}>Deletar</button>
      </td>
    </tr>
  ));

  async function handleEdit(id: any, data: string) {
    try {
        if (id) {
          singleSpa.navigateToUrl("/app-register-partner");

            // navigate("/register-product", { replace: true, state: data })
        }
    } catch (e) {
        alert("Erro ao atualizar produto")
        console.log("Ocorreu um erro ao atualizar produto")
    }
}

  const handleDelete = async (partnerId: string) => {
      try {
        await APIService.deletePartner(partnerId);
        setPartners(partners.filter((partner) => partner.id !== partnerId))
        
    } catch (e) {
        console.log("Ocorreu um erro ao excluir parceiro", e)
    }
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
            <th>Descrição</th>
            <th>Data de Criação</th>
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
