import { ArrowLeftOutlined, ArrowRightOutlined } from "@material-ui/icons";
import { useState } from "react";
//import { Link } from "react-router-dom";
import styled from "styled-components";
//import dateFormat from "dateformat";
import PostSlide from "./PostSlide";

const PostSlider = ({posts}) => {

  posts = posts.filter((p)=>p?.images.length > 0)
  const maxIndex = posts.length - 1;
  const [slideIndex, setSlideIndex] = useState(0);
  const handleClick = (direction) => {
    if (direction === "left") {
      setSlideIndex(slideIndex > 0 ? slideIndex - 1 : maxIndex);
    } else {
      setSlideIndex(slideIndex < maxIndex ? slideIndex + 1 : 0);
    }
  };

  return (
    <Container>
      <Arrow direction="left" onClick={() => handleClick("left")}>
        <ArrowLeftOutlined />
      </Arrow>
      <Wrapper size={posts?.length} slideIndex={slideIndex}>
        {posts.map((item) => (
          <div key={item?._id}><PostSlide post={item}/></div>
          // <SlideItem key={item._id}>
          //     <TempImage src={item?.images[0]} />
          //     <TempInfos>
          //         <InfoDate>{dateFormat(new Date(item.createdAt), "mmmm d, yyyy")} . {item.category} . {item.comments.length} Comments</InfoDate>
          //         <InfoTitle>{item.title}</InfoTitle>
          //         <InfoButton to={`/postswrf4${item._id}wrf4${item.userId}`}>
          //           READ MORE
          //         </InfoButton>
          //     </TempInfos>
          // </SlideItem>
        ))
        }
      </Wrapper>
      <Arrow direction="right" onClick={() => handleClick("right")}>
        <ArrowRightOutlined />
      </Arrow>
    </Container>
  );
};

export default PostSlider;


const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  position: relative;
  overflow: hidden;
  @media screen and (max-width: 580px) {
    
  }
`;

const Arrow = styled.div`
  width: 50px;
  height: 50px;
  background-color: #fff7f7;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: ${(props) => props.direction === "left" && "10px"};
  right: ${(props) => props.direction === "right" && "10px"};
  margin: auto;
  cursor: pointer;
  opacity: 0.1;
  &:hover{
    opacity: 0.5;
    transition: all 0.3s ease;
  }
  z-index: 2;
  @media screen and (max-width: 1024px) {
    height: 40px;
    width: 40px;
  }
  @media screen and (max-width: 768px) {
    height: 35px;
    width: 35px;
  }
  @media screen and (max-width: 580px) {
    width: 25px;
    height: 25px;
  }
`;

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  transition: all 1.5s ease;
  transform: translateX(${(props) => props.slideIndex * -100}%);
`;



// const SlideItem = styled.div`
// display: flex;
// align-items: center;
// position: relative;
// height: 100%;
// width: 100%;
// cursor: pointer;
// `;

// const TempImage = styled.img`
// height: 100%;
// width: 100vw;
// object-fit: cover;
// `;

// const TempInfos = styled.div`
// position: absolute;
// top: 30%;
// right: 0;
// left: 0;
// margin: auto;
// display: flex;
// align-items: center;
// justify-content: center;
// flex-direction: column;
// color: white;
// width: auto;
// `;

// const InfoDate = styled.span`
// text-align: center;
// font-size: 16px;
// font-weight: 500;

// @media screen and (max-width: 580px) {
//     font-size: 12px;
//   }
// `;

// const InfoTitle = styled.span`
// text-align: center;
// font-size: 45px;
// font-weight: 500px;
// margin-top: 50px;
// @media screen and (max-width: 1024px) {
//   font-size: 35px;
// }
// @media screen and (max-width: 768px) {
//   margin-top: 25px;
//   font-size: 25px;
// }
// @media screen and (max-width: 580px) {
//   font-size: 16px;
//   margin-top: 20px;
// }
// `;

// const InfoButton = styled(Link)`
// text-decoration: none;
// text-align: center;
// margin-top: 70px;
// padding: 15px 30px;
// width: 200px;
// border: 1px solid white;
// font-weight: 500;
// color: white;
// background-color: transparent;
// cursor: pointer;
// &:hover{
//     background-color: white;
//     color: #444;
//     transition: all 0.3s ease;
// }
// @media screen and (max-width: 1024px) {
//   padding: 12px;
// }
// @media screen and (max-width: 768px) {
//   margin-top: 25px;
//   padding: 8px;
//   font-size: 14px;
// }
// @media screen and (max-width: 580px) {
//   font-size: 11px;
//   margin-top: 20px;
//   width: auto;
//   padding: 5px;
// }
// `;
