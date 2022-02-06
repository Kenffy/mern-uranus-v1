import React from 'react';
import { Modal } from "@material-ui/core";
import styled from "styled-components";
import {useState} from "react";

const VideoModal = ({openModal, setOpenModal, setVideo}) => {
 const [value, setValue] = useState(""); 
 const [isError, setIsError] = useState(false);
 const error ="This should be an url";
 const onChange = (e) => { 
     setValue(e.target.value); 
 };
;
                

 const validate = (url) => {
    const regex = new RegExp('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?'); 
    //const regex = new RegExp('/^(http[s]?:){0,1}(w{3,3}.)[-a-z0-9+&@#%?=~_|!:,.;]*[-a-z0-9+&@#%=~_|]/');   
    return regex.test(url);
  };
 
 const handleSubmit = (e)=>{ 
     e.preventDefault(); 
     console.log("test submit");

    if(validate(value)){
        setIsError(false)
        setVideo(value); 
        console.log(value);
        setOpenModal(false);
    }
    else{
        setIsError(true)
    }
      
} 
     return ( 
     <Container> 
        <Modal open={openModal} 
        onClose={()=>setOpenModal(false)}> 
            <Content> 
                <Title>Uploade Video</Title> 
                <Text>Add your video Link here:</Text> 
                <Input type="url" 
                onChange={onChange} 
                required={true} 
                pattern="[Hh][Tt][Tt][Pp][Ss]?:\/\/(?:(?:[a-zA-Z\u00a1-\uffff0-9]+-?)*[a-zA-Z\u00a1-\uffff0-9]+)(?:\.(?:[a-zA-Z\u00a1-\uffff0-9]+-?)*[a-zA-Z\u00a1-\uffff0-9]+)*(?:\.(?:[a-zA-Z\u00a1-\uffff]{2,}))(?::\d{2,5})?(?:\/[^\s]*)?" 
                /> 
                {isError && <Error>{error}</Error>} 
                <Button onClick={handleSubmit}>Add</Button> 
            </Content> 
        </Modal> 
    </Container> 
    )}

export default VideoModal;

const Container = styled.div`
position: relative;
`;
const Content = styled.div`
position: absolute;
height: 240px;
width: 500px;
background-color: white;
top: 0;left: 0;bottom: 0;right: 0;margin: auto;
border-radius: 10px;
display: flex;
flex-direction: column;
@media screen and (max-width: 580px) { 
    width: 90%;
}`;
const Title = styled.h3`
padding: 15px;
font-weight: 500;
`;
const Text = styled.label`
padding: 15px;
`;
const Input = styled.input`
padding: 8px;
margin: 0px 15px;
border-radius: 5px;
color: teal;
border-color: lightgray;
outline: none;
`;
const Error = styled.span`
padding: 5px 15px;
font-size: 12px;
color: red;
`;
const Button = styled.button`
padding: 8px;
margin: 10px 15px;
width: 100px;
border: none;
border-radius: 5px;
color: white;
background-color: teal;
cursor: pointer;
&:hover{ 
    opacity: 0.8; 
    transition: all 0.3s ease;
    }
`;
