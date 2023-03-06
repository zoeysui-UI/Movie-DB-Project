import React from "react";
import styled from "styled-components";

const ModalContainer = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ModalBody = styled.div`
  height: 500px;
  max-width: 800px;
  background-color: white;
  position: relative;
`;

const ModalCloseContainer = styled.div`
  padding: 1rem;
  font-size: 2rem;
  position: absolute;
  right: 0;
  top: 0;
  cursor: pointer;
  &:hover {
    color: #01b4e4;
  }
`;

const ModalContentContainer = styled.div`
  padding: 32px;
  height: 100%;
  width: 100%;
`;

export default function Modal(props) {
  return (
    <ModalContainer>
      <ModalBody>
        <ModalCloseContainer onClick={props.onClose}>
          <i class="icon ion-md-close"></i>
        </ModalCloseContainer>
        <ModalContentContainer>{props.children}</ModalContentContainer>
      </ModalBody>
    </ModalContainer>
  );
}
