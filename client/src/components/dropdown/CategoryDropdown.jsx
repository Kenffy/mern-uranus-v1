//import { Lock, People, Public } from '@material-ui/icons';
import React from 'react'
import styled from 'styled-components';

const CategoryDropdown = ({items, setCurrCategory}) => {
    return (
        <Container>
            <Title>Category</Title>
            <Select onChange={(e)=>setCurrCategory(e.target.value)}>
                {items.length > 0 && 
                items.map((item, index)=>(
                    <Option key={index}
                            value={item}>
                        {item}
                    </Option>
                ))
                }
            </Select>
        </Container>
    )
}

export default CategoryDropdown;

const Container = styled.div`
display: flex;
flex-direction: column;
width: 100%;
`;

const Title = styled.label`
font-size: 15px;
color: gray;
`;

const Select = styled.select`
padding: 6px 10px;
margin: 10px 0px;
font-size: 15px;
border-radius: 5px;
outline: none;
`;

const Option = styled.option`
color: #444;
font-weight: 500;
line-height: 50px !important;
background-color: white;
&:hover{
    background-color: rgba(0,0,0,0.05);
}
`;

// const OptionValue = styled.span`

// `;

// const PublicIcon = styled(Public)`

// `;

// const FriendsIcon = styled(People)`

// `;

// const PrivateIcon = styled(Lock)`

// `;
