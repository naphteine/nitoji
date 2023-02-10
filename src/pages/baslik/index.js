import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import Card from "../../components/Card";
import Button from "../../components/Button"
import { supabase } from "../../lib/supabase";
import styles from "../../styles/Create.module.css";

const Create = () => {
  const initialState = {
    title: "",
    loads: "",
    reps: "",
  };

  const router = useRouter();
  const [captionData, setCaptionData] = useState(initialState);

  const { title, loads, reps } = captionData;

  const handleChange = (e) => {
    setCaptionData({ ...captionData, [e.target.name]: e.target.value });
  };

  const createCaption = async () => {
    const { data: { session }, } = await supabase.auth.getSession();

    const { user } = session;

    if (!user) {
      alert("Lütfen giriş yapın");
      return;
    }

    const { data, error } = await supabase
      .from("captions")
      .insert({
        title,
        loads,
        reps,
        user_id: user?.id,
      })
      .single();
      
    alert("Başlık başarıyla yaratıldı");
    setCaptionData(initialState);
    router.push("/");
  };

  return (
    <React.Fragment>
      <Card>
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
          <label className={styles.label}>Türkçe</label>
          <input
            type="text"
            name="reps"
            value={reps}
            onChange={handleChange}
            className={styles.input}
            placeholder="Türkçe çeviri giriniz"
          />

          <Button onClick={createCaption}>Başlık Aç</Button>
      </Card>
    </React.Fragment>
  );
};

export default Create;