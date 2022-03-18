import React from 'react';
import styled from "styled-components";
import { format } from "timeago.js";
import ReactAudioPlayer from 'react-audio-player';

export default function MessageItem({owner, item}) {

    return (
        <MsgContainer owner={owner}>
            <MessageWrapper> 
                <Message owner={owner}>
                    {item?.images.length > 0 &&
                    <MessagesImage>
                        <Image src='https://cdn.pixabay.com/photo/2016/12/06/01/26/colour-1885352__340.jpg'/>
                        {item?.images.length > 1 &&
                        <ImageCount>+ {item?.images.length}</ImageCount>
                        }
                    </MessagesImage>}
                    {item?.audios.length > 0 &&
                    <MessagesAudio>
                        <Audio src={process.env.REACT_APP_AUDIOS+item?.audios[0]} type="audio/mpeg" controls/>
                    </MessagesAudio>}
                    <MessageText owner={owner}>{item?.message}</MessageText>
                </Message>
                
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
`;

const MessageWrapper = styled.div`
display: flex;
padding: 5px;
`;

const Message = styled.div`
margin: 5px;
padding: 10px 15px;
display: flex;
flex-direction: column;
background-color: ${(props) => props.owner? "white" : "teal"};
color: ${(props) => props.owner? "#333" : "whitesmoke"};
border-radius: ${(props) => props.owner? "15px 0px 15px 15px" : "0px 15px 15px 15px"};
max-width: 400px;
@media screen and (max-width: 580px) {
    max-width: 230px;
    font-size: 13px;
}
`;

const MessageText = styled.p`
width: 100%;
letter-spacing: 0.5px;
margin-top: 5px;
display: flex;
justify-content: ${(props) => props.owner? "flex-end" : "flex-start"};;
`;

const MessagesImage = styled.div`
width: 100%;
overflow: hidden;
position: relative;
border-radius: 10px;
cursor: pointer;
`;

const Image = styled.img`
width: 100%;
height: 100%;
object-fit: cover;
`;

const ImageCount = styled.span`
position: absolute;
bottom: 15px;
right: 5px;
height: 60px;
width: 80px;
font-size: 20px;
font-weight: 500;
border-radius: 10px;
color: white;
background-color: rgba(0,0,0,0.3);
display: flex;
align-items: center;
justify-content: center;
`;

const MessagesAudio = styled.div`
width: 100%;
margin-top: 10px;
`;

const Audio = styled(ReactAudioPlayer)`
width: 100%;
height: 30px !important;
`;

const MessageInfos = styled.span`
font-size: 11px;
margin-top: 2px;
padding: 0px 10px;
`