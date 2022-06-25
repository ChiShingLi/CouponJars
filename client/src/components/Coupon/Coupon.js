import "./style.css"
import axios from "axios";
import { ReactComponent as LikeIcon } from "../../images/like.svg";
import { useState } from "react";
import moment from 'moment';
import { useNavigate } from "react-router-dom";

const Coupon = (props) => {
    const { _id, title, description, code, createdAt, likes, posterName } = props.data;
    const formatDate = moment(createdAt).format("MMM DD, YYYY");
    const [likeCount, setlikeCount] = useState(likes);
    const navigate = useNavigate();

    const handleLike = () => {
        axios.patch("http://localhost:3001/post/like", { postId: _id }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        }).then((res) => {
            setlikeCount(prev => prev + 1);
        }).catch((err) => {
            navigate("/login");
        })
    }
    return (
        <div className="wrapper-grid">
            <div className="coupon-content">
                <div className="left-content">
                    <img src="http://placehold.jp/300x120.png" alt="coupon photo"/>
                </div>
                <div className="right-content">
                    <b>{title}</b>
                    <div className="desc-content">{description}</div>
                    code:
                    <input type="text" name="couponCode" id="couponCode" value={code !== "" ? code : "NO CODE NEEDED"} readOnly />
                    <div className="interaction-content">
                        <div className="rating">
                            <LikeIcon alt="likes" height="18px" width="18px" onClick={() => handleLike()} /> <b>{likeCount}</b>
                        </div>
                    </div>
                    <div className="date-content">
                        Posted by:	&nbsp;<b>{posterName ? posterName : "Anonymous"}</b>	&nbsp;at {formatDate}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Coupon