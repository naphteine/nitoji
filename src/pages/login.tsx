import PocketBase from "pocketbase";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState } from "react";
import { useRouter } from "next/router";

export default function Login() {
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");

  const pb = new PocketBase("http://127.0.0.1:8090");

  const { push } = useRouter();

  async function Login(email: string, password: string) {
    const authData = await pb
      .collection("users")
      .authWithPassword(email, password);
  }

  function submit(e: any) {
    e.preventDefault();
    console.log("Logging in...");
    Login(inputEmail, inputPassword);
    push("/");
  }

  function emailChange(e: any) {
    setInputEmail(e.target.value);
  }

  function passwdChange(e: any) {
    setInputPassword(e.target.value);
  }

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
