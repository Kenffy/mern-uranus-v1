import styled from "styled-components";
import Carousel from "react-elastic-carousel";
import { useState, useEffect, useContext } from "react";
import { useRef } from "react";
import { NavigateBefore, NavigateNext } from "@material-ui/icons";
import * as api from "../../services/apiServices";
import UserCard from "./UserCard";
import { Context } from "../../context/Context";

const PopularBlogs = () => {

  let carouselRef = useRef(null);
  const [users, setUsers] = useState([]);
  const {dispatch, isFetching} = useContext(Context);

    useEffect(() => {
        const fetchUsers = async () => {
            dispatch({ type: "ACTION_START"});
            try {
                const user = JSON.parse(localStorage.getItem("user"));
                const res = await api.getUsers(user.accessToken);
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

  return (
  <Container>
      <Header>Most Popular Blogs</Header>
      {isFetching? 
      <Wrapper>
          <Loading>Loading...</Loading>
      </Wrapper>
      :
      <Wrapper>
        <Arrow 
          dir="left" 
          onClick={() => carouselRef.slidePrev()}>
            <ArrowLeft />
        </Arrow>
        <Arrow 
          dir="right" 
          onClick={() => carouselRef.slideNext()}>
              <ArrowRight />
        </Arrow>
        <Carousel
        ref={ref => (carouselRef = ref)}
        pagination={false}
        itemsToShow={4}
        >
        {users.map((user)=>(
            <UserCard key={user._id} user={user} />
        ))}
        </Carousel>
      </Wrapper>}
  </Container>
  );
};

export default PopularBlogs;

const Container = styled.div`
margin-top: 30px;
width: 100%;
border-radius: 10px;
border-radius: 5px;
border: 1px solid rgba(0,0,0,0.1);
box-shadow: 0px 1px 1px rgba(0,0,0,0.01);
-webkit-box-shadow: 3px 4px 9px -2px rgba(0,0,0,0.64); 
box-shadow: 3px 4px 9px -2px rgba(0,0,0,0.64);

`
const Header = styled.h3`
display: flex;
padding: 10px 20px;
color: #444;
border-bottom: 1px solid rgba(0,0,0,0.2);
font-weight: 600;
@media screen and (max-width: 580px) {
    font-size: 15px;
}
`

const Loading = styled.h3`
display: flex;
padding: 10px 20px;
color: teal;
font-weight: 600;
@media screen and (max-width: 580px) {
    font-size: 15px;
}
`

const Wrapper = styled.div`
position: relative;
margin: 20px 0px;
`;

const Arrow = styled.div`
background-color: teal;
display: flex;
align-items: center;
justify-content: center;
height: 30px;
width: 30px;
border-radius: 50%;
opacity: 0.1;
&:hover{
  opacity: 0.8;
  transition: 0.3s all ease ;
}
position: absolute;
top: 0;
bottom: 0;
left: ${(props) => props.dir === "left" && "5px"};
right: ${(props) => props.dir === "right" && "5px"};
margin: auto;
cursor: pointer;
z-index: 1;
`;

const ArrowLeft = styled(NavigateBefore)`
height: 25px !important;
width: 25px !important;
color: white;
`;

const ArrowRight = styled(NavigateNext)`
height: 25px !important;
width: 25px !important;
color: white;
`;
