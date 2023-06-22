import { useEffect, useState } from "react";
import { ListResult } from "pocketbase";
import pb from "lib/pocketbase";
import styles from "@/styles/DictEntry.module.css";
import Link from "next/link";

export default function DictEntry(dict: any) {
  const [entryData, setEntryData] = useState<ListResult>();
  const [levelData, setLevelData] = useState<ListResult>();

  async function getAll() {
    const resultList = await pb
      .collection("nitoji_dictEntries")
      .getList(1, 50, {
        expand: "user",
        filter: `dict.id="${dict.data.id}" && star=true`,
        $autoCancel: false,
      });

    setEntryData(resultList);

    const levelList = await pb.collection("nitoji_dictTags").getList(1, 50, {
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
      <Link className={styles.entry_header} href={`/${dict.data.japanese}`}>
        {dict.data.japanese}
      </Link>{" "}
      {levelData?.items?.map((e) => (
        <Link
          className={styles.tag}
          href={`/tag/${e.expand.tag[0].name}`}
          key={e.id}
        >
          {e.expand.tag[0].name}
        </Link>
      ))}
      <ol>
        {entryData?.items?.map((e) => (
          <li key={e.id}>{e.content}</li>
        ))}
      </ol>
    </div>
  );
}
