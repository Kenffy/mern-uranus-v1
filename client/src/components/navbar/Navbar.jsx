
import { useContext, useState } from 'react';
import { useHistory } from 'react-router';
import { Context } from '../../context/Context';
import {logout} from "../../redux/actions/authActions";
import IconItems from './IconItems';
import {
    Nav,
    NavbarContainer,
    NavLogo,
    Logo,
    LogoIcon,
    LinkWrapper,
    NavIcons,
    NavAvatar,
    AvatarWrapper,
    NavButton,
    NavOptions,
    InfoWrapper,
    ProfileInfo,
    ProfileView,
    ProfileName,
    Settings,
    Exit,
    MoreWrapper,
    MoreIcon,
    MoreAvatar,
    IconWrapper,
    IconItem,
    IconBadge,
    Label,
    NavBadge,
  } from './navbar.elements';
import NavLinks from './NavLinks';

const Navbar = () => {
    const {user, dispatch} = useContext(Context);
    const [onProfile, setOnProfile] = useState(false);

    const history = useHistory();
    const handleLogout = async () => {
        try{
            logout(dispatch, user);
            setOnProfile(false)
        }catch(err){
            console.log(err);
        }
    };

    const handleFocus = ()=>{
        console.log("focused");
    }

    const handleBlur = ()=>{
        console.log("blur");
    }

    const handleNotify = ()=>{
        setOnProfile(false)
        history.push('/notifications');
    }

    const handleMessage = ()=>{
        setOnProfile(false)
        history.push('/messages');
    }

    return (
        <Nav>
            <NavbarContainer>
                <NavLogo to="/">
                    <LogoIcon></LogoIcon>
                    <Logo>URANUS</Logo>
                </NavLogo>
                {user &&
                <LinkWrapper>
                  <NavLinks user={user}/>
                </LinkWrapper>
                }
                <NavIcons>
                    {!user?
                    <>
                    <NavButton to="/sign-in">
                        LOGIN
                    </NavButton>
                    <NavButton to="/sign-up">
                        REGISTER
                    </NavButton>
                    </>
                    :
                    <>
                    <IconItems />
                    <AvatarWrapper>
                        <MoreWrapper onClick={()=>setOnProfile(!onProfile)}>
                            <MoreAvatar src={user?.profile}/>
                            <NavBadge 
                            color="error"
                            variant="dot"
                            badgeContent={1}>
                                <MoreIcon/>
                            </NavBadge>
                        </MoreWrapper>
                        
                        {onProfile &&
                        <NavOptions 
                        onFocus={handleFocus}
                        onBlur={handleBlur}>
                            <InfoWrapper>
                                <NavAvatar src={user?.profile}/>
                                <ProfileInfo>
                                    <ProfileName>{user?.username}</ProfileName>
                                    <ProfileView to={`/profile/${user.id}`}
                                    onClick={()=>setOnProfile(!onProfile)}>
                                        My Blog
                                    </ProfileView>
                                </ProfileInfo>
                            </InfoWrapper>
                            <IconWrapper>
                                <IconItem
                                onClick={handleMessage}>
                                    <Label>Messages</Label>
                                    <IconBadge badgeContent={5}
                                    color="error"
                                    max={9} />
                                </IconItem>
                                <IconItem
                                onClick={handleNotify}>
                                    <Label>Notifications</Label>
                                    <IconBadge badgeContent={3}
                                    color="error"
                                    max={9} />
                                </IconItem>
                            </IconWrapper>
                            <Settings onClick={()=>setOnProfile(!onProfile)}>
                                Settings
                            </Settings>
                            <Exit onClick={handleLogout}>
                                Logout
                            </Exit>
                        </NavOptions>
                        }
                    </AvatarWrapper>
                    </>
                    }
                </NavIcons>
            </NavbarContainer>
        </Nav>
    )
}

export default Navbar;