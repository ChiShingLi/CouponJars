import { Navigate } from "react-router-dom";
import axios from "axios";

const checkValid = async () => {
    //get with bearer token header
    const status = await axios.get("http://localhost:3001/auth/isValidAuth", {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    })
    return status.data;
}

export const RequireAuth = ({ children }) => {
    //check if user have token/logged in
    if (localStorage.getItem("token") !== null) {
        //verify token is valid
        const auth = checkValid();

        //if successful, redirect to child page
        if (auth) {
            return children
        } else {
            //redirect to login
            return <Navigate to='/login' />
        }
    }

    //else, return to login
    return <Navigate to='/login' />
}