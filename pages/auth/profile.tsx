import { doc, updateDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import type { NextPage } from "next";
import React, { useState } from "react";

import { useDocumentData } from "react-firebase-hooks/firestore";
import { StringLiteralLike } from "typescript";
import { useForm } from "react-hook-form";
import { auth, db } from "../../app/firebaseApp";
import { TextField, CircularProgress, Grid, Button } from "@mui/material";
import { ChangeEvent } from "react";
import IconButton from "@mui/material/IconButton";
import CheckIcon from "@mui/icons-material/Check";

type FormData = {
  name: string;
};
const Profile: NextPage = () => {
  const [user] = useAuthState(auth);
  const docRef = doc(db, "users", String(user?.uid));
  const [userProfile, loading, error] = useDocumentData(docRef);

  if (loading) {
    return (
      <Grid
        container
        direction="row-reverse"
        justifyContent="center"
        alignItems="center"
      >
        <CircularProgress />
      </Grid>
    );
  }
  if (error) {
    return <div>Неполадки с соединением</div>;
  }
  if (!user) {
    return <div>Вы не авторизованы</div>;
  }

  // const onSubmit = handleSubmit((data) => {
  //   console.log(data);
  // });

  // const { register, handleSubmit } = useForm<FormData>();
  // const handleNameChange = handleSubmit(async (data) => {
  //   await updateDoc(docRef, { name: data.name });
  // });

  return (
    <div>
      <h1>Личная информация</h1>
      <p>
        <b>ID:</b> {user?.uid}
      </p>
      <p>
        <b>Email:</b> {user?.email}
      </p>
      <p>
        <b>Имя:</b> {userProfile?.name}
      </p>
      <form>
        <TextField type="text" label="Ваше имя" value={userProfile?.name} />
        <Button
          type="submit"
          variant="outlined"
          color="success"
          sx={{ p: 2, ml: 1 }}
          startIcon={<CheckIcon />}
        >
          Сохранить
        </Button>
      </form>
    </div>
  );
};

export default Profile;
