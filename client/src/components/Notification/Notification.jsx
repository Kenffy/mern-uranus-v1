import React, { useContext } from 'react'; 
import { Avatar } from "@material-ui/core";
import styled from "styled-components";
import { format } from "timeago.js";
import { useHistory } from 'react-router-dom';
import * as api from "../../services/apiServices";
import { Context } from '../../context/Context';

export default function Notification({notify}) {

    const ProfileUrl = process.env.REACT_APP_PROFILES;
    const history = useHistory();
    const {dispatch} = useContext(Context);

    const handleNotification = async()=>{
        try {
            if(notify){
                const user = JSON.parse(localStorage.getItem("user"));
                const res = await api.readNotification(notify, user.accessToken);
                if(res.status === 200){
                    dispatch({type: "UPDATE_NOTY", payload: res.data});
                    history.push(`/postswrf4${notify?.link}wrf4${notify?.authorId}`);
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <NotificationWrapper onClick={()=>handleNotification()} viewed={notify?.viewed}>
            <NotiAvatar src={notify?.profile?.includes("http")? notify?.profile : ProfileUrl+notify?.profile}/>
            <NotificationInfos>
                <InfoTop>
                    <Wrapper>
                      <Username>{notify?.username}</Username>
                      <NotificationMessage>{notify?.message}</NotificationMessage>
                    </Wrapper>
                    <NotificationDate>{format(notify?.createdAt)}</NotificationDate>
                </InfoTop>
                <InfoBottom>
                    <Text>{notify?.text}</Text>
                </InfoBottom>  
            </NotificationInfos>
        </NotificationWrapper>
    )
}

const NotificationWrapper = styled.div`
display: flex;
padding: 20px 10px;
background-color: ${props=>props.viewed? "white": "#eee"};
border-bottom: 1px solid rgba(0,0,0,0.1);
cursor: pointer;
&:hover{
    background-color: #eee;
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
`;

const InfoTop = styled.div`
display: flex;
justify-content: space-between;
`;

const Wrapper = styled.div`
display: flex;
flex-direction: column;
`;

const InfoBottom = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
`;

const Username = styled.span`
font-weight: bold;
color: #333;
`;

const Text = styled.span`
color: #888;
display: -webkit-box;
-webkit-box-orient: vertical;
-webkit-line-clamp: 2;
overflow: hidden;
font-size: 14px;
@media screen and (max-width: 580px) {
    font-size: 13px;
}
`;


const NotificationMessage = styled.span`
font-weight: 400;
color: #333;
`
const NotificationDate = styled.span`
font-size: 13px;
font-weight: 500;
color: teal;
text-align: right;
`