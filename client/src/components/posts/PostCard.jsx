import React from 'react';
import { Avatar } from "@material-ui/core"; //ShareRounded
import { Favorite, LockOutlined, PeopleOutlined, VisibilityRounded } from "@material-ui/icons"; //ModeCommentRounded
import PublicIcon from '@material-ui/icons/Public';
import { Link } from "react-router-dom";
import styled from "styled-components";
import ReactHtmlParser from 'react-html-parser';
import MediaPlayer from "../media/MediaPlayer";
import dateFormat from "dateformat";
import AudioPlayer from "../media/AudioPlayer";
import { useContext } from "react";
import { Context } from "../../context/Context";

export default function PostCard({post}) {
    const { user} = useContext(Context);
    const liked = (post?.likes.includes(user.id)) || false;
    const ProfileUrl = process.env.REACT_APP_PROFILES;
    return (
        <PostContainer>
            {
            post?.type === "video-post" &&
            <PlayerWrapper>
                <MediaPlayer url={post?.videos[0]}/>
            </PlayerWrapper>
            }
            {
            post?.type === "image-post" && post?.images.length > 0 ?
            <PostImageWrapper>
                <Link to={`/postswrf4${post._id}wrf4${post.userId}`}>
                    <PostImage src={process.env.REACT_APP_POSTS+post?.images[0]} alt="pic"/>
                </Link>
            </PostImageWrapper>
            :
            <>
            {
            post?.images.length === 0 && post?.type === 'image-post' &&
            <PostImageWrapper isempty={true}></PostImageWrapper>
            }
            </>
            }
            
            {
            post?.type === "audio-post" &&
            <AudioPlayerWrapper>
                <AudioPlayer 
                    audio={post?.audios[0]}/>
            </AudioPlayerWrapper>
            }
            <PostBody>
                <Link to={`/postswrf4${post._id}wrf4${post.userId}`}
                    style={{textDecoration:"none", color:"inherit"}}>
                    <PostTitle>
                        {post.title}
                    </PostTitle>
                </Link>
                {/* <a href={`/postswrf4${post._id}wrf4${post.userId}`}
                style={{textDecoration:"none", color:"inherit"}}>
                <PostTitle>
                        {post.title}
                    </PostTitle>
                </a> */}
                {/* <PostDate>{post.date}.<b style={{margin:"0 5px"}}>{post.category}</b></PostDate> */}
                <PostDate>{dateFormat(new Date(post.createdAt), "mmmm d, yyyy")}.<b style={{margin:"0 5px"}}>{post.category}</b></PostDate>
                <PostDescription>
                    {post?.body.length > 100? ReactHtmlParser(post?.body?.slice(0, 100)+"..."): ReactHtmlParser(post?.body)}
                </PostDescription>
            </PostBody>
            
            <PostFooter>
                <PostOwner>
                    
                    <Link to={`/profile/${post.userId}`}
                    style={{textDecoration:"none", color:"inherit"}}>
                        <AvatarWrapper>
                            <Avatar src={post?.profile.includes("http")? post?.profile : ProfileUrl+post?.profile} 
                            style={{height:"100%", width:"100%"}}/>
                        </AvatarWrapper>
                    </Link>
                    
                    <OwnerInfos>
                        <OwnerName>
                        <Link to={`/profile/${post.userId}`}
                        style={{textDecoration:"none", color:"inherit"}}>
                            {post?.username.length > 15? post.username.slice(0, 15)+"...": post.username}
                        </Link>   
                        </OwnerName>
                        {post?.status === "Public" && <WorldIcon />}
                        {post?.status === "Friends" && <FriendIcon />}
                        {post?.status === "Private" && <PrivateIcon />}
                    </OwnerInfos>
                </PostOwner>
                <FooterActions>
                    <ActionItem>
                        <ActionName>{liked? <LikedIcon />:<LikeIcon />}</ActionName>
                        <ActionValue>{post.likes.length}</ActionValue>
                    </ActionItem>
                    <ActionItem>
                        <ActionName><VueIcon /></ActionName>
                        <ActionValue>{post.vues.length}</ActionValue>
                    </ActionItem>
                    {/* <ActionItem>
                        <ActionName><CommentIcon /></ActionName>
                        <ActionValue>{post.comments.length}</ActionValue>
                    </ActionItem> */}
                    {/* <ActionItem>
                        <ActionName><ShareIcon /></ActionName>
                        <ActionValue>{post.shares.length}</ActionValue>
                    </ActionItem> */}
                </FooterActions>
            </PostFooter>
        </PostContainer>
    )
};

const PostContainer = styled.div`
background-color: white;
border: 1px solid rgba(0,0,0,0.1);
-webkit-box-shadow: 3px 4px 9px -2px rgba(0,0,0,0.64); 
 box-shadow: 3px 4px 9px -2px rgba(0,0,0,0.64);
border-radius: 5px;
display: flex;
flex-direction: column;
justify-content: space-between;
overflow: hidden;
`;

const PostImageWrapper = styled.div`
width: 100%;
height: 250px;
//margin-bottom: 20px;
background-color: ${props=>props?.isempty? 'rgba(0,130,130,0.5)': 'white'};
@media screen and (max-width: 1024px) {
  height: 250px;
}
@media screen and (max-width: 720px) {
  height: 230px;
}
@media screen and (max-width: 580px) {
  height: 220px;
  display: ${props=>props?.isempty? 'none': 'block'};
}
`;

const PlayerWrapper = styled.div`
width: 100%;
height: 250px;
//margin-bottom: 20px;
@media screen and (max-width: 768px) {
    height: 230px;
}
@media screen and (max-width: 580px) {
    height: 220px;
}
`;

const AudioPlayerWrapper = styled.div`
width: 100%;
height: 250px;
//margin-bottom: 20px;
@media screen and (max-width: 1024px) {
  height: 250px;
}
@media screen and (max-width: 720px) {
  height: 230px;
}
@media screen and (max-width: 580px) {
  height: 220px;
}
`;

const PostImage = styled.img`
width: 100%;
height: 100%;
object-fit: cover;
cursor: pointer;
`
const PostBody = styled.div`
width: 100%;
padding: 15px;
cursor: pointer;
@media screen and (max-width: 580px) {
    padding: 10px;
}
`
const PostTitle = styled.h2`
color: #444;
cursor: pointer;
text-align: center;
letter-spacing: 0.6px;
display: -webkit-box;
-webkit-box-orient: vertical;
-webkit-line-clamp: 2;
overflow: hidden;
font-weight: 600;
&:hover{
    opacity: 0.8;
}
@media screen and (max-width: 768px) {
    font-size: 24px;
}
@media screen and (max-width: 580px) {
    font-size: 18px;
}
`;

const PostDate = styled.span`
display: flex;
width: 100%;
font-size: 14px;
text-align: center;
justify-content: center;
color: teal;
margin-top: 10px;
@media screen and (max-width: 768px) {
    font-size: 12px;
}
@media screen and (max-width: 580px) {
    font-size: 11px;
}
`

const PostDescription = styled.div`
margin-top: 15px;
font-weight: 500;
word-spacing: 1px;
letter-spacing: 0.6px;
font-size: 15px;
`
const PostFooter = styled.div`
display: flex;
align-items: center;
padding: 0px 15px;
justify-content: space-between;
border-top: 1px solid rgba(0,0,0,0.1);
height: 70px;
@media screen and (max-width: 580px) {
    padding: 4px 8px;
    height: 50px;
}
`
const PostOwner = styled.div`
display: flex;
align-items: center;
`
const AvatarWrapper = styled.div`
height: 50px;
width: 50px;
display: flex;
align-items: center;
cursor: pointer;
@media screen and (max-width: 768px) {
    height: 40px;
    width: 40px;
}
@media screen and (max-width: 580px) {
    height: 35px;
    width: 35px;
}
`
const OwnerInfos = styled.div`
display: flex;
align-items: center;
justify-content: flex-start;
margin-left: 6px;
`
const OwnerName = styled.span`
color: #333;
font-weight: 600;
cursor: pointer;
display: -webkit-box;
-webkit-box-orient: vertical;
-webkit-line-clamp: 1;
overflow: hidden;
@media screen and (max-width: 580px) {
    font-size: 13px;
}
`
const WorldIcon = styled(PublicIcon)`
display: flex;
justify-content: center;
align-items: center;
height: 16px !important;
width: 16px !important;
color: teal;
margin-left: 8px;
@media screen and (max-width: 580px) {
    height: 14px !important;
    width: 14px !important;
}
`;

const PrivateIcon = styled(LockOutlined)`
display: flex;
justify-content: center;
align-items: center;
height: 16px !important;
width: 16px !important;
color: teal;
margin-left: 8px;
@media screen and (max-width: 580px) {
    height: 14px !important;
    width: 14px !important;
}
`;

const FriendIcon = styled(PeopleOutlined)`
display: flex;
justify-content: center;
align-items: center;
height: 16px !important;
width: 16px !important;
color: teal;
margin-left: 8px;
@media screen and (max-width: 580px) {
    height: 14px !important;
    width: 14px !important;
}
`

const FooterActions = styled.div`
display: flex;
align-items: center;
`
const ActionItem = styled.div`
display: flex;
align-items: center;
padding: 5px;
margin-left: 4px;
@media screen and (max-width: 580px) {
    padding: 0px 5px;
    margin-left: 2px;
}
`
const ActionValue = styled.span`
font-weight: 500;
margin-left: 2px;
color: #444;
@media screen and (max-width: 580px) {
    font-size: 13px;
    //margin-left: 2px;
}
`;

const LikeIcon = styled(Favorite)`
height: 20px !important;
width: 20px !important;
margin: 5px;
padding: 3px;
border-radius: 50%;
color: white;
background-color: teal;
cursor: pointer;
&:hover{
  opacity: 0.8;
  transition: 0.3s ease !important;
}
@media screen and (max-width: 580px) {
    height: 15px !important;
    width: 15px !important;
}
`;

const LikedIcon = styled(Favorite)`
height: 20px !important;
width: 20px !important;
margin: 5px;
padding: 1px;
border-radius: 50%;
border: 2px solid teal;
color: teal;
background-color: white;
cursor: pointer;
&:hover{
  opacity: 0.8;
  transition: 0.3s ease !important;
}
@media screen and (max-width: 580px) {
    height: 15px !important;
    width: 15px !important;
}
`;

const VueIcon = styled(VisibilityRounded)`
height: 20px !important;
width: 20px !important;
margin: 5px;
padding: 3px;
border-radius: 50%;
color: white;
background-color: teal;
cursor: pointer;
&:hover{
  opacity: 0.8;
  transition: 0.3s ease !important;
}
@media screen and (max-width: 580px) {
    height: 15px !important;
    width: 15px !important;
}
`;

// const CommentIcon = styled(ModeCommentRounded)`
// height: 20px !important;
// width: 20px !important;
// margin: 5px;
// padding: 3px;
// border-radius: 50%;
// color: white;
// background-color: teal;
// cursor: pointer;
// &:hover{
//   opacity: 0.8;
//   transition: 0.3s ease !important;
// }
// @media screen and (max-width: 580px) {
//     height: 15px !important;
//     width: 15px !important;
// }
// `;

const ActionName = styled.span`
//color: teal;
font-weight: 600;
margin-top: 4px;
`;
