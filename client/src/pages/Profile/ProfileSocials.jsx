import { Modal } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import React from 'react';
import styled from 'styled-components';
import FormInput from '../../components/controls/FormInput';
import SocialSelect from '../../components/dropdown/SocialSelect';

const ProfileSocials = ({open, 
    currSocial, 
    Socials, 
    socialUrl,
    setSocialUrl,
    setCurrSocial,
    setOnAddSocial, 
    handleAddSocial}) => {
  return (
    <Container>
        <Modal open={open}
        onClose={()=>setOnAddSocial(false)}>
            <Dialog>
                <Header>
                    <Title>
                        Add a Social Link
                    </Title>
                    <CloseIcon onClick={()=>setOnAddSocial(false)}/>
                </Header>

                <Content>
                <Form autoComplete="off" onSubmit={handleAddSocial}>
                    <SocialSelect 
                    socials={Socials}
                    value={currSocial}
                    setCurrSocial={setCurrSocial}/>
                    <FormInput 
                    label="Your Social Media Link"
                    name= "url"
                    type="url"
                    value={socialUrl}
                    onChange={(e)=>setSocialUrl(e.target.value)}
                    placeholder="Add your Url"
                    errorMessage="Your Social Media Link is required."
                    required={true}/>

                    <ActionWrapper>
                        <Button type="submit" option="save">SAVE</Button>
                        <Button onClick={()=>setOnAddSocial(false)} option="clear">CANCEL</Button>
                    </ActionWrapper>
                </Form>
                    

                </Content>
            </Dialog>
        </Modal>
    </Container>
  )
}

export default ProfileSocials;

const Container = styled.div`

`;

const Dialog = styled.div`
position: absolute;
background-color: white;
top: 0;left: 0;
bottom: 0;right: 0;
margin: auto;
border-radius: 10px;
display: flex;
flex-direction: column;
justify-content: space-between;
height: 40%;
width: 50%;
@media screen and (max-width: 920px) {
    width: 70%;
}
@media screen and (max-width: 580px) {
    width: 90%;
}
`;

const Header = styled.div`
padding: 15px;
display: flex;
align-items: center;
justify-content: space-between;
color: teal;
border-bottom: 1px solid rgba(0,0,0,0.1);
`;

const Title = styled.span`
font-size: 18px;
text-transform: uppercase;
`;

const CloseIcon = styled(Close)`
cursor: pointer;
`;

const Content = styled.div`
height: 100%;
display: flex;
flex-direction: column;
padding: 20px;
`;

const Form = styled.form`
width: 100%;
display: flex;
flex-direction: column;
@media screen and (max-width: 580px) {
    padding: 0px;
    font-size: 14px;
}
`;

const ActionWrapper = styled.div`
display: flex;
align-items: center;
justify-content: flex-end;
`;

const Button = styled.button`
padding: 10px;
width: 130px;
margin-top: 10px;
margin-left: 20px;
border: 1px solid teal;
cursor: pointer;
border-radius: 5px;
background-color: ${(props) => props.option === "save"? "teal" : "white"};
color: ${(props) => props.option === "save"? "white" : "teal"};
&:hover{
    opacity: 0.8;
}
@media screen and (max-width: 580px) {
    padding: 8px;
    width: 100px;
}
`;