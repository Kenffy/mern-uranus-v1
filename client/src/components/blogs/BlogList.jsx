import { useContext } from 'react';
import styled from 'styled-components';
import { Context } from '../../context/Context';
import BlogCard from './BlogCard';

const BlogList = ({users, handleFollow}) => {
    const {user} = useContext(Context);
    const authUser = users.filter(u=>u._id === user.id)[0];
    users = users.filter(u=>u._id !== user.id);
    return (
        <Container>
            <Wrapper>
                {users.map((usr)=>(
                    <BlogCard 
                    key={usr._id} 
                    currUser={usr}
                    authUser={authUser}
                    handleFollow={handleFollow}
                    />
                ))}
            </Wrapper>
        </Container>
    )
}

export default BlogList;

const Container = styled.div`
display: flex;
flex-direction: column;
margin-bottom: 20px;
`;

const Wrapper = styled.div`
padding: 0px 20px;
display: grid;
grid-template-columns: repeat(4, 1fr);
gap: 15px;
@media screen and (max-width: 1024px) {
    padding: 0px 10px;
}
@media screen and (max-width: 768px) {
    gap: 10px;
    grid-template-columns: repeat(3, 1fr);
}
@media screen and (max-width: 580px) {
    padding: 2px;
    grid-template-columns: 1fr;
    gap: 10px;
}
`;
