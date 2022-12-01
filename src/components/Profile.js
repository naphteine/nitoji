import React from "react";
import { useOutletContext } from "react-router-dom";
import jwt from 'jwt-decode' // import dependency

const Profile = (props) => {
    const { jwtToken } = useOutletContext();
    const user = jwt(jwtToken);

    return (
        <div>
            <h1>{user.name}</h1>
            <hr />

            <h2>Girdi sayısı</h2>
            <p>N/A</p>

            <h2>Başlık sayısı</h2>
            <p>N/A</p>
        </div>
    )
}

export default Profile;