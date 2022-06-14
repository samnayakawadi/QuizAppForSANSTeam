import { Routes, Route } from "react-router-dom";
import Home from "../home/Home";
import Register from "../auth/Register";
import Login from "../auth/Login";
import RedirectToDashboard from "../redirects/RedirectToDashboard";
import PageNotFound from "../home/PageNotFound";

const HomeRouter = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/" element={<RedirectToDashboard/>}>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Route>
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
};

export default HomeRouter;
