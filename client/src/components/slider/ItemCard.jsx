import styled from "styled-components";

const ItemCard = ({post}) => {
  return (
  <Container>
      <Cover bg={post?.images[0] || post?.audios[0]?.cover} />
      <Wrapper>
          
      </Wrapper>
  </Container>
  );
};

export default ItemCard;

const Container = styled.div`
position: relative;
width: 100%;
height: 700px;
@media screen and (max-width: 580px) {
    height: 250px;
    padding: 0;
    margin: 0;
}
`;

const Cover = styled.div`
position: absolute;
width: 100%;
height: 100%;
background: ${props=>props.bg? `url(${props.bg})` : "teal"};
background-repeat: no-repeat;
background-size: cover;
`;

const Wrapper = styled.div`
width: 60%;
height: 50%;
border-radius: 10px;
-webkit-box-shadow: 3px 4px 9px -2px rgba(0,0,0,0.64); 
 box-shadow: 3px 4px 9px -2px rgba(0,0,0,0.64);
background-color: white;
opacity: 0.8;
position: absolute;
top: 100px;
left: 0;
right: 0;
bottom: 0;
margin: auto;
@media screen and (max-width: 580px) {
    width: 70%;
    top: 50px;
}
`;
