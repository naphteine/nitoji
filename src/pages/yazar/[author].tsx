import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { useRouter } from "next/router";
import { ListResult, Record } from "pocketbase";
import { useEffect, useState } from "react";
import pb from "lib/pocketbase";
import styles from "@/styles/Author.module.css";

export default function Word() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(pb.authStore.isValid);
  }, []);

  return (
    <>
      <Header />

      <div className={styles.caption}>{router.query.author}</div>

      {isLoggedIn && <>Şifre değiştirme özelliği eklenecektir.</>}

      <Footer />
    </>
  );
}
