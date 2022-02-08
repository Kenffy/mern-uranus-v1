import React from 'react';
import { Avatar } from "@material-ui/core";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Picker from 'emoji-picker-react';
import * as api from "../../services/apiServices";
import { EmojiEmotions } from '@material-ui/icons';
import { useRef } from 'react';
import ReplyComments from './ReplyComments';


let useClickOutside = (handler) =>{
    let domNode = useRef();
    useEffect(()=>{
        let tmpHandler = (event) => {
            if(!domNode.current.contains(event.target)){
                handler();
            }
        };

        document.addEventListener("mousedown", tmpHandler);

        return () => {
            document.removeEventListener("mousedown", tmpHandler);
        };
    },[handler]);

    return domNode;
}


const PostComments = ({user, postId}) => {

    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState("");
    const [reply, setReply] = useState(null);
    const [onEmoji, setOnEmoji] = useState(false);
    const [onReply, setOnReply] = useState(false);
    const comRef = useRef();

    let domNode = useClickOutside(()=>{
        setOnEmoji(false);
    })

    useEffect(()=>{
        const loadComments = async()=>{
            try {
                const creds = JSON.parse(localStorage.getItem("user"));
                const res = await api.getComments(postId, creds.accessToken);
                res.data && setComments(res.data);
            } catch (error) {
                console.log(error);
            }
        }
        loadComments();
    },[postId]);

    const handleComment = async()=>{
        if(!comment) return;
        const com = {
          body: comment,
          userId: user.id,
          postId: postId,
          likes: [],
          replies: []
        }
        try {
            const creds = JSON.parse(localStorage.getItem("user"));
            const res = await api.createComment(com, creds.accessToken);
            setComments((prev)=>[...prev, res.data])
            setComment("");
        } catch (error) {
            console.log(error);
        }
    }

    const likeComment = async(id)=>{
        try {
            const creds = JSON.parse(localStorage.getItem("user"));
            await api.likeComment(id, creds.accessToken);
            const res = await api.getComment(id, creds.accessToken);
            setComments((prev)=>[...prev.filter(c=>c._id !== res.data._id), res.data]);
        } catch (error) {
            console.log(error);
        }
    }

    const onEmojiClick = (event, emojiObj)=>{
        const ref = comRef.current;
        ref.focus();
        const start = comment.substring(0, ref.selectionStart);
        const end = comment.substring(ref.selectionStart);
        const com = start + emojiObj.emoji + end;
        setComment(com);
    }

    const handleCloseReply = ()=>{
        setOnReply(false);
    }

    const handleReplyComment = (com) =>{
        !onReply && setReply(com);
        setOnReply(!onReply)
    }

    return (
        <CommentWrapper>
            <ReplyComments 
            onReply={onReply} 
            handleCloseReply={handleCloseReply}
            comment={reply}/>
            <InputContainer>
                <CommentTitle>Write a comment</CommentTitle>
                <InputWrapper>
                    <CurrAvatar src={user?.profile}/>
                    <BodyWrapper>
                        <ComInput ref={comRef} placeholder="write a comment..."
                        value={comment}
                        onChange={(e)=>setComment(e.target.value)}/>
                        <EmojiWrapper ref={domNode}>
                            <EmojiButton onClick={()=>setOnEmoji(!onEmoji)}/>
                            {onEmoji && 
                            <PickerWrapper>
                                <Picker onEmojiClick={onEmojiClick} />
                            </PickerWrapper>
                            }
                        </EmojiWrapper>
                    </BodyWrapper>
                </InputWrapper>
                <ComButton type="submit" disabled={comment? false: true}
                onClick={handleComment}>Post</ComButton>
            </InputContainer>
            <CommentTitle>{comments.length > 0 ? `${comments.length} Comments`: `${comments.length} Comment`}</CommentTitle>
            {comments.length >= 0 &&
            comments.map((com)=>(
                <Comments key={com._id}>
                <CommentItem>
                    <ComAvatar src={com.profile}/>
                    <ComInfos>
                        <ComAvatarName>
                            <SingleLink to={`/profile/${com.userId}`}>{com.username}</SingleLink>
                        </ComAvatarName>
                        <ComBody>{com.body}</ComBody>
                        <ComDate>{new Date(com?.createdAt).toDateString()}</ComDate>
                        <ReplyWrapper>
                            <ComLike onClick={()=>likeComment(com._id)}>
                                <ComValue>{com?.likes.length}</ComValue>
                                {com?.likes.length > 1 ? "Likes": "Like"}
                            </ComLike>
                            <ComReply onClick={()=>handleReplyComment(com)}>
                                <ComValue>{com?.replies.length}</ComValue>
                                {com?.replies.length > 1 ? "Replies" : "Reply"}
                            </ComReply>
                        </ReplyWrapper>
                    </ComInfos>
                </CommentItem>
            </Comments>
            ))
            }
        </CommentWrapper>
    )
}

export default PostComments;

const CommentWrapper = styled.div`
width: 100%;
display: flex;
flex-direction: column;
color: #444;
`;

const SingleLink = styled(Link)`
text-decoration: none;
color: inherit;
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

const BodyWrapper = styled.div`
width: 90%;
position: relative;
@media screen and (max-width: 580px) {
    font-size: 14px;
    width: 84%;
  }
`;

const ComBody = styled.span`
font-weight: 400;
margin-top: 5px;
font-size: 15px;
@media screen and (max-width: 768px) {
  font-size: 14px;
}
@media screen and (max-width: 580px) {
  font-size: 13px;
}
`;

const EmojiWrapper = styled.div`
position: absolute;
top: 5px;
right: 0;
`;

const EmojiButton = styled(EmojiEmotions)`
color: teal;
position: relative;
cursor: pointer;
height: 35px !important;
width: 35px !important;
@media screen and (max-width: 920px) {
  display: none !important;
}
`;

const PickerWrapper = styled.div`
position: absolute;
top: 30px;
right: 0;
z-index: 10;
`;

const ComDate = styled.span`
width: 100%;
margin-top: 10px;
font-size: 12px;
color: teal;
@media screen and (max-width: 580px) {
    font-size: 11px;
  }
`;

const ReplyWrapper = styled.div`
width: 100%;
display: flex;
align-items: center;
justify-content: flex-end;
padding: 5px 20px;
font-size: 13px;
/* @media screen and (max-width: 580px) {
    font-size: 14px;
  } */
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
margin-right: 3px;
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
width: 100%;
font-size: 14px;
height: 90px;
padding: 10px;
margin-left: 10px;
outline: none;
border: 1px solid rgba(0,0,0,0.3);
border-radius: 3px;
`;

const ComButton = styled.button`
padding: 4px;
align-items: flex-end;
width: 80px;
margin-left: 60px;
margin-bottom: 20px;
font-size: 14px;
font-weight: 500;
border-radius: 3px;
color: teal;
background-color: transparent;
border: 1px solid teal;
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

