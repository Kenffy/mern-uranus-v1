import React from 'react'; 
import { Avatar } from "@material-ui/core";
import { EmojiEmotions, MenuRounded, MoreHoriz, Send } from "@material-ui/icons";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import MessageItem from "./MessageItem";
import Chats from "./Chats";

export default function MessageBox({setOnMenu, friend}) {

    const [mobileChats, setMobileChats] = useState(false);

    const scrollRef = useRef()
    useEffect(() => {
        return scrollRef.current?.scrollIntoView({behavior:"smooth"})
    }, [])

    return (
        <Container>
            <Header>
                <HeaderWrapper>
                    <div onClick={()=>setOnMenu(true)}>
                        <MenuIcon />
                    </div>
                    <div style={{display:"flex", alignItems: "center"}}>
                        <FriendAvatar src={friend?.profile}/>
                        <FriendName>{friend?.username}</FriendName>
                    </div>
                    
                </HeaderWrapper>
                <HeaderOptions>
                    <ChatOption>
                        <ChatButton onClick={() => setMobileChats(!mobileChats)}>
                            Chats
                        </ChatButton>
                        {mobileChats &&
                        <ModalChats>
                            <Chats setMobileChats={setMobileChats}/>
                        </ModalChats>
                        }
                    </ChatOption>
                    <MoreHoriz style={{
                        height:'30px', 
                        width:'30px',
                        color:'teal',
                        cursor:'pointer'}}
                    />
                </HeaderOptions>
                
            </Header>
            <MessagesBox>
                <div ref={scrollRef}>
                    <MessageItem owner={false}/>
                </div>
                <div ref={scrollRef}>
                    <MessageItem owner={true}/>
                </div>
                <div ref={scrollRef}>
                    <MessageItem owner={false}/>
                </div>
                <div ref={scrollRef}>
                    <MessageItem owner={true}/>
                </div>
                <div ref={scrollRef}>
                    <MessageItem owner={false}/>
                </div>
                <div ref={scrollRef}>
                    <MessageItem owner={false}/>
                </div>
                <div ref={scrollRef}>
                    <MessageItem owner={true}/>
                </div>
                <div ref={scrollRef}>
                    <MessageItem owner={false}/>
                </div>
            </MessagesBox>
            <ChatInputWrapper>
                <div>
                    <EmojiIcon />
                </div>
                <ChatInput placeholder="Write a message ..."/>
                <div style={{height: "100%"}}>
                    <SendIcon />
                    <SendButton>Send</SendButton>
                </div>
            </ChatInputWrapper>
        </Container>
    )
};

const Container = styled.div`
border-left: 1px solid rgba(0,0,0,0.1);
width: 100%;
display: flex;
flex-direction: column;
`
const Header = styled.div`
padding: 6px 12px;
display: flex;
justify-content: space-between;
align-items: center;
border-bottom: 1px solid lightgray;
`
const HeaderWrapper = styled.div`
display: flex;
align-items: center;
color: teal;
`;

const FriendAvatar = styled(Avatar)`
height: 35px !important;
width: 35px !important;
`;

const FriendName = styled.span`
margin-left: 10px;
color: #333;
`;

const MenuIcon = styled(MenuRounded)`
height: 30px !important;
width: 30px !important;
margin-right: 10px;
cursor: pointer;
display: none !important;
@media screen and (max-width: 580px) {
    display: flex !important;
}
`;

const HeaderOptions = styled.div`
display: flex;
align-items: center;
`
const ChatOption = styled.div`
position: relative;
display: none;
`
const ChatButton = styled.div`
padding: 5px 10px;
font-size: 12px;
color: teal;
font-weight: bold;
`
const ModalChats = styled.div`
position: absolute;
right: 0px;
top: 30px;
display: none;
box-shadow: 0px 10px 20px rgba(0,0,0,0.2);
z-index: 99;
border-radius: 5px;
`
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
margin: 0 6px;
padding: 10px 5px;
border-top: 1px solid lightgray;
overflow: hidden;
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
font-size: 15px;
color: #555;
resize: none;
background-color: rgba(0,0,0,0.06);
@media screen and (max-width: 580px) {
    font-size: 13px;
}
`;

const SendIcon = styled(Send)`
height: 35px !important;
width: 35px !important;
display: none !important;
color: teal;
cursor: pointer;
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

const SendButton = styled.span`
height: 100%;
width: 100px;
display: flex;
align-items: center;
justify-content: center;
color: white;
background-color: teal;
display: flex !important;
border-radius: 5px;
cursor: pointer;
@media screen and (max-width: 580px) {
    display: none !important;
}
`;
