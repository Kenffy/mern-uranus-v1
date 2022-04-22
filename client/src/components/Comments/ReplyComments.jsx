import { Avatar, Modal } from '@material-ui/core';
import { Close, EmojiEmotions, Favorite, FavoriteBorder, Send } from '@material-ui/icons';
import React, { useEffect, useRef, useState } from 'react';
import * as api from "../../services/apiServices";
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Picker from 'emoji-picker-react';
import ReplyComment from './ReplyComment';
import { format } from "timeago.js";


let useClickOutside = (handler) =>{
    let domReplyRef = useRef();
    useEffect(()=>{
        let tmpHandler = (event) => {
            if(!domReplyRef.current?.contains(event.target)){
                handler();
            }
        };

        document.addEventListener("mousedown", tmpHandler);

        return () => {
            document.removeEventListener("mousedown", tmpHandler);
        };
    },[handler]);

    return domReplyRef;
}

const ReplyComments = ({user, 
    onReply, 
    handleCloseReply, 
    comment,
    handleCreateNotifications,
    handleDeleteNotifications
}) => {

    const ProfileUrl = process.env.REACT_APP_PROFILES;
    const liked = comment?.likes.includes(user.id);

    const [onEmoji, setOnEmoji] = useState(false);
    //const [onEditEmoji, setOnEditEmoji] = useState(false);
    const [reply, setReply] = useState("");
    const [editBody, setEditBody] = useState("");
    const [editReply, setEditReply] = useState(null);
    const [onEditReply, setOnEditReply] = useState(false);
    const [replies, setReplies] = useState([]);
    const comRef = useRef();
    //const comEditRef = useRef();

    let domReplyRef = useClickOutside(()=>{
        setOnEmoji(false);
    });

    // let domEditReplyRef = useClickOutside(()=>{
    //     setOnEditEmoji(false);
    // });

    useEffect(()=>{
        const loadReplies = async()=>{
            try {
                const creds = JSON.parse(localStorage.getItem("user"));
                const res = await api.getReplies(comment?._id, creds.accessToken);
                res.data && setReplies(res.data);
            } catch (error) {
                console.log(error);
            }
        }
        loadReplies();
    },[comment]);

  const likeReply = async(id)=>{
    try {
        const creds = JSON.parse(localStorage.getItem("user"));
        await api.likeReply(id, creds.accessToken);
        const res = await api.getReply(id, creds.accessToken);

        if(res.data.likes.includes(user.id)){
            setReplies((prev)=>[...prev.map(r=>r._id === res.data._id? res.data : r)]);
            // reply of comment has been liked
            handleCreateNotifications(res.data.userId, res.data._id, "reply-like");
          }else{
            handleDeleteNotifications(res.data._id, "reply-like");
          }
    } catch (error) {
        console.log(error);
    }
  }

const likeComment = async(id)=>{
    try {
        const creds = JSON.parse(localStorage.getItem("user"));
        await api.likeComment(id, creds.accessToken);
    } catch (error) {
        console.log(error);
    }
}

const onEmojiClick = (event, emojiObj)=>{
    const ref = comRef.current;
    ref.focus();
    const start = reply.substring(0, ref.selectionStart);
    const end = reply.substring(ref.selectionStart);
    const com = start + emojiObj.emoji + end;
    setReply(com);
}

// const onEditEmojiClick = (event, emojiObj)=>{
//     const ref = comEditRef.current;
//     ref.focus();
//     const start = editBody.substring(0, ref.selectionStart);
//     const end = editBody.substring(ref.selectionStart);
//     const com = start + emojiObj.emoji + end;
//     editReply.body = com;
//     setEditReply(editReply);
//     setEditBody(com);
// }

const handleReplyComment = async() =>{
    if(!reply) return;
    const creds = JSON.parse(localStorage.getItem("user"));
    const com = {
        body: reply,
        userId: creds.id,
        postId: comment.postId,
        commentId: comment._id,
        likes: [],
        replies: []
    }
    try {
        const res = await api.createReply(com, creds.accessToken);
        if(res.data){
            setReplies((prev)=>[...prev, res.data]);
            handleCreateNotifications(res.data.userId, res.data._id, "reply-create");
        }
    } catch (error) {
        console.log(error);
    }
    setOnEmoji(false)
    setReply("");
}

const handleOnEditReply = (com)=>{
    setOnEditReply(true);
    setEditBody(com.body);
    setEditReply(com);
}

const handleEditBody = (e)=>{
    setEditBody(e.target.value);
    //editReply.body = e.target.value;
    //setEditReply(editReply);
}

const handleEditReply = async()=>{
    if(editReply === null) return;
    const creds = JSON.parse(localStorage.getItem("user"));
    try {
        editReply.body = editBody;
        console.log(editReply);
        const res = await api.updateReply(editReply._id, editReply, creds.accessToken);
        if(res.data){
            setReplies((prev)=>[...prev.map(r=>r._id === editReply._id? editReply : r)]);
        }
    } catch (error) {
        console.log(error);
    }
    //setOnEditEmoji(false)
    setEditReply(null);
    setEditBody("");
    setOnEditReply(false);
}


  return (
  <Container>
      <Modal open={onReply}
      onClose={handleCloseReply}>
          <Dialog>
            <Header>
                <Title>
                    {comment?.replies.length} {comment?.replies.length > 1? " Replies": " Reply"}
                </Title>
                <CloseIcon onClick={handleCloseReply}/>
            </Header>
            
            <Content>
                <CommentWrapper>
                    <ComAvatar src={comment?.profile.includes("http")? comment?.profile : ProfileUrl+comment?.profile}/>
                    <ComInfos>
                        <ComAvatarName>
                            <SingleLink to={`/profile/${comment?.userId}`}>{comment?.username}</SingleLink>
                        </ComAvatarName>
                        <ComBody>{comment?.body}</ComBody>
                        <DateWrapper>
                            <ComDate>{format(comment?.createdAt)}</ComDate>
                            <BottomItem>
                            {liked? <LikedIcon onClick={()=>likeComment(comment?._id)}/>:<LikeIcon onClick={()=>likeComment(comment?._id)}/>}
                                <BottomItemValue>{comment?.likes.length || 0}</BottomItemValue>
                            </BottomItem>
                        </DateWrapper>
                    </ComInfos>
                </CommentWrapper>
                <RepliesWrapper>
                    
                    {replies.map((reply)=>(

                    <CommentItem key={reply?._id}>
                        <ReplyComment 
                        user={user} 
                        comment={reply}
                        edited={editReply}
                        editBody={editBody}
                        onEdited={onEditReply}
                        likeReply={likeReply}
                        setEditBody={setEditBody}
                        setEditReply={setEditReply}
                        setOnEditReply={setOnEditReply}
                        handleEditBody={handleEditBody}
                        handleEditReply={handleEditReply}
                        handleOnEditReply={handleOnEditReply}
                        handleReplyComment={handleReplyComment}
                        />
                    </CommentItem>
                    ))}
                    
                </RepliesWrapper>
                
                
            </Content>
            <Footer>
                <InputWrapper ref={domReplyRef}>
                    <EmojiWrapper>
                        <EmojiButton onClick={()=>setOnEmoji(!onEmoji)}/>
                        {onEmoji && 
                        <PickerWrapper>
                            <Picker onEmojiClick={onEmojiClick} />
                        </PickerWrapper>
                        }
                    </EmojiWrapper>
                    <ComInput required ref={comRef} placeholder={`Reply to ${comment?.username}...`}
                     value={reply}
                     onChange={(e)=>setReply(e.target.value)}/>
                    <ComButton onClick={handleReplyComment}/>
                </InputWrapper>
            </Footer>
          </Dialog>
      </Modal>
  </Container>
  );
};

export default ReplyComments;

const Container = styled.div`

`;

const Dialog = styled.div`
position: absolute;
background-color: white;
top: 0;left: 0;
bottom: 0;right: 0;
margin: auto;
border-radius: 10px;
display: flex;
flex-direction: column;
justify-content: space-between;
height: 90%;
width: 50%;
@media screen and (max-width: 920px) {
    width: 70%;
}
@media screen and (max-width: 580px) {
    height: 90%;
    width: 90%;
}
`;

const Header = styled.div`
padding: 15px;
display: flex;
align-items: center;
justify-content: space-between;
color: teal;
border-bottom: 1px solid rgba(0,0,0,0.1);
`;

const Title = styled.span`
font-size: 18px;
text-transform: uppercase;
`;

const CloseIcon = styled(Close)`
cursor: pointer;
`;

const Content = styled.div`
height: 100%;
overflow-y: scroll;
::-webkit-scrollbar {
    display: none;
}
`;

const Footer = styled.div`
height: 65px;
display: flex;
align-items: center;
justify-content: center;
`;

const SingleLink = styled(Link)`
text-decoration: none;
color: inherit;
`;

const CommentWrapper = styled.div`
display: flex;
//align-items: center;
justify-content: space-between;
padding: 10px 20px;
border-bottom: 1px solid rgba(0,0,0,0.1);
background-color: rgba(0,0,0,0.05);
`;

const RepliesWrapper = styled.div`
display: flex;
flex-direction: column;
padding: 10px 0px;
padding-left: 40px;
padding-right: 20px;
`;

const CommentItem = styled.div`
display: flex;
width: 100%;
padding-top: 10px;
border-bottom: 1px solid rgba(0,0,0,0.1);
`;

const ComAvatar = styled(Avatar)`
height: 50px !important;
width: 50px !important;
cursor: pointer;
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

const EmojiWrapper = styled.div`
position: relative;
`;

const PickerWrapper = styled.div`
position: absolute;
bottom: 60px;
left: 0;
z-index: 10;
`;

const ComDate = styled.span`
font-size: 13px;
color: teal;
@media screen and (max-width: 580px) {
    font-size: 12px;
  }
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

const BottomItemValue = styled.div`
margin-left: 4px;
font-size: 13px;
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

const InputWrapper = styled.div`
display: flex;
align-items: center;
width: 100%;
border-top: 1px solid rgba(0,0,0,0.5);
padding: 10px;
`;

const ComInput = styled.input`
width: 100%;
font-size: 14px;
padding: 10px 15px;
margin: 0px 10px;
outline: none;
background-color: rgba(0,0,0,0.05);
border: none;
border-radius: 25px;
@media screen and (max-width: 580px) {
    padding: 8px 10px;
}
`;

const EmojiButton = styled(EmojiEmotions)`
color: teal;
cursor: pointer;
height: 35px !important;
width: 35px !important;
@media screen and (max-width: 920px) {
  display: none !important;
}
`;

const ComButton = styled(Send)`
height: 35px !important;
width: 35px !important;
cursor: pointer;
color: teal;
@media screen and (max-width: 580px) {
    height: 30px !important;
    width: 30px !important;
}
`;

