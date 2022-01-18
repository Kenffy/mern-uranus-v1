import styled, { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: 'Oswald', sans-serif;
  //font-family: 'Montserrat', sans-serif;
 } 

 body{
  background-color: lightgray;
 }
`;

export const Container = styled.div`
z-index: 1;
width: 100%;
max-width: 1370px;
margin-right: auto;
margin-left: auto;
@media screen and (max-width: 580px) {
    padding: 0px 6px;
  }
`;

export default GlobalStyle;