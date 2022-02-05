import { useEffect,useState } from "react";
import styled from "styled-components";
import PostItem from "./PostItem";
import * as api from "../../services/apiServices";

const UserPosts = ({authorId, postId}) => {
    const [posts, setPosts] = useState([]);

    useEffect(()=>{
        const loadUserPosts = async()=>{
            try {
                const creds = JSON.parse(localStorage.getItem("user"));
                const res = await api.getPosts(`user=${authorId}`, creds.accessToken);
                res.data && setPosts(res.data.filter(p=>p._id !== postId));
            } catch (error) {
                console.log(error)
            }
        }
        loadUserPosts();
    },[authorId, postId])
    return (
        <Articles>
            <ArticleTitle>Other Articles</ArticleTitle>
            <ArticleWrapper>
                {posts.map((post)=>(
                <PostItem key={post._id} post={post}/>
                ))}
            </ArticleWrapper>
        </Articles>
    )
}

export default UserPosts;

const Articles = styled.div`
display: flex;
flex-direction: column;
`;

const ArticleTitle = styled.h3`
padding: 15px 0px;
@media screen and (max-width: 580px) {
    font-size: 15px;
    font-weight: 600;
  }
`;

const ArticleWrapper = styled.div`
display: flex;
flex-direction: column;
width: 100%;
overflow: hidden;
gap: 20px;
margin-bottom: 40px;
`;


