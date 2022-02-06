import React from 'react';
import styled from "styled-components";
import ReactAudioPlayer from 'react-audio-player';

const AudioPlayer = ({audio}) => {
    const cover = audio?.cover && audio?.cover?.length > 0 ? audio?.cover : null;
    return (
        <Container>
            { cover !== null? <Cover src={process.env.REACT_APP_AUDIO_COVERS+cover}/> : <Background />}
            <Audio src={process.env.REACT_APP_AUDIOS+audio.filename} type={audio.type} controls/>
            {/* <Audio controls>
                <Source src={audio.url} type={audio.type} />
            </Audio> */}
        </Container>
    )
}

export default AudioPlayer;

const Container = styled.div`
display: flex;
flex-direction: column;
position: relative;
width: 100%;
height: 100%;
`;

const Audio = styled(ReactAudioPlayer)`
position: absolute;
display: block;
padding: 10px;
bottom: 0;
left: 0;
width: 100%;
`;

// const Audio = styled.audio`
// position: absolute;
// display: block;
// padding: 10px;
// bottom: 0;
// left: 0;
// width: 100%;
// `;

//const Source = styled.source``;

const Background = styled.div`
height: 100%;
//background-image: ${props=>props.bg && `url(${props.bg})`};
background-color: teal;
`;

const Cover = styled.img`
height: 100%;
object-fit: cover;
`;
