import "./style.css"
import Coupon from "../Coupon/Coupon";
import { useState, useEffect } from "react"
import axios from "axios";
import HashLoader from "react-spinners/HashLoader";
const Home = () => {
    const [postData, setPostData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get(`${process.env.REACT_APP_DATABASE_URL}/post`).then((res)=>{
                setPostData(res.data);
                setLoading(false);
            })
        };
        fetchData();
    }, [])
    let [loading, setLoading] = useState(true);
    return (
        <div className="wrapper">
            <div className="header-content">
                <h1>Frontpage Coupon Codes</h1>
                <h5>{postData ? postData.length : "0"} coupon(s) are availble to you.</h5>
            </div>
            {/* TODO: coupon grid here */}
            {/* What's Trending */}
            {/* all coupons */}
            {loading ? <HashLoader color="#4A90E2" /> :
                <div id="coupon-grid">
                    {postData && postData.map(postObj => {
                        return (
                            <Coupon key={postObj._id} data={postObj} />
                        );
                    })}
                </div>
            }
        </div>
    );
}

export default Home;