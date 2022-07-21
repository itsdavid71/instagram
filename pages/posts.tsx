import type { NextPage } from "next";
import { useRouter } from "next/router";
import { collection } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../app/firebaseApp";
import Link from "next/link";
import { Card } from "@mui/material";
import styles from "../styles/Home.module.css";
import { SyntheticEvent } from "react";

const Posts: NextPage = () => {
  const router = useRouter();
  const [posts] = useCollection(collection(db, "posts"));
  return (
    <div>
      <h1>Страница поста {router.query.id}</h1>
      {posts && (
        <div>
          {posts.map((post: SyntheticEvent) => (
            <Link className={styles.postLink} href={"/posts/" + post.id}>
              <Card sx={{ m: 2, p: 2 }} variant="outlined">
                {post.text}
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Posts;
