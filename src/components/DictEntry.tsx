import { useEffect, useState } from "react";
import { ListResult } from "pocketbase";
import pb from "lib/pocketbase";

export default function DictEntry(dict: any) {
  const [entryData, setEntryData] = useState<ListResult>();

  async function getAll() {
    const resultList = await pb.collection("dictEntries").getList(1, 50, {
      expand: "user",
      filter: `dict.id="${dict.data.id}" && star=true`,
      $autoCancel: false,
    });

    setEntryData(resultList);
  }

  useEffect(() => {
    getAll();
  }, []);

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
