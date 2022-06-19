import "./style.css"
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";

const Signup = () => {
    const navigate = useNavigate();
    const [message, setMessage] = useState("");
    const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
    const [showMessage, setShowMessage] = useState(false);
    const [passwordConfirm, setPasswordConfirm] = useState("");
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

    const redirect = () => {
        setMessage("Sign Up Successful. Redirecting in 2 seconds...");
        setShowMessage(true);

        setTimeout(() => {
            navigate("/login", { replace: true });
        }, 2000)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (passwordConfirm !== userObj.password) {
            //show error text
            setMessage("Password doesn't match.")
            setShowMessage(true);
        } else {
            //submit to server
            axios.post("http://localhost:3001/user/signup", userObj).then((res) => {
                //TODO:redirect to home
                redirect();

            }).catch((err) => {
                if (err.response.status === 409) {
                    setMessage("Email already exists. Please login.")
                } else {
                    setMessage("Please try again later...")
                }
                setShowMessage(true);
            })
        }
    }

    return (
        <div className="wrapper">
            <div className="signupContainer">
                <h1>Join Now!</h1>
                <hr />
                <form id="signupFrom" onSubmit={handleSubmit}>
                    <input type="text" name="email" id="email" placeholder="Email" value={userObj.email} onChange={(event) => setuserObj({ ...userObj, [event.target.name]: event.target.value })} required />
                    <input type="password" name="password" id="password" placeholder="Password" value={userObj.password} onChange={(event) => setuserObj({ ...userObj, [event.target.name]: event.target.value })} required />
                    <input type="password" name="password-confirm" id="password-confirm" placeholder="Confirm Password" value={passwordConfirm} onChange={(event) => setPasswordConfirm(event.target.value)} required />
                    <button className="signupBtn">Sign Up</button>
                    {showMessage ? <div className="notice">{message}</div> : <></>}
                </form>
                <hr />
                <b>Already registered?</b> <Link to ="/login">Login</Link>
            </div>
        </div>
    );
}

export default Signup;