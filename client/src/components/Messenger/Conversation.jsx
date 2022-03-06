import React from 'react'; 
import { Avatar } from "@material-ui/core";
import styled from "styled-components";

export default function Conversation({active, chat, user}) {

    return (
        <Container active={active}>
            <AvatarWrapper>
                <ChatAvatar src={chat?.friend?.profile}/>
                <AvatarOnline></AvatarOnline>
            </AvatarWrapper>
            <ConversationInfos>
                <InfoTop>
                    <Username>{chat?.friend?.username}</Username>
                    <LastMessageDate>20. Sept</LastMessageDate>
                </InfoTop>
                <InfoBottom>
                    <LastMessage>Commodi en numquam.</LastMessage>
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
height: 15px;
width: 15px;
border-radius: 50%;
background-color: green;
top: 30px;
right: 0px;
border: 2px solid whitesmoke;
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

