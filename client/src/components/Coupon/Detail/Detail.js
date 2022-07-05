import "./style.css"
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ReactComponent as LikeIcon } from "../../../images/like.svg";
import moment from "moment";
import HashLoader from "react-spinners/HashLoader";
import Comment from "../Comment/Comment";
import { ReactComponent as NoImageIcon } from "../../../images/noImage.svg";
const Detail = () => {
    //get "id" params from url
    const { id } = useParams();
    const [postData, setPostData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [postComment, setPostComment] = useState("");
    const [commentList, setCommentList] = useState([]);
    const fetchPost = async () => {
        await axios.get(`${process.env.REACT_APP_DATABASE_URL}/post/getPost`, {
            params: {
                postId: id
            }
        }).then((res) => {
            setPostData(res.data);
            setLoading(false);
            setCommentList(res.data.comments);
        }).catch((err) => {

        })
    }

    useEffect(() => {
        fetchPost();
    }, [])

    //handle comment click
    const handleComment = (e) => {
        e.preventDefault();
        axios.patch(`${process.env.REACT_APP_DATABASE_URL}/post/comment`, { postId: id, comment: postComment }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        }).then(() => {
            //rerender comment UI
            setCommentList([...commentList, { comment: postComment, date: new Date() }]);
            setPostComment("");
        }).catch((err) => {
            console.log(err)
        })
    }

    return (
        <div className="detail-wrapper">
            {loading ? <HashLoader color="#4A90E2" /> :
                <div className="detail-content">
                    <div className="info-section">
                        <div className="left-content">
                            {postData.image ? <img src={postData.image} alt="coupon photo" /> : <NoImageIcon width="300px" height="200px" />}
                        </div>
                        <div className="right-content">
                            <div className="detail-description">
                                <h1>{postData.title}</h1>
                                {postData.description}
                                <span><b>Code:</b>&nbsp;{postData.code ? postData.code : "N/A"}</span>
                                <span><b>Total <LikeIcon height="18px" />:</b>&nbsp;{postData.likes}</span>
                                <span><b>Expiry date:</b>&nbsp;{postData.expiryDate ? moment(postData.expiryDate).format("MMM DD, YYYY") : "N/A"}</span>
                                <span><b>Posted by:</b>&nbsp;{postData.posterName ? postData.posterName : "Anonymous"}</span>
                                <span><b>Date:</b>&nbsp;{moment(postData.createdAt).format("MMM DD, YYYY")}</span>
                            </div>
                        </div>
                    </div>
                    <div className="comment-section">
                        <hr />
                        {localStorage.getItem("token") != null ? <div className="comment-form">
                            <form id="commentForm" onSubmit={handleComment}>
                                <textarea name="commentText" id="commentText" placeholder="Leave a Comment" value={postComment} onChange={(event) => setPostComment(event.target.value)} required />
                                <button className="submitBtn">Comment</button>
                            </form>
                        </div>
                            :
                            <></>}
                        <h1>{commentList.length} Comment(s)</h1>
                        {commentList && commentList.map((comment, index) => {
                            return (
                                <>
                                    <hr />
                                    <Comment id={index + 1} commentObj={comment} />
                                </>
                            );
                        })}
                    </div>
                </div>
            }
        </div>
    );
}

export default Detail;