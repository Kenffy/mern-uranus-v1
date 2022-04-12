import React from 'react';
import { Avatar } from '@material-ui/core';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Socials from './Socials';


const UBlog = ({currUser}) => {

    const CoverUrl = process.env.REACT_APP_COVERS;
    const ProfileUrl = process.env.REACT_APP_PROFILES;
    return (
        <Container>
            <ImageContainer>
                <CoverImage src={currUser?.cover.includes("http")? currUser?.cover: CoverUrl+currUser?.cover} />
                <ProfileImage>
                    <Link to={`/profile/${currUser?._id}`}
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
                    {currUser?.description}
                </Description>
            </InfoWrapper>
            <Dashboard>
                <Item>
                    <ItemValue>{currUser?.posts.length}</ItemValue>
                    <ItemName>Posts</ItemName>
                </Item>
                <Item>
                    <ItemValue>{currUser?.followers.length}</ItemValue>
                    <ItemName>Followers</ItemName>
                </Item>
                <Item>
                    <ItemValue>{currUser?.followings.length}</ItemValue>
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
                <Button to={`/profile/${currUser?._id}`}>
                    EXPLORE
                </Button>
            </OptionWrapper>
        </Container>
    )
}

export default UBlog;

const Container = styled.div`
min-width: 10rem;
background-color: white;
border: 1px solid rgba(0,0,0,0.1);
box-shadow: 0px 1px 1px rgba(0,0,0,0.01);
border-radius: 0px;
overflow: hidden;
cursor: pointer;
&:hover{
    box-shadow: 0px 5px 5px rgba(0,0,0,0.2);
}
`;

const ImageContainer = styled.div`
position: relative;
height: auto;
`;

const CoverImage = styled.img`
height: 120px;
width: 100%;
object-fit: cover;
background-color: teal;
`;
const ProfileImage = styled.div`
position: absolute;
top: 50%;
left: 20px;
`;

const BlogAvatar = styled(Avatar)`
height: 90px !important;
width: 90px !important;
border: 3px solid white;
cursor: pointer;
`;

const BlogName = styled.span`
position: absolute;
top: 120px;
left: 115px;
padding: 5px;
font-size: 16px;
font-weight: 600;
color: #444;
width: 75%;
display: -webkit-box;
-webkit-box-orient: vertical;
-webkit-line-clamp: 1;
overflow: hidden;
`;

const InfoWrapper = styled.div`
display: flex;
flex-direction: column;
padding: 0px 20px;
margin-top: 50px;
`;

const Title = styled.span`
font-size: 15px;
color: #444;
margin-bottom: 10px;
font-weight: 600;
`;

const Description = styled.span`
font-size: 14px;
color: #444;
display: -webkit-box;
-webkit-box-orient: vertical;
-webkit-line-clamp: 2;
overflow: hidden;
margin-bottom: 10px;
`;

const SocialItems = styled.div`
display: flex;
align-items: center;
justify-content: center;
padding: 5px 10px;
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

const Button = styled(Link)`
text-decoration: none;
padding: 8px 20px;
border-radius: 5px;
color: white;
background-color: teal;
margin: 10px 0;
opacity: 0.8;
cursor: pointer;
&:hover{
    opacity: 1;
    transition: .3s all ease;
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
`;

const ItemName = styled.span`
color: #444;
font-size: 10px;
`;

const ItemValue = styled.span`
font-size: 18px;
font-weight: 600;
color: #444;
`;

