import React from 'react';
import styled from 'styled-components';
import { Container } from '../../globaleStyles';

const Footer = () => {
    return (
        <FooterContainer>
            <Title>Uranus © 2021 copyright All rights reserved</Title>
        </FooterContainer>
    )
}

export default Footer;

const FooterContainer = styled(Container)`
height: 20vh;
background-color: #444;
display: flex;
align-items: center;
justify-content: center;
${Container}
`;

const Title = styled.span`
color: white;
@media screen and (max-width: 580px){
    font-size: 14px;
}
`;
