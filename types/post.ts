type Post = {
  uid: string;
  id: string;
  text: string;
  user: {
    name: string;
  };
  imageURL: string;
  createdAt: Date | null;
  likesCount: number;
  commentsCount: number;
};

export default Post;
