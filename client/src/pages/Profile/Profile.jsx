
import React from 'react';
import { useState, useContext, useEffect } from 'react'
import styled from 'styled-components';
import PostList from '../../components/posts/PostList';
import { Container } from '../../globaleStyles';
import { useLocation } from 'react-router';
import { CameraAltRounded, CheckCircle} from '@material-ui/icons';
import { Link } from 'react-router-dom';
import { Context } from '../../context/Context';
import {CategoryList} from "../../components/Categories/CategoryList";
import { followUser, unfollowUser } from '../../context/Action';
import * as api from "../../services/apiServices";
import Following from './Following';
import Followers from './Followers';
import CategorySelect from '../../components/dropdown/CategorySelect';
import Socials from '../../components/Rightside/Socials';

const Profile = () => {

    const location = useLocation();
    const userId = location.pathname.split("/")[2];

    const categories = CategoryList;
    const [category, setCurrCategory] = useState(CategoryList[0]);
    const [isFriend, setIsFriend] = useState(false);
    const [currUser, setCurrUser] = useState(null);
    const [tabIndex, setTabIndex] = useState(1);

    const {auth, dispatch} = useContext(Context);

    useEffect(()=>{
        const loadData = async() =>{
            dispatch({ type: "ACTION_START"});
            try {
                const creds = JSON.parse(localStorage.getItem("user"));
                if(creds.id === userId){
                    setCurrUser(auth);
                }else{
                    const usr = await api.getUser(userId, creds.accessToken);
                    usr.data && setCurrUser(usr.data);
                    setIsFriend(auth.followings.includes(usr.data?._id));
                }
                dispatch({ type: "ACTION_SUCCESS"});
            } catch (error) {
                console.log(error);
                dispatch({ type: "ACTION_FAILED"});
            } 
        }
        loadData();
    },[dispatch, auth, userId]);

    const AuthUser = auth;

    const handleFollow = async()=>{
        if(!isFriend){
            const res = await followUser(dispatch, userId);
            res.data && setCurrUser(res.data);
        }else{
            const res = await unfollowUser(dispatch, userId);
            res.data && setCurrUser(res.data);
        }
    }

    return (
        <ProfileContainer>
            <ImageContainer>
                <CoverWrapper>
                    <CoverImage src={currUser?.cover} />
                    <CoverCameraIcon />
                </CoverWrapper>
                
                <ProfileWrapper>
                    <ProfileImageWrapper>
                        <ProfileImage src={currUser?.profile}/>
                        <CameraIcon />
                    </ProfileImageWrapper>
                    
                    <NameWrapper>
                        <BlogName>{currUser?.username.slice(0,50)}<CertifyIcon /></BlogName>
                        {AuthUser?._id !== currUser?._id &&
                        <Button style={{marginRight: "10px"}}
                        onClick={handleFollow}>
                            {isFriend? "Unfollow" : "Follow"}
                        </Button>}
                    </NameWrapper>
                </ProfileWrapper>
            </ImageContainer>
            <MenuWrapper>
                <ProfileMenu>
                    <DashItem onClick={()=>setTabIndex(1)}
                     active={(tabIndex === 1)}>
                        <ItemLabel>Posts</ItemLabel>
                    </DashItem>
                    <DashItem onClick={()=>setTabIndex(2)}
                     active={(tabIndex === 2)}>
                        <ItemLabel>Followers</ItemLabel>
                    </DashItem>
                    <DashItem onClick={()=>setTabIndex(3)}
                     active={(tabIndex === 3)}>
                        <ItemLabel>Following</ItemLabel>
                    </DashItem>
                    <DashItem onClick={()=>setTabIndex(4)}
                     active={(tabIndex === 4)}>
                        <ItemLabel>About</ItemLabel>
                    </DashItem>
                    {AuthUser?._id === currUser?._id &&
                    <DashItem onClick={()=>setTabIndex(5)}
                     active={(tabIndex === 5)}>
                        <ItemLabel>Settings</ItemLabel>
                    </DashItem>}
                </ProfileMenu>
            </MenuWrapper>

            <ContentWrapper>

                <Content active={(tabIndex===1)}>
                    <ContentLeft>
                        <LeftWrapper>
                            <CardWrapper>
                                <CardTiTle>Dashboard</CardTiTle>
                                <DashWrapper>
                                    <DashboardItem>
                                        <ItemValue>{currUser?.posts? currUser?.posts.length : 0}</ItemValue>
                                        <ItemLabel>posts</ItemLabel>
                                    </DashboardItem>
                                    <DashboardItem>
                                        <ItemValue>{currUser?.followers? currUser?.followers.length : 0}</ItemValue>
                                        <ItemLabel>followers</ItemLabel>
                                    </DashboardItem>
                                    <DashboardItem>
                                        <ItemValue>{currUser?.followings? currUser?.followings.length : 0}</ItemValue>
                                        <ItemLabel>following</ItemLabel>
                                    </DashboardItem>
                                </DashWrapper>
                            </CardWrapper>

                            <CardWrapper>
                                <CardTiTle>Follow Me</CardTiTle>
                                <SocialItems>
                                    {Socials.map((item) => (
                                        <SocialItem key={item.id}>
                                            <SocialLink target="_blank" href={item.link}>
                                                {item.icon}
                                            </SocialLink>
                                        </SocialItem>
                                    ))}
                                </SocialItems>
                            </CardWrapper>
                        </LeftWrapper>
                    </ContentLeft>
                    <ContentRight>
                        <CategorySelect 
                            categories={categories} 
                            value={category}
                            setCurrCategory={setCurrCategory}/>
                        <PostList userId={userId} filter={category}/>
                    </ContentRight>
                </Content>
                <Content active={(tabIndex===2)}>
                    <ContentLeft>
                        
                    </ContentLeft>
                    <ContentRight>
                        <Followers userId={userId}/>
                    </ContentRight>
                </Content>
                <Content active={(tabIndex===3)}>
                    <ContentLeft>
                        
                    </ContentLeft>
                    <ContentRight>
                        <Following userId={userId}/>
                    </ContentRight>
                </Content>
                <Content active={(tabIndex===4)}>
                    <DescWrapper>
                        <ButtonLink to="/profile-about-me">
                            <Title>About Me</Title>
                        </ButtonLink>
                        <Description>
                            {currUser?.description.slice(0,300)}
                            {currUser?.description.length > 300 &&
                            <ButtonLink to="/profile-about-me">
                                <ReadMore> ...continue</ReadMore>
                            </ButtonLink>}
                        </Description>
                    </DescWrapper>
                </Content>
                <Content active={(tabIndex===5)}>
                    <h3>Settings</h3>
                </Content>
            </ContentWrapper>
        </ProfileContainer>
    )
}

export default Profile;

const ProfileContainer = styled(Container)`
display: flex;
flex-direction: column;
background-color: white;
min-height: 100vh;
${Container}
`;

const ImageContainer = styled.div`
margin-top: 60px;
width: 100%;
position: relative;
height: auto;
`;

const CoverWrapper = styled.div`
position: relative;
`;

const CoverImage = styled.div`
height: 600px;
width: 100%;
background-image: ${props=> `linear-gradient(transparent, rgba(0,0,0,0.5)), url(${props.src})`};
background-position: center;
background-repeat: no-repeat;
background-size: cover;
background-color: teal;
@media screen and (max-width: 1024px) {
    padding: 0;
    height: 500px;
}
@media screen and (max-width: 768px) {
    padding: 0;
    height: 450px;
}
@media screen and (max-width: 580px) {
    padding: 0;
    height: 250px;
}
`;

const ProfileWrapper = styled.div`
position: absolute;
width: 100%;
bottom: -15px;
padding: 0px 100px;
display: flex;
align-items: center;
@media screen and (max-width: 1024px) {
    padding: 0px 50px;
}
@media screen and (max-width: 768px) {
    padding: 0px 30px;
}
@media screen and (max-width: 580px) {
    padding: 0px 20px;
}
`;

const NameWrapper = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
margin-left: 30px;
width: 75%;
color: white;
@media screen and (max-width: 580px) {
    margin-left: 10px;
}
`;

const ProfileImageWrapper = styled.div`
position: relative;
height: 250px;
width: 250px;
border-radius: 5px;
overflow: hidden;
box-shadow: 0px 1px 3px rgba(0,0,0,0.5);
@media screen and (max-width: 1024px) {
    height: 180px;
    width: 180px;
}
@media screen and (max-width: 768px) {
    height: 150px;
    width: 150px;
}
@media screen and (max-width: 580px) {
    height: 80px;
    width: 80px;
}

`;

const CameraIcon = styled(CameraAltRounded)`
position: absolute;
bottom: 0;
right: 0;
height: 30px !important;
width: 30px !important;
border-radius: 50%;
background-color: teal;
color: white;
padding: 4px;
margin: 2px;
cursor: pointer;
opacity: 0.6;
&:hover{
    opacity: 1;
    transition: 0.3s all ease;
}
@media screen and (max-width: 580px) {
    height: 20px !important;
    width: 20px !important;
}
`;

const CoverCameraIcon = styled(CameraAltRounded)`
position: absolute;
top: 5px;
right: 10px;
height: 40px !important;
width: 40px !important;
border-radius: 50%;
background-color: teal;
color: white;
padding: 5px;
margin: 2px;
cursor: pointer;
opacity: 0.6;
&:hover{
    opacity: 1;
    transition: 0.3s all ease;
}
@media screen and (max-width: 580px) {
    height: 30px !important;
    width: 30px !important;
}
`;


const ProfileImage = styled.img`
height: 100%;
width: 100%;
object-fit: cover;
`;

const MenuWrapper = styled.div`
width: 100%;
height: 80px;
position: relative;
border-bottom: 1px solid #555;
`;

const ProfileMenu = styled.div`
width: 100%;
position: absolute;
bottom: 0;
display: flex;
align-items: center;
justify-content: flex-end;
`;

const ContentWrapper = styled.div`
width: 100%;
padding: 0px 20px;
@media screen and (max-width: 1024px) {
    padding: 0px 10px;
}
@media screen and (max-width: 768px) {
    padding: 0px 10px;
}
@media screen and (max-width: 580px) {
    padding: 0px 5px;
}
`;


const DashWrapper = styled.div`
display: flex;
align-items: center;
width: 100%;
@media screen and (max-width: 580px) {
    justify-content: space-around;
}
`;

const DashboardItem = styled.div`
display: flex;
align-items: center;
padding: 15px 20px;
border-radius: 5px;
cursor: pointer;
color: #555;
@media screen and (max-width: 1024px) {
    font-size: 16px;
}
@media screen and (max-width: 768px) {
    font-size: 15px;
    padding: 10px 15px;
}
@media screen and (max-width: 580px) {
    font-size: 14px;
    padding: 10px 6px;
}
`;

const DashItem = styled.div`
display: flex;
align-items: center;
padding: 15px 20px;
cursor: pointer;
background-color: ${props=>props.active ? 'teal': 'white'};
color: ${props=>props.active ? 'white': 'teal'};
&:hover{
    border-top: 1px solid teal;
    transition: 0.3s all ease;
}
@media screen and (max-width: 1024px) {
    font-size: 16px;
}
@media screen and (max-width: 768px) {
    font-size: 15px;
    padding: 10px 15px;
}
@media screen and (max-width: 580px) {
    font-size: 14px;
    padding: 10px 6px;
}
`;

const ItemLabel = styled.span`
margin-left: 5px;
font-weight: 500;
color: inherit;
@media screen and (max-width: 580px) {
    font-size: 13px;
}
`;

const ItemValue = styled.span`
font-weight: bold;
@media screen and (max-width: 1024px) {
    font-size: 15px;
}
@media screen and (max-width: 768px) {
    font-size: 14px;
}
@media screen and (max-width: 580px) {
    font-size: 13px;
}
`;


const CardWrapper = styled.div`
margin: 15px 0px;
border-radius: 5px;
background-color: white;
border: 1px solid rgba(0,0,0,0.1);
-webkit-box-shadow: 3px 4px 9px -2px rgba(0,0,0,0.64); 
 box-shadow: 3px 4px 9px -2px rgba(0,0,0,0.64);
@media screen and (max-width: 580px) {
    width: 100%;
}
`
const CardTiTle = styled.h3`
display: flex;
padding: 10px 20px;
color: #444;
border-bottom: 1px solid rgba(0,0,0,0.2);
font-weight: 600;
@media screen and (max-width: 580px) {
    font-size: 15px;
}
`;

const SocialItems = styled.div`
display: flex;
align-items: center;
padding: 5px 20px;
`;

const SocialItem = styled.div`
color: #555;
height: 35px;
width: 35px;
margin-right: 5px;
&:hover{
    color: teal;
}
`;

const SocialLink = styled.a`
text-decoration: none;
color: inherit;
`;

const BlogName = styled.span`
font-size: 40px;
font-weight: 600;
color: inherit;
display: flex;
align-items: center;
@media screen and (max-width: 1024px) {
    font-size: 32px;
}
@media screen and (max-width: 768px) {
    font-size: 30px;
}
@media screen and (max-width: 580px) {
    font-size: 20px;
}
`;

const CertifyIcon = styled(CheckCircle)`
margin-left: 5px;
height: 30px !important;
width: 30px !important;
color: inherit;
@media screen and (max-width: 1024px) {
    height: 26px !important;
    width: 26px !important;
}
@media screen and (max-width: 768px) {
    height: 22px !important;
    width: 22px !important;
}
@media screen and (max-width: 580px) {
    height: 16px !important;
    width: 16px !important;
}
`;

const DescWrapper = styled.div`
margin-top: 30px;
width: 100%;
display: flex;
flex-direction: column;
`;

const ButtonLink = styled(Link)`
text-decoration: none;
color: inherit;
`;

const Title = styled.h3`

`;

const Description = styled.span`
margin-top: 10px;
`;

const ReadMore = styled.span`
color: teal;
font-size: 14px;
`;

const Button = styled.span`
//margin: 0px 3px;
padding: 10px 10px;
border-radius: 5px;
font-size: 12px;
border: 1px solid white;
background-color: transparent;
color: white;
cursor: pointer;
text-transform: uppercase;
&:hover{
    background-color: teal;
    transition: 0.5s all ease;
}
@media screen and (max-width: 580px) {
    font-size: 10px;
    //margin: 0px 3px;
    padding: 8px 10px;
}
`;


const Content = styled.div`
margin-top: 10px;
//padding: 5px 10px;
display: ${props=>props.active ? "flex": "none"};;
@media screen and (max-width: 1024px) {
    //padding: 0px 15px;
    flex-direction: column;
}
@media screen and (max-width: 768px) {
    //padding: 0px 20px;
    flex-direction: column;
}
@media screen and (max-width: 580px) {
    //padding: 5px;
    flex-direction: column;
}
`;

const ContentLeft = styled.div`
flex: 2;
display: flex;
flex-direction: column;
padding: 20px;
@media screen and (max-width: 580px) {
    padding: 0px;
}
`;

const ContentRight = styled.div`
flex: 4;
display: flex;
flex-direction: column;
padding: 0px 20px;
@media screen and (max-width: 580px) {
    padding: 0px;
}
`;

const LeftWrapper = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
`;




