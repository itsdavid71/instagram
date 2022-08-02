import { FC } from "react";
import type Comment from "../types/comment";
import { formatDistance } from "date-fns";
import { ru } from "date-fns/locale";
import { Card } from "@mui/material";
type CommentProps = {
  comments: Comment[];
};
const Comments: FC<CommentProps> = ({ comments }) => {
  if (comments.length === 0) {
    return <h2>Комментариев нет</h2>;
  }

  return (
    <div>
      {comments.map((comment) => (
        <Card key={comment.id} sx={{ p: 2, mt: 2 }}>
          <div>{comment.user.name}</div>
          <div>{comment.text}</div>
          {comment.createdAt ? (
            <div>
              {formatDistance(comment.createdAt, new Date(), {
                addSuffix: true,
                locale: ru,
              })}
            </div>
          ) : (
            "Только что"
          )}
        </Card>
      ))}
    </div>
  );
};

export default Comments;
