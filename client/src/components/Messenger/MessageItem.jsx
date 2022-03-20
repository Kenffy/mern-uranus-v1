import React from 'react';
import styled from "styled-components";
import { format } from "timeago.js";
import ReactAudioPlayer from 'react-audio-player';
import { InsertDriveFileRounded } from '@material-ui/icons';

export default function MessageItem({owner, item, setOnView, setCurrSlides}) {
    const ImageUrl = process.env.REACT_APP_MSG_IMAGES;
    const AudioUrl = process.env.REACT_APP_MSG_AUDIOS;
    const DocUrl = process.env.REACT_APP_MSG_DOCS;

    const handleImages = (images)=>{
        setCurrSlides(images);
        setOnView(true);
    }
    return (
        <MsgContainer owner={owner}>
            <MessageWrapper> 
                <Message owner={owner}>
                    {item?.images.length > 0 &&
                    <MessagesImage onClick={()=>handleImages(item?.images)}>
                        <Image src={item?.images[0].includes("http")? item?.images[0] : ImageUrl+item?.images[0]}/>
                        {item?.images.length > 1 &&
                        <ImageCount>+ {item?.images.length}</ImageCount>
                        }
                    </MessagesImage>}
                    {item?.audios.length > 0 &&
                    <MessagesAudio>
                        <Audio src={AudioUrl+item?.audios[0]?.filename} type="audio/mpeg" controls/>
                    </MessagesAudio>}
                    {item?.documents.length > 0 &&
                    <Link href={DocUrl+item?.documents[0]} target='_blank'>
                    <MessagesDoc>
                        <InsertDriveFileRounded style={{color:'orangeRed'}}/>
                        <MediaFileName>{item?.documents[0]?.slice(item?.documents[0].length - 30)}</MediaFileName>
                    </MessagesDoc>
                    </Link>
                    }
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
    max-width: 290px;
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

const MessagesDoc = styled.div`
width: 100%;
margin-top: 10px;
display: flex;
align-items: center;
gap: 5px;
cursor: pointer;
background-color: rgba(0,0,0,0.1);
border-radius: 5px;
`;

const Link = styled.a`
text-decoration: none;
color: inherit;
`;

const MediaFileName = styled.span`
padding: 5px;
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