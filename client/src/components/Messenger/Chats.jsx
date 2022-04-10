 
import React, { useEffect } from 'react'; 
import { Avatar } from "@material-ui/core";
import { Add, CloseRounded, Search } from "@material-ui/icons";
import { useState } from "react";
import styled from "styled-components";
import Conversation from "./Conversation";
import * as api from "../../services/apiServices";
//import { useEffect } from 'react';

export default function Chats({auth,
                               onlineUsers,
                               setOnMsgBox, 
                               members,
                               conversations, 
                               currConversation, 
                               setConversations,
                               searchConversation,
                               handleSetCurrentChat}) {

    const ProfileUrl = process.env.REACT_APP_PROFILES;
    const [newConversation, setNewConversation] = useState(false);
    const [filteredConversations, setFilteredConversations] = useState([]);

    useEffect(()=>{
        setFilteredConversations(conversations);
    },[conversations]);
    
    const handleClick = (conv)=>{
        conv && handleSetCurrentChat(conv);
    };

    const handleMenuClose = ()=>{
        setOnMsgBox(false);
        setNewConversation(false);
    };

    const handleSearchConversation = (e)=>{
        const toSearch = e.target.value;
        if(toSearch){
            setFilteredConversations(conversations
                .filter(c=>c.friend.username
                .toLowerCase()
                .includes(toSearch)));
        }else{
            setFilteredConversations(conversations);
        }
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
    };

    return (
        <Container>
            <Header>
                <UserAvatar src={auth?.profile.includes("http")? auth?.profile : ProfileUrl+auth?.profile}/>
                <HeaderTitle>{newConversation? "New Chat": "Chats"}</HeaderTitle>
                {!newConversation?
                <AddButton onClick={()=>setNewConversation(!newConversation)}/>
                :
                <CloseIcon onClick={handleMenuClose}/>
                }
            </Header>
            <SearchWrapper>
                <SearchInput
                onChange={newConversation? searchConversation : handleSearchConversation} 
                placeholder="Search a chat..."/>
                <div><SearchIcon /></div>
            </SearchWrapper>
            {newConversation?
            <MemberWrapper>
                {members.map((member)=> (
                    <MemberItem key={member?._id}
                    onClick={()=>handleNewConversation(member)}>
                        <MemberAvatar src={member?.profile.includes("http")? member?.profile : ProfileUrl+member?.profile}/>
                        <MemberName>{member.username}</MemberName>
                    </MemberItem>
                ))}
            </MemberWrapper>
            :
            <Conversations>
                {filteredConversations.map((conv)=>(
                    <ConversationItem key={conv?._id} onClick={()=>handleClick(conv)} >
                        <Conversation 
                        chat={conv} 
                        auth={auth}
                        isOnline={onlineUsers.find(u=>u?._id === conv?.friend._id)} 
                        active={currConversation?._id === conv?._id? true:false}/>
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
padding: 0px 12px;
min-height: 50px !important;
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

const UserAvatar = styled(Avatar)`
height: 35px !important;
width: 35px !important;
`;

const AddButton = styled(Add)`
height: 30px !important;
width: 30px !important;
cursor: pointer;
color: teal;
`;


const CloseIcon = styled(CloseRounded)`
height: 30px !important;
width: 30px !important;
cursor: pointer;
color: teal;
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

// const CleanIcon = styled(CloseRounded)`
// height: 25px !important; 
// width: 25px !important;
// color:#444;
// cursor: pointer;
// margin-right: 3px;
// `;

const MemberWrapper = styled.div`
display: flex;
flex-direction: column;
margin-top: 2px;
overflow-y: scroll;
//height: 80%;
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
margin-top: 5px;
overflow-y: scroll;
//height: 80%;
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
`;

const ConversationItem = styled.div`

`;
