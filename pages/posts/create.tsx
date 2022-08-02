import { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { TextField, Box, Button, Alert } from "@mui/material";
import type { NextPage } from "next";
import {
  useCollectionData,
  useDocumentData,
} from "react-firebase-hooks/firestore";
import { useRouter } from "next/router";
import { useUploadFile } from "react-firebase-hooks/storage";
import Link from "next/link";
import {
  doc,
  setDoc,
  addDoc,
  collection,
  QuerySnapshot,
} from "firebase/firestore";
import { auth, db, storage } from "../../app/firebaseApp";
import {
  useAuthState,
  useCreateUserWithEmailAndPassword,
} from "react-firebase-hooks/auth";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

type FormData = {
  imageURL: string;
  text: string;
};
const Create: NextPage = () => {
  const [user] = useAuthState(auth);
  const docRef = doc(db, "users", String(user?.uid));
  const [userProfile, loading, error] = useDocumentData(docRef);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
  } = useForm<FormData>();
  const [uploadFile, uploading] = useUploadFile();
  const imageURLValue = watch("imageURL");
  const onSubmit = handleSubmit(async (data) => {
    if (user && userProfile && imageURLValue?.length !== 0) {
      const newPost = {
        text: data.text,
        uid: user.uid,
        user: {
          name: userProfile.name,
        },
        createdAt: new Date(),
        imageURL: data.imageURL,
      };

      const docRef = await addDoc(collection(db, "posts"), newPost);
      router.push(`/posts/${docRef.id}`);
    }
  });
  //   .then(() => {
  //     router.push(`/posts/${id}`);

  if (!user) {
    return (
      <div>
        <h2>Чтобы создать пост, вам необходимо авторизоваться</h2>
        <Link href="/auth/login">
          <u>Авторизоваться</u>
        </Link>
      </div>
    );
  }

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const fileRef = ref(
        storage,
        `${Date.now()}-${event.target.files[0].name}`
      );

      const result = await uploadFile(fileRef, event.target.files[0]);
      if (result) {
        const imageURL = await getDownloadURL(result?.ref);
        setValue("imageURL", imageURL, { shouldValidate: true });
      }
    }
  };
  register("imageURL", { required: true });
  return (
    <div>
      <h1>Создать новый пост</h1>
      <form onSubmit={onSubmit}>
        <TextField
          {...register("text")}
          label="Название поста"
          fullWidth
          multiline
          rows={4}
          type="text"
        />
        <div>
          <Button component="label" variant="contained" sx={{ mt: 2 }}>
            Загрузить фото
            <input type="file" hidden onChange={handleFileChange} />
          </Button>
        </div>
        {/* {errors.imageURL && (
          <Alert severity="error" sx={{ mt: 2, mb: 2 }}>
            Загрузите изображение
          </Alert>
        )} */}
        {!imageURLValue ||
          (imageURLValue.length === 0 && (
            <Alert severity="error" sx={{ mt: 2, mb: 2 }}>
              Загрузите изображение
            </Alert>
          ))}
        {imageURLValue?.length !== 0 && (
          <img src={imageURLValue} style={{ width: 200 }} alt="preview" />
        )}

        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{ p: 2, mt: 2 }}
        >
          Создать
        </Button>
      </form>
    </div>
  );
};

export default Create;
