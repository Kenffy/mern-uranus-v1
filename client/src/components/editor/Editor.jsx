import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import styled from 'styled-components';
import "./editor.css";

// import Base64UploadAdapter from '@ckeditor/ckeditor5-upload/src/adapters/base64uploadadapter';
// import MediaEmbed from '@ckeditor/ckeditor5-media-embed/src/mediaembed';

// ClassicEditor
//     .create( document.querySelector('#editor'), {
//         toolbar: [ 'heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote' ],
//         heading: {
//             options: [
//                 { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
//                 { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
//                 { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' }
//             ]
//         }
//     } )
//     .catch( error => {
//         console.log( error );
//     } );

const Editor = ({setTitle, title, body, setBody, setPostImages}) => {

    // ClassicEditor
    // .create( document.querySelector( '#editor' ), {
    //     plugins: [ MediaEmbed, Base64UploadAdapter],
    //     toolbar: ['mediaEmbed']
    // } )
    // .then()
    // .catch();

    // const config={         
    //     toolbar: ['heading', '|', 'bold', 'italic', 'blockQuote', 'link', 'numberedList', 'bulletedList', 'imageUpload', 'insertTable',
    //       'tableColumn', 'tableRow', 'mergeTableCells', 'mediaEmbed', '|', 'undo', 'redo']
    //   };
    
    const config={         
        toolbar: ['heading', '|', 'bold', 'italic', 'blockQuote', 'link', 'numberedList', 'bulletedList', 'insertTable', "mediaEmbed", '|', 'undo', 'redo'],
        mediaEmbed: {previewsInData: true}, 
      };

    //*["undo", "redo", "bold", "italic", "blockQuote", "ckfinder", "imageTextAlternative", "imageUpload", "heading", "imageStyle:full", "imageStyle:side", "link", "numberedList", "bulletedList", "mediaEmbed", "insertTable", "tableColumn", "tableRow", "mergeTableCells"]*


    const handleOnChange = (e, editor) =>{
        const data = editor.getData();
        setBody(data)
    }
    return (
        <Container>
            <InputTitle placeholder="Title"
                value={title} 
                onChange={(e)=>setTitle(e.target.value)}/>
            <PostEditor id="editor"
                editor={ClassicEditor}
                onChange={handleOnChange}
                data={body}
                config={config}
                />
        </Container>
    )
};

export default Editor;

const Container = styled.div`
width: 100%;
height: 100%;
padding: 0px 20px;
display: flex;
flex-direction: column;
@media screen and (max-width: 580px) {
    padding: 5px;
}
`;

const InputTitle = styled.input`
font-size: 18px;
padding: 6px;
margin-top: 10px;
margin-bottom: 20px;
width: 100%;
color: #444;
outline: none;
`;

const PostEditor = styled(CKEditor)`
width: 100%;
height: 400px !important;
`;
