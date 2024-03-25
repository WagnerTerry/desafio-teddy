import React, { useState } from 'react';

import CompanyForm from "../../components/CompanyForm";

export function RegisterCompany(){
    const [companies] = useState({
        id: localStorage.getItem('ext_id'),
        companyName: localStorage.getItem('companyName'),
        collaboratorsCount: localStorage.getItem('collaboratorsCount'),
        isActive: localStorage.getItem('isActive'),
    });

    return (
        <div>
            <CompanyForm
                id={companies.id ? companies.id : null}
                companyName={companies.companyName ? companies.companyName : null}
                collaboratorsCount={companies.collaboratorsCount ? companies.collaboratorsCount : null}
                isActive={companies.isActive ? companies.isActive : null}
            />
        </div>
    )
}
