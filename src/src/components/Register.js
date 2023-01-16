import { useState } from "react";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import Input from "./form/Input";

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordRepeat, setPasswordRepeat] = useState("");
    const [username, setUsername] = useState("");

    const { setAlertClassName } = useOutletContext();
    const { setAlertMessage } = useOutletContext();
    const { toggleRefresh } = useOutletContext();

    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();

        if (password !== passwordRepeat) {
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
    };

    return (
        <div className="col-md-6 offset-md-3">
            <h2>Yeni Üyelik</h2>
            <hr />

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
                    title="Kullanıcı adı"
                    type="text"
                    className="form-control"
                    name="username"
                    autoComplete="username-new"
                    onChange={(event) => setUsername(event.target.value)}
                />
                <Input
                    title="Şifre"
                    type="password"
                    className="form-control"
                    name="password"
                    autoComplete="password-new"
                    onChange={(event) => setPassword(event.target.value)}
                />

                <Input
                    title="Şifre tekrar"
                    type="password"
                    className="form-control"
                    name="password-repeat"
                    autoComplete="password-new"
                    onChange={(event) => setPasswordRepeat(event.target.value)}
                />

                <hr />

                <input type="submit" className="btn btn-info" value="Kaydol" />

                <Link to="/giris" className="btn btn-primary m-2">
                    Giriş yap
                </Link>
            </form>
        </div>
    );
};

export default Register;
