import React, { useContext, useEffect, useState } from 'react'; 
import Chats from './Chats';
import MessageBox from './MessageBox';
import styled from 'styled-components';
import { Context } from '../../context/Context';
import * as api from "../../services/apiServices";

const Messenger = () => {

    const {auth, dispatch} = useContext(Context);
    const [onMenu, setOnMenu] = useState(false);

    const [members, setMembers] = useState([]);
    const [chats, setChats] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            dispatch({ type: "ACTION_START"});
            try {
                const user = JSON.parse(localStorage.getItem("user"));
                const res = await api.getUsers('', user.accessToken);
                if(res.data){
                    const users = res.data.filter(u=>u._id !== auth?._id);
                    setMembers(users.sort((a,b)=> a.username.localeCompare(b.username)));
                    dispatch({ type: "ACTION_SUCCESS"});
                }
            } catch (error) {
                console.log(error);
                dispatch({ type: "ACTION_FAILED"});
            }
        };
        fetchUsers();
    }, [dispatch, auth]);

    useEffect(() => {
        const fetchChats = async () => {
            dispatch({ type: "ACTION_START"});
            try {
                const user = JSON.parse(localStorage.getItem("user"));
                const res = await api.getChats(user.id, user.accessToken);
                if(res.data){
                    setChats(res.data);
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
        setCurrentChat(chat);
    };

    return (
        <Container>
            <Wrapper>
                <ChatWrapper menuOn={onMenu}>
                    <Chats
                    chats={chats}
                    members={members}
                    setOnMenu={setOnMenu}
                    handleSetCurrentChat={handleSetCurrentChat}/>
                </ChatWrapper>
                <BoxWrapper menuOn={onMenu}>
                    <MessageBox 
                    friend={currentChat?.friend}
                    setOnMenu={setOnMenu}/>
                </BoxWrapper>
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

export const ChatWrapper = styled.div`
flex: 3;
display: flex;
height: 100%;
@media screen and (max-width: 580px) {
    display: ${props=>props.menuOn? "flex": "none"};
    width: 100%;
}
`;

export const BoxWrapper = styled.div`
flex: 6;
display: flex;
height: 100%;
@media screen and (max-width: 580px) {
    display: ${props=>props.menuOn? "none": "flex"};
    width: 100%;
}
`;
