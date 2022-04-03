import React from 'react';
import styled from 'styled-components';
import PostCard from "./PostCard";
import * as api from "../../services/apiServices";
import { useState, useEffect } from 'react';
import { Context } from '../../context/Context';
import { useContext } from 'react';

const PostList = ({filter, userId}) => {
    const {isFetching, dispatch} = useContext(Context);

    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    useEffect(() => {
        const loadPosts = async()=>{
            dispatch({ type: "ACTION_START" });
            try {
                const creds = JSON.parse(localStorage.getItem("user"));
                const res = await api.getPosts(`cat=${filter?.name}`, creds.accessToken);
                if(res.data && userId){
                    setPosts(res.data.posts.filter(p=>p.userId === userId));
                    setPage(res.data.page);
                }else{
                    setPosts(res.data.posts);
                    setPage(res.data.page);
                }
                dispatch({ type: "ACTION_SUCCESS"});
            } catch (error) {
                dispatch({ type: "ACTION_FAILED" });
                console.log(error);
            }
        }
        loadPosts();
    }, [filter, userId, dispatch])

    //let filteredPosts = [];
    //filteredPosts = posts.sort((a,b)=> new Date(b.createdAt) - new Date(a.createdAt));

    const handleLoadMore = async(e)=>{
        e.preventDefault();
        dispatch({ type: "ACTION_START" });
        try {
            const creds = JSON.parse(localStorage.getItem("user"));
            const next = parseInt(page)+1;
            const res = await api.getPosts(`cat=${filter?.name}&page=${next}`, creds.accessToken);
            console.log(res.data)
            if(res.data && userId){
                setPosts((prev)=> [...prev, ...res.data.posts.filter(p=>p.userId === userId)]);
                setPage(res.data.page);
            }else{
                setPosts((prev)=> [...prev, ...res.data.posts]);
                setPage(res.data.page);
            }
            dispatch({ type: "ACTION_SUCCESS"});
        } catch (error) {
            dispatch({ type: "ACTION_FAILED" });
            console.log(error);
        }
    }

    console.log(page)

    return (
        <Container>
            {isFetching ?
            <LoadingWrapper><h3>Loading...</h3></LoadingWrapper>
            :
            <>
            <div>
            {posts.map((post) => (
                <PostCard key={post._id} post={post}/>
            ))}
            </div>
            <LoadMoreBtn onClick={handleLoadMore}>Load More</LoadMoreBtn>
            </>
            }
        </Container>
    )
}

export default PostList;

const Container = styled.div`
display: flex;
flex-direction: column;
padding: 20px 0px;
@media screen and (max-width: 580px) {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    width: 100%;
}
`;

const LoadingWrapper = styled.div`
display: flex;
justify-content: center;
color: teal;
`;

const LoadMoreBtn = styled.button`
align-self: center;
padding: 15px 30px;
width: 30%;
border-radius: 5px;
cursor: pointer;
border: none;
&:hover{
    background-color: rgba(0,0,0,0.1);
}
`;
