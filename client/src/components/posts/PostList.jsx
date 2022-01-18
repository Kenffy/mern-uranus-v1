import styled from 'styled-components';
import PostCard from "./PostCard";
import * as api from "../../services/apiServices";
import { useState, useEffect } from 'react';
import { Context } from '../../context/Context';
import { useContext } from 'react';

const PostList = ({filter, userId}) => {
    const {isFetching, dispatch} = useContext(Context);

    const [posts, setPosts] = useState([]);
    useEffect(() => {
        const loadPosts = async()=>{
            dispatch({ type: "ACTION_START" });
            try {
                const creds = JSON.parse(localStorage.getItem("user"));
                const res = await api.getPosts(`cat=${filter?.name}`, creds.accessToken);
                if(res.data && userId){
                    setPosts(res.data.filter(p=>p.userId === userId));
                }else{
                    setPosts(res.data);
                }
                dispatch({ type: "ACTION_SUCCESS"});
            } catch (error) {
                dispatch({ type: "ACTION_FAILED" });
                console.log(error);
            }
        }
        loadPosts();
    }, [filter, userId, dispatch])

    let filteredPosts = [];
    filteredPosts = posts.sort((a,b)=> new Date(b.createdAt) - new Date(a.createdAt));
    return (
        <Container>
            {isFetching ?
            <LoadingWrapper><h3>Loading...</h3></LoadingWrapper>
            :
            <>
            {filteredPosts.map((post) => (
                <PostCard key={post._id} post={post}/>
            ))}
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
