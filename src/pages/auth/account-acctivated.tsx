import React from 'react';
import {useActivateAccountMutation} from "../../services/auth";
import {useParams} from "react-router-dom";

const AccountActivated = () =>  {

    let { token } = useParams();
    const [activateAccount, {data}] = useActivateAccountMutation();

    const activate = () => {
            activateAccount(token);
    }

    return (
        <>
            {!data && <h2>Potvrdite svoj račun</h2>}
            {!data && (
                <button onClick={() => activate()} className="activate-button">Aktiviraj račun</button>
            )}
            {data && <h2>Račun aktiviran. Možete se prijaviti</h2>}

            <div className="links">
                <a href='/login'>Prijava</a>
            </div>

        </>
    );

};

export default AccountActivated;
