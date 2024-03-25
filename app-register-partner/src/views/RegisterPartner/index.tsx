import { useState } from "react";
import PartnerForm from "../../components/PartnerForm";

export function RegisterPartner(){
    // const _partner: any = location.state
    // const [partners] = useState(_partner)

    return (
        <div>

            <PartnerForm
                // id={products && products.id ? products.id : null}
                // name={products ? products.name : null}
                // description={products && products.description ? products.description : null}
            />

        </div>
    )
}