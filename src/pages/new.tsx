import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import pb from "lib/pocketbase";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import styles from "@/styles/New.module.css";

export default function New() {
  const [yeniBaslik, setYeniBaslik] = useState("");
  const [yeniGirdi, setYeniGirdi] = useState("");
  const [yeniSeviye, setYeniSeviye] = useState("");
  const [yeniType, setYeniType] = useState("");

  const { push } = useRouter();

  useEffect(() => {
    if (!pb.authStore.isValid) {
      push("/");
    }
  }, []);

  const baslikDegisti = (e: any) => {
    setYeniBaslik(e.target.value);
  };

  const girdiDegisti = (e: any) => {
    setYeniGirdi(e.target.value);
  };

  const seviyeDegisti = (e: any) => {
    setYeniSeviye(e.target.value);
  };

  const typeDegisti = (e: any) => {
    setYeniType(e.target.value);
  };

  async function submitted(e: any) {
    e.preventDefault();
    console.log(yeniBaslik, yeniGirdi);

    // başlık verisi
    try {
      const data = {
        japanese: yeniBaslik,
        user: pb.authStore.model?.id,
      };

      const record = await pb.collection("nitoji_dict").create(data);

      // girdi verisi
      const entryData = {
        content: yeniGirdi,
        dict: record.id,
        user: pb.authStore.model?.id,
        star: true,
      };

      const entryRecord = await pb
        .collection("nitoji_dictEntries")
        .create(entryData);

      // seviye
      if (yeniSeviye !== null && yeniSeviye !== "") {
        const level = await pb
          .collection("nitoji_tags")
          .getFirstListItem(`name="${yeniSeviye}"`);

        const levelData = {
          word: record.id,
          tag: level.id,
          user: pb.authStore.model?.id,
        };

        const levelRecord = await pb
          .collection("nitoji_dictTags")
          .create(levelData);
      }

      // type
      if (yeniType !== null && yeniType !== "") {
        const type = await pb
          .collection("nitoji_tags")
          .getFirstListItem(`name="${yeniType}"`);

        const typeData = {
          word: record.id,
          tag: type.id,
          user: pb.authStore.model?.id,
        };

        const typeRecord = await pb
          .collection("nitoji_dictTags")
          .create(typeData);
      }
    } catch (error) {
      alert("Hata yaşandı!");
      console.log(error);
    }
  }

  return (
    <>
      <Header />

      <main className={styles.new}>
        <h1>Yeni Kelime</h1>

        <form className={styles.new_form} onSubmit={submitted}>
          <label htmlFor="caption">Japonca (Başlık)</label>
          <input
            type="text"
            name="caption"
            id="caption"
            autoComplete="off"
            onChange={baslikDegisti}
            required
          />
          <br />
          <label htmlFor="entry">Türkçe (İlk girdi)</label>
          <input
            type="text"
            name="entry"
            id="entry"
            autoComplete="off"
            onChange={girdiDegisti}
            required
          />
          <br />
          <label htmlFor="level">JLPT</label>
          <select name="level" id="level" onChange={seviyeDegisti}>
            <option value="">Yok</option>
            <option value="n5">n5</option>
            <option value="n4">n4</option>
            <option value="n3">n3</option>
            <option value="n2">n2</option>
            <option value="n1">n1</option>
          </select>
          <br />
          <label htmlFor="type">Tür</label>
          <select name="type" id="type" onChange={typeDegisti}>
            <option value="">Yok</option>
            <option value="五段動詞">五段動詞</option>
            <option value="一段動詞">一段動詞</option>
            <option value="漢字">漢字</option>
            <option value="単語">単語</option>
            <option value="ことわざ">ことわざ</option>
          </select>
          <br />
          <button type="submit">Gönder</button>
        </form>
      </main>

      <Footer />
    </>
  );
}
