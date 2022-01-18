import React, { useContext, useState } from 'react'
import styled from 'styled-components';
import { Container } from '../../globaleStyles';
import StatusDropdown from '../../components/dropdown/StatusDropdown';
import CategoryDropdown from '../../components/dropdown/CategoryDropdown';
import Editor from '../../components/editor/Editor';
import { Close, Panorama, SettingsOutlined, YouTube } from '@material-ui/icons';
import { v4 as uuidv4 } from 'uuid';
import { useHistory } from 'react-router';
import MediaPlayer from '../../components/media/MediaPlayer';
import CategoryModal from '../../components/modals/CategoryModal';
import {CategoryList} from '../../components/Categories/CategoryList';
import { Context } from '../../context/Context';
import { createPost } from '../../context/Action';


const Write = () => {

    const status = [
        {"id": 1, "name": "Public"},
        {"id": 2, "name": "Friends"},
        {"id": 3, "name": "Private"}
    ];
    const [currStatus, setCurrStatus] = useState(status[0].name);
    const [openModal, setOpenModal] = useState(false);

    const history = useHistory();
    const { auth, dispatch } = useContext(Context);
    const currUser = auth;
    const categories = currUser?.categories;
    console.log(categories)
    //const categories = currUser?.categories.sort((a, b) => a.name.localeCompare(b.name));
    const tmpCategories = CategoryList.map(cat=>
        currUser?.categories.includes(cat.name)? {...cat, isChecked: true} : cat
    );
    const [currCategory, setCurrCategory] = useState(currUser?.categories.length >0 ? currUser?.categories[0]:[]);

    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [video, setVideo] = useState("");
    const [sysCategories, setSysCategories] = useState(tmpCategories);

    const [postImages, setPostImages] = useState([]);
    const [currImage, setCurrImage] = useState(postImages.length > 0? postImages[0] : null);
    const [currImgId, setCurrImgId] = useState("");
    const [currVideo, setCurrVideo] = useState(null);
    const post = {
        "userId": currUser?._id,
        "title": title,
        "body": body,
        "category": currCategory,
        "status": currStatus,
        "images": [],
        "videos": video? [video] : [],
        "likes": [],
        "vues": [],
        "shares": [],
        "tags": [],
        "comments": [],
    }

    const handleFiles = (e)=>{
        if(postImages.length < 10){
            const files = e.target.files;

            for(let i=0; i<files.length; i++){
                const id = uuidv4();
                const newImage = {
                    id: id,
                    filename: id + files[i].name,
                    file: files[i]
                };
                if(postImages.length === 0){ 
                    setCurrImage(newImage);
                }
                setPostImages((prevState) => [...prevState, newImage]);
            }
        }else{
            console.log("max range reached: "+ postImages.length);
        }
    }

    console.log(postImages)

    const handleVideo = (e)=>{

        if(e.target.files.length === 0) return;

        const file = e.target.files[0];
        const id = uuidv4();
        const movie = {
            id: id,
            filename: id + file.name,
            file: file,
            url: URL.createObjectURL(file)
        };
        setCurrVideo(movie);
    }

    const handleCurrImage = (id, image) => {
        setCurrImgId(id);
        setCurrImage(image);
    }

    const handleRemoveImage = (id)=>{
        if (postImages.length > 0){            
            const tmpArray = postImages.filter(img => img.id !== id)
            setPostImages(tmpArray);
            if(tmpArray.length === 0){
                setCurrImage(null);
            }
        }
    }

    const handleClear = () =>{
        setCurrImage (null);
        setCurrVideo(null)
        setPostImages([]);
        setVideo("");
        setTitle("");
        setBody("");
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        createPost(dispatch, post, postImages, currVideo);
        handleClear();
        history.push('/');
        //window.location.replace("/");
    }

    return (
        <WriteContainer>
            <WriteWrapper>
                <WriteLeft>
                    <Form autoComplete="off" onSubmit={handleSubmit}>
                        <Title>Create Post</Title>
                        <SelectWrapper>
                            <StatusDropdown items={status}
                                setCurrStatus={setCurrStatus}/>
                            <CategoryWrapper>
                                <CategoryDropdown items={categories}
                                setCurrCategory={setCurrCategory}/>
                                <EditButton>
                                    <EditIcon onClick={()=>setOpenModal(true)}/>
                                </EditButton>
                            </CategoryWrapper>
                            
                        </SelectWrapper>
                        <MediaWrapper>
                            {/* {currVideo && 
                            <Video controls>
                                <source src={currVideo.url} />
                            </Video>
                            } */}
                            {currVideo &&
                            <PlayerWrapper>
                                <RemoveIcon onClick={()=>setCurrVideo(null)}/>
                                <MediaPlayer url={currVideo.url}/>
                            </PlayerWrapper>
                            }
                            {currImage && 
                                <Image 
                                src={URL.createObjectURL(currImage?.file)} 
                                alt={currImage?.filename}/>}
                            
                            <ImageList>
                                { postImages.map((image) => (
                                <ImageWrapper key={image?.id} >
                                    <RemoveImage onClick={()=>handleRemoveImage(image.id)}/>
                                    <ImageItem onClick={()=>handleCurrImage(image.id,image)}
                                    active={currImgId === image?.id? true:false}
                                    src={URL.createObjectURL(image.file)} 
                                    alt={image?.filename}/>
                                </ImageWrapper>
                                ))}
                            </ImageList>
                            <MediaInputs>
                                <InputItem>
                                    <Label htmlFor="imageInput">
                                        <ImageIcon /> Photo
                                    </Label>
                                    <Input 
                                        id="imageInput" 
                                        type="file"
                                        accept=".jpg,.jpeg,.png" 
                                        multiple="multiple"
                                        style={{ display: "none" }} 
                                        onChange={handleFiles}
                                    />
                                </InputItem>
                                <InputItem>
                                    <Label htmlFor="videoInput">
                                        <VideoIcon /> Video
                                    </Label>

                                    <Input 
                                        id="videoInput" 
                                        type="file" 
                                        accept=".mp4,.avi" 
                                        style={{ display: "none" }} 
                                        onChange={handleVideo}
                                    />
                                </InputItem>
                            </MediaInputs>
                        </MediaWrapper>
                        <Editor
                            setPostImages={setPostImages} 
                            setTitle={setTitle}
                            title={title}
                            body={body} 
                            setBody={setBody}  
                            />

                        {video &&
                        <PlayerWrapper>
                          <MediaPlayer url={video}/>
                        </PlayerWrapper>
                        }
                        
                        <ButtonWrapper>
                            <Button type="submit" option="save">SAVE</Button>
                            <Button option="clear" onClick={handleClear}>CLEAR</Button>
                        </ButtonWrapper>

                        <CategoryModal openModal={openModal} 
                        setOpenModal={setOpenModal}
                        categories={sysCategories}
                        setSysCategories={setSysCategories}
                        currUser={currUser}
                        dispatch={dispatch}/>
                        {/* <VideoModal openModal={openModal} 
                        setOpenModal={setOpenModal} 
                        setVideo={setVideo}/> */}
                    </Form>
                </WriteLeft>
            </WriteWrapper>
        </WriteContainer>
    )
}

export default Write;

const WriteContainer = styled(Container)`
background-color: white;
min-height: 100vh;
${Container}
`;

const WriteWrapper = styled.div`
display: flex;
@media screen and (max-width: 580px) {
    flex-direction: column;
}
`;

const WriteLeft = styled.div`
margin-top: 60px;
display: flex;
width: 100%;
flex-direction: column;
@media screen and (max-width: 580px) {
    flex: 1;
    margin-top: 40px;
}
`;

const Form = styled.form`
width: 100%;
padding: 0px 100px;
display: flex;
flex-direction: column;
@media screen and (max-width: 580px) {
    padding: 0px;
    font-size: 14px;
}
`;

const Title = styled.h2`
padding: 10px 20px;
font-weight: 600;
margin-top: 30px;
@media screen and (max-width: 580px) {
    padding: 5px;
}
`;

const SelectWrapper = styled.div`
display: flex;
align-items: center;
padding: 20px 20px;
@media screen and (max-width: 580px) {
    padding: 5px;
}
`;

const MediaWrapper = styled.div`
padding: 10px 20px;
display: flex;
flex-direction: column;
@media screen and (max-width: 580px) {
    padding: 5px;
}
`;

const Image = styled.img`
width: 100%;
height: 400px;
border-radius: 5px;
object-fit: contain;
@media screen and (max-width: 580px) {
    height: 270px;
}
`;

// const Video = styled.video`
// width: 100%;
// height: 400px;
// border-radius: 5px;
// margin-bottom: 20px;
// @media screen and (max-width: 580px) {
//     height: 270px;
// }
// `;

const ImageList = styled.div`
display: flex;
padding: 5px 0px;
margin-top: 8px;
margin-bottom: 5px;
overflow-x: scroll;
::-webkit-scrollbar {
    height: 1px;
}
::-webkit-scrollbar-track {
    background-color: transparent;
}
::-webkit-scrollbar-thumb {
    background-color: transparent;
}
`;

const ImageWrapper = styled.div`
position: relative;
margin: 0px 4px;
`;

const ImageItem = styled.img`
height: 70px;
width: 120px;
border: ${(props) => props.active? "3px solid teal": "none"};
cursor: pointer;
object-fit: cover;
margin: 0px 2px;
@media screen and (max-width: 580px) {
    height: 60px;
    width: 100px;
    margin: 0px 2px;
}
`;

const RemoveImage = styled(Close)`
position: absolute;
top: 2px;
right: 2px;
padding: 2px;
cursor: pointer;
border-radius: 50%;
color: #444;
&:hover{
    background-color: rgba(0,0,0,0.1);
    transition: 0.3s all ease;
}
`;

const MediaInputs = styled.div`
display: flex;
align-items: center;
padding: 5px 0px;
border: 1px solid rgba(0,0,0,0.3);
`;

const InputItem = styled.div`
padding: 0px 20px;
margin-right: 10px;
cursor: pointer;
&:hover{
    opacity: 0.8;
}
`;

const Label = styled.label`
display: flex;
align-items: center;
font-weight: 500;
cursor: pointer;
`;

const ImageIcon = styled(Panorama)`
height: 30px !important;
width: 30px !important;
color: #444;
cursor: pointer;
margin-right: 10px;
color: teal;
`;

const VideoIcon = styled(YouTube)`
height: 36px !important;
width: 36px !important;
color: #444;
cursor: pointer;
margin-right: 10px;
color: teal;
`;

const Input = styled.input`

`;

const PlayerWrapper = styled.div`
width: 100%;
padding: 5px 0px;
margin: 20px 0px;
position: relative;
`;

const RemoveIcon = styled(Close)`
position: absolute;
top: 10px;
right: 10px;
height: 35px !important;
width: 35px !important;
padding: 5px;
border-radius: 50%;
background-color: white;
color: teal;
z-index: 2;
cursor: pointer;
opacity: 0.4;
&:hover{
    opacity: 0.8;
    transition: all 0.3s ease;
}
@media screen and (max-width: 580px) {
    height: 25px !important;
    width: 25px !important;
}
`;

const ButtonWrapper = styled.div`
padding: 10px 20px;
display: flex;
align-items: center;
justify-content: flex-start;
margin-bottom: 30px;
@media screen and (max-width: 580px) {
    padding: 5px;
}
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
`;

const CategoryWrapper = styled.div`
display: flex;
align-content: center;
`;

const EditButton = styled.div`
display: flex;
align-items: center;
color: #444;
padding: 0px 5px;
cursor: pointer;
border: 1px solid rgba(0,0,0,0.3);
&:hover{
    background-color: teal;
    color: white;
    transition: all 0.3s ease;
}
`;

const EditIcon = styled(SettingsOutlined)`
height: 25px !important;
width: 25px !important;
`;

