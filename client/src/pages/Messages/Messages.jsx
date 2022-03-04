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
width: 100vw;
height: 100vh;
display: flex;
align-items: center;
justify-content: center;
background-color: white;
${Container}
`;

const Wrapper = styled.div`
width: 100%;
height: 100%;
`;

