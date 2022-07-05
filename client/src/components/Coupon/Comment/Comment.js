import "./style.css"
import moment from "moment";
const Comment = (props) => {
    const { displayName, date, comment } = props.commentObj;
    return (
        <div className="comment-wrapper">
            <div className="comment-content">
                <div className="comment-header">
                    Comment #{props.id}
                </div>
                <div className="comment">
                    <b>{displayName ? displayName : "Anonymous"}:</b> {comment}
                </div>
                <div className="user-info">
                   {moment(date).format("MMM DD, YYYY")}
                </div>
            </div>
        </div>
    );
};

export default Comment;