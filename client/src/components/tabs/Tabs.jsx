import React from 'react';
//import { useState } from "react";
import styled from "styled-components";
//import Categories from "../Categories/Categories";

const Tabs = ({tabIndex, setTabIndex}) => {

    return (
        <Container>
            <HeaderWrapper>
                <Tab onClick={()=>setTabIndex(1)}
                     active={(tabIndex === 1)}>
                    <TabLabel>Posts</TabLabel>
                </Tab>
                <Tab onClick={()=>setTabIndex(2)}
                     active={(tabIndex === 2)}>
                    <TabLabel>Followers</TabLabel>
                </Tab>
                <Tab onClick={()=>setTabIndex(3)}
                     active={(tabIndex === 3)}>
                    <TabLabel>Following</TabLabel>
                </Tab>
            </HeaderWrapper>
            {/* <ContenWrapper>
                <Content active={(tabIndex===1)}>
                    <h2>test</h2>
                </Content>
                <Content active={(tabIndex===2)}>
                    <h3>Content 2</h3>
                </Content>
                <Content active={(tabIndex===3)}>
                    <h3>Content 3</h3>
                </Content>
            </ContenWrapper> */}
            
        </Container>
    )
}

export default Tabs;

const Container = styled.div`
width: 100%;
display: flex;
flex-direction: column;
margin-top: 30px;
`;

const HeaderWrapper = styled.div`
display: flex;
align-items: center;
height: 40px;
padding: 0px 50px;
@media screen and (max-width: 1024px) {
    padding: 0px 40px;
}
@media screen and (max-width: 768px) {
    padding: 0px 30px;
}
@media screen and (max-width: 580px) {
    height: 35px;
    padding: 0px 10px;
}
`;

const Tab = styled.div`
height: 100%;
padding: 0px 30px;
display: flex;
align-items: center;
justify-content: center;
border: 1px solid rgba(0,0,0,0.1);
border-top: ${props=>props.active ? `2px solid teal`: `none`};
border-bottom: ${props=>props.active ? `white`: `none`};
cursor: pointer;
color: #555;
background-color: ${props=>props.active ? `white`: `rgba(0,0,0,0.06);`};
`;

const TabLabel = styled.span`

`;

// const ContenWrapper = styled.div`
// @media screen and (max-width: 1024px) {
//     padding: 0px 40px;
// }
// @media screen and (max-width: 768px) {
//     padding: 0px 30px;
// }
// @media screen and (max-width: 580px) {
//     padding: 0px 10px;
// }
// `;

// const Content = styled.div`
// margin-top: 10px;
// padding: 5px;
// display: ${props=>props.active ? "block": "none"};;
// `;