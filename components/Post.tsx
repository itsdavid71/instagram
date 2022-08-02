import { FC } from "react";
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  CardActionArea,
  Avatar,
} from "@mui/material";
import Link from "next/link";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import CommentIcon from "@mui/icons-material/Comment";
import FavoriteIcon from "@mui/icons-material/Favorite";
import type PostType from "../types/post";
import { formatDistance } from "date-fns";
import { ru } from "date-fns/locale";
import styles from "../styles/Home.module.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../app/firebaseApp";

type PostPropTypes = {
  post: PostType;
  onLikeClick?: () => void;
  liked?: boolean;
};
const Post: FC<PostPropTypes> = ({ post, onLikeClick, liked }) => {
  const [user] = useAuthState(auth);

  const date = post.createdAt
    ? formatDistance(post.createdAt, new Date(), {
        addSuffix: true,
        locale: ru,
      })
    : "";
  return (
    <Card>
      <Link href={`/user/${user?.uid}`}>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe">
              <img
                className={styles.postProfilePhoto}
                alt="Photo"
                src={user?.photoURL}
              />
            </Avatar>
          }
          title={post.user.name}
          subheader={date}
        />
      </Link>
      <Link href={`/posts/${post.id}`}>
        <a>
          <CardMedia component="img" image={post.imageURL} />
          <CardContent>{post.text}</CardContent>
        </a>
      </Link>
      <CardActionArea className={styles.postActions}>
        <IconButton onClick={onLikeClick}>
          <FavoriteIcon sx={{ color: liked ? "red" : "grey", mr: 1 }} />
          {post.likesCount > 0 ? post.likesCount : ""}
        </IconButton>
        <IconButton>
          <CommentIcon sx={{ mr: 1 }} />
          {post.commentsCount > 0 ? post.commentsCount : ""}
        </IconButton>
      </CardActionArea>
    </Card>
  );
};

export default Post;
