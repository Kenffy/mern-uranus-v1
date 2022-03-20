import React, { useContext, useEffect, useState } from 'react'; 
import Chats from './Chats';
import MessageBox from './MessageBox';
import styled from 'styled-components';
import { Context } from '../../context/Context';
import * as api from "../../services/apiServices";

const Messenger = () => {

    const {auth, dispatch} = useContext(Context);
    const [onMsgBox, setOnMsgBox] = useState(false);

    const [members, setMembers] = useState([]);
    const [conversations, setConversations] = useState([]);
    const [currConversation, setCurrConversation] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            dispatch({ type: "ACTION_START"});
            try {
                const user = JSON.parse(localStorage.getItem("user"));
                const res = await api.getUsers('', user.accessToken);
                if(res.data){
                    const users = res.data.filter(u=>u._id !== user?.id);
                    setMembers(users.sort((a,b)=> a.username.localeCompare(b.username)));
                    dispatch({ type: "ACTION_SUCCESS"});
                }
            } catch (error) {
                console.log(error);
                dispatch({ type: "ACTION_FAILED"});
            }
        };
        fetchUsers();
    }, [dispatch]);

    useEffect(() => {
        const fetchChats = async () => {
            dispatch({ type: "ACTION_START"});
            try {
                const user = JSON.parse(localStorage.getItem("user"));
                const res = await api.getChats(user.id, user.accessToken);
                if(res.data){
                    setConversations(res.data);
                    const currChatId = JSON.parse(localStorage.getItem("chat"));
                    if(currChatId){
                        const currChat = res.data.find(c=>c.friend._id === currChatId);
                        handleSetCurrentChat(currChat);
                    }
                    
                    dispatch({ type: "ACTION_SUCCESS"});
                }
            } catch (error) {
                console.log(error);
                dispatch({ type: "ACTION_FAILED"});
            }
        };
        fetchChats();
    }, [dispatch]);

    const handleSetCurrentChat = (chat) =>{
        setCurrConversation(chat);
        localStorage.setItem("chat", JSON.stringify(chat.friend?._id ));
        setOnMsgBox(true);
    };

    return (
        <Container>
            <Wrapper>
                <ConversationWrapper msgBoxOn={onMsgBox}>
                    <Chats auth={auth}
                    conversations={conversations}
                    setConversations={setConversations}
                    currConversation={currConversation}
                    members={members}
                    setOnMsgBox={setOnMsgBox}
                    handleSetCurrentChat={handleSetCurrentChat}/>
                </ConversationWrapper>
                <MessageBoxWrapper msgBoxOn={onMsgBox}>
                    <MessageBox 
                    auth={auth}
                    dispatch={dispatch}
                    currConversation={currConversation}
                    setOnMsgBox={setOnMsgBox}/>
                </MessageBoxWrapper>
            </Wrapper>
        </Container>
    )
}

export default Messenger;

export const Container = styled.div`
width: 100%;
height: 100%;
padding-top: 80px;
padding-bottom: 20px;
`;

const Wrapper = styled.div`
height: 100%;
display: flex;
align-items: center;
background-color: white;
border: 2px solid teal;
margin: 0px 20px;
@media screen and (max-width: 580px) {
    margin: 0;
    width: 100%;
}
`;

export const ConversationWrapper = styled.div`
flex: 3;
display: flex;
height: 100%;
@media screen and (max-width: 580px) { 
    display: ${props=>props.msgBoxOn? "none": "flex"};
    width: 100%;
}
`;

export const MessageBoxWrapper = styled.div`
flex: 6;
display: flex;
height: 100%;
@media screen and (max-width: 580px) {
    display: ${props=>props.msgBoxOn? "flex": "none"};
    width: 100%;
}
`;
