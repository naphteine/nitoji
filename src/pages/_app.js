import Link from "next/link";
import { useState, useEffect } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import "../styles/globals.css";
import { supabase } from "../lib/supabase";

function MyApp({ Component, pageProps }) {
  const [session, setSession] = useState(null);

  useEffect(() => {
    setSession(supabase.auth.getSession());
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);
  return (
    <div>
      <Header session={session} />
      <Component {...pageProps} session={session} />
      <Footer />
    </div>
  );
}

export default MyApp;