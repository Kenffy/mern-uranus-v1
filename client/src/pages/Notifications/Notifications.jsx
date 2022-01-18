import React from 'react'
import styled from 'styled-components';
import Notification from '../../components/Notification/Notification';
import { Container } from '../../globaleStyles';

const Notifications = () => {
    return (
        <NotifyContainer>
            <NotiWrapper>
                <NotificationHeader>
                    <NotificationTitle>Your notifications</NotificationTitle>
                </NotificationHeader>
                <NotificationItems>
                    <Notification />
                    <Notification />
                    <Notification />
                    <Notification />
                    <Notification />
                    <Notification />
                    <Notification />
                    <Notification />
                    <Notification />
                    <Notification />
                    <Notification />
                    <Notification />
                    <Notification />
                    <Notification />
                </NotificationItems>
            </NotiWrapper>
        </NotifyContainer>
    )
}

export default Notifications;

const NotifyContainer = styled(Container)`
padding: 0px 50px;
display: flex;
background-color: white;
overflow: hidden;
@media screen and (max-width: 580px) {
    flex: 1;
    width: 100%;
    height: 100%;
    padding: 10px;
}
${Container}
`;

const NotiWrapper = styled.div`
display: flex;
flex-direction: column;
margin-top: 80px;
height: 85vh;
width: 100%;
border: 1px solid rgba(0,0,0,0.1);
background-color: white;
border-radius: 10px;
box-shadow: 0px 1px 3px rgba(0,0,0,0.5);
padding-bottom: 50px;
`;

const NotificationHeader = styled.div`
display: flex;
align-items: center;
padding: 10px;
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
`;

