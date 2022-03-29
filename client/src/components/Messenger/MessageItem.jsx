import React, { useEffect, useRef, useState } from 'react';
import styled from "styled-components";
import { format } from "timeago.js";
import ReactAudioPlayer from 'react-audio-player';
import { CheckCircleOutlineRounded, 
    InsertDriveFileRounded, 
    KeyboardArrowDown } from '@material-ui/icons';

    let useClickOutside = (handler) =>{
        let domMenuRef = useRef();
        useEffect(()=>{
            let tmpHandler = (event) => {
                if(!domMenuRef.current?.contains(event.target)){
                    handler();
                }
            };
            document.addEventListener("mousedown", tmpHandler);
            return () => {
                document.removeEventListener("mousedown", tmpHandler);
            };
        },[handler]);
        return domMenuRef;
    }

export default function MessageItem({owner, friend, item, setOnView, setCurrSlides, scrollRef}) {
    const ImageUrl = process.env.REACT_APP_MSG_IMAGES;
    const AudioUrl = process.env.REACT_APP_MSG_AUDIOS;
    const DocUrl = process.env.REACT_APP_MSG_DOCS;

    const [menu, setMenu] = useState(false);

    let domMenuRef = useClickOutside(()=>{
        setMenu(false);
    });

    const handleImages = (images)=>{
        setCurrSlides(images);
        setOnView(true);
    };

    const handleDeleteMessage = ()=>{
        console.log("Message deleted successfully!");
        setMenu(false);
    }

    return (
        <MsgContainer owner={owner}>
            <MessageWrapper> 
                <Message owner={owner}>
                    <MenuIcon onClick={()=>setMenu(true)}/>
                    {menu &&
                    <Menu ref={domMenuRef}>
                        <MenuItem onClick={()=>setMenu(false)}>Reply</MenuItem>
                        <MenuItem onClick={()=>setMenu(false)}>Forward</MenuItem>
                        <MenuItem onClick={handleDeleteMessage}>Delete</MenuItem>
                    </Menu>}
                    
                    {item?.images.length > 0 &&
                    <MessagesImage onClick={()=>handleImages(item?.images)}>
                        <Image src={item?.images[0]?.includes("http")? item?.images[0] : ImageUrl+item?.images[0]}/>
                        {item?.images.length > 1 &&
                        <ImageCount>+ {item?.images.length-1}</ImageCount>}
                    </MessagesImage>}
                    {item?.audios.length > 0 &&
                    <MessagesAudio>
                        <Audio style={{width: '100%'}} 
                        src={AudioUrl+item?.audios[0]?.filename} type={item?.audios[0]?.type || "audio/mpeg"} controls/>
                    </MessagesAudio>}
                    {item?.documents.length > 0  &&
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
            <MessageInfoWrapper>
                <MessageInfos ref={scrollRef}>
                    {format(item?.createdAt)}
                </MessageInfos>
                {owner && 
                <SendedIconWrapper viewed={(item?.viewed && item?.receiver === friend)}>
                    <SendedIcon />
                </SendedIconWrapper>}
            </MessageInfoWrapper>
            
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
padding: 0px 5px;
`;

const Menu = styled.div`
display: flex;
flex-direction: column;
border-radius: 5px;
background-color: white;
position: absolute;
top: 30px;
right: 0;
-webkit-box-shadow: 3px 4px 9px -2px rgba(0,0,0,0.64); 
 box-shadow: 3px 4px 9px -2px rgba(0,0,0,0.64);
 z-index: 100;
`;

const MenuItem = styled.div`
padding: 5px 15px;
cursor: pointer;
color: #333;
`;


const MenuIcon = styled(KeyboardArrowDown)`
position: absolute;
top: 0;
right: 0;
margin: 5px;
color: white;
background-color: rgba(0,0,0,0.4);
border-radius: 50%;
cursor: pointer;
display: none !important;
z-index: 100;
`;

const Message = styled.div`
position: relative;
margin: 5px;
padding: 10px 15px;
display: flex;
flex-direction: column;
background-color: ${(props) => props.owner? "white" : "teal"};
color: ${(props) => props.owner? "#333" : "whitesmoke"};
border-radius: ${(props) => props.owner? "15px 0px 15px 15px" : "0px 15px 15px 15px"};
max-width: 400px;
&:hover ${MenuIcon}{
 display: block !important;
 transition: 0.3s;
}
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
width: 100% !important;
min-width: 150px !important;
height: 30px !important;
display: block;
`;

const MessageInfoWrapper = styled.div`
margin-top: 2px;
padding: 0px 10px;
display: flex;
align-items: center;
`;

const MessageInfos = styled.span`
font-size: 11px;
margin-right: 4px;
`;

const SendedIconWrapper = styled.div`
color: ${(props) => props.viewed? "teal" : "#333"};
`;

const SendedIcon = styled(CheckCircleOutlineRounded)`
height: 16px !important;
width: 16px !important;
color: inherit;
`;