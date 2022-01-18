import styled from "styled-components";
import "./formEditor.css";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";

const FormEditor = (props) => {
    const { body, config, errorMessage, onEditorChange } = props;
    return (
        <Container>
            <span className="form-span">{errorMessage}</span>
            <PostEditor id="editor"
                className="form-input"
                editor={ClassicEditor}
                data={body}
                config={config}
                onChange={onEditorChange}
                />
        </Container>
    )
}

export default FormEditor;

const Container = styled.div`
display: flex;
flex-direction: column;
margin-top: 10px;
`;

const PostEditor = styled(CKEditor)`
width: 100%;
`;
