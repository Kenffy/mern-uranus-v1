import { Avatar } from '@material-ui/core';
import { Close, Delete, Edit, Favorite, FavoriteBorder, MoreVertRounded, Reply, Send } from '@material-ui/icons';
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

const Comment = ({
    user,
    comment, 
    edited, 
    onEdited, 
    editBody,
    handleEditBody,
    setOnEdited,
    handleOnEdited, 
    handleEdited, 
    likeComment, 
    handleReplyComment}) => {

    const ProfileUrl = process.env.REACT_APP_PROFILES;
    const liked = comment?.likes.includes(user.id);

    let domMenuRef = useClickOutside(()=>{
        setOnMenu(false);
    });

    const [onMenu, setOnMenu] = useState(false);

    const handleEditClick = ()=>{
        handleOnEdited(comment);
        setOnMenu(false);
    }

    const handleReplyClick = ()=>{
        handleReplyComment(comment);
        setOnMenu(false);
    }

    const handleLikeClick = ()=>{
        likeComment(comment._id);
        setOnMenu(false);
    }

    const handleDeleteClick = ()=>{
        setOnMenu(false);
    }

  return (
    (
    <Container>
        <TopWrapper>
            <TopLeft>
                <ComAvatar src={comment?.profile.includes("http")? comment?.profile : ProfileUrl+comment?.profile}/>
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
                                <MoreItem onClick={()=>handleLikeClick()}>
                                    <MoreIconWrapper>
                                        <MoreLikeIcon />
                                        <ComValue>Like</ComValue>
                                    </MoreIconWrapper>   
                                </MoreItem>
                                <MoreItem onClick={()=>handleReplyClick()}>
                                    <MoreIconWrapper>
                                        <MoreReplyIcon />
                                        <ComValue>Reply</ComValue>
                                    </MoreIconWrapper>
                                </MoreItem>
                                {comment?.userId === user.id &&
                                <>
                                <MoreItem onClick={()=>handleEditClick()}>
                                    <MoreIconWrapper>
                                        <MoreModifyIcon />
                                        <ComValue>Modify</ComValue>
                                    </MoreIconWrapper>
                                </MoreItem>
                                <MoreItem onClick={()=>handleDeleteClick()}>
                                    <MoreIconWrapper>
                                        <MoreDeleteIcon />
                                        <ComValue>Delete</ComValue>
                                    </MoreIconWrapper> 
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
                        <ActionWrapper>
                            <BottomItem onClick={()=>likeComment(comment?._id)}>
                            {liked? <LikedIcon/>:<LikeIcon/>}
                                <BottomItemValue>{comment?.likes.length || 0}</BottomItemValue>
                            </BottomItem>
                            <BottomItem onClick={()=>handleReplyComment(comment)}>
                                <ReplyIcon/>
                                <BottomItemValue>
                                    {comment?.replies.length || 0}
                                </BottomItemValue>
                            </BottomItem>
                        </ActionWrapper>
                    </DateWrapper>}
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
                    {/* <EmotIcon onClick={()=>{}}/> */}
                    <CloseIcon onClick={()=>setOnEdited(false)}/>
                </InputWrapper>
                <SendIcon onClick={handleEdited} />
            </BottonInfos>}
        </BottomWrapper>
    </Container>
    )
  )
}

export default Comment;

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
width: 120px;
z-index: 10;
`;

const MoreWrapper = styled.div`
width: 100%;
display: flex;
flex-direction: column;
font-size: 13px;
`;

const MoreItem = styled.div`
padding: 10px 20px;
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
margin: 0px 10px;
font-size: 16px;
`;

const MoreIconWrapper = styled.div`
display: flex;
align-items: center;
`;

const MoreLikeIcon = styled(Favorite)`
color: teal;
height: 20px !important;
width: 20px !important;
`;

const MoreReplyIcon = styled(Reply)`
color: teal;
height: 20px !important;
width: 20px !important;
`;

const MoreModifyIcon = styled(Edit)`
color: teal;
height: 20px !important;
width: 20px !important;
`;

const MoreDeleteIcon = styled(Delete)`
color: red;
height: 20px !important;
width: 20px !important;
`;

const SingleLink = styled(Link)`
text-decoration: none;
color: inherit;
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

const UserWrapper = styled.div`
display: flex;
justify-content: space-between;
`;

const DateWrapper = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
padding: 5px 0px;
margin-top: 5px;
`;

const ActionWrapper = styled.div`
display: flex;
align-items: center;
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

const BottomItem = styled.div`
display: flex;
align-items: center;
margin-right: 10px;
margin-left: 5px;
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

// const EmotIcon = styled(EmojiEmotions)`
// height: 26px !important;
// width: 26px !important;
// color: white;
// background-color: teal;
// cursor: pointer;
// border-radius: 50px;
// &:hover{
//     opacity: 0.8;
// }
// @media screen and (max-width: 920px) {
//   display: none !important;
// }
// `;

const BottomItemValue = styled.div`
margin-left: 4px;
@media screen and (max-width: 580px) {
    font-size: 14px;
}
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

// const EditTextInput = styled.textarea`
// width: 100%;
// height: auto;
// font-size: 13px;
// padding: 8px 15px;
// outline: none;
// border: none;
// background-color: transparent;
// @media screen and (max-width: 580px) {
//     padding: 8px 10px;
//     margin: 0px;
//     font-size: 13px;
// }
// `;


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


const ReplyIcon = styled(Reply)`
height: 25px !important;
width: 25px !important;
color: teal;
cursor: pointer;
&:hover{
  opacity: 0.8;
  transition: 0.3s ease !important;
}
@media screen and (max-width: 580px) {
    height: 22px !important;
    width: 22px !important;
}
`;