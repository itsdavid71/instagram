import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useForm } from "react-hook-form";
import React, { useState } from "react";
import styles from "../styles/Home.module.css";
import Header from "../components/header";
import { TextField, Box, Button, Alert } from "@mui/material";

import { updateProfile } from "firebase/auth";
import { auth } from "../app/firebaseApp";
import {
  useAuthState,
  useCreateUserWithEmailAndPassword,
} from "react-firebase-hooks/auth";

type FormData = {
  displayName: string;
  email: string;
  password: string;
};
const Home: NextPage = () => {
  const [user] = useAuthState(auth);

  const { register, handleSubmit } = useForm<FormData>();
  const onSubmit = handleSubmit((data) => {
    // updateProfile(data.email, data.password).then(function () {});
    if (user) {
      updateProfile(user, {
        displayName: data.displayName,
        photoURL: "erik.jpg",
      });
    }
  });
  if (user) {
    // setEmail(user);
    return (
      <div>
        <h2>Привет, {user.displayName} </h2>
        <form onSubmit={onSubmit}>
          <p>
            <b>Ваша почта: </b>
            {user.email}
          </p>
          {/* <Box>
            <TextField
              type="email"
              fullWidth
              {...register("email")}
              placeholder="Ваш email"
              // value={user.email}
            />
          </Box> */}
          {/* <Box>
            <TextField
              type="password"
              fullWidth
              {...register("password")}
              // onChange={(e) => setValue(e.target.value)}
              placeholder="Укажите новый пароль"
              sx={{ mt: 2 }}
            />
          </Box> */}
          {/* <Box>
            <TextField
              type="password"
              fullWidth
              {...register("password")}
              // onChange={(e) => setValue(e.target.value)}
              placeholder="Повторите новый пароль"
              sx={{ mt: 2 }}
            />
          </Box> */}
          <Box>
            <TextField
              type="text"
              {...register("displayName")}
              fullWidth
              // onChange={(e) => setValue(e.target.value)}
              placeholder="Введите имя"
              sx={{ mt: 2 }}
            />
          </Box>
          <Button
            type="submit"
            fullWidth
            sx={{ mt: 2, p: 2 }}
            variant="outlined"
          >
            Сохранить
          </Button>
        </form>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        {/* <h1 className={styles.title}>
          <Link href="/posts">Список постов</Link>
        </h1> */}
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
};

export default Home;
