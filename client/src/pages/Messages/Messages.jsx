import React from 'react'
import styled from 'styled-components';
import Messenger from '../../components/Messenger/Messenger';
import { Container } from '../../globaleStyles';

const Messages = () => {
    return (
        <MsgContainer>
            <Wrapper>
                <Messenger />
            </Wrapper>
        </MsgContainer>
    )
}

export default Messages;

const MsgContainer = styled(Container)`
padding: 0px 50px;
display: flex;
background-color: white;
@media screen and (max-width: 580px) {
    flex: 1;
    width: 100%;
    height: 100%;
    padding: 10px;
}
${Container}
`;

const Wrapper = styled.div`
margin-top: 80px;
height: 85vh;
width: 100%;
z-index: 100;
border: 1px solid rgba(0,0,0,0.1);
background-color: white;
border-radius: 10px;
box-shadow: 0px 1px 3px rgba(0,0,0,0.5);
`;
