
import React from 'react';
import { useState, useContext, useEffect } from 'react'
import styled from 'styled-components';
import PostList from '../../components/posts/PostList';
import Rightside from '../../components/Rightside/Rightside';
import { Container } from '../../globaleStyles';
import PostSlider from '../../components/slider/PostSlider';
import { useLocation } from 'react-router';
import { CheckCircle, Settings} from '@material-ui/icons';
//import {Verified} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { Context } from '../../context/Context';
import {CategoryList} from "../../components/Categories/CategoryList";
import { followUser, unfollowUser } from '../../context/Action';
import * as api from "../../services/apiServices";
//import Categories from '../../components/Categories/Categories';
import Tabs from '../../components/tabs/Tabs';
import Following from './Following';
import Followers from './Followers';
import CategorySlider from '../../components/Categories/CategorySlider';

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
    const populars = [];
    //const populars = posts.sort((a,b)=> b.vues.length - a.vues.length).limit(5);

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
                <CoverImage src={currUser?.cover} />
                <ProfileWrapper>
                    <ProfileImage src={currUser?.profile}/>
                </ProfileWrapper>
            </ImageContainer>

            <ContentWrapper>

                <InfoWrapper>
                    <BlogNameInfos>
                        <BlogName>{currUser?.username.slice(0,50)}</BlogName>
                        <CertifyIcon />
                    </BlogNameInfos>
                    <BlogNameInfos>
                    {AuthUser?._id === currUser?._id?
                        <>
                        <Button>Edit Profile</Button>
                        <SettingIcon style={{marginRight: "10px"}}/>
                        </>
                        :
                        <Button style={{marginRight: "10px"}}
                        onClick={handleFollow}>
                            {isFriend? "Unfollow" : "Follow"}
                        </Button>
                    }
                    </BlogNameInfos>
                </InfoWrapper>

                <DashWrapper>
                    <DashItem>
                        <ItemValue>{currUser?.posts? currUser?.posts.length : 0}</ItemValue>
                        <ItemLabel>posts</ItemLabel>
                    </DashItem>
                    <DashItem>
                        <ItemValue>{currUser?.followers? currUser?.followers.length : 0}</ItemValue>
                        <ItemLabel>followers</ItemLabel>
                    </DashItem>
                    <DashItem>
                        <ItemValue>{currUser?.followings? currUser?.followings.length : 0}</ItemValue>
                        <ItemLabel>following</ItemLabel>
                    </DashItem>
                </DashWrapper>
            
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
            
                <Tabs tabIndex={tabIndex} setTabIndex={setTabIndex}/>
                {tabIndex === 1 &&
                <CategorySlider items={categories} 
                setFilter={setCurrCategory}/>}

                {populars.length > 0 &&
                <PopularPosts>
                    <PostSlider posts={[]}/>
                </PopularPosts>
                }

                <PostWrapper>
                    <PostLeft>
                        <Content active={(tabIndex===1)}>
                            <PostList userId={userId} filter={category}/>
                        </Content>
                        <Content active={(tabIndex===2)}>
                            <Followers userId={userId}/>
                        </Content>
                        <Content active={(tabIndex===3)}>
                            <Following userId={userId}/>
                        </Content>
                    </PostLeft>
                    <PostRight>
                        <Rightside posts={[]} profile={currUser}/>
                    </PostRight>
                </PostWrapper>
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

const CoverImage = styled.img`
height: 700px;
width: 100%;
object-fit: cover;
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

const ProfileImage = styled.img`
height: 250px;
width: 250px;
border-radius: 5px;
object-fit: cover;
background-color: white;
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

const InfoWrapper = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
margin-top: 30px;
`;

const BlogNameInfos = styled.div`
display: flex;
align-items: center;
`;

const DashWrapper = styled.div`
display: flex;
align-items: center;
margin-top: 10px;
`;

const DashItem = styled.div`
display: flex;
align-items: center;
margin-right: 20px;
cursor: pointer;
@media screen and (max-width: 1024px) {
    font-size: 16px;
}
@media screen and (max-width: 768px) {
    font-size: 15px;
}
@media screen and (max-width: 580px) {
    font-size: 14px;
}
`;

const ItemLabel = styled.span`
margin-left: 5px;
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

const BlogName = styled.span`
font-size: 40px;
font-weight: 600;
color: teal;
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
color: teal;
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
background-color: teal;
color: white;
cursor: pointer;
opacity: 0.6;
text-transform: uppercase;
&:hover{
    opacity: 1;
    transition: 0.5s all ease;
}
@media screen and (max-width: 580px) {
    font-size: 10px;
    //margin: 0px 3px;
    padding: 8px 10px;
}
`;

const SettingIcon = styled(Settings)`
padding: 4px !important;
height: 35px !important;
width: 35px !important;
//margin-right: 20px;
margin-left: 6px;
border-radius: 5px;
opacity: 0.6;
color: white;
background-color: teal;
cursor: pointer;
&:hover{
    opacity: 1;
    transition: 0.5s all ease;
}
@media screen and (max-width: 580px) {
    height: 30px !important;
    width: 30px !important;
    margin-right: 0px;
    margin-left: 6px;
}
`;

const PopularPosts = styled.div`
margin-top: 10px;
width: 100%;
height: 700px;
display: flex;
@media screen and (max-width: 1024px) {
    padding: 0;
    height: 500px;
}
@media screen and (max-width: 768px) {
    padding: 0;
    height: 400px;
}
@media screen and (max-width: 580px) {
    padding: 0;
    height: 260px;
}
`;

const PostWrapper = styled.div`
display: flex;
@media screen and (max-width: 980px) {
    flex-direction: column;
}
`;

const PostLeft = styled.div`
flex: 4;
padding: 0px 10px;
@media screen and (max-width: 1024px) {
    //padding: 0px 15px;
}
@media screen and (max-width: 768px) {
    flex: 3;
    //padding: 0px 20px;
}
@media screen and (max-width: 580px) {
    flex: 1;
    padding: 0px;
}
`;

const Content = styled.div`
margin-top: 10px;
//padding: 5px 10px;
display: ${props=>props.active ? "block": "none"};;
@media screen and (max-width: 1024px) {
    //padding: 0px 15px;
}
@media screen and (max-width: 768px) {
    //padding: 0px 20px;
}
@media screen and (max-width: 580px) {
    //padding: 5px;
}
`;

const PostRight = styled.div`
flex: 2;
overflow-y: hidden;
top: 70px;
padding: 0px 10px;
@media screen and (max-width: 768px) {
    flex: 2;
}
@media screen and (max-width: 580px) {
    flex: 1;
    padding: 0px;
}
`;


