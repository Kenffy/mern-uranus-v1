import React from 'react'; 
import { Avatar } from "@material-ui/core"
import styled from "styled-components"

export default function Notification() {
    return (
        <NotificationWrapper>
            <NotiAvatar />
            <NotificationInfos>
                <InfoTop>
                    <Username>Marius Kenfack</Username>
                    <NotificationDate>2 days ago</NotificationDate>
                </InfoTop>
                <InfoBottom>
                    <NotificationMessage>Commodi en numquam.</NotificationMessage>
                </InfoBottom>  
            </NotificationInfos>
        </NotificationWrapper>
    )
}

const NotificationWrapper = styled.div`
display: flex;
align-items: center;
padding: 20px 10px;
background-color: white;
border-bottom: 1px solid rgba(0,0,0,0.1);
cursor: pointer;
&:hover{
    background-color: rgba(0,0,0,0.08);
    transition: all 0.3s ease;
}
@media screen and (max-width: 580px) {
    padding: 15px 10px;
}
`;

const NotiAvatar = styled(Avatar)`
height: 50px !important;
width: 50px !important;
@media screen and (max-width: 580px) {
    height: 40px !important;
    width: 40px !important;
}
`;

const NotificationInfos = styled.div`
display: flex;
flex-direction: column;
justify-content: space-around;
width: 100%;
margin-left: 6px;
`

const InfoTop = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
`
const InfoBottom = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
`
const Username = styled.span`
font-size: 14px;
font-weight: 600;
color: #777;
@media screen and (max-width: 580px) {
    font-weight: 500;
}

`
const NotificationMessage = styled.span`
font-size: 14px;
font-weight: 400;
color: #555;
margin-top: 5px;
@media screen and (max-width: 580px) {
    font-size: 13px;
}
`
const NotificationDate = styled.span`
font-size: 13px;
font-weight: 500;
color: teal;
text-align: right;
`