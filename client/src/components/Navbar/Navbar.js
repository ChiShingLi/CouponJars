import "./style.css"
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";


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
                <a href="/">CouponJars</a>
            </div>
            <div className="searchTab">
                <input type="text" name="searchText" id="searchText" placeholder="Enter website name" />
            </div>
            <div className="user-panel">
                {!isLoggedIn || localStorage.getItem("token") == null ?
                    <></>
                    :
                    <div className="myAccount">
                        <Link to="/account">Account</Link>
                    </div>
                }
                <div className="user-btn">
                    {!isLoggedIn || localStorage.getItem("token") == null ? <Link to="/login"><button className="loginBtn">Login</button></Link> : <button className="signoutBtn" onClick={() => handleSignOut()}>LogOut</button>}
                </div>
            </div>
        </div>
    );
}

export default Navbar;