import { Modal } from "@material-ui/core";
import styled from "styled-components";
import {updateUser} from "../../redux/actions/userActions";
//import Checkbox from "../controls/Checkbox";
//import {useState} from "react";

const CategoryModal = ({openModal, setOpenModal, categories, setSysCategories, currUser, dispatch}) => {
    categories =  categories.sort((a, b) => a.name.localeCompare(b.name));
    const handleChange = (e) => {
        const {name, checked} = e.target;
        if(name === "All"){
            categories = categories.map(cat=>{ return {...cat, isChecked: checked}});
            setSysCategories(categories)
        }else{
            categories = categories.map(cat=>cat.name === name? {...cat, isChecked: checked} : cat);
            setSysCategories(categories)
        }
    }

    const handleSubmit = ()=>{ 
        console.log("test submit"); 
        const checkedCategories = categories.filter(cat=>cat.isChecked === true);
        console.log(checkedCategories)
        let currCategories = [];
        checkedCategories.map(cat=> currCategories.push(cat.name));
        currUser.categories = currCategories;

        // save to data base
        updateUser(dispatch, currUser);
        setOpenModal(false);   
    } 

    const handleCancel = ()=>{
        setOpenModal(false);
    }

     return ( 
     <Container> 
        <Modal open={openModal} 
        onClose={()=>setOpenModal(false)}> 
            <Content> 
                <Title>Select your categories</Title> 
                <Wrapper>
                {categories.map((cat)=>(
                    <CheckBoxWrapper key={cat.id}>
                        <Input
                            type="checkbox"
                            name={cat.name}
                            checked={cat.isChecked}
                            onChange={handleChange}
                        />
                        <Label>{cat.name}</Label>
                    </CheckBoxWrapper>
                ))}
                </Wrapper>
                <ButtonWrapper>
                    <Button name="save" onClick={handleSubmit}>Save</Button>
                    <Button name="cancel" onClick={handleCancel}>Cancel</Button>
                </ButtonWrapper>
            </Content> 
        </Modal> 
    </Container> 
    )}

export default CategoryModal;

const Container = styled.div`
position: relative;
`;
const Content = styled.div`
position: absolute;
min-height: 300px;
max-height: 80%;
width: 500px;
background-color: white;
top: 0;left: 0;bottom: 0;right: 0;margin: auto;
border-color: teal;
border-radius: 10px;
display: flex;
flex-direction: column;
@media screen and (max-width: 580px) { 
    width: 90%;
}`;

const Title = styled.h3`
padding: 20px 30px;
font-weight: 500;
`;

const Wrapper = styled.div`
display: flex;
flex-direction: column;
padding: 10px 30px;
margin-bottom: 10px;
overflow-y: auto;
::-webkit-scrollbar {
    width: 5px;
    border-radius: 10px;
}
::-webkit-scrollbar-track {
    background-color: transparent;
}
::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: teal;
}
`;

const ButtonWrapper = styled.div`
display: flex;
align-items: center;
`;

const CheckBoxWrapper = styled.div`
display: flex;
align-items: center;
margin-bottom: 12px;
`;

const Label = styled.label`
font-size: 16px;
`;

const Input = styled.input`
margin-right: 10px;
`;

const Button = styled.button`
padding: 8px;
margin: 0px 30px;
margin-bottom: 20px;
//margin-right: 20px;
width: 100px;
border: 1px solid teal;
border-radius: 5px;
color: ${props=>props.name === "save"? "white" : "teal"};
background-color: ${props=>props.name === "save"? "teal" : "white"};
cursor: pointer;
&:hover{ 
    opacity: 0.8; 
    transition: all 0.3s ease;
    }
`;


