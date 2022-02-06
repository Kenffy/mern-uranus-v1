import React from 'react';
import { useContext, useState } from "react";
import { Context } from "../../context/Context";
import { Link } from "react-router-dom";
import styled from "styled-components";
import FormInput from "../../components/controls/FormInput";
import { Container } from "../../globaleStyles";
import { login } from "../../context/Action";

export default function Login() {

  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const inputs = [
    {
      id: 1,
      name: "email",
      type: "email",
      placeholder: "Email",
      errorMessage: "It should be a valid email address!",
      label: "Email",
      required: true,
    },
    {
      id: 2,
      name: "password",
      type: "password",
      placeholder: "Password",
      errorMessage:
        "Password is required",
      label: "Password",
      required: true,
    },
  ];

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const { dispatch, isFetching, error } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {
      email: values.email,
      password: values.password,
    };

    login(dispatch, user);
  };

    return (
        <LoginContainer>
            <Wrapper>
                <Title>Sign In</Title>
                <Form onSubmit={handleSubmit}>
                {inputs.map((input) => (
                    <FormInput
                      key={input.id}
                      {...input}
                      value={values[input.name]}
                      onChange={onChange}
                    />
                  ))}
                <ForgotPassword>Forgot Password?</ForgotPassword>
                {error && <Error>Something went wrong...</Error>}
                <Button type="submit" disabled={isFetching}>Login</Button>
                    <RegisterOption>
                        <NotMember>Not a member?</NotMember>
                        <SignupOption>
                            <Link to="/sign-up" 
                            style={{textDecoration:"none",
                                    color:"inherit"}}>
                                Signup now
                            </Link>
                        </SignupOption>
                    </RegisterOption>
                </Form>
            </Wrapper>

        </LoginContainer>
    )
};

const LoginContainer = styled(Container)`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      teal,
    rgba(11, 138, 105, 0.5)
    );
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  ${Container}
`
const Wrapper = styled.div`
  width: 30%;
  padding: 20px;
  border-radius: 5px;
  background-color: white;
  box-shadow: 0px 1px 3px rgba(0,0,0,0.5);
  @media screen and (max-width: 580px) {
    width: 75%;
}
`
const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
  color: teal;
  margin-bottom: 10px;
`
const Form = styled.form`
  display: flex;
  flex-direction: column;
`
// const Input = styled.input`
//   flex: 1;
//   min-width: 40%;
//   margin: 10px 0;
//   padding: 10px;
//   border-radius: 5px;
//   border-color: rgba(0,0,0,0.1);
//   outline: none;
// `
const Button = styled.button`
  min-width: 40%;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  margin-top: 10px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
  font-size: 14px;
  &:hover{
      opacity: 0.9;
  }
`
const RegisterOption = styled.div`
display: flex;
align-items: center;
justify-content: center;
padding: 0px 20px;
margin-bottom: 20px;
`
const NotMember = styled.span`
font-size: 12px;
margin-right: 5px;
`
const SignupOption = styled.span`
color: teal;
font-size: 12px;
cursor: pointer;
`
const ForgotPassword = styled.span`
color: teal;
font-size: 12px;
cursor: pointer;
min-width: 40%;
`
const Error = styled.span`
  color: red;
`;

