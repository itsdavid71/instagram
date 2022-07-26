import type { NextPage } from "next";
import { useRouter } from "next/router";
import {
  collection,
  query,
  where,
  getDocs,
  orderBy,
  limit,
} from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { db } from "../app/firebaseApp";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import { Card, Button } from "@mui/material";
import { style } from "@mui/system";
import postConverter from "../helpers/postConverter";

const Posts: NextPage = () => {
  const postsRef = collection(db, "posts").withConverter(postConverter);
  const router = useRouter();
  const [posts] = useCollectionData(
    query(postsRef, orderBy("createdAt", "desc"))
  );
  console.log(posts);
  return (
    <div>
      <h1>Посты {router.query.id}</h1>
      <Button variant="contained" onClick={() => router.push("/posts/create")}>
        Создать пост
      </Button>
      {posts && (
        <div>
          {posts.map((post) => (
            <Link
              key={post.id}
              className={styles.postLink}
              href={"/posts/" + post.id}
            >
              <Card
                sx={{ mt: 2, p: 2 }}
                className={styles.postItem}
                variant="outlined"
              >
                {post.createdAt && (
                  <span className={styles.postCreatedAt}>
                    {post.createdAt.toLocaleDateString()}
                  </span>
                )}
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
