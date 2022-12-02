import React, { useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import jwt from 'jwt-decode' // import dependency
import Input from "./form/Input";

const Profile = (props) => {
    const { jwtToken } = useOutletContext();
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const user = jwt(jwtToken);

    const handleSubmit = () => {
        console.log("heyo");
    }

    return (
        <div>
            <h1>{user.name}</h1>
            <hr />

            <h2>Girdi sayısı</h2>
            <p>N/A</p>

            <h2>Başlık sayısı</h2>
            <p>N/A</p>

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
                    title="Mevcut şifre"
                    type="password"
                    className="form-control"
                    name="password"
                    autoComplete="password-current"
                    onChange={(event) => setPassword(event.target.value)}
                />

                <Input
                    title="Yeni şifre"
                    type="password"
                    className="form-control"
                    name="password-new"
                    autoComplete="password-new"
                    onChange={(event) => setPassword(event.target.value)}
                />

                <Input
                    title="Yeni şifre tekrar"
                    type="password"
                    className="form-control"
                    name="password-repeat"
                    autoComplete="password-new-repeat"
                    onChange={(event) => setPassword(event.target.value)}
                />
                <input type="submit" className="btn btn-primary" value="Giriş yap" />

                <Link to="/kayit" className="btn btn-info m-2">
                    Kayıt ol
                </Link>
            </form>
        </div>
    )
}

export default Profile;