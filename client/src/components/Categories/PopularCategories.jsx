import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { CategoryList } from './CategoryList';

const PopularCategories = () => {
  let categories = CategoryList.filter(c=>c.name !== "All" && c.name !== "Others");
  categories = categories.slice(0,6);
  const CategoryUrl = process.env.REACT_APP_CAT;
  return (
    <Container>
      <Wrapper>
      {categories.map(cat=>(
        <Category key={cat.id}>
          <Cover src={CategoryUrl+cat?.icon} alt=""/>
          <Name>{cat?.name}</Name>
        </Category>
      ))}
      </Wrapper>
      <MoreButton to="/categories">More Categories</MoreButton>
    </Container>
  )
}

export default PopularCategories;

const Container = styled.div`
display: flex;
flex-direction: column;
gap: 2rem;
margin-top: 1rem;
margin-bottom: 2rem;
`;

const Wrapper = styled.div`
  padding: 0 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
  gap: 1.5rem;
  margin-bottom: 1rem;
@media screen and (max-width: 580px){
  padding: 0 .8rem;
  gap: .5rem;
}
`;

const Cover = styled.div`
height: 100%;
width: 100%;
background-image: ${props=> `linear-gradient(transparent, rgba(0,0,0,0.5)), url(${props.src})`};
background-position: center;
background-repeat: no-repeat;
background-size: cover;
background-color: teal;
`;

const Category = styled.div`
min-width: 10rem;
min-height: 10rem;
border-radius: 10px;
overflow: hidden;
position: relative;
cursor: pointer;
${Cover}:hover{
  transform: scale(1.2);
  transition: all .3s;
}
`;

const Name = styled.span`
width: 100%;
color: white;
font-weight: 500;
text-align: center;
position: absolute;
top: 6rem;
`;

const MoreButton = styled(Link)`
text-decoration: none;
text-align: center;
align-self: center;
padding: 10px 30px;
width: 15rem;
border-radius: 5px;
color: #888;
cursor: pointer;
border: 1px solid rgba(0,0,0,0.1);;
&:hover{
    background-color: rgba(0,0,0,0.1);
}
@media screen and (max-width: 580px){
    //width: 60%;
    padding: 10px 20px;
}
`;


