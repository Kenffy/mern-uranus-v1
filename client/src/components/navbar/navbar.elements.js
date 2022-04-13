import { Avatar, Badge } from '@material-ui/core';
import { EmailRounded, Menu, SettingsRounded, ExitToAppRounded, Notifications } from '@material-ui/icons';
//import { Menu, MoreVert } from '@material-ui/icons';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { Container } from '../../globaleStyles';

export const Nav = styled.nav`
width: 100%;
position: fixed;
border-bottom: .2rem solid rgba(0,0,0,.1);
z-index: 999;
`;

export const NavbarContainer = styled(Container)`
display: flex;
height: 60px;
background-color: white;
//box-shadow: 10px 0px 0px rgba(0,0,0,0.25);
align-items: center;
justify-content: space-between;
padding-right: 20px;
padding-left: 20px;
@media screen and (max-width: 580px) {
    width: 100%;
    padding: 10px;
}
${Container}
`;

export const NavLogo = styled(NavLink)`
text-decoration: none;
font-size: 22px;
font-weight: 600;
color: teal;
display: flex;
align-items: center;
@media screen and (max-width: 580px) {
    font-size: 14px;
    margin-right: 3px;
}
`;

export const LogoIcon = styled.div`
height: 30px;
width: 30px;
border-radius: 50%;
background: linear-gradient(
      teal,
    rgba(11, 138, 105, 0.5)
    );
display: none;
@media screen and (max-width: 580px) {
    display: flex;
}
`;

export const Logo = styled.div`
@media screen and (max-width: 580px) {
    display: none;
}
`;

export const LinkWrapper = styled.div`

`;

export const NavIcons = styled.div`
display: flex;
align-items: center;
`;

export const AvatarWrapper = styled.div`
position: relative;
`;

export const MoreWrapper = styled.div`
display: flex;
align-items: center;
`;

export const MoreIcon = styled(Menu)`
color: teal;
cursor: pointer;
display: none !important;
@media screen and (max-width: 580px) {
    display: flex !important;
    height: 28px !important;
    width: 28px !important;
}
`;

// export const MoreIcon = styled(MoreVert)`
// color: teal;
// cursor: pointer;
// display: none !important;
// @media screen and (max-width: 580px) {
//     display: flex !important;
// }
// `;

export const MoreAvatar = styled(Avatar)`
cursor: pointer;
@media screen and (max-width: 580px) {
    height: 30px !important;
    width: 30px !important;
    margin-right: 5px;
}
@media screen and (max-width: 580px) {
    display: none !important;
}
`;

export const NavAvatar = styled(Avatar)`
height: 55px !important;
width: 55px !important;
cursor: pointer;
@media screen and (max-width: 580px) {
    height: 45px !important;
    width: 45px !important;
    margin-right: 5px;
}
`;

export const NavOptions = styled.div`
position: absolute;
min-width: 260px;
min-height: 150px;
background-color: white;
right: 50px;
top: 0;
z-index: 999;
border-radius: 10px;
box-shadow: 0px 10px 20px rgba(0,0,0,0.25);
padding: 10px;
display: flex;
flex-direction: column;
@media screen and (max-width: 580px) {
    min-width: 240px;
    min-height: 100px;
    right: 25px;
}
`;

export const NavButton = styled(NavLink)`
text-decoration: none;
font-size: 16px;
color: #444;
margin-left: 10px;
&:hover{
    color: teal;
}
@media screen and (max-width: 580px) {
    font-size: 13px;
}
`;

export const InfoWrapper = styled.div`
display: flex;
align-items: center;
width: 100%;
margin-top: 5px;
`;

export const ProfileInfo = styled.div`
display: flex;
flex-direction: column;
margin-left: 10px;
@media screen and (max-width: 580px) {
    margin-left: 5px;
}
`;

export const ProfileName = styled.span`
cursor: pointer;
font-size: 18px;
font-weight: 600;
color: #444;
@media screen and (max-width: 580px) {
    font-size: 16px;
}
`;

export const ProfileView = styled(NavLink)`
text-decoration: none;
cursor: pointer;
font-size: 16px;
font-weight: 600;
color: teal;
margin-top: 8px;
@media screen and (max-width: 580px) {
    font-size: 14px;
}
`;

export const IconWrapper = styled.div`
display: none;
@media screen and (max-width: 580px) {
    display: flex;
    flex-direction: column;
    color: #444;
    font-size: 15px;
    padding: 5px;
    margin-top: 10px;
}
`;

export const Label = styled.label`
margin-left: 15px;
font-size: 16px;
`;

export const IconItem = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
//margin: 5px 0px;
padding: 12px 5px;
cursor: pointer;
&:hover{
    color: teal;
}
`;

export const IconBadge = styled(Badge)`
margin-right: 15px;
`;

export const NavBadge = styled(Badge)`
    display: none !important;
    @media screen and (max-width: 580px) {
        display: flex !important;
        margin-right: 10px;
    }
`;

export const SettingsIcon = styled(SettingsRounded)`
height: 20px !important;
width: 20px !important;
color: teal;
`;

export const MessengerIcon = styled(EmailRounded)`
height: 20px !important;
width: 20px !important;
color: teal;
`;

export const NotificationsIcon = styled(Notifications)`
height: 20px !important;
width: 20px !important;
color: teal;
`;

export const LogoutIcon = styled(ExitToAppRounded)`
height: 20px !important;
width: 20px !important;
color: teal;
`;

