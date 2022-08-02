import {
  QueryDocumentSnapshot,
  DocumentData,
  FirestoreDataConverter,
  SnapshotOptions,
  WithFieldValue,
} from "firebase/firestore";
import type Comment from "../types/comment";

const userConverter: FirestoreDataConverter<Comment> = {
  toFirestore(comment: WithFieldValue<Comment>): DocumentData {
    return { text: comment.text };
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): Comment {
    const data = snapshot.data(options);
    return {
      uid: data.uid,
      user: data.user,
      id: snapshot.id,
      text: data.text,
      createdAt: data.createdAt
        ? new Date(data.createdAt?.seconds * 1000)
        : null,
    };
  },
};

export default userConverter;
