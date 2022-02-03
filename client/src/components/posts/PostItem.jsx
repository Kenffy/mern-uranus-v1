
import { Link } from "react-router-dom";
import styled from "styled-components";
import ReactHtmlParser from 'react-html-parser';
import { Avatar } from "@material-ui/core";
import { GraphicEq, Panorama, YouTube } from "@material-ui/icons";

export default function PostItem({post}) {
    return (
        <Container>
                <HeaderWrapper>
                    <TitleWrapper>
                        <PostLink to={`/postswrf4${post._id}wrf4${post.userId}`}>
                            <Title>{post?.title.length > 80? post?.title.slice(0, 80)+"..." : post?.title}</Title>
                            <Category>{post?.category}</Category>
                        </PostLink>
                    </TitleWrapper>
                    <AuthorWrapper>
                        <Avatar src={post?.profile} />
                        <Author>{post?.username}</Author>
                    </AuthorWrapper>
                </HeaderWrapper>
            <BodyWrapper>
                <PostBody>{post?.body.length > 120? ReactHtmlParser(post?.body?.slice(0, 120)+"..."): ReactHtmlParser(post?.body)}</PostBody>
                <FooterWrapper>
                    <PostDate>{new Date(post?.createdAt).toDateString()}</PostDate>
                    {post?.type === "image-post" && <ImageIcon />}
                    {post?.type === "video-post" && <VideoIcon />}
                    {post?.type === "audio-post" && <AudioIcon />}
                </FooterWrapper>
            </BodyWrapper>
        </Container>
        // <ProfileContainer>
        //     <MediaWrapper>
        //         {post?.images.length > 0 &&
        //         <ProfileImage src={post.images[0]}/>}
        //     </MediaWrapper>
        //     <PostInfos>
        //         <PostLink to={`/postswrf4${post._id}wrf4${post.userId}`}>
        //             <Title>{post.title}</Title>
        //         </PostLink>
        //         <Date>{post.date}</Date>
        //         <Category>{post.category}</Category>
        //         <PostBody>{ReactHtmlParser(post.body)}</PostBody>
        //     </PostInfos>
        // </ProfileContainer>
    )
};

const Container = styled.div`
display: flex;
margin: 0px;
height: 200px;
width: 100%;
background-color: white;
border: 1px solid rgba(0,0,0,0.2);
-webkit-box-shadow: 3px 4px 9px -2px rgba(0,0,0,0.64); 
 box-shadow: 3px 4px 9px -2px rgba(0,0,0,0.64);
@media screen and (max-width: 580px) {
    flex-direction: column;
    height: auto;
}
`;

const HeaderWrapper = styled.div`
width: 40%;
display: flex;
flex-direction: column;
justify-content: space-between;
background-color: teal;
height: 100%;
@media screen and (max-width: 580px) {
    width: 100%;
    height: auto;
}
`;

const TitleWrapper = styled.div`
width: 100%;
`;

const AuthorWrapper = styled.div`
display: flex;
align-items: center;
margin: 20px;
width: 100%;
`;

const Author = styled.span`
color: white;
margin-left: 10px;
`;

const BodyWrapper = styled.div`
width: 60%;
height: 100%;
display: flex;
flex-direction: column;
justify-content: space-between;
@media screen and (max-width: 580px) {
    width: 100%;
    height: auto;
}
`;

const FooterWrapper = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
color: teal;
padding: 0px 20px;
`;

// const ProfileContainer = styled.div`
// margin: 0px;
// height: 100%;
// background-color: white;
// border: 1px solid rgba(0,0,0,0.08);
// box-shadow: 0px 1px 1px rgba(0,0,0,0.5);
// `;

// const PostLink = styled.a`
// text-decoration: none;
// `;

const PostLink = styled(Link)`
text-decoration: none;
`;

// const MediaWrapper = styled.div`
// height: 150px;
// width: 100%;
// `;
// const ProfileImage = styled.img`
// height: 100%;
// width: 100%;
// object-fit: cover;
// `
// const PostInfos = styled.div`
// display: flex;
// flex-direction: column;
// align-items: center;
// margin-top: 20px;
// width: 100%;
// `
const Title = styled.h4`
color: white;
font-weight: 500;
margin: 20px;
display: -webkit-box;
-webkit-box-orient: vertical;
-webkit-line-clamp: 3;
overflow: hidden;
`;

const PostDate = styled.span`
margin: 10px 0px;
font-size: 12px;
color: teal;
`;

const PostBody = styled.div`
color: #444;
margin: 20px;
padding-right: 40px;
width: 100%;
display: -webkit-box;
-webkit-box-orient: vertical;
-webkit-line-clamp: 3;
overflow: hidden;
`;

const Category = styled.span`
font-size: 14px;
font-weight: 400;
font-style: italic;
margin: 20px;
text-align: center;
color: white;
`;

const AudioIcon = styled(GraphicEq)`
height: 16px !important;
width: 16px !important;
`;

const VideoIcon = styled(YouTube)`
height: 18px !important;
width: 18px !important;
`;

const ImageIcon = styled(Panorama)`
height: 16px !important;
width: 16px !important;
`;