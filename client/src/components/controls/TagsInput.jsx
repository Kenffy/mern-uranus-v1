import { Cancel } from '@material-ui/icons';
import React from 'react';
import styled from 'styled-components';

const TagsInput = ({tags, handleTags, removeTag}) => {

  return (
    <Container>
        <List>
            {tags.map((tag, index)=>(
                <ListItem key={index}>
                    <Label>{tag}</Label>
                    <RemoveIcon fontSize='small' onClick={()=>removeTag(tag)}/>
                </ListItem>
            ))}
        </List>
        <Input type='text'
        placeholder='Press Space to add a Tag' 
        onKeyUp={handleTags}/>
    </Container>
  )
}

export default TagsInput;

const Container = styled.div`
width: 100%;
display: flex;
align-items: flex-start;
flex-wrap: wrap;
align-items: center;
padding: 3px 10px;
margin: 10px 0px;
border-radius: 5px;
border: 1px solid rgba(0,0,0,0.2);
outline: none;
font-size: 14px;
`;

const List = styled.ul`
list-style: none;
width: auto;
display: flex;
flex-wrap: wrap;
align-items: center;
gap: .5rem;
`;

const ListItem = styled.li`
text-decoration: none;
margin-right: .5rem;
display: flex;
align-items: center;
gap: .5rem;
padding: 2px 5px;
background-color: teal;
font-size: 12px;
border-radius: 5px;
`;

const Label = styled.span`
color: white;
`;

const RemoveIcon = styled(Cancel)`
color: white;
`;

const Input = styled.input`
width: auto;
border: none;
outline: none;
padding: 10px;
flex: 1;
`;
