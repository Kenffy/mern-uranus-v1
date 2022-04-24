import React from 'react';
import { useLocation } from 'react-router';
import styled from 'styled-components';
import { Container } from '../../globaleStyles';
import PostDetail from '../../components/posts/PostDetail';



const Single = () => {
    
    const location = useLocation();
    const path = location.pathname.split("wrf4");
    const postId = path[1];
    const authorId = path[2];

    return (
        <SingleContainer>
          <PostDetail location={location.pathname} postId={postId} authorId={authorId}/>
        </SingleContainer>
    )
}

export default Single;

const SingleContainer = styled(Container)`
display: flex;
flex-direction: column;
background-color: white;
min-height: 100vh;
${Container}
`;