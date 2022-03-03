import React from 'react';
import { NavigateBefore, NavigateNext } from "@material-ui/icons";
import { useRef } from "react";
import Carousel from "react-elastic-carousel";
import styled from "styled-components";
//import ItemCard from "./ItemCard";
import dateFormat from "dateformat";
import { delay } from "../../util/util";
import "./postCarousel.css";
import { Link } from 'react-router-dom';

const PostCarousel = ({posts}) => {
  let carouselRef = useRef(null);

  const scrollLeft = () =>{
      if(carouselRef.state.activeIndex === 0){
        carouselRef.goTo(posts?.length)
      }else{
        carouselRef.slidePrev();
      }    
  }

  const scrollRight = () =>{
    if(carouselRef.state.activeIndex === posts?.length-1){
      carouselRef.goTo(0);
    }else{
      carouselRef.slideNext()
    } 
  }

  const onSliderEnd = async() => {
    if(carouselRef.state.activeIndex === posts?.length-1){
        await delay(15000);
        carouselRef.goTo(0);
    }
  }

  const PostImageUrl = process.env.REACT_APP_POSTS;
  const CoverUrl = process.env.REACT_APP_AUDIO_COVERS;

  return (
  <Container>
    <Header>Top 10 Most Read Content</Header>
    <Wrapper>
    <Arrow 
        dir="left" 
        onClick={scrollLeft}>
        <ArrowLeft />
    </Arrow>
    <Arrow 
        dir="right" 
        onClick={scrollRight}>
            <ArrowRight />
    </Arrow>
    <MyCarousel
    ref={ref => (carouselRef = ref)}
    pagination={false}
    itemsToShow={1}
    enableAutoPlay 
    autoPlaySpeed={15000}
    transitionMs={1500}
    onNextEnd={onSliderEnd}
    >
    {posts.map((post)=>(
        // <ItemCard key={post._id} post={post} />
        <SlideItem key={post?._id}>
            <TempImage src={PostImageUrl+post?.images[0] || CoverUrl+post?.audios[0]?.cover} />
            <TempInfos>
                <InfoDate>{dateFormat(new Date(post?.createdAt), "mmmm d, yyyy")} • {post?.category} • {post?.vues.length > 0? post?.vues.length + " vues" : post?.vues.length + "vue"}</InfoDate>
                <InfoTitle>{post?.title.length > 80? post?.title.slice(0, 80)+"..." : post?.title}</InfoTitle>
                <InfoButton to={`/postswrf4${post?._id}wrf4${post?.userId}`}>
                  READ MORE
                </InfoButton>
            </TempInfos>
        </SlideItem>
    ))}
    </MyCarousel>
    </Wrapper>
  </Container>
  );
};

export default PostCarousel;

const Container = styled.div`
height: 100%;
width: 100%;
`;

const Header = styled.h3`
display: flex;
padding: 10px 20px;
color: #555;
text-transform: uppercase;
//border-bottom: 1px solid rgba(0,0,0,0.2);
font-weight: 600;
@media screen and (max-width: 580px) {
    font-size: 15px;
    padding: 10px 0px;
}
`

const MyCarousel = styled(Carousel)`
margin: 0 !important;
padding: 0 !important;
height: 100%;
width: 100%;
`;

const Arrow = styled.div`
background-color: teal;
display: none;
align-items: center;
justify-content: center;
height: 60px;
width: 60px;
border-radius: 50%;
opacity: 0.4;
&:hover{
  opacity: 0.8;
  transition: 0.3s all ease ;
}
position: absolute;
top: 0;
bottom: 0;
left: ${(props) => props.dir === "left" && "15px"};
right: ${(props) => props.dir === "right" && "15px"};
margin: auto;
cursor: pointer;
z-index: 100;
@media screen and (max-width: 580px) {
    height: 30px;
    width: 30px;
    left: ${(props) => props.dir === "left" && "2px"};
    right: ${(props) => props.dir === "right" && "2px"};
}
`;

const ArrowLeft = styled(NavigateBefore)`
height: 50px !important;
width: 50px !important;
color: white;
@media screen and (max-width: 580px) {
    height: 25px !important;
    width: 25px !important;
}
`;

const ArrowRight = styled(NavigateNext)`
height: 50px !important;
width: 50px !important;
color: white;
@media screen and (max-width: 580px) {
    height: 25px !important;
    width: 25px !important;
}
`;

const Wrapper = styled.div`
position: relative;
margin: 20px 0px;

&:hover{
    ${Arrow}{
    display: flex;
    transition: all 0.3s ease;
  }
}
`;




const SlideItem = styled.div`
display: flex;
align-items: center;
position: relative;
//height: 100%;
//width: 100%;
cursor: pointer;

width: 100%;
height: 700px;
@media screen and (max-width: 580px) {
    height: 250px;
    padding: 0;
    margin: 0;
}
`;

const TempImage = styled.div`
height: 100%;
width: 100vw;
background-image: ${props=> `linear-gradient(transparent, rgba(0,0,0,0.8)), url(${props.src})`};
background-position: center;
background-repeat: no-repeat;
background-size: cover;
background-color: teal;
//display: block;
object-fit: cover;
`;

const TempInfos = styled.div`
position: absolute;
top: 30%;
right: 0;
left: 0;
margin: auto;
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;
color: white;
width: auto;
`;

const InfoDate = styled.span`
text-align: center;
font-size: 18px;
font-weight: 500;

@media screen and (max-width: 580px) {
    font-size: 12px;
  }
`;

const InfoTitle = styled.span`
text-align: center;
font-size: 45px;
font-weight: 500px;
margin-top: 50px;
width: 70%;
@media screen and (max-width: 1024px) {
  font-size: 35px;
}
@media screen and (max-width: 768px) {
  margin-top: 25px;
  font-size: 25px;
}
@media screen and (max-width: 580px) {
  font-size: 16px;
  margin-top: 20px;
  width: 80%;
}
`;

const InfoButton = styled(Link)`
text-decoration: none;
text-align: center;
margin-top: 70px;
padding: 15px 30px;
width: 200px;
border: 1px solid white;
font-weight: 500;
color: white;
background-color: transparent;
cursor: pointer;
&:hover{
    background-color: white;
    color: #444;
    transition: all 0.3s ease;
}
@media screen and (max-width: 1024px) {
  padding: 12px;
}
@media screen and (max-width: 768px) {
  margin-top: 25px;
  padding: 8px;
  font-size: 14px;
}
@media screen and (max-width: 580px) {
  font-size: 11px;
  margin-top: 20px;
  width: auto;
  padding: 5px;
}
`;

