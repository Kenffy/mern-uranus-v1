import React from 'react';
import "./AddPost.css";
import { Avatar } from "@material-ui/core";
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import YouTubeIcon from '@material-ui/icons/YouTube';

export default function AddPost() {
    return (
        <div className="feed-post-input">
            <div className="post-input">
                <Avatar className="feed-avatar" />
                <button className="post-input-btn">
                    <span>Create a post</span>
                </button>
            </div>
            <div className="post-input-media">
                <div className="input-media-item">
                    <div className="media-item-photo"><PhotoCameraIcon /></div>
                    <div className="media-item-name">Photo</div>
                </div>
                <div className="input-media-item">
                    <div className="media-item-photo"><YouTubeIcon /></div>
                    <div className="media-item-name">Video</div>
                </div>
            </div>
        </div>
    )
}
