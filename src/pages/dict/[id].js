import { useRouter } from "next/router";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const DictId = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      <Header />

      <main>Başlık Görüntüleme Ekranı ID = {id}</main>

      <Footer />
    </>
  );
};

export default DictId;
