import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import pb from "lib/pocketbase";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function New() {
  const [yeniBaslik, setYeniBaslik] = useState("");
  const [yeniGirdi, setYeniGirdi] = useState("");
  const [yeniSeviye, setYeniSeviye] = useState("");

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

  async function submitted(e: any) {
    e.preventDefault();
    console.log(yeniBaslik, yeniGirdi);

    // başlık verisi
    try {
      const data = {
        japanese: yeniBaslik,
        user: pb.authStore.model?.id,
      };

      const record = await pb.collection("dict").create(data);

      // girdi verisi
      const entryData = {
        content: yeniGirdi,
        dict: record.id,
        user: pb.authStore.model?.id,
        star: true,
      };

      const entryRecord = await pb.collection("dictEntries").create(entryData);

      // seviye
      if (yeniSeviye !== null && yeniSeviye !== "") {
        const level = await pb
          .collection("tags")
          .getFirstListItem(`name="${yeniSeviye}"`);

        const levelData = {
          word: record.id,
          tag: level.id,
          user: pb.authStore.model?.id,
        };

        const levelRecord = await pb.collection("dictTags").create(levelData);
      }
    } catch (error) {
      alert("Hata yaşandı!");
      console.log(error);
    }
  }

  return (
    <>
      <Header />
      <h1>Yeni Başlık Ekranı</h1>

      <form onSubmit={submitted}>
        <label htmlFor="caption">Başlık</label>
        <input
          type="text"
          name="caption"
          id="caption"
          onChange={baslikDegisti}
          required
        />
        <label htmlFor="entry">İlk girdi</label>
        <input
          type="text"
          name="entry"
          id="entry"
          onChange={girdiDegisti}
          required
        />
        <label htmlFor="level">JLPT</label>
        <select name="level" id="level" onChange={seviyeDegisti}>
          <option value="">Yok</option>
          <option value="n5">n5</option>
          <option value="n4">n4</option>
          <option value="n3">n3</option>
          <option value="n2">n2</option>
          <option value="n1">n1</option>
        </select>
        <button type="submit">Gönder</button>
      </form>

      <Footer />
    </>
  );
}
