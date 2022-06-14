import { Link } from "react-router-dom";
import cdacLogo from "./cdac.png";
import { UserContext } from "../context/UserContext";
import { useContext } from "react";

const DashboardNavbar = () => {

    const {userContextData} = useContext(UserContext) 

  return (
    <div className="p-3 mb-3">
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <Link to="/">
            <a href="/" target="_blank" className="navbar-item">
              <img src={cdacLogo} width={60} height={60} alt="CDAC Logo"/>
            </a>
          </Link>
          <a
            href="/dashboard"
            role="button"
            className="navbar-burger"
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarBasicExample"
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </a>
        </div>
        <div id="navbarBasicExample" className="navbar-menu">
          {/* <div className="navbar-start">
            <a className="navbar-item">Home</a>
            <a className="navbar-item">Documentation</a>
            <div className="navbar-item has-dropdown is-hoverable">
              <a className="navbar-link">More</a>
              <div className="navbar-dropdown">
                <a className="navbar-item">About</a>
                <a className="navbar-item">Jobs</a>
                <a className="navbar-item">Contact</a>
                <hr className="navbar-divider" />
                <a className="navbar-item">Report an issue</a>
              </div>
            </div>
          </div> */}

          <div className="navbar-end">
            {/* <div className="navbar-item"> */}
              {/* <div className="buttons">
                <Link to="/register">
                  <div className=" m-3 button is-primary">
                    <p className="has-text-white">Sign up</p>
                  </div>
                </Link>
                <Link to="/login">
                  <div className="m-3 button is-primary">
                    <p className="has-text-white">Login</p>
                  </div>
                </Link>
              </div> */}
            {/* </div> */}

            <div className="navbar-item has-dropdown is-hoverable">
            <div className="navbar-link">Hi {userContextData.name}</div>
            <div className="navbar-dropdown">
              <Link to="/dashboard/logout"><div className="navbar-item">Logout</div></Link>
              <Link to="/dashboard/randompage"><div className="navbar-item">Page Not Found</div></Link>
              
              {/* <a className="navbar-item">Jobs</a>
              <a className="navbar-item">Contact</a> */}
              <hr className="navbar-divider" />
              <a href="mailto:samnayakawadi@gmail.com" rel="noreferrer" target="_blank" className="navbar-item">Report an issue</a>
            </div>
          </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default DashboardNavbar;
