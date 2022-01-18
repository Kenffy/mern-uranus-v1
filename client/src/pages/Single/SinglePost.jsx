import styled from "styled-components";

const SinglePost = ({post}) => {
    return (
        <Container>
            <PostWrapper>
                <ImageSlider images={post?.images || []}/>
            </PostWrapper>
            <CommentWrapper>

            </CommentWrapper>
            <OtherWrapper>

            </OtherWrapper>
        </Container>
    )
}

export default SinglePost;

const Container = styled.div`
display: flex;
flex-direction: column;
`;

const PostWrapper = styled.div`

`;

const CommentWrapper = styled.div`

`;

const OtherWrapper = styled.div`

`;
