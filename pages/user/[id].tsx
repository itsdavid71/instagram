import { Grid, ImageList, ImageListItem } from "@mui/material";
import { NextPage } from "next";
import { useRouter } from "next/router";
import {
  useCollectionData,
  useCollectionOnce,
} from "react-firebase-hooks/firestore";
import {
  collection,
  query,
  where,
  getDocs,
  orderBy,
  limit,
} from "firebase/firestore";
import postConverter from "../../helpers/postConverter";
import { db } from "../../app/firebaseApp";
import Link from "next/link";

const userPage: NextPage = () => {
  const postsRef = collection(db, "posts").withConverter(postConverter);
  const router = useRouter();
  const uid = router.query.id;
  if (uid) {
    const stateQuery = query(postsRef, where("uid", "==", uid));
    const [posts] = useCollectionData(stateQuery);

    return (
      <div>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <h2>Посты пользователя</h2>
            <ImageList
              sx={{ width: 500, height: 450 }}
              cols={3}
              rowHeight={164}
            >
              {posts?.map((item) => (
                <Link href={`/posts/${item.id}`}>
                  <ImageListItem key={item.imageURL}>
                    <img
                      src={`${item.imageURL}?w=164&h=164&fit=crop&auto=format`}
                      srcSet={`${item.imageURL}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                      alt={item.text}
                      loading="lazy"
                    />
                  </ImageListItem>
                </Link>
              ))}
            </ImageList>
          </Grid>
          <Grid item xs={6}>
            <h2>Информация о юзере</h2>
          </Grid>
        </Grid>
      </div>
    );
  } else {
    return <div>Error</div>;
  }
  //   console.log(posts);
};

export default userPage;
