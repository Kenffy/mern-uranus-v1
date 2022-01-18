import PostSlider from '../slider/PostSlider';
import styled from 'styled-components';
import { Container } from '../../globaleStyles';
import * as api from "../../services/apiServices";
import { useState, useEffect } from 'react';

const Header = () => {

    const [posts, setPosts] = useState([]);
    useEffect(() => {
        const loadPosts = async()=>{
            try {
                const creds = JSON.parse(localStorage.getItem("user"));
                const res = await api.getPosts(`pop=${5}`, creds.accessToken);
                res.data && setPosts(res.data);
            } catch (error) {
                console.log(error);
            }
        }
        loadPosts();
    }, [])

    return (
        <HeaderContainer>
            <Title>Top 10 Popular Posts</Title>
            <PostSlider posts={posts}/>
        </HeaderContainer>
    )
}

export default Header;

const HeaderContainer = styled(Container)`
margin-top: 80px;
height: 700px;
width: 100%;
@media screen and (max-width: 1024px) {
    padding: 0;
    height: 500px;
}
@media screen and (max-width: 768px) {
    padding: 0;
    height: 400px;
}
@media screen and (max-width: 580px) {
    padding: 0;
    height: 260px;
}
${Container}
`;

const Title = styled.h3`
padding: 10px 50px;
font-weight: 600;
color: #444;
border-bottom: 1px solid rgba(0,0,0,0.1);
@media screen and (max-width: 768px) {
    padding: 10px;
}
@media screen and (max-width: 580px) {
    padding: 10px 0px;
    font-size: 15px;
}
`;
