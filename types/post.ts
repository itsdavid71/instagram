type Post = {
  uid: string;
  id: string;
  text: string;
  user: {
    name: string;
  };
  imageURL: string;
  createdAt: Date | null;
};

export default Post;
