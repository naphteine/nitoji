import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import pb from "lib/pocketbase";

export default function New() {
  const [yeniBaslik, setYeniBaslik] = useState("");
  const [yeniGirdi, setYeniGirdi] = useState("");

  const { push } = useRouter();

  useEffect(() => {
    if (!pb.authStore.isValid) {
      push("/");
    }
  }, []);

  function baslikDegisti(e: any) {
    setYeniBaslik(e.target.value);
  }

  function girdiDegisti(e: any) {
    setYeniGirdi(e.target.value);
  }

  async function submitted(e: any) {
    e.preventDefault();
    console.log(yeniBaslik, yeniGirdi);

    // başlık verisi
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
  }

  return (
    <>
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
        <button type="submit">Gönder</button>
      </form>
    </>
  );
}
