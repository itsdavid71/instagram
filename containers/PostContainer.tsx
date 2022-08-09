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
import { FC } from "react";
import PostType from "../types/post";
import { useAuthState } from "react-firebase-hooks/auth";
import Post from "../components/Post";

type PostContainerProps = {
  post: PostType;
};
const PostContainer: FC<PostContainerProps> = ({ post }) => {
  const [user] = useAuthState(auth);
  const [userProfile] = useDocumentData(
    doc(db, "users", String(user?.uid)).withConverter(userConverter)
  );
  const userLikes = userProfile?.likes || [];
  const router = useRouter();

  const handleLikeClick = () => {
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
    <Post
      post={post}
      onLikeClick={handleLikeClick}
      liked={userLikes.includes(post.id)}
    />
  );
};

export default PostContainer;
