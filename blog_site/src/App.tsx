import "./App.css";

import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import { CreatePost } from "./pages/create-post/create-post";
import { Footer } from "./pages/main/footer";
import { Main } from "./pages/main/main";
import { Navbar } from "./pages/main/navbar";
import { NetError } from "./components/failed-page/netError";
import { RTE } from "./pages/rich-text-editor/RTE";
import { auth } from "./config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

function App() {
  const [user] = useAuthState(auth);
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          {!user ? (
            <Route path="/" element={<NetError />} />
          ) : (
            <Route path="/" element={<Main />} />
          )}
          <Route path="/creatpost" element={<CreatePost />} />
          <Route path="/RTE" element={<RTE />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
