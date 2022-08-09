import type { NextPage } from "next";
import { useRouter } from "next/router";
import { collection, query, orderBy } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { auth, db } from "../app/firebaseApp";
import postConverter from "../helpers/postConverter";
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
            <Box key={post.id} sx={{ mb: 2, mt: 2 }}>
              <PostContainer post={post} />
            </Box>
          ))}
        </div>
      )}
    </div>
  );
};

export default Posts;
