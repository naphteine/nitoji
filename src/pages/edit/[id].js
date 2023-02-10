import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "../../styles/Edit.module.css";
import { supabase } from "../../lib/supabase";

const Edit = ({ session }) => {
  const [caption, setCaption] = useState(null);
  const router = useRouter();

  const { id } = router.query;
  useEffect(() => {
    const getCaption = async () => {
      if (!id) return;

      const { data } = await supabase
        .from("captions")
        .select("*")
        .filter("id", "eq", id)
        .single();
      setCaption(data);
    };
    getCaption();
  }, [id]);

  const handleOnChange = (e) => {
    setCaption({
      ...caption,
      [e.target.name]: e.target.value,
    });
  };

  const updateCaption = async () => {
    const { title, loads, reps } = caption;
    
    const { data: { session }, } = await supabase.auth.getSession();

    if (session == null) {
      alert("Giriş yapınız!");
      return;
    }

    const { user } = session;

    if (user == null) {
      alert("Giriş yapın!");
      return;
    }

    const { data } = await supabase
      .from("captions")
      .update({
        title,
        loads,
        reps,
      })
      .eq("id", id)
      .eq("user_id", user?.id);

    alert("Başlık güncellendi");

    router.push("/");
  };
  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h1 className={styles.title}>Başlığı Düzenle</h1>
        <label className={styles.label}>Başlık:</label>
        <input
          type="text"
          name="title"
          value={caption?.title}
          onChange={handleOnChange}
          className={styles.input}
        />
        <label className={styles.label}>Okunuş:</label>
        <input
          type="text"
          name="loads"
          value={caption?.loads}
          onChange={handleOnChange}
          className={styles.input}
        />

        <button onClick={updateCaption} className={styles.button}>
          Güncelle
        </button>
      </div>
    </div>
  );
};

export default Edit;