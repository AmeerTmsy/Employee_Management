import React, { useState } from 'react';
import styles from './account.module.css'
import Profile from '../components/profile';
import AccountEdit from '../components/accountEdit';
function Account(props) {
    const [edit, setEdit] = useState(true)
    return (
        <div>
            { !edit && <Profile setEdit={setEdit} />}
            { edit && <AccountEdit setEdit={setEdit} />}
        </div>
    );
}

export default Account;