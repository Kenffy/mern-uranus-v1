import { useState } from "react";
import styled from "styled-components";

export default function Categories({items, setFilter}) {
    const [active, setActive] = useState(0);
    const handleClick = (category)=>{
        setActive(category.id);
        setFilter(category);
    }
    return (
        <Container>
            <Title>Categories</Title>
            <Wrapper>
                {items.map((item) => (
                    <Category key={item.id}
                    onClick={() => handleClick(item)} 
                    isActive={active===item.id? true:false}>
                        <CategoryName>{item.name}</CategoryName>
                    </Category>
                ))}
            </Wrapper>
        </Container>
    )
};

const Container = styled.div`
display: flex;
flex-direction: column;
background-color: white;
border-top: 1px solid rgba(0,0,0,0.1);
border-bottom: 1px solid rgba(0,0,0,0.1);
position: sticky;
top: 0px;
z-index: 10;
@media screen and (max-width: 768px) {
    top: 10px;
    padding: 10px 0px;
}
@media screen and (max-width: 580px) {
    margin-top: 20px;
    width: 100%;
}
`
const Title = styled.h3`
padding: 20px 50px;
font-weight: 600;
color: #444;
border-bottom: 1px solid rgba(0,0,0,0.1);
@media screen and (max-width: 768px) {
    padding: 10px;
}
@media screen and (max-width: 580px) {
    padding: 10px 30px;
    font-size: 15px;
}
`;
const Wrapper = styled.div`
display: flex;
margin-top: 5px;
padding: 5px 50px;
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
@media screen and (max-width: 768px) {
    padding: 5px 5px;
}
@media screen and (max-width: 580px) {
    padding: 5px 0px;
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
