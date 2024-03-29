import React from 'react';
import { NavigateBefore, NavigateNext } from "@material-ui/icons";
import styled from "styled-components";
import { useRef, useState } from "react";

const CategorySlider = ({items, setFilter}) => {

  let categoryRef = useRef(null);

  const [active, setActive] = useState(0);
  const handleClick = (category)=>{
        setActive(category.id);
        setFilter(category);
  }

  const scrollLeft = () =>{
    if(categoryRef.current){
        categoryRef.current.scrollBy({
            top: 0,
            left: 150,
            behavior: "smooth",
        });
    }
  }

  const scrollRight = () =>{
    if(categoryRef.current){
        categoryRef.current.scrollBy({
            top: 0,
            left: -150,
            behavior: "smooth",
        });
    }
  }

  return (
  <Container>
    {/* <Header>Categories</Header> */}
    <Wrapper>
        <Arrow onClick={scrollLeft}>
            <ArrowLeft />
        </Arrow>
        <Slider ref={categoryRef}>
        {items.map((item) => (
            <Category key={item?.id}
            onClick={() => handleClick(item)} 
            isActive={active===item?.id? true:false}>
                <CategoryName>{item?.name}</CategoryName>
            </Category>
        ))}
        </Slider>
        <Arrow onClick={scrollRight}>
            <ArrowRight />
        </Arrow>
    </Wrapper>
  </Container>
  );
};

export default CategorySlider;

const Container = styled.div`
position: sticky;
top: 60px;
z-index: 10;
margin: 20px 0;
padding: 5px;
width: 100%;
background-color: white;
@media screen and (max-width: 580px) {
    margin: 10px 0;
}
`;

const Wrapper = styled.div`
width: 100%;
display: flex;
align-items: center;
justify-content: space-between;
`;

const Arrow = styled.div`
height: 35px;
width: 35px;
border-radius: 50%;
display: flex;
align-items: center;
justify-content: center;
margin: 0px 5px;
background-color: rgba(0,0,0,0.1);
cursor: pointer;
color: teal;
&:hover{
    background-color: teal;
    color: white;
    transition: 0.3s all ease;
}
@media screen and (max-width: 580px) {
    display: none;
}
`;

const ArrowLeft = styled(NavigateBefore)`
height: 30px !important;
width: 30px !important;
@media screen and (max-width: 580px) {
    height: 25px !important;
    width: 25px !important;
}
`;

const ArrowRight = styled(NavigateNext)`
height: 30px !important;
width: 30px !important;
@media screen and (max-width: 580px) {
    height: 25px !important;
    width: 25px !important;
}
`;

const Slider = styled.div`
width: 100%;
display: flex;
align-items: center;
overflow-x: scroll;
::-webkit-scrollbar {
    height: 1px;
}
::-webkit-scrollbar-track {
    background-color: transparent;
}
::-webkit-scrollbar-thumb {
    background-color: transparent;
}
`;

const Category = styled.div`
display: flex;
justify-content: flex-start;
padding: 6px 15px;
margin: 5px;
border-radius: 25px;
cursor: pointer;
color: ${(props) => props.isActive? "white": "#444"};
background-color: ${(props) => props.isActive? "teal": "rgba(0,0,0,0.05)"};
&:hover{
    color: white;
    background-color: teal;
    transition: all 0.3s ease;
}
`;

const CategoryName = styled.span`
font-size: 14px;
display: flex;
align-items: center;
@media screen and (max-width: 580px) {
    font-size: 13px;
}
`;

