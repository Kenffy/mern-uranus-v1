import React from 'react';
import { useContext, useState } from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components'
import FormInput from '../../components/controls/FormInput';
import { Container } from '../../globaleStyles';
import FormEditor from '../../components/controls/FormEditor';
import { Close, Panorama } from '@material-ui/icons';
import { v4 as uuidv4 } from 'uuid';
import { Context } from '../../context/Context';
import { CategoryList } from '../../components/Categories/CategoryList';
import PrivacySelect from '../../components/dropdown/PrivacySelect';
import CategorySelect from '../../components/dropdown/CategorySelect';
import { createPost, updatePost } from '../../context/Action';
import {toast} from "react-toastify";
import DangerAlert from '../../components/alerts/DangerAlert';
import TagsInput from '../../components/controls/TagsInput';

const ImagePost = ({post, setOnEdit}) => {

    const history = useHistory();

    const maxUpload = 10;
    const editorConfig={  
        placeholder: 'Enter your text here...',     
        toolbar: ['heading', '|', 'bold', 'italic', 'blockQuote', 'link', 'numberedList', 'bulletedList', 'insertTable', "mediaEmbed", '|', 'undo', 'redo'],
        mediaEmbed: {previewsInData: true}, 
      };

    const status = [
        {"id": 1, "name": "Public", "value": "Public", "label": "Public"},
        {"id": 2, "name": "Friends", "value": "Friends", "label": "Friends"},
        {"id": 3, "name": "Private", "value": "Private", "label": "Private"}
    ];

    const [currStatus, setCurrStatus] = useState(status.find(s=>s.name === post?.status) ||status[0]);
    const [title, setTitle] = useState(post?.title || "");
    const [body, setBody] = useState(post?.body || "");
    const [counter, setCounter] = useState(post?.images.length || 0);
    const [tags, setTags] = useState(post?.tags || []);
    const [postImages, setPostImages] = useState([]);
    const [onlineImages, setOnlineImages] = useState(post?.images || []);
    const [currImgId, setCurrImgId] = useState("");
    const [openAlert, setOpenAlert] = useState(false);
    const [rmImage,setRmImage] = useState(null);

    const { auth, dispatch, socket } = useContext(Context);
    const currUser = auth;
    const sysCategories = CategoryList.filter(c=>c.name !== "All");
    const [currCategory, setCurrCategory] = useState(sysCategories.find(c=>c.name === post?.category) ||sysCategories[0] || null);

    const onTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const onEditorChange = (e, editor) =>{
        const data = editor.getData();
        setBody(data)
    }

    const handleCurrImage = (id, image) => {
        setCurrImgId(id);
    }

    const handleRemoveImage = (id)=>{
        if (postImages.length > 0){            
            const tmpArray = postImages.filter(img => img.id !== id)
            setPostImages(tmpArray);
            setCounter((prevState)=> prevState - 1);
        }
    }

    const handleRemoveOnlineImage = ()=>{
        if (onlineImages.length > 0 && rmImage !== null){          
            const tmpArray = onlineImages.filter(img => img !== rmImage)
            setOnlineImages(tmpArray);
            setCounter((prevState)=> prevState - 1);
            setRmImage(null);
        }
    }

    const handleDeleteAlert = () => {
        handleRemoveOnlineImage();
        setOpenAlert(false);
    };

    const handleOpenAlert = (image) => {
        setRmImage(image);
        setOpenAlert(true);
    };
    
    const handleCloseAlert = () => {
        setOpenAlert(false);
    };

    const handleFiles = (e)=>{
        const files = e.target.files;
        let count = counter;
        for(let i=0; i<files.length; i++){
            if(count < maxUpload){
                const id = uuidv4();
                const newImage = {
                    id: id,
                    filename: id + files[i].name,
                    file: files[i]
                };
                setPostImages((prevState) => [...prevState, newImage]);
                count = count + 1;
            }
        }
        setCounter(count);
    }
    const handleClear = () =>{
        setPostImages([]);
        setCounter(0);
        setTitle("");
        setBody("");
    }

    const handleTags = (e)=>{
        if(e.key === " " || e.code === "Space" || e.keyCode === 32 ){
            setTags([...tags, e.target.value]);
            e.target.value = "";
        }
    }

    const removeTag = (tag)=>{
        tag && setTags(prev=>[...prev.filter(t=>t !== tag)])
    }


    


    const handleSubmit = (e) => {
        e.preventDefault();
        if(post){
            // edit post
            post.title = title;
            post.body = body;
            post.images = onlineImages;
            post.category = currCategory.name;
            post.status = currStatus.name;
            post.tags = tags;

            const data = {
                images: postImages,
                video: null,
                audio: null,
            }
            updatePost(dispatch, post, data);
            //console.log("edited successfully");
            toast.success("post updated successfully.");
            history.push(`/postswrf4${post._id}wrf4${post.userId}`);
            setOnEdit(false);
            
        }else{
            const newpost = {
            "userId": currUser?._id,
            "title": title,
            "type": "image-post",
            "body": body,
            "category": currCategory.name,
            "status": currStatus.name,
            "images": [],
            "videos": [],
            "audios": [],
            "likes": [],
            "vues": [],
            "shares": [],
            "tags": tags,
            "comments": [],
            }
        
            const data = {
                images: postImages,
                video: null,
                audio: null,
            }
            createPost(dispatch, newpost, data, socket, auth?.followers);
            handleClear();
            history.push('/');
        }
    }

    return (
        <WriteContainer>
            <div>
            <DangerAlert 
            openAlert={openAlert}
            handleDeleteAlert={handleDeleteAlert}
            handleCloseAlert={handleCloseAlert}/>
            </div>
            <WriteWrapper>
                <Header>
                    <Title>
                    {post? "EDIT IMAGE POST" : "CREATE IMAGE POST"}
                    </Title>
                    {post&& <CloseIcon onClick={()=>setOnEdit(false)}/>}
                </Header>
                <UploadWrapper>
                    <InputItem>
                        <Label htmlFor="imageInput">
                            <ImageIcon /><span style={{color:"gray"}}>Add Images</span>
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
                    <UploadWrapperStatus>
                        {counter === maxUpload &&
                        <UploadMessage>max. images reached:</UploadMessage>
                        }
                        <UploadStatus>{counter +"-"+ maxUpload}</UploadStatus>
                    </UploadWrapperStatus>
                    
                </UploadWrapper>

                {post && onlineImages.length > 0 &&
                <MediaWrapper>
                    <ImageList>
                        {onlineImages.map((image, index)=>(
                        <ImageWrapper key={index} >
                            <RemoveImage onClick={()=>handleOpenAlert(image)}/>
                            <OnlineImage src={process.env.REACT_APP_POSTS+image}/>
                        </ImageWrapper>
                        ))}
                    </ImageList>
                </MediaWrapper>
                }
                
                {postImages.length > 0 &&
                <MediaWrapper>  
                    {post && <h4 style={{padding: "10px 0px"}}>New Images</h4>}                
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
                </MediaWrapper>
                }
                <Form autoComplete="off" onSubmit={handleSubmit}>
                    <FormInput 
                    label="Title"
                    name= "title"
                    type="title"
                    value={title}
                    onChange={onTitleChange}
                    placeholder="Title"
                    errorMessage="Post Title is required."
                    required={true}
                    />
                    <PrivacySelect 
                    status={status} 
                    value={currStatus}
                    setCurrStatus={setCurrStatus}/>
                    <CategorySelect 
                    categories={sysCategories} 
                    value={currCategory}
                    setCurrCategory={setCurrCategory}/>
                    <FormEditor 
                    name= "body"
                    type="body"
                    body={body}
                    config={editorConfig}
                    onEditorChange={onEditorChange}
                    />
                    <TagsInput tags={tags} handleTags={handleTags} removeTag={removeTag}/>
                    <ButtonWrapper>
                        <Button type="submit" option="save">POST</Button>
                        {post?
                        <Button option="clear" onClick={()=>setOnEdit(false)}>CANCEL</Button>
                        :
                        <Button option="clear" onClick={handleClear}>CLEAR</Button>
                        }
                    </ButtonWrapper>
                </Form>
                
            </WriteWrapper> 
        </WriteContainer>
    )
}

export default ImagePost;

const WriteContainer = styled(Container)`
background-color: white;
min-height: 100vh;
display: flex;
flex-direction: column;
${Container}
`;

const WriteWrapper = styled.div`
margin-top: 80px;
padding: 0px 150px;
@media screen and (max-width: 1080px) {
    padding: 0px 80px;
}
@media screen and (max-width: 768px) {
    padding: 0px 50px;
}
@media screen and (max-width: 580px) {
    padding: 0px 10px;
}
`;

const Header = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
`;

const Title = styled.h4`
font-weight: 500;
color: teal;
`;

const CloseIcon = styled(Close)`
color: teal;
cursor: pointer;
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

const ButtonWrapper = styled.div`
padding: 10px 0px;
display: flex;
align-items: center;
justify-content: flex-start;
margin-bottom: 30px;
@media screen and (max-width: 580px) {
    padding: 5px 0px;
}
`;

const Button = styled.button`
padding: 10px;
width: 150px;
margin-top: 10px;
margin-right: 20px;
border: 2px solid teal;
cursor: pointer;
border-radius: 5px;
font-weight: bolder;
background-color: ${(props) => props.option === "save"? "teal" : "white"};
color: ${(props) => props.option === "save"? "white" : "teal"};
&:hover{
    opacity: 0.8;
}
@media screen and (max-width: 580px) {
    padding: 8px;
    width: 120px;
}
`;


const MediaWrapper = styled.div`
display: flex;
flex-direction: column;
margin-top: 5px;
`;

const ImageList = styled.div`
height: 220px;
display: flex;
align-items: center;
overflow-x: scroll;
@media screen and (max-width: 580px) {
    height: 140px;
}
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
`;

const ImageItem = styled.img`
height: 200px;
width: 300px;
padding-right: 10px;
cursor: pointer;
object-fit: cover;
@media screen and (max-width: 580px) {
    width: 200px;
    height: 130px;
}
transition: transform .3s;
&:hover{
    transform: scale(1.03);
}
`;

const OnlineImage = styled.img`
height: 100px;
width: 200px;
padding-right: 10px;
cursor: pointer;
object-fit: cover;
@media screen and (max-width: 580px) {
    width: 150px;
    height: 100px;
}
transition: transform .3s;
&:hover{
    transform: scale(1.03);
}
`;

const RemoveImage = styled(Close)`
position: absolute;
top: 10px;
right: 15px;
padding: 2px;
cursor: pointer;
border-radius: 50%;
background-color: teal;
color: white;
opacity: 0.6;
z-index: 1;
&:hover{
    opacity: 1;
    transition: 0.3s all ease;
}
`;

const UploadWrapper = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
padding-bottom: 5px;
margin-top: 30px;
border-bottom: 1px solid rgba(0,0,0,0.5);
`;

const InputItem = styled.div`
margin-right: 5px;
cursor: pointer;
&:hover{
    opacity: 0.8;
}
`;

const UploadWrapperStatus = styled.span`
display: flex;
align-items: center;
`;

const UploadStatus = styled.span`
margin-left: 20px;
`;

const UploadMessage = styled.span`
color: red;
font-size: 14px;
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
margin-right: 5px;
color: teal;
`;

const Input = styled.input`

`;
