import React from 'react';
import { ArrowLeftOutlined, ArrowRightOutlined } from "@material-ui/icons";
import { useState } from "react";
import styled from "styled-components";

const ImageSlider = ({images, viewer}) => {
  const maxIndex = images?.length - 1;
  const [slideIndex, setSlideIndex] = useState(0);
  const handleClick = (direction) => {
    if (direction === "left") {
      setSlideIndex(slideIndex > 0 ? slideIndex - 1 : maxIndex);
    } else {
      setSlideIndex(slideIndex < maxIndex ? slideIndex + 1 : 0);
    }
  };
  
  return (
    <Container>
      <Arrow direction="left" onClick={() => handleClick("left")}>
        <ArrowLeftOutlined />
      </Arrow>
      <Wrapper slideIndex={slideIndex}>
        {images.map((image, index) => (
          <Slide key={index}>
            <ImgContainer>
              <Image src={process.env.REACT_APP_POSTS+image} viewer={viewer}/>
            </ImgContainer>
          </Slide>
        ))}
      </Wrapper>
      <Arrow direction="right" onClick={() => handleClick("right")}>
        <ArrowRightOutlined />
      </Arrow>
    </Container>
  );
};

export default ImageSlider;

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
  background-color: #fff7f7;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: ${(props) => props.direction === "left" && "10px"};
  right: ${(props) => props.direction === "right" && "10px"};
  margin: auto;
  cursor: pointer;
  opacity: 0.1;
  &:hover{
    opacity: 0.5;
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
  transition: all 1.5s ease;
  transform: translateX(${(props) => props.slideIndex * -100}%);
`;

const Slide = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  background-color: ${(props) => props.bg};
`;

const ImgContainer = styled.div`
  height: 100%;
  width: 100vw;
  flex: 1;
`;

const Image = styled.img`
  height: 100%;
  min-width: 100%;
  object-fit: cover;
  //object-fit: ${(props) => props.viewer? "contain" : "cover"};
`;
