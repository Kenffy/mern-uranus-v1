import React from 'react';
import { Avatar } from "@material-ui/core";
import styled from "styled-components";

const UserCard = ({user}) => {
  return (
  <Container>
      <AvatarWrapper>
          <Profile src={user?.profile}/>
      </AvatarWrapper>
      <Username>{user?.username.length > 10? user?.username.slice(0, 10)+"..." : user?.username}</Username>
      <Footer>
          <Value>{user?.followers.length}</Value>
          <Info>followers</Info>
      </Footer>
  </Container>
  );
};

export default UserCard;

const Container = styled.div`
display: flex;
align-items: center;
flex-direction: column;
border: 1px solid teal;
padding: 10px;
border-radius: 5px;
width: 100px;
margin: 5px;
cursor: pointer;
&:hover{
    -webkit-box-shadow: 3px 4px 9px -2px rgba(0,0,0,0.64); 
    box-shadow: 3px 4px 9px -2px rgba(0,0,0,0.64);
}
@media screen and (max-width: 1024px) {

}
@media screen and (max-width: 768px) {

}
@media screen and (max-width: 580px) {
    width: 90px;
}
`;

const AvatarWrapper = styled.div`

`;

const Profile = styled(Avatar)`
height: 70px !important;
width: 70px !important;
@media screen and (max-width: 980px) {
    height: 60px !important;
    width: 60px !important;
}
@media screen and (max-width: 580px) {
    height: 55px !important;
    width: 55px !important;
}
`;

const Username = styled.span`
margin-top: 4px;
text-align: center;
font-size: 14px;
font-weight: 600;
color: #444;
width: 100%;
`;

const Footer = styled.div`
display: flex;
align-items: center;
margin-top: 8px;
`;

const Value = styled.span`
font-size: 12px;
`;

const Info = styled.span`
font-size: 12px;
margin-left: 2px;
`;
