import {
  QueryDocumentSnapshot,
  DocumentData,
  FirestoreDataConverter,
  SnapshotOptions,
  WithFieldValue,
} from "firebase/firestore";
import type User from "../types/user";

const userConverter: FirestoreDataConverter<User> = {
  toFirestore(user: WithFieldValue<User>): DocumentData {
    return { user: user.name };
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): User {
    const data = snapshot.data(options);
    return {
      name: data.name,
      likes: data.likes,
    };
  },
};

export default userConverter;
