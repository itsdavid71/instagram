import type { NextPage } from "next";
import { useRouter } from "next/router";
const Post: NextPage = () => {
  const router = useRouter();
  return (
    <div>
      <h1>Страница поста {router.query.id}</h1>
      <button onClick={() => router.push("/posts")}>Список постов</button>
    </div>
  );
};

export default Post;
