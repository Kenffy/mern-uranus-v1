//import { Lock, People, Public } from '@material-ui/icons';
import React from 'react'
import styled from 'styled-components';

const StatusDropdown = ({items, setCurrStatus}) => {
    return (
        <Container>
            <Title>Privacy</Title>
            <Select onChange={(e)=>setCurrStatus(e.target.value)}>
                {items.map((item)=>(
                    <Option key={item.id}
                            value={item.name}>
                        {item.name}
                    </Option>
                ))
                }
            </Select>
        </Container>
    )
}

export default StatusDropdown;

const Container = styled.div`
display: flex;
flex-direction: column;
border-radius: 5px;
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
