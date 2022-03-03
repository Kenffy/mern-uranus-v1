import React from 'react';
import styled from 'styled-components';
import { Container } from '../../globaleStyles';
import * as api from "../../services/apiServices";
import { useState, useEffect, useContext } from 'react';
import PostCarousel from '../slider/PostCarousel';
import { Context } from '../../context/Context';

const Header = () => {

    const {isFetching, dispatch} = useContext(Context);
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        const loadPosts = async()=>{
            dispatch({ type: "ACTION_START" });
            try {
                const creds = JSON.parse(localStorage.getItem("user"));
                const res = await api.getPosts(`pop=${10}`, creds.accessToken);
                res.data && setPosts(res.data);
                dispatch({ type: "ACTION_SUCCESS"});
            } catch (error) {
                dispatch({ type: "ACTION_FAILED" });
                console.log(error);
            }
        }
        loadPosts();
    }, [dispatch])

    return (
        <HeaderContainer>
            {isFetching? <Loading>Loading...</Loading>
            :
            <PostCarousel posts={posts}/>
            }
        </HeaderContainer>
    )
}

export default Header;

const HeaderContainer = styled(Container)`
margin-top: 80px;
width: 100%;
display: flex;
flex-direction: column;
${Container}
`;

const Loading = styled.h3`
display: flex;
padding: 10px 20px;
color: teal;
font-weight: 600;
@media screen and (max-width: 580px) {
    font-size: 15px;
}
`