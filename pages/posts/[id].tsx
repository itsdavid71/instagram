import type { NextPage } from "next";
import { useRouter } from "next/router";
import { TextField, Box, Button, Alert } from "@mui/material";
import {
  collection,
  doc,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
  updateDoc,
  increment,
} from "firebase/firestore";
import {
  useCollectionData,
  useDocumentData,
} from "react-firebase-hooks/firestore";
import { auth, db } from "../../app/firebaseApp";
import postConverter from "../../helpers/postConverter";
import commentCoverter from "../../helpers/commentConverter";
import PostContainer from "../../containers/PostContainer";
import Comments from "../../components/Comments";
import CommentForm from "../../components/CommentForm";
import { useAuthState } from "react-firebase-hooks/auth";

const PostPage: NextPage = () => {
  const [user] = useAuthState(auth);
  const [userProfile] = useDocumentData(doc(db, "users", String(user?.uid)));
  const router = useRouter();
  const docRef = doc(db, "posts", String(router.query.id));
  const [post] = useDocumentData(docRef.withConverter(postConverter));
  const commentRef = collection(db, "posts", String(post?.id), "comments");
  const [comments] = useCollectionData(
    query(
      commentRef.withConverter(commentCoverter),
      orderBy("createdAt", "desc")
    )
  );

  const handleCommentSubmit = (data: { text: string }) => {
    if (!user) {
      return;
    }
    const newComment = {
      uid: user.uid,
      user: {
        name: userProfile?.name,
      },
      text: data.text,
      createdAt: serverTimestamp(),
    };
    addDoc(commentRef, newComment);

    // Увеличим счетчик комментов
    updateDoc(docRef, { commentsCount: increment(1) });
  };
  return (
    <div>
      <h1>Страница поста {router.query.id}</h1>
      {post && <PostContainer post={post} />}
      <CommentForm onSubmit={handleCommentSubmit} />
      {comments && <Comments comments={comments} />}
      <Button
        variant="contained"
        fullWidth
        sx={{ mt: 2, mb: 2, p: 2 }}
        onClick={() => router.push("/posts")}
      >
        Список постов!
      </Button>
    </div>
  );
};

export default PostPage;
