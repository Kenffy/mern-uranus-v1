import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import * as api from "../../services/apiServices";

const CategoryPage = () => {
    const [categories, setCategories] = useState([]);
    const CategoryUrl = process.env.REACT_APP_CAT;

    useEffect(()=>{
      const getAllCategories = async()=>{
        try {
          const creds = JSON.parse(localStorage.getItem("user"));
          const res = await api.getCategories('', creds.accessToken);
          res?.data && setCategories(res.data.filter(c=>c.name !== "All" && c.name !== "Others"));
        } catch (err) {
          console.log(err)
        }
      }
      getAllCategories();
    },[]);

    return (
      <Container>
        <Heading>categories</Heading>
        <Wrapper>
        {categories.map(cat=>(
          <Category key={cat?.id}>
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
  gap: 1rem;
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
width: 10rem;
height: 10rem;
border-radius: 10px;
overflow: hidden;
position: relative;
border: 1px solid rgba(0,0,0,0.1);
cursor: pointer;
&:hover{
    box-shadow: 0px 5px 5px rgba(0,0,0,0.3);
}
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