import { Avatar } from '@material-ui/core';
import { Close, EmojiEmotions, Favorite, MoreVertRounded, Send } from '@material-ui/icons';
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from "styled-components";
import { format } from "timeago.js";

let useClickOutside = (handler) =>{
    let domRef = useRef();
    useEffect(()=>{
        let tmpHandler = (event) => {
            if(!domRef.current?.contains(event.target)){
                handler();
            }
        };

        document.addEventListener("mousedown", tmpHandler);

        return () => {
            document.removeEventListener("mousedown", tmpHandler);
        };
    },[handler]);

    return domRef;
}

const ReplyComment = ({
    user,
    comment, 
    edited, 
    onEdited, 
    editBody,
    handleEditBody,
    setEditReply,
    setOnEditReply,
    handleOnEditReply, 
    handleEditReply, 
    likeReply, 
    handleReplyComment}) => {

    let domMenuRef = useClickOutside(()=>{
        setOnMenu(false);
    });

    const [onMenu, setOnMenu] = useState(false);

    const handleEditReplyClick = ()=>{
        handleOnEditReply(comment);
        setOnMenu(false);
    }


    const handleLikeReplyClick = ()=>{
        likeReply(comment._id);
        setOnMenu(false);
    }

    const handleDeleteReplyClick = ()=>{
        setOnMenu(false);
    }

  return (
    (
    <Container>
        <TopWrapper>
            <TopLeft>
                <ComAvatar src={comment?.profile}/>
                <ComInfos>
                    <UserWrapper>
                        <ComAvatarName>
                            <SingleLink to={`/profile/${comment?.userId}`}>{comment?.username}</SingleLink>
                        </ComAvatarName>
                        <TopRight>
                            <MoreIcon onClick={()=>setOnMenu(!onMenu)}/>
                            {onMenu &&
                            <MoreMenu ref={domMenuRef}>
                                <MoreWrapper>
                                    <MoreItem onClick={()=>handleLikeReplyClick()}>
                                        <ComValue>Like</ComValue>
                                    </MoreItem>
                                    {comment?.userId === user.id &&
                                    <>
                                    <MoreItem onClick={()=>handleEditReplyClick()}>
                                        <ComValue>Edit</ComValue>
                                    </MoreItem>
                                    <MoreItem onClick={()=>handleDeleteReplyClick()}>
                                        <ComValue>Delete</ComValue>
                                    </MoreItem>
                                    </>}
                                </MoreWrapper>
                            </MoreMenu>}
                        </TopRight>
                    </UserWrapper>
                    
                    <ComBody>{comment?.body}</ComBody>
                    {(!onEdited || comment?._id!==edited?._id) &&
                    <DateWrapper>
                        <ComDate>{format(comment?.createdAt)}</ComDate>
                        <BottomItem>
                            <IconWrapper onClick={()=>handleLikeReplyClick()}>
                                <LikeIcon />
                            </IconWrapper>
                            <BottomItemValue>{comment?.likes.length || 0}</BottomItemValue>
                        </BottomItem>
                    </DateWrapper>
                    }
                </ComInfos>
            </TopLeft>
        </TopWrapper>
        <BottomWrapper>
            {onEdited && comment?._id===edited?._id &&
            <BottonInfos>
                <InputWrapper>
                    <EditInput autoFocus required placeholder="Edit your comment..."
                    value={editBody}
                    onChange={handleEditBody}/>
                    <EmotIcon onClick={()=>{}}/>
                    <CloseIcon onClick={()=>setOnEditReply(false)}/>
                </InputWrapper>
                <SendIcon onClick={handleEditReply} />
            </BottonInfos>}
        </BottomWrapper>
    </Container>
    )
  )
}

export default ReplyComment;

const Container = styled.div`
display: flex;
flex-direction: column;
width: 100%;
`;

const TopWrapper = styled.div`
display: flex;
height: 100%;
`;

const TopLeft = styled.div`
width: 100%;
display: flex;
`;

const TopRight = styled.div`
width: 40px;
display: flex;
justify-content: flex-end;
position: relative;
`;

const MoreIcon = styled(MoreVertRounded)`
padding: 4px;
cursor: pointer;
`;

const MoreMenu = styled.div`
position: absolute;
top: 0;
right: 10px;
border-radius: 5px;
background-color: white;
overflow: hidden;
-webkit-box-shadow: 3px 4px 9px -2px rgba(0,0,0,0.64); 
 box-shadow: 3px 4px 9px -2px rgba(0,0,0,0.64);
width: 90px;
z-index: 10;
`;

const MoreWrapper = styled.div`
width: 100%;
display: flex;
flex-direction: column;
font-size: 13px;
`;

const MoreItem = styled.div`
padding: 5px 20px;
width: 100%;
font-weight: 500;
display: flex;
align-items: center;
cursor: pointer;
&:hover{
    background-color: rgba(0,0,0,0.1);
}
`;

const ComValue = styled.span`
margin-right: 3px;
`;

const SingleLink = styled(Link)`
text-decoration: none;
color: inherit;
`;

const ComAvatar = styled(Avatar)`
height: 40px !important;
width: 40px !important;
cursor: pointer;
`;

const ComInfos = styled.div`
width: 100%;
margin-left: 10px;
display: flex;
flex-direction: column;
`;

const UserWrapper = styled.div`
display: flex;
justify-content: space-between;
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
font-size: 15px;
@media screen and (max-width: 768px) {
  font-size: 14px;
}
@media screen and (max-width: 580px) {
  font-size: 13px;
}
`;

const ComDate = styled.span`
font-size: 13px;
color: teal;
@media screen and (max-width: 580px) {
    font-size: 12px;
  }
`;


const BottomWrapper = styled.div`
width: 100%;
`;

const BottonInfos = styled.div`
display: flex;
align-items: center;
justify-content: flex-end;
padding: 5px 0px;
margin: 2px;
`;

const DateWrapper = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
padding: 5px 0px;
margin-top: 5px;
`;

const BottomItem = styled.div`
display: flex;
align-items: center;
margin-right: 10px;
`;

const IconWrapper = styled.div`
height: 18px;
width: 18px;
border-radius: 50%;
display: flex;
align-items: center;
justify-content: center;
background-color: teal;
color: white;
cursor: pointer;
&:hover{
    opacity: 0.8;
}
`;

const LikeIcon = styled(Favorite)`
height: 10px !important;
width: 10px !important;
`;

const CloseIcon = styled(Close)`
height: 26px !important;
width: 26px !important;
color: teal;
background-color: white;
cursor: pointer;
padding: 2px !important;
border: 2px solid teal;
border-radius: 50px;
margin: 0px 5px;
&:hover{
    opacity: 0.8;
}
`;

const SendIcon = styled(Send)`
height: 30px !important;
width: 30px !important;
color: teal;
cursor: pointer;
margin: 0px 5px;
&:hover{
    opacity: 0.8;
}
`;

const EmotIcon = styled(EmojiEmotions)`
height: 26px !important;
width: 26px !important;
color: white;
background-color: teal;
cursor: pointer;
border-radius: 50px;
&:hover{
    opacity: 0.8;
}
@media screen and (max-width: 920px) {
  display: none !important;
}
`;

const BottomItemValue = styled.div`
margin-left: 4px;
font-size: 13px;
`;

const InputWrapper = styled.div`
width: 100%;
border: none;
border-radius: 25px;
display: flex;
align-items: center;
padding: 2px;
background-color: rgba(0,0,0,0.05);
`;


const EditInput = styled.input`
width: 100%;
font-size: 13px;
padding: 8px 15px;
outline: none;
border: none;
background-color: transparent;
@media screen and (max-width: 580px) {
    padding: 8px 10px;
    margin: 0px;
    font-size: 13px;
}
`;