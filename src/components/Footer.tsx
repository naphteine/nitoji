import { useEffect, useState } from "react";
import pb from "lib/pocketbase";
import styles from "../styles/Footer.module.css";

export default function Footer() {
  const [toplamBaslik, setToplamBaslik] = useState(0);
  const [toplamGirdi, setToplamGirdi] = useState(0);

  async function getToplams() {
    const { totalItems: baslik } = await pb
      .collection("nitoji_dict")
      .getList(1, 1, { $autoCancel: false });
    const { totalItems: girdi } = await pb
      .collection("nitoji_dictEntries")
      .getList(1, 1, { $autoCancel: false });

    setToplamBaslik(baslik);
    setToplamGirdi(girdi);
  }

  useEffect(() => {
    getToplams();
  }, []);

  return (
    <>
      <footer className={styles.footer}>
        <p>
          Sistemde toplam {toplamBaslik} başlık - {toplamGirdi} girdi var.
        </p>
        <div className={styles.two_sides}>
          <p>Tüm hakları saklıdır. Nitoji &copy; 2022-2023.</p>
          <a className={styles.gg} href="https://www.gokaygultekin.dev">
            Gökay Gültekin
          </a>
        </div>
      </footer>
    </>
  );
}
