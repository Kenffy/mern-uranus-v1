import React from 'react';
import { Modal } from '@material-ui/core';
import styled from 'styled-components';

const DangerAlert = ({openAlert,handleCloseAlert, handleDeleteAlert}) => {

  return (
  <Container>
      <Modal
        open={openAlert}
        onClose={handleCloseAlert}>
        <Dialog>
            <DialogTitle>{"Are you sure?"}</DialogTitle>
            <DialogContent>
            <ContentText>
                You will not be able to recover this file!
            </ContentText>
            </DialogContent>
            <DialogActions>
            <CancelButton onClick={handleCloseAlert}>
                CANCEL
            </CancelButton>
            <DeleteButton onClick={handleDeleteAlert}>
                DELETE
            </DeleteButton>
            </DialogActions>
        </Dialog>
      </Modal>
  </Container>
  );
};

export default DangerAlert;

const Container = styled.div`
width: 100%;
position: relative;
`;

const Dialog = styled.div`
position: absolute;
background-color: white;
top: 0;left: 0;
bottom: 0;right: 0;
margin: auto;
border-radius: 10px;
display: flex;
flex-direction: column;
justify-content: space-between;
height: 200px;
width: 320px;
padding: 20px 30px;
`;

const DialogTitle = styled.div`
font-size: 25px;
color: red;
font-weight: 600;
text-align: center;
`;

const DialogContent = styled.div`
color: #555;
`;

const ContentText = styled.span`
font-size: 18px;
`;

const DialogActions = styled.div`
bottom: 0px;
display: flex;
align-items: center;
justify-content: flex-end;
`;

const CancelButton = styled.button`
padding: 10px 15px;
border: 1px solid teal;
border-radius: 5px;
background-color: white;
color: teal;
cursor: pointer;
&:hover{
    background-color: teal;
    color: white; 
    transition: all 0.3s ease;
}
`;

const DeleteButton = styled.button`
padding: 10px 15px;
border: 1px solid red;
border-radius: 5px;
margin-left: 10px;
background-color: white;
color: red;
cursor: pointer;
&:hover{
    background-color: red;
    color: white; 
    transition: all 0.3s ease;
}
`;
