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

type PostPropTypes = {
  post: PostType;
};
const Post: FC<PostPropTypes> = ({ post }) => {
  return (
    <Card>
      <CardHeader
        title={post.user.name}
        subheader={post.createdAt ? post.createdAt?.toLocaleDateString() : ""}
      />
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
