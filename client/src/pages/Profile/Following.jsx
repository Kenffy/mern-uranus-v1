import React from 'react';
import { Avatar } from "@material-ui/core";
import { useContext, useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Context } from "../../context/Context";
import * as api from "../../services/apiServices";

const Following = ({userId}) => {

    const {user, dispatch, isFetching} = useContext(Context);
    const [following, setFollowing] = useState([]);

    useEffect(()=>{
        const loadUsers = async() =>{
            dispatch({ type: "ACTION_START"});
            try {
                const creds = JSON.parse(localStorage.getItem("user"));
                const res = await api.getFollowing(userId, creds.accessToken);
                if(res.data){
                    setFollowing(res.data.sort((a,b)=> a.username.localeCompare(b.username)));
                    dispatch({ type: "ACTION_SUCCESS"});
                }
            } catch (error) {
                console.log(error);
                dispatch({ type: "ACTION_FAILED"});
            }
        }
        loadUsers();
    },[dispatch, userId]);

    return (
        <Container>
            {isFetching && <h3 style={{fontWeight:"600", color: "teal"}}>Loading...</h3>}
            {!isFetching &&
            <ContactWrapper>
            {following.map((usr) => (
                <ContactItem key={usr?._id}>
                    
                        <Wrapper>
                            <ButtonLink to={`/profile/${usr._id}`}>
                                <ContactAvatar src={usr?.profile}/>
                            </ButtonLink>
                            <ButtonLink to={`/profile/${usr._id}`}>
                                <ContactInfos>
                                    <ContactName>{usr?.username}</ContactName>
                                    <ContactFriends>{usr?.followers?.length || 0} followers</ContactFriends>
                                </ContactInfos>
                            </ButtonLink>
                        </Wrapper>
                    
                    <ContactActions>
                        {usr?._id !== user.id &&
                        <ContactButton>
                            {usr.followers.includes(user?.id)? "following" : "follow"}
                        </ContactButton>}
                    </ContactActions>
                </ContactItem>
            ))}
            </ContactWrapper>
            }
        </Container>
    )
}

export default Following;

const Container = styled.div`
width: 100%;
`;

const ContactWrapper = styled.div`
width: 100%;
`;

const Wrapper = styled.div`
width: 100%;
display: flex;
align-items: center;
`;

const ContactAvatar = styled(Avatar)`
height: 50px !important;
width: 50px !important;
`;

const ContactItem = styled.div`
display: flex;
align-items: center;
padding: 10px 0px;
border-bottom: 1px solid rgba(0,0,0,0.1);
`;

const ContactInfos = styled.div`
display: flex;
flex-direction: column;
justify-content: space-between;
margin-left: 10px;
`;

const ContactName = styled.span`
font-weight: 600;
color: #555;
cursor: pointer;
`;

const ContactFriends = styled.span`
font-size: 12px;
margin-top: 8px;
`;

const ContactActions = styled.div`
display: flex;
align-items: center;
`;

const ContactButton = styled.div`
display: flex;
align-items: center;
justify-content: center;
width: 90px;
padding: 5px 10px;
color: teal;
border: 1px solid teal;
cursor: pointer;
&:hover{
    background-color: teal;
    color: white;
    transition: all 0.3s ease;
}
`;

const ButtonLink = styled(Link)`
text-decoration: none;
color: inherit;
`;