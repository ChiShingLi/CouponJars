import "./style.css"
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { ReactComponent as Logo } from "../../images/logo.svg";
import { ReactComponent as AddIcon } from "../../images/add.svg";
import { ReactComponent as AboutIcon } from "../../images/about.svg";
const Navbar = () => {
    const navigate = useNavigate();
    const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
    const handleSignOut = () => {
        setIsLoggedIn(false);
        localStorage.removeItem("token");
        navigate("/");
    }

    return (
        <div id="navbar">
            <div className="logo-container">
                <a href="/"><Logo alt="CouponJars" height="55px" /></a>
                CouponJars
                <div className="left-continer">
                    <Link to="/about"><AboutIcon width="25px"/>About</Link>
                </div>
            </div>

            {/* <div className="searchTab">
                <input type="text" name="searchText" id="searchText" placeholder="Enter website name" />
            </div> */}
            <div className="user-panel">

                {!isLoggedIn && localStorage.getItem("token") == null ?
                    <></>
                    :
                    <div className="myAccount">
                        <Link to="/post/create"><button className="createBtn"> <AddIcon id="addIcon" fill="white" height="15px" />Add</button></Link>
                        <Link to="/account"><button className="accountBtn">Account</button></Link>
                    </div>
                }
                <div className="user-btn">
                    {!isLoggedIn && localStorage.getItem("token") == null ? <Link to="/login"><button className="loginBtn">Login</button></Link> : <button className="signoutBtn" onClick={() => handleSignOut()}>LogOut</button>}
                </div>
            </div>
        </div>
    );
}

export default Navbar;