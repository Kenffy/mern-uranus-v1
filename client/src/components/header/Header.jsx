import React from 'react';
import styled from 'styled-components';
import { Container } from '../../globaleStyles';
import * as api from "../../services/apiServices";
import { useState, useEffect, useContext } from 'react';
import PostCarousel from '../slider/PostCarousel';
import { Context } from '../../context/Context';

const Header = () => {

    const {dispatch} = useContext(Context);
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        const loadPosts = async()=>{
            setIsLoading(true);
            try {
                const creds = JSON.parse(localStorage.getItem("user"));
                const res = await api.getPosts(`pop=${10}`, creds.accessToken);
                res.data && setPosts(res.data.posts);
                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
                console.log(error);
            }
        }
        loadPosts();
    }, [dispatch])

    return (
        <HeaderContainer>
            {!isLoading? 
            <PostCarousel posts={posts}/>
            :
            <SlideItem>
                <Loading>Loading...</Loading>
            </SlideItem>
            }
        </HeaderContainer>
    )
}

export default Header;

const HeaderContainer = styled(Container)`
margin-top: 45px;
width: 100%;
display: flex;
flex-direction: column;
${Container}
`;

const SlideItem = styled.div`
width: 100%;
height: 100%;
padding: 0 auto;
display: flex;
align-items: center;
justify-content: center;
@media screen and (max-width: 580px) {
    padding: 0;
    margin: 0;
}
`;

const Loading = styled.span`
margin-top: 80px;
color: teal;
font-weight: 600;
text-align: center;
width: 100%;
@media screen and (max-width: 580px) {
    font-size: 15px;
}
`