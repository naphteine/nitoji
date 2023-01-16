import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import jwt from 'jwt-decode';


const Profile = () => {
    // const [username, setUsername] = useState("");
    // const [email, setEmail] = useState("");
    // const [password, setPassword] = useState("");
    // const [newPassword, setNewPassword] = useState("");
    // const [newPasswordRepeat, setNewPasswordRepeat] = useState("");
    // const [signature, setSignature] = useState("");

    const [userData, setUserData] = useState([]);

    // const { setAlertClassName } = useOutletContext();
    // const { setAlertMessage } = useOutletContext();
    // const { toggleRefresh } = useOutletContext();

    const { jwtToken } = useOutletContext();
    const user = jwt(jwtToken);

    // const navigate = useNavigate();

    // const handleSubmit = (event) => {
    //     event.preventDefault();
    /*
            if (newPassword !== newPasswordRepeat) {
                setAlertClassName("alert-danger");
                setAlertMessage("Şifreler aynı değil!");
                return;
            }
            

    // build the request payload
    let payload = {
        email: email,
        password: password,
        user_name: username,
    };

    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(payload),
    };

    fetch(`${process.env.REACT_APP_BACKEND}/register`, requestOptions)
        .then((response) => response.json())
        .then((data) => {
            if (data.error) {
                setAlertClassName("alert-danger");
                setAlertMessage(data.message);
            } else {
                setAlertClassName("d-none");
                setAlertMessage("");
                toggleRefresh(true);
                navigate("/");
            }
        })
        .catch((error) => {
            setAlertClassName("alert-danger");
            setAlertMessage(error);
        });
    */
    // };

    useEffect(() => {
        const headers = new Headers();
        headers.append("Content-Type", "application/json");

        const requestOptions = {
            method: "GET",
            headers: headers,
        };

        fetch(`${process.env.REACT_APP_BACKEND}/profile/${user.sub}`, requestOptions)
            .then((response) => response.json())
            .then((data) => {
                setUserData(data);
            });
    }, [user.sub]);

    return (
        <div className="col-md-6 offset-md-3">
            <h1>{userData.user_name} ({user.name})</h1>

            <hr />
            <p>ID: {userData.id} ({user.sub})</p>
            {userData.signature && <p>İmza : {userData.signature}</p>}
            <p>Girdi sayısı: {userData.entry_count}</p>
            <p>Başlık sayısı: {userData.caption_count}</p>
            <hr />
            { /*
            <form onSubmit={handleSubmit}>
                <Input
                    title="Email Adresi"
                    type="email"
                    className="form-control"
                    name="email"
                    autoComplete="email-new"
                    onChange={(event) => setEmail(event.target.value)}
                />

                <Input
                    title="İmza"
                    type="signature"
                    className="form-control"
                    name="signature"
                    autoComplete="signature-new"
                    onChange={(event) => setSignature(event.target.value)}
                />

                <Input
                    title="Eski şifre"
                    type="password"
                    className="form-control"
                    name="password"
                    autoComplete="password"
                    onChange={(event) => setPassword(event.target.value)}
                />
                <Input
                    title="Yeni şifre"
                    type="password"
                    className="form-control"
                    name="password"
                    autoComplete="password-new"
                    onChange={(event) => setNewPassword(event.target.value)}
                />

                <Input
                    title=" Yeni şifre tekrar"
                    type="password"
                    className="form-control"
                    name="password-repeat"
                    autoComplete="password-new"
                    onChange={(event) => setNewPasswordRepeat(event.target.value)}
                />

                <hr />

                <input type="submit" className="btn btn-info" value="Güncelle" />
            </form>
    */}
        </div>
    );
};

export default Profile;