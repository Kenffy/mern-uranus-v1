import React from 'react';
import styled from "styled-components";
import { useState, useEffect } from "react";
import * as api from "../../services/apiServices";
import UBlog from './UBlog';
import { Link } from 'react-router-dom';

const ExplorerBlogs = () => {
  const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const user = JSON.parse(localStorage.getItem("user"));
                const res = await api.getUsers(`samples=${6}`, user.accessToken);
                if(res.data){
                    setUsers(res.data.users.sort((a,b)=> a.username.localeCompare(b.username)));
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchUsers();
    }, []);
  

  return (
  <Container>
      <Wrapper>
        {users.map((user)=>(
            <UBlog
            key={user._id} 
            currUser={user}
            />
        ))}
      </Wrapper>
      <MoreButton to="/blogs">More Blogs</MoreButton>
  </Container>
  );
};

export default ExplorerBlogs;

const Container = styled.div`
width: 100%;
display: flex;
flex-direction: column;
gap: 2rem;
margin-top: 1rem;
`;


const Wrapper = styled.div`
  padding: 0 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
  gap: 1rem;
  margin-bottom: 1rem;
@media screen and (max-width: 580px){
  padding: 0 .8rem;
  gap: .5rem;
}
`;

const MoreButton = styled(Link)`
text-decoration: none;
text-align: center;
align-self: center;
padding: 10px 30px;
width: 15rem;
border-radius: 5px;
color: #888;
cursor: pointer;
border: 1px solid rgba(0,0,0,0.1);;
&:hover{
    background-color: rgba(0,0,0,0.1);
}
@media screen and (max-width: 580px){
    //width: 60%;
    padding: 10px 20px;
}
`;
