
import { useRouter } from "next/router";
import { useState } from "react";
import styles from "../styles/Login.module.css";
import { supabase } from "../lib/supabase";
import Button from "../components/Button";
import Card from "../components/Card";

const Login = () => {
  const initialState = {
    email: "",
    password: "",
  };

  const router = useRouter();

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
            const { data: { user }, error } = await supabase.auth.signInWithPassword({
              email,
              password,
            });
            if (error) alert(error.message);
            // push to home page
            router.push("/");
          }}
          className={styles.button}
        >
          Giriş yap
        </Button>
      </Card>
  );
};

export default Login;