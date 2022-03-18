import React from 'react'; 
import { Avatar } from "@material-ui/core";
import { ArrowBackIosRounded, AttachFileRounded, CameraAltRounded, EmojiEmotions, GraphicEqRounded, ImageRounded, InsertDriveFileRounded, MoreHoriz, Send } from "@material-ui/icons";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import MessageItem from "./MessageItem";
import * as api from "../../services/apiServices";
import {toast} from "react-toastify";

export default function MessageBox({setOnMsgBox, dispatch, auth, currConversation}) {
    const ProfileUrl = process.env.REACT_APP_PROFILES;
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const [onAttach, setOnAttach] = useState(false);
    const friend = currConversation?.friend || null;

    const scrollRef = useRef();

    useEffect(() => {
        return scrollRef.current?.scrollIntoView({behavior:"smooth"})
    }, [messages]);

    useEffect(() => {
        const fetchMessages = async () => {
            dispatch({ type: "ACTION_START"});
            try {
                const user = JSON.parse(localStorage.getItem("user"));
                const res = await api.getMessages(currConversation?._id, user.accessToken);
                if(res.data){
                    setMessages(res.data);
                    dispatch({ type: "ACTION_SUCCESS"});
                }
            } catch (error) {
                console.log(error);
                dispatch({ type: "ACTION_FAILED"});
            }
        };
        fetchMessages();
    }, [dispatch, currConversation]);

    const handleCreateMessage = async()=>{

        if(currConversation){
            const msg = {
                conversationId: currConversation?._id,
                sender: auth?._id,
                receiver: friend?._id,
                message
            }

            try {
                const user = JSON.parse(localStorage.getItem("user"));
                const res = await api.createMessage(msg, user.accessToken);
                if(res.data){
                    setMessages((prev)=>[...prev, res.data])
                }
                setMessage("");
            } catch (error) {
                console.log(error);
            }
        }else{
            setMessage("");
            toast.warning("Oop! Please start a conversation.");
        }
    }

    return (
        <Container>
            <Header>
                {currConversation?
                <div style={{display:"flex", alignItems: "center"}}>
                    <BackIcon onClick={()=>setOnMsgBox(false)}/>
                    <FriendAvatar src={friend?.profile.includes("http")? friend?.profile : ProfileUrl+friend?.profile}/>
                    <FriendName>{friend?.username}</FriendName>
                </div>
                :
                <FriendAvatar /> }
                <MoreIcon />  
            </Header>
            {currConversation?
            <MessagesBox>
                {messages.map((message)=>(
                    <div key={message?._id} ref={scrollRef}>
                        <MessageItem item={message} owner={message?.sender === auth?._id}/>
                    </div>
                ))}
            </MessagesBox>
            :
            <MessagesBox>
                <div style={{padding: "40% 10%"}}>
                    <h2 style={{width: "100%", 
                    color: "#555",
                    textAlign: "center"}}>No messages</h2>
                    <p style={{width: "100%", 
                    color: "#555",
                    textAlign: "center",
                    marginTop: "20px"}}>Select or start a new conversation.</p>
                </div>
            </MessagesBox>
            }
            <ChatInputWrapper>
                <div style={{display: "flex", alignItems: "center"}}>
                    <div style={{position: "relative"}}>
                        <AttachIcon onClick={()=>setOnAttach(!onAttach)}/>
                        {onAttach &&
                        <AttachOptions>
                            <AttachOption onClick={()=>setOnAttach(false)}>
                                <CameraAltRounded fontSize='small' style={{color:'teal'}}/>
                                <AttachName>Camera</AttachName>
                            </AttachOption>
                            <AttachOption onClick={()=>setOnAttach(false)}>
                                <ImageRounded fontSize='small' style={{color:'teal'}}/>
                                <AttachName>Gallery</AttachName>
                            </AttachOption>
                            <AttachOption onClick={()=>setOnAttach(false)}>
                                <GraphicEqRounded fontSize='small' style={{color:'teal'}}/>
                                <AttachName>Audio</AttachName>
                            </AttachOption>
                            <AttachOption onClick={()=>setOnAttach(false)}>
                                <InsertDriveFileRounded fontSize='small' style={{color:'teal'}}/>
                                <AttachName>Document</AttachName>
                            </AttachOption>
                        </AttachOptions>}
                    </div>
                    <EmojiIcon />
                </div>
                <ChatInput value={message} required placeholder="Write a message ..."
                onChange={(e)=>setMessage(e.target.value)}/>
                <div style={{height: "100%"}}>
                    {message? <SendIcon onClick={handleCreateMessage}/>:<DesabledSendIcon/>}
                    <SendButton onClick={handleCreateMessage}
                    canSend={message? true:false}
                    disabled={!message? true:false}>Send</SendButton>
                </div>
            </ChatInputWrapper>
        </Container>
    )
};

const Container = styled.div`
border-left: 1px solid rgba(0,0,0,0.1);
background-color: rgba(0,0,0,0.06);
width: 100%;
display: flex;
flex-direction: column;
`;

const Header = styled.div`
padding: 6px 12px;
display: flex;
justify-content: space-between;
align-items: center;
background-color: white;
border-bottom: 1px solid lightgray;
`;

const FriendAvatar = styled(Avatar)`
height: 35px !important;
width: 35px !important;
`;

const FriendName = styled.span`
margin-left: 10px;
color: #333;
`;

const BackIcon = styled(ArrowBackIosRounded)`
height: 25px !important;
width: 25px !important;
margin-right: 10px;
cursor: pointer;
color: teal;
display: none !important;
@media screen and (max-width: 580px) {
    display: flex !important;
}
`;

const MoreIcon = styled(MoreHoriz)`
height: 30px !important;
width: 30px !important;
margin-right: 10px;
cursor: pointer;
color: teal;
`;

const MessagesBox = styled.div`
height: 100%;
overflow-y: auto;
::-webkit-scrollbar {
    width: 2px;
    border-radius: 10px;
}
::-webkit-scrollbar-track {
    background-color: transparent;
}
::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: teal;
}
`
const ChatInputWrapper = styled.div`
height: 80px;
display: flex;
align-items: center;
padding: 10px 5px;
border-top: 1px solid lightgray;
background-color: white;
@media screen and (max-width: 580px) {
    height: 65px;
    align-items: center;
}
`
const ChatInput = styled.textarea`
width: 100%;
height: 100%;
padding: 10px 20px;
border-radius: 5px;
margin: 2px 6px;
border: none;
outline: none;
font-size: 16px;
color: #555;
resize: none;
background-color: rgba(0,0,0,0.06);
`;

const SendIcon = styled(Send)`
height: 35px !important;
width: 35px !important;
display: none !important;
color: teal;
cursor: pointer;
transition: 0.3s all ease;
@media screen and (max-width: 580px) {
    display: flex !important;
}
`;

const DesabledSendIcon = styled(Send)`
height: 35px !important;
width: 35px !important;
display: none !important;
color: rgba(0,0,0,0.3);
cursor: not-allowed;
transition: 0.3s all ease;
@media screen and (max-width: 580px) {
    display: flex !important;
}
`;

const EmojiIcon = styled(EmojiEmotions)`
height: 40px !important;
width: 40px !important;
color: teal;
cursor: pointer;
@media screen and (max-width: 580px) {
    display: none !important;
}
`;

const AttachIcon = styled(AttachFileRounded)`
height: 36px !important;
width: 36px !important;
color: teal;
cursor: pointer;
margin-right: 10px;
@media screen and (max-width: 580px) {
    height: 30px !important;
    width: 30px !important;
}
`;

const AttachOptions = styled.div`
display: flex;
flex-direction: column;
background-color: white;
border-radius: 10px;
position: absolute;
bottom: 80px;
left: 10px;
min-width: 200px;
box-shadow: 0px 10px 20px rgba(0,0,0,0.4);
z-index: 10;
`;

const AttachOption = styled.div`
display: flex;
align-items: center;
padding: 12px 20px;
gap: 15px;
border-bottom: 1px solid rgba(0,0,0,0.05);
cursor: pointer;
&:hover{
    color: teal;
    font-weight: 500;
}
`;

const AttachName = styled.span`

`;

const SendButton = styled.button`
height: 100%;
width: 100px;
display: flex;
align-items: center;
justify-content: center;
color: white;
background-color: ${props=>props.canSend? "teal": "rgba(0,0,0,0.3)"};
display: flex !important;
border: none;
border-radius: 5px;
font-size: 16px;
cursor: ${props=>props.canSend? "pointer" : "not-allowed"};
transition: 0.3s all ease;
@media screen and (max-width: 580px) {
    display: none !important;
}
`;
