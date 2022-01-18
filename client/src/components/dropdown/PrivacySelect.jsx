import styled from 'styled-components';
import Select from 'react-select';

const PrivacySelect = ({status, value, setCurrStatus}) => {
    return (
        <Container>
            <Title>Privacy</Title>
            <Select options={status}
            value={value} 
            placeholder="-- Select Privacy --"
            onChange={(e)=>setCurrStatus(e)}/>
        </Container>
    )
}

export default PrivacySelect;

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
