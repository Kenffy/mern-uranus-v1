import React from 'react';
import { Badge } from '@material-ui/core';
import { Email, Notifications } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const IconItems = ({handleNotify, messages, notifications}) => {
    return (
        <Container>
            <IconItem to="/messages">
                <Badge badgeContent={messages.length}
                    color="error"
                    max={9}>
                    <MessageIcon />
                </Badge>                        
            </IconItem>

            <NotifyItem onClick={handleNotify}>
                <Badge badgeContent={notifications.length}
                color="error">
                    <NotifyIcon />
                </Badge>                        
            </NotifyItem>
        </Container>
    )
}

export default IconItems;

const Container = styled.div`
display: flex;
align-items: center;
padding: 0px 20px;
@media screen and (max-width: 580px) {
    padding: 0px;
    justify-content: flex-start;
    margin-right: 10px;
    display: none;
}
`;

const IconItem = styled(Link)`
text-decoration: none;
display: flex;
align-items: center;
justify-content: center;
cursor: pointer;
color: #444;
margin-left: 15px;
color: teal;
&:hover{
    opacity: 0.8;
}
@media screen and (max-width: 580px) {
    margin-left: 10px;
}
`;

const NotifyItem = styled.div`
text-decoration: none;
display: flex;
align-items: center;
justify-content: center;
cursor: pointer;
color: #444;
margin-left: 15px;
color: teal;
&:hover{
    opacity: 0.8;
}
@media screen and (max-width: 580px) {
    margin-left: 10px;
}
`;

const MessageIcon = styled(Email)`
height: 25px !important;
width: 25px !important;
@media screen and (max-width: 580px) {
    height: 20px !important;
    width: 20px !important;
}
`;

const NotifyIcon = styled(Notifications)`
height: 25px !important;
width: 25px !important;
@media screen and (max-width: 580px) {
    height: 20px !important;
    width: 20px !important;
}
`;
