import React from 'react';
import styled from 'styled-components';
import Select from 'react-select';

const SocialSelect = ({socials, value, setCurrSocial}) => {
    return (
        <Container>
            <Title>Social medias</Title>
            <Select options={socials} 
            value={value} 
            placeholder="-- Select Social --"
            onChange={(e)=>setCurrSocial(e)}/>
        </Container>
    )
}

export default SocialSelect;

const Container = styled.div`
padding: 10px 0px;
display: flex;
flex-direction: column;
width: 100%;
`;

const Title = styled.label`
font-size: 15px;
margin-bottom: 5px;
color: gray;
`;

