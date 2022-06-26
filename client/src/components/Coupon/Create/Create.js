import "./style.css"
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const Create = () => {
    const navigate = useNavigate();
    const [message, setMessage] = useState("");
    const [showMessage, setShowMessage] = useState(false);
    const [showErrMessage, setShowErrMessage] = useState(false);
    const [postObj, setPostObj] = useState({
        category: "uncategorized",
        title: "",
        description: "",
        code: "",
        expiryDate: ""
    });

    //redirect to homepage
    const redirect = () => {
        setTimeout(() => {
            navigate("/", { replace: true });
        }, 2000)
    }

    //display message
    const handleMessage = (valid, message) => {
        if (valid === true) {
            //display success message
            setShowMessage(true);
            setShowErrMessage(false);
            redirect();
        } else {
            //display error message
            setShowErrMessage(true);
            setShowMessage(false);
        }
        setMessage(message);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post(`${process.env.REACT_APP_DATABASE_URL}/post/`, postObj, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        }).then((res) => {
            //TODO: display success text
            handleMessage(true, "Post successful. Redirecting in 2 seconds...");
        }).catch((err) => {
            //display error message on error
            handleMessage(false, "Please try again later...");
        });
    }

    //convert image to base64
    const convertBase64 = (imageFile) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(imageFile);

            fileReader.onload = () => {
                resolve(fileReader.result);
            };

            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    }

    const handleImage = async (e) => {
        const imageFile = e.target.files[0];
        const base64 = await convertBase64(imageFile);
        setPostObj({ ...postObj, image: base64 });
    }

    return (
        <div className="wrapper">
            <h1>Submit Coupon Codes!</h1>
            <form id="createForm" onSubmit={handleSubmit}>

                <select name="category" onChange={(event) => setPostObj({ ...postObj, [event.target.name]: event.target.value })}>
                    <option value="uncategorized" defaultValue="uncategorized">Uncategorized</option>
                    <option value="autos">Autos</option>
                    <option value="electronic">Electronics</option>
                    <option value="homeImprovement">Home Improvement</option>
                    <option value="movie">Movie</option>
                    <option value="videoGame">Video Games</option>
                </select>
                <input type="text" name="title" id="title" placeholder="Title" required onChange={(event) => setPostObj({ ...postObj, [event.target.name]: event.target.value })} />
                <textarea type="text" name="description" id="description" placeholder="Description" required onChange={(event) => setPostObj({ ...postObj, [event.target.name]: event.target.value })} />
                <input type="text" name="code" id="code" placeholder="Coupon Code (Optional)" onChange={(event) => setPostObj({ ...postObj, [event.target.name]: event.target.value })} />
                <input type="date" name="expiryDate" id="expiryDate" placeholder="Expiry Date" onChange={(event) => setPostObj({ ...postObj, [event.target.name]: event.target.value })} />
                <label htmlFor="postPhoto">Image (Optional):</label>
                <input type="file" name="postPhoto" id="postPhoto" accept="image/png, image/gif, image/jpeg" onChange={handleImage} />
                <button className="submitBtn" type="submit">Submit</button>
            </form>
            {showMessage ? <div className="notice-success">{message}</div> : <></>}
            {showErrMessage ? <div className="notice-error">{message}</div> : <></>}
        </div>
    );
}

export default Create;