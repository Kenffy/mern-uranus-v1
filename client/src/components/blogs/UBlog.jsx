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
            <Dashboard>
                <Item>
                    <ItemValue>{currUser?.followers.length}</ItemValue>
                    <ItemName>Followers</ItemName>
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
min-width: 5rem;
background-color: white;
border: 1px solid rgba(0,0,0,0.1);
box-shadow: 0px 1px 1px rgba(0,0,0,0.2);
border-radius: 10px;
overflow: hidden;
cursor: pointer;
&:hover{
    box-shadow: 0px 5px 5px rgba(0,0,0,0.3);
}
`;

const ImageContainer = styled.div`
position: relative;
height: auto;
`;

const CoverImage = styled.div`
height: 100px;
width: 100%;
background-image: ${props=> `linear-gradient(transparent, rgba(0,0,0,0.5)), url(${props.src})`};
background-position: center;
background-repeat: no-repeat;
background-size: cover;
background-color: teal;
`;
const ProfileImage = styled.div`
position: absolute;
width: 100%;
top: 30%;
display: flex;
align-items: center;
justify-content: center;
`;

const BlogAvatar = styled(Avatar)`
height: 90px !important;
width: 90px !important;
border: 3px solid white;
cursor: pointer;
`;

const BlogName = styled.span`
font-size: 16px;
font-weight: 600;
color: #444;
width: 100%;
margin-top: 2.5rem;
margin-bottom: .5rem;
text-align: center;
display: -webkit-box;
-webkit-box-orient: vertical;
-webkit-line-clamp: 1;
overflow: hidden;
`;

const SocialItems = styled.div`
display: flex;
align-items: center;
justify-content: center;
padding: 4px 10px;
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
margin-top: 10px;
margin-bottom: 20px;
opacity: 0.8;
cursor: pointer;
&:hover{
    opacity: 1;
    transition: .3s all ease;
}
@media screen and (max-width: 580px){
    font-size: 12px;
    padding: 5px 20px;
}
`;

const Dashboard = styled.div`
margin-top: 0px;
padding: 0px 20px;
display: flex;
align-items: center;
justify-content: center;
@media screen and (max-width: 580px){
  padding: 0 10px;
}
`;

const Item = styled.div`
display: flex;
gap: 5px;
align-items: center;
margin: 0px 6px;
@media screen and (max-width: 580px){
    margin: 0px 4px;
}
`;

const ItemName = styled.span`
color: #444;
font-size: 12px;
`;

const ItemValue = styled.span`
font-size: 12px;
//font-weight: 600;
color: #444;
`;

