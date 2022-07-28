import { FC } from "react";
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  CardActionArea,
} from "@mui/material";
import Link from "next/link";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import type PostType from "../types/post";
import { formatDistance } from "date-fns";
import { ru } from "date-fns/locale";

type PostPropTypes = {
  post: PostType;
};
const Post: FC<PostPropTypes> = ({ post }) => {
  const date = post.createdAt
    ? formatDistance(post.createdAt, new Date(), {
        addSuffix: true,
        locale: ru,
      })
    : "";
  return (
    <Card>
      <CardHeader title={post.user.name} subheader={date} />
      <Link href={`/posts/${post.id}`}>
        <a>
          <CardMedia component="img" image={post.imageURL} />
          <CardContent>{post.text}</CardContent>
        </a>
      </Link>
      <CardActionArea>
        <IconButton>
          <FavoriteIcon />
        </IconButton>
      </CardActionArea>
    </Card>
  );
};

export default Post;
