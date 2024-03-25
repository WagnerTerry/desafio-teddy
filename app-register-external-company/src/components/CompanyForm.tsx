import React, { useState } from 'react';
import * as singleSpa from "single-spa";
import APIService from '../services/APIService';
import './styles.css';

interface CompanyFormProps {
    id?: string;
    companyName?: string;
    collaboratorsCount?: string;
    isActive?: string
}

export default function CompanyForm(props: CompanyFormProps) {
    const [formData, setFormData] = useState<CompanyFormProps>({
        companyName: props.companyName || '',
        collaboratorsCount: props.collaboratorsCount || '',
        isActive: props.isActive || ''

    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (!formData.companyName) {
            alert("Por favor, preencha o campo 'Nome'");
            return;
        }

        const data = { ...formData }; 
        try {
            const capitalName = data.companyName?.toUpperCase(); 
            const companies = await APIService.getCompanies();
            const duplicateName = companies.some((company: any) => company.companyName.toUpperCase() === capitalName);
            
            if (duplicateName) {
                alert("Já existe um Empresa com esse nome, coloque outro nome");
                return;
            }
            
            if (props.id) {
                await changeCompany(props.id, data);
            } else {
                await addCompany(data);
            }
        } catch (error) {
            console.log("Ocorreu um erro ao enviar o formulário:", error);
            alert("Ocorreu um erro ao enviar o formulário");
        }
    }

    async function addCompany(data: any) {
        try {
            await APIService.saveCompany(data);
            alert("Empresa criado com sucesso");
            singleSpa.navigateToUrl("/app-list-external-companies");
        } catch (error) {
            console.log("Ocorreu um erro ao criar o empresa:", error);
            alert("Erro ao criar o empresa");
        }
    }

    async function changeCompany(id: string, data: any) {
        try {
            await APIService.updateCompany(id, data);
            localStorage.removeItem('id'),
            localStorage.removeItem('companyName'),
            localStorage.removeItem('collaboratorsCount')
            localStorage.removeItem('isActive')

            alert("Empresa atualizada com sucesso");

            singleSpa.navigateToUrl("/app-list-external-companies");
        } catch (error) {
            console.log("Ocorreu um erro ao atualizar o empresa:", error);
            alert("Erro ao atualizar o empresa");
        }
    }

    function clearForm(){
        localStorage.removeItem('ext_id'),
        localStorage.removeItem('companyName'),
        localStorage.removeItem('collaboratorsCount')
        localStorage.removeItem('isActive')
        window.location.reload()
    }

    return (
        <div className="form-container">
            <h2>Cadastro de Empresas</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="companyName">Nome:</label>
                    <input
                        type="text"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="collaboratorsCount">Quantidade de colaboradores:</label>
                    <input
                        type="text"
                        name="collaboratorsCount"
                        value={formData.collaboratorsCount}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="isActive">Ativa:</label>
                    <input
                        type="text"
                        name="isActive"
                        value={formData.isActive}
                        onChange={handleChange}
                    />
                </div>
                <div className='form-butons'>
                <button type="submit">Enviar</button>
                <button className='clear-form' type='button' onClick={clearForm}>Limpar</button>
                </div>
            </form>
        </div>
    );
}
