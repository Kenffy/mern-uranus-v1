import { Modal } from '@material-ui/core';
import { CameraAltRounded, Close } from '@material-ui/icons';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { UpdateCoverProfile } from '../../context/Action';

const ProfileCoverEdit = ({onOpen, 
    setOnCoverProfile,
    handleCoverFiles,
    handleProfileFiles, 
    dispatch,
    user, data}) => {

    const history = useHistory();


    const handleSave = ()=>{
        if(data !== null){
            UpdateCoverProfile(dispatch, user, data);
            toast.success(`${data?.type} updated successfully.`);
            history.push(`/profile/${user?._id}`);
        }
        setOnCoverProfile(false);
    }

  return (
    <Container>
        <Modal open={onOpen}
        onClose={()=>setOnCoverProfile(false)}>
            <Dialog>
                <Header>
                    <Title>
                        Edit {data?.type} Picture
                    </Title>
                    <CloseIcon onClick={()=>setOnCoverProfile(false)}/>
                </Header>

                <ImageContainer>
                    <CoverWrapper>
                        {data?.type === "Cover"?
                        <>
                        <CoverImage src={URL.createObjectURL(data?.file)} />
                        <label htmlFor='cover-image'>
                            <CoverCameraIcon />
                        </label>
                        <input 
                            id="cover-image" 
                            type="file"
                            accept=".jpg,.jpeg,.png"
                            style={{ display: "none" }} 
                            onChange={handleCoverFiles}/>
                        </>
                        :
                        <CoverImage src={user?.cover} />
                        }
                    </CoverWrapper>
            
                    <ProfileWrapper>
                        <ProfileImageWrapper>
                            {data?.type === "Profile"?
                            <>
                            <ProfileImage src={URL.createObjectURL(data?.file)}/>
                            <label htmlFor='profile-image'>
                                <CameraIcon />
                            </label>
                            <input 
                                id="profile-image" 
                                type="file"
                                accept=".jpg,.jpeg,.png"
                                style={{ display: "none" }} 
                                onChange={handleProfileFiles}/>
                            </>
                            :
                            <ProfileImage src={user?.profile}/>
                            }
                            
                        </ProfileImageWrapper>
                    </ProfileWrapper>
                </ImageContainer>
                <ActionWrapper>
                    <Button onClick={handleSave} option="save">SAVE</Button>
                    <Button onClick={()=>setOnCoverProfile(false)} option="clear">CANCEL</Button>
                </ActionWrapper>
            </Dialog>
      </Modal>
    </Container>
  )
}

export default ProfileCoverEdit;

const Container = styled.div`

`;

const Dialog = styled.div`
position: absolute;
background-color: white;
top: 0;left: 0;
bottom: 0;right: 0;
margin: auto;
display: flex;
flex-direction: column;
height: 100%;
width: 100%;
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
margin-right: 10px;
@media screen and (max-width: 580px) {
    margin-right: 5px;
}
`;


const ImageContainer = styled.div`
margin-top: 60px;
width: 100%;
position: relative;
height: auto;
`;

const CoverWrapper = styled.div`
position: relative;
`;

const CoverImage = styled.div`
height: 600px;
width: 100%;
background-image: ${props=> `linear-gradient(transparent, rgba(0,0,0,0.5)), url(${props.src})`};
background-position: center;
background-repeat: no-repeat;
background-size: cover;
background-color: teal;
@media screen and (max-width: 1024px) {
    padding: 0;
    height: 500px;
}
@media screen and (max-width: 768px) {
    padding: 0;
    height: 450px;
}
@media screen and (max-width: 580px) {
    padding: 0;
    height: 250px;
}
`;

const ProfileWrapper = styled.div`
position: absolute;
width: 100%;
bottom: -15px;
padding: 0px 100px;
display: flex;
align-items: center;
@media screen and (max-width: 1024px) {
    padding: 0px 50px;
}
@media screen and (max-width: 768px) {
    padding: 0px 30px;
}
@media screen and (max-width: 580px) {
    padding: 0px 20px;
}
`;

const ProfileImageWrapper = styled.div`
position: relative;
height: 250px;
width: 250px;
border-radius: 5px;
overflow: hidden;
box-shadow: 0px 1px 3px rgba(0,0,0,0.5);
@media screen and (max-width: 1024px) {
    height: 180px;
    width: 180px;
}
@media screen and (max-width: 768px) {
    height: 150px;
    width: 150px;
}
@media screen and (max-width: 580px) {
    height: 80px;
    width: 80px;
}

`;

const ProfileImage = styled.img`
height: 100%;
width: 100%;
object-fit: cover;
background-color: white;
`;

const CameraIcon = styled(CameraAltRounded)`
position: absolute;
bottom: 0;
right: 0;
height: 30px !important;
width: 30px !important;
border-radius: 50%;
background-color: teal;
color: white;
padding: 4px;
margin: 2px;
cursor: pointer;
z-index: 10;
opacity: 0.6;
&:hover{
    opacity: 1;
    transition: 0.3s all ease;
}
@media screen and (max-width: 580px) {
    height: 20px !important;
    width: 20px !important;
}
`;

const CoverCameraIcon = styled(CameraAltRounded)`
position: absolute;
top: 5px;
right: 20px;
height: 40px !important;
width: 40px !important;
border-radius: 50%;
background-color: teal;
color: white;
padding: 5px;
margin: 2px;
cursor: pointer;
opacity: 0.6;
z-index: 10;
&:hover{
    opacity: 1;
    transition: 0.3s all ease;
}
@media screen and (max-width: 580px) {
    height: 30px !important;
    width: 30px !important;
    right: 10px;
}
`;

const ActionWrapper = styled.div`
display: flex;
align-items: center;
justify-content: flex-end;
padding: 30px 20px;
`;

const Button = styled.button`
padding: 10px;
width: 130px;
margin-top: 10px;
margin-right: 20px;
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

