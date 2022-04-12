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
            <CategorySlider items={CategoryList} setFilter={setFilter} />
            <PostList filter={filter}/>
            <ExplorerBlogs />
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