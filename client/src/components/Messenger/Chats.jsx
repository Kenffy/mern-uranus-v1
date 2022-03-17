 
import React from 'react'; 
import { Avatar } from "@material-ui/core";
import { Add, CloseRounded, Search } from "@material-ui/icons";
import { useState } from "react";
import styled from "styled-components";
import Conversation from "./Conversation";
import * as api from "../../services/apiServices";
//import { useEffect } from 'react';

export default function Chats({auth,
                               setOnMenu, 
                               members, 
                               conversations, 
                               currConversation, 
                               setConversations,
                               handleSetCurrentChat}) {

    const ProfileUrl = process.env.REACT_APP_PROFILES;

    //const [activeChat, setActiveChat] = useState("");
    const [newConversation, setNewConversation] = useState(false);
    
    const handleClick = (conv)=>{
        conv && handleSetCurrentChat(conv);
        setOnMenu(false);
    };

    const handleMenuClose = ()=>{
        setOnMenu(false);
        setNewConversation(false);
    };

    const handleNewConversation = async(member) =>{
        const conv = conversations.find(c=>c.friend?._id === member?._id);
        if(conv){
            handleSetCurrentChat(conv);
        }else{
            try {
                const user = JSON.parse(localStorage.getItem("user"));
                const chat = {members: [user.id, member._id]};
                const res = await api.createChat(chat, user.accessToken);
                if(res.data){
                    setConversations((prev)=>[...prev, res.data]);
                    handleSetCurrentChat(res.data);
                }
            } catch (error) {
                console.log(error);
            }
        }
        setNewConversation(false);
        setOnMenu(false);
    };

    return (
        <Container>
            <Header>
                <UserAvatar src={auth?.profile.includes("http")? auth?.profile : ProfileUrl+auth?.profile}/>
                <HeaderTitle>{newConversation? "New Chat": "Chats"}</HeaderTitle>
                <HeaderWrapper>
                    <div onClick={()=>setNewConversation(!newConversation)}
                     style={{position: "relative"}}>
                        {newConversation? <CloseButton /> : <AddButton />}
                    </div>
                    <div onClick={handleMenuClose}><CloseIcon /></div>
                </HeaderWrapper>
            </Header>
            <SearchWrapper>
                <SearchInput placeholder="Search a chat..."/>
                <div>
                    <SearchIcon />
                </div>
            </SearchWrapper>
            {newConversation?
            <MemberWrapper>
                {members.map((member)=> (
                    <MemberItem key={member?._id}
                    onClick={()=>handleNewConversation(member)}>
                        <MemberAvatar src={member?.profile}/>
                        <MemberName>{member.username}</MemberName>
                    </MemberItem>
                ))}
            </MemberWrapper>
            :
            <Conversations>
                {conversations.map((conv)=>(
                    <ConversationItem key={conv?._id} onClick={()=>handleClick(conv)} >
                        <Conversation chat={conv} user={"abc"} active={currConversation?._id === conv?._id? true:false}/>
                    </ConversationItem>
                ))}
            </Conversations>
            }
        </Container>
    )
};

const Container = styled.div`
margin-bottom: 50px;
width: 100%;
min-width: 300px;
display: flex;
flex-direction: column;
overflow: hidden;
@media screen and (max-width: 580px) {
    min-width: unset;
    width: 100%;
}
`
const Header = styled.div`
padding: 6px 12px;
display: flex;
align-items: center;
justify-content: space-between;
border-bottom: 1px solid lightgray;
`;

const HeaderTitle = styled.span`
color: teal;
text-align: center;
font-weight: 600;
`;

const HeaderWrapper = styled.div`
display: flex;
//align-items: center;
color: teal;
`;

const UserAvatar = styled(Avatar)`
height: 35px !important;
width: 35px !important;
`;

const AddButton = styled(Add)`
height: 30px !important;
width: 30px !important;
cursor: pointer;
`;

const CloseButton = styled(CloseRounded)`
height: 30px !important;
width: 30px !important;
cursor: pointer;
@media screen and (max-width: 580px) {
    display: none !important;
}
`;

const CloseIcon = styled(CloseRounded)`
height: 30px !important;
width: 30px !important;
margin-left: 10px;
cursor: pointer;
display: none !important;
@media screen and (max-width: 580px) {
    display: flex !important;
}
`;

const SearchWrapper = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
padding: 5px;
margin: 10px;
background-color: rgba(0,0,0,0.06);
border-radius: 5px;
`
const SearchInput = styled.input`
width: 100%;
margin: 0 10px;
padding: 5px;
border: none;
outline: none;
color: #444;
font-size: 15px;
background-color: transparent;
`;

const SearchIcon = styled(Search)`
height: 25px !important; 
width: 25px !important;
color:#444;
cursor: pointer;
margin-right: 3px;
`;

const MemberWrapper = styled.div`
display: flex;
flex-direction: column;
align-content: center;
margin-top: 2px;
overflow-y: scroll;
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
const MemberItem = styled.div`
display: flex;
align-items: center;
padding: 15px;
cursor: pointer;
border-bottom: 1px solid rgba(0,0,0,0.06);
transition: all 0.3s ease;
background-color: ${(props) => props.active? "rgba(0,0,0,0.06)" : "none"};
&:hover{
    background-color: rgba(0,0,0,0.06);
}
`;

const MemberAvatar = styled(Avatar)`
height: 45px !important;
min-width: 45px !important;
`;

const MemberName = styled.span`
margin-left: 10px;
`;


const Conversations = styled.div`
display: flex;
flex-direction: column;
align-content: center;
margin-top: 5px;
overflow-y: scroll;
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
const ConversationItem = styled.div`

`;
