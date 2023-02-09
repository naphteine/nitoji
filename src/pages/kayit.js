import { useState } from "react";
import Button from "../components/Button";
import Card from "../components/Card";
import { supabase } from "../lib/supabase";
import styles from "../styles/Signup.module.css";

const Signup = () => {
  const initialState = {
    email: "",
    password: "",
  };

  const [form, setForm] = useState(initialState);

  const { email, password } = form;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  return (
    <Card>
        <input
          type="text"
          value={email}
          name="email"
          onChange={handleChange}
          className={styles.input}
          placeholder="E-Mail adresinizi giriniz"
        />
        <input
          type="password"
          value={password}
          name="password"
          onChange={handleChange}
          className={styles.input}
          placeholder="Şifrenizi giriniz"
        />
        <Button
          onClick={async () => {
            const { error } = await supabase.auth.signUp({
              email,
              password,
            });

            if (error) alert(error.message);
            alert("Check your email for the login link!");
            setForm(initialState);
          }}
          className={styles.button}
        >
          Kayıt
        </Button>
    </Card>
  );
};

export default Signup;