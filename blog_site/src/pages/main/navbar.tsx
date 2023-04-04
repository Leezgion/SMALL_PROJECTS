import { auth, provider } from "../../config/firebase";

import { NavLink } from "react-router-dom";
import { signInWithRedirect } from "firebase/auth";
import { signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

export const Navbar = () => {
  /**
   * user:{...displayName,email,phoneNumber,photoURL,}
   */
  const [user] = useAuthState(auth);

  const logOut = async () => {
    await signOut(auth);
  };
  const signInWithGoogle = async () => {
    const result = await signInWithRedirect(auth, provider);
    console.log(result);
  };
  return (
    <div className="main-document-header">
      <div className="navbar">
        <div className="navbar--Link">
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "isActive" : "inActive")}
          >
            Home Page
          </NavLink>
          {user && (
            <>
              <NavLink
                to="/creatpost"
                className={({ isActive }) =>
                  isActive ? "isActive" : "inActive"
                }
              >
                Create Post
              </NavLink>
              <NavLink
                to="/RTE"
                className={({ isActive }) =>
                  isActive ? "isActive" : "inActive"
                }
              >
                Rich Text
              </NavLink>
            </>
          )}
        </div>
        <div className="navbar--userData">
          {user ? (
            <>
              <div> {user?.displayName}</div>
              <img
                src={user?.photoURL || ""}
                title="头像"
                alt=""
                referrerPolicy="no-referrer"
              />
              <button onClick={logOut}>log out</button>
            </>
          ) : (
            <div className="logIn-Button" onClick={signInWithGoogle}>
              Log In with Google
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
