import { auth, db } from "../../config/firebase";
import {
  collection,
  endBefore,
  getCountFromServer,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import { deleteDoc, doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

import { Aside } from "./aside";
import { HoverButton } from "../../components/hover-button/hoverButton";
import { Loading } from "../../components/loading/loading";
import { Popup } from "../../components/popup/popup";
import { Post as PostPage } from "./post";
import { useAuthState } from "react-firebase-hooks/auth";

export interface Post {
  id: string;
  description: string;
  title: string;
  userId: string;
  username: string;
  avatarUrl: string;
  createTime: number;
}

export const Main = () => {
  const [user] = useAuthState(auth);
  const [postsList, setPostsList] = useState<Post[] | null>(null);
  const [currentId, setCurrentId] = useState("");
  const [loading, setLoading] = useState(true);
  const [pop, setPop] = useState(false);
  const [modal, setModal] = useState(false);
  const [postGap, setPostGap] = useState(3);
  const [postStartAt, setPostStartAt] = useState({});
  const [postEndBefore, setPostEndBefore] = useState({});

  const getTheMostLiked = async () => {
    const posts = await getDocs(collection(db, "posts"));
    const arr = [];
    posts.forEach(async (doc) => {
      const snapshot = await getCountFromServer(
        query(collection(db, "likes"), where("postId", "==", doc.id))
      );
      const count = snapshot.data().count;
      arr[0] = count;
      arr[1] = doc.id;
    });
    // console.log(JSON.stringify(outArr));
    // const idArr = posts.docs.map((doc) => {
    //   return doc.id;
    // });
    // idArr.forEach
  };

  const removePost = (currentId: any) => {
    setCurrentId(currentId);
    setPop(true);
  };
  const cancelPopup = (bool: boolean) => {
    if (bool === true) {
      const newList = postsList?.filter((post) => post.id !== currentId);
      setPostsList(newList as Post[]);
    }
    setPop(false);
  };

  const confirmPopup = async () => {
    const deletePost = doc(db, "posts", currentId);
    const currentPost = await getDoc(deletePost);
    if (currentPost.exists()) {
      const postData = currentPost.data();
      if (postData.userId === user?.uid) {
        await deleteDoc(deletePost);
        console.log(`删除成功`);
      } else {
        alert("你没有该条信息删除权限");
      }
    }
  };
  const nextPosts = async () => {
    setLoading(true);
    const result = await getDocs(
      query(
        collection(db, "posts"),
        orderBy("createTime", "desc"),
        limit(postGap),
        startAfter(postStartAt)
      )
    );
    if (result.docs.length === 0) {
      setModal(true);
    } else {
      setPostEndBefore(result.docs[0]);
      setPostStartAt(result.docs[result.docs.length - 1]);
      setPostsList(
        result.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as Post[]
      );
    }

    setLoading(false);
  };
  const backPosts = async () => {
    setLoading(true);
    const result = await getDocs(
      query(
        collection(db, "posts"),
        orderBy("createTime", "desc"),
        endBefore(postEndBefore)
      )
    );
    const backPosts = result.docs.slice(
      result.docs.length - postGap,
      result.docs.length
    );
    if (backPosts.length !== 0) {
      setPostEndBefore(backPosts[0]);
      setPostStartAt(backPosts[backPosts.length - 1]);
      setPostsList(
        backPosts.map((doc) => ({ ...doc.data(), id: doc.id })) as Post[]
      );
    } else {
      setModal(true);
    }
    setLoading(false);
  };
  useEffect(() => {
    const queryPost = async () => {
      setPostGap(postGap);
      const result = await getDocs(
        query(
          collection(db, "posts"),
          orderBy("createTime", "desc"),
          limit(postGap)
        )
      );
      setPostEndBefore(result.docs[0]);
      setPostStartAt(result.docs[result.docs.length - 1]);
      setPostsList(
        result.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as Post[]
      );
      setLoading(false);
      // console.log(await getDocs(collection(db, "posts")));
    };
    getTheMostLiked();
    queryPost();
  }, []);
  return (
    <div className="main-page">
      {user && (
        <>
          <Aside />
          <div className="main-post">
            {postsList?.map((post) => (
              <PostPage post={post} key={post.id} removeFun={removePost} />
            ))}
            <HoverButton
              type="left"
              onClick={backPosts}
              className="left-hoverButton"
            />
            <HoverButton
              type="right"
              onClick={nextPosts}
              className="right-hoverButton"
            />
          </div>
          {loading && <Loading />}
        </>
      )}
      {pop && (
        <>
          <div className="mark"></div>
          <Popup
            cancel={cancelPopup}
            confirm={confirmPopup}
            type="Modal"
            keywords={"确定要删除该条信息吗？"}
          />
        </>
      )}
      {modal && (
        <>
          <div className="mark"></div>
          <Popup
            cancel={cancelPopup}
            confirm={() => setModal(false)}
            keywords={"已经没有更多信息了"}
          />
        </>
      )}
    </div>
  );
};
