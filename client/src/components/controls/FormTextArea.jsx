import React from 'react';
import styled from "styled-components";
import { useState } from "react";
import "./formInput.css";

const FormTextArea = (props) => {

    const [focused, setFocused] = useState(false);
    const { label, value, errorMessage, onChange, id, ...inputProps } = props;

    const handleFocus = (e) => {
        setFocused(true);
    };

    return (
        <Container>
            <label className="form-label">{label}</label>
            <TextArea className="form-input"
                {...inputProps}
                onChange={onChange}
                onBlur={handleFocus}
                value={value}
                onFocus={() =>
                    inputProps.name === "confirmPassword" && setFocused(true)
                }
                focused={focused.toString()}
            />
            <span className="form-span">{errorMessage}</span>
        </Container>
    )
}

export default FormTextArea;

const Container = styled.div`
display: flex;
flex-direction: column;
`;

const TextArea = styled.textarea`
min-height: 200px;
`;