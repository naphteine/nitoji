import { useRouter } from "next/router";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const KonuId = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      <Header />

      <main>Konu Görüntüleme Ekranı ID = {id}</main>

      <Footer />
    </>
  );
};

export default KonuId;
