import React, { useState } from 'react';
import APIService from "../services/APIService";
import * as singleSpa from "single-spa";

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
        const data = { ...formData }; // Copia dos dados do formulário
        try {
            const capitalName = data.name?.toUpperCase(); // Converte o nome para maiúsculas
            const products = await APIService.getPartners();
            const duplicateName = products.some((partner: any) => partner.name.toUpperCase() === capitalName);
            
            if (duplicateName) {
                alert("Já existe um produto com esse nome, coloque outro nome");
                return;
            }
            
            if (props.id) {
                await changeProduct(props.id, data);
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
            alert("Produto criado com sucesso");
            singleSpa.navigateToUrl("/app-home");
        } catch (error) {
            console.log("Ocorreu um erro ao criar o produto:", error);
            alert("Erro ao criar o produto");
        }
    }

    async function changeProduct(id: string, data: PartnerFormProps) {
        try {
            await APIService.updatePartner(id, data);
            alert("Produto atualizado com sucesso");
            singleSpa.navigateToUrl("/app-home");
        } catch (error) {
            console.log("Ocorreu um erro ao atualizar o produto:", error);
            alert("Erro ao atualizar o produto");
        }
    }

    return (
        <div>
            <h1>Formulário</h1>
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
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Enviar</button>
            </form>
        </div>
    );
}
