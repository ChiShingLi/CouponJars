import "./style.css"
import { useState } from "react";
import axios from "axios";

const Signup = () => {
    const [errMessage, setErrMessage] = useState("");
    const [error, setError] = useState(false);
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [userObj, setuserObj] = useState({
        email: "",
        password: ""
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        if (passwordConfirm !== userObj.password) {
            //show error text
            setErrMessage("Password doesn't match.")
            setError(true);
        } else {
            //submit to server
            axios.post("http://localhost:3001/user/signup", userObj).then((res) => {
                console.log("Sign up successful")
                //redirect to home
            }).catch((err) => {
                if (err.response.status == 409) {
                    setErrMessage("Email already exists. Please login.")
                } else {
                    setErrMessage("Please try again later...")
                }
                setError(true);
            })
        }
    }

    return (
        <>
            <div className="signupContainer">
                <h1>Join Now!</h1>
                <hr />
                <form id="signupFrom" onSubmit={handleSubmit}>
                    <input type="text" name="email" id="email" placeholder="Email" value={userObj.email} onChange={(event) => setuserObj({ ...userObj, [event.target.name]: event.target.value })} required />
                    <input type="password" name="password" id="password" placeholder="Password" value={userObj.password} onChange={(event) => setuserObj({ ...userObj, [event.target.name]: event.target.value })} required />
                    <input type="password" name="password-confirm" id="password-confirm" placeholder="Confirm Password" value={passwordConfirm} onChange={(event) => setPasswordConfirm(event.target.value)} required />
                    <button className="signupBtn">Sign Up</button>
                    {error ? <div className="notice">{errMessage}</div> : <></>}
                </form>
                <b>Already registered?</b> Login
            </div>
        </>
    );
}

export default Signup;