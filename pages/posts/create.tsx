import { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";
import {
  TextField,
  Box,
  Button,
  Alert,
  Typography,
  Modal,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import type { NextPage } from "next";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { useRouter } from "next/router";
import LinearProgress, {
  LinearProgressProps,
} from "@mui/material/LinearProgress";
import { useUploadFile } from "react-firebase-hooks/storage";
import Link from "next/link";
import { doc, addDoc, collection } from "firebase/firestore";
import { auth, db, storage } from "../../app/firebaseApp";
import { useAuthState } from "react-firebase-hooks/auth";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import ImagesOrder from "../../components/ImagesOrder";

type FormData = {
  images: string[];
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
  } = useForm<FormData>({ mode: "onChange" });
  const [uploadFile, uploading, snapshot, uploadError] = useUploadFile();
  const imagesValue = watch("images");

  // const countFiles = [];
  // if (snapshot) {
  //   const loadProgressTotal = snapshot.totalBytes;
  //   const loadProgressTransferred = snapshot.bytesTransferred;
  //   countFiles.push(snapshot);
  // }
  // console.log(countFiles);

  function LinearProgressWithLabel(
    props: LinearProgressProps & { value: number }
  ) {
    return (
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box sx={{ width: "100%", mr: 1 }}>
          <LinearProgress variant="determinate" {...props} />
        </Box>
        <Box sx={{ minWidth: 35 }}>
          <Typography variant="body2" color="text.secondary">{`${Math.round(
            props.value
          )}%`}</Typography>
        </Box>
      </Box>
    );
  }

  const onSubmit = handleSubmit(async (data) => {
    if (user && userProfile) {
      const newPost = {
        text: data.text,
        uid: user.uid,
        user: {
          name: userProfile.name,
        },
        createdAt: new Date(),
        images: data.images,
      };

      const docRef = await addDoc(collection(db, "posts"), newPost);
      router.push(`/posts/${docRef.id}`);
    }
  });

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
      const fileUploads = Array.from(event.target.files).map(async (file) => {
        const fileRef = ref(storage, `${Date.now()}-${file.name}`);
        const result = await uploadFile(fileRef, file);
        console.log(result);
        if (result) {
          return await getDownloadURL(result?.ref);
        }
        return "";
      });

      const results = await Promise.all(fileUploads);

      if (results) {
        setValue("images", results, { shouldValidate: true });
      }
    }
  };
  const handleImagesSort = (newImages: string[]) => {
    setValue("images", newImages);
  };

  register("images", { required: true });
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
          {!uploading && (
            <LoadingButton
              disabled={uploading}
              loading={uploading}
              component="label"
              variant="contained"
              sx={{ mb: 2, mt: 2 }}
            >
              {uploading && <span>Загрузка...</span>}
              {!uploading && (
                <div>
                  <span>Загрузить фото</span>
                  <input
                    multiple
                    type="file"
                    hidden
                    onChange={handleFileChange}
                  />
                </div>
              )}
            </LoadingButton>
          )}
          {snapshot && (
            // <LinearProgressWithLabel
            //   value={Math.ceil(
            //     (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            //   )}
            // />
            <LinearProgress sx={{ mt: 2, mb: 2 }} />
          )}
        </div>

        {errors.images && (
          <Alert severity="error">
            Пожалуйста, загрузите хотя бы одно фото
          </Alert>
        )}

        {imagesValue && !uploading && (
          <ImagesOrder images={imagesValue} onSort={handleImagesSort} />
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
