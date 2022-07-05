import "./style.css"
import axios from "axios";
import { ReactComponent as LikeIcon } from "../../images/like.svg";
import { ReactComponent as CommentIcon } from "../../images/comment.svg";
import { useState } from "react";
import moment from 'moment';
import { useNavigate, Link } from "react-router-dom";
import { ReactComponent as NoImageIcon } from "../../images/noImage.svg";
import { ReactComponent as PopOutIcon } from "../../images/popOut.svg";

const Coupon = (props) => {
    const { _id, image, title, description, code, createdAt, likes, posterName, comments} = props.data;
    const formatDate = moment(createdAt).format("MMM DD, YYYY");
    const [likeCount, setlikeCount] = useState(likes);
    const navigate = useNavigate();

    const handleLike = () => {
        axios.patch(`${process.env.REACT_APP_DATABASE_URL}/post/like`, { postId: _id }, {
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
                <div className="image-content">
                    {image ? <img src={image} height="120px" /> : <NoImageIcon width="300px" height="120px" />}
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
                        <div className="comment-content">
                            <div className="commentIcon">
                            <Link to={`/post/detail/${_id}`}><CommentIcon height="18px" width="18px"/> <div className="commentCount"><b>{comments.length}</b></div></Link>
                            </div>

                        </div>
                    </div>
                    <div className="date-content">
                        <div className="posted">
                            Posted by:	&nbsp;<b>{posterName ? posterName : "Anonymous"}</b>	&nbsp;at {formatDate}
                        </div>
                        <div className="popOut">
                            <Link to={`/post/detail/${_id}`}>More Details<PopOutIcon height="15px" width="15px" /></Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Coupon