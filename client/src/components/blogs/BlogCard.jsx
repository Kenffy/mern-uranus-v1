import React from 'react';
import { Avatar } from '@material-ui/core';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Socials from './Socials';


const BlogCard = ({currUser, authUser, handleFollow}) => {
    const isfriend = currUser?.followers.includes(authUser._id);

    const CoverUrl = process.env.REACT_APP_COVERS;
    const ProfileUrl = process.env.REACT_APP_PROFILES;
    return (
        <Container>
            <ImageContainer>
                <CoverImage src={currUser?.cover.includes("http")? currUser?.cover: CoverUrl+currUser?.cover} />
                <ProfileImage>
                    <Link to={`/profile/${currUser._id}`}
                    style={{textDecoration:"none", 
                            color:"inherit"}}>
                        <BlogAvatar src={currUser?.profile.includes("http")? currUser?.profile : ProfileUrl+currUser?.profile}/>
                    </Link>
                </ProfileImage>
                <Link to={`/profile/${currUser?._id}`}
                style={{textDecoration:"none", 
                        color:"inherit"}}>
                    <BlogName>{currUser?.username}</BlogName>
                </Link>
            </ImageContainer>
            <InfoWrapper>
                <Title>About Me</Title>
                <Description>
                    {currUser.description}
                </Description>
            </InfoWrapper>
            <Dashboard>
                <Item>
                    <ItemValue>{currUser.posts.length}</ItemValue>
                    <ItemName>Posts</ItemName>
                </Item>
                <Item followers="followers">
                    <ItemValue>{currUser.followers.length}</ItemValue>
                    <ItemName>Followers</ItemName>
                </Item>
                <Item>
                    <ItemValue>{currUser.followings.length}</ItemValue>
                    <ItemName>Following</ItemName>
                </Item>
            </Dashboard>
            <SocialItems>
                {Socials.map((item) => (
                    <SocialItem key={item.id}>
                        {item.icon}
                    </SocialItem>
                ))}
            </SocialItems>
            <OptionWrapper>
                <Button onClick={()=>handleFollow(currUser._id, isfriend)}>
                    {!isfriend? "FOLLOW" : "UNFOLLOW"}
                </Button>
            </OptionWrapper>
        </Container>
    )
}

export default BlogCard;

const Container = styled.div`
width: 100%;
background-color: white;
border: 3px solid rgba(0,0,0,0.2);
box-shadow: 0px 1px 1px rgba(0,0,0,0.3);
border-radius: 10px;
overflow: hidden;
cursor: pointer;
z-index: 100;
&:hover{
    box-shadow: 0px 5px 5px rgba(0,0,0,0.2);
}
@media screen and (max-width: 580px){
    border: 2px solid rgba(0,0,0,0.2);
}
`;

const ImageContainer = styled.div`
position: relative;
height: auto;
overflow: hidden;
`;

const CoverImage = styled.div`
height: 130px;
width: 100%;
background-image: ${props=> `linear-gradient(transparent, rgba(0,0,0,0.5)), url(${props.src})`};
background-position: center;
background-repeat: no-repeat;
background-size: cover;
background-color: teal;
@media screen and (max-width: 580px){
    height: 90px;;   
}
`;

const ProfileImage = styled.div`
position: absolute;
width: 100%;
top: 20%;
display: flex;
align-items: center;
justify-content: center;
@media screen and (max-width: 580px){
    top: 25%;   
}
`;

const BlogAvatar = styled(Avatar)`
height: 130px !important;
width: 130px !important;
border: 3px solid white;
background-color: white;
cursor: pointer;
z-index: 100;
@media screen and (max-width: 580px){
    height: 90px !important;
    width: 90px !important;   
}
`;

const BlogName = styled.span`
font-size: 22px;
font-weight: 600;
color: #444;
width: 100%;
margin-top: 3.5rem;
margin-bottom: .5rem;
text-align: center;
display: -webkit-box;
-webkit-box-orient: vertical;
-webkit-line-clamp: 1;
overflow: hidden;
@media screen and (max-width: 580px){
    font-size: 16px;
    margin-top: 2.5rem; 
}
`;

const InfoWrapper = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
padding: 0px 20px;
margin-top: 10px;
width: 100%;
@media screen and (max-width: 580px){
    margin: 0;   
}
`;

const Title = styled.span`
font-size: 15px;
color: #444;
margin-bottom: 10px;
font-weight: 600;
display: none;
`;

const Description = styled.span`
//font-size: 14px;
color: #444;
display: -webkit-box;
-webkit-box-orient: vertical;
-webkit-line-clamp: 2;
overflow: hidden;
margin-bottom: 10px;
@media screen and (max-width: 580px){
    display: none;   
}
`;

const SocialItems = styled.div`
display: flex;
align-items: center;
justify-content: center;
padding: 5px 10px;
@media screen and (max-width: 580px){

}
`
const SocialItem = styled.div`
color: #555;
height: 20px;
width: 20px;
margin: 4px 2px;
&:hover{
    color: teal;
}
`

const OptionWrapper = styled.div`
padding: 0px 20px;
display: flex;
justify-content: space-around;
`;

const Button = styled.button`
padding: 8px;
margin-top: 6px;
margin-bottom: 20px;
border: 3px solid teal;
border-radius: 45px;
cursor: pointer;
color: teal;
background-color: white;
font-weight: 500;
width: 50%;
&:hover{
    color: white;
    background-color: teal;
    transition: 0.3s all;
}
@media screen and (max-width: 580px){
    width: 90%;  
    margin-top: 0px;
    padding: 5px;
    border-radius: 25px;
    margin-bottom: 10px; 
    border: 2px solid teal;
}
`;

const Dashboard = styled.div`
margin-top: 0px;
padding: 0px 20px;
display: flex;
align-items: center;
justify-content: center;
`;

const Item = styled.div`
display: flex;
align-items: center;
flex-direction: column;
justify-content: space-between;
margin: 0px 6px;
@media screen and (max-width: 580px){
    display: ${props=>props?.followers? "flex": "none"};
    flex-direction: row;
    gap: 5px;
}
`;

const ItemName = styled.span`
color: #444;
font-size: 10px;
@media screen and (max-width: 580px){
    font-size: 14px;
    font-weight: 500;
}
`;

const ItemValue = styled.span`
font-size: 18px;
font-weight: 600;
color: #444;
@media screen and (max-width: 580px){
    font-size: 14px;
    font-weight: 500;
}
`;

