import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const UserProfile = () => {
    const [userData, setUserData] = useState([]);

    let { id } = useParams();

    useEffect(() => {
        const headers = new Headers();
        headers.append("Content-Type", "application/json");

        const requestOptions = {
            method: "GET",
            headers: headers,
        };

        fetch(`${process.env.REACT_APP_BACKEND}/profile/${id}`, requestOptions)
            .then((response) => response.json())
            .then((data) => {
                setUserData(data);
            });
    }, []);

    return (
        <div className="col-md-6 offset-md-3">
            <h1>{userData.user_name}</h1>

            <hr />
            <p>ID: {userData.id}</p>
            {userData.signature && <p>İmza : {userData.signature}</p>}
            <p>Girdi sayısı: {userData.entry_count}</p>
            <p>Başlık sayısı: {userData.caption_count}</p>
        </div>
    );
};

export default UserProfile;