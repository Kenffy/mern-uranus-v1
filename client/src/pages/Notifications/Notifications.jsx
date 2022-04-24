import React, { useContext } from 'react' 
import styled from 'styled-components';
import Notification from '../../components/Notification/Notification';
import { Context } from '../../context/Context';
import { Container } from '../../globaleStyles';

const Notifications = () => {
    const { notifications } = useContext(Context);

    return (
        <NotifyContainer>
            <Wrapper>
                <NotiWrapper>
                    <NotificationHeader>
                        <NotificationTitle>Your notifications</NotificationTitle>
                    </NotificationHeader>
                    <NotificationItems>
                        {notifications.map((noti, index)=>(
                            <Notification key={index} notify={noti}/>
                        ))}
                        
                    </NotificationItems>
                </NotiWrapper>
            </Wrapper>
        </NotifyContainer>
    )
}

export default Notifications;

const NotifyContainer = styled(Container)`
width: 100vw;
height: 100vh;
padding-top: 80px;
padding-bottom: 20px;
display: flex;
align-items: center;
justify-content: center;
background-color: white;
@media screen and (max-width: 580px) {
    width: 100%;
    padding-left: .5rem;
    padding-right: .5rem;
}
${Container}
`;

const Wrapper = styled.div`
width: 60%;
height: 100%;
display: flex;
align-items: center;
background-color: white;
border: 2px solid teal;
@media screen and (max-width: 580px) {
    width: 100%; 
}
`;

const NotiWrapper = styled.div`
display: flex;
flex-direction: column;
height: 100%;
width: 100%;
`;

const NotificationHeader = styled.div`
display: flex;
align-items: center;
padding: 5px 10px;
border-bottom: 1px solid teal;
`
const NotificationTitle = styled.div`
font-size: 18px;
font-weight: bold;
color: teal;
width: 100%;
padding: 10px;
`;

const NotificationItems = styled.div`
display: flex;
flex-direction: column;
overflow-y: auto;
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