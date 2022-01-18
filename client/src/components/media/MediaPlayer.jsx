import React from 'react'
import ReactPlayer from 'react-player';
import styled from 'styled-components';

const MediaPlayer = ({url}) => {
    return (
        <Container>
            <Player 
            height="100%"
            width="100%"
            url={url}
            controls={true}
            config={{
                youtube: {
                  playerVars: { 
                    showinfo: 1,
                    origin: 'https://www.youtube.com'
                    }
                },
                facebook: {
                  appId: '12345'
                }
              }}
            />
        </Container>
    )
}

export default MediaPlayer;

const Container = styled.div`
//position: relative;
overflow: hidden;
height: 100%;
width: 100%;
//padding-bottom: 56.25%;
`;

const Player = styled(ReactPlayer)`
//position: absolute;
top: 0;
left: 0;
`;
