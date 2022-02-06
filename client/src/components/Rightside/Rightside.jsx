import React from 'react';
import styled from "styled-components";
import Avatar from '@material-ui/core/Avatar';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import Socials from "./Socials";
import { Link } from "react-router-dom";
import ReactHtmlParser from 'react-html-parser';
import PopularBlogs from "../blogs/PopularBlogs";
//import Categories from "../Categories/Categories";
//import About from "../about/About";

export default function Rightside({users, posts, profile}) {

    return (
        <Container>
            {/* {profile && <About user={profile}/>} */}
            {/* <Categories /> */}
            <PopularBlogs />
            {!profile &&
            <PolularWrapper>
                <PopularTiTle>Recent Blogs</PopularTiTle>
                <AvatarWrapper>
                    {users?.length > 0 &&
                    <AvatarGroup max={7}>
                        {users.map((user) => (
                            <Avatar key={user?._id} alt={user?.username} src={user?.profile}/>
                        ))}
                    </AvatarGroup>}
                </AvatarWrapper>
            </PolularWrapper>}
            {posts.length >0 &&
            <TopPostsWrapper>
                <TopPostsTitle>{profile? "Recent Posts" : "Most Read Content"}</TopPostsTitle>
                <ContentItems>
                    {posts.map((post) =>(
                        <ContentItem key={post._id}>
                            <ItemWrapper>
                                <Link to={`/posts/${post._id}`}
                                style={{textDecoration:"none",color:"inherit"}}>
                                    <ItemTitle>{post.title}</ItemTitle>
                                </Link>
                                <ItemBody>{ReactHtmlParser(post.body)}</ItemBody>
                            </ItemWrapper>
                            {post?.images[0] &&
                            <Link to={`/posts/${post._id}`}
                                style={{textDecoration:"none",color:"inherit"}}>
                                <ItemImage src={post?.images[0]} alt="post-img"/>
                            </Link>}
                        </ContentItem>
                    ))}
                </ContentItems>
            </TopPostsWrapper>}
            {profile &&
            <SocialWrapper>
                <SocialTiTle>Follow Me</SocialTiTle>
                <SocialItems>
                    {Socials.map((item) => (
                        <SocialItem key={item.id}>
                            <SocialLink target="_blank" href={item.link}>
                                {item.icon}
                            </SocialLink>
                        </SocialItem>
                    ))}
                </SocialItems>
            </SocialWrapper>
            }

            {profile &&
            posts.length > 0 &&
            <TopPostsWrapper>
                <TopPostsTitle>Popular Posts</TopPostsTitle>
                <ContentItems>
                {posts.map((post) =>(
                    
                        <ContentItem key={post._id}>
                            <ItemWrapper>
                                <Link to={`/posts/${post._id}`}
                                style={{textDecoration:"none",color:"inherit"}}>
                                    <ItemTitle>{post.title}</ItemTitle>
                                </Link>
                                <ItemBody>{ReactHtmlParser(post.body)}</ItemBody>
                            </ItemWrapper>
                            {post?.images[0] &&
                            <Link to={`/posts/${post._id}`}
                                style={{textDecoration:"none",color:"inherit"}}>
                                <ItemImage src={post?.images[0]} alt="post-img"/>
                            </Link>}
                        </ContentItem>
                    
                ))}
                </ContentItems>
            </TopPostsWrapper>
            }
            <br />
            <br />
        </Container>
    )
};

const Container = styled.div`
display: flex;
flex-direction: column;
font-weight: 500;
//background-color: orange;
@media screen and (max-width: 980px) {
    //justify-content: center;
    padding: 0px 20px;
    margin: 0px 10px;
}
@media screen and (max-width: 768px) {
    margin: 0px;
}
@media screen and (max-width: 580px) {
    flex: 1;
    justify-content: center;
    padding: 0px 0px;
    margin: 5px;
}
`

const PolularWrapper = styled.div`
margin-top: 30px;
width: 100%;
border-radius: 10px;
background-color: white;
border-radius: 0px;
border: 1px solid rgba(0,0,0,0.1);
box-shadow: 0px 1px 1px rgba(0,0,0,0.01);
@media screen and (max-width: 580px) {
    width: 100%;
    margin-top: 20px;
    margin-right: 0px;
    margin-left: 0px;
}
`
const PopularTiTle = styled.h3`
display: flex;
padding: 10px 20px;
color: #555;
text-transform: uppercase;
border-bottom: 1px solid rgba(0,0,0,0.2);
font-weight: 600;
@media screen and (max-width: 580px) {
    font-size: 15px;
}
`
const AvatarWrapper = styled.div`
padding: 10px 20px;
overflow: hidden;
`;

const SocialWrapper = styled.div`
margin-top: 30px;
border-radius: 10px;
background-color: white;
border-radius: 0px;
border: 1px solid rgba(0,0,0,0.1);
box-shadow: 0px 1px 1px rgba(0,0,0,0.01);
@media screen and (max-width: 580px) {
    width: 100%;
    margin-right: 0px;
    margin-left: 0px;
}
`
const SocialTiTle = styled.h3`
display: flex;
padding: 10px 20px;
color: #444;
border-bottom: 1px solid rgba(0,0,0,0.2);
font-weight: 600;
@media screen and (max-width: 580px) {
    font-size: 15px;
}
`
const SocialItems = styled.div`
display: flex;
align-items: center;
padding: 5px 20px;
`
const SocialItem = styled.div`
color: #555;
height: 35px;
width: 35px;
margin-right: 5px;
&:hover{
    color: teal;
}
`
const SocialLink = styled.a`
text-decoration: none;
color: inherit;
`
const TopPostsWrapper = styled.div`
margin-top: 30px;
background-color: white;
border-radius: 0px;
border: 1px solid rgba(0,0,0,0.1);
box-shadow: 0px 1px 1px rgba(0,0,0,0.01);
@media screen and (max-width: 580px) {
    width: 100%;
    margin-top: 20px;
    margin-right: 0px;
    margin-left: 0px;
}
`
const TopPostsTitle = styled.h3`
display: flex;
padding: 10px 20px;
color: #444;
border-bottom: 1px solid rgba(0,0,0,0.2);
font-weight: 600;
@media screen and (max-width: 580px) {
    font-size: 15px;
}
`
const ContentItems = styled.div`
display: flex;
flex-direction: column;
margin-bottom: 20px;
`
const ContentItem = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
padding: 8px 10px;
cursor: pointer;
border-bottom: 1px solid rgba(0,0,0,0.1);
&:hover{
    background-color: rgba(0,0,0,0.05);;
}
`
const ItemWrapper = styled.div`
display: flex;
flex-direction: column;
width: 100%;
`
const ItemTitle = styled.span`
width: 100%;
font-size: 14px;
font-weight: 600;
color: #444;
display: -webkit-box;
-webkit-box-orient: vertical;
-webkit-line-clamp: 2;
overflow: hidden;
`
const ItemBody = styled.span`

margin-top: 3px;
font-size: 14px;
color: #444;
display: -webkit-box;
-webkit-box-orient: vertical;
-webkit-line-clamp: 2;
overflow: hidden;
`
const ItemImage = styled.img`
width: 70px;
height: 70px;
border-radius: 10px;
object-fit: cover;
cursor: pointer;
`
