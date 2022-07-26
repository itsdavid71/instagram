import { ChangeEvent } from "react";
import { useForm } from "react-hook-form";
import { TextField, Box, Button, Alert } from "@mui/material";
import type { NextPage } from "next";
import { useCollectionData } from "react-firebase-hooks/firestore";
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
  const router = useRouter();

  const { register, handleSubmit, setValue } = useForm<FormData>();
  const [uploadFile, uploading] = useUploadFile();
  const onSubmit = handleSubmit(async (data) => {
    if (user) {
      const newPost = {
        text: data.text,
        uid: user.uid,
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
        setValue("imageURL", imageURL);
      }
    }
  };

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
          required
        />
        <div>
          <Button component="label" variant="contained" sx={{ mt: 2 }}>
            Загрузить фото
            <input
              type="file"
              hidden
              {...register("imageURL")}
              onChange={handleFileChange}
            />
          </Button>
        </div>
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
