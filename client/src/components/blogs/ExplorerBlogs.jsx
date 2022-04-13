import React from 'react';
import styled from "styled-components";
import { useState, useEffect } from "react";
import * as api from "../../services/apiServices";
import UBlog from './UBlog';

const ExplorerBlogs = () => {
  const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const user = JSON.parse(localStorage.getItem("user"));
                const res = await api.getUsers(`pop=${6}`, user.accessToken);
                if(res.data){
                    setUsers(res.data.sort((a,b)=> a.username.localeCompare(b.username)));
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchUsers();
    }, []);
  

  return (
  <Container>
      <Header>Explore</Header>
      <Wrapper>
        {users.map((user)=>(
            <UBlog
            key={user._id} 
            currUser={user}
            />
        ))}
      </Wrapper>
  </Container>
  );
};

export default ExplorerBlogs;

const Container = styled.div`
width: 100%;
`;

const Header = styled.h3`
display: flex;
padding: 10px 10px;
color: #555;
text-transform: uppercase;
font-weight: 600;
@media screen and (max-width: 580px) {
    font-size: 15px;
    padding: 10px 5px;
}
`;


const Wrapper = styled.div`
  padding: 0 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
  gap: 1.5rem;
  margin-bottom: 1rem;
@media screen and (max-width: 580px){
  padding: 0 .8rem;
  gap: 1rem;
}
`;