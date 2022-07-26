import { useEffect } from "react";
import type { NextPage } from "next";
// import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { TextField, Box, Button, Alert } from "@mui/material";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { auth, db } from "../../app/firebaseApp";
import {
  useAuthState,
  useCreateUserWithEmailAndPassword,
} from "react-firebase-hooks/auth";
import { signOut, updateProfile } from "firebase/auth";
import Header from "../../components/header";
import Link from "next/link";

type FormData = {
  name: string;
  email: string;
  password: string;
};
const Register: NextPage = () => {
  const router = useRouter();

  const [user] = useAuthState(auth);
  const [createUserWithEmailAndPassword, newUser, , error] =
    useCreateUserWithEmailAndPassword(auth);
  const { register, handleSubmit, getValues } = useForm<FormData>();

  const onSubmit = handleSubmit(async (data) => {
    await createUserWithEmailAndPassword(data.email, data.password).then(
      function () {
        const newUser = auth.currentUser;
        if (newUser) {
          updateProfile(newUser, {
            displayName: data.name,
          });
          router.push("/");
        }
      }
    );
  });

  useEffect(() => {
    if (newUser) {
      const uid = newUser.user.uid;
      doc(db, "users", uid),
        {
          name: getValues("name"),
        };
    }
    console.log(newUser);
  }, [newUser]);

  if (user) {
    router.push("/");
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <h1>Регистрация</h1>
        {/* {user && <div>{user.email}</div>} */}
        <Box sx={{ mb: 2, mt: 2 }}>
          <TextField
            {...register("name")}
            type="text"
            fullWidth
            label="Ваше имя"
          />
        </Box>
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
          Зарегистрироваться
        </Button>
        {error?.code && (
          <Alert severity="error" sx={{ mt: 2, mb: 2 }}>
            {error.message}
          </Alert>
        )}
        <Alert severity="info" sx={{ mt: 2 }}>
          Есть аккаунт?{" "}
          <Link href="/auth/login">
            <u>Авторизуйся</u>
          </Link>
        </Alert>
      </form>
    </div>
  );
};

export default Register;
