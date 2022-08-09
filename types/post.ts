type Post = {
  uid: string;
  id: string;
  text: string;
  user: {
    name: string;
  };
  images: string[];
  createdAt: Date | null;
  likesCount: number;
  commentsCount: number;
};

export default Post;
