
import HomeRouter from "./components/routes/HomeRouter";
import DashboardRouter from "./components/routes/DashboardRouter";
import Footer from "./components/navbars/Footer";
import {Route, Routes} from "react-router-dom"
import { UserContext } from "./components/context/UserContext";
import { useState } from "react";
import NavbarRedirects from "./components/redirects/NavbarRedirects";

export default function App() {

  const [userContextData, setUserContextData] = useState({isLoggedIn:false})

  return (
    <UserContext.Provider value={{userContextData, setUserContextData}}>
      <NavbarRedirects/>
      <Routes>
        <Route path="/*" element={<HomeRouter />}/>
        <Route path="/dashboard/*" element={<DashboardRouter />}/>
      </Routes>
      <Footer />
    </UserContext.Provider>
  );
}
