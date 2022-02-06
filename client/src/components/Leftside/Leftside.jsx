import React from 'react';
import { Avatar } from "@material-ui/core";
import { Link } from "react-router-dom";
import styled from "styled-components";
import pic5 from "../../assets/images/covers/pic5.jpg";

export default function Leftside() {
    return (
        <Container>
            <ProfileContainer>
                <ImageContainer>
                    <CoverImage src={pic5}/>
                    <ProfileImage>
                        <Link to="/profile/dertzhhkkollhjbg"
                        style={{textDecoration:"none", color:"inherit"}}>
                            <Avatar style={{
                            height: "100%",
                            width: "100%"
                        }}/>
                        </Link>
                    </ProfileImage>
                </ImageContainer>
                <ProfileInfos>
                    <Link to="/profile/dertzhhkkollhjbg"
                    style={{textDecoration:"none", color:"inherit"}}>
                        <Username>Marius Kenfack</Username>
                    </Link>
                    <Description>Student(in), Technische Hochschule Mittelhessen</Description>
                </ProfileInfos>
            </ProfileContainer>
            <DashboardContainer>
                <DashboardTitle>Dashboard</DashboardTitle>
                <DashboardItems>
                    <DashboardItem>
                        <ItemName>Posts</ItemName>
                        <ItemValue>23</ItemValue>
                    </DashboardItem>
                    <DashboardItem>
                        <ItemName>Followers</ItemName>
                        <ItemValue>556</ItemValue>
                    </DashboardItem>
                    <DashboardItem>
                        <ItemName>Following</ItemName>
                        <ItemValue>12</ItemValue>
                    </DashboardItem>
                </DashboardItems>
            </DashboardContainer>
        </Container>
    )
};

const Container = styled.div`
display: flex;
align-content: center;
flex-direction: column;
@media screen and (max-width: 580px) {
    flex: 1;
    justify-content: center;
    margin-right: 0px;
    margin-left: 0px;
}
`
const ProfileContainer = styled.div`
margin-top: 90px;
margin-right: 20px;
margin-left: 20px;
width: 180px;
height: 200px;
border-radius: 10px;
background-color: white;
box-shadow: 0px 1px 3px rgba(0,0,0,0.5);
@media screen and (max-width: 580px) {
    width: 100%;
    margin-top: 90px;
    margin-right: 0px;
    margin-left: 0px;
}
`
const ImageContainer = styled.div`
position: relative;
display: flex;
align-items: center;
justify-content: center;
`
const CoverImage = styled.img`
height: 70px;
width: 100%;
border-top-left-radius: 5px;
border-top-right-radius: 5px;
object-fit: cover;
`
const ProfileImage = styled.div`
position: absolute;
top: 60%;
height: 75px;
width: 75px;
border-radius: 50%;
align-items: center;
justify-content: center;
border: 3px solid white;
`
const ProfileInfos = styled.div`
display: flex;
flex-direction: column;
align-items: center;
margin-top: 60px;
margin-bottom: 30px;
`
const Username = styled.span`
color: #444;
font-weight: 600;
padding: 0px 15px;
text-align: center;
`
const Description = styled.span`
color: #444;
font-size: 13px;
margin-top: 10px;
padding: 0px 15px;
text-align: center;
display: -webkit-box;
-webkit-box-orient: vertical;
-webkit-line-clamp: 2;
overflow: hidden;
`

const DashboardContainer = styled.div`
display: flex;
flex-direction: column;
margin: 20px;
width: 180px;
border-radius: 10px;
background-color: white;
box-shadow: 0px 1px 3px rgba(0,0,0,0.5);
@media screen and (max-width: 580px) {
    width: 100%;
    margin-top: 20px;
    margin-right: 0px;
    margin-left: 0px;
}
`
const DashboardTitle = styled.span`
padding: 10px 20px;
color: #444;
border-bottom: 1px solid rgba(0,0,0,0.2);
font-weight: 600;
`
const DashboardItems = styled.div`
display: flex;
flex-direction: column;
`
const DashboardItem = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
padding: 10px 20px;
border-bottom: 1px solid rgba(0,0,0,0.1);
cursor: pointer;
&:hover{
    background-color: rgba(0,0,0,0.05);
}
`
const ItemName = styled.span`
font-size: 13px;
color: #444;
`
const ItemValue = styled.span`
font-size: 13px;
color: #444;
`