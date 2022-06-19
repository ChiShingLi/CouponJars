import "./style.css"
import {commentSvg} from "../../images/comment.svg"
import axios from "axios";
const Coupon = (props) => {
    //title
    //photo
    //description
    //upvote
    //date
    //upvote function
    return (
        <div className="wrapper">
            <div className="left-content">
                <img src="http://placehold.jp/80x100.png" />
            </div>
            <div className="right-content">
                <b>MSI Laptop</b>
                <p>100% off with this coupon</p>
                code:
                <input type="text" name="couponCode" id="couponCode" value="10CODEOFF" readOnly />
                <div className="interaction-content">
                   <div className="rating">
                    rating
                   </div>
                   <div className="comments">
                       <commentSvg/>
                   </div>
                </div>
                <div className="date-content">
                    posted at: 2022-06-18
                </div>
            </div>
        </div>
    );
}

export default Coupon