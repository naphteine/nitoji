import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import pb from "lib/pocketbase";

export default function Login() {
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");

  const { push } = useRouter();

  async function Login(email: string, password: string) {
    try {
      const authData = await pb
        .collection("users")
        .authWithPassword(email, password);
      if (authData) {
        console.log(authData);
        push("/");
      } else {
        // Giriş başarısız durumunda hata işlemleri
      }
    } catch (error) {
      // Hata işlemleri
    }
  }

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log("Logging in...");
    Login(inputEmail, inputPassword);
  }

  function emailChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInputEmail(e.target.value);
  }

  function passwdChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInputPassword(e.target.value);
  }

  useEffect(() => {
    if (pb.authStore.isValid === true) {
      push("/");
    }
  }, [pb.authStore.isValid]);

  return (
    <>
      <Header />

      <main>
        <form onSubmit={submit}>
          <input
            onChange={emailChange}
            type="email"
            id="email"
            name="email"
            placeholder="E-Mail"
          />
          <input
            onChange={passwdChange}
            type="password"
            id="passwd"
            name="passwd"
            placeholder="Şifre"
          />
          <button type="submit">Giriş yap</button>
        </form>
      </main>

      <Footer />
    </>
  );
}
