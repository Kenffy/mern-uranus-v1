import React from 'react'; 
//import { Avatar } from "@material-ui/core"
import styled from "styled-components";
import { format } from "timeago.js";

export default function MessageItem({owner, item}) {
    return (
        <MsgContainer owner={owner}>
            <MessageWrapper> 
                <MessageText owner={owner}>
                    {item?.message}
                </MessageText>
            </MessageWrapper>
            <MessageInfos>
                {format(item?.createdAt)}
            </MessageInfos>
        </MsgContainer>
    )
}

const MsgContainer = styled.div`
display: flex;
flex-direction: column;
margin: 10px;
align-items: ${(props) => props.owner? "flex-end" : "flex-start"};
`
const MessageWrapper = styled.div`
display: flex;
padding: 5px;
`
const MessageText = styled.p`
margin: 0px 5px;
padding: 10px 15px;
background-color: ${(props) => props.owner? "rgba(0,0,0,0.05)" : "teal"};
color: ${(props) => props.owner? "#333" : "whitesmoke"};
border-radius: ${(props) => props.owner? "10px 0px 10px 10px" : "0px 10px 10px 10px"};
letter-spacing: 0.5px;
max-width: 400px;
@media screen and (max-width: 580px) {
    max-width: 230px;
    font-size: 13px;
}
`
const MessageInfos = styled.span`
font-size: 11px;
margin-top: 2px;
padding: 0px 10px;
`