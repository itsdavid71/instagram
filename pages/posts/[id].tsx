import type { NextPage } from "next";
import { useRouter } from "next/router";
import { TextField, Box, Button, Alert } from "@mui/material";
import { doc } from "firebase/firestore";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { db } from "../../app/firebaseApp";
import postConverter from "../../helpers/postConverter";

const Post: NextPage = () => {
  const router = useRouter();
  const docRef = doc(db, "posts", String(router.query.id)).withConverter(
    postConverter
  );
  const [post] = useDocumentData(docRef);
  return (
    <div>
      <h1>Страница поста {router.query.id}</h1>
      {/* <h2>{router.query.text}</h2> */}
      {post && (
        <div>
          <img style={{ maxWidth: 500 }} src={post.imageURL} />
          <h1>{post.text}</h1>
        </div>
      )}
      <Button variant="outlined" onClick={() => router.push("/posts")}>
        Список постов
      </Button>
    </div>
  );
};

export default Post;
