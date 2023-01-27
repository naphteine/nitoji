
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import { supabase } from "../lib/supabase";
import CaptionCard from "../components/CaptionCard";

export default function Home({ session }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWorkouts();
  }, []);

  const fetchWorkouts = async () => {
    const { data: { session }, } = await supabase.auth.getSession();
    const { user } = session | null;

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("workouts")
        .select("*");

      if (error) throw error;
      setData(data);
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className={styles.loading}>Başlıklar yükleniyor...</div>;
  }

  const handleDelete = async (id) => {
    try {
      const { data: { session }, } = await supabase.auth.getSession();
      const { user } = session;

      if (user == null) {
        alert("Giriş yapınız");
        return;
      }

      const { data, error } = await supabase
        .from("workouts")
        .delete()
        .eq("id", id)
        .eq("user_id", user?.id);
      fetchWorkouts();
      if (error) throw error;
      alert("Başlık başarıyla silindi");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Anasayfa - Nitoji</title>
        <meta name="description" content="Nitoji Türkçe-Japonca Sözlük" />
      </Head>

      <div className={styles.home}>

          <div>
            {session?.user &&
            <p className={styles.workoutHeading}>
              Tekrar hoşgeldin, <span className={styles.email}>{session.user.email}</span>
            </p>
}
            {data?.length === 0 ? (
              <div className={styles.noWorkout}>
                <p>Henüz bir başlık yok...</p>
                <Link href="/create">
                  <button className={styles.button}>
                    {" "}
                    Yeni başlık aç
                  </button>
                </Link>
              </div>
            ) : (
              <div>
                <p className={styles.workoutHeading}>Başlıklar</p>
                {data.map((d) => {
                  {d.title}
                })}
                <CaptionCard data={data} handleDelete={handleDelete} />
              </div>
            )}
          </div>
      </div>
    </div>
  );
}