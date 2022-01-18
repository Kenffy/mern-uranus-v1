import { Close } from '@material-ui/icons';
import React from 'react'
import styled from 'styled-components';
import ImageSlider from '../slider/ImageSlider';

const ImageViewer = ({images, open, setViewer}) => {
    return (
        <Container open={open}>
            <CloseIcon onClick={()=> setViewer(!open)} />
            <ImageSlider images={images} viewer={open}/>
        </Container>
    )
}

export default ImageViewer;

const Container = styled.div`
width: 100%;
height: 100vh;
position: fixed;
top: 0;
left: 0;
display: flex;
justify-content: center;
align-items: center;
background-color: #000;
transition: opacity 0.4s ease, visibility 0.4s ease, transform 0.5s ease;
visibility: ${(props)=> props.open? "visible" : "hidden"};
opacity: ${(props)=> props.open? 1 : 0};
transform: ${(props)=> props.open? "scale(1)" : "scale(0)"};
overflow: hidden;
z-index: 2000;
`;

const CloseIcon = styled(Close)`
position: absolute;
height: 40px !important;
width: 40px !important;
top: 10px;
right: 15px;
opacity: 0.6;
cursor: pointer;
color: white;
&:hover{
    opacity: 1;
}
z-index: 999;
`;
