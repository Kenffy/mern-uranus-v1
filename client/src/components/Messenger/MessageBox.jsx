import React from 'react'; 
import { Avatar } from "@material-ui/core";
import { ArrowBackIosRounded, AttachFileRounded, CameraAltRounded, Close, EmojiEmotions, GraphicEqRounded, ImageRounded, InsertDriveFileRounded, MoreHoriz, Send } from "@material-ui/icons";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import MessageItem from "./MessageItem";
import * as api from "../../services/apiServices";
import { v4 as uuidv4 } from 'uuid';
import {toast} from "react-toastify";
import { sendMessage } from '../../context/Action';
import ImageViewer from '../slider/ImageViewer';

export default function MessageBox({setOnMsgBox, socket, dispatch, 
    auth, onlineUsers, currConversation, 
    handleUpdateCurrChat, arrivalMessage}) {
    const ProfileUrl = process.env.REACT_APP_PROFILES;
    //const ImageUrl = process.env.REACT_APP_MSG_IMAGES;
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const [onAttach, setOnAttach] = useState(false);
    const [onView, setOnView] = useState(false);
    const [currSlides, setCurrSlides] = useState([]);
    const friend = currConversation?.friend || null;
    const [counter, setCounter] = useState(0);
    const [msgImages, setMsgImages] = useState([]);
    const [msgAudio, setMsgAudio] = useState(null);
    const [msgDoc, setMsgDoc] = useState(null);
    const maxUpload = 10;

    const scrollRef = useRef();

    useEffect(() => {
        return scrollRef.current?.scrollIntoView({behavior:"smooth"})
    }, [messages]);

    useEffect(() => {
        const fetchMessages = async () => {
            dispatch({ type: "ACTION_START"});
            try {
                const user = JSON.parse(localStorage.getItem("user"));
                const res = await api.getMessages(currConversation?._id, user.accessToken);
                if(res.data){
                    setMessages(res.data);
                    dispatch({ type: "ACTION_SUCCESS"});
                }
            } catch (error) {
                console.log(error);
                dispatch({ type: "ACTION_FAILED"});
            }
        };
        fetchMessages();
    }, [dispatch, currConversation]);

    useEffect(() => {
        arrivalMessage &&
        currConversation?.members.includes(arrivalMessage.sender) &&
          setMessages((prev) => [...prev, arrivalMessage]);
    }, [arrivalMessage, currConversation]);

    const handleImages = (e)=>{
        const files = e.target.files;
        let count = counter;
        for(let i=0; i<files?.length; i++){
            if(count < maxUpload){
                const id = uuidv4();
                const newImage = {
                    id: id,
                    filename: id + files[i].name,
                    url: URL.createObjectURL(files[i]), 
                    file: files[i]
                };
                setMsgImages((prevState) => [...prevState, newImage]);
                count = count + 1;
            }
        }
        setCounter(count);
        setOnAttach(false);
    }

    const handleRemoveImage = (id)=>{
        if (msgImages.length > 0){            
            const tmpArray = msgImages.filter(img => img.id !== id)
            setMsgImages(tmpArray);
            setCounter((prevState)=> prevState - 1);
        }
    }

    const handleAudio = (e)=>{
      const file = e.target.files[0];
      if(file){
        const newAudio = {
          filename: uuidv4() + file.name,
          file: file,
          type: file.type,
          url: URL.createObjectURL(file), 
        };
        setMsgAudio(newAudio);
        setOnAttach(false);
      }
    }

    const handleDocument = (e)=>{
      const file = e.target.files[0];
      if(file){
        const newDoc = {
          filename: uuidv4() + file.name,
          file: file,
          type: file.type,
          url: URL.createObjectURL(file), 
        };
        setMsgDoc(newDoc);
        setOnAttach(false);
      }
    };

    const handleCreateMessage = async()=>{      
        if(currConversation){
            if(msgImages.length === 0 && !msgAudio && !msgDoc && !message){
                toast.warning("Oop! You most at least write a message");
                return
            }
            try {
                const data = {
                    images: msgImages,
                    audio: msgAudio,
                    video: null,
                    doc: msgDoc,
                }

                let uploadedImages = []
                msgImages.forEach(m=>{
                    uploadedImages.push(m.filename);
                });

                const onlineFriend = onlineUsers.find(u=>u?._id === friend?._id);
                const msg = {
                    conversationId: currConversation?._id,
                    sender: auth?._id,
                    receiver: friend?._id,
                    message,
                    viewed: onlineFriend? true : false,
                    images: uploadedImages.length>0? uploadedImages: [],
                    audios: msgAudio? [{
                        filename: msgAudio.filename,
                        type: msgAudio.type}] : [],
                    documents: msgDoc? [msgDoc.filename] : [],
                    videos: [],
                }

                socket.current.emit("sendMessage", msg);
                // workaround
                //setMessages([...messages, msg]);
                currConversation.message = msg;
                currConversation.readed = currConversation.readed + 1;
                const res = await sendMessage(dispatch, msg, data);
                //const res = null;
                setMessage("");
                setMsgImages([]);
                setMsgAudio(null);
                setMsgDoc(null);
                if(res?.data){
                    setMessages((prev)=>[...prev, res.data]);
                    handleUpdateCurrChat(currConversation);
                }
            } catch (error) {
                console.log(error);
            }
        }else{
            setMessage("");
            toast.warning("Oop! Please start a conversation.");
        }
    }

    const handleRemoveDoc = ()=>{
        setMsgDoc(null);
    }

    const handleRemoveAudio = ()=>{
        setMsgAudio(null);
    }

    const isOnline= onlineUsers.find(u=>u?._id === friend?._id);

    return (
        <Container>
            {onView &&
            <ImagesViewer>
                <CloseViewer onClick={()=>setOnView(false)}/>
                <ImageViewer images={currSlides} />
            </ImagesViewer>
            }

            <Header>
                {currConversation?
                <div style={{display:"flex", alignItems: "center"}}>
                    <BackIcon onClick={()=>setOnMsgBox(false)}/>
                    <FriendAvatar src={friend?.profile.includes("http")? friend?.profile : ProfileUrl+friend?.profile}/>
                    <div style={{display: "flex", flexDirection: "column"}}>
                        <FriendName>{friend?.username}</FriendName>
                        {isOnline && <OnlineStatus>online</OnlineStatus>}
                    </div>
                </div>
                :
                <FriendAvatar /> }
                <MoreIcon />  
            </Header>
            {currConversation?
            <MessagesBox>
                {messages.map((message, index)=>(
                    <div key={index}>
                        <MessageItem 
                        friend={friend?._id}
                        item={message} 
                        owner={message?.sender === auth?._id}
                        setOnView={setOnView}
                        scrollRef={scrollRef}
                        setCurrSlides={setCurrSlides}/>
                    </div>
                ))}
            </MessagesBox>
            :
            <MessagesBox>
                <div style={{padding: "40% 10%"}}>
                    <h2 style={{width: "100%", 
                    color: "#555",
                    textAlign: "center"}}>No messages</h2>
                    <p style={{width: "100%", 
                    color: "#555",
                    textAlign: "center",
                    marginTop: "20px"}}>Select or start a new conversation.</p>
                </div>
            </MessagesBox>
            }
            <ChatFooterWrapper>
                <AttachmentWrapper>
                {msgImages.length > 0 &&
                    <MediaImageWrapper>  
                        <UploadWrapperStatus>
                            {counter === maxUpload &&
                            <UploadMessage>max. images reached:</UploadMessage>
                            }
                            <UploadStatus>{counter +":"+ maxUpload}</UploadStatus>
                        </UploadWrapperStatus>             
                        <ImageList>
                            { msgImages.map((image) => (
                            <ImageWrapper key={image?.id} >
                                <RemoveImage onClick={()=>handleRemoveImage(image?.id)}/>
                                <ImageItem
                                src={image?.url} 
                                alt={image?.filename}/>
                            </ImageWrapper>
                            ))}
                        </ImageList>
                    </MediaImageWrapper>
                }
                {msgAudio && 
                    <MediaWrapper>
                        <GraphicEqRounded fontSize='small' style={{color:'teal', marginRight:'5px'}}/>
                        <MediaFileName>{msgAudio.file.name}</MediaFileName>
                        <RemoveIcon onClick={handleRemoveAudio}/>
                    </MediaWrapper>
                }
                {msgDoc && 
                    <MediaWrapper>
                        <InsertDriveFileRounded fontSize='small' style={{color:'teal', marginRight:'5px'}}/>
                        <MediaFileName>{msgDoc.file.name}</MediaFileName>
                        <RemoveIcon onClick={handleRemoveDoc}/>
                    </MediaWrapper>
                }
                </AttachmentWrapper>

                <ChatInputWrapper>
                <div style={{display: "flex", alignItems: "center"}}>
                    <div style={{position: "relative"}}>
                        {currConversation &&
                        <AttachIcon onClick={()=>setOnAttach(!onAttach)}/>}
                        {onAttach &&
                        <AttachOptions>
                            <div style={{display: "none"}}>
                                <label htmlFor="cameraInput">
                                <AttachOption>
                                    <CameraAltRounded fontSize='small' style={{color:'teal'}}/>
                                    <AttachName>Camera</AttachName>
                                </AttachOption>
                                </label>
                                <input 
                                    id="cameraInput" 
                                    type="file"
                                    accept=".jpg,.jpeg,.png" 
                                    multiple="multiple"
                                    style={{ display: "none" }}
                                    onChange={handleImages}
                                />  
                            </div>

                            <div>
                                <label htmlFor="imageInput">
                                    <AttachOption>
                                        <ImageRounded fontSize='small' style={{color:'teal'}}/>
                                        <AttachName>Gallery</AttachName>
                                    </AttachOption>
                                </label>
                                <input 
                                    id="imageInput" 
                                    type="file"
                                    accept=".jpg,.jpeg,.png" 
                                    multiple="multiple"
                                    style={{ display: "none" }}
                                    onChange={handleImages}
                                />  
                            </div>
                            
                            
                            <div>
                                <label htmlFor="audioInput">
                                    <AttachOption>
                                        <GraphicEqRounded fontSize='small' style={{color:'teal'}}/>
                                        <AttachName>Audio</AttachName>
                                    </AttachOption>
                                </label>
                                <input 
                                    id="audioInput" 
                                    type="file"
                                    accept=".mp3,.wav,.ogg"
                                    style={{ display: "none" }}
                                    onChange={handleAudio}
                                />  
                            </div>
                            
                            <div>
                                <label htmlFor="documentInput">
                                <AttachOption>
                                    <InsertDriveFileRounded fontSize='small' style={{color:'teal'}}/>
                                    <AttachName>Document</AttachName>
                                </AttachOption>
                                </label>
                                <input 
                                    id="documentInput" 
                                    type="file"
                                    accept=".txt,.pdf,.xdoc,.csv,.xlsx"
                                    style={{ display: "none" }}
                                    onChange={handleDocument}
                                />  
                            </div>
                            
                        </AttachOptions>}
                    </div>
                    {currConversation && <EmojiIcon />}
                </div>
                
                <ChatInput value={message} required placeholder="Write a message ..."
                    onChange={(e)=>setMessage(e.target.value)}/>
                    <div style={{height: "100%"}}>
                        <SendIcon onClick={handleCreateMessage}/>
                        <SendButton onClick={handleCreateMessage}>Send</SendButton>
                    </div>
                </ChatInputWrapper>
            </ChatFooterWrapper>
            
        </Container>
    )
};

const Container = styled.div`
border-left: 1px solid rgba(0,0,0,0.1);
background-color: rgba(0,0,0,0.06);
width: 100%;
display: flex;
flex-direction: column;
`;

const ImagesViewer = styled.div`
background-color: #111;
width: 100vw;
height: 100vh;
position: absolute;
top: 0;
left: 0;right: 0;bottom: 0;
margin: auto;
display: flex;
align-items: center;
justify-content: center;
z-index: 1000;
`;

const CloseViewer = styled(Close)`
position: absolute;
top: 20px;
right: 10px;
cursor: pointer;
color: white;
height: 40px !important;
width: 40px !important;
padding: 5px;
border-radius: 50%;
background-color: rgba(0,0,0,0.2);
opacity: 0.5;
&:hover{
    opacity: 1;
}
z-index: 1100;
`;

const Header = styled.div`
padding: 0px 12px;
min-height: 50px !important;
display: flex;
justify-content: space-between;
align-items: center;
background-color: white;
border-bottom: 1px solid lightgray;
`;

const FriendAvatar = styled(Avatar)`
height: 35px !important;
width: 35px !important;
`;

const FriendName = styled.span`
margin-left: 10px;
color: #333;
`;

const OnlineStatus = styled.span`
margin-left: 10px;
font-size: small;
color: #333;
`;

const BackIcon = styled(ArrowBackIosRounded)`
height: 25px !important;
width: 25px !important;
margin-right: 10px;
cursor: pointer;
color: teal;
display: none !important;
@media screen and (max-width: 580px) {
    display: flex !important;
}
`;

const MoreIcon = styled(MoreHoriz)`
height: 30px !important;
width: 30px !important;
margin-right: 10px;
cursor: pointer;
color: teal;
`;

const MessagesBox = styled.div`
height: 100%;
overflow-y: auto;
::-webkit-scrollbar {
    width: 2px;
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

const ChatFooterWrapper = styled.div`
display: flex;
flex-direction: column;
gap: 10px;
width: 100%;
border-top: 1px solid lightgray;
background-color: white;
`;

const ChatInputWrapper = styled.div`
height: 80px;
display: flex;
align-items: center;
padding: 10px 5px;
@media screen and (max-width: 580px) {
    height: 65px;
    align-items: center;
}
`
const ChatInput = styled.textarea`
width: 100%;
height: 100%;
padding: 10px 20px;
border-radius: 5px;
margin: 2px 6px;
border: none;
outline: none;
font-size: 16px;
color: #555;
resize: none;
background-color: rgba(0,0,0,0.06);
`;

const SendIcon = styled(Send)`
height: 35px !important;
width: 35px !important;
display: none !important;
color: teal;
cursor: pointer;
transition: 0.3s all ease;
@media screen and (max-width: 580px) {
    display: flex !important;
}
`;

// const DesabledSendIcon = styled(Send)`
// height: 35px !important;
// width: 35px !important;
// display: none !important;
// color: rgba(0,0,0,0.3);
// cursor: not-allowed;
// transition: 0.3s all ease;
// @media screen and (max-width: 580px) {
//     display: flex !important;
// }
// `;

const EmojiIcon = styled(EmojiEmotions)`
height: 40px !important;
width: 40px !important;
color: teal;
cursor: pointer;
@media screen and (max-width: 580px) {
    display: none !important;
}
`;

const AttachIcon = styled(AttachFileRounded)`
height: 36px !important;
width: 36px !important;
color: teal;
cursor: pointer;
margin-right: 10px;
@media screen and (max-width: 580px) {
    height: 30px !important;
    width: 30px !important;
}
`;

const AttachOptions = styled.div`
display: flex;
flex-direction: column;
background-color: white;
border-radius: 10px;
position: absolute;
bottom: 80px;
left: 10px;
min-width: 200px;
box-shadow: 0px 10px 20px rgba(0,0,0,0.4);
z-index: 10;
`;

const AttachOption = styled.div`
display: flex;
align-items: center;
padding: 12px 20px;
gap: 15px;
border-bottom: 1px solid rgba(0,0,0,0.05);
cursor: pointer;
&:hover{
    color: teal;
    font-weight: 500;
}
`;

const AttachName = styled.span`

`;

const SendButton = styled.button`
height: 100%;
width: 100px;
display: flex;
align-items: center;
justify-content: center;
color: white;
background-color: teal;
display: flex !important;
border: none;
border-radius: 5px;
font-size: 16px;
cursor: pointer;
transition: 0.3s all ease;
@media screen and (max-width: 580px) {
    display: none !important;
}
`;

const AttachmentWrapper = styled.div`
display: flex;
flex-direction: column;
gap: 10px;
padding: 5px 10px;
width: 100%;
`;

const MediaImageWrapper = styled.div`
display: flex;
flex-direction: column;
margin-bottom: 2px;
width: 100%;
`;

const UploadWrapperStatus = styled.span`
display: flex;
align-items: center;
color: teal;
font-weight: 500;
`;

const UploadStatus = styled.span`
margin-left: 10px;
@media screen and (max-width: 580px) {
    font-size: 11px;
}
`;

const UploadMessage = styled.span`
color: red;
@media screen and (max-width: 580px) {
    font-size: 11px;
}
`;

const MediaWrapper = styled.div`
display: flex;
margin-bottom: 2px;
width: 100%;
`;

const MediaFileName = styled.span`
display: -webkit-box;
-webkit-box-orient: horizontal;
-webkit-line-clamp: 1;
overflow: hidden;
`;

const ImageList = styled.div`
display: grid;
gap: 10px;
grid-template-columns: repeat(auto-fit, minmax(70px ,1fr));
@media screen and (max-width: 580px) {
    grid-template-columns: repeat(auto-fit, minmax(60px ,1fr));
}
`;

const ImageWrapper = styled.div`
position: relative;
`;

const ImageItem = styled.img`
height: 60px;
width: 100%;
border-radius: 8px;
cursor: pointer;
object-fit: cover;
@media screen and (max-width: 580px) {
    height: 50px;
}
`;

const RemoveImage = styled(Close)`
position: absolute;
top: 4px;
right: 5px;
padding: 2px;
cursor: pointer;
border-radius: 50%;
background-color: teal;
color: white;
opacity: 0.6;
z-index: 1;
&:hover{
    opacity: 1;
    transition: 0.3s all ease;
}
`;

const RemoveIcon = styled(Close)`
padding: 2px;
margin-left: 5px;
cursor: pointer;
border-radius: 50%;
background-color: teal;
color: white;
opacity: 0.6;
z-index: 1;
&:hover{
    opacity: 1;
    transition: 0.3s all ease;
}
`;