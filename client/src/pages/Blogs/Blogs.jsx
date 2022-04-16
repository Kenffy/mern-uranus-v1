import React from 'react';
import styled from 'styled-components';
import BlogList from '../../components/blogs/BlogList';
import { Container } from '../../globaleStyles';

const Blogs = () => {
    
    return (
        <BlogsContainer>
            <Header>Explore All Blogs</Header>
            {/* <Filter /> */}
            <BlogList />
            <Heading>Most Popular Blogs</Heading>
        </BlogsContainer>
    )
}

export default Blogs;

const BlogsContainer = styled(Container)`
display: flex;
flex-direction: column;
background-color: white;
min-height: 100vh;
${Container}
`;

const Header = styled.span`
margin-top: 60px;
font-size: 18px;
width: 100%;
padding: 10px 25px;
color: #555;
text-transform: uppercase;
font-weight: 600;
`;

const Heading = styled.span`
margin-top: 20px;
font-size: 18px;
width: 100%;
padding: 10px 25px;
color: #555;
text-transform: uppercase;
font-weight: 600;
`;

