import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { auth, db, storage } from "../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

import { Loading } from "../components/Loading/Loading";
import { Mask } from "../components/Mask/Mask";
import { RiImageAddFill } from "react-icons/ri";

export const Register = () => {
  const [imgUrl, setImgUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handleSelect = (e) => {
    const url = URL.createObjectURL(e.target.files[0]);
    setImgUrl(url);
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try {
      //Create user
      const res = await createUserWithEmailAndPassword(auth, email, password);

      const date = new Date().getTime();
      const storageRef = ref(storage, `${displayName + date}`);

      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            //Update profile
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
            //create user on firestore
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });

            // create empty user chats on firestore
            await setDoc(doc(db, "userChats", res.user.uid), {});
            navigate("/");
            setLoading(false);
          } catch (err) {
            setErr(true);
            setLoading(false);
          }
        });
      });
    } catch (err) {
      setErr(true);
      setLoading(false);
    }
  };
  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Chat</span>
        <span className="title">Register</span>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="display name" />
          <input type="email" placeholder="email" />
          <input type="password" placeholder="password" />
          <input
            style={{ display: "none" }}
            type="file"
            id="avatar"
            onChange={(e) => handleSelect(e)}
          />
          <span className="addAvatar">
            <label htmlFor="avatar">
              <RiImageAddFill />
              <span>Add an avatar</span>
            </label>
            <img src={imgUrl} alt="" />
          </span>
          <button>Sign Up</button>
          {/* {loading && "Uploading and compressing the image please wait..."} */}
          {err && (
            <span style={{ color: "red", textAlign: "center" }}>
              Something went wrong
            </span>
          )}
        </form>
        <p>
          You do have an account? <Link to="/login">Login</Link>
        </p>
      </div>
      {loading && (
        <>
          <Loading />
          <Mask />
        </>
      )}
    </div>
  );
};
