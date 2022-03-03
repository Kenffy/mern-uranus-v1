import React from 'react';
import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import BlogList from '../../components/blogs/BlogList';
import { unfollowUser, followUser } from '../../context/Action';
import { Context } from '../../context/Context';
import { Container } from '../../globaleStyles';
import * as api from "../../services/apiServices";

const Blogs = () => {
    const [users, setUsers] = useState([]);
    const {dispatch, isFetching} = useContext(Context);
    useEffect(() => {
        const fetchUsers = async () => {
            dispatch({ type: "ACTION_START"});
            try {
                const user = JSON.parse(localStorage.getItem("user"));
                const res = await api.getUsers('', user.accessToken);
                if(res.data){
                    setUsers(res.data.sort((a,b)=> a.username.localeCompare(b.username)));
                    dispatch({ type: "ACTION_SUCCESS"});
                }
            } catch (error) {
                console.log(error);
                dispatch({ type: "ACTION_FAILED"});
            }
        };
        fetchUsers();
    }, [dispatch]);

    const handleFollow = async(id, isfriend)=>{
        if(!isfriend){
            console.log("follow called.");
            const usr = await followUser(dispatch, id);
            setUsers((prev)=>[...prev.filter(u=>u._id !== usr._id), usr]);
        }else{
            console.log("unfollow called.");
            const usr = await unfollowUser(dispatch, id);
            setUsers((prev)=>[...prev.filter(u=>u._id !== usr._id), usr]);
        }
    }
    
    return (
        <BlogsContainer>
            <Header>
                {isFetching && <h2 style={{fontWeight:"600"}}>Loading...</h2>}
            </Header>

            {!isFetching &&
            <BlogsWrapper>
                <BlogsLeft>
                    <BlogList 
                    users={users}
                    handleFollow={handleFollow}/>
                </BlogsLeft>
                <BlogsRight>
                </BlogsRight>
            </BlogsWrapper>
            }
        </BlogsContainer>
    )
}

export default Blogs;

const BlogsContainer = styled(Container)`
padding: 0px 20px;
display: flex;
flex-direction: column;
background-color: white;
min-height: 100vh;
@media screen and (max-width: 768px) {
    padding: 0px 1px;
}
@media screen and (max-width: 580px) {
    padding: 5px;
}
${Container}
`;

const Header = styled.div`
margin-top: 80px;
//height: 100px;
display: flex;
align-items: center;
justify-content: center;
font-weight: 500;
color: teal;
`;

const BlogsWrapper = styled.div`
display: flex;
@media screen and (max-width: 768px) {
    flex-direction: column;
}
@media screen and (max-width: 580px) {
    flex-direction: column;
}
`;

const BlogsLeft = styled.div`
flex: 1;
`;

const BlogsRight = styled.div`
//flex: 1;
`;
