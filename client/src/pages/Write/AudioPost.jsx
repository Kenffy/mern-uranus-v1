import React from 'react';
import { useContext, useState } from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components'
import FormInput from '../../components/controls/FormInput';
import FormAudioInput from "../../components/controls/FormAudioInput";
import { Container } from '../../globaleStyles';
import FormEditor from '../../components/controls/FormEditor';
import { Close, GraphicEq, Panorama } from '@material-ui/icons';
import { v4 as uuidv4 } from 'uuid';
import { Context } from '../../context/Context';
import { CategoryList } from '../../components/Categories/CategoryList';
import PrivacySelect from '../../components/dropdown/PrivacySelect';
import CategorySelect from '../../components/dropdown/CategorySelect';
import { createPost, updatePost } from '../../context/Action';
import AudioPlayer from '../../components/media/AudioPlayer';
import {toast} from "react-toastify";

const AudioPost = ({post, setOnEdit}) => {

  const history = useHistory();
  const editorConfig={  
    placeholder: 'Enter your text here...',     
    toolbar: ['heading', '|', 'bold', 'italic', 'blockQuote', 'link', 'numberedList', 'bulletedList', 'insertTable', '|', 'undo', 'redo'],
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
  const [filename, setFilename] = useState(post?.audios[0]?.filename || "");
  const [audio, setAudio] = useState(null);
  // const [onlineAudio, setOnlineAudio] = useState(post?.audios[0] || null);
  // const [openAlert, setOpenAlert] = useState(false);
  // const [rmAudio,setRmAudio] = useState(null);

  const { auth, dispatch } = useContext(Context);
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

//   const handleRemoveOnlineAudio = ()=>{
//     if (onlineImages.length > 0 && rmImage !== null){          
//         const tmpArray = onlineImages.filter(img => img !== rmImage)
//         setOnlineImages(tmpArray);
//         setCounter((prevState)=> prevState - 1);
//         setRmImage(null);
//     }
//   }

//   const handleDeleteAlert = () => {
//     handleRemoveOnlineAudio();
//     setOpenAlert(false);
//   };

//   const handleOpenAlert = (audio) => {
//     setOpenAlert(true);
//   };

// const handleCloseAlert = () => {
//     setOpenAlert(false);
// };

  const handleFiles = (e)=>{
      const file = e.target.files[0];
      if(file && audio === null){
        const newAudio = {
          ...audio,
          filename: uuidv4() + file.name,
          file: file,
          type: file.type,
          url: URL.createObjectURL(file),
          image: null,
        };
        setFilename(file.name);
        setAudio(newAudio);
      }else{
        const newAudio = {
          ...audio,
          filename: uuidv4() + file.name,
          file: file,
          type: file.type,
          url: URL.createObjectURL(file), 
        };
        setFilename(file.name);
        setAudio(newAudio);
      }
  }

  const handleImage = (e)=>{
    const file = e.target.files[0];
    if(file){
      const newAudio = {
        ...audio,
        cover: URL.createObjectURL(file),
        image: {
          filename: uuidv4() + file.name,
          file: file,
        }
      };
      setAudio(newAudio);
    }
  }

  const handleClear = () =>{
      setAudio(null);
      setFilename("");
      setTitle("");
      setBody("");
  }

  const handleSubmit = (e) => {
      e.preventDefault();
      if(post){
        // edit post
        post.title = title;
        post.body = body;
        post.category = currCategory.name;
        post.status = currStatus.name;

        const data = {
          images: [],
          video: null,
          audio
        }
        updatePost(dispatch, post, data);
        setOnEdit(false);
        toast.success("post updated successfully.");
      }else{
        const newpost = {
          "userId": currUser?._id,
          "title": title,
          "type": "audio-post",
          "body": body,
          "category": currCategory.name,
          "status": currStatus.name,
          "images": [],
          "videos": [],
          "audios": [],
          "likes": [],
          "vues": [],
          "shares": [],
          "tags": [],
          "comments": [],
        }

        const data = {
          images: [],
          video: null,
          audio
        }
        createPost(dispatch, newpost, data);
        handleClear();
        history.push('/');
      }
  }

    return (
      <WriteContainer>
          <WriteWrapper>
              <Header>
                <Title>
                {post? "EDIT AUDIO POST" : "AUDIO POST"}
                </Title>
                {post && <CloseIcon onClick={()=>setOnEdit(false)}/>}
              </Header>
              <UploadWrapper>
                <InputWrapper>
                  <InputItem>
                    <Label htmlFor="audioInput">
                        <AudioIcon />Audio
                    </Label>
                    <Input 
                        id="audioInput" 
                        type="file"
                        accept=".mp3,.wav,.ogg"
                        style={{ display: "none" }} 
                        onChange={handleFiles}/>
                    </InputItem>
                    {audio !== null && audio?.file && 
                    <InputItem>
                      <Label htmlFor="imageInput">
                          <ImageIcon />Cover
                      </Label>
                      <Input 
                          id="imageInput" 
                          type="file"
                          accept=".jpg,.jpeg,.png"
                          style={{ display: "none" }} 
                          onChange={handleImage}/>
                    </InputItem>}
                </InputWrapper>
                  
                <UploadedFile>{filename}</UploadedFile>
              </UploadWrapper>
              {audio !== null && audio?.file  && <PlayerWrapper><AudioPlayer audio={audio}/></PlayerWrapper>}
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
                  <FormAudioInput 
                  label="Audio"
                  name= "audio"
                  type="audio"
                  value={filename}
                  placeholder="Audio files: mp3, wav, ogg"
                  errorMessage="Please upload an audio file."
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
                  <ButtonWrapper>
                      <Button type="submit" option="save">SAVE</Button>
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

export default AudioPost;

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

const Header = styled.h4`
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

const UploadedFile = styled.span`
color: teal;
display: -webkit-box;
-webkit-box-orient: vertical;
-webkit-line-clamp: 1;
overflow: hidden;
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

const UploadWrapper = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
padding-bottom: 10px;
margin-top: 30px;
border-bottom: 1px solid rgba(0,0,0,0.5);
`;

const InputWrapper = styled.div`
display: flex;
align-items: center;
`;

const PlayerWrapper = styled.div`
width: 100%;
height: 150px;
margin-bottom: 20px;
`;

const InputItem = styled.div`
margin-right: 20px;
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

const AudioIcon = styled(GraphicEq)`
height: 30px !important;
width: 30px !important;
color: #444;
cursor: pointer;
margin-right: 5px;
color: teal;
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
