import React from 'react'; 
//import { Avatar } from "@material-ui/core"
import styled from "styled-components"

export default function MessageItem({owner}) {
    return (
        <MsgContainer owner={owner}>
            <MessageWrapper>
                {owner?
                <>
                
                <MessageText owner={owner}>
                    Nam error, officiis labore repellat saepe eos inventore odit, architecto quidem corrupti nisi.
                </MessageText>
                {/* <Avatar style={{
                            height:'25px', 
                            width:'25px'}}/> */}
                </> 
                
                : <>
                {/* <Avatar style={{
                            height:'25px', 
                            width:'25px'}}/> */}
                <MessageText owner={owner}>
                    Nam error, officiis labore repellat saepe eos inventore odit, architecto quidem corrupti nisi.
                </MessageText>
                </>
                }
                
            </MessageWrapper>
            <MessageInfos>
                1 hour ago.
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