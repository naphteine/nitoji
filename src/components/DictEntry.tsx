import { useEffect, useState } from "react";
import { ListResult } from "pocketbase";
import pb from "lib/pocketbase";
import styles from "@/styles/DictEntry.module.css";
import Link from "next/link";

export default function DictEntry(dict: any) {
  const [entryData, setEntryData] = useState<ListResult>();
  const [levelData, setLevelData] = useState<ListResult>();

  async function getAll() {
    const resultList = await pb.collection("dictEntries").getList(1, 50, {
      expand: "user",
      filter: `dict.id="${dict.data.id}" && star=true`,
      $autoCancel: false,
    });

    setEntryData(resultList);

    const levelList = await pb.collection("dictTags").getList(1, 50, {
      expand: "tag",
      filter: `word.id="${dict.data.id}"`,
      $autoCancel: false,
    });

    setLevelData(levelList);

    console.log(levelList);
  }

  useEffect(() => {
    getAll();
  }, []);

  return (
    <div className={styles.entry}>
      <Link href={`/${dict.data.japanese}`}>{dict.data.japanese}</Link> (
      {levelData?.items?.map((e) => (
        <span key={e.id}>{e.expand.tag[0].name}</span>
      ))}
      )
      <ol>
        {entryData?.items?.map((e) => (
          <li key={e.id}>{e.content}</li>
        ))}
      </ol>
    </div>
  );
}
