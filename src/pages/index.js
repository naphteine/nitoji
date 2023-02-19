import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import EditCaption from "./components/EditCaption";
import ErrorPage from "./components/ErrorPage";
import Genres from "./components/Genres";
import Login from "./components/Login";
import Register from "./components/Register";
import Mod from "./components/Mod";
import Captions from "./components/Captions";
import Caption from "./components/Caption";
import OneGenre from "./components/OneGenre";
import Profile from "./components/Profile";
import UserProfile from "./components/UserProfile";
import MultipleCaptions from "./components/MultipleCaptions";
import "bootstrap/dist/css/bootstrap.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Captions /> },
      {
        path: "/dict/:id",
        element: <Caption />,
      },
      {
        path: "/konular",
        element: <Genres />,
      },
      {
        path: "/konu/:id",
        element: <OneGenre />,
      },
      {
        path: "/yeni",
        element: <EditCaption />,
      },
      {
	path: "/toplu",
	element: <MultipleCaptions />,
      },
      {
        path: "/mod/dict/:id",
        element: <EditCaption />,
      },
      {
        path: "/mod",
        element: <Mod />,
      },
      {
        path: "/giris",
        element: <Login />,
      },
      {
        path: "/kayit",
        element: <Register />
      },
      {
        path: "/profil",
        element: <Profile />,
      },
      {
        path: "/profile/:id",
        element: <UserProfile />
      }
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);


// import Head from "next/head";
// import Link from "next/link";
// import { useEffect, useState } from "react";
// import styles from "../styles/Home.module.css";
// import { supabase } from "../lib/supabase";
// import CaptionCard from "../components/CaptionCard";

// export default function Home({ session }) {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchCaptions();
//   }, []);

//   const fetchCaptions = async () => {
//     const { data: { session }, } = await supabase.auth.getSession();
//     const { user } = session | null;

//     try {
//       setLoading(true);
//       const { data, error } = await supabase
//         .from("captions")
//         .select("*");

//       if (error) throw error;
//       setData(data);
//     } catch (error) {
//       alert(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) {
//     return <div className={styles.loading}>Başlıklar yükleniyor...</div>;
//   }

//   const handleDelete = async (id) => {
//     try {
//       const { data: { session }, } = await supabase.auth.getSession();
//       const { user } = session;

//       if (user == null) {
//         alert("Giriş yapınız");
//         return;
//       }

//       const { data, error } = await supabase
//         .from("captions")
//         .delete()
//         .eq("id", id)
//         .eq("user_id", user?.id);
//       fetchCaptions();
//       if (error) throw error;
//       alert("Başlık başarıyla silindi");
//     } catch (error) {
//       alert(error.message);
//     }
//   };

//   return (
//     <div className={styles.container}>
//       <Head>
//         <title>Anasayfa - Nitoji</title>
//         <meta name="description" content="Nitoji Türkçe-Japonca Sözlük" />
//       </Head>

//       <div className={styles.home}>

//           <div>
//             {session?.user &&
//             <p className={styles.captionHeading}>
//               Tekrar hoşgeldin, <span className={styles.email}>{session.user.email}</span>
//             </p>
// }
//             {data?.length === 0 ? (
//               <div className={styles.noCaption}>
//                 <p>Henüz bir başlık yok...</p>
//                 <Link href="/create">
//                   <button className={styles.button}>
//                     {" "}
//                     Yeni başlık aç
//                   </button>
//                 </Link>
//               </div>
//             ) : (
//               <div>
//                 {data.map((d) => {
//                   {d.title}
//                 })}
//                 <CaptionCard data={data} handleDelete={handleDelete} />
//               </div>
//             )}
//           </div>
//       </div>
//     </div>
//   );
// }