import { useEffect, useState } from "react";
import PocketBase, { ListResult } from "pocketbase";

export default function DictEntry(dict: any) {
  const [entryData, setEntryData] = useState<ListResult>();

  async function getAll() {
    const pb = new PocketBase("http://127.0.0.1:8090");
    const resultList = await pb.collection("dictEntries").getList(1, 50, {
      expand: "user",
      filter: `dict.id="${dict.data.id}"`,
    });

    setEntryData(resultList);
    console.log(resultList);
  }

  useEffect(() => {
    getAll();
  }, []);

  console.log(dict);

  return (
    <div>
      {dict.data.japanese}

      <ol>
        {entryData?.items?.map((e) => (
          <li key={e.id}>{e.content}</li>
        ))}
      </ol>
    </div>
  );
}
