import React from 'react';
import { Avatar } from "@material-ui/core";
import styled from "styled-components";
import { Link } from 'react-router-dom';

const UserCard = ({user}) => {

    //const CoverUrl = process.env.REACT_APP_COVERS;
    const ProfileUrl = process.env.REACT_APP_PROFILES;

  return (
    <Link to={`/profile/${user?._id}`}
    style={{textDecoration:"none", 
            color:"inherit"}}>
        <Container>
            <AvatarWrapper>
                <Profile src={user?.profile.includes("http")? user?.profile : ProfileUrl+user?.profile}/>
            </AvatarWrapper>
            <Username>{user?.username.length > 10? user?.username.slice(0, 10)+"..." : user?.username}</Username>
            <Footer>
                <Value>{user?.followers.length}</Value>
                <Info>followers</Info>
            </Footer>
        </Container>
    </Link>
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
font-size: 12px;
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
font-size: 10px;
`;

const Info = styled.span`
font-size: 10px;
margin-left: 2px;
`;
