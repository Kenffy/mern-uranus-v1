import { Link } from "react-router-dom";
import { useHistory } from 'react-router';
import { Context } from "../../context/Context";import styled from "styled-components";
import { Container } from "../../globaleStyles";
import { useContext, useState } from "react";
import {register} from "../../redux/actions/authActions";
import FormInput from "../../components/controls/FormInput";

export default function Register() {

  const history = useHistory();
  const { dispatch, isFetching, error } = useContext(Context);

  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
  });

  const inputs = [
    {
      id: 1,
      name: "username",
      type: "text",
      placeholder: "Username",
      errorMessage:
        "Username should be 3-16 characters and shouldn't include any special character!",
      label: "Username",
      pattern: "^[A-Za-z0-9]{3,16}$",
      required: true,
    },
    {
      id: 2,
      name: "email",
      type: "email",
      placeholder: "Email",
      errorMessage: "It should be a valid email address!",
      label: "Email",
      required: true,
    },
    {
      id: 3,
      name: "password",
      type: "password",
      placeholder: "Password",
      errorMessage:
        "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!",
      label: "Password",
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
      required: true,
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = {
      username: values.username,
      email: values.email,
      password: values.password,
    };

    register(dispatch, user);
    history.push('/sign-in');
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };


    return (
        <RegisterContainer>
            <Wrapper>
                <Title>Sign Up</Title>
                <Form onSubmit={handleSubmit}>
                {inputs.map((input) => (
                    <FormInput
                      key={input.id}
                      {...input}
                      value={values[input.name]}
                      onChange={onChange}
                    />
                  ))}
                {error && <Error>Something went wrong...</Error>}
                <Button type="submit" disabled={isFetching}>Register</Button>
                <LoginOption>
                    <NotMember>Already member?</NotMember>
                    <SignupOption>
                        <Link to="/sign-in" 
                        style={{textDecoration:"none",
                                color:"inherit"}}>
                            Sign in
                        </Link>
                    </SignupOption>
                </LoginOption>
                </Form>
            </Wrapper>
        </RegisterContainer>
    )
};

const RegisterContainer = styled(Container)`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
    rgba(11, 138, 105, 0.5),
      teal
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
const LoginOption = styled.div`
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
`;

const Error = styled.span`
  color: red;
`;
