import { Routes , Route } from "react-router-dom";
import Navbar from "../components/Navbar";
import Main from "../pages/Main"
import Login from "../pages/Login";
import Register from "../pages/Register";
import MovieDetail from "../pages/MovieDetail";
import PrivateRouter from "./PrivateRouter";
// import { ToastContainer } from "react-toastify";

const AppRouter = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />

        <Route path="moviedetail" element={<PrivateRouter />}>
          <Route path=":id" element={<MovieDetail />} />
        </Route>

        <Route path="*" element={<Main />} />
      </Routes>

    </>
  );
};

export default AppRouter;
