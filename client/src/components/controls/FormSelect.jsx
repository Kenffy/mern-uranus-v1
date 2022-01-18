import styled from "styled-components";
import { useState } from "react";
import "./formInput.css";

const FormInput = (props) => {

    const [focused, setFocused] = useState(false);
    const { label, value, errorMessage, onChange, id, ...inputProps } = props;

    const handleFocus = (e) => {
        setFocused(true);
    };

    return (
        <Container>
            <label className="form-label">{label}</label>
            <input className="form-input"
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

export default FormInput;

const Container = styled.div`
display: flex;
flex-direction: column;
`;