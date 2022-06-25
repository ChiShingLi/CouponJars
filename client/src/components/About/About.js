import "./style.css"
import { ReactComponent as LikeIcon } from "../../images/like.svg";
const About = () => {
    return (
        <div className="about-wrapper">
            <div className="about-content">
                <div className="title">
                    <h1>About CouponJars</h1>
                </div>
                <div className="desc">
                    <p>This full stack personal project is built from scratch using the MERN stack - <b>MongoDB, ExpressJS, ReactJS and NodeJs.</b></p>
                    <p>CouponJars is a platform that allows users to submit their finds about coupon and deals to other users, while allowing users to interact with each coupon posts with "Like {<LikeIcon height="13px" />}" feature to indicate the popularity of the post. </p>
                </div>
            </div>
        </div>
    );
}

export default About;