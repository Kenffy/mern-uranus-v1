import React from 'react';
import "./Rightbar.css";
import Avatar from '@material-ui/core/Avatar';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import { NavLink, Link } from "react-router-dom";
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import PinterestIcon from '@material-ui/icons/Pinterest';
import TwitterIcon from '@material-ui/icons/Twitter';
import YouTubeIcon from '@material-ui/icons/YouTube';

import pic1 from "../../assets/images/covers/pic1.jpg";
//import pic2 from "../../assets/images/covers/pic2.jpg";
import pic3 from "../../assets/images/covers/pic3.jpg";
//import pic4 from "../../assets/images/covers/pic4.jpg";
import pic5 from "../../assets/images/covers/pic5.jpg";

export default function Rightbar() {
    return (
        <div className="rightbar">
            <div className="rightbar-categories">
                <div className="categories-title">Categories</div>
                <hr className="rightbar-hr"/>
                <ul className="categories-links">
                    <NavLink to={`/?cat=sport`} className="link"
                    activeClassName="active">
                        <li className="category-item">Fashon</li>
                    </NavLink>
                    <NavLink to={`/?cat=sport`} className="link"
                    activeClassName="active">
                        <li className="category-item">Travel</li>
                    </NavLink>
                    <NavLink to={`/?cat=sport`} className="link"
                    activeClassName="active">
                        <li className="category-item">Music</li>
                    </NavLink>
                    <NavLink to={`/?cat=sport`} className="link"
                    activeClassName="active">
                        <li className="category-item">Fitness</li>
                    </NavLink>
                    <NavLink to={`/?cat=sport`} className="link"
                    activeClassName="active">
                        <li className="category-item">Sport</li>
                    </NavLink>
                    <NavLink to={`/?cat=sport`} className="link"
                    activeClassName="active">
                        <li className="category-item">Movies</li>
                    </NavLink>
                    <NavLink to={`/?cat=sport`} className="link"
                    activeClassName="active">
                        <li className="category-item">All</li>
                    </NavLink>
                    <NavLink to={`/?cat=sport`} className="link"
                    activeClassName="active">
                        <li className="category-item">More</li>
                    </NavLink>
                </ul>
            </div>
            <div className="rightbar-most-popular">
                <div className="most-popular-title">Most Popular</div>
                <hr className="rightbar-hr"/>
                <div className="avatar-group">
                    <AvatarGroup max={5}>
                        <Avatar alt="Remy Sharp" src="" className="most-popular-avatar"/>
                        <Avatar alt="Travis Howard" src="" className="most-popular-avatar"/>
                        <Avatar alt="Cindy Baker" src="" className="most-popular-avatar"/>
                        <Avatar alt="Agnes Walker" src="" className="most-popular-avatar"/>
                        <Avatar alt="Trevor Henderson" src="" className="most-popular-avatar"/>
                        <Avatar alt="Cindy Baker" src="" className="most-popular-avatar"/>
                        <Avatar alt="Agnes Walker" src="" className="most-popular-avatar"/>
                        <Avatar alt="Trevor Henderson" src="" className="most-popular-avatar"/>
                    </AvatarGroup>
                </div>
            </div>
            <div className="rightbar-follow-us">
                <div className="follow-us-title">Follow Us</div>
                <hr className="rightbar-hr"/>
                <div className="follow-us">
                    <Link to="https://www.facebook.com" className="link">
                        <FacebookIcon className="follow-us-icon"/>
                    </Link>
                    <Link to="https://www.instagram.com/" className="link">
                        <InstagramIcon className="follow-us-icon"/>
                    </Link>
                    <Link to="https://www.linkedin.com/" className="link">
                        <LinkedInIcon className="follow-us-icon"/>
                    </Link>
                    <Link to="https://www.pinterest.de/" className="link">
                        <PinterestIcon className="follow-us-icon"/>
                    </Link>
                    <Link to="https://twitter.com/" className="link">
                        <TwitterIcon className="follow-us-icon"/>
                    </Link>
                    <Link to="https://www.youtube.com/" className="link">
                        <YouTubeIcon className="follow-us-icon"/>
                    </Link>
                </div>
            </div>

            <div className="rightbar-top-content">
                <div className="top-content-title">Most Read Content</div>
                <hr className="rightbar-hr"/>
                <div className="top-contents">
                    <div className="content-item">
                        <div className="item-wrapper">
                            <div className="item-title">Amet consectetur adipisicing elit.</div>
                            <div className="item-body">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam, quam.</div>
                        </div>
                        <img src={pic5} alt="post-img" className="item-picture"/>
                    </div>
                </div>

                <div className="top-contents">
                    <div className="content-item">
                        <div className="item-wrapper">
                            <div className="item-title">Amet consectetur adipisicing elit.</div>
                            <div className="item-body">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam, quam.</div>
                        </div>
                        <img src={pic3} alt="post-img" className="item-picture"/>
                    </div>
                </div>

                <div className="top-contents">
                    <div className="content-item">
                        <div className="item-wrapper">
                            <div className="item-title">Amet consectetur adipisicing elit.</div>
                            <div className="item-body">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam, quam.</div>
                        </div>
                        <img src={pic1} alt="post-img" className="item-picture"/>
                    </div>
                </div>

                <div className="top-contents">
                    <div className="content-item">
                        <div className="item-wrapper">
                            <div className="item-title">Amet consectetur adipisicing elit.</div>
                            <div className="item-body">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam, quam.</div>
                        </div>
                        <img src={pic3} alt="post-img" className="item-picture"/>
                    </div>
                </div>
                <br/>
            </div>
            <br/>
            <br/>
        </div>
    )
}
