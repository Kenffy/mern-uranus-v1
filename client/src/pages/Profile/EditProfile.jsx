import React, { useState } from 'react';
import styled from 'styled-components';
import FormInput from '../../components/controls/FormInput';
import FormTextArea from '../../components/controls/FormTextArea';
import { v4 as uuidv4 } from 'uuid';
import { CameraAltRounded, Close, Edit } from '@material-ui/icons';
import ProfileSocials from './ProfileSocials';
import Socials from '../../components/Rightside/Socials';
import { UpdateUserData } from '../../context/Action';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';

const EditProfile = ({user, setOnEdit, dispatch}) => {
    const history = useHistory();

    const CoverUrl = process.env.REACT_APP_COVERS;
    const ProfileUrl = process.env.REACT_APP_PROFILES;

    const [username, setUsername] = useState(user?.username || "");
    const [desc, setDesc] = useState(user?.description || "");
    const [phone, setPhone] = useState(user?.phone || "");
    const [website, setWebsite] = useState(user?.website || "");
    const [cover, setCover] = useState(null);
    const [profile, setProfile] = useState(null);
    const [onAddSocial, setOnAddSocial] = useState(false);
    const [currSocial, setCurrSocial] = useState(Socials[0]);
    const [socialUrl, setSocialUrl] = useState("");

    const [newSocials, setNewSocials] = useState([]);

    const handleCoverFiles = (e)=>{
        const file = e.target.files[0];
        const newImage = {
            filename: uuidv4() + file.name,
            file: file,
            type: "Cover"
        };
        setCover(newImage);
    }

    const handleProfileFiles = (e)=>{
        const file = e.target.files[0];
        const newImage = {
            filename: uuidv4() + file.name,
            file: file,
            type: "Profile"
        };
        setProfile(newImage);
    }

    const handleSubmit = (e)=>{
        e.preventDefault();
        user.username = username;
        user.phone = phone;
        user.description = desc;
        user.website = website;
        user.socials = newSocials;

        const data = {
            cover: cover,
            profile: profile
        }
        UpdateUserData(dispatch, user, data);
        toast.success("user updated successfully.");
        history.push(`/profile/${user?._id}`);
        setOnEdit(false);
    }

    const handleAddSocial = (e)=>{
        e.preventDefault();
        const added = newSocials.find(s=>s.name === currSocial?.name);
        if(!added){
            const social = {
                name: currSocial?.name,
                url: socialUrl,
            }
            
            setNewSocials((prev)=>[...prev, social]);
        } 
        setSocialUrl("");
        setOnAddSocial(false);       
    }

    const handleRemoveSocial = (value)=>{
        setNewSocials((prev)=>[...prev.filter(s=>s.name!==value.name)]);
    }

  return (
    <Container>
        
        <ProfileSocials 
        open={onAddSocial}
        currSocial={currSocial}
        Socials={Socials}
        socialUrl={socialUrl}
        setSocialUrl={setSocialUrl}
        setOnAddSocial={setOnAddSocial}
        setCurrSocial={setCurrSocial}
        handleAddSocial={handleAddSocial}/>

        <Header>
            <Title>
                Edit Profile
            </Title>
            <CloseIcon onClick={()=>setOnEdit(false)}/>
        </Header>

        <ImageContainer>
            <CoverWrapper>
                {cover !== null?
                <CoverImage src={URL.createObjectURL(cover?.file)} />
                :
                <CoverImage src={user?.cover.includes("http")? user?.cover : CoverUrl+user?.cover} />
                }
                <label htmlFor='cover-image'>
                    <CoverCameraIcon />
                </label>
                <input 
                    id="cover-image" 
                    type="file"
                    accept=".jpg,.jpeg,.png"
                    style={{ display: "none" }} 
                    onChange={handleCoverFiles}/>
            </CoverWrapper>
        
            <ProfileWrapper>
                <ProfileImageWrapper>
                    {profile !== null?
                    <ProfileImage src={URL.createObjectURL(profile?.file)}/>
                    :
                    <ProfileImage src={user?.profile.includes("http")? user?.profile : ProfileUrl+user?.profile}/>
                    }
                    <label htmlFor='profile-image'>
                        <CameraIcon />
                    </label>
                    <input 
                        id="profile-image" 
                        type="file"
                        accept=".jpg,.jpeg,.png"
                        style={{ display: "none" }} 
                        onChange={handleProfileFiles}/>
                    
                </ProfileImageWrapper>
            </ProfileWrapper>
        </ImageContainer>

        <Wrapper>
            <InfoWrapper>
                <Form autoComplete="off" onSubmit={handleSubmit}>
                    <FormInput 
                    label="username"
                    name= "username"
                    type="username"
                    value={username}
                    onChange={(e)=>setUsername(e.target.value)}
                    placeholder="Username"
                    errorMessage="Username is required."
                    required={true}
                    />
                    <FormInput 
                    label="phone"
                    name= "phone"
                    type="phone"
                    value={phone}
                    onChange={(e)=>setPhone(e.target.value)}
                    placeholder="Phone Number"
                    />
                    <FormInput 
                    label="website"
                    name= "website"
                    type="website"
                    value={website}
                    onChange={(e)=>setWebsite(e.target.value)}
                    placeholder="Website"
                    />
                    <FormTextArea 
                    label="description"
                    name= "description"
                    type="description"
                    value={desc}
                    onChange={(e)=>setDesc(e.target.value)}
                    placeholder="About"
                    errorMessage="Description is required."
                    required={true}
                    />
                    <SocialWrapper>
                        <SocialHeader>Socials</SocialHeader>
                        <SocialsContent>
                            {newSocials.map((item, index)=>(
                                <SocialItem key={index}>
                                    <SocialItemHeader>
                                        <SocialItemLabel>{item?.name}</SocialItemLabel>
                                        <SocialItemAction>
                                            <SocialEditIcon />
                                            <SocialRemoveIcon onClick={()=>handleRemoveSocial(item)}/>
                                        </SocialItemAction>
                                    </SocialItemHeader>
                                    <SocialItemValue 
                                    readOnly
                                    value={item.url}/>
                                </SocialItem>
                            ))}
                        </SocialsContent>
                        <SocialActionWrapper>
                            <AddSocial onClick={()=>setOnAddSocial(true)}>
                                Add a Social Link
                            </AddSocial>
                        </SocialActionWrapper>
                    </SocialWrapper>

                    <ActionWrapper>
                        <Button type="submit" option="save">SAVE</Button>
                        <Button onClick={()=>setOnEdit(false)} option="clear">CANCEL</Button>
                    </ActionWrapper>
                </Form>
            </InfoWrapper>
        </Wrapper>
    </Container>
  )
}

export default EditProfile;

const Container = styled.div`
margin-top: 60px;
display: flex;
flex-direction: column;
`;

const Wrapper = styled.div`
display: flex;
flex-direction: column;
padding: 0 80px;
@media screen and (max-width: 1024px) {
    padding: 0px 50px;
}
@media screen and (max-width: 768px) {
    padding: 0px 20px;
}
@media screen and (max-width: 580px) {
    padding: 0px 10px;
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

const InfoWrapper = styled.div`
display: flex;
flex-direction: column;
`;

const Form = styled.form`
width: 100%;
display: flex;
flex-direction: column;
margin-top: 30px;
@media screen and (max-width: 580px) {
    padding: 0px;
    font-size: 14px;
}
`;

const SocialWrapper = styled.div`
display: flex;
flex-direction: column;
margin-top: 20px;
`;

const SocialHeader = styled.span`
color: #555;
font-size: 16px;
font-weight: 600;
`;

const SocialActionWrapper = styled.div`
display: flex;
align-content: center;
justify-content: flex-end;
margin: 20px 0px;
`;

const SocialsContent = styled.div`
display: flex;
align-content: center;
flex-direction: column;
margin: 10px 0px;
`;

const SocialItem = styled.div`
display: flex;
flex-direction: column;
padding: 10px 20px;
border: 1px solid rgba(0,0,0,0.1);
border-radius: 5px;
margin-bottom: 10px;
`;

const SocialItemHeader = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
`;

const SocialItemLabel = styled.span`

`;

const SocialItemAction = styled.div`
display: flex;
align-items: center;
`;

const SocialRemoveIcon = styled(Close)`
height: 30px !important;
width: 30px !important;
border-radius: 50%;
background-color: red;
color: white;
padding: 4px;
margin: 5px;
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

const SocialEditIcon = styled(Edit)`
height: 30px !important;
width: 30px !important;
border-radius: 50%;
background-color: teal;
color: white;
padding: 4px;
margin: 5px;
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

const SocialItemValue = styled.input`
padding: 10px;
margin: 10px 0px;
border-radius: 5px;
border: 1px solid rgba(0,0,0,0.2);
outline: none;
font-size: 15px;
color: teal;
`;


const AddSocial = styled.span`
padding: 6px 20px;
border: 1px solid teal;
color: teal;
border-radius: 5px;
cursor: pointer;
`;

const ActionWrapper = styled.div`
display: flex;
align-items: center;
justify-content: flex-end;
padding: 30px 0px;
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