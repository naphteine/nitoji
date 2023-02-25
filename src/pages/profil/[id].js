import { useRouter } from "next/router";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const ProfilId = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      <Header />

      <main>Profil Görüntüleme Ekranı ID = {id}</main>

      <Footer />
    </>
  );
};

export default ProfilId;
