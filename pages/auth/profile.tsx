import { doc, updateDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { StringLiteralLike } from "typescript";
import { auth, db } from "../../app/firebaseApp";
import { TextField, CircularProgress, Grid } from "@mui/material";
import { ChangeEvent } from "react";
const Profile = () => {
  const [user] = useAuthState(auth);
  const docRef = doc(db, "users", user?.uid || "null");
  const [userProfile, loading, error] = useDocumentData(docRef);

  if (loading) {
    return (
      <Grid
        container
        direction="row-reverse"
        justifyContent="center"
        alignItems="center"
      >
        <CircularProgress />
      </Grid>
    );
  }
  console.log(error);
  if (error) {
    return <div>Неполадки с соединением</div>;
  }
  if (!user || !userProfile) {
    return <div>Вы не авторизованы</div>;
  }

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    updateDoc(docRef, { name: event.target.value });
  };
  return (
    <div>
      <h1>Личная информация</h1>
      <p>
        <b>ID:</b> {user?.uid}
      </p>
      <p>
        <b>Имя:</b> {userProfile?.name}
      </p>
      <TextField
        type="text"
        label="Ваше имя"
        value={userProfile?.name}
        onChange={handleNameChange}
      />
    </div>
  );
};

export default Profile;
