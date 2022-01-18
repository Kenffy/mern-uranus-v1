import React, { useState } from 'react'
import styled from 'styled-components';
import { sliderItems } from '../data/sliderItems';
import ImageSlider from '../slider/ImageSlider';

const MediaPicker = ({setPostImages}) => {
    const [images, setImages] = useState(sliderItems);
    setPostImages(images);
    return (
        <Container>
            <ImageSlider items={images}/>
        </Container>
    )
};

export default MediaPicker;

const Container = styled.div`
height: 100%;
width: 100%;
border-radius: 10px;
overflow: hidden;
`;
