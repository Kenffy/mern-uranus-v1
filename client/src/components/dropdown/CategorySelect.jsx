import styled from 'styled-components';
import Select from 'react-select';

const CategorySelect = ({categories, value, setCurrCategory}) => {
    return (
        <Container>
            <Title>Category</Title>
            <Select options={categories} 
            value={value} 
            placeholder="-- Select Category --"
            onChange={(e)=>setCurrCategory(e)}/>
        </Container>
    )
}

export default CategorySelect;

const Container = styled.div`
padding: 10px 0px;
display: flex;
flex-direction: column;
width: 100%;
`;

const Title = styled.label`
font-size: 15px;
margin-bottom: 5px;
color: gray;
`;

