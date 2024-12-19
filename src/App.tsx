import { Route, Routes, useLocation } from "react-router-dom";
import Login from "./Page/Login";
import Singup from "./Page/Singup";
import { Toaster } from "react-hot-toast";
import Home from "./Page/Home";
import SideBar from "./Page/SideBar";
import CreateBlogPost from "./Page/CreateBlogPost";

function App() {
  const location = useLocation();
  const publicRoutes = ["/login", "/signup"];
  const isPublicRoute = publicRoutes.includes(location.pathname);

  return (
    <>
      <div>
        <Toaster position="top-right" reverseOrder={false} />
        {/* Conditionally render the sidebar only if not on a public route */}
        {!isPublicRoute && <SideBar />}
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Singup />} />
            <Route path="/createblogpost" element={<CreateBlogPost />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
