import React from 'react';
import { CategoryList } from '../../components/Categories/CategoryList';
import styled from 'styled-components';

const CategoryPage = () => {
    const categories = CategoryList.filter(c=>c.name !== "All" && c.name !== "Others");
    const CategoryUrl = process.env.REACT_APP_CAT;
    return (
      <Container>
        <Heading>categories</Heading>
        <Wrapper>
        {categories.map(cat=>(
          <Category key={cat.id}>
            <Cover src={CategoryUrl+cat?.icon} alt=""/>
            <Name>{cat?.name}</Name>
          </Category>
        ))}
        </Wrapper>
      </Container>
    )
}

export default CategoryPage;

const Container = styled.div`
display: flex;
flex-direction: column;
gap: 2rem;
margin-bottom: 2rem;
`;

const Heading = styled.span`
margin-top: 80px;
font-size: 18px;
width: 100%;
padding: 1rem 2rem;
color: #555;
text-transform: uppercase;
font-weight: 600;
@media screen and (max-width: 580px){
    padding: 0 .8rem;    
}
`;

const Wrapper = styled.div`
  padding: 0 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
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