import "./style.css"
import { useContext, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../Context/AuthContext";

const Login = (props) => {
    const navigate = useNavigate();
    const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
    const [message, setMessage] = useState("");
    const [showMessage, setShowMessage] = useState(false);
    const [userObj, setuserObj] = useState({
        email: "",
        password: ""
    });

    //check if user is already logged in
    useEffect(() => {
        //redirect back to home, if already logged in
        if (isLoggedIn || localStorage.getItem("token") !== null) {
            navigate("/", { replace: true })
        }
    }, [])

    const handleSubmit = (event) => {
        event.preventDefault();
        //submit to server
        axios.post("http://localhost:3001/user/login", userObj).then((res) => {

            localStorage.setItem("token", res.data.token);
            //TODO:redirect to home
            setIsLoggedIn(true);
            navigate("/", { replace: true })

        }).catch((err) => {
            if (err.response.status === 401) {
                setMessage("Email or Password is incorrect.")
            } else {
                setMessage("Please try again later...")
            }
            setShowMessage(true);
        })
    }

    return (
        <>
            <div className="wrapper">
                <div className="loginContainer">
                    <h1>Member Login</h1>
                    <hr />
                    <form id="loginFrom" onSubmit={handleSubmit}>
                        <input type="text" name="email" id="email" placeholder="Email" value={userObj.email} onChange={(event) => setuserObj({ ...userObj, [event.target.name]: event.target.value })} required />
                        <input type="password" name="password" id="password" placeholder="Password" value={userObj.password} onChange={(event) => setuserObj({ ...userObj, [event.target.name]: event.target.value })} required />
                        <button className="loginBtn">Login</button>
                        {showMessage ? <div className="notice">{message}</div> : <></>}
                    </form>
                    <hr />
                    <b>Don't have an account yet?</b> <Link to="/signup">Sign up</Link>
                </div>
            </div>
        </>
    );
}

export default Login;