import React from 'react';
import { Avatar } from "@material-ui/core";
import { Add, Search } from "@material-ui/icons";
import { useState } from "react";
import styled from "styled-components";
import Conversation from "./Conversation";

export default function Chats() {

    const [activeConv, setActiveConv] = useState(0);
    const handleClick = (id)=>{
        setActiveConv(id);
    }

    return (
        <Container>
            <Header>
                <AvatarWrapper>
                    <Avatar style={{height:'100%', width:'100%'}}/>
                </AvatarWrapper>
                <Button>
                    <Add style={{
                        height:'100%', 
                        width:'100%',}}
                    />
                </Button>
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
                <ConversationItem onClick={()=>handleClick(0)} >
                    <Conversation active={activeConv === 0? true:false}/>
                </ConversationItem>
                <ConversationItem onClick={()=>handleClick(1)}>
                    <Conversation active={activeConv === 1? true:false}/>                           
                </ConversationItem>

                <ConversationItem onClick={()=>handleClick(0)} >
                    <Conversation active={activeConv === 0? true:false}/>
                </ConversationItem>
                <ConversationItem onClick={()=>handleClick(1)}>
                    <Conversation active={activeConv === 1? true:false}/>                           
                </ConversationItem>

                <ConversationItem onClick={()=>handleClick(0)} >
                    <Conversation active={activeConv === 0? true:false}/>
                </ConversationItem>
                <ConversationItem onClick={()=>handleClick(1)}>
                    <Conversation active={activeConv === 1? true:false}/>                           
                </ConversationItem>

                <ConversationItem onClick={()=>handleClick(0)} >
                    <Conversation active={activeConv === 0? true:false}/>
                </ConversationItem>
                <ConversationItem onClick={()=>handleClick(1)}>
                    <Conversation active={activeConv === 1? true:false}/>                           
                </ConversationItem>
                <ConversationItem onClick={()=>handleClick(0)} >
                    <Conversation active={activeConv === 0? true:false}/>
                </ConversationItem>
                <ConversationItem onClick={()=>handleClick(1)}>
                    <Conversation active={activeConv === 1? true:false}/>                           
                </ConversationItem>
            </Conversations>
        </Container>
    )
};

const Container = styled.div`
margin-bottom: 50px;
width: 100%;
display: flex;
flex-direction: column;
overflow: hidden;
`
const Header = styled.div`
padding: 6px 12px;
display: flex;
justify-content: space-between;
align-items: center;
border-bottom: 1px solid lightgray;
`
const AvatarWrapper = styled.div`
height: 30px;
width: 30px;
`
const Button = styled.div`
height: 30px;
width: 30px;
color: teal;
cursor: pointer;
`
const SearchWrapper = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
padding: 5px;
margin: 10px 20px;
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
