import type { NextPage } from "next";
import { useRouter } from "next/router";
const Post: NextPage = () => {
  const router = useRouter();
  return (
    <div>
      <h1>Страница поста {router.query.id}</h1>
      <button></button>
    </div>
  );
};

export default Post;
