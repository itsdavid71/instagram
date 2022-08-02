import {
  QueryDocumentSnapshot,
  DocumentData,
  FirestoreDataConverter,
  SnapshotOptions,
  WithFieldValue,
} from "firebase/firestore";
import type Post from "../types/post";

const postConverter: FirestoreDataConverter<Post> = {
  toFirestore(post: WithFieldValue<Post>): DocumentData {
    return { text: post.text };
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): Post {
    const data = snapshot.data(options);
    return {
      id: snapshot.id,
      text: data.text,
      uid: data.uid,
      user: {
        name: data.user.name,
      },
      imageURL: data.imageURL,
      createdAt: data.createdAt
        ? new Date(data.createdAt?.seconds * 1000)
        : null,
      likesCount: data.likesCount,
    };
  },
};

export default postConverter;
