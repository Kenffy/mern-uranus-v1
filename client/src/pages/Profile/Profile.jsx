
import React from 'react';
import { useState, useContext, useEffect } from 'react'
import styled from 'styled-components';
import PostList from '../../components/posts/PostList';
import { Container } from '../../globaleStyles';
import { useLocation } from 'react-router';
import { CameraAltRounded, CheckCircle, Edit, Sort} from '@material-ui/icons';
import { Link } from 'react-router-dom';
import { Context } from '../../context/Context';
import {CategoryList} from "../../components/Categories/CategoryList";
import { followUser, unfollowUser } from '../../context/Action';
import * as api from "../../services/apiServices";
import Following from './Following';
import Followers from './Followers';
import CategorySelect from '../../components/dropdown/CategorySelect';
import Socials from '../../components/Rightside/Socials';
import ProfileCoverEdit from './ProfileCoverEdit';
import { v4 as uuidv4 } from 'uuid';
import EditProfile from './EditProfile';


const Profile = () => {

    const location = useLocation();
    const userId = location.pathname.split("/")[2];

    const sorts= [
        {"id": 1, "label": "By Date ASC", "type": "createdAt", "option": "asc"},
        {"id": 2, "label": "By Date DESC", "type": "createdAt", "option": "desc"},
        {"id": 3, "label": "By Category", "type": "category", "option": "asc"},
    ];

    const categories = CategoryList;
    const [category, setCurrCategory] = useState(CategoryList[0]);
    const [isFriend, setIsFriend] = useState(false);
    const [onCoverProfile, setOnCoverProfile] = useState(false);
    const [onEdit, setOnEdit] = useState(false);
    const [currUser, setCurrUser] = useState(null);
    const [file, setFile] = useState(null);
    const [tabIndex, setTabIndex] = useState(1);
    const [onSort, setOnSort] = useState(false);
    const [sort, setSort] = useState(sorts[1]);

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
                    setIsFriend(auth?.followings?.includes(usr.data?._id));
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

    const handleCoverFiles = (e)=>{
        const data = e.target.files[0];
        const newImage = {
            filename: uuidv4() + data.name,
            file: data,
            type: "Cover"
        };
        setFile(newImage);
        setOnCoverProfile(true);
    }

    const handleProfileFiles = (e)=>{
        const data = e.target.files[0];
        const newImage = {
            filename: uuidv4() + data.name,
            file: data,
            type: "Profile"
        };
        setFile(newImage);
        setOnCoverProfile(true);
    }

    const CoverUrl = process.env.REACT_APP_COVERS;
    const ProfileUrl = process.env.REACT_APP_PROFILES;

    const handleSort = (sort)=>{
        setSort(sort);
        setOnSort(false);
    }

    return (

        <ProfileContainer>

            {onEdit? 
            <EditProfile 
            dispatch={dispatch}
            user={currUser} 
            setOnEdit={setOnEdit}/>
            :
            <>
            <ProfileCoverEdit 
            onOpen={onCoverProfile} 
            setOnCoverProfile={setOnCoverProfile} 
            handleCoverFiles={handleCoverFiles}
            handleProfileFiles={handleProfileFiles}
            dispatch={dispatch}
            user={currUser}
            data={file}/>
            <ImageContainer>
                <CoverWrapper>
                    <CoverImage src={currUser?.cover.includes("http")? currUser?.cover: CoverUrl+currUser?.cover} />
                    <label htmlFor='cover-image'>
                        {AuthUser?._id === currUser?._id &&
                        <CoverCameraIcon />
                        }
                    </label>
                    <input 
                        id="cover-image" 
                        type="file"
                        accept=".jpg,.jpeg,.png"
                        style={{ display: "none" }} 
                        onChange={handleCoverFiles}
                    />
                </CoverWrapper>
                
                <ProfileWrapper>
                    <ProfileImageWrapper>
                        <ProfileImage src={currUser?.profile.includes("http")? currUser?.profile : ProfileUrl+currUser?.profile}/>
                        <label htmlFor='profile-image'>
                            {AuthUser?._id === currUser?._id && 
                            <CameraIcon />
                            }
                        </label>
                        <input 
                            id="profile-image" 
                            type="file"
                            accept=".jpg,.jpeg,.png"
                            style={{ display: "none" }} 
                            onChange={handleProfileFiles}
                        />
                    </ProfileImageWrapper>
                    
                    <NameWrapper>
                        <BlogName>{currUser?.username.slice(0,50)}<CertifyIcon /></BlogName>
                        {AuthUser?._id === currUser?._id ?
                        <Button onClick={()=>setOnEdit(true)}><EditIcon /> Edit</Button>
                        :
                        <Button style={{marginRight: "10px"}}
                        onClick={handleFollow}>
                            {isFriend? "Unfollow" : "Follow"}
                        </Button>}
                    </NameWrapper>
                </ProfileWrapper>
            </ImageContainer>

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

            <MenuWrapper>
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
            </MenuWrapper>

            <ContentWrapper>

                <Content active={(tabIndex===1)}>
                    <FilterWrapper>
                        <FilterButton onClick={()=>setOnSort(!onSort)}>
                            <Sort />
                            <FilterLabel>Sort</FilterLabel>
                            {onSort &&
                            <MenuOptions>
                                {sorts.map((sort)=>(
                                    <MenuItem key={sort?.id} onClick={()=>handleSort(sort)}>{sort?.label}</MenuItem>
                                ))}
                            </MenuOptions>
                            }
                        </FilterButton>
                        <CategorySelect 
                        categories={categories} 
                        value={category}
                        setCurrCategory={setCurrCategory}/>
                    </FilterWrapper>

                    <PostList userId={userId} filter={category} sort={sort}/>

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
                            {currUser?.description}
                        </Description>
                    </DescWrapper>
                </Content>
                <Content active={(tabIndex===5)}>
                    <SettingsWrapper>
                        <h3>Settings</h3>
                    </SettingsWrapper>
                </Content>
            </ContentWrapper>
            </>}
        </ProfileContainer>
    )
}

export default Profile;

const ProfileContainer = styled(Container)`
display: flex;
flex-direction: column;
background-color: white;
min-height: 100vh;
width: 100%;
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

const EditIcon = styled(Edit)`
height: 15px !important;
width: 15px !important;
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
background-color: white;
`;

const FilterWrapper = styled.div`
position: sticky;
top: 60px;
background-color: white;
z-index: 100;
display: flex;
align-items: center;
justify-content: space-between;
gap: 5rem;
padding: .5rem 2rem;
margin-bottom: 2rem;
@media screen and (max-width: 580px){
    gap: 1rem;
    padding: 0 .5rem;
    margin-bottom: 1rem;
}
`;

const FilterButton = styled.div`
display: flex;
align-items: center;
gap: 10px;
border-radius: 5px;
color: white;
background-color: teal;
cursor: pointer;
padding: .4rem 2rem;
position: relative;
@media screen and (max-width: 580px){
    padding: .4rem .6rem;
}
`;

const FilterLabel = styled.span`

`;

const MenuOptions = styled.div`
position: absolute;
left: 0;
top: 3rem;
color: #333;
display: flex;
flex-direction: column;
background-color: white;
box-shadow: 0px 1px 3px rgba(0,0,0,0.5);
border-radius: 5px;
min-width: 10rem;
overflow: hidden;
`;

const MenuItem = styled.div`
width: 100%;
padding: 10px 20px;
cursor: pointer;
&:hover{
    background-color: teal;
    color: white;
    transition: 0.3s all;
}
`;

const MenuWrapper = styled.div`
margin-top: 2rem;
width: 100%;
display: flex;
align-items: center;
justify-content: center;
border-bottom: 3px solid rgba(0,0,0,0.05);
background-color: white;
@media screen and (max-width: 580px){
    justify-content: space-around;
    padding: 0 .2rem;
}
`;

const ContentWrapper = styled.div`
width: 100%;
display: flex;
flex-direction: column;
//padding: 0px 20px;
margin: 40px 0px;
min-height: 70vh;
@media screen and (max-width: 1024px) {
    padding: 0px 10px;
}
@media screen and (max-width: 768px) {
    padding: 0px 10px;
}
@media screen and (max-width: 580px) {
    margin: 20px 0px;
    padding: 0px 5px;
}
`;


const DashWrapper = styled.div`
display: flex;
flex-direction: column;
width: 100%;
@media screen and (max-width: 580px) {
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 1rem;
}
`;

const DashboardItem = styled.div`
display: flex;
flex-direction: row;
align-items: center;
gap: 1rem;
padding: .5rem 1rem;
border-radius: 5px;
cursor: pointer;
color: #555;
@media screen and (max-width: 1024px) {
    font-size: 16px;
}
@media screen and (max-width: 768px) {
    font-size: 15px;
}
@media screen and (max-width: 580px) {
    font-size: 14px;
    gap: 0;
    padding: 10px 6px;
    flex-direction: column;
    justify-content: center;
}
`;

const DashItem = styled.div`
display: flex;
align-items: center;
justify-content: center;
padding: 10px 20px;
cursor: pointer;
border-bottom: ${props=>props.active ? '1px solid teal': 'none'};
color: ${props=>props.active ? 'teal': '#333'};
&:hover{
    border-bottom: 1px solid teal;
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
    width: 70px;
    font-size: 14px;
    padding: 10px 0px;
}
`;

const ItemLabel = styled.span`
font-weight: 500;
color: inherit;
text-transform: uppercase;
@media screen and (max-width: 580px) {
    font-size: 11px;
}
`;

const ItemValue = styled.span`
font-weight: bold;
font-size: 22px;
text-align: center;
min-width: 2rem;
@media screen and (max-width: 1024px) {
    //font-size: 15px;
}
@media screen and (max-width: 768px) {
    //font-size: 14px;
}
@media screen and (max-width: 580px) {
    min-width: auto;
    font-size: 18px;
}
`;


const CardWrapper = styled.div`
margin: 0rem 2rem;
margin-top: 3rem;
margin-bottom: 1rem;
border-radius: 5px;
display: flex;
flex-direction: column;
background-color: white;
border: 1px solid rgba(0,0,0,0.1);
-webkit-box-shadow: 3px 4px 9px -2px rgba(0,0,0,0.64); 
 box-shadow: 3px 4px 9px -2px rgba(0,0,0,0.64);
@media screen and (max-width: 580px) {
    margin: 0rem .8rem;
    margin-top: 4rem;
    margin-bottom: 1rem;
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
//margin-top: 30px;
width: 100%;
display: flex;
flex-direction: column;
padding: 0 80px;
@media screen and (max-width: 1024px) {
    padding: 0px 50px;
}
@media screen and (max-width: 768px) {
    padding: 0px 20px;
}
@media screen and (max-width: 580px) {
    padding: 0px 10px;
}
`;

const SettingsWrapper = styled.div`
//margin-top: 30px;
width: 100%;
display: flex;
flex-direction: column;
padding: 0 80px;
@media screen and (max-width: 1024px) {
    padding: 0px 50px;
}
@media screen and (max-width: 768px) {
    padding: 0px 20px;
}
@media screen and (max-width: 580px) {
    padding: 0px 10px;
}
`;

const ButtonLink = styled(Link)`
text-decoration: none;
color: inherit;
`;

const Title = styled.h3`
color: teal;
`;

const Description = styled.span`
margin-top: 10px;
@media screen and (max-width: 580px) {
    font-size: 14px;
}
`;

const Button = styled.span`
display: flex;
align-items: center;
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
flex-direction: column;
display: ${props=>props.active ? "flex": "none"};;
@media screen and (max-width: 1024px) {

}
@media screen and (max-width: 768px) {

}
@media screen and (max-width: 580px) {

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


