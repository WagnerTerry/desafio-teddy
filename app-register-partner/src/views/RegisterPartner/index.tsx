import React, { useState } from 'react';

import PartnerForm from "../../components/PartnerForm";

export function RegisterPartner(){
    const [partners] = useState({
        id: localStorage.getItem('id'),
        name: localStorage.getItem('name'),
        description: localStorage.getItem('description')
    });

    return (
        <div>
            <PartnerForm
                id={partners.id ? partners.id : null}
                name={partners.name ? partners.name : null}
                description={partners.description ? partners.description : null}
            />
        </div>
    )
}
