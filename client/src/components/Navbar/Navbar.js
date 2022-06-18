import "./style.css"
import { Link, useNavigate } from "react-router-dom";
const Navbar = () => {
    const navigate = useNavigate();
    const handleSignOut = () => {
        localStorage.removeItem("token");
        navigate("/");
    }

    //TODO: fix logout
    return (
        <div id="navbar">
            <div className="logo-container">
                <a href="/">CouponJars</a>
            </div>
            <div className="searchTab">
                <input type="text" name="searchText" id="searchText" placeholder="Enter website name" />
            </div>
            <div className="user-panel">
                {localStorage.getItem("token") == null ? <Link to="/login">Login</Link> : <button onClick={() => handleSignOut}>LogOut</button>}
            </div>
        </div>
    );
}

export default Navbar;