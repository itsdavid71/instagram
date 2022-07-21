import type { NextPage } from "next";
// import { signInWithEmailAndPassword } from "firebase/auth";
import { TextField, Box, Button, Alert } from "@mui/material";
import { useForm } from "react-hook-form";
import { auth } from "../../app/firebaseApp";
import {
  useAuthState,
  useCreateUserWithEmailAndPassword,
} from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import Header from "../../components/header";

type FormData = {
  name: string;
  email: string;
  password: string;
};
const Register: NextPage = () => {
  const [user] = useAuthState(auth);
  const [createUserWithEmailAndPassword, , , error] =
    useCreateUserWithEmailAndPassword(auth);
  const { register, handleSubmit } = useForm<FormData>();

  const onSubmit = handleSubmit((data) => {
    createUserWithEmailAndPassword(data.email, data.password);
  });

  console.log(error?.code);
  return (
    <div>
      <Header />
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
        {error?.code === "auth/email-already-in-use" && (
          <Alert severity="error" sx={{ mt: 2, mb: 2 }}>
            Email занят, введите другой
          </Alert>
        )}
      </form>
    </div>
  );
};

export default Register;
