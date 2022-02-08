import { Avatar, Modal } from '@material-ui/core';
import { Close, EmojiEmotions, Send } from '@material-ui/icons';
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Picker from 'emoji-picker-react';


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

const ReplyComments = ({onReply, handleCloseReply, comment}) => {

    const [onEmoji, setOnEmoji] = useState(false);
    const [reply, setReply] = useState("");
    const comRef = useRef();

    let domReplyRef = useClickOutside(()=>{
        setOnEmoji(false);
    })

  const likeComment = async(id)=>{
    try {
        console.log("comment liked!!!");
        //const creds = JSON.parse(localStorage.getItem("user"));
        //await api.likeComment(id, creds.accessToken);
        //const res = await api.getComment(id, creds.accessToken);
        //setComments((prev)=>[...prev.filter(c=>c._id !== res.data._id), res.data]);
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

const handleReplyComment = () =>{
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
    console.log(com);
    setOnEmoji(false)
    setReply("");
}


  return (
  <Container>
      <Modal open={onReply}
      onClose={handleCloseReply}>
          <Dialog>
            <Header>
                <Title>
                    {comment?.replies.length} {comment?.replies.length > 0? " Replies": " Reply"}
                </Title>
                <CloseIcon onClick={handleCloseReply}/>
            </Header>
            
            <Content>
                <CommentWrapper>
                    <ComAvatar src={comment?.profile}/>
                    <ComInfos>
                        <ComAvatarName>
                            <SingleLink to={`/profile/${comment?.userId}`}>{comment?.username}</SingleLink>
                        </ComAvatarName>
                        <ComBody>{comment?.body}</ComBody>
                        <ComDate>{new Date(comment?.createdAt).toDateString()}</ComDate>
                        <ReplyWrapper>
                            <ComLike onClick={()=>likeComment(comment?._id)}>
                                <ComValue>{comment?.likes.length}</ComValue>
                                {comment?.likes.length > 1 ? "Likes": "Like"}
                            </ComLike>
                            <ComReply onClick={()=>handleReplyComment(comment)}>
                                <ComValue>{comment?.replies.length}</ComValue>
                                {comment?.replies.length > 1 ? "Replies" : "Reply"}
                            </ComReply>
                        </ReplyWrapper>
                    </ComInfos>
                </CommentWrapper>
                <RepliesWrapper>
                    {[1,2,3,4,5,6,7,8,9,10].map((index)=>(

                    <CommentItem key={index}>
                    <ReplyAvatar src={comment?.profile}/>
                    <ComInfos>
                        <ComAvatarName>
                            <SingleLink to={`/profile/${comment?.userId}`}>{comment?.username}</SingleLink>
                        </ComAvatarName>
                        <ReplyBody>{comment?.body}</ReplyBody>
                        <ComDate>{new Date(comment?.createdAt).toDateString()}</ComDate>
                        <ReplyWrapper>
                            <ComLike onClick={()=>likeComment(comment?._id)}>
                                <ComValue>{comment?.likes.length}</ComValue>
                                {comment?.likes.length > 1 ? "Likes": "Like"}
                            </ComLike>
                            {/* <ComReply onClick={()=>handleReplyComment(comment)}>
                                <ComValue>{comment?.replies.length}</ComValue>
                                {comment?.replies.length > 1 ? "Replies" : "Reply"}
                            </ComReply> */}
                        </ReplyWrapper>
                    </ComInfos>
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
                    <ComInput ref={comRef} placeholder="write a comment..."
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
height: 80%;
width: 50%;
@media screen and (max-width: 920px) {
    width: 70%;
}
@media screen and (max-width: 580px) {
    height: 70%;
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
font-weight: 6oo;
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
padding: 10px 0px;
border-bottom: 1px solid rgba(0,0,0,0.1);
`;

const ComAvatar = styled(Avatar)`
height: 50px !important;
width: 50px !important;
cursor: pointer;
`;

const ReplyAvatar = styled(Avatar)`
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

const ReplyBody = styled.span`
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
@media screen and (max-width: 580px) {
    height: 30px !important;
    width: 30px !important;
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

