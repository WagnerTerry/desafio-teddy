import React, { useState } from 'react';
import * as singleSpa from "single-spa";
import APIService from '../services/APIService';
import './styles.css';

interface PartnerFormProps {
    id?: string;
    name?: string;
    description?: string;
}

export default function PartnerForm(props: PartnerFormProps) {
    const [formData, setFormData] = useState<PartnerFormProps>({
        name: props.name || '',
        description: props.description || ''
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

        if (!formData.name) {
            alert("Por favor, preencha o campo 'Nome'");
            return;
        }

        const data = { ...formData }; 
        try {
            const capitalName = data.name?.toUpperCase(); 
            const partners = await APIService.getPartners();
            const duplicateName = partners.some((partner: any) => partner.name.toUpperCase() === capitalName);
            
            if (duplicateName) {
                alert("Já existe um parceiro com esse nome, coloque outro nome");
                return;
            }
            
            if (props.id) {
                await changePartner(props.id, data);
            } else {
                await addPartner(data);
            }
        } catch (error) {
            console.log("Ocorreu um erro ao enviar o formulário:", error);
            alert("Ocorreu um erro ao enviar o formulário");
        }
    }

    async function addPartner(data: any) {
        try {
            await APIService.savePartner(data);
            alert("Parceiro criado com sucesso");
            singleSpa.navigateToUrl("/app-list-partners");
        } catch (error) {
            console.log("Ocorreu um erro ao criar o parceiro:", error);
            alert("Erro ao criar o parceiro");
        }
    }

    async function changePartner(id: string, data: PartnerFormProps) {
        try {
            await APIService.updatePartner(id, data);
            localStorage.removeItem('id'),
            localStorage.removeItem('name'),
            localStorage.removeItem('description')
            alert("parceiro atualizado com sucesso");

            singleSpa.navigateToUrl("/app-list-partners");
        } catch (error) {
            console.log("Ocorreu um erro ao atualizar o parceiro:", error);
            alert("Erro ao atualizar o parceiro");
        }
    }

    function clearForm(){
        localStorage.removeItem('id'),
        localStorage.removeItem('name'),
        localStorage.removeItem('description')
        window.location.reload()
    }

    return (
        <div className="form-container">
            <h2>Cadastro de parceiros</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Nome:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="description">Descrição:</label>
                    <input
                        type="text"
                        id="description"
                        name="description"
                        value={formData.description}
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
