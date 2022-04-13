import React from 'react';
import styled from "styled-components";
import Header from '../../components/header/Header';
import PostList from "../../components/posts/PostList";
import { Container } from "../../globaleStyles";
import { useState } from "react";
import {CategoryList} from "../../components/Categories/CategoryList";
import CategorySlider from "../../components/Categories/CategorySlider";
import PopularCategories from '../../components/Categories/PopularCategories';
import ExplorerBlogs from '../../components/blogs/ExplorerBlogs';

const Home = () => {
    const [filter, setFilter] = useState(CategoryList[0]);

    return (
        <HomeContainer>
            <Header />
            <Heading>categories</Heading>
            <CategorySlider items={CategoryList} setFilter={setFilter} />
            <PostList filter={filter}/>
            <Heading>Explorer Blogs</Heading>
            <ExplorerBlogs />
            <Heading>Popular Categories</Heading>
            <PopularCategories />
        </HomeContainer>
    )
}

export default Home;

const HomeContainer = styled(Container)`
display: flex;
flex-direction: column;
background-color: white;
min-height: 100vh;
${Container}
`;

const Heading = styled.span`
margin-top: 20px;
font-size: 18px;
width: 100%;
padding: 10px 20px;
color: #555;
text-transform: uppercase;
font-weight: 600;
`;