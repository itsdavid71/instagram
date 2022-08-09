import type { NextPage } from "next";
import { useRouter } from "next/router";
import {
  collection,
  query,
  where,
  getDocs,
  orderBy,
  updateDoc,
  doc,
  limit,
  increment,
} from "firebase/firestore";
import {
  useCollectionData,
  useDocumentData,
} from "react-firebase-hooks/firestore";
import { auth, db } from "../app/firebaseApp";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import { style } from "@mui/system";
import postConverter from "../helpers/postConverter";
import userConverter from "../helpers/userConverter";
import PostType from "../types/post";
import { useAuthState } from "react-firebase-hooks/auth";
import { Card, Button, Box } from "@mui/material";
import PostContainer from "../containers/PostContainer";

const Posts: NextPage = () => {
  const router = useRouter();
  const postsRef = collection(db, "posts").withConverter(postConverter);
  const [posts] = useCollectionData(
    query(postsRef, orderBy("createdAt", "desc"))
  );
  return (
    <div>
      <h1>Лента {router.query.id}</h1>
      <Button variant="contained" onClick={() => router.push("/posts/create")}>
        Создать публикацию
      </Button>
      {posts && (
        <div>
          {posts.map((post) => (
            // <Link
            //   key={post.id}
            //   className={styles.postLink}
            //   href={"/posts/" + post.id}
            // >
            <Box sx={{ mb: 2, mt: 2 }}>
              <PostContainer post={post} />
            </Box>
            // </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Posts;
