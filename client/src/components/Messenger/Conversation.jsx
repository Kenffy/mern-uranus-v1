import React from 'react'; 
import { Avatar } from "@material-ui/core";
import styled from "styled-components";
import { format } from "timeago.js";

export default function Conversation({active, chat, auth, isOnline}) {
    const ProfileUrl = process.env.REACT_APP_PROFILES;
    const lastMessage = chat?.message;
    return (
        <Container active={active}>
            <AvatarWrapper>
                <ChatAvatar src={chat?.friend?.profile.includes("http")? chat?.friend?.profile : ProfileUrl+chat?.friend?.profile}/>
                {isOnline? <AvatarOnline /> : <AvatarOffline />}
            </AvatarWrapper>
            <ConversationInfos>
                <InfoTop>
                    <Username>{chat?.friend?.username}</Username>
                    <LastMessageDate>{format(lastMessage?.createdAt)}</LastMessageDate>
                </InfoTop>
                <InfoBottom>
                    {lastMessage !== null?
                    <LastMessage>{lastMessage?.sender === auth?._id? "You: ":""}{lastMessage?.message.length > 50? lastMessage?.message.slice(0, 50)+"..." : lastMessage?.message}</LastMessage>
                    :
                    <LastMessage><p style={{fontStyle: "italic"}}>Say Hi! to <span>{auth?.username}</span>😀</p></LastMessage>
                    }
                    
                    <Badge>
                        <BadgeContent>9+</BadgeContent>
                    </Badge>
                    
                </InfoBottom>  
            </ConversationInfos>
        </Container>
    )
}

const Container = styled.div`
display: flex;
align-content: center;
padding: 15px;
border-bottom: 1px solid rgba(0,0,0,0.06);
cursor: pointer;
transition: all 0.3s ease;
&:hover{
    background-color: rgba(0,0,0,0.06);
}
background-color: ${(props) => props.active? "rgba(0,0,0,0.06)" : "none"};
//border-left: ${(props) => props.active? "2px solid teal" : "none"};

`

const AvatarWrapper = styled.div`
height: 45px;
min-width: 45px;
border-radius: 50%;
position: relative;
`

const ChatAvatar = styled(Avatar)`
height: 45px !important;
min-width: 45px !important;
`;

const AvatarOnline = styled.div`
position: absolute;
height: 14px;
width: 14px;
border-radius: 50%;
background-color: green;
top: 30px;
right: 0px;
border: 3px solid white;
`

const AvatarOffline = styled.div`
position: absolute;
height: 14px;
width: 14px;
border-radius: 50%;
background-color: lightgray;
top: 30px;
right: 0px;
border: 3px solid white;
`

const ConversationInfos = styled.div`
display: flex;
flex-direction: column;
justify-content: space-around;
width: 100%;
margin-left: 6px;
`

const InfoTop = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
`
const InfoBottom = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
margin-top: 5px;
`
const Badge = styled.div`
display: flex;
align-items: center;
justify-content: center;
height: 20px;
min-width: 20px;
border-radius: 50%;
margin-left: 2px;
margin-right: 10px;
background-color: teal;
color: whitesmoke;
`
const BadgeContent = styled.span`
font-size: 10px;
font-weight: bold;
`
const Username = styled.span`
font-size: 14px;
font-weight: 600;
color: #777;
display: -webkit-box;
-webkit-box-orient: vertical;
-webkit-line-clamp: 1;
overflow: hidden;
`
const LastMessage = styled.span`
font-size: 14px;
font-weight: 400;
color: #555;
margin-top: 3px;
display: -webkit-box;
-webkit-box-orient: vertical;
-webkit-line-clamp: 1;
overflow: hidden;
`
const LastMessageDate = styled.span`
font-size: 12px;
font-weight: 500;
color: teal;
text-align: right;
margin-right: 10px;
`

