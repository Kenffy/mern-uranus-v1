import styled from "styled-components";

import React from 'react'
import { Avatar } from "@material-ui/core";
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import YouTubeIcon from '@material-ui/icons/YouTube';

export default function CreatePost({setOpenModal}) {

    const handlePicture = ()=>{
        setOpenModal(true);
        // load pictures
    }

    const handleVideo = ()=>{
        setOpenModal(true);
        // load Video
    }
    return (
        <Container>
            <Wrapper>
                <InputContainer>
                    <InputAvatar />
                    <InputButton onClick={()=> setOpenModal(true)}>
                        <InputName>Create a post</InputName>
                    </InputButton>
                </InputContainer>

                <MediaContainer>
                    <MediaItem onClick={handlePicture}>
                        <ItemIcon>
                            <PhotoCameraIcon/>
                        </ItemIcon>
                        <ItemName>Photo</ItemName>
                    </MediaItem>
                    <MediaItem onClick={handleVideo}>
                        <ItemIcon>
                            <YouTubeIcon />
                        </ItemIcon>
                        <ItemName>Video</ItemName>
                    </MediaItem>
                </MediaContainer>
            </Wrapper>
        </Container>
    )
};

const Container = styled.div`
background-color: white;
box-shadow: 0px 1px 3px rgba(0,0,0,0.5);
margin-top: 10px;
margin-bottom: 20px;
border-radius: 10px;
display: flex;
flex-direction: column;
@media screen and (max-width: 580px) {

}
`
const Wrapper = styled.div`
display: flex;
flex-direction: column;
padding: 15px 20px;
`
const InputContainer = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
margin-bottom: 8px;
`
const InputAvatar = styled(Avatar)`
height: 45px !important;
width: 45px !important;
`;
const InputButton = styled.button`
display: flex;
width: 100%;
padding: 8px;
margin-left: 8px;
align-items: center;
border-radius: 50px;
cursor: pointer;
border: 2px solid teal;
background-color: white;
cursor: pointer;
&:hover{
    background-color: rgba(0, 0, 0, 0.05);
}
`
const InputName = styled.span`
padding: 0px 10px;
font-size: 14px;
color: #555;
`
const MediaContainer = styled.div`
display: flex;
align-items: center;
`
const MediaItem = styled.div`
display: flex;
align-items: center;
padding: 8px 15px;
border-radius: 5px;
margin-right: 10px;
cursor: pointer;
&:hover{
    background-color: rgba(0, 0, 0, 0.1);
}
`
const ItemIcon = styled.div`
display: flex;
align-items: center;
height: 15px;
color: teal;
`
const ItemName = styled.span`
display: flex;
align-items: center;
margin-left: 10px;
font-weight: 600;
color: #555;
`
