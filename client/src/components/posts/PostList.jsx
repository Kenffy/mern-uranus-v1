import React from 'react';
import styled from 'styled-components';
import PostCard from "./PostCard";
import * as api from "../../services/apiServices";
import { useState, useEffect } from 'react';
import { Context } from '../../context/Context';
import { useContext } from 'react';
import Pagination from '@material-ui/lab/Pagination';

const PostList = ({filter, userId}) => {
    const {dispatch} = useContext(Context);
    const [isLoading, setIsLoading] = useState(false);

    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [data, setData] = useState(null);

    const size = 6;


    useEffect(() => {
        const loadPosts = async()=>{
            setIsLoading(true);
            try {
                const creds = JSON.parse(localStorage.getItem("user"));
                const res = await api.getPosts(`cat=${filter?.name}&page=${1}&size=${size}`, creds.accessToken);
                if(res.data && userId){
                    setPosts(res.data.posts.filter(p=>p.userId === userId));
                    setPage(res.data.page);
                    setData(res.data)
                }else{
                    setPosts(res.data.posts);
                    setPage(parseInt(res.data.page));
                    setData(res.data)
                }
                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
                console.log(error);
            }
        }
        loadPosts();
    }, [filter, size, userId, dispatch]);


    const handleLoadMore = async(e)=>{
        e.preventDefault();
        setIsLoading(true);
        try {
            const creds = JSON.parse(localStorage.getItem("user"));
            const next = parseInt(page)+1;
            const res = await api.getPosts(`cat=${filter?.name}&page=${next}&size=${size}`, creds.accessToken);
            console.log(res.data)
            if(res.data && userId){
                setPosts((prev)=> [...prev, ...res.data.posts.filter(p=>p.userId === userId)]);
                setPage(res.data.page);
                setData(res.data)
            }else{
                setPosts((prev)=> [...prev, ...res.data.posts]);
                setPage(parseInt(res.data.page));
                setData(res.data)
            }
            dispatch({ type: "ACTION_SUCCESS"});
            setIsLoading(false);
        } catch (error) {
            dispatch({ type: "ACTION_FAILED" });
            setIsLoading(false);
            console.log(error);
        }
    }

    const handlePagination = async(e,value) =>{
        e.preventDefault();
        setIsLoading(true);
        try {
            const currPage = value;
            const creds = JSON.parse(localStorage.getItem("user"));
            const res = await api.getPosts(`cat=${filter?.name}&page=${currPage}&size=${size}`, creds.accessToken);
            console.log(res.data)
            if(res.data && userId){
                setPosts((prev)=> [...prev, ...res.data.posts.filter(p=>p.userId === userId)]);
                setPage(currPage);
            }else{
                setPosts((prev)=> [...prev, ...res.data.posts]);
                setPage(currPage);
            }
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            console.log(error);
        }
    }

    const count = Math.floor(parseInt(data?.totalOfPosts) / parseInt(data?.size));

    const isPagination = false;
    return (
        <Container>
            <Wrapper>
            {posts?.map((post) => (
                <PostCard key={post._id} post={post}/>
            ))}
            </Wrapper>
            {isLoading && <LoadingWrapper>Loading...</LoadingWrapper>}
            {isPagination &&<Pagination count={count} shape="rounded" page={page} onChange={handlePagination} />}
            <LoadMoreBtn onClick={handleLoadMore}>Load More</LoadMoreBtn>         
        </Container>
    )
}

export default PostList;

const Container = styled.div`

width: 100%;
display: flex;
align-items: center;
flex-direction: column;
gap: 1rem;
padding: 20px 0px;
@media screen and (max-width: 580px) {
    width: 100%;
}
`;

const Wrapper = styled.div`
display: flex;
justify-content: center;
flex-direction: column;
width: 100%;
`;

const LoadingWrapper = styled.span`
table-layout: center;
color: teal;
font-size: 16px;
font-weight: 500;
`;

const LoadMoreBtn = styled.button`
align-self: center;
margin-top: 20px;
padding: 15px 30px;
width: 30%;
border-radius: 5px;
cursor: pointer;
border: none;
&:hover{
    background-color: rgba(0,0,0,0.1);
}
@media screen and (max-width: 580px){
    width: 60%;
    padding: 10px 20px;
}
`;
