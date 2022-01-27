import { Avatar } from "@material-ui/core";
import { FavoriteBorder, GraphicEq, Panorama, VisibilityOutlined, YouTube } from "@material-ui/icons";
import styled from "styled-components";
import ReactHtmlParser from 'react-html-parser';
import { Link } from "react-router-dom";


const PostSlide = ({post}) => {
  return (
    <Container>
      <SlideWrapper>
        <ProfileWrapper>
            <ItemLink to={`/profile/${post?.userId}`}>
                <Profile src={post?.profile}/>
            </ItemLink>
        </ProfileWrapper>
        <SlideHeader>
            <SlideInfos>
                {new Date(post?.createdAt).toDateString()} • {post?.category} • {post?.type === "image-post" && <ImageIcon />}
                {post?.type === "video-post" && <VideoIcon />}
                {post?.type === "audio-post" && <AudioIcon />}
            </SlideInfos>
        </SlideHeader>
        <SlideBody>
            <ItemLink to={`/postswrf4${post?._id}wrf4${post?.userId}`}>
                <Title>{post?.title.length > 80? post?.title.slice(0, 80)+"..." : post?.title}</Title>
            </ItemLink>
            <Desc>{post?.body.length > 150? ReactHtmlParser(post?.body?.slice(0, 150)+"..."): ReactHtmlParser(post?.body)}</Desc>
        </SlideBody>
        <SlideFooter>
            <FooterItem>
                <LikeIcon />
                <ItemValue>{post?.likes.length}</ItemValue>
            </FooterItem>
            <FooterItem>
                <VueIcon />
                <ItemValue>{post?.vues.length}</ItemValue>
            </FooterItem>
        </SlideFooter>
      </SlideWrapper>
    </Container>
  );
};

export default PostSlide;

const Container = styled.div`
height: 100%;
display: flex;
padding: 10px;
padding-top: 50px;
cursor: pointer;
`;

const ItemLink = styled(Link)`
text-decoration: none;
color: inherit;
`;

const SlideWrapper = styled.div`
width: 320px;
display: flex;
border: 1px solid teal;
flex-direction: column;
border-radius: 10px;
position: relative;
&:hover{
 -webkit-box-shadow: 3px 4px 9px -2px rgba(0,0,0,0.64); 
 box-shadow: 3px 4px 9px -2px rgba(0,0,0,0.64);
}
`;

const ProfileWrapper = styled.div`
position: relative;
`;

const Profile = styled(Avatar)`
position: absolute;
border: 1px solid teal;
height: 100px !important;
width: 100px !important;
top: -40px;
right: 0;
left: 0;
bottom: 0;
margin: auto;
@media screen and (max-width: 1024px) {
    height: 80px !important;
    width: 80px !important;
}
@media screen and (max-width: 768px) {
    height: 70px !important;
    width: 70px !important;
}
@media screen and (max-width: 580px) {
    height: 70px !important;
    width: 70px !important;
}
`;

const SlideHeader = styled.div`
display: flex;
justify-content: flex-end;
color: teal;
font-size: 12px;
font-style: italic;
`;

const SlideInfos = styled.div`
display: flex;
align-items: center;
padding: 0px 20px;
`;

const AudioIcon = styled(GraphicEq)`
height: 16px !important;
width: 16px !important;
margin-left: 4px;
`;

const VideoIcon = styled(YouTube)`
height: 18px !important;
width: 18px !important;
margin-left: 4px;
`;

const ImageIcon = styled(Panorama)`
height: 16px !important;
width: 16px !important;
margin-left: 4px;
`;

const SlideBody = styled.div`
display: flex;
flex-direction: column;
margin-top: 20px;
padding: 0px 20px;
`;

const Title = styled.span`
font-weight: 600;
color: #444;
`;

const Desc = styled.span`
margin-top: 20px;
`;

const SlideFooter = styled.div`
width: 100%;
padding: 10px 20px;
display: flex;
justify-content: space-between;
position: absolute;
bottom: 0;
color: teal;
`;

const FooterItem = styled.div`
display: flex;
align-items: center;
padding: 10px 0px;
@media screen and (max-width: 580px) {
    padding: 0px 5px;
    margin-left: 4px;
}
`
const ItemValue = styled.span`
font-size: 12px;
`;

const LikeIcon = styled(FavoriteBorder)`
height: 15px !important;
width: 15px !important;
margin-right: 4px;
@media screen and (max-width: 580px) {
    height: 15px !important;
    width: 15px !important;
}
`;

const VueIcon = styled(VisibilityOutlined)`
height: 16px !important;
width: 16px !important;
margin-right: 4px;
@media screen and (max-width: 580px) {
    height: 15px !important;
    width: 15px !important;
}
`;
