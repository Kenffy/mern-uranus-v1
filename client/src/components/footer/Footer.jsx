import React from 'react';
import styled from 'styled-components';
import { Container } from '../../globaleStyles';

const Footer = () => {
    return (
        <FooterContainer>
            <FooterWrapper>
                <Title>Uranus © 2021 copyright All rights reserved</Title>
            </FooterWrapper>
        </FooterContainer>
    )
}

export default Footer;

const FooterContainer = styled.div`
width: 100%;
padding: 2rem;
margin-top: 2rem;
background-color: teal;
`;

const FooterWrapper = styled(Container)`
display: flex;
align-items: center;
justify-content: center;
${Container}
`;

const Title = styled.span`
color: white;
text-align: center;
@media screen and (max-width: 580px){
    font-size: 12px;
}
`;
