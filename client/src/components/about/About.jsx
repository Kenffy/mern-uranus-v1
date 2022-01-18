import React from 'react';
import styled from 'styled-components';

const About = ({user}) => {
    return (
        <Container>
            {/* <div style={{boxSizing: "border-box"}}>
                <Image src={user.profile}/>  
            </div> */}
            <Image src={user.profile}/>
            <Title>About Me</Title>
            <Desc>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
            </Desc>
            <DashboardItems>
                <DashboardItem>
                    <ItemValue>{user.posts.length}</ItemValue>
                    <ItemName>Posts</ItemName>
                </DashboardItem>
                <DashboardItem>
                    <ItemValue>{user.followers.length}</ItemValue>
                    <ItemName>Followers</ItemName>
                </DashboardItem>
                <DashboardItem>
                    <ItemValue>{user.followings.length}</ItemValue>
                    <ItemName>Following</ItemName>
                </DashboardItem>
            </DashboardItems>
        </Container>
    )
}

export default About;

const Container = styled.div`
margin-top: 30px;
padding: 10px 15px;
width: 100%;
border-radius: 0px;
font-size: 16px;
color: #444;
border: 1px solid rgba(0,0,0,0.1);
box-shadow: 0px 1px 1px rgba(0,0,0,0.01);
display: flex;
flex-direction: column;
`;

const Title = styled.h2`
color: #444;
text-align: center;
font-weight: 600;
margin-top: 20px;
@media screen and (max-width: 768px) {
    font-size: 24px;
}
@media screen and (max-width: 580px) {
    font-size: 22px;
}
`;

const Image = styled.img`
height: 250px;
width: 100%;
object-fit: cover;
align-content: center;
margin-top: 20px;
@media screen and (max-width: 1024px) {
    height: 240px;
}
@media screen and (max-width: 768px) {
    height: 240px;
    object-fit: contain;
}
@media screen and (max-width: 580px) {
    height: 200px;
    object-fit: contain;
}
`;

const Desc = styled.span`
text-align: center;
padding: 20px 0px;
//word-spacing: 1px;
//letter-spacing: 0.6px;
display: -webkit-box;
-webkit-box-orient: vertical;
-webkit-line-clamp: 10;
overflow: hidden;
`;

const DashboardItems = styled.div`
padding: 5px 0px;
display: flex;
align-items: center;
justify-content: center;
border-top: 1px solid rgba(0,0,0,0.2);
`;

const DashboardItem = styled.div`
padding: 5px 15px;
display: flex;
flex-direction: column;
align-items: center;
justify-content: space-between;
cursor: pointer;
border-radius: 5px;
&:hover{
    background-color: rgba(0,0,0,0.05);
}
`;

const ItemName = styled.span`
color: #444;
font-size: 14px;
margin-top: 2px;
@media screen and (max-width: 768px) {
    font-size: 13px;
}
`
const ItemValue = styled.h3`
color: #444;
@media screen and (max-width: 768px) {
    font-size: 18px;
}
`;
