import React from 'react';
import { Avatar } from "@material-ui/core";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Picker from 'emoji-picker-react';
import * as api from "../../services/apiServices";
import { EmojiEmotions } from '@material-ui/icons';
import { useRef } from 'react';
import ReplyComments from './ReplyComments';
import Comment from './Comment';


let useClickOutside = (handler) =>{
    let domNode = useRef();
    useEffect(()=>{
        let tmpHandler = (event) => {
            if(!domNode.current?.contains(event.target)){
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


const PostComments = ({user,post,
    location, 
    currUser, postId, authorId,
    handleCreateNotifications,
    handleDeleteNotifications}) => {

    const ProfileUrl = process.env.REACT_APP_PROFILES;

    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState("");
    const [reply, setReply] = useState(null);
    const [onEmoji, setOnEmoji] = useState(false);
    const [onReply, setOnReply] = useState(false);
    const [editBody, setEditBody] = useState("");
    const [edited, setEdited] = useState(null);
    const [onEdited, setOnEdited] = useState(false);
    const comRef = useRef();
    //const comEditRef = useRef();

    let domNode = useClickOutside(()=>{
        setOnEmoji(false);
    });

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
            if(res.data){
                setComments((prev)=>[...prev, res.data])
                setComment("");
                // Notify user
                let message = "";
                if(res.data.userId === user.id && post?.userId === user.id){
                    message = `add a comment to his own post.`;
                }else{
                    message = `commented ${post?.username}'s post.`;
                }
                handleCreateNotifications(res.data.userId, message, location, authorId, "comment-create");
            }
            
        } catch (error) {
            console.log(error);
        }
    }

    const likeComment = async(id)=>{
        try {
            const creds = JSON.parse(localStorage.getItem("user"));
            await api.likeComment(id, creds.accessToken);
            const res = await api.getComment(id, creds.accessToken);

            if(res.data){
                if(res.data.likes.includes(user.id)){
                // Comment has been liked
                let message = "";
                if(res.data.userId === user.id){
                    message = `liked his own comment`;
                }else{
                    message = `liked ${post?.username}'s comment`;
                }
                    handleCreateNotifications(res.data.userId, message, location, authorId, "comment-like");
                }else{
                    handleDeleteNotifications(location, "comment-like");
                }
                setComments((prev)=>[...prev.map(c=>c._id === res.data._id? res.data : c)]);
            } 
            
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

    // const onEditEmojiClick = (event, emojiObj)=>{
    //     const ref = comEditRef.current;
    //     ref.focus();
    //     const start = editBody.substring(0, ref.selectionStart);
    //     const end = editBody.substring(ref.selectionStart);
    //     const com = start + emojiObj.emoji + end;
    //     edited.body = com;
    //     setEdited(edited);
    //     setEditBody(com);
    // }

    const handleOnEdited = (com)=>{
        setOnEdited(true);
        setEditBody(com.body);
        setEdited(com);
    }

    const handleEditBody = (e)=>{
        setEditBody(e.target.value);
        setEdited(edited);
    }

    const handleEdited = async()=>{
        if(edited === null) return;
        const creds = JSON.parse(localStorage.getItem("user"));
        try {
            console.log(edited);
            edited.body = editBody;
            const res = await api.updateComment(edited._id, edited, creds.accessToken);
            if(res.data){
                setComments((prev)=>[...prev.map(c=>c._id === edited._id? edited : c)]);
            }
        } catch (error) {
            console.log(error);
        }
        //setOnEditEmoji(false);
        setEdited(null);
        setEditBody("");
        setOnEdited(false);
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
            location={location}
            user={user}
            authorId={authorId}
            onReply={onReply} 
            handleCloseReply={handleCloseReply}
            comment={reply}
            handleCreateNotifications={handleCreateNotifications}
            handleDeleteNotifications={handleDeleteNotifications}/>
            <InputContainer>
                <CommentTitle>Write a comment</CommentTitle>
                <InputWrapper>
                    <CurrAvatar src={currUser?.profile.includes("http")? currUser?.profile : ProfileUrl+currUser?.profile}/>
                    <BodyWrapper>
                        <div style={{display: "flex", flexDirection: "column", marginLeft: "15px", widht: "100%"}}>
                        <ComInput ref={comRef} placeholder="write a comment..."
                            value={comment}
                            onChange={(e)=>setComment(e.target.value)}/>
                            <div style={{display: "flex", justifyContent: "flex-end"}}>
                            <ComButton 
                                type="submit" 
                                disabled={comment? false: true}
                                onClick={handleComment}>
                                Post
                            </ComButton>
                            </div>
                        </div>
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
            </InputContainer>
            <CommentTitle>{comments.length > 0 ? `${comments.length} Comments`: `${comments.length} Comment`}</CommentTitle>
            {comments.length >= 0 &&
            comments.map((com)=>(
            <Comments key={com._id}>
                <CommentItem>
                <Comment 
                    user={user}
                    editBody={editBody}
                    handleEditBody={handleEditBody}
                    edited={edited}
                    onEdited={onEdited}
                    handleOnEdited={handleOnEdited}
                    setOnEdited={setOnEdited}
                    handleEdited={handleEdited}
                    comment={com}
                    likeComment={likeComment}
                    handleReplyComment={handleReplyComment}/>
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
padding: 0 2rem;
@media screen and (max-width: 580px){
    padding: 0 .8rem;
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
margin-top: 20px;
width: 100%;
`;

const CommentItem = styled.div`
display: flex;
width: 100%;
border-top: 1px solid rgba(0,0,0,0.1);
padding-top: 10px;
`;

const BodyWrapper = styled.div`
width: 90%;
position: relative;
@media screen and (max-width: 580px) {
    font-size: 14px;
    width: 84%;
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
height: 30px !important;
width: 30px !important;
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

const InputContainer = styled.div`
margin-top: 30px;
margin-bottom: 20px;
display: flex;
flex-direction: column;
width: 100%;
//border-bottom: 1px solid rgba(0,0,0,0.1);
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
margin-top: 15px;
//border-top: 1px solid rgba(0,0,0,0.1);
padding: 10px 0px;
color: #444;
`;

const ComInput = styled.textarea`
width: 100%;
font-size: 14px;
height: 90px;
padding: 10px;
//margin-left: 10px;
outline: none;
border: 1px solid rgba(0,0,0,0.3);
border-radius: 3px;
`;

const ComButton = styled.button`
padding: 6px;
width: 90px;
font-size: 15px;
border-radius: 3px;
margin-top: 15px;
color: teal;
background-color: white;
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