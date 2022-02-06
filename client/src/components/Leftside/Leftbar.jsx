import React from 'react';
import { Avatar } from "@material-ui/core";
import "./Leftbar.css";
import pic5 from "../../assets/images/covers/pic5.jpg";
import { AccountBox, Email, Home, Notifications } from "@material-ui/icons";

export default function Leftbar() {
    return (
        <div className="leftbar">
            <div className="leftbar-profile">
                <img src={pic5} alt="profile cover" className="leftbar-cover"/>
                <div className="leftbar-img">
                    <Avatar className="leftbar-avatar"/>
                </div>
                <div className="leftbar-infos">
                    <div className="leftbar-infos-username">Username</div>
                    <div className="leftbar-infos-desc">I am a comedian</div>
                </div>
                <hr className="leftbar-hr"/>
                <div className="leftbar-dashboard">
                    <div className="dash-item">
                        <div className="dash-item-value">25</div>
                        <div className="dash-item-name">Posts</div>
                    </div>
                    <div className="dash-item">
                        <div className="dash-item-value">552</div>
                        <div className="dash-item-name">Followers</div>
                    </div>
                    <div className="dash-item">
                        <div className="dash-item-value">320</div>
                        <div className="dash-item-name">Following</div>
                    </div>
                </div>
            </div>
        
            <div className="leftbar-shortcuts">
                <div className="shortcuts-title">Shortcuts</div>
                <hr className="leftbar-hr"/>
                <div className="shortcuts-item">
                    <div className="shortcut-icon"><Home/></div>
                    <div className="shortcut-name">Home</div>
                </div>
                <div className="shortcuts-item">
                    <div className="shortcut-icon"><AccountBox/></div>
                    <div className="shortcut-name">Blogs</div>
                </div>
                <div className="shortcuts-item">
                    <div className="shortcut-icon"><Email/></div>
                    <div className="shortcut-name">Messages</div>
                </div>
                <div className="shortcuts-item">
                    <div className="shortcut-icon"><Notifications/></div>
                    <div className="shortcut-name">Notifications</div>
                </div>
            </div>

            <br/>
            <br/>
        </div>
    )
}
