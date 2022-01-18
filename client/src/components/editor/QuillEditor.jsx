import { useState } from 'react';
import ReactQuill from 'react-quill'; 
import 'react-quill/dist/quill.snow.css';
import styled from 'styled-components';

const QuillEditor = () => {

    const [text, setText] = useState("");

    const handleChange = (value) => {
        setText(value);
    }
    console.log(text)
    return (
        <Container>
            <ReactQuill value={text}
                  onChange={handleChange} />
        </Container>
    )
}

export default QuillEditor;

const Container = styled.div`

`;
