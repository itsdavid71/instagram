import type { NextPage } from "next";
import { useRouter } from "next/router";
import { TextField, Box, Button, Alert } from "@mui/material";
import { doc } from "firebase/firestore";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { db } from "../../app/firebaseApp";
import postConverter from "../../helpers/postConverter";
import Post from "../../components/Post";

const PostPage: NextPage = () => {
  const router = useRouter();
  const docRef = doc(db, "posts", String(router.query.id)).withConverter(
    postConverter
  );
  const [post] = useDocumentData(docRef);
  return (
    <div>
      <h1>Страница поста {router.query.id}</h1>
      {post && <Post post={post} />}
      <Button variant="outlined" onClick={() => router.push("/posts")}>
        Список постов
      </Button>
    </div>
  );
};

export default PostPage;
