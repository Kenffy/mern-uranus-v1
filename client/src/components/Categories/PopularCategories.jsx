import React from 'react';
import styled from 'styled-components';

const PopularCategories = () => {
  return (
    <Container>
      <Header>Popular Categories</Header>
    </Container>
  )
}

export default PopularCategories;

const Container = styled.div`
width: 100%;
`;

const Header = styled.h3`
display: flex;
padding: 10px 10px;
color: #555;
text-transform: uppercase;
font-weight: 600;
@media screen and (max-width: 580px) {
    font-size: 15px;
    padding: 10px 5px;
}
`;