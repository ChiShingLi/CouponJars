import "./style.css"
import { useState } from "react";
import axios from "axios";
import { ReactComponent as KeyIcon } from "../../../images/key.svg";
import { ReactComponent as NameIcon } from "../../../images/name.svg";
const Account = () => {
    const [passwordObj, setPasswordObj] = useState({
        currentPassword: "",
        newPassword: ""
    });
    const [confirmPassword, setNewPassword] = useState("");
    const [messsage, setMessage] = useState("");
    const [showErrMessage, setShowErrMessage] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    //display message
    const handleMessage = (valid, message) => {
        if (valid === true) {
            //display success message
            setShowSuccessMessage(true);
            setShowErrMessage(false);
        } else {
            //display error message
            setShowErrMessage(true);
            setShowSuccessMessage(false);
        }
        setMessage(message);
    }

    //clear inputs
    const clear = () => {
        setPasswordObj({
            currentPassword: "",
            newPassword: ""
        });
        setNewPassword("");
    }

    const handleChangeDisplayName = (event)=>{
        event.preventDefault();
    }

    const handleChangePassword = (event) => {
        event.preventDefault();

        //check if both new passwords matches
        if (passwordObj.newPassword !== confirmPassword) {
            //display password doesn't match error
            handleMessage(false, "New password and confirm password don't match.");
        } else if (passwordObj.currentPassword === passwordObj.newPassword) {
            handleMessage(false, "The new password cannot be the same as the current password.");
        } else {
            //axios patch
            axios.patch("http://localhost:3001/user/changePassword", passwordObj, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            }).then((res) => {
                if (res.status === 200) {
                    handleMessage(true, "Password successfully updated.");
                    clear();
                }
            }).catch((err) => {
                if (err.response.status === 401) {
                    handleMessage(false, "Email or Password is incorrect.");
                } else {
                    handleMessage(false, "Please try again later...");
                }
            })
        }
    }

    return (
        <div className="account-content">
            <h1>My Account</h1>
            <div className="form-container">
                <h2><NameIcon height="28px" width="28px" /> Change Display name</h2>
                <b>Current name: </b>NOT SET 
                <form id="changePasswordForm" onSubmit={handleChangeDisplayName}>
                    <input type="password" name="displayName" id="displayName" placeholder="Display Name" required value={passwordObj.currentPassword} />
                    <button id="submitBtn">Confirm</button>
                    {showErrMessage ? <div className="notice-error">{messsage}</div> : <></>}
                    {showSuccessMessage ? <div className="notice-success">{messsage}</div> : <></>}
                </form>
                <hr />
                <h2><KeyIcon height="28px" width="28px" /> Change Password</h2>
                <form id="changePasswordForm" onSubmit={handleChangePassword}>
                    <input type="password" name="currentPassword" id="currentPassword" placeholder="Current Password" required value={passwordObj.currentPassword} onChange={(event) => setPasswordObj({ ...passwordObj, currentPassword: event.target.value })} />
                    <input type="password" name="newPassword" id="newPassword" placeholder="New Password" required value={passwordObj.newPassword} onChange={(event) => setPasswordObj({ ...passwordObj, newPassword: event.target.value })} />
                    <input type="password" name="confirmPassword" id="confirmPassword" placeholder="Confirm Password" required value={confirmPassword} onChange={(event) => setNewPassword(event.target.value)} />
                    <button id="submitBtn">Confirm</button>
                    {showErrMessage ? <div className="notice-error">{messsage}</div> : <></>}
                    {showSuccessMessage ? <div className="notice-success">{messsage}</div> : <></>}
                </form>
            </div>
        </div>
    );
}

export default Account;