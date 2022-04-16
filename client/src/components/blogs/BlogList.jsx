import React from 'react';
import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Context } from '../../context/Context';
import * as api from "../../services/apiServices";
import { unfollowUser, followUser } from '../../context/Action';
import BlogCard from './BlogCard';
import Pagination from '@material-ui/lab/Pagination';

const BlogList = () => {

    const {auth, dispatch} = useContext(Context);
    const [page, setPage] = useState(1);
    const [data, setData] = useState(null);
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const size = 12;

    useEffect(() => {
        const fetchUsers = async () => {
            setIsLoading(true);
            try {
                let res;
                const creds = JSON.parse(localStorage.getItem("user"));
                res = await api.getUsers(`page=${page}&size=${size}`, creds.accessToken);
                if(res.data){
                    setUsers(res.data.users.filter(u=>u._id !== creds?.id)); //.sort((a,b)=> a.username.localeCompare(b.username)));
                    setPage(parseInt(res.data.page));
                    setData(res.data)
                }
                setIsLoading(false);
            } catch (error) {
                console.log(error);
                setIsLoading(false);
            }
        };
        fetchUsers();
    }, [dispatch, page, size]);

    const handleFollow = async(id, isfriend)=>{
        if(!isfriend){
            console.log("follow called.");
            const usr = await followUser(dispatch, id);
            setUsers((prev)=>[...prev.map(u=>u._id === usr._id? usr : u)]);
        }else{
            console.log("unfollow called.");
            const usr = await unfollowUser(dispatch, id);
            setUsers((prev)=>[...prev.map(u=>u._id === usr._id? usr : u)]);
        }
    }

    const handleLoadMore = async(e)=>{
        e.preventDefault();
        setIsLoading(true);
        try {
            const creds = JSON.parse(localStorage.getItem("user"));
            const next = parseInt(page)+1;
            let res = null;
            res = await api.getUsers(`page=${next}&size=${size}`, creds.accessToken);

            if(res.data){
                setUsers((prev)=> [...prev, ...res.data.users.filter(u=>u._id !== auth?._id)]);
                setPage(parseInt(res.data.page));
                setData(res.data)
            }
            setIsLoading(false);
        } catch (error) {
            dispatch({ type: "ACTION_FAILED" });
            setIsLoading(false);
            console.log(error);
        }
    }


    const handlePagination = async(e,value) =>{
        e.preventDefault();
        setPage(value);
    }
    

    const count = Math.floor(parseInt(data?.totalOfUsers) / parseInt(data?.size));

    const isLoadMore = false;
    return (
        <Container>
            <Wrapper>
                {users.map((usr)=>(
                <BlogCard 
                key={usr._id} 
                currUser={usr}
                authUser={auth}
                handleFollow={handleFollow}
                />
                ))}
            </Wrapper>
            <LoadingWrapper>{isLoading? "Loading..." : ""}</LoadingWrapper>
            <Pagination  
            count={count} 
            shape="rounded" 
            page={page} 
            siblingCount={0}
            onChange={handlePagination} />
            {isLoadMore &&
            <>{users?.length<data?.totalOfUsers ?
                <LoadMoreBtn onClick={handleLoadMore}>Load More</LoadMoreBtn> 
                :
                <LoadMoreBtn>No More Posts</LoadMoreBtn>
            }
            </>
            }
        </Container>
    )
}

export default BlogList;

const Container = styled.div`
width: 100%;
display: flex;
align-items: center;
flex-direction: column;
gap: 1rem;
margin-bottom: 20px;
padding: 0 2rem;
@media screen and (max-width: 580px){
    padding: 0 .5rem;
}
`;

const Wrapper = styled.div`
width: 100%;
display: grid;
grid-template-columns: repeat(auto-fit, minmax(18rem, 1fr));
gap: 1rem;
margin-bottom: 1rem;
@media screen and (max-width: 580px){
    grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
    gap: .5rem;
}
`;

const LoadingWrapper = styled.span`
table-layout: center;
color: teal;
height: 20px;
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