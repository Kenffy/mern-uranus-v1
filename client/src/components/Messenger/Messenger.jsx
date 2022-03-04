import React, { useState } from 'react'; 
import Chats from './Chats';
import MessageBox from './MessageBox';
import styled from 'styled-components';

const Messenger = () => {

    const [onMenu, setOnMenu] = useState(false);

    return (
        <Container>
            <Wrapper>
                <ChatWrapper menuOn={onMenu}>
                    <Chats setOnMenu={setOnMenu}/>
                </ChatWrapper>
                <BoxWrapper menuOn={onMenu}>
                    <MessageBox setOnMenu={setOnMenu}/>
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
