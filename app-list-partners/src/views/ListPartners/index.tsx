import { useState, useEffect } from "react"
// import { Link, useNavigate } from "react-router-dom";
// import Loading from "../../components/Loading";
import APIService from "../../services/APIService"

import "./styles.css"

interface Partner {
    id: number;
    name: string;
    email: string;
  }

export function ListPartners() {
    const [products, setProducts] = useState([] as any)
    const [partners, setPartners] = useState([
        { id: 1, name: 'Parceiro 1', email: 'parceiro1@example.com' },
        { id: 2, name: 'Parceiro 2', email: 'parceiro2@example.com' },
        { id: 3, name: 'Parceiro 2', email: 'parceiro2@example.com' },

        { id: 4, name: 'Parceiro 2', email: 'parceiro2@example.com' },

        { id: 5, name: 'Parceiro 2', email: 'parceiro2@example.com' },

        { id: 6, name: 'Parceiro 2', email: 'parceiro2@example.com' },

    ]);

    useEffect(() => {
        const showProducts = async () => {
            const _products = await APIService.getPartners()
            console.log("po", _products)
            setProducts(_products)
        }

        showProducts()
    }, [])

    const [currentPage, setCurrentPage] = useState<number>(1);
    const partnersPerPage: number = 5;

    const indexOfLastPartner = currentPage * partnersPerPage;
  const indexOfFirstPartner = indexOfLastPartner - partnersPerPage;
  const currentPartners = partners.slice(indexOfFirstPartner, indexOfLastPartner);

    const renderPartners = currentPartners.map(partner => (
        <tr key={partner.id}>
          <td>{partner.id}</td>
          <td>{partner.name}</td>
          <td>{partner.email}</td>
          <td>
            <button onClick={() => handleEdit(partner.id)}>Editar</button>
            <button onClick={() => handleDelete(partner.id)}>Deletar</button>
          </td>
        </tr>
      ));

    const handleEdit = (partnerId: number) => {
        // Lógica para editar o parceiro com o ID fornecido
        console.log(`Editar parceiro com ID ${partnerId}`);
      };
    
      const handleDelete = (partnerId: number) => {
        // Lógica para deletar o parceiro com o ID fornecido
        console.log(`Deletar parceiro com ID ${partnerId}`);
      };
    
      const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
    
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
            <th>Email</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {renderPartners}
        </tbody>
      </table>
      <div className="pagination">
        <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>Anterior</button>
        {pageNumbers.map(number => (
          <button key={number} onClick={() => paginate(number)}>{number}</button>
        ))}
        <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === Math.ceil(partners.length / partnersPerPage)}>Próximo</button>
      </div>
    </div>
  );
}
