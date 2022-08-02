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
import { Card, Button, Box } from "@mui/material";
import { style } from "@mui/system";
import postConverter from "../helpers/postConverter";
import userConverter from "../helpers/userConverter";
import Post from "../components/Post";
import PostType from "../types/post";
import { useAuthState } from "react-firebase-hooks/auth";

const Posts: NextPage = () => {
  const [user] = useAuthState(auth);
  const [userProfile] = useDocumentData(
    doc(db, "users", String(user?.uid)).withConverter(userConverter)
  );
  const userLikes = userProfile?.likes || [];
  const postsRef = collection(db, "posts").withConverter(postConverter);
  const router = useRouter();
  const [posts] = useCollectionData(
    query(postsRef, orderBy("createdAt", "desc"))
  );
  console.log(posts);
  const handleLikeClick = (post: PostType) => {
    if (!user) {
      return;
    }
    const isLike = userLikes.includes(post.id);
    if (isLike) {
      const newLikes = userLikes.filter((like) => like !== post.id);
      updateDoc(doc(db, "users", String(user.uid)), { likes: newLikes });
      updateDoc(doc(db, "posts", post.id), { likesCount: increment(-1) });
    } else {
      const newLikes = [...userLikes, post.id];
      updateDoc(doc(db, "users", String(user.uid)), { likes: newLikes });
      updateDoc(doc(db, "posts", post.id), { likesCount: increment(1) });
    }
  };
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
              <Post
                post={post}
                onLikeClick={() => handleLikeClick(post)}
                liked={userLikes.includes(post.id)}
              />
            </Box>
            // </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Posts;
