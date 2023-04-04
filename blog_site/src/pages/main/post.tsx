import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { auth, db } from "../../config/firebase";
import { useEffect, useState } from "react";

import { Post as IPost } from "./main";
import { timesFun } from "../../utils/common";
import { useAuthState } from "react-firebase-hooks/auth";

interface Props {
  post: IPost;
  removeFun: any;
}
interface Like {
  likeId: string;
  userId: string;
}
export const Post = (props: Props) => {
  const { post } = props;
  const removePostFromList = props.removeFun;

  const [user] = useAuthState(auth);
  const [likes, setLikes] = useState<Like[]>([]);
  const [power, setPower] = useState(false);
  const likesRef = collection(db, "likes");

  const isOwn = async (currentId: string) => {
    const post = await getDoc(doc(db, "posts", currentId));
    if (post.exists()) {
      if (post.data().userId === user?.uid) {
        setPower(true);
      }
    }
  };
  const getLikes = async () => {
    const likesList = query(likesRef, where("postId", "==", post.id));
    const data = await getDocs(likesList);
    setLikes(
      data.docs.map((doc) => ({ userId: doc.data().userId, likeId: doc.id }))
    );
  };
  const removePost = async (currentId: any) => {
    removePostFromList(currentId);
  };

  const addLike = async () => {
    try {
      const newDoc = await addDoc(likesRef, {
        userId: user?.uid,
        postId: post.id,
      });
      if (user) {
        setLikes((prev) =>
          prev
            ? [...prev, { userId: user?.uid, likeId: newDoc.id }]
            : [{ userId: user?.uid, likeId: newDoc.id }]
        );
      }
    } catch (error) {
      console.log(error);
    }
  };
  const cancelLike = async () => {
    try {
      const deleteLikeQuery = query(
        likesRef,
        where("postId", "==", post.id),
        where("userId", "==", user?.uid)
      );
      const deleteLikeData = await getDocs(deleteLikeQuery);
      const likeId = deleteLikeData.docs[0].id;
      const deleteLike = doc(db, "likes", likeId);
      await deleteDoc(deleteLike);
      if (user) {
        setLikes(
          (prev) => prev && prev?.filter((like) => like.likeId !== likeId)
        );
      }
    } catch (error) {
      console.log(error);
    }
  };
  const hasUserLiked = likes?.find((like) => like.userId === user?.uid);

  useEffect(() => {
    getLikes();
    isOwn(post.id);
  }, []);

  return (
    <div className="post">
      <div className="post-user">
        <img src={post.avatarUrl} alt="" />
        <div>
          <h4>@{post.username}</h4>
          <div className="post-createTime">{timesFun(post.createTime)}</div>
        </div>
        {power && (
          <div className="post-remove" onClick={() => removePost(post.id)}>
            ×
          </div>
        )}
      </div>
      <div className="post-message">
        <div className="post-message-title">{post.title}</div>
        <div className="post-message-text">{post.description}</div>
      </div>
      <div className="post-footer">
        {hasUserLiked ? (
          <div onClick={cancelLike} className="post-liked">
            👍
            {likes.length > 0 ? <>× {likes.length}</> : <></>}
          </div>
        ) : (
          <div onClick={addLike} className="post-likes">
            👍{likes.length > 0 ? <>× {likes.length}</> : <></>}
          </div>
        )}
      </div>
    </div>
  );
};
