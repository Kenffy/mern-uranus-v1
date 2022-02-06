import React from 'react';
import { Badge } from '@material-ui/core';
import { Email, Notifications } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const IconItems = () => {
    return (
        <Container>
            <IconItem to="/messages">
                <Badge badgeContent={5}
                    color="error"
                    max={9}>
                    <MessageIcon />
                </Badge>                        
            </IconItem>

            <IconItem to="/notifications">
                <Badge badgeContent={4}
                color="error">
                    <NotifyIcon />
                </Badge>                        
            </IconItem>
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
