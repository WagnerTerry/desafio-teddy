import { useState, useEffect } from "react";
import * as singleSpa from "single-spa";

import APIService from "../../services/APIService";
import "./styles.css";

interface ICompany {
  collaboratorsCount: number;
  companyName: string;
  createdAt: string;
  id: string;
  isActive: string;
  lastSubmit: string;
}

export function ListCompanies() {
  const [companies, setCompanies] = useState<ICompany[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);

  const companiesPerPage: number = 10;

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR'); // Define o formato da data como DD/MM/YYYY
  };

  useEffect(() => {
    const fetchData = async () => {
      const _companies = await APIService.getCompanies();
      setCompanies(_companies);
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

  const indexOfLastcompany = currentPage * companiesPerPage;
  const indexOfFirstcompany = indexOfLastcompany - companiesPerPage;
  const currentcompanies = companies.slice(
    indexOfFirstcompany,
    indexOfLastcompany
  );

  const rendercompanies = currentcompanies.map((company) => (
    <tr key={company.id}>
      <td>{company.id}</td>
      <td>{company.companyName}</td>
      <td>{String(company.isActive)}</td>
      <td>{company.collaboratorsCount}</td>
      <td>{formatDate(company.createdAt)}</td> {/* Formatando a data aqui */}
      <td>
        <button className="edit-button" onClick={() => handleEdit(company.id, company)}>Editar</button>
        <button className="delete-button" onClick={() => handleDelete(company.id)}>Deletar</button>
      </td>
    </tr>
  ));

  async function handleEdit(id: string, data: ICompany) {

    try {
      if (id) {
        localStorage.setItem('ext_id', data.id);
        localStorage.setItem('companyName', data.companyName);
        localStorage.setItem('collaboratorsCount', JSON.stringify(data.collaboratorsCount));
        localStorage.setItem('isActive', (data.isActive));
        singleSpa.navigateToUrl("/app-register-external-company", data);
      }
    } catch (e) {
      alert("Erro ao atualizar empresa")
      console.log("Ocorreu um erro ao atualizar empresa")
    }
  }

  const handleDelete = async (companyId: string) => {
    try {
      await APIService.deleteCompany(companyId);
      setCompanies(companies.filter((company) => company.id !== companyId))

    } catch (e) {
      console.log("Ocorreu um erro ao excluir empresa", e)
    }
  };

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(companies.length / companiesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="container">
      <h1>Lista de Empresas</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Empresa</th>
            <th>Ativa</th>
            <th>Colaboradores</th>
            <th>Data de Criação</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>{rendercompanies}</tbody>
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
            currentPage === Math.ceil(companies.length / companiesPerPage)
          }
        >
          Próximo
        </button>
      </div>
    </div>
  );
}
