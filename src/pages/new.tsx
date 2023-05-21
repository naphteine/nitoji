import { useRouter } from "next/router";
import PocketBase from "pocketbase";
import { useEffect } from "react";

export default function New() {
  const { push } = useRouter();
  const pb = new PocketBase("http://127.0.0.1:8090");

  useEffect(() => {
    if (!pb.authStore.isValid) {
      push("/");
    }
  }, []);

  return <>Hello</>;
}
