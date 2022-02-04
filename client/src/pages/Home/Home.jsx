import styled from "styled-components";
import Header from '../../components/header/Header';
import PostList from "../../components/posts/PostList";
import Rightside from "../../components/Rightside/Rightside";
import { Container } from "../../globaleStyles";
//import Categories from "../../components/Categories/Categories";
import { useState } from "react";
import {CategoryList} from "../../components/Categories/CategoryList";
import CategorySlider from "../../components/Categories/CategorySlider";

const Home = () => {
    const [filter, setFilter] = useState(CategoryList[0]);

    return (
        <HomeContainer>
            <Header />
            <CategorySlider items={CategoryList} setFilter={setFilter} />
            {/* <Categories items={CategoryList} setFilter={setFilter}/> */}
            <HomeWrapper>
                <HomeLeft>
                    <PostList filter={filter}/>
                </HomeLeft>
                <HomeRight>
                    <Rightside posts={[]} users={[]}/>
                </HomeRight>
            </HomeWrapper>
        </HomeContainer>
    )
}

export default Home;

const HomeContainer = styled(Container)`
display: flex;
flex-direction: column;
background-color: white;
min-height: 100vh;
${Container}
`;

const HomeWrapper = styled.div`
display: flex;
@media screen and (max-width: 980px) {
    flex-direction: column;
}
`;

const HomeLeft = styled.div`
flex: 4;
margin-top: 10px;
padding: 0px 50px;
@media screen and (max-width: 1024px) {
    padding: 0px 30px;
}
@media screen and (max-width: 768px) {
    flex: 3;
    padding: 0px 20px;
}
@media screen and (max-width: 580px) {
    flex: 1;
    padding: 5px;
    width: 100%;
}
`;

const HomeRight = styled.div`
flex: 2;
overflow-y: hidden;
top: 70px;
padding-right: 20px;
@media screen and (max-width: 980px) {
    padding: 0px;
}
@media screen and (max-width: 768px) {
    flex: 2;
    padding: 0px;
}
@media screen and (max-width: 580px) {
    flex: 1;
    padding: 0px;
    width: 100%;
}
`;
