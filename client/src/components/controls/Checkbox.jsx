import React from 'react';
import styled from 'styled-components'

const Checkbox = ({ label, isChecked, handleChange }) => {
    return (
        <Container>
            <Wrapper>
                <Input
                    type="checkbox"
                    name={label}
                    checked={isChecked}
                    onChange={handleChange}
                />
                <Label>{label}</Label>
            </Wrapper>
        </Container>
    )
}

export default Checkbox;

const Container = styled.div`
margin-bottom: 12px;
`;

const Wrapper = styled.div`
display: flex;
align-items: center;
`;

const Label = styled.label`
font-size: 16px;
`;

const Input = styled.input`
margin-right: 10px;
`;
