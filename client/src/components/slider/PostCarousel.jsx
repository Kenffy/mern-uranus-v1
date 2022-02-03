import { NavigateBefore, NavigateNext } from "@material-ui/icons";
import { useRef } from "react";
import Carousel from "react-elastic-carousel";
import styled from "styled-components";
import ItemCard from "./ItemCard";
import "./postCarousel.css";

const PostCarousel = ({posts}) => {
  let carouselRef = useRef(null);
  console.log(posts);

  return (
  <Container>
    <Header>Top 10 Posts of the Week</Header>
    <Wrapper>
    <Arrow 
        dir="left" 
        onClick={() => carouselRef.slidePrev()}>
        <ArrowLeft />
    </Arrow>
    <Arrow 
        dir="right" 
        onClick={() => carouselRef.slideNext()}>
            <ArrowRight />
    </Arrow>
    <Carousel
    ref={ref => (carouselRef = ref)}
    pagination={false}
    itemsToShow={1}
    enableAutoPlay 
    autoPlaySpeed={15000}
    transitionMs={1500}
    >
    {posts.map((post)=>(
        <ItemCard key={post._id} post={post} />
    ))}
    </Carousel>
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
color: #444;
border-bottom: 1px solid rgba(0,0,0,0.2);
font-weight: 600;
@media screen and (max-width: 580px) {
    font-size: 15px;
    padding: 10px 0px;
}
`

const Loading = styled.h3`
display: flex;
padding: 10px 20px;
color: teal;
font-weight: 600;
@media screen and (max-width: 580px) {
    font-size: 15px;
}
`

const Wrapper = styled.div`
position: relative;
margin: 20px 0px;
`;

const Arrow = styled.div`
background-color: teal;
display: flex;
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
z-index: 1;
@media screen and (max-width: 580px) {
    height: 30px;
    width: 30px;
    left: ${(props) => props.dir === "left" && "5px"};
    right: ${(props) => props.dir === "right" && "5px"};
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
