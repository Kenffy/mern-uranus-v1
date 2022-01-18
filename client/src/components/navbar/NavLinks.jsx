import { Close, Search } from '@material-ui/icons';
import React, { useState } from 'react'
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const NavLinks = ({user}) => {
    const [activeItem, setActiveItem] = useState(0);
    const [isSearch, setIsSearch] = useState(false);
    const [onWriteMenu, setOnWriteMenu] = useState(false);

    return (
        <Container>
            {!isSearch ?
            <Wrapper>
            <NavItem to="/"
                onClick={()=>setActiveItem(0)}
                selected={activeItem === 0? true:false}>
                HOME                       
            </NavItem>
            <NavItem to="/blogs"
                onClick={()=>setActiveItem(1)}
                selected={activeItem === 1? true:false}>
                BLOGS                      
            </NavItem>
            <NavItem to={`/profile/${user?.id}`}
                onClick={()=>setActiveItem(2)}
                selected={activeItem === 2? true:false}>
                BLOG                      
            </NavItem>
            <WriteItem
                onMouseOver={()=>setOnWriteMenu(true)}
                onMouseLeave={()=>setOnWriteMenu(false)}
                onClick={()=>setActiveItem(3)}
                selected={activeItem === 3? true:false}>
                WRITE
                {onWriteMenu &&
                <WriteOptions>
                    <OptionItem onClick={()=>setOnWriteMenu(false)} to="/write-image-post">Image Post</OptionItem>
                    <OptionItem onClick={()=>setOnWriteMenu(false)} to="/write-video-post">Video Post</OptionItem>
                    <OptionItem onClick={()=>setOnWriteMenu(false)} to="/write-audio-post">Audio Post</OptionItem>
                </WriteOptions> }                     
            </WriteItem>
            <SearchIcon onClick={()=>setIsSearch(!isSearch)}/>
            </Wrapper>
            :
            <>
            <SearchWrapper>
                <SearchInput placeholder="uranus search..."/>
                <CloseIcon onClick={()=>setIsSearch(!isSearch)}/>
            </SearchWrapper>
            </>
            }
        </Container>
    )
}

export default NavLinks;

const Container = styled.div`
display: flex;
align-items: center;
justify-content: center;
`;

const Wrapper = styled.div`
display: flex;
align-items: center;
padding: 20px 0px;
`;

const NavItem = styled(NavLink)`
text-decoration: none;
display: flex;
align-items: center;
padding: 0px 10px;
cursor: pointer;
font-size: 18px;
font-weight: 500;
color: ${(props)=> props.selected? "teal": "#444"};
&:hover{
    color: teal;
}

@media screen and (max-width: 580px) {
    font-size: 15px;
    padding: 0px 5px;
}
`;

const WriteItem = styled.div`
position: relative;
text-decoration: none;
display: flex;
align-items: center;
padding: 20px 10px;
cursor: pointer;
font-size: 18px;
font-weight: 500;
color: ${(props)=> props.selected? "teal": "#444"};
&:hover{
    color: teal;
}

@media screen and (max-width: 580px) {
    font-size: 15px;
    padding: 20px 5px;
}
`;

const WriteOptions = styled.div`
display: flex;
flex-direction: column;
position: absolute;
background-color: white;
box-shadow: 0px 10px 20px rgba(0,0,0,0.25);
top: 55px;
left: 0;
width: 130px;
`;

const OptionItem = styled(NavLink)`
text-decoration: none;
text-transform: uppercase;
padding: 10px;
font-size: 12px;
color: teal;
&:hover{
    color: white;
    background-color: teal;
    transition: all 0.3s ease;
}
`;

const SearchIcon = styled(Search)`
color: #444;
margin-left: 6px !important;
cursor: pointer;
&:hover{
    color: teal;
}
@media screen and (max-width: 580px) {
    margin-left: 0px;
    height: 22px !important;
    width: 22px !important;
}
`;

const CloseIcon = styled(Close)`
color: #444;
margin-left: 10px;
cursor: pointer;
&:hover{
    color: teal;
}
@media screen and (max-width: 580px) {
    margin-left: 0px;
    height: 18px !important;
    width: 18px !important;
}
`;

const SearchWrapper = styled.div`
display: flex;
align-items: center;
width: auto;
padding: 5px;
border-radius: 20px;
background-color: rgba(0,0,0,0.04);
@media screen and (max-width: 580px) {
    padding: 4px;
    margin-left: 5px;
}
`;

const SearchInput = styled.input`
width: 300px;
margin: 0px 10px;
padding: 4px;
font-size: 16px;
color: #444;
outline: none;
border: none;
background-color: transparent;
@media screen and (max-width: 580px) {
    font-size: 14px;
    max-width: 165px;
    padding: 4px;
}
`;
