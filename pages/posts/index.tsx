import type { NextPage } from "next";
import { useRouter } from "next/router";
import { collection } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { db } from "../../app/firebaseApp";

const Posts: NextPage = () => {
  const router = useRouter();
  const [posts] = useCollectionData(collection(db, "posts"));
  return (
    <div>
      <h1>Страница поста {router.query.id}</h1>
      {posts && (
        <div>
          {posts.map((post) => (
            <div>{post.text}</div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Posts;
