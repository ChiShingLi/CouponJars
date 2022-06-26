import "./style.css"
import { useEffect, useState } from "react";
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
    const [userObj, setUserObj] = useState();
    const [displayName, setDisplayName] = useState("");

    useEffect(() => {
        //get current logged user
        const getUser = async () => {
            const userData = await axios.get("http://localhost:3001/user", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            setUserObj(userData.data);
        };
        getUser();
    }, []);


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

    const handleChangeDisplayName = (event) => {
        event.preventDefault();
        //if input field is not empty, trim leading and ending whitespaces
        if (displayName !== "") {
            axios.patch(`${process.env.REACT_APP_DATABASE_URL}/user/changeName/`, { displayName: displayName.trim() }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            }).then((res) => {
                if (res.status === 200) {
                    setDisplayName("");
                    setUserObj({ displayName: displayName.trim() })
                    handleMessage(true, "Display name successfully updated.");
                }
            }).catch((err) => {
                if (err.response.status === 401) {
                    handleMessage(false, "Email or Password is incorrect.");
                } else if (err.response.status === 409) {
                    handleMessage(false, "Display name is already taken.");
                } else {
                    handleMessage(false, "Please try again later...");
                }
            })
        }

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
                <b>Current name: </b>{userObj && userObj.displayName ? userObj.displayName : "NOT SET"}
                <form id="changeDisplayNameForm" onSubmit={handleChangeDisplayName}>
                    <input type="text" name="displayName" id="displayName" placeholder="Display Name" required value={displayName} onChange={(event) => setDisplayName(event.target.value)} />
                    <button id="changeNameBtn">Confirm</button>
                </form>
                <hr />
                <h2><KeyIcon height="28px" width="28px" /> Change Password</h2>
                <form id="changePasswordForm" onSubmit={handleChangePassword}>
                    <input type="password" name="currentPassword" id="currentPassword" placeholder="Current Password" required value={passwordObj.currentPassword} onChange={(event) => setPasswordObj({ ...passwordObj, currentPassword: event.target.value })} />
                    <input type="password" name="newPassword" id="newPassword" placeholder="New Password" required value={passwordObj.newPassword} onChange={(event) => setPasswordObj({ ...passwordObj, newPassword: event.target.value })} />
                    <input type="password" name="confirmPassword" id="confirmPassword" placeholder="Confirm Password" required value={confirmPassword} onChange={(event) => setNewPassword(event.target.value)} />
                    <button id="changePasswordBtn">Confirm</button>
                </form>
            </div>
            {showErrMessage ? <div className="notice-error">{messsage}</div> : <></>}
            {showSuccessMessage ? <div className="notice-success">{messsage}</div> : <></>}
        </div>
    );
}

export default Account;