import { doc, updateDoc, setDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import type { NextPage } from "next";
import React, { useEffect, useState } from "react";

import { useUploadFile } from "react-firebase-hooks/storage";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { StringLiteralLike } from "typescript";
import { useForm } from "react-hook-form";
import { auth, db, storage } from "../../app/firebaseApp";
import {
  TextField,
  CircularProgress,
  Grid,
  Button,
  Box,
  Alert,
} from "@mui/material";
import { ChangeEvent } from "react";
import IconButton from "@mui/material/IconButton";
import CheckIcon from "@mui/icons-material/Check";
import { updateProfile } from "firebase/auth";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

type FormData = {
  displayName: string;
  name: string;
  email: string;
  password: string;
};
const Profile: NextPage = () => {
  const [user] = useAuthState(auth);
  const docRef = doc(db, "users", String(user?.uid));
  const [userProfile, loading, error] = useDocumentData(docRef);

  const { register, handleSubmit } = useForm<FormData>();
  const onSubmit = handleSubmit((data) => {
    if (user) {
      updateProfile(user, {
        displayName: data.displayName,
      });
      const uid = user.uid;
      updateDoc(doc(db, "users", uid), {
        name: data.displayName,
      });
    }
  });

  const [profileImage, setProfileImage] = useState({
    error: false,
    message: "Some error",
    imageURL: "",
  });

  const [uploadFile, uploading] = useUploadFile();
  const handleProfileImage = async (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && user) {
      const typeImage = event.target.files[0].type;
      if (
        typeImage == "image/jpeg" ||
        typeImage == "image/png" ||
        typeImage == "image/gif"
      ) {
        const fileRef = ref(
          storage,
          `${Date.now()}-${event.target.files[0].name}`
        );

        const result = await uploadFile(fileRef, event.target.files[0]);
        if (result) {
          const imageURL = await getDownloadURL(result?.ref);
          updateProfile(user, {
            photoURL: imageURL,
          });
          const uid = user.uid;
          updateDoc(doc(db, "users", uid), {
            photoURL: imageURL,
          });

          setProfileImage({ error: false, message: "", imageURL: imageURL });
        } else {
          setProfileImage({
            error: true,
            message: "Ошибка при загрузке. Попробуйте еще раз.",
            imageURL: "",
          });
        }
      } else {
        setProfileImage({
          error: true,
          message: "Допустимые форматы: jpeg, png, gif",
          imageURL: "",
        });
      }
    }
  };

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
  console.log(user.photoURL);

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

      {user?.photoURL && <img src={user.photoURL} />}
      <input type="file" onChange={handleProfileImage} />
      {uploading && <p>Загрузка</p>}

      {profileImage.imageURL.length != 0 && (
        <img src={profileImage.imageURL} alt="photo" />
      )}
      {profileImage.error && (
        <Alert severity="error" variant="outlined" sx={{ mt: 2, mb: 2 }}>
          {profileImage.message}
        </Alert>
      )}
      <form onSubmit={onSubmit}>
        <p>
          <b>Ваша почта: </b>
          {user.email}
        </p>
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
        <Button type="submit" fullWidth sx={{ mt: 2, p: 2 }} variant="outlined">
          Сохранить
        </Button>
      </form>
    </div>
  );
};

export default Profile;
