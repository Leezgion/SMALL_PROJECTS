import * as Yup from "yup";

import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../../config/firebase";

import { Loading } from "../../components/loading/loading";
import { Popup } from "../../components/popup/popup";
import { useAuthState } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";

interface CreateFormData {
  title: string;
  description: string;
}
export const CreateForm = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const [pop, setPop] = useState(false);
  const [post, setPost] = useState({});
  const [loading, setLoading] = useState(false);

  const schema = Yup.object().shape({
    title: Yup.string().required("请输入标题"),
    description: Yup.string().required("请输入内容"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateFormData>({
    resolver: yupResolver(schema),
  });

  const postRef = collection(db, "posts");

  const openPopup = (data: CreateFormData) => {
    setPost(data);
    setPop(true);
  };
  const confirmPopup = async () => {
    setLoading(true);
    await addDoc(postRef, {
      ...post,
      username: user?.displayName,
      userId: user?.uid,
      avatarUrl: user?.photoURL,
      createTime: Date.now(),
    });
    setPop(true);
    setLoading(false);
    navigate("/");
  };
  const cancelPopup = (bool: boolean) => {
    setPop(false);
  };
  return (
    <>
      <form onSubmit={handleSubmit(openPopup)} className="form">
        <label>{errors?.title?.message}</label>
        <input placeholder="Title..." {...register("title")} />
        <label>{errors?.description?.message}</label>
        <textarea placeholder="Description..." {...register("description")} />
        <input type="submit" />
      </form>
      {pop && (
        <>
          <div className="mark"></div>
          <Popup
            cancel={cancelPopup}
            confirm={confirmPopup}
            type="Modal"
            keywords={"确定要进行本次提交吗？"}
          />
        </>
      )}
      {loading && <Loading />}
    </>
  );
};
