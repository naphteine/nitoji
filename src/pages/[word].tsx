import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { useRouter } from "next/router";
import { ListResult, Record } from "pocketbase";
import { useEffect, useState } from "react";
import pb from "lib/pocketbase";

export default function Word() {
  const router = useRouter();

  const [update, setUpdate] = useState(false);
  const [word, setWord] = useState<ListResult>();
  const [myEntries, setMyEntries] = useState<ListResult>();
  const [entryValue, setEntryValue] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  async function getAll() {
    const getWord = await pb.collection("nitoji_dict").getList(1, 50, {
      expand: "user",
      filter: `japanese="${router.query.word}"`,
      $autoCancel: false,
    });

    setWord(getWord);

    const getEntries = await pb
      .collection("nitoji_dictEntries")
      .getList(1, 50, {
        expand: "user",
        filter: `dict.japanese="${router.query.word}"`,
        sort: "created",
        $autoCancel: false,
      });

    setMyEntries(getEntries);

    console.log(getEntries);
  }

  async function newEntry(e: any) {
    e.preventDefault();

    if (entryValue.length < 3) {
      alert("ENTRY 3 KARAKTERDEN KISA OLAMAZ!");
      return;
    }

    console.log(entryValue);

    const entryData = {
      content: entryValue,
      dict: word?.items[0]?.id,
      user: pb.authStore.model?.id,
    };

    const entryRecord = await pb
      .collection("nitoji_dictEntries")
      .create(entryData);

    console.log(entryRecord);
    setEntryValue("");
    setUpdate(true);
  }

  function newEntryChanged(e: any) {
    setEntryValue(e.target.value);
  }

  useEffect(() => {
    setIsLoggedIn(pb.authStore.isValid);
    getAll();
    setUpdate(false);
  }, [update]);

  return (
    <>
      <Header />
      Dict: {router.query.word}
      <hr />
      {isLoggedIn && (
        <>
          <h4>Yeni entry</h4>
          <form onSubmit={newEntry}>
            <textarea onChange={newEntryChanged} />
            <button type="submit">Paylaş</button>
          </form>
        </>
      )}
      <h4>Entries</h4>
      <div>
        <ol>
          {myEntries?.items.map((e) => (
            <li key={e.id}>
              {e.content} - {e.expand.user.username} {e.star && "*yıldızlı*"}{" "}
              <em>{e.created}</em>
            </li>
          ))}
        </ol>
      </div>
      <Footer />
    </>
  );
}
