import React from 'react';
import Chats from './Chats';
import MessageBox from './MessageBox';
import styled from 'styled-components';

const Messenger = () => {
    return (
        <Container>
            <ChatWrapper><Chats /></ChatWrapper>
            <BoxWrapper><MessageBox /></BoxWrapper>
        </Container>
    )
}

export default Messenger;

export const Container = styled.div`
width: 100%;
height: 100%;
display: flex;
align-items: center;
`;

export const ChatWrapper = styled.div`
flex: 3;
display: flex;
height: 100%;
@media screen and (max-width: 580px) {
    display: none;
}
`;

export const BoxWrapper = styled.div`
flex: 6;
display: flex;
height: 100%;
`;
