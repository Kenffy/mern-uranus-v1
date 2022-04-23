import React from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import { useContext, useState } from 'react';
import { useHistory } from 'react-router';
import { loadInCommingData, logout, pushNotifications } from '../../context/Action';
import { Context } from '../../context/Context';
import IconItems from './IconItems';
import * as api from "../../services/apiServices";
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
    MoreWrapper,
    MoreIcon,
    MoreAvatar,
    IconWrapper,
    IconItem,
    IconBadge,
    Label,
    NavBadge,
    MessengerIcon,
    NotificationsIcon,
    SettingsIcon,
    LogoutIcon
  } from './navbar.elements';
import NavLinks from './NavLinks';

let useClickOutside = (handler) =>{
    let domNode = useRef();

    useEffect(()=>{
        let tmpHandler = (event) => {
            if(!domNode.current?.contains(event.target)){
                handler();
            }
        };
        document.addEventListener("mousedown", tmpHandler);
        return () => {
            document.removeEventListener("mousedown", tmpHandler);
        };
    },[handler]);

    return domNode;
}

const Navbar = () => {
    const ProfileUrl = process.env.REACT_APP_PROFILES;
    const {user, auth, messages, notifications, dispatch, socket} = useContext(Context);
    const [onProfile, setOnProfile] = useState(false);
    const [followers, setFollowers] = useState([]);

    const openNotifications = notifications.filter(n=>n.opened === false);

    const history = useHistory();

    useEffect(()=>{
        const fetchData = async()=>{
            loadInCommingData(dispatch);
        }
        fetchData();
    },[dispatch]);

    useEffect(()=>{
        const loadUsers = async() =>{
            try {
                const user = JSON.parse(localStorage.getItem("user"));
                const res = await api.getFollowers(user?.id, user?.accessToken);
                if(res.data){
                    setFollowers(res.data);
                }
            } catch (error) {
                console.log(error);
            }
        }
        loadUsers();
    },[]);


    useEffect(() => {
        if(socket && auth){
            socket.emit("addUser", auth._id);
            socket.on("getUsers", (users) => {
                const o_users = followers.filter((follower) => users.some((u) => u.userId === follower._id));
                dispatch({type: "ONLINE_USERS", payload: o_users})
            });
        }
        
    }, [socket, dispatch, auth, followers]);

    useEffect(() => {
        socket.on("getNotifications", (data) => {
            pushNotifications(dispatch, data);
        });
    }, [socket, dispatch]);

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

    let domNode = useClickOutside(()=>{
        setOnProfile(false);
    });

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
                    <IconItems messages={messages} notifications={openNotifications}/>
                    <AvatarWrapper ref={domNode}>
                        <MoreWrapper onClick={()=>setOnProfile(!onProfile)}>
                            <MoreAvatar src={auth?.profile.includes("http")? auth?.profile : ProfileUrl+auth?.profile}/>
                            <NavBadge 
                            color="error"
                            variant="dot"
                            badgeContent={messages.length + openNotifications.length}>
                                <MoreIcon/>
                            </NavBadge>
                        </MoreWrapper>
                        
                        {onProfile &&
                        <NavOptions 
                        onFocus={handleFocus}
                        onBlur={handleBlur}>
                            <InfoWrapper>
                                <NavAvatar src={auth?.profile.includes("http")? auth?.profile : ProfileUrl+auth?.profile}/>
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
                                    <div style={{display: "flex", alignItems: "center"}}>
                                        <MessengerIcon />
                                        <Label>Messages</Label>
                                    </div>
                                    <IconBadge badgeContent={messages.length}
                                    color="error"
                                    max={9} />
                                </IconItem>
                                <IconItem
                                onClick={handleNotify}>
                                    <div style={{display: "flex", alignItems: "center"}}>
                                        <NotificationsIcon />
                                        <Label>Notifications</Label>
                                    </div>
                                    <IconBadge badgeContent={notifications.length}
                                    color="error"
                                    max={9} />
                                </IconItem>
                                {/* <IconItem>
                                    <div style={{display: "flex", alignItems: "center"}}>
                                        <SettingsIcon />
                                        <Label onClick={()=>setOnProfile(!onProfile)}>Settings</Label>
                                    </div>
                                </IconItem>
                                <IconItem>
                                    <div style={{display: "flex", alignItems: "center"}}>
                                        <LogoutIcon />
                                        <Label onClick={handleLogout}>Logout</Label>
                                    </div>
                                </IconItem> */}
                            </IconWrapper>
                            <div style={{padding: "0px 5px"}}>
                                <IconItem>
                                    <div style={{display: "flex", alignItems: "center"}}>
                                        <SettingsIcon />
                                        <Label onClick={()=>setOnProfile(!onProfile)}>Settings</Label>
                                    </div>
                                </IconItem>
                                <IconItem>
                                    <div style={{display: "flex", alignItems: "center"}}>
                                        <LogoutIcon />
                                        <Label onClick={handleLogout}>Logout</Label>
                                    </div>
                                </IconItem>
                            </div>
                            
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