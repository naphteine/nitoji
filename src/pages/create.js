import { supabase } from "../lib/supabase";
import { useState, useEffect } from "react";
import styles from "../styles/Create.module.css";
import { useRouter } from "next/router";

const Create = () => {
  const initialState = {
    title: "",
    loads: "",
    reps: "",
  };

  const router = useRouter();
  const [workoutData, setWorkoutData] = useState(initialState);

  const { title, loads, reps } = workoutData;

  const handleChange = (e) => {
    setWorkoutData({ ...workoutData, [e.target.name]: e.target.value });
  };

  const createWorkout = async () => {
    const { data: { session }, } = await supabase.auth.getSession();

    const { user } = session;

    if (!user) {
      alert("Lütfen giriş yapın");
      return;
    }

    const { data, error } = await supabase
      .from("workouts")
      .insert({
        title,
        loads,
        reps,
        user_id: user?.id,
      })
      .single();
    alert("Başlık başarıyla yaratıldı");
    setWorkoutData(initialState);
    router.push("/");
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.form}>
          <p className={styles.title}>Yeni Başlık Aç</p>
          <label className={styles.label}>Başlık</label>
          <input
            type="text"
            name="title"
            value={title}
            onChange={handleChange}
            className={styles.input}
            placeholder="Başlık giriniz"
          />
          <label className={styles.label}>Açıklama</label>
          <input
            type="text"
            name="loads"
            value={loads}
            onChange={handleChange}
            className={styles.input}
            placeholder="Açıklama giriniz"
          />

          <button className={styles.button} onClick={createWorkout}>
            Başlık Aç
          </button>
        </div>
      </div>
    </>
  );
};

export default Create;