import React from 'react';
import { NavigateBefore, NavigateNext } from "@material-ui/icons";
import { useState } from "react";
import styled from "styled-components";

const ImageViewer = ({images, viewer}) => {
  const maxIndex = images?.length - 1;
  const [slideIndex, setSlideIndex] = useState(0);
  const handleClick = (direction) => {
    if (direction === "left") {
      setSlideIndex(slideIndex > 0 ? slideIndex - 1 : maxIndex);
    } else {
      setSlideIndex(slideIndex < maxIndex ? slideIndex + 1 : 0);
    }
  };

  const ImageUrl = process.env.REACT_APP_MSG_IMAGES;
  
  return (
    <Container>
      <Arrow direction="left" onClick={() => handleClick("left")}>
        <NavigateBefore style={{height: "100%", width: "100%"}}/>
      </Arrow>
      <Wrapper slideIndex={slideIndex}>
        {images.map((image, index) => (
          <Slide key={index}>
            <ImgContainer>
              <Image src={image.includes("http")? image : ImageUrl+image} viewer={viewer}/>
            </ImgContainer>
          </Slide>
        ))}
      </Wrapper>
      <Arrow direction="right" onClick={() => handleClick("right")}>
        <NavigateNext style={{height: "100%", width: "100%"}}/>
      </Arrow>
    </Container>
  );
};

export default ImageViewer;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  position: relative;
  overflow: hidden;
`;

const Arrow = styled.div`
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  color: whitesmoke;
  top: 0;
  bottom: 0;
  left: ${(props) => props.direction === "left" && "10px"};
  right: ${(props) => props.direction === "right" && "10px"};
  margin: auto;
  cursor: pointer;
  opacity: 0.4;
  &:hover{
    opacity: 0.8;
    transition: all 0.3s ease;
  }
  z-index: 2;
  @media screen and (max-width: 1024px) {
    height: 40px;
    width: 40px;
  }
  @media screen and (max-width: 768px) {
    height: 35px;
    width: 35px;
  }
  @media screen and (max-width: 580px) {
    width: 25px;
    height: 25px;
  }
`;

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  transition: all 1s ease;
  transform: translateX(${(props) => props.slideIndex * -100}%);
`;

const Slide = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.bg};
`;

const ImgContainer = styled.div`
  height: 100vh;
  width: 100vw;
`;

const Image = styled.img`
  height: 100%;
  width: 100%;
  object-fit: contain;
`;
