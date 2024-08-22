import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled, { css } from 'styled-components';
import {
  selectPlaylist,
  selectPlaylistStatusUpdate,
  updatePlaylist,
} from '../playlistSlice.js';
import { useForm } from 'react-hook-form';
import ModalInputField from './ModalInputField.jsx';
import ModalImgField from './ModalImgField.jsx';

const StyledForm = styled.form`
  margin-bottom: 0.8rem;

  display: grid;
  grid-template-columns: auto 1fr;
  gap: 1.6rem;
`;

const InputGrid = styled.div`
  display: flex;
  flex-direction: column;
`;

const InputStyles = css`
  width: 100%;

  font-family: inherit;
  font-size: 1.4rem;
  color: #fff;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  border: 1px solid transparent;

  &:focus {
    background-color: #333;
    border: 1px solid #535353;
    outline: none;

    & + label {
      opacity: 1;
    }
  }
`;

const CustomInput = styled.input`
  ${InputStyles}; // Extends InputStyles

  height: 4rem;
  padding: 0 1.2rem;
  margin-bottom: 1.6rem;
`;

const CustomTextarea = styled.textarea`
  ${InputStyles}; // Extends InputStyles

  height: 100%;
  padding: 1.2rem 1.2rem 2.8rem 1.2rem;
  resize: none;
`;

const FormButton = styled.button`
  height: 4.8rem;
  padding: 0 3.2rem;

  grid-column: 2/3;
  justify-self: end;

  font-size: 1.6rem;
  font-weight: 600;
  background: #fff;
  border-radius: 5rem;

  transition: all 0.1s;

  &:hover {
    background: #f6f6f6;
    scale: 1.04;
  }

  &:active {
    background: #b7b7b7;
    scale: 1;
  }

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
`;

const ModalForm = () => {
  const playlist = useSelector(selectPlaylist);
  const playlistStatusUpdate = useSelector(selectPlaylistStatusUpdate);
  const { register, handleSubmit, control } = useForm();
  const dispatch = useDispatch();

  const isDisabled = playlistStatusUpdate === 'loading';

  // TODO: Server should remove old images
  const onSubmit = (data) => {
    dispatch(updatePlaylist({ data, id: playlist.id }));
  };

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      <ModalImgField playlist={playlist} control={control} />

      <InputGrid>
        <ModalInputField
          label="Name"
          placeholder="Add a name"
          name="name"
          register={register}
          as={CustomInput}
          defaultValue={playlist.name}
        />
        <ModalInputField
          label="Description"
          placeholder="Add an optional description"
          name="description"
          register={register}
          as={CustomTextarea}
          defaultValue={playlist.description}
        />
      </InputGrid>

      <FormButton type="submit" disabled={isDisabled}>
        {!isDisabled ? 'Save' : 'Saving'}
      </FormButton>
    </StyledForm>
  );
};

export default ModalForm;
