import { Avatar } from '@material-ui/core';
import { 
    Favorite, 
    FavoriteBorder, 
    ModeCommentOutlined, 
    ShareOutlined,
    VisibilityOutlined
} from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import ReactHtmlParser from 'react-html-parser';
import Blog from '../../components/blogs/Blog';
import ImageViewer from '../../components/media/ImageViewer';
import PostItem from '../../components/posts/PostItem';
import ImageSlider from '../../components/slider/ImageSlider';
import { Container } from '../../globaleStyles';
import { like, updatePost } from '../../redux/actions/postActions';
import MediaPlayer from '../../components/media/MediaPlayer';
import { Context } from '../../context/Context';
import { useContext } from 'react';
import * as api from "../../services/apiServices";
import { loadSingleData } from '../../context/Action';



const Single = () => {
    
    const location = useLocation();
    const path = location.pathname.split("wrf4");
    const postId = path[1];
    const authId = path[2];

    const { user, dispatch, single } = useContext(Context);
    const [viewer, setViewer] = useState(false);
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState(single.comments);
    const [currUser, setCurrUser] = useState(single.user);
    const [Author, setAuthor] = useState(single.author);
    const [authorPosts, setAuthorPosts] = useState(single.posts);
    const [currPost, setCurrPost] = useState(single.post);

    console.log("single: "+ JSON.stringify(single))

    useEffect(() => {
      const getSingleData = async () => {
        const singleParams = {
          userId: user.id,
          authorId: authId,
          postId: postId
        };
        console.log(singleParams);
        await loadSingleData(dispatch, singleParams, user.accessToken);
      }
      getSingleData();
    }, [dispatch, authId, postId, user]);

    // useEffect(() => {
    //   const getUsers = async () => {
    //     if(authId === user.id){
    //       const usr = await api.getUser(user.id, user.accessToken);
    //       usr.data && setCurrUser(usr.data)
    //       usr.data && setAuthor(usr.data)
    //     }else{
    //       const usr = await api.getUser(user.id, user.accessToken);
    //       usr.data && setCurrUser(usr.data)
    //       const auth = await api.getUser(authId, user.accessToken);
    //       auth.data && setAuthor(auth.data)
    //     }
    //   }
    //   getUsers();
    // }, [authId, user]);

    // useEffect(() => {
    //   const getUserPosts = async () => {
    //     const res = await api.getPosts(`user=${authId}`, user.accessToken);
    //     if(res.data.length > 0){
    //       setCurrPost(res.data.find(p=>p._id===postId));
    //       setAuthorPosts(res.data);
    //     }
    //   };
    //   getUserPosts();
    // }, [authId, postId, user]);

    // useEffect(() => {
    //   const loadComments = async () => {
    //     const res = await api.getComments(postId, user.accessToken);
    //     if(res.data.length > 0){
    //       setComments(res.data)
    //     }
    //   }
    //   loadComments();
    // }, [postId, user]);

    //const liked = (currPost?.likes.includes(currUser?._id)) || false;
    let liked = false;
    // current user watch the post
    if(currPost && !currPost?.vues.includes(user.id)){
      currPost.vues.push(user.id);
      updatePost(dispatch, currPost, user);
      liked = (currPost?.likes.includes(currUser?._id)) || false;
    }

    const handleLike = () => {
        if(liked){
          currPost.likes = currPost.likes.filter(u=>u !== currUser._id);
        }else{
          currPost.likes.push(currUser._id);
        }
        like(dispatch, currPost, user);
    }

    const handleComment = async()=>{
      if(!comment) return;
      const com = {
        body: comment,
        userId: user.id,
        postId: currPost._id,
        likes: [],
        replies: []
      }
      try {
        await api.createComment(com, user.accessToken);
        const res = await api.getComments(postId, user.accessToken);
        if(res.data.length > 0){
          setComments(res.data)
        }
      } 
      catch (err) {
        console.log(err)
      }
      setComment("");
    }

    return (
        <SingleContainer>
            {currPost?.images &&
            <>
            <MediaWrapper>
                <ImageSlider images={currPost?.images || []}/>
            </MediaWrapper>
            <ImageViewer images={currPost?.images} open={viewer} setViewer={setViewer}/>
            </>
            }
            
            <Wrapper>
                <BodyWraper>
                    <PostInfos>
                        <PostTitle>{currPost?.title}</PostTitle>
                        <Category>{currPost?.Category}</Category>
                        <AuthorWrapper>
                            <PostAuthor>
                                <SingleLink to={`/profile/${Author?._id}`}>
                                    <b>{Author?.username}</b>,
                                </SingleLink>
                            </PostAuthor>
                            <PostDate>{new Date(currPost?.createdAt).toDateString()}</PostDate>
                        </AuthorWrapper>
                        <PostBody>
                            {ReactHtmlParser(currPost?.body)}
                        </PostBody>
                        
                        {currPost?.videos.length > 0 &&
                        <PlayerWrapper>
                          <MediaPlayer url={currPost?.videos[0]}/>
                        </PlayerWrapper>
                        }
                        <PostOptions>
                            <OptionItem>
                                {liked? 
                                <LikedIcon onClick={handleLike}/>
                                :
                                <LikeIcon onClick={handleLike}/>
                                }
                                <OptionValue>{currPost?.likes.length}</OptionValue>
                            </OptionItem>
                            <OptionItem>
                                <VueIcon />
                                <OptionValue>{currPost?.vues.length}</OptionValue>
                            </OptionItem>
                            <OptionItem>
                                <CommentIcon />
                                <OptionValue>{currPost?.comments.length}</OptionValue>
                            </OptionItem>
                            <OptionItem>
                                <ShareIcon />
                                <OptionValue>{currPost?.shares.length}</OptionValue>
                            </OptionItem>
                        </PostOptions>
                        <CommentWrapper>
                            <InputContainer>
                                <CommentTitle>Write a comment</CommentTitle>
                                <InputWrapper>
                                    <CurrAvatar src={currUser?.profile}/>
                                    <ComInput placeholder="write a comment..."
                                    value={comment}
                                    onChange={(e)=>setComment(e.target.value)}/>
                                </InputWrapper>
                                <ComButton type="submit" disabled={comment? false: true}
                                onClick={handleComment}>Post</ComButton>
                            </InputContainer>
                            <CommentTitle>{comments.length > 0 ? "Comments": "Comment"}</CommentTitle>
                            {comments.length >= 0 &&
                            comments.map((comment)=>(
                              <Comments key={comment._id}>
                                <CommentItem>
                                    <ComAvatar src={comment.profile}/>
                                    <ComInfos>
                                        <ComAvatarName>
                                            <SingleLink to={`/profile/${comment.userId}`}>{comment.username}</SingleLink>
                                        </ComAvatarName>
                                        <ComBody>{comment.body}</ComBody>
                                        <ComDate>{new Date(comment?.createdAt).toDateString()}</ComDate>
                                        <ReplyWrapper>
                                            <ComLike><ComValue>{comment?.likes.length}</ComValue>Like</ComLike>
                                            <ComReply><ComValue>{comment?.replies.length}</ComValue>Reply</ComReply>
                                        </ReplyWrapper>
                                    </ComInfos>
                                </CommentItem>
                            </Comments>
                            ))
                            }
                        </CommentWrapper>
                        {authorPosts.length > 0 &&
                        <Articles>
                            <ArticleTitle>Other Articles</ArticleTitle>
                            <ArticleWrapper>
                              {authorPosts.map((item)=>(
                                <PostItem key={item._id} post={item}/>
                              ))}
                            </ArticleWrapper>
                        </Articles>}
                    </PostInfos>
                    <AuthorCard>
                      <Blog post={currPost} user={Author}/>
                    </AuthorCard>
                  </BodyWraper>
            </Wrapper>
        </SingleContainer>
    )
}

export default Single;

const SingleContainer = styled(Container)`
display: flex;
flex-direction: column;
background-color: white;
min-height: 100vh;
${Container}
`;


const MediaWrapper = styled.div`
margin-top: 60px;
width: 100%;
height: 700px;
display: flex;
cursor: pointer;
@media screen and (max-width: 1024px) {
    padding: 0;
    height: 500px;
}
@media screen and (max-width: 768px) {
    padding: 0;
    height: 400px;
}
@media screen and (max-width: 580px) {
    height: 260px;
}
`;

const Wrapper = styled.div`
margin-top: 100px;
display: flex;
@media screen and (max-width: 580px) {
    flex-direction: column;
    margin-top: 80px;
}
`;

const PostInfos = styled.div`
width: 100%;
padding: 0px 50px;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
color: #444;
@media screen and (max-width: 768px) {
  padding: 0px 30px;
}
@media screen and (max-width: 580px) {
  padding: 0px 10px;
}
`;

const AuthorWrapper = styled.div`
display: flex;
align-items: center;
margin-top: 0px;
color: teal;
@media screen and (max-width: 768px) {
  //margin-top: 10px;
  font-size: 14px;
}
@media screen and (max-width: 580px) {
  //margin-top: 10px;
  font-size: 13px;
}
`;

const BodyWraper = styled.div`
display: flex;
@media screen and (max-width: 768px) {
  flex-direction: column;
}
`;

const AuthorCard = styled.div`
padding: 0px 20px;
@media screen and (max-width: 768px) {
  padding: 0px 10px;
}
@media screen and (max-width: 580px) {
  display: none;
}
`;

const Category = styled.h3`
font-weight: 600;
margin-top: 10px;
`;

const PostDate = styled.h3`
font-weight: 600;
`;

const PostAuthor = styled.h3`
font-weight: 600;
margin-right: 10px;
cursor: pointer;
`;

const PostTitle = styled.h1`
text-align: center;
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

const PlayerWrapper = styled.div`
width: 100%;
margin: 20px 0px;
`;

const PostOptions = styled.div`
padding: 20px 0px;
width: 100%;
display: flex;
align-items: center;
justify-content: flex-end;
color: #444;
border-top: 1px solid rgba(0,0,0,0.1);
border-bottom: 1px solid rgba(0,0,0,0.1);
@media screen and (max-width: 580px) {
    padding: 10px 0px;
  }
`;

const OptionItem = styled.div`
display: flex;
align-items: center;
padding: 5px 20px;
@media screen and (max-width: 580px) {
    padding: 5px 10px;
  }
`;

const OptionValue = styled.div`
margin-left: 10px;
font-size: 16px;
@media screen and (max-width: 580px) {
    margin-left: 5px;
    font-size: 14px;
  }
`;

const LikeIcon = styled(FavoriteBorder)`
height: 25px !important;
width: 25px !important;
cursor: pointer;
&:hover{
    color: teal;
    font-weight: 600 !important;
    transition: all 0.2s ease !important;
}
@media screen and (max-width: 580px) {
    height: 20px !important;
    width: 20px !important;
  }
`;

const LikedIcon = styled(Favorite)`
height: 25px !important;
width: 25px !important;
color: teal;
cursor: pointer;
&:hover{
    color: #444;
    font-weight: 600 !important;
    transition: all 0.2s ease !important;
}
@media screen and (max-width: 580px) {
    height: 20px !important;
    width: 20px !important;
  }
`;

const VueIcon = styled(VisibilityOutlined)`
height: 25px !important;
width: 25px !important;
cursor: pointer;
&:hover{
    color: teal;
    font-weight: 600 !important;
    transition: all 0.2s ease !important;
}
@media screen and (max-width: 580px) {
    height: 20px !important;
    width: 20px !important;
  }
`;

const CommentIcon = styled(ModeCommentOutlined)`
height: 25px !important;
width: 25px !important;
cursor: pointer;
&:hover{
    color: teal;
    font-weight: 600 !important;
    transition: all 0.2s ease !important;
}
@media screen and (max-width: 580px) {
    height: 20px !important;
    width: 20px !important;
  }
`;

const ShareIcon = styled(ShareOutlined)`
height: 25px !important;
width: 25px !important;
cursor: pointer;
&:hover{
    color: teal;
    font-weight: 600 !important;
    transition: all 0.2s ease !important;
}
@media screen and (max-width: 580px) {
    height: 20px !important;
    width: 20px !important;
  }
`;

const CommentWrapper = styled.div`
width: 100%;
display: flex;
flex-direction: column;
color: #444;
margin-top: 50px;
@media screen and (max-width: 580px) {
    margin-top: 20px;
  }
`;

const CommentTitle = styled.h3`
@media screen and (max-width: 580px) {
    font-size: 15px;
    font-weight: 600;
  }
`;

const Comments = styled.div`
display: flex;
flex-direction: column;
margin-top: 10px;
width: 100%;
`;

const CommentItem = styled.div`
display: flex;
width: 100%;
border-top: 1px solid rgba(0,0,0,0.1);
//border-bottom: 1px solid rgba(0,0,0,0.1);
padding: 10px 0px;
`;

const ComAvatar = styled(Avatar)`
height: 45px !important;
width: 45px !important;
cursor: pointer;
@media screen and (max-width: 580px) {
    height: 35px !important;
    width: 35px !important;
  }
`;

const ComInfos = styled.div`
width: 100%;
margin-left: 10px;
display: flex;
flex-direction: column;
`;

const ComAvatarName = styled.span`
font-size: 18px;
font-weight: 600;
cursor: pointer;
@media screen and (max-width: 768px) {
  font-size: 16px;
}
@media screen and (max-width: 580px) {
  font-size: 15px;
}
`;

const ComBody = styled.span`
font-weight: 400;
margin-top: 5px;
@media screen and (max-width: 768px) {
  font-size: 15px;
}
@media screen and (max-width: 580px) {
  font-size: 14px;
}
`;

const ComDate = styled.span`
width: 100%;
margin-top: 10px;
font-size: 14px;
@media screen and (max-width: 580px) {
    font-size: 12px;
  }
`;

const ReplyWrapper = styled.div`
width: 100%;
display: flex;
align-items: center;
justify-content: flex-end;
padding: 5px 20px;
@media screen and (max-width: 580px) {
    font-size: 14px;
  }
`;

const ComLike = styled.div`
font-weight: 500;
display: flex;
align-items: center;
cursor: pointer;
&:hover{
    color: teal;
}
`;

const ComReply = styled.div`
font-weight: 500;
margin-left: 20px;
display: flex;
align-items: center;
cursor: pointer;
&:hover{
    color: teal;
}
`;

const ComValue = styled.span`
margin-right: 5px
`;


const SingleLink = styled(Link)`
text-decoration: none;
color: inherit;
`;

const InputContainer = styled.div`
margin-top: 30px;
margin-bottom: 20px;
display: flex;
flex-direction: column;
width: 100%;
border-bottom: 1px solid rgba(0,0,0,0.1);
`;

const CurrAvatar = styled(Avatar)`
height: 50px !important;
width: 50px !important;
@media screen and (max-width: 580px) {
    height: 35px !important;
    width: 35px !important;
  }
`;

const InputWrapper = styled.div`
display: flex;
width: 100%;
margin-top: 10px;
border-top: 1px solid rgba(0,0,0,0.1);
padding: 10px 0px;
color: #444;
`;

const ComInput = styled.textarea`
width: 90%;
font-size: 16px;
height: 100px;
padding: 10px 20px;
margin-left: 10px;
outline: none;
border: 1px solid rgba(0,0,0,0.3);
@media screen and (max-width: 580px) {
    font-size: 14px;
    width: 84%;
  }
`;

const ComButton = styled.button`
padding: 5px;
align-items: flex-end;
width: 100px;
margin-left: 60px;
margin-bottom: 20px;
font-size: 16px;
font-weight: 600;
border-radius: 5px;
color: teal;
background-color: transparent;
border: 2px solid teal;
cursor: pointer;
&:hover{
    background-color: teal;
    color: white
}
@media screen and (max-width: 580px) {
    font-size: 14px;
    margin-left: 45px;
  }
`;

const Articles = styled.div`
display: flex;
flex-direction: column;
`;

const ArticleTitle = styled.h3`
padding: 15px 0px;
@media screen and (max-width: 580px) {
    font-size: 15px;
    font-weight: 600;
  }
`;

const ArticleWrapper = styled.div`
display: grid;
height: auto;
grid-template-columns: 1fr 1fr 1fr;
gap: 10px;
margin-bottom: 40px;
@media screen and (max-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
@media screen and (max-width: 580px) {
    grid-template-columns: 1fr;
  }
`;
