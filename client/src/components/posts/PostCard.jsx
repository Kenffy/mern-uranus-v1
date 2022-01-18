import { Avatar } from "@material-ui/core";
import { Favorite, FavoriteBorder, ModeCommentOutlined, ShareOutlined, VisibilityOutlined } from "@material-ui/icons";
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
    return (
        <PostContainer>
            {
            post?.type === "video-post" &&
            <PlayerWrapper>
                <MediaPlayer url={post?.videos[0]}/>
            </PlayerWrapper>
            }
            {
            post?.type === "image-post" && post?.images.length > 0 &&
            <PostImageWrapper>
                <Link to={`/postswrf4${post._id}wrf4${post.userId}`}>
                    <PostImage src={post?.images[0]} alt="pic"/>
                </Link>
            </PostImageWrapper>
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
                    {ReactHtmlParser(post.body)}
                </PostDescription>
            </PostBody>
            
            <PostFooter>
                <PostOwner>
                    
                    <Link to={`/profile/${post.userId}`}
                    style={{textDecoration:"none", color:"inherit"}}>
                        <AvatarWrapper>
                            <Avatar src={post.profile} style={{height:"100%", width:"100%"}}/>
                        </AvatarWrapper>
                    </Link>
                    
                    <OwnerInfos>
                        <OwnerName>
                        <Link to={`/profile/${post.userId}`}
                        style={{textDecoration:"none", color:"inherit"}}>
                            {post.username}
                        </Link>   
                        </OwnerName>
                        <StatusIcon />
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
                    <ActionItem>
                        <ActionName><CommentIcon /></ActionName>
                        <ActionValue>{post.comments.length}</ActionValue>
                    </ActionItem>
                    <ActionItem>
                        <ActionName><ShareIcon /></ActionName>
                        <ActionValue>{post.shares.length}</ActionValue>
                    </ActionItem>
                </FooterActions>
            </PostFooter>
        </PostContainer>
    )
};

const PostContainer = styled.div`
height: 100%;
width: 100%;
margin: 0px 0px;
background-color: white;
border: 1px solid rgba(0,0,0,0.1);
box-shadow: 0px 1px 1px rgba(0,0,0,0.01);
border-radius: 0px;
display: flex;
flex-direction: column;
margin-bottom: 40px;
overflow: hidden;
@media screen and (max-width: 580px) {
    display: flex;
    justify-content: center;
    width: 100%;
    margin: 15px 5px;
}
`;
const PostImageWrapper = styled.div`
width: 100%;
height: 400px;
margin-bottom: 20px;
@media screen and (max-width: 1024px) {
  height: 400px;
}
@media screen and (max-width: 720px) {
  height: 300px;
}
@media screen and (max-width: 580px) {
  height: 200px;
}
`;

const PlayerWrapper = styled.div`
width: 100%;
height: 400px;
margin-bottom: 20px;
@media screen and (max-width: 768px) {
    height: 350px;
}
@media screen and (max-width: 580px) {
    height: 200px;
}
`;

const AudioPlayerWrapper = styled.div`
width: 100%;
height: 400px;
margin-bottom: 20px;
@media screen and (max-width: 1024px) {
  height: 350px;
}
@media screen and (max-width: 720px) {
  height: 300px;
}
@media screen and (max-width: 580px) {
  height: 160px;
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
text-align: center;
margin-top: 15px;
font-weight: 500;
word-spacing: 1px;
letter-spacing: 0.6px;
display: -webkit-box;
-webkit-box-orient: vertical;
-webkit-line-clamp: 3;
overflow: hidden;
`
const PostFooter = styled.div`
display: flex;
align-items: center;
padding: 5px 15px;
justify-content: space-between;
margin-bottom: 5px;
margin-top: 5px;
border-top: 1px solid rgba(0,0,0,0.05);
@media screen and (max-width: 580px) {
    padding: 4px 8px;
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
//flex-direction: column;
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
const StatusIcon = styled(PublicIcon)`
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
margin-left: 8px;
@media screen and (max-width: 580px) {
    padding: 0px 5px;
    margin-left: 4px;
}
`
const ActionValue = styled.span`
font-weight: 500;
margin-left: 5px;
color: #444;
@media screen and (max-width: 580px) {
    font-size: 12px;
    margin-left: 2px;
}
`;

const LikeIcon = styled(FavoriteBorder)`
height: 20px !important;
width: 20px !important;
&:hover{
    font-weight: 600 !important;
    transition: all 0.2s ease !important;
}
@media screen and (max-width: 580px) {
    height: 15px !important;
    width: 15px !important;
}
`;

const LikedIcon = styled(Favorite)`
height: 20px !important;
width: 20px !important;
color: teal;
&:hover{
    font-weight: 600 !important;
    transition: all 0.2s ease !important;
}
@media screen and (max-width: 580px) {
    height: 15px !important;
    width: 15px !important;
}
`;

// const LikedIcon = styled(Favorite)`
// height: 20px !important;
// width: 20px !important;
// `;

const VueIcon = styled(VisibilityOutlined)`
height: 20px !important;
width: 20px !important;
@media screen and (max-width: 580px) {
    height: 15px !important;
    width: 15px !important;
}
`;

const CommentIcon = styled(ModeCommentOutlined)`
height: 20px !important;
width: 20px !important;
@media screen and (max-width: 580px) {
    height: 15px !important;
    width: 15px !important;
}
`;

const ShareIcon = styled(ShareOutlined)`
height: 20px !important;
width: 20px !important;
@media screen and (max-width: 580px) {
    height: 15px !important;
    width: 15px !important;
}
`;

const ActionName = styled.span`
//color: teal;
font-weight: 600;
margin-top: 4px;
`;
