 
import React from 'react'; 
import { Avatar } from "@material-ui/core";
import { Add, CloseRounded, Search } from "@material-ui/icons";
import { useState } from "react";
import styled from "styled-components";
import Conversation from "./Conversation";
import { SeedConversations as Communications } from './SeedConversations';

export default function Chats({setOnMenu}) {

    const [activeConv, setActiveConv] = useState(Communications[0].id || null);
    const handleClick = (id)=>{
        setActiveConv(id);
        setOnMenu(false);
    }

    return (
        <Container>
            <Header>
                <UserAvatar />
                <HeaderWrapper>
                    <AddButton />
                    <div onClick={()=>setOnMenu(false)}><CloseIcon /></div>
                </HeaderWrapper>
            </Header>
            <SearchWrapper>
                <SearchInput placeholder="Search a chat..."/>
                <SearchIcon>
                    <Search style={{
                    height:'100%', 
                    width:'100%',}}/>
                </SearchIcon>
            </SearchWrapper>
            <Conversations>
                {Communications.map((conv)=>(
                    <ConversationItem key={conv?.id} onClick={()=>handleClick(conv.id)} >
                        <Conversation chat={conv} user={"abc"} active={activeConv === conv?.id? true:false}/>
                    </ConversationItem>
                ))}
            </Conversations>
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
justify-content: space-between;
align-items: center;
border-bottom: 1px solid lightgray;
`
const HeaderWrapper = styled.div`
display: flex;
align-items: center;
color: teal;
`;

const UserAvatar = styled(Avatar)`
height: 30px !important;
width: 30px !important;
`;

const AddButton = styled(Add)`
height: 30px !important;
width: 30px !important;
cursor: pointer;
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
background-color: rgba(0,0,0,0.1);
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
`
const SearchIcon = styled.div`
height: 20px; 
width: 20px;
color:#444;
cursor: pointer;
margin-right: 3px;
`
const Conversations = styled.div`
display: flex;
flex-direction: column;
align-content: center;
margin-top: 5px;
overflow-y: scroll;
::-webkit-scrollbar {
    width: 5px;
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

`
