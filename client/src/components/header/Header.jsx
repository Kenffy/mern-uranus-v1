//import PostSlider from '../slider/PostSlider';
import styled from 'styled-components';
import { Container } from '../../globaleStyles';
import * as api from "../../services/apiServices";
import { useState, useEffect } from 'react';
//import HeaderSlider from '../slider/PostSlide';
import PostSlide from '../slider/PostSlide';

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
            <Wrapper>
                {posts.map((post)=>(
                    <PostSlide post={post} key={post?._id}/>
                ))}
            </Wrapper>
            {/* <PostSlider posts={posts}/> */}
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

const Wrapper = styled.div`
display: flex;
margin: 0px 20px;
//padding: 0px 10px;
overflow-x: scroll;
height: 400px;
::-webkit-scrollbar {
    height: 5px;
}
::-webkit-scrollbar-track {
    background-color: transparent;
}
::-webkit-scrollbar-thumb {
    background-color: transparent;
}
/* @media screen and (max-width: 1024px) {
    padding: 0;
}
@media screen and (max-width: 768px) {
    padding: 0;
}*/
@media screen and (max-width: 580px) {
    margin: 0px;
} 
`;
