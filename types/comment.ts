type Comment = {
  uid: string;
  user: {
    name: string;
  };
  text: string;
  id: string;
  createdAt: Date | null;
};

export default Comment;
