import React from 'react';
import styled from 'styled-components';
import ImageSlider from '../slider/ImageSlider';
import ReactHtmlParser from 'react-html-parser';
import { Avatar } from '@material-ui/core';
import { Delete, Edit, Favorite,  
  FavoriteBorder,  
  ModeCommentRounded,
  Reply, 
  VisibilityOutlined, 
  VisibilityRounded} from '@material-ui/icons';
import MediaPlayer from '../media/MediaPlayer';
import AudioPlayer from "../media/AudioPlayer";
import { Link, useHistory } from 'react-router-dom';
import PostComments from '../Comments/PostComments';
import UserPosts from './UserPosts';
import { Context } from "../../context/Context";
import { useState, useEffect, useContext } from 'react';
import * as api from "../../services/apiServices";
import ImagePost from '../../pages/Write/ImagePost';
import VideoPost from '../../pages/Write/VideoPost';
import AudioPost from '../../pages/Write/AudioPost';
import DangerAlert from '../alerts/DangerAlert';
import { toast } from 'react-toastify';

const PostDetail = ({postId, authorId}) => {

    const ProfileUrl = process.env.REACT_APP_PROFILES;

    const history = useHistory();

    const { user, auth, socket} = useContext(Context);
    const [author, setAuthor] = useState(null);
    const [post, setPost] = useState(null);
    const [liked, setLiked] = useState(false);
    const [viewed, setViewed] = useState(false);
    const [onEdit, setOnEdit] = useState(false);
    const [openAlert, setOpenAlert] = useState(false);

    useEffect(()=>{
      const loadData = async()=>{
        try {
          const creds = JSON.parse(localStorage.getItem("user"));
          const res_author = await api.getUser(authorId, creds.accessToken);
          await api.vuePost(postId, creds.accessToken);
          res_author.data && setAuthor(res_author.data);
          const res_post = await api.getPost(postId, creds.accessToken);
          if(res_post.data){
            setPost(res_post.data);
            setLiked(res_post.data.likes.includes(user.id));
            setViewed(true);
          }
        } catch (error) {
          console.log(error)
        }
      }
      loadData();
    },[postId, authorId, user]); 


    const handleCreateNotifications = async(owner, message, link, author, target)=>{
      // Notify user
      const creds = JSON.parse(localStorage.getItem("user"));
      let notifications = [];
      let friends = auth.followers;
      if(!friends.includes(owner)){
        friends.push(owner)
      }
      for(const friend of friends){
        const noti = {
          sender: auth?._id,
          receiver: friend,
          message: message,
          authorId: author,
          link,
          target,
          username: auth?.username,
          profile: auth?.profile,
        }

        notifications.push(noti)
      }
      
      if(notifications.length > 0){
        const res_noti = await api.createNotification(notifications, creds.accessToken);
        if(res_noti.status === 200){
          socket.emit("sendNotifications", res_noti.data);
        }
      }
    }

    const handleDeleteNotifications = async(link, target)=>{
      // Post has been disliked
      const creds = JSON.parse(localStorage.getItem("user"));
      const filter = {
        sender: user.id,
        target,
        link
      }
      const res_dis = await api.deleteNotifications(filter, creds.accessToken);
      if(res_dis.status === 200){
        console.log("notification cancelled !!!");
      }
    }

    const handleLike = async() => {
      try {
        const creds = JSON.parse(localStorage.getItem("user"));
        if(post !== null){
          await api.likePost(post._id, creds.accessToken);
          const res = await api.getPost(postId, creds.accessToken);
          if(res.data){
            setPost(res.data);
            setLiked(res.data.likes.includes(user.id));
            if(res.data.likes.includes(user.id)){
              // Post has been liked
              let message = "";
              if(res.data.userId === user.id){
                message = `liked his own post`;
              }else{
                message = `liked ${res.data.username}'s post`;
              }
              
              handleCreateNotifications(post.userId, message, post._id, post.userId, "post-like");
            }else{
              handleDeleteNotifications(post._id, "post-like");
            }
          }
        }
      } catch (error) {
        console.log(error);
      }
    }

    const handleDeleteAlert = async() => {
      const creds = JSON.parse(localStorage.getItem("user"));
      try {
        const res = await api.deletePost(post._id, creds.accessToken);
        if(res.data){
          setOpenAlert(false);
          toast.success(res.data);
          history.goBack();
        }
        
      } catch (error) {
        setOpenAlert(false);
        toast.error("Oop!!! Something went wrong");
      }
    };

    const handleOpenAlert = () => {
        setOpenAlert(true);
    };
    
    const handleCloseAlert = () => {
        setOpenAlert(false);
    };

    const handleShare = ()=>{
      if(navigator.share){
        navigator.share({
          title: 'Uranus Blog Share',
          text: post?.title,
          url: process.env.REACT_APP_API+`/postswrf4${postId}wrf4${authorId}`
        }).then(()=>{
          console.log("Thanks for sharing!");
          toast.success("Thanks for sharing!");
        }).catch((error)=>{
          console.log(error);
          toast.error("Oop!!! Something went wrong!");
        });
      }else{
        navigator.clipboard.writeText(process.env.REACT_APP_API+`/postswrf4${postId}wrf4${authorId}`);
        toast.info("Link copied to clibboard");
      }
    }

    return (
        <>
          {onEdit?
          <div>
            {post?.type === "image-post" && 
            <ImagePost post={post} setOnEdit={setOnEdit}/>
            }
            {post?.type === "video-post" && 
            <VideoPost post={post} setOnEdit={setOnEdit}/>
            }
            {post?.type === "audio-post" && 
            <AudioPost post={post} setOnEdit={setOnEdit}/>
            }
          </div>
          :
          <Container>
            <div>
            <DangerAlert 
            openAlert={openAlert}
            handleDeleteAlert={handleDeleteAlert}
            handleCloseAlert={handleCloseAlert}/>
            </div>

            {post?.type === "image-post" && post?.images.length > 0 &&
            <ImageWrapper>
              <ImageSlider images={post?.images || []}/>
            </ImageWrapper>
            }
            {post?.type === "video-post" &&
            <VideoWrapper>
              <MediaPlayer url={post?.videos[0]}/>
            </VideoWrapper>
            }
            {post?.type === "audio-post" &&
            <PlayerWrapper>
              <AudioPlayer
               audio={post?.audios[0]}/>
            </PlayerWrapper>
            }
            <PostTitle>{post?.title}</PostTitle>
            <AuthorWrapper>
                <InfoWrapper>
                  <AuthorImage src={author?.profile.includes("http")? author?.profile : ProfileUrl+author?.profile}/>
                  <PostAuthor>
                      <SingleLink to={`/profile/${post?.userId}`}>
                          <b>{author?.username}</b>,
                      </SingleLink>
                  </PostAuthor>
                  <PostDate>{new Date(post?.createdAt).toDateString()},</PostDate>
                </InfoWrapper>
                <CategoryWrapper>
                  <Category><b>{post?.category}</b></Category>
                  {post?.userId === authorId && post?.userId === user?.id &&
                  <ActionWrapper>
                    <EditWrapper onClick={()=>setOnEdit(true)}>
                      <EditButton />
                      <ActionSpan>Edit</ActionSpan>
                    </EditWrapper>
                    <DeleteWrapper onClick={handleOpenAlert}>
                      <DeleteButton />
                      <ActionSpan>Delete</ActionSpan>
                    </DeleteWrapper>
                  </ActionWrapper>
                  }
                </CategoryWrapper>
            </AuthorWrapper>
            <PostBody>
                {ReactHtmlParser(post?.body)}
            </PostBody>

            <TagsWrapper>
              {post?.tags.map((tag, index)=>(
                <TagItem key={index}>#{tag}</TagItem>
              ))}
            </TagsWrapper>

            <PostOptions>
                <OptionItem onClick={()=>handleLike()}>
                    {liked? <LikedIcon/>:<LikeIcon/>}
                    <OptionValue>{post?.likes? post?.likes.length:0}</OptionValue>
                </OptionItem>
                <OptionItem>
                    {viewed? <VueFilledIcon /> : <VueIcon />}
                    <OptionValue>{post?.vues? post?.vues.length:0}</OptionValue>
                </OptionItem>
                <OptionItem>
                    <CommentIcon />
                    <OptionValue>{post?.comments? post?.comments.length:0}</OptionValue>
                </OptionItem>
                <OptionItem onClick={()=>handleShare()}>
                    <ShareIcon />
                    {/* <OptionValue>{post?.shares? post?.shares.length:0}</OptionValue> */}
                </OptionItem>
            </PostOptions>

            <PostComments user={user} authorId={authorId}
            currUser={auth} postId={postId} socket={socket}
            handleCreateNotifications={handleCreateNotifications}
            handleDeleteNotifications={handleDeleteNotifications}/>
            <UserPosts authorId={authorId} postId={postId}/>
            </Container>}
        </>
    )
}

export default PostDetail;

const Container = styled.div`
display: flex;
flex-direction: column;
margin-top: 60px;
@media screen and (max-width: 1024px) {

}
@media screen and (max-width: 768px) {

}
@media screen and (max-width: 580px) {

}
`;

const PlayerWrapper = styled.div`
width: 100%;
height: 600px;
margin-bottom: 20px;
@media screen and (max-width: 1024px) {
  height: 400px;
}
@media screen and (max-width: 720px) {
  height: 300px;
}
@media screen and (max-width: 580px) {
  height: 220px;
}
`;

const ImageWrapper = styled.div`
width: 100%;
height: 700px;
margin-bottom: 20px;
@media screen and (max-width: 1024px) {
  height: 400px;
}
@media screen and (max-width: 720px) {
  height: 300px;
}
@media screen and (max-width: 580px) {
  height: 220px;
}
`;

const VideoWrapper = styled.div`
width: 100%;
height: 600px;
margin-bottom: 20px;
@media screen and (max-width: 1024px) {
  height: 450px;
}
@media screen and (max-width: 720px) {
  height: 350px;
}
@media screen and (max-width: 580px) {
  height: 250px;
}
`;

const PostTitle = styled.h1`
margin-top: 20px;
padding: 0px 2rem;
@media screen and (max-width: 1024px) {
  font-size: 25px;
}
@media screen and (max-width: 768px) {
  font-size: 22px;
}
@media screen and (max-width: 580px) {
  font-size: 18px;
  padding: 0 .8rem;
}
`;

const AuthorWrapper = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
color: teal;
margin-top: 20px;
font-size: 13px;
font-style: italic;
width: 100%;
padding: 0 2rem;
@media screen and (max-width: 580px) {
    flex-direction: column;
    align-items: flex-start;
    padding: 0 .8rem;
}
`;

const InfoWrapper = styled.div`
display: flex;
justify-content: flex-start;
align-items: center;
width: 100%;
`;

const CategoryWrapper = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
width: 100%;
@media screen and (max-width: 580px) {
    padding: 10px 0px;
}
`;

const AuthorImage = styled(Avatar)`
margin-right: 6px;
`;

const PostAuthor = styled.span`
margin-right: 10px;
cursor: pointer;
`;

const PostDate = styled.span`
font-weight: 400;
`;

const Category = styled.span`
margin-left: 10px;
font-weight: 600;
`;

const EditButton = styled(Edit)`
height: 15px !important;
width: 15px !important;
`;

const DeleteButton = styled(Delete)`
height: 15px !important;
width: 15px !important;
`;

const ActionSpan = styled.span`
margin-left: 2px;
`;

const SingleLink = styled(Link)`
text-decoration: none;
color: inherit;
`;

const ActionWrapper = styled.div`
display: flex;
align-items: center;
`;

const EditWrapper = styled.div`
display: flex;
align-items: center;
border: 1px solid teal;
margin-left: 20px;
padding: 5px 6px;
border-radius: 3px;
font-style: normal;
cursor: pointer;
&:hover{
    color: white;
    background-color: teal;
    transition: all 0.3s ease;
}
`;

const DeleteWrapper = styled.div`
display: flex;
align-items: center;
border: 1px solid red;
margin-left: 10px;
padding: 5px 6px;
border-radius: 3px;
font-style: normal;
color: red;
cursor: pointer;
&:hover{
    color: white;
    background-color: red;
    transition: all 0.3s ease;
}
`;


const PostBody = styled.div`
width: 100%;
margin-top: 20px;
margin-bottom: 20px;
font-size: 16px;
font-weight: 500;
word-spacing: 1px;
word-wrap: break-word;
letter-spacing: 0.6px;
padding: 0 2rem;
@media screen and (max-width: 768px) {
  font-size: 16px;
}
@media screen and (max-width: 580px) {
  margin-top: 10px;
  padding: 5px;
  font-size: 15px;
  padding: 0 .8rem;
}
`;

const TagsWrapper = styled.div`
width: 100%;
margin-top: 20px;
margin-bottom: 20px;
display: flex;
flex-wrap: wrap;
gap: .8rem;
padding: 0 2rem;
@media screen and (max-width: 580px) {
  margin-top: 10px;
  padding: 5px;
  font-size: 15px;
  padding: 0 .8rem;
}
`;

const TagItem = styled.span`
color: teal;
font-weight: 500;
cursor: pointer;
&:hover{
  font-weight: 600;
  transition: .3s all;
}
`;

const PostOptions = styled.div`
width: 100%;
display: flex;
align-items: center;
justify-content: flex-end;
color: #444;
padding: 1rem 2rem;
border-bottom: 1px solid rgba(0,0,0,0.1);
gap: 1.5rem;
@media screen and (max-width: 580px) {
  gap: 1rem;
  padding: .5rem 1rem;
}
`;

const OptionItem = styled.div`
display: flex;
align-items: center;
gap: 5px;
`;

const OptionValue = styled.span`
@media screen and (max-width: 580px) {
    font-size: 14px;
}
`;

const LikeIcon = styled(FavoriteBorder)`
height: 20px !important;
width: 20px !important;
color: teal;
cursor: pointer;
&:hover{
  opacity: 0.8;
  transition: 0.3s ease !important;
}
@media screen and (max-width: 580px) {
    height: 18px !important;
    width: 18px !important;
}
`;

const LikedIcon = styled(Favorite)`
height: 20px !important;
width: 20px !important;
color: teal;
cursor: pointer;
&:hover{
  opacity: 0.8;
  transition: 0.3s ease !important;
}
@media screen and (max-width: 580px) {
    height: 18px !important;
    width: 18px !important;
}
`;

const VueIcon = styled(VisibilityOutlined)`
height: 22px !important;
width: 22px !important;
color: teal;
cursor: pointer;
&:hover{
  opacity: 0.8;
  transition: 0.3s ease !important;
}
@media screen and (max-width: 580px) {
    height: 18px !important;
    width: 18px !important;
}
`;

const VueFilledIcon = styled(VisibilityRounded)`
height: 22px !important;
width: 22px !important;
color: teal;
cursor: pointer;
&:hover{
  opacity: 0.8;
  transition: 0.3s ease !important;
}
@media screen and (max-width: 580px) {
    height: 18px !important;
    width: 18px !important;
}
`;

const CommentIcon = styled(ModeCommentRounded)`
height: 20px !important;
width: 20px !important;
color: teal;
cursor: pointer;
&:hover{
  opacity: 0.8;
  transition: 0.3s ease !important;
}
@media screen and (max-width: 580px) {
    height: 18px !important;
    width: 18px !important;
}
`;

const ShareIcon = styled(Reply)`
height: 25px !important;
width: 25px !important;
transform: rotateY(180deg);
color: teal;
cursor: pointer;
&:hover{
  opacity: 0.8;
  transition: 0.3s ease !important;
}
@media screen and (max-width: 580px) {
    height: 20px !important;
    width: 20px !important;
}
`;