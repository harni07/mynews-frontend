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
            {!data && <h2>Activate your account</h2>}
            {!data && (
                <button onClick={() => activate()} className="btn-primary p-2">Activate</button>
            )}
            {data && <h2>Account activated. You can login into your account</h2>}

            <div className="links">
                <a href='/login'>Login</a>
            </div>

        </>
    );

};

export default AccountActivated;
