import { Avatar } from '@material-ui/core';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Socials from './Socials';


const BlogCard = ({currUser, authUser, handleFollow}) => {
    const isfriend = currUser.followers.includes(authUser._id);
    return (
        <Container>
            <ImageContainer>
                <CoverImage src={currUser.cover} />
                <ProfileImage>
                    <Link to={`/profile/${currUser._id}`}
                    style={{textDecoration:"none", 
                            color:"inherit"}}>
                        <BlogAvatar src={currUser.profile}/>
                    </Link>
                </ProfileImage>
                <Link to={`/profile/${currUser._id}`}
                style={{textDecoration:"none", 
                        color:"inherit"}}>
                    <BlogName>{currUser.username}</BlogName>
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
                <Item>
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
border: 1px solid rgba(0,0,0,0.1);
box-shadow: 0px 1px 1px rgba(0,0,0,0.01);
border-radius: 0px;
overflow: hidden;
cursor: pointer;
z-index: 100;
&:hover{
    box-shadow: 0px 5px 5px rgba(0,0,0,0.2);
}
`;

const ImageContainer = styled.div`
position: relative;
height: auto;
`;

const CoverImage = styled.img`
height: 100px;
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
z-index: 100;
`;

const BlogName = styled.span`
position: absolute;
top: 100px;
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

const Button = styled.button`
padding: 10px;
margin-top: 6px;
margin-bottom: 20px;
border: none;
border-radius: 3px;
cursor: pointer;
color: white;
background-color: teal;
font-weight: 500;
width: 100%;
&:hover{
    opacity: 0.8;
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
//text-transform: uppercase;
`;

const ItemValue = styled.span`
font-size: 18px;
font-weight: 600;
color: #444;
`;

