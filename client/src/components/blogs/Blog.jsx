import React from 'react';
import { Link } from "react-router-dom";
import styled from "styled-components";
import dateFormat from "dateformat";

export default function Blog({user, post}) {
    const date = post?.createdAt? dateFormat(new Date(post?.createdAt), "mmmm d, yyyy"):
                 dateFormat(new Date(), "mmmm d, yyyy");
    return (
        <ProfileContainer>
            <BlogLink to={`/profile/${user?._id}`}>
                <ProfileImage src={user?.profile}/>
            </BlogLink>
            <ProfileInfos>
                <BlogLink to={`/profile/${user?._id}`}>
                    <Username>{user?.username}</Username>
                </BlogLink>
                <PostDate>{date}</PostDate>
                <Category>{post?.category}</Category>
            </ProfileInfos>
        </ProfileContainer>
    )
};

const ProfileContainer = styled.div`
padding: 0px 20px;
margin-bottom: 20px;
width: 100%;
background-color: white;
display: flex;
flex-direction: column;
align-items: center;
//box-shadow: 0px 1px 1px rgba(0,0,0,0.5);
`;

const BlogLink = styled(Link)`
text-decoration: none;
`;

const ProfileImage = styled.img`
height: 200px;
width: 200px;
border-radius: 50%;
object-fit: cover;
`
const ProfileInfos = styled.div`
display: flex;
flex-direction: column;
align-items: center;
margin-top: 20px;
`
const Username = styled.span`
color: teal;
font-size: 18px;
font-weight: 600;
padding: 0px 10px;
text-align: center;
display: -webkit-box;
-webkit-box-orient: vertical;
-webkit-line-clamp: 1;
overflow: hidden;
`
const PostDate = styled.span`
color: #444;
margin-top: 10px;
padding: 0px 10px;
text-align: center;
display: -webkit-box;
-webkit-box-orient: vertical;
-webkit-line-clamp: 2;
overflow: hidden;
`

const Category = styled.span`
font-weight: 400;
padding: 10px;
text-align: center;
color: teal;
font-weight: 600;
`