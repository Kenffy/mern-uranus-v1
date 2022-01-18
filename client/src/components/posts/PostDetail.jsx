import styled from 'styled-components';
import ImageSlider from '../slider/ImageSlider';
import ReactHtmlParser from 'react-html-parser';
import { Avatar } from '@material-ui/core';
import { Edit, Favorite, 
  FavoriteBorder, 
  ModeCommentOutlined, 
  ShareOutlined, 
  VisibilityOutlined } from '@material-ui/icons';
import MediaPlayer from '../media/MediaPlayer';
import AudioPlayer from "../media/AudioPlayer";
import { Link } from 'react-router-dom';
import PostComments from '../Comments/PostComments';
import UserPosts from './UserPosts';
import { Context } from "../../context/Context";
import { useState, useEffect, useContext } from 'react';
import * as api from "../../services/apiServices";

const PostDetail = ({postId, authorId}) => {

    const { user} = useContext(Context);
    const [author, setAuthor] = useState(null);
    const [post, setPost] = useState(null);
    const [liked, setLiked] = useState(false);

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
          }
        } catch (error) {
          console.log(error)
        }
      }
      loadData();
    },[postId, authorId, user])

    const handleLike = async() => {
      try {
        const creds = JSON.parse(localStorage.getItem("user"));
        if(post !== null){
          await api.likePost(post._id, creds.accessToken);
          const res = await api.getPost(postId, creds.accessToken);
          if(res.data){
            setPost(res.data);
            setLiked(res.data.likes.includes(user.id));
          }
        }
      } catch (error) {
        console.log(error);
      }
    }

    return (
        <Container>
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
                  <AuthorImage src={author?.profile}/>
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
                  <EditWrapper>
                      <EditButton />
                      <EditSpan>Edit</EditSpan>
                  </EditWrapper>
                  }
                </CategoryWrapper>
            </AuthorWrapper>
            <PostBody>
                {ReactHtmlParser(post?.body)}
            </PostBody>

            <PostOptions>
                <OptionItem>
                    {liked? 
                    <LikedIcon onClick={handleLike}/>
                    :
                    <LikeIcon onClick={handleLike}/>
                    }
                    <OptionValue>{post?.likes? post?.likes.length:0}</OptionValue>
                </OptionItem>
                <OptionItem>
                    <VueIcon />
                    <OptionValue>{post?.vues? post?.vues.length:0}</OptionValue>
                </OptionItem>
                <OptionItem>
                    <CommentIcon />
                    <OptionValue>{post?.comments? post?.comments.length:0}</OptionValue>
                </OptionItem>
                <OptionItem>
                    <ShareIcon />
                    <OptionValue>{post?.shares? post?.shares.length:0}</OptionValue>
                </OptionItem>
            </PostOptions>

            <PostComments user={user} postId={postId}/>
            <UserPosts authorId={authorId} postId={postId}/>
        </Container>
    )
}

export default PostDetail;

const Container = styled.div`
display: flex;
flex-direction: column;
margin: 0px 150px;
margin-top: 80px;
@media screen and (max-width: 1024px) {
    margin: 0px 60px;
    margin-top: 80px;
}
@media screen and (max-width: 768px) {
    margin: 0px 40px;
    margin-top: 80px;
}
@media screen and (max-width: 580px) {
    margin: 0px 10px;
    margin-top: 80px;
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
  height: 200px;
}
`;

const ImageWrapper = styled.div`
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
  height: 200px;
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
@media screen and (max-width: 1024px) {
  font-size: 25px;
}
@media screen and (max-width: 768px) {
  font-size: 22px;
}
@media screen and (max-width: 580px) {
  font-size: 18px;
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
@media screen and (max-width: 580px) {
    flex-direction: column;
    align-items: flex-start;
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
height: 14px !important;
width: 14px !important;
`;

const EditSpan = styled.span`
margin-left: 2px;
`;

const SingleLink = styled(Link)`
text-decoration: none;
color: inherit;
`;

const EditWrapper = styled.div`
display: flex;
align-items: center;
border: 1px solid teal;
margin-left: 20px;
padding: 2px 6px;
border-radius: 3px;
font-style: normal;
cursor: pointer;
&:hover{
    color: white;
    background-color: teal;
    transition: all 0.3s ease;
}
`;

const PostBody = styled.div`
width: 100%;
margin-top: 20px;
margin-bottom: 20px;
font-size: 16px;
text-align: left;
word-wrap: break-word;
@media screen and (max-width: 768px) {
  font-size: 16px;
}
@media screen and (max-width: 580px) {
  margin-top: 10px;
  padding: 5px;
}
`;

const PostOptions = styled.div`
padding: 10px 0px;
width: 100%;
display: flex;
align-items: center;
justify-content: flex-end;
color: #444;
border-bottom: 1px solid rgba(0,0,0,0.1);
@media screen and (max-width: 580px) {
    padding: 5px 0px;
  }
`;

const OptionItem = styled.div`
display: flex;
align-items: center;
padding: 5px 10px;
`;

const OptionValue = styled.div`
margin-left: 4px;
font-size: 14px;
`;

const LikeIcon = styled(FavoriteBorder)`
height: 20px !important;
width: 20px !important;
cursor: pointer;
&:hover{
    color: teal;
    font-weight: 600 !important;
    transition: all 0.2s ease !important;
}
`;

const LikedIcon = styled(Favorite)`
height: 20px !important;
width: 20px !important;
color: teal;
cursor: pointer;
&:hover{
    color: #444;
    font-weight: 600 !important;
    transition: all 0.2s ease !important;
}
`;

const VueIcon = styled(VisibilityOutlined)`
height: 20px !important;
width: 20px !important;
cursor: pointer;
&:hover{
    color: teal;
    font-weight: 600 !important;
    transition: all 0.2s ease !important;
}
`;

const CommentIcon = styled(ModeCommentOutlined)`
height: 18px !important;
width: 18px !important;
cursor: pointer;
&:hover{
    color: teal;
    font-weight: 600 !important;
    transition: all 0.2s ease !important;
}
`;

const ShareIcon = styled(ShareOutlined)`
height: 18px !important;
width: 18px !important;
cursor: pointer;
&:hover{
    color: teal;
    font-weight: 600 !important;
    transition: all 0.2s ease !important;
}
`;