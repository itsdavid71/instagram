import type { NextPage } from "next";
// import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { TextField, Box, Button, Alert } from "@mui/material";
import { useForm } from "react-hook-form";
import { auth } from "../../app/firebaseApp";
import {
  useAuthState,
  useCreateUserWithEmailAndPassword,
} from "react-firebase-hooks/auth";
import { signOut, signInWithEmailAndPassword, getAuth } from "firebase/auth";
import Header from "../../components/header";

type FormData = {
  name: string;
  email: string;
  password: string;
};
const Login: NextPage = () => {
  const [user] = useAuthState(auth);

  const [createUserWithEmailAndPassword, , , error] =
    useCreateUserWithEmailAndPassword(auth);
  const { register, handleSubmit } = useForm<FormData>();
  const [loginError, setLoginError] = useState({
    status: false,
    message: "Some error",
  });

  const onSubmit = handleSubmit((data) => {
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        setLoginError({ status: false, message: "" });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        console.log(loginError);
        let alertMessage = error.message;
        switch (errorCode) {
          case "auth/invalid-email":
            alertMessage = "Некорректный Email";
            break;
          case "auth/user-not-found":
            alertMessage = "Пользователь не найден";
            break;
          case "auth/wrong-password":
            alertMessage = "Неправильный пароль";
            break;
          default:
            alertMessage;
            break;
        }
        setLoginError({ status: true, message: alertMessage });
      });
  });

  if (user) {
    return (
      <div>
        <Header />
        <h2>Привет, {user.uid} </h2>
      </div>
    );
  }
  console.log(error?.code);
  return (
    <div>
      <Header />
      <form onSubmit={onSubmit}>
        <h1>Авторизация</h1>
        <Box sx={{ mb: 2 }}>
          <TextField
            {...register("email")}
            type="email"
            fullWidth
            label="Ваш email"
          />
        </Box>
        <Box sx={{ mb: 2 }}>
          <TextField
            {...register("password")}
            type="password"
            fullWidth
            label="Ваш пароль"
          />
        </Box>
        <Button type="submit" variant="contained" fullWidth sx={{ p: 2 }}>
          Авторизоваться
        </Button>
        {loginError.status && (
          <Alert severity="error" variant="outlined" sx={{ mt: 2, mb: 2 }}>
            {loginError.message}
          </Alert>
        )}
      </form>
    </div>
  );
};

export default Login;
