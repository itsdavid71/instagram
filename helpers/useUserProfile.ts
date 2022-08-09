import { doc, DocumentReference } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { auth, db } from "../app/firebaseApp";
import User from "../types/user";
import userConverter from "./userConverter";

function useUserProfile(): {
  userProfile: User | undefined;
  userRef: DocumentReference<User>;
} {
  const [user] = useAuthState(auth);
  const userRef = doc(db, "users", String(user?.uid)).withConverter(
    userConverter
  );
  const [userProfile] = useDocumentData(userRef);

  return { userProfile, userRef };
}

export default useUserProfile;
