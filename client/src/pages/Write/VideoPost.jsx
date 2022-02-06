import React from 'react';
import { useContext, useState } from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components'
import FormInput from '../../components/controls/FormInput';
import { Container } from '../../globaleStyles';
import FormEditor from '../../components/controls/FormEditor';
import { Context } from '../../context/Context';
import { CategoryList } from '../../components/Categories/CategoryList';
import PrivacySelect from '../../components/dropdown/PrivacySelect';
import CategorySelect from '../../components/dropdown/CategorySelect';
import { createPost, updatePost } from '../../context/Action';
import MediaPlayer from '../../components/media/MediaPlayer';
import { Close } from '@material-ui/icons';
import {toast} from "react-toastify";

const VideoPost = ({post, setOnEdit}) => {

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
  const [video, setVideo] = useState(post?.videos[0] || "");
  const [body, setBody] = useState(post?.body || "");

  const { auth, dispatch } = useContext(Context);
  const currUser = auth;
  const sysCategories = CategoryList.filter(c=>c.name !== "All");
  const [currCategory, setCurrCategory] = useState(sysCategories.find(c=>c.name === post?.category) ||sysCategories[0] || null);

  const onTitleChange = (e) => {
      setTitle(e.target.value);
  };

  const onVideoChange = (e) => {
    setVideo(e.target.value);
};

  const onEditorChange = (e, editor) =>{
      const data = editor.getData();
      setBody(data)
  }


  const handleClear = () =>{
      setVideo("");
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
      post.videos = [video];

      const data = {
          images: [],
          video: null,
          audio: null,
      }
      updatePost(dispatch, post, data);
      setOnEdit(false);
      toast.success("post updated successfully.");
    }else{
      const post = {
        "userId": currUser?._id,
        "title": title,
        "type": "video-post",
        "body": body,
        "category": currCategory.name,
        "status": currStatus.name,
        "images": [],
        "videos": [video],
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
        audio: null
      }
      createPost(dispatch, post, data);
      handleClear();
      history.push('/');
    }
  }
    return (
      <WriteContainer>
          <WriteWrapper>
              <Header>
                <Title>
                {post? "EDIT VIDEO POST" : "VIDEO POST"}
                </Title>
                {post && <CloseIcon onClick={()=>setOnEdit(false)}/>}
              </Header>
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
                  <FormInput 
                  label="Video"
                  name= "video"
                  type="url"
                  value={video}
                  onChange={onVideoChange}
                  pattern="http://www\.youtube\.com\/(.+)|https://www\.youtube\.com\/(.+)"
                  placeholder="Youtube video Url"
                  errorMessage="Please provide a youtube url."
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
                  {video &&
                  <PlayerWrapper>
                    <MediaPlayer url={video}/>
                  </PlayerWrapper>
                  }
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

export default VideoPost;

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
margin-top: 40px;
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

const PlayerWrapper = styled.div`
width: 100%;
padding: 5px 0px;
margin: 20px 0px;
position: relative;
height: 600px;
margin-bottom: 20px;
@media screen and (max-width: 1024px) {
  height: 450px;
}
@media screen and (max-width: 720px) {
  height: 350px;
}
@media screen and (max-width: 580px) {
  height: 250px;
}
`;