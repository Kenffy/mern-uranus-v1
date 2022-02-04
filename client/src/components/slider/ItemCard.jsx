import { FavoriteBorder, GraphicEq, Panorama, VisibilityOutlined, YouTube } from "@material-ui/icons";
import { Link } from "react-router-dom";
import styled from "styled-components";
import ReactHtmlParser from 'react-html-parser';

const ItemCard = ({post}) => {
  return (
  <Container>
      <Cover bg={post?.images[0] || post?.audios[0]?.cover} />
      <Wrapper>
        <SlideHeader>
            <SlideInfos>
                {new Date(post?.createdAt).toDateString()} • {post?.category} • {post?.type === "image-post" && <ImageIcon />}
                {post?.type === "video-post" && <VideoIcon />}
                {post?.type === "audio-post" && <AudioIcon />}
            </SlideInfos>
        </SlideHeader>
        <SlideBody>
            <ItemLink to={`/postswrf4${post?._id}wrf4${post?.userId}`}>
                <Title>{post?.title.length > 50? post?.title.slice(0, 50)+"..." : post?.title}</Title>
            </ItemLink>
            <Desc>{post?.body.length > 120? ReactHtmlParser(post?.body?.slice(0, 120)+"..."): ReactHtmlParser(post?.body)}</Desc>
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
      </Wrapper>
  </Container>
  );
};

export default ItemCard;

const Container = styled.div`
position: relative;
width: 100%;
height: 700px;
@media screen and (max-width: 580px) {
    height: 250px;
    padding: 0;
    margin: 0;
}
`;

const Cover = styled.div`
position: absolute;
width: 100%;
height: 100%;
background: ${props=>props.bg? `url(${props.bg})` : "teal"};
background-repeat: no-repeat;
background-size: cover;
`;

const Wrapper = styled.div`
width: 60%;
height: 50%;
border-radius: 10px;
-webkit-box-shadow: 3px 4px 9px -2px rgba(0,0,0,0.64); 
 box-shadow: 3px 4px 9px -2px rgba(0,0,0,0.64);
background-color: white;
opacity: 0.9;
position: absolute;
top: 100px;
left: 0;
right: 0;
bottom: 0;
margin: auto;
display: flex;
flex-direction: column;
padding: 50px;
overflow: hidden;
@media screen and (max-width: 580px) {
    width: 80%;
    height: 75%;
    top: 20px;
    padding: 5px;
}
`;

const ItemLink = styled(Link)`
text-decoration: none;
color: inherit;
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
padding: 10px 20px;
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
@media screen and (max-width: 580px) {
    margin-top: 10px;
    padding: 0px 15px;
}
`;

const Title = styled.span`
font-weight: 600;
color: #444;
font-size: 20px;
&:hover{
    color: teal;
    transition: all 0.3s ease;
}
@media screen and (max-width: 580px) {
    font-size: 14px;
}
`;

const Desc = styled.span`
margin-top: 20px;
@media screen and (max-width: 580px) {
    margin-top: 10px;
    font-size: 12px;
}
`;

const SlideFooter = styled.div`
width: 100%;
padding: 10px 50px;
display: flex;
align-items: center;
justify-content: space-between;
position: absolute;
left: 0;
right: 0;
bottom: 0;
margin: auto;
color: teal;
@media screen and (max-width: 580px) {
    padding: 10px 20px;
}
`;

const FooterItem = styled.div`
display: flex;
align-items: center;
padding: 10px 0px;
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

