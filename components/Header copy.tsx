import type { NextPage } from "next";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { Button } from "@mui/material";
import { signOut } from "firebase/auth";
import { useRouter } from "next/router";
import { auth, db } from "../app/firebaseApp";
import { doc, updateDoc } from "firebase/firestore";

import {
  useAuthState,
  useCreateUserWithEmailAndPassword,
} from "react-firebase-hooks/auth";
const Header: NextPage = () => {
  const router = useRouter();
  const [user] = useAuthState(auth);

  const docRef = doc(db, "users", user?.uid || "null");
  const [userProfile, loading, error] = useDocumentData(docRef);
  if (user) {
    return (
      <header className={styles.header}>
        <div>
          <Link className={styles.link} href="/">
            Главная
          </Link>
          <Link className={styles.link} href="/posts">
            Посты
          </Link>
        </div>
        <div>
          <span className={styles.authorized}>
            <b>Вы вошли как {userProfile?.name}</b> ({user.email})
          </span>

          <Button
            variant="outlined"
            sx={{ ml: 2, mr: 2 }}
            onClick={() => router.push("/auth/profile")}
          >
            Профиль
          </Button>
          <Button
            onClick={() => signOut(auth)}
            variant="outlined"
            color="error"
          >
            Выйти
          </Button>
        </div>
      </header>
    );
  } else {
    return (
      <header className={styles.header}>
        <Link className={styles.link} href="/">
          Главная
        </Link>
        <Link className={styles.link} href="/auth/register">
          Регистрация
        </Link>
        <Link className={styles.link} href="/auth/login">
          Авторизация
        </Link>
      </header>
    );
  }

  return (
    <header className={styles.header}>
      <Link className={styles.link} href="/">
        Главная
      </Link>
      <Link className={styles.link} href="/auth/register">
        Регистрация
      </Link>
    </header>
  );
};

export default Header;
